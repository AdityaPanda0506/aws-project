import pandas as pd


def calculate_column_quality(series, outliers):

    score = 100

    score -= int(series.isnull().sum()) * 2

    score -= int(series.duplicated().sum())

    score -= outliers * 2

    return max(score, 0)


def validate_statistics(df, column_types):

    report = {

        "rows": int(len(df)),

        "columns": int(len(df.columns)),

        "dataset_memory_mb": round(

            float(df.memory_usage(deep=True).sum() / (1024 * 1024)),

            3

        ),

        "column_profile": {}

    }

    for column in df.columns:

        series = df[column]

        dtype = column_types[column]

        profile = {

            "detected_type": dtype,

            "count": int(series.count()),

            "unique": int(series.nunique()),

            "missing": int(series.isnull().sum()),

            "missing_percentage": round(

                float(series.isnull().sum() / len(series) * 100),

                2

            ),

            "duplicate_values": int(series.duplicated().sum()),

            "quality_score": 100

        }

        if dtype == "Numeric":

            numeric = pd.to_numeric(series, errors="coerce")

            q1 = numeric.quantile(0.25)

            q3 = numeric.quantile(0.75)

            iqr = q3 - q1

            lower = q1 - 1.5 * iqr

            upper = q3 + 1.5 * iqr

            mask = (numeric < lower) | (numeric > upper)

            outliers = []

            for idx in numeric[mask].index:

                outliers.append({

                    "row": int(idx + 2),

                    "value": float(numeric.loc[idx])

                })

            profile.update({

                "mean": round(float(numeric.mean()), 2),

                "median": round(float(numeric.median()), 2),

                "min": round(float(numeric.min()), 2),

                "max": round(float(numeric.max()), 2),

                "std": round(float(numeric.std()), 2),

                "outlier_count": len(outliers),

                "outliers": outliers

            })

            profile["quality_score"] = calculate_column_quality(

                numeric,

                len(outliers)

            )

        report["column_profile"][column] = profile

    return report