import io
import json
import torch
import numpy as np
from PIL import Image
from fastapi import FastAPI, File
from fastapi.middleware.cors import CORSMiddleware
from base64 import b64encode
import base64

app = FastAPI(
    title="Face detection api",
    description="yoo",
    version="0.0.1",
)

origins = [
    "http://localhost",
    "http://localhost:8000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = torch.hub.load('yolov5', 'custom', path='./static/best.pt', source='local', force_reload=True)

@app.get('/notify/v1/health')
def get_health():
    return {"msg": "OK"}

def get_image_from_bytes(binary_image, max_size=1024):
    input_image = Image.open(io.BytesIO(binary_image)).convert("RGB").resize((640, 640))
    return input_image

@app.post("/object-to-img")
async def detect_return_base64_img(data: dict):
    image_data = data.get("image")
    if image_data:
        image_bytes = base64.b64decode(image_data.split(",")[1])
        input_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        # Assuming model is already defined and loaded
        results = model(input_image)
        detect_res = results.pandas().xyxy[0].to_json(orient="records") 
        detect_res = json.loads(detect_res)
        results.render() 
        detected_objects = set(i["name"] for i in detect_res)
        processed_image = results.ims[-1]  # Assuming the last processed image is the one we want to return
        with io.BytesIO() as output_buffer:
            Image.fromarray(processed_image).save(output_buffer, format="JPEG")
            processed_image_data = output_buffer.getvalue()
            processed_image_base64 = base64.b64encode(processed_image_data).decode('utf-8')
        return {"result": list(detected_objects), "img": "data:image/jpeg;base64," + processed_image_base64}
    else:
        return {"error": "No image data received"}