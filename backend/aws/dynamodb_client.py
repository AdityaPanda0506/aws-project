import boto3
from decimal import Decimal
from aws.config import AWS_REGION
import requests

TABLE_NAME = "CloudGuardReports"

dynamodb = boto3.resource(
    "dynamodb",
    region_name=AWS_REGION
)

table = dynamodb.Table(TABLE_NAME)


def convert_numbers(obj):

    if isinstance(obj, float):
        return Decimal(str(obj))

    if isinstance(obj, dict):
        return {
            k: convert_numbers(v)
            for k, v in obj.items()
        }

    if isinstance(obj, list):
        return [
            convert_numbers(i)
            for i in obj
        ]

    return obj

import boto3
import json

S3_BUCKET = "cloudguard-data-aditya-2026"

s3 = boto3.client("s3")


def get_report(report_id):

    response = table.get_item(

        Key={

            "report_id": report_id

        }

    )

    if "Item" not in response:

        return {

            "error":"Report not found"

        }

    url = response["Item"]["report_s3_url"]

    report = requests.get(url).json()

    return report

from decimal import Decimal


def save_metadata(report):

    item = {

        "report_id": report["report_id"],

        "filename": report["filename"],

        "quality_score": Decimal(
            str(report["quality_score"])
        ),

        "status": report["status"],

        "generated_at": report["generated_at"],

        "rows": report["dataset_summary"]["rows"],

        "columns": report["dataset_summary"]["columns"],

        "memory_mb": Decimal(
            str(report["dataset_summary"]["memory_mb"])
        ),

        "csv_s3_url": report["csv_s3_url"],

        "report_s3_url": report["report_s3_url"],
        
        "pdf_s3_url": report["pdf_s3_url"]

    }

    table.put_item(

        Item=convert_numbers(item)

    )

def search_history(filename):

    history = get_history()

    filename = filename.lower()

    return [

        item

        for item in history

        if filename in item["filename"].lower()

    ]

def get_history():

    response = table.scan()

    items = response.get("Items", [])

    history = []

    for item in items:

        history.append({

            "report_id": item["report_id"],

            "filename": item["filename"],

            "quality_score": float(item["quality_score"]),

            "status": item["status"],

            "generated_at": item["generated_at"],

            "rows": item.get("rows", 0),

            "columns": item.get("columns", 0),

            "memory_mb": float(item.get("memory_mb", 0)),

            "csv_s3_url": item["csv_s3_url"],
            
            "pdf_s3_url": item.get("pdf_s3_url", ""),

            "report_s3_url": item["report_s3_url"]

        })

    history.sort(

        key=lambda x: x["generated_at"],

        reverse=True

    )

    return history