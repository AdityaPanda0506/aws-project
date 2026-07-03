import os
import uuid

import pandas as pd

from core.column_detector import detect_dataset
from validators.data_validator import validate_data
from validators.statistical_validator import validate_statistics
from core.quality_score import calculate_quality_score

from reports.json_report import generate_report
from reports.pdf_report import generate_pdf

from utils.file_handler import save_report
from utils.serializer import make_json_serializable

from aws.dynamodb_client import save_metadata
from aws.sns_client import send_alert
from aws.s3_client import upload_file, get_presigned_url

from utils.logger import logger


async def validate_csv(file):

    logger.info(f"Received file: {file.filename}")

    df = pd.read_csv(file.file)

    logger.info("CSV loaded successfully")

    os.makedirs("output/uploads", exist_ok=True)

    csv_path = os.path.join(

        "output",

        "uploads",

        f"{uuid.uuid4()}.csv"

    )

    df.to_csv(

        csv_path,

        index=False

    )

    column_types = detect_dataset(df)

    data_results = validate_data(

        df,

        column_types

    )

    statistical_results = validate_statistics(

        df,

        column_types

    )

    quality_score = calculate_quality_score(

        data_results,

        statistical_results

    )

    logger.info(f"Quality Score : {quality_score}")

    report = generate_report(

        filename=file.filename,

        dataframe=df,

        data_results=data_results,

        statistical_results=statistical_results,

        quality_score=quality_score

    )

    report["detected_columns"] = column_types

    report = make_json_serializable(report)

    json_path = save_report(report)

    pdf_path = generate_pdf(report)

    logger.info("Uploading files to S3...")

    csv_key = upload_file(

        csv_path,

        "datasets"

    )

    report_key = upload_file(

        json_path,

        "reports"

    )

    pdf_key = upload_file(

        pdf_path,

        "pdf_reports"

    )

    report["csv_s3_url"] = get_presigned_url(csv_key)

    report["report_s3_url"] = get_presigned_url(report_key)

    report["pdf_s3_url"] = get_presigned_url(pdf_key)

    logger.info("All files uploaded successfully")

    save_metadata(report)

    logger.info("Metadata stored in DynamoDB")

    if report["quality_score"] < 70:

        send_alert(report)

        logger.warning("SNS Alert sent")

    report["saved_to"] = json_path

    return report