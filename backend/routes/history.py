from fastapi import APIRouter

from aws.dynamodb_client import (
    get_history,
    search_history
)

router = APIRouter()


@router.get("/history")
async def history():

    return get_history()


@router.get("/history/search")
async def search(filename: str):

    return search_history(filename)