from fastapi import APIRouter, HTTPException

from aws.dynamodb_client import get_report

router = APIRouter()


@router.get("/report/{report_id}")
async def report(report_id: str):

    data = get_report(report_id)

    if data is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return data