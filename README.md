# Artemis Manager
-------

## Overview:
This is a single page web application developed to serve as a Task Management Hub for my apartment. 

## Getting Started

These instructions will get you a copy of the project up and running on your local system.

### Installation
First, clone the repo using git:    
```
git clone https://github.com/nickwilliams2020/Artemis
```

#### Running Backend
The server for this project is a Flask application. Storage information is kept in a [Sqlite3]("http://www.sqlitetutorial.net/download-install-sqlite/") database called `artemis.db`. You can change the database settings in `config.py`

The python libraries required for this project to run can be found in `requirements.txt`. Using pip, you can install them as follows:  
```
pip install -r requirements.txt
```


To get your database up and running, run the following commands from the root of the project.
```
cd artemis_backend/
flask db init
```
If you make any changes to the database, from `artemis_backend` run 
```
flask db migrate -m "<Your migration message>"
flask db upgrade
```

Finally, to run the flask app:
```
export FLASK_APP=artemis.py
flask run
```


#### Running Frontend
The webpage for the project is built and managed using [npm]("https://www.npmjs.com/"). In order to get the app started, run the following commands from the project root.
```
cd ./artemis_frontend/artemis-spa/
npm install
npm run dev
```

The Application changes depending on user preferences served from the backend flask application. Make sure this is running, or any login/registration attempts will fail. 

### Authors
* [Nicholas Williams](https://github.com/nickwilliams2020)
