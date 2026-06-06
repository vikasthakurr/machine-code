from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="DevPractice Evaluation Service", version="1.0.0")

app.include_router(router)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "evaluation"}
