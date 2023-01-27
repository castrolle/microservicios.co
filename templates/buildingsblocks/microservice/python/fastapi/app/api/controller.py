from fastapi import Request
from fastapi.openapi.utils import get_openapi
from fastapi import APIRouter

from app.business.business import * 
from app.dto.item_dto import Item

router = APIRouter()
service = Business()


@router.get("/")
async def root(request: Request):
    return service.book2()


@router.put("/items")
async def update_item(item: Item):
    results = service.book4(item)
    return results