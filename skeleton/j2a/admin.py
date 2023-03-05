from django.contrib import admin
from .models import Article, Insight

class Admin(admin.ModelAdmin):
    list_display = ('id', 'title', 'authors', 'year', 'date', 'citation', 'tags', 'abstract', 'ai_abstract', 'url')

# Register your models here.
myModels = [Article, Insight]
admin.site.register(myModels)
# Register your models here.
