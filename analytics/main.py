from fastapi import FastAPI

app = FastAPI(title="Analytics Microservice", description="FastAPI microservice for data analysis integration.")

@app.get("/health")
def health_check():
    return {"status": "ok"}

# Future endpoints for data analysis, ML, reporting, etc. can be added here. 