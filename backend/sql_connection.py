import datetime
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

print(os.getenv('mysql_db'))

__cnx = None

def get_sql_connection():
  print("Opening mysql connection")
  global __cnx

  if __cnx is None:
    __cnx = mysql.connector.connect(user=os.getenv('mysql_user'), password=os.getenv('mysql_passwd'), database=os.getenv('mysql_db'))

  return __cnx