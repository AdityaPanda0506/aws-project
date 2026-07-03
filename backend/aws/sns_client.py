import boto3

from aws.config import AWS_REGION

TOPIC_ARN = "arn:aws:sns:ap-south-1:114522856658:CloudGuardAlerts"

sns = boto3.client(
    "sns",
    region_name=AWS_REGION
)


def send_alert(report):

    subject = f"CloudGuard Alert - {report['status']}"

    message = f"""
CloudGuard Data Quality Alert

Filename:
{report['filename']}

Quality Score:
{report['quality_score']}

Status:
{report['status']}

Generated At:
{report['generated_at']}

CSV:
{report['csv_s3_url']}

Report:
{report['report_s3_url']}

Recommendations:

"""

    for recommendation in report["recommendations"]:

        message += f"- {recommendation}\n"

    sns.publish(
        TopicArn=TOPIC_ARN,
        Subject=subject,
        Message=message
    )