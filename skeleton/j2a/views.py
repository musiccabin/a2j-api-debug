from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ArticleSerializer, InsightSerializer
from .models import Article, Insight

from django.http import HttpResponse, JsonResponse
from django.db.models import Q

# Create your views here.

class InsightsViewSet(viewsets.ModelViewSet):
    queryset = Insight.objects.all().order_by('id')
    serializer_class = InsightSerializer

class ArticlesViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('id')
    serializer_class = ArticleSerializer

def search_and_filter(request, paraphrased, year_start, year_end, tags, prompt):
    prompt = prompt.replace("-", " ")
    print("Prompt: ", prompt)

    tags = tags.replace("+", " ")
    tags = tags.split("-")


    relevant_objects = []
    relevant_ids = []
    # embeddings = Embeddings()

    # embeddings.load("./search/insights_index/")
    
    # results = embeddings.search(prompt, 1000)

    results = Insight.objects.all()

    if paraphrased == 0 or paraphrased == 1:
        for r in results:
            valid = 1

            current_insight = Insight.objects.all().filter((lambda i: prompt.lower() in i.text.lower())).values()
            
            if current_insight[0]['paraphrased'] != paraphrased:
                valid = 0

            print("Current insight: ", current_insight[0])
            print("Looking for the source: ", int(current_insight[0]['source']))
            parent_article = Article.objects.all().filter(id=int(current_insight[0]['source'])).values()
            #print("Parent article: ", parent_article)
            if parent_article[0]['year'] >= year_start and parent_article[0]['year'] <= year_end and valid == 1:
                for t in tags:
                    if t not in parent_article[0]['tags']: 
                        valid = 0

                if valid == 1:
                    relevant_ids.append(r[0])
    else:
        for r in results:
            valid = 1
            current_insight = Insight.objects.all().filter(id=r[0]).values()
            print("Current insight: ", current_insight[0])
            print("Looking for the source: ", int(current_insight[0]['source']))
            parent_article = Article.objects.all().filter(id=int(current_insight[0]['source'])).values()
            #print("Parent article: ", parent_article)
            if parent_article[0]['year'] >= year_start and parent_article[0]['year'] <= year_end and valid == 1:
                for t in tags:
                    if t not in parent_article[0]['tags']: 
                        valid = 0

                if valid == 1:
                    relevant_ids.append(r[0])


    
    relevant_objects = Insight.objects.all().filter(id__in=relevant_ids)
            

    print(relevant_ids)

    results_data = []
    for o in relevant_objects:
        results_data.append({'id': o.id, 'text': o.text, 'authors': o.article.authors, 'paraphrased': o.paraphrased, 'year': o.article.year, 'url': o.article.url})

    # serializer = InsightSerializer(relevant_objects, many=True)

    return JsonResponse(results_data, safe=False)

def insight_details(request, article_id, insight_id):

    article = Article.objects.all().filter(id=article_id)[0]
    insight = Insight.objects.all().filter(id=insight_id)[0]
    # article_serializer = ArticleSerializer(article)

    return JsonResponse({'id': insight.id, 'article_id': article.id, 'title': article.title, 'year': article.year, 'url': article.url, 'authors': article.authors, 'citation': article.citation, 'tags': article.tags, 'location': insight.location}, safe=False)

def article_details(request, article_id):

    article = Article.objects.all().filter(id=article_id)[0]
    article_serializer = ArticleSerializer(article)

    insights = Insight.objects.all().filter(id=article)
    insights_data = []
    for insight in insights:
        insights_data.append(InsightSerializer(insight))

    return JsonResponse({'article': article_serializer.data, 'insights': insights_data}, safe=False)