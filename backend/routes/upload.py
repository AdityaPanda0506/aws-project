from fastapi import APIRouter, UploadFile, File
from core.validator_engine import validate_csv

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

@router.post("/")
async def upload_csv(file: UploadFile = File(...)):
    result = await validate_csv(file)
    return result