from flask import Flask, request,jsonify
from sql_connection import get_sql_connection
import product_dao

app=Flask(__name__)

connection= get_sql_connection()

@app.route('/getProducts' , methods=['GET'])
def get_products():
    products = product_dao.get_all_products(connection)
    #whatever results we are getting convert into json and add access control allow origin  header
    response=jsonify(products)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

##@app.route('/test',methods=['GET'])
##def test():
    ##return jsonify({'message':'hello world'})


if __name__ == "__main__":
    print("starting python flask server for grocery store management system")
    app.run(port=5000)
    
