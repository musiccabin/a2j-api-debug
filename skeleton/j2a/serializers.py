from rest_framework import serializers
from .models import Article, Insight

class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'authors', 'year', 'date', 'url', 'citation', 'keywords', 'tags', 'abstract', 'ai_abstract')

class InsightSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Insight
        fields = ('id', 'text', 'article', 'keywords', 'paraphrased', 'location')