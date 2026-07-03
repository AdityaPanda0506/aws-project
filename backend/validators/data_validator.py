import re
import pandas as pd

EMAIL_REGEX = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"


def validate_data(df, column_types):

    report = {

        "duplicates": [],

        "missing_values": [],

        "invalid_emails": [],

        "negative_values": [],

        "future_dates": []

    }

    # --------------------------
    # Duplicate Rows
    # --------------------------

    duplicate_rows = df[df.duplicated()]

    for idx in duplicate_rows.index:

        report["duplicates"].append({

            "row": int(idx + 2)

        })

    # --------------------------
    # Missing Values
    # --------------------------

    for column in df.columns:

        missing = df[df[column].isnull()]

        for idx in missing.index:

            report["missing_values"].append({

                "row": int(idx + 2),

                "column": column

            })

    # --------------------------
    # Email Validation
    # --------------------------

    for column in df.columns:

        if column_types[column] == "Email":

            for idx, value in df[column].items():

                if pd.isna(value):

                    continue

                value = str(value)

                if re.match(EMAIL_REGEX, value) is None:

                    report["invalid_emails"].append({

                        "row": int(idx + 2),

                        "column": column,

                        "value": value

                    })

    # --------------------------
    # Negative Numeric Values
    # --------------------------

    for column in df.columns:

        if column_types[column] == "Numeric":

            numeric = pd.to_numeric(df[column], errors="coerce")

            negatives = numeric[numeric < 0]

            for idx in negatives.index:

                report["negative_values"].append({

                    "row": int(idx + 2),

                    "column": column,

                    "value": float(numeric.loc[idx])

                })

    # --------------------------
    # Future Dates
    # --------------------------

    for column in df.columns:

        if column_types[column] == "Date":

            dates = pd.to_datetime(df[column], errors="coerce")

            future = dates > pd.Timestamp.today()

            for idx in future[future].index:

                report["future_dates"].append({

                    "row": int(idx + 2),

                    "column": column,

                    "value": str(df.loc[idx, column])

                })

    return report