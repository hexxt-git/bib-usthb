from os import access
from django.db import models
# Create your models here.



#file types
TYPES = {"cour":"cour","td":"td","exam":"exam","other":"other","tp":"tp"}
SEMESTERS = {"s1":"s1","s2":"s2","s3":"s3","s4":"s4","s5":"s5","s6":"s6","s7":"s7","s8":"s8","s9":"s9","s10":"s10"}

class ModuleGroup(models.Model):
    name = models.CharField(max_length=50)
    short = models.CharField(max_length=10)

    drive_id = models.CharField(max_length=100,null=True,blank=True)
    def file_count(self):
        return self.module_set.count()

    def __str__(self) -> str:
        return self.name

class Module(models.Model):
    name = models.CharField(max_length=50,null=False)
    short = models.CharField(max_length=10,null=False,blank=False)
    drive_id = models.CharField(max_length=100,null=True,blank=True)
    cour_drive_id = models.CharField(max_length=100,null=True,blank=True)
    tp_drive_id = models.CharField(max_length=100,null=True,blank=True)
    td_drive_id = models.CharField(max_length=100,null=True,blank=True)
    other_drive_id = models.CharField(max_length=100,null=True,blank=True)
    
    exam_drive_id = models.CharField(max_length=100,null=True,blank=True)

    group = models.ForeignKey(ModuleGroup,on_delete=models.CASCADE)
    def file_count(self):
       return self.file_set.all().filter(accepted=True).count()

   
    def tp_file_count(self):
        return self.file_set.all().filter(file_type="tp",accepted=True).count()

    
    def td_file_count(self):
        return self.file_set.all().filter(file_type="td",accepted=True).count()

    def other_file_count(self):
        return self.file_set.all().filter(file_type="other",accepted=True).count()

    def cour_file_count(self):
        return self.file_set.all().filter(file_type="cour",accepted=True).count()

    
    def exam_file_count(self):
        return self.file_set.all().filter(file_type="exam",accepted=True).count()

    def __str__(self):
        return self.name



class Faculty(models.Model):
    name = models.CharField(max_length=100,null=False,blank=False)
    modules = models.ManyToManyField(Module)
    short = models.CharField(max_length=10,null=False,blank=False)
    
    def __str__(self):
        return self.name
    ##
    def file_count(self):
        count = 0
        for module in self.modules.all():
            count += module.file_set.all().filter(accepted=True).count()
        return count

    def cour_file_count(self):
        count = 0
        for module in self.modules.all():
            count += module.file_set.all().filter(file_type="cour",accepted=True).count()

    def tp_file_count(self):
        count = 0
        for module in self.modules.all():
            count += module.file_set.all().filter(file_type="tp",accepted=True).count()
        return count
    def td_file_count(self):
        count = 0
        for module in self.modules.all():
            count += module.file_set.all().filter(file_type="td",accepted=True).count()
        return count
    def exam_file_count(self):
        count = 0
        for module in self.modules.all():
            count += module.file_set.all().filter(file_type="exam",accepted=True).count()
        return count
    def other_file_count(self):
        count = 0
        for module in self.modules.all():
            count += module.file_set.all().filter(file_type="other",accepted=True).count()
        return count 



        

    def group_modules(self):
       pass 

class File(models.Model):
    accepted = models.BooleanField(default=False)
    file = models.FileField(upload_to="files",blank=True,null=True)
    drive_link = models.CharField(max_length=200,blank=True,null=True)
    description = models.TextField(null=False)
    title = models.CharField(max_length=100,null=False)
    downloads_count = models.IntegerField(default=0)
    module = models.ForeignKey(Module,on_delete=models.CASCADE)
    file_type = models.CharField(max_length=20,choices=TYPES,null=False,blank=False)   
    
    @property
    def file_name(self):
        name = str(self.file.name).replace("files/","")
        return name
 
    @property
    def file_size(self):
        bytes_size = self.file.size
        if bytes_size > 1000:
            return str(bytes_size/1000) + " KB"

        elif bytes_size > 1000 * 1000:
            return str(bytes_size/(1000*1000) + " MB")
        
    
    @property
    def file_extention(self)-> str:
        _,extention = str(self.file.name).split(".")
        return extention



    def __str__(self):
        return self.title
