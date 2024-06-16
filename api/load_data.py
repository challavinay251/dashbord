# api/load_data.py

import json
from api.models import DataPoint

def run():
    with open('jsondata.json') as f:
        data = json.load(f)
        for item in data:
            DataPoint.objects.create(**item)
