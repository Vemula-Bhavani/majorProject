from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import requests
import random
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

WEATHER_API_KEY = "d5203142c7b54a71f92525a1bf8c7937"
NEWS_API_KEY = "d922145bfe4641ba85886da5bcd87917"


@app.get("/dashboard-data")
def get_dashboard_data(city: str = None, lat: float = None, lon: float = None):

    # ---------------- WEATHER ----------------
    if lat and lon:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}&units=metric"
    else:
        city = city or "Hyderabad"
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={WEATHER_API_KEY}&units=metric"

    weather = requests.get(url).json()

    if weather.get("cod") != 200:
        return {"error": "City not found"}

    location = weather["name"]

    # ---------------- FORECAST ----------------
    forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?q={location}&appid={WEATHER_API_KEY}&units=metric"
    forecast = requests.get(forecast_url).json()

    hourly = [
        {"time": item["dt_txt"].split(" ")[1][:5], "temp": item["main"]["temp"]}
        for item in forecast["list"][:6]
    ]

    daily = []
    seen = set()
    for item in forecast["list"]:
        date = item["dt_txt"].split(" ")[0]
        if date not in seen:
            seen.add(date)
            daily.append({"date": date, "temp": item["main"]["temp"]})
        if len(daily) == 5:
            break

    # ---------------- REAL-TIME FLOOD NEWS ----------------
    news_url = (
        f"https://newsapi.org/v2/everything?"
        f"q=\"{location}\" AND (flood OR flooding OR heavy rain OR waterlogging OR monsoon)&"
        f"language=en&sortBy=publishedAt&pageSize=20&apiKey={NEWS_API_KEY}"
    )

    news_response = requests.get(news_url)
    news_data = news_response.json()

    images = []
    reports = []

    if news_data.get("status") == "ok":
        for article in news_data.get("articles", []):

            title = article.get("title", "")
            desc = article.get("description", "")
            image_url = article.get("urlToImage")

            text = (title + " " + desc).lower()

            # STRICT FILTER
            if any(word in text for word in [
                "flood", "flooding", "heavy rain", "waterlogging", "monsoon"
            ]):

                if image_url:
                    images.append({
                        "src": image_url,
                        "label": title
                    })

                reports.append({
                    "location": location,
                    "description": title
                })

    # 🔀 RANDOMIZE → makes UI dynamic
    random.shuffle(images)
    random.shuffle(reports)

    # ---------------- WEATHER DATA ----------------
    rainfall = weather.get("rain", {}).get("1h", random.uniform(0, 20))
    risk = min(100, rainfall * 5 + random.randint(10, 30))

    return {
        "location": location,
        "temperature": weather["main"]["temp"],
        "description": weather["weather"][0]["description"],
        "pressure": weather["main"]["pressure"],
        "humidity": weather["main"]["humidity"],
        "wind": weather["wind"]["speed"],
        "visibility": weather.get("visibility", 0) / 1000,

        "hourly": hourly,
        "daily": daily,

        "rainfall": rainfall,
        "aiRiskScore": risk,
        "alerts": random.randint(1, 10),
        "affectedRegions": random.randint(5, 20),

        "images": images[:6],
        "reports": reports[:6]
    }

@app.get("/previous-floods")
def get_previous_floods():
    with open("data/flood_data.json", "r") as file:
        data = json.load(file)

    return data