import os

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate
from reportlab.platypus import Paragraph
from reportlab.platypus import Spacer
from reportlab.platypus import Table
from reportlab.platypus import TableStyle

from reportlab.lib import colors


def generate_pdf(report):

    os.makedirs("output/pdf_reports", exist_ok=True)

    pdf_path = os.path.join(
        "output",
        "pdf_reports",
        f"{report['report_id']}.pdf"
    )

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph("<b>CloudGuard Data Quality Report</b>", styles["Title"])
    )

    elements.append(Spacer(1, 20))

    elements.append(
        Paragraph(f"<b>Filename:</b> {report['filename']}", styles["Normal"])
    )

    elements.append(
        Paragraph(f"<b>Generated:</b> {report['generated_at']}", styles["Normal"])
    )

    elements.append(
        Paragraph(f"<b>Status:</b> {report['status']}", styles["Normal"])
    )

    elements.append(
        Paragraph(f"<b>Quality Score:</b> {report['quality_score']}", styles["Normal"])
    )

    elements.append(Spacer(1, 20))

    data = [

        ["Rows", report["dataset_summary"]["rows"]],

        ["Columns", report["dataset_summary"]["columns"]],

        ["Memory (MB)", report["dataset_summary"]["memory_mb"]]

    ]

    table = Table(data)

    table.setStyle(

        TableStyle([

            ("BACKGROUND", (0,0), (-1,0), colors.lightgrey),

            ("GRID", (0,0), (-1,-1), 1, colors.grey),

            ("BOTTOMPADDING", (0,0), (-1,0), 8)

        ])

    )

    elements.append(table)

    elements.append(Spacer(1,20))

    elements.append(

        Paragraph("<b>Recommendations</b>", styles["Heading2"])

    )

    for recommendation in report["recommendations"]:

        elements.append(

            Paragraph(f"• {recommendation}", styles["Normal"])

        )

    elements.append(Spacer(1,20))

    elements.append(

        Paragraph("<b>Validation Summary</b>", styles["Heading2"])

    )

    validation = report["data_validation"]

    summary = [

        ["Duplicates", len(validation["duplicates"])],

        ["Missing Values", len(validation["missing_values"])],

        ["Invalid Emails", len(validation["invalid_emails"])],

        ["Negative Values", len(validation["negative_values"])],

        ["Future Dates", len(validation["future_dates"])]

    ]

    table = Table(summary)

    table.setStyle(

        TableStyle([

            ("GRID",(0,0),(-1,-1),1,colors.grey),

            ("BACKGROUND",(0,0),(-1,0),colors.lightgrey)

        ])

    )

    elements.append(table)

    doc.build(elements)

    return pdf_path