import boto3
import os
import uuid

from aws.config import AWS_REGION, S3_BUCKET

s3 = boto3.client(
    "s3",
    region_name=AWS_REGION
)


def upload_file(local_path, folder):

    extension = os.path.splitext(local_path)[1]

    key = f"{folder}/{uuid.uuid4()}{extension}"

    s3.upload_file(

        local_path,

        S3_BUCKET,

        key

    )

    return key


def get_presigned_url(key):

    return s3.generate_presigned_url(

        "get_object",

        Params={

            "Bucket": S3_BUCKET,

            "Key": key

        },

        ExpiresIn=86400

    )