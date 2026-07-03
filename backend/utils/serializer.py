import numpy as np
import pandas as pd


def make_json_serializable(obj):
    """
    Recursively convert NumPy/Pandas objects into native Python types.
    """

    # Dictionaries
    if isinstance(obj, dict):
        return {
            key: make_json_serializable(value)
            for key, value in obj.items()
        }

    # Lists
    elif isinstance(obj, list):
        return [
            make_json_serializable(item)
            for item in obj
        ]

    # Tuples
    elif isinstance(obj, tuple):
        return tuple(
            make_json_serializable(item)
            for item in obj
        )

    # NumPy Integer
    elif isinstance(obj, np.integer):
        return int(obj)

    # NumPy Float
    elif isinstance(obj, np.floating):
        return float(obj)

    # NumPy Boolean
    elif isinstance(obj, np.bool_):
        return bool(obj)

    # NumPy Array
    elif isinstance(obj, np.ndarray):
        return obj.tolist()

    # Pandas Timestamp
    elif isinstance(obj, pd.Timestamp):
        return obj.strftime("%Y-%m-%d %H:%M:%S")

    # Missing values
    elif pd.isna(obj):
        return None

    return obj