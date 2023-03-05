from django.db import models

# Create your models here.
class Article(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=65536)
    authors = models.CharField(max_length=65536)
    year = models.IntegerField()
    date = models.CharField(max_length=65536)
    url = models.CharField(max_length=65536)
    citation = models.CharField(max_length=65536)
    keywords = models.CharField(max_length=65536)
    tags = models.CharField(max_length=65536)
    abstract = models.CharField(max_length=65536)
    ai_abstract = models.CharField(max_length=65536)

    def _str_(self):
        return self.title


class Insight(models.Model):
    id = models.IntegerField(primary_key=True)
    text = models.CharField(max_length=65536)
    # source = models.IntegerField()
    keywords = models.CharField(max_length=65536)
    paraphrased = models.IntegerField()
    location = models.CharField(max_length=65536)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)

    def _str_(self):
        return self.text

    # class Meta:
    #     ordering = ['headline']
