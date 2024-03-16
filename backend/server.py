from flask import Flask, request, jsonify
from flask_cors import CORS
from sql_connection import get_sql_connection
import mysql.connector
import json

import product_dao
import order_dao
import uom_dao

app = Flask(__name__)

# cors is cross origin resource sharing, flask-cors is used to allow the frontend to access the backend
CORS(app, origins='http://127.0.0.1:5502', methods=['GET', 'POST', 'DELETE'])
connection = get_sql_connection()

@app.route('/getUOM', methods=['GET'])
def get_uom():
    response = uom_dao.get_uoms(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getProducts', methods=['GET'])
def get_products():
    response = product_dao.get_all_products(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertProduct', methods=['POST'])
def insert_product():
    request_payload = json.loads(request.form['data'])
    product_id = product_dao.insert_new_product(connection, request_payload)
    response = jsonify({
        'product_id': product_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getAllOrders', methods=['GET'])
def get_all_orders():
    response = order_dao.get_all_orders(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertOrder', methods=['POST'])
def insert_order():
    request_payload = json.loads(request.form['data'])
    order_id = order_dao.insert_order(connection, request_payload)
    response = jsonify({
        'order_id': order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteProduct', methods=['POST'])
def delete_product():
    response = request.get_json()
    response = response.get('product_id')
    
    if response is None:
        return jsonify({'error': 'No product_id provided'})
    
    return_id = product_dao.delete_product(connection, response)
    response = jsonify({
        'product_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/home', methods=['GET'])
def home():
    response = jsonify({
        'message': 'Welcome to Grocery Store Management System'
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Grocery Store Management System")
    app.run(port=5000)