from django.dispatch import receiver
from django.db.models.signals import post_save
from files.models import File,Faculty,Module, ModuleGroup
from google.oauth2.credentials import Credentials, credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
import os
SCOPES = ['https://www.googleapis.com/auth/drive']
SERVICE_ACCOUNT_FILE = './config.json'

credentials = Credentials.from_authorized_user_file("./config.json")
# Create the Google Drive service
drive_service = build('drive', 'v3', credentials=credentials)

MASTER_FOLDER_ID = "1-CzywdQK6AmdF5F84NPAzCLQXnJq4IC5"


@receiver(post_save,sender=File)
def handle_file_accepting(sender,instance,created,**kwargs):
    if instance.accepted and instance.drive_link ==None:
        if instance.file_type == "cour":
            parent = instance.module.cour_drive_id
        if instance.file_type == "td":
            parent = instance.module.td_drive_id
        if instance.file_type == "tp":
            parent = instance.module.tp_drive_id

        if instance.file_type == "other":
            parent = instance.module.other_drive_id

        if instance.file_type == "exam":
            parent = instance.module.exam_drive_id


        file_metadata = {
            'name': instance.title,

            'parents':[parent]
        }
        media = MediaFileUpload(instance.file.path, resumable=True)
        file = drive_service.files().create(body=file_metadata, media_body=media, fields='id, name, mimeType, webViewLink').execute()
        permission = {
        'role': 'reader',
        'type': 'anyone'
    }
        drive_service.permissions().create(fileId=file['id'], body=permission).execute()
        File.objects.filter(id=instance.id).update(drive_link=file.get("webViewLink"),file=None)
        os.remove(instance.file.path)


@receiver(post_save,sender=Module)
def hanle_Module_Creation(sender,instance,created,**kwargs):
    if instance.drive_id == None :
        body = {
        'name': instance.name,
        'mimeType': 'application/vnd.google-apps.folder',
        'parents':[instance.group.drive_id]

        }
        file = drive_service.files().create(body=body,fields='id').execute()
        id = file.get('id')
        instance.drive_id = id
        cour_body = {

            'name': "Cours",
            'mimeType': 'application/vnd.google-apps.folder',
            'parents':[id]
        }
        td_body = {

            'name': "TD",
            'mimeType': 'application/vnd.google-apps.folder',
            'parents':[id]
        }
        tp_body = {

            'name': "TP",
            'mimeType': 'application/vnd.google-apps.folder',
            'parents':[id]
        }
        other_body = {
        'name': "Others",
        'mimeType': 'application/vnd.google-apps.folder',
        'parents':[id]

        }
        exam_body = {
        'name': "Exams",
        'mimeType': 'application/vnd.google-apps.folder',
        'parents':[id]

        }
        courses_folder = drive_service.files().create(body=cour_body,fields='id').execute()
        td_folder = drive_service.files().create(body=td_body,fields='id').execute()
        tp_folder = drive_service.files().create(body=tp_body,fields='id').execute()
        other_folder= drive_service.files().create(body=other_body,fields='id').execute()
        exams_folder = drive_service.files().create(body=exam_body,fields='id').execute()

        instance.cour_drive_id = courses_folder.get("id")

        instance.tp_drive_id = tp_folder.get("id")
        instance.td_drive_id = td_folder.get("id")
        instance.other_drive_id = other_folder.get("id")
        instance.exam_drive_id = exams_folder.get("id")

        instance.save()
  




    
@receiver(post_save,sender=ModuleGroup)
def hanle_group_creation(sender,instance,created,**kwargs):
    print("cc")
    if instance.drive_id == None :
        body = {
        'name': instance.name,
        'mimeType': 'application/vnd.google-apps.folder',
        'parents':[MASTER_FOLDER_ID]
        }
        file = drive_service.files().create(body=body,fields='id').execute()
        instance.drive_id = file.get('id')
        instance.save()

    
