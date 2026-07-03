import json
import os
import numpy as np


class NumpyEncoder(json.JSONEncoder):

    def default(self, obj):

        if isinstance(obj, np.integer):
            return int(obj)

        if isinstance(obj, np.floating):
            return float(obj)

        if isinstance(obj, np.bool_):
            return bool(obj)

        if isinstance(obj, np.ndarray):
            return obj.tolist()

        return super().default(obj)


def save_report(report):

    os.makedirs("output/reports", exist_ok=True)

    filename = f"{report['report_id']}.json"

    filepath = os.path.join(
        "output",
        "reports",
        filename
    )

    with open(filepath, "w") as file:

        from utils.serializer import make_json_serializable

        report = make_json_serializable(report)

        json.dump(
            report,
            file,
            indent=4
        )

    return filepath