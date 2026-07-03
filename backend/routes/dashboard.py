from fastapi import APIRouter
from aws.dynamodb_client import get_history

router = APIRouter()


@router.get("/dashboard")
async def dashboard():

    history = get_history()

    total = len(history)

    healthy = 0
    warning = 0
    critical = 0

    average = 0

    trend = []

    for item in history:

        score = float(item["quality_score"])

        average += score

        trend.append({
            "filename": item["filename"],
            "score": score
        })

        if item["status"] == "Healthy":
            healthy += 1

        elif item["status"] == "Warning":
            warning += 1

        else:
            critical += 1

    if total:
        average /= total

    return {
        "total_uploads": total,
        "healthy": healthy,
        "warning": warning,
        "critical": critical,
        "average_quality_score": round(average, 2),
        "quality_trend": trend
    }