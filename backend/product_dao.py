#import mysql.connector
from sql_connection import  get_sql_connection
def get_all_products(connection):
   

    #cursor = cnx.cursor()
    cursor=connection.cursor()
    query = (
        "SELECT grocery_store.products.product_id, grocery_store.products.name, grocery_store.products.uom_id, grocery_store.products.price_per_unit, uom.uom_name "
        "FROM grocery_store.products "
        "INNER JOIN grocery_store.uom ON grocery_store.products.uom_id = grocery_store.uom.uom_id")

    cursor.execute(query)
    
    response= []

    for product_id, name, uom_id, price_per_unit, uom_name in cursor:
        response.append(
            {
                'product_id' : product_id,
                'name' : name,
                'uom_id' : uom_id,
                'price_per_unit' : price_per_unit,
                'uom_name' : uom_name
            }
        )
        #print(product_id, name, uom_id, price_per_unit, uom_name)

   # cnx.close()
    
    return response


def insert_new_product(connection,product):
    cursor=connection.cursor()
    query=("insert into grocery_store.products"
           "(name,uom_id,price_per_unit)"
           "values (%s , %s , %s)") #parameterized query
    
    data= (product['product_name'],product['uom_id'],product['price_per_unit'])
    
    cursor.execute(query,data)
    connection.commit()
    
    return cursor.lastrowid
    


#to make code modular
#if __name__ == '__main__':
    #connection= get_sql_connection()
    
    #print(insert_new_product(connection ,{
        #'product_name' : 'cabbage',
        #'uom_id' : '1',
        #'price_per_unit' : '10'
    #}))

    
def delete_product(connection,product_id):
    cursor= connection.cursor()
    query= ("DELETE FROM products where product_id=" + str(product_id))
    cursor.execute(query)
    connection.commit()
    
if __name__ == '__main__':
    connection= get_sql_connection()
    
    print(delete_product(connection ,24))
    
    
    
    
#to make code modular
#if __name__ == '__main__':
    #connection= get_sql_connection()
    #print(get_all_products(connection))