import datetime
import os

from flask import Flask, request
from requests import get
from flask_cors import CORS, cross_origin

current_datetime = datetime.datetime.now()
date = current_datetime.date()
current_year = date.strftime("%Y")

app = Flask(__name__)
CORS(app)

ACCESSKEY = os.environ.get('ACCESSKEY')
SECRETKEY = os.environ.get('SECRETKEY')

place_id = 'usa/new-york'


@app.route('/seasons')
def proxy():
    country = request.args.get('country')
    year = request.args.get('year')
    param_data = {
        'accesskey': ACCESSKEY,
        'secretkey': SECRETKEY,
        'version': '3',
        'prettyprint': '1',
        # 'placeid': place_id,
        'country': country,
        'types': 'seasons',
        # 'object': 'moon',
        # 'types': 'meridian,phase',
        'year': year
    }

    data = get('https://api.xmltime.com/holidays', params=param_data).content

    print(data)

    return 'toto'

@app.route('/astro_sun')
def proxy_time():
    place = request.args.get('place')
    start = request.args.get('start')
    param_data = {
        'accesskey': ACCESSKEY,
        'secretkey': SECRETKEY,
        'version': '3',
        'prettyprint': '1',
        'object': 'sun',
        'types': 'all',
        'placeid': place,
        'startdt': start
    }

    return get('https://api.xmltime.com/astronomy', params=param_data).content

