from django.urls import path
from . import views
urlpatterns = [
            path("fac/<int:id>",views.get_faculty_byID,name="single faculty"),
            path("fac/all",views.get_faculties,name="all faculties"),
            path("module/<int:id>",views.get_module_byID,name='mod-id'),
            path("file/<int:id>",views.get_file_byID,name='fac-id'), 
            path("search/fac/",views.get_faculty,name='fac-search'), 
            path("search/module/",views.module,name="get module"),
            path("search/file/",views.search_files,name="search-file"),
            path("upload/",views.upload_file,name="upload-file"),
            path("download/<int:id>",views.download_file,name="download-file"),
            path("search/bygroup/",views.get_modules_by_group,name="get_modules_by_group"),
            path("fac/<int:id>/getcount/",views.get_file_count,name="get-fac-file-count"),
            path("module/<int:id>/getcount/",views.get_module_count,name="get-module-file-count"),
            path("download/db/json",views.download_db_as_json,name="download-db"),
    path("download/media/files",views.download_media_files,name="download-media")

        ]
