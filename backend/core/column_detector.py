import pandas as pd
import re


EMAIL_REGEX = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

PHONE_REGEX = r"^\d{10}$"


def detect_column_type(series):

    non_null = series.dropna()

    if len(non_null) == 0:
        return "Unknown"

    # Numeric
    if pd.api.types.is_numeric_dtype(series):
        return "Numeric"

    sample = non_null.astype(str).head(50)

    # Date
    parsed = pd.to_datetime(
        sample,
        errors="coerce",
        format="mixed"
    )

    if parsed.notna().mean() > 0.8:
        return "Date"

    # Email
    email_matches = sample.str.match(EMAIL_REGEX)

    if email_matches.mean() > 0.8:
        return "Email"

    # Phone
    phone_matches = sample.str.match(PHONE_REGEX)

    if phone_matches.mean() > 0.8:
        return "Phone"

    return "Text"


def detect_dataset(df):

    detected = {}

    for column in df.columns:

        detected[column] = detect_column_type(df[column])

    return detected