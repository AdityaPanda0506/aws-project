def generate_recommendations(data_validation, statistics):

    recommendations = []

    # ----------------------------
    # Duplicate Rows
    # ----------------------------
    duplicates = len(data_validation.get("duplicates", []))

    if duplicates:
        recommendations.append(
            f"Remove {duplicates} duplicate row(s)."
        )

    # ----------------------------
    # Missing Values
    # ----------------------------
    missing = len(data_validation.get("missing_values", []))

    if missing:
        recommendations.append(
            f"Fill or remove {missing} missing value(s)."
        )

    # ----------------------------
    # Invalid Emails
    # ----------------------------
    emails = len(data_validation.get("invalid_emails", []))

    if emails:
        recommendations.append(
            f"Correct {emails} invalid email address(es)."
        )

    # ----------------------------
    # Negative Values
    # ----------------------------
    negatives = len(data_validation.get("negative_values", []))

    if negatives:
        recommendations.append(
            f"Review {negatives} unexpected negative numeric value(s)."
        )

    # ----------------------------
    # Future Dates
    # ----------------------------
    future = len(data_validation.get("future_dates", []))

    if future:
        recommendations.append(
            f"Verify {future} future date value(s)."
        )

    # ----------------------------
    # Outliers
    # ----------------------------
    for column, info in statistics["column_profile"].items():

        outliers = info.get("outlier_count", 0)

        if outliers:

            recommendations.append(
                f"Investigate {outliers} outlier(s) in '{column}'."
            )

    # ----------------------------
    # Null Percentage
    # ----------------------------
    for column, info in statistics["column_profile"].items():

        null_percent = info.get("null_percentage", 0)

        if null_percent > 30:

            recommendations.append(
                f"'{column}' has {null_percent:.1f}% missing values. Consider cleaning or dropping this column."
            )

    # ----------------------------
    # Unique Values
    # ----------------------------
    for column, info in statistics["column_profile"].items():

        unique = info.get("unique", 0)

        count = info.get("count", 1)

        if count > 0 and unique == 1:

            recommendations.append(
                f"'{column}' contains only one unique value. It may not provide useful information."
            )

    # ----------------------------
    # Healthy Dataset
    # ----------------------------
    if not recommendations:

        recommendations.append(
            "Dataset passed all validation checks. No significant quality issues were detected."
        )

    return recommendations