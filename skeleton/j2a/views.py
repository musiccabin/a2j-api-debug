from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from .serializers import ArticleSerializer, InsightSerializer
from .models import Article, Insight

from django.http import HttpResponse, JsonResponse
from django.db.models import Q
from django.forms.models import model_to_dict

import json

# Create your views here.

class InsightsViewSet(viewsets.ModelViewSet):
    queryset = Insight.objects.all().order_by('id')
    serializer_class = InsightSerializer

class ArticlesViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('id')
    serializer_class = ArticleSerializer

@csrf_exempt
def search_and_filter(request, query):
    print("query ", query, 'data', json.dumps(request.POST))

    results_data = []
    for o in Insight.objects.all():
        # print("title:", o.article.id)
        results_data.append({'id': o.id, 'text': o.text, 'title': o.article.title, 'authors': o.article.authors, 'paraphrased': o.paraphrased, 'year': o.article.year, 'date': o.article.date, 'citation': o.article.citation, 'tags': o.article.tags, 'location': o.location, 'url': o.article.url, 'aid': o.article.id})

    return JsonResponse(results_data, safe=False)

@csrf_exempt
def article_details(request, article_id):
    print("got in the fn-------")

    article = Article.objects.all().filter(id=article_id)[0]
    # article_serializer = ArticleSerializer(article)

    insights = Insight.objects.all().filter(article=article)
    insights_data = []
    for insight in insights:
        insights_data.append(insight.text)

    return JsonResponse(dict(abstract = article.abstract, ai_abstract = article.ai_abstract, insights = insights_data), safe=False)