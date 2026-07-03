from fastapi import FastAPI
from routes.upload import router as upload_router
from fastapi.middleware.cors import CORSMiddleware
from routes.history import router as history_router
from routes.report import router as report_router
from routes.dashboard import router as dashboard_router
from routes.health import router as health_router

app = FastAPI(
    title="CloudGuard AI",
    description="Serverless Data Quality Monitoring Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://main.d3nmd65hzhm7cu.amplifyapp.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(history_router)

app.include_router(report_router)

app.include_router(dashboard_router)

app.include_router(health_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to CloudGuard AI",
        "status": "Running"
    }

app.include_router(upload_router)