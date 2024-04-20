from django.contrib import admin
from .models import File,Faculty,Module,ModuleGroup


# Register your models here.


admin.site.register(Faculty)
admin.site.register(Module)
admin.site.register(ModuleGroup)

def file_accepting(modeladmin,request,queryset):
    for obj in queryset:
        obj.accepted = True
        obj.save()

file_accepting.short_description = "Accept Selected Files"

@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ['title','file_type','accepted']
    sortable_by = ["accepted"]
    actions = [file_accepting]

