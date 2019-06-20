import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from db_config import DATABASE_URL

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
db = SQLAlchemy(app)

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)

# # Save references to each table
# Samples_Metadata = Base.classes.sample_metadata
# Samples = Base.classes.samples



# Routes for webpages

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


# Routes for data

@app.route("/api/haunted")
def getHauntedData():
    df = pd.read_sql("""
        select  * 
        from    haunted_table
        """, db.engine)
    csv_file = df.to_csv()
    return csv_file

if __name__ == "__main__":
    app.run()
