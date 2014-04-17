import functools
import logging
from django.conf.urls import patterns, url
from django.core.urlresolvers import reverse
from django.http import Http404
from django.views.decorators.cache import never_cache
from preserialize.serialize import serialize
from serrano.resources.base import ThrottledResource
from varify import api
from varify.assessments.models import Assessment, Pathogenicity, \
    AssessmentCategory
from varify.samples.models import Result
from .models import Analysis

log = logging.getLogger(__name__)


def analysis_posthook(instance, data, request):
    uri = request.build_absolute_uri

    data['_links'] = {
        'self': {
            'rel': 'self',
            'href': uri(reverse('api:analyses:analysis', args=[instance.pk])),
        },
        'assessments': {
            'rel': 'related',
            'href': uri(reverse('api:analyses:assessments',
                                args=[instance.pk])),
        }
    }

    data['assessment_count'] = instance.assessments.count()

    return data


class AnalysesResource(ThrottledResource):
    model = Analysis

    template = api.templates.Analysis

    def get(self, request):
        analyses = self.model.objects.all()
        posthook = functools.partial(analysis_posthook, request=request)
        return serialize(analyses, posthook=posthook, **self.template)


class AnalysisResource(ThrottledResource):
    model = Analysis

    template = api.templates.Analysis

    def is_not_found(self, request, response, pk):
        return not self.model.objects.filter(pk=pk).exists()

    def get(self, request, pk):
        try:
            analysis = self.model.objects.get(pk=pk)
        except self.model.DoesNotExist:
            raise Http404

        posthook = functools.partial(analysis_posthook, request=request)
        return serialize(analysis, posthook=posthook, **self.template)


class AnalysisAssessmentsResource(ThrottledResource):
    model = Assessment

    template = api.templates.AnalysisAssessment

    def is_not_found(self, request, response, pk):
        return not Analysis.objects.filter(pk=pk).exists()

    def get(self, request, pk):
        assessments = self.model.objects.filter(analysis_id=pk)\
                                        .exclude(status=Assessment.IGNORED)

        pathogenicities = []

        for p in Pathogenicity.objects.all():
            pathogenicityAssessments = assessments.filter(
                pathogenicity_id=p.id)

            categories = []
            for c in AssessmentCategory.objects.all():
                categoryAssessments = pathogenicityAssessments.filter(
                    assessment_category_id=c.id)
                resultIds = categoryAssessments\
                    .values_list('sample_result_id', flat=True).distinct()

                results = []
                for resultId in resultIds:
                    try:
                        result = Result.objects.get(id=resultId)
                    except Result.DoesNotExist:
                        log.error('Could not find result with ID={0}'
                                  .format(resultId))
                        continue

                    # The use of assessments here is intentional. While we want
                    # to group by pathogenicity and then by category, we must
                    # include all the assessments for each result here. Imagine
                    # user1 and user2 review the same result but select
                    # different pathogenicities. We want both those assessments
                    # to appear under each result.
                    resultAssessments = list(
                        assessments.filter(sample_result_id=resultId))

                    data = {
                        'id': resultId,
                        'chr': result.variant.chr.label,
                        'pos': result.variant.pos,
                        'genotype': result.genotype.value,
                        'assessments': serialize(resultAssessments,
                                                 **self.template)
                    }

                    # If any effects exist then only choose the most impactful
                    # effect to report on.
                    if result.variant.effects.exists():
                        effect = result.variant.effects.order_by(
                            'effect__impact')[0]
                        data['gene'] = effect.transcript.gene.symbol
                        data['hgvs_c'] = effect.hgvs_c
                        data['hgvs_p'] = effect.hgvs_p

                    # If the variant has 1000g or EVS frequencies recorded,
                    # choose and report back only the maximum.
                    if result.variant.thousandg.exists():
                        instance = result.variant.thousandg.get()

                        freq, population = instance.maxPopulationFrequency()

                        data['thousandg'] = {
                            'frequency': freq,
                            'population': population
                        }

                    if result.variant.evs.exists():
                        instance = result.variant.evs.get()

                        freq, population = instance.maxPopulationFrequency()

                        data['evs'] = {
                            'frequency': freq,
                            'population': population
                        }

                    results.append(data)

                categories.append({
                    'id': c.id,
                    'name': c.name,
                    'results': results,
                    'total_count': categoryAssessments.count(),
                })

            pathogenicities.append({
                'id': p.id,
                'name': p.name,
                'categories': categories,
                'total_count': pathogenicityAssessments.count(),

            })

        return pathogenicities


analyses_resource = never_cache(AnalysesResource())
analysis_resource = never_cache(AnalysisResource())
analysis_assessments_resource = never_cache(AnalysisAssessmentsResource())

urlpatterns = patterns(
    '',
    url(r'^$', analyses_resource, name='analyses'),
    url(r'^(?P<pk>\d+)/$', analysis_resource, name='analysis'),
    url(r'^(?P<pk>\d+)/assessments/$', analysis_assessments_resource,
        name='assessments'),
)
