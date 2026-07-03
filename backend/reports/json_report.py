import uuid
from datetime import datetime
from reports.recommendations import generate_recommendations

def generate_recommendations(data, statistics):

    recommendations = []

    if len(data["duplicates"]) > 0:
        recommendations.append(
            f"Remove {len(data['duplicates'])} duplicate rows."
        )

    if len(data["missing_values"]) > 0:
        recommendations.append(
            f"Fill {len(data['missing_values'])} missing values."
        )

    if len(data["invalid_emails"]) > 0:
        recommendations.append(
            f"Correct {len(data['invalid_emails'])} invalid email addresses."
        )

    if len(data["negative_values"]) > 0:
        recommendations.append(
            f"Review negative numeric values."
        )

    if len(data["future_dates"]) > 0:
        recommendations.append(
            f"Review future dates."
        )

    outliers = 0

    for column in statistics["column_profile"].values():

        outliers += column.get("outlier_count", 0)

    if outliers > 0:

        recommendations.append(
            f"Review {outliers} statistical outliers."
        )

    return recommendations


def generate_report(
        filename,
        dataframe,
        data_results,
        statistical_results,
        quality_score
):

    if quality_score >= 90:

        status = "Healthy"

    elif quality_score >= 70:

        status = "Warning"

    else:

        status = "Critical"

    report = {

        "report_id": str(uuid.uuid4()),

        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

        "filename": filename,

        "dataset_summary": {

            "rows": len(dataframe),

            "columns": len(dataframe.columns),

            "memory_mb": statistical_results["dataset_memory_mb"]

        },

        "quality_score": quality_score,

        "status": status,

        "recommendations": generate_recommendations(

            data_results,

            statistical_results

        ),

        "data_validation": data_results,

        "statistics": statistical_results

    }

    return report