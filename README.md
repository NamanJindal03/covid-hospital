# Covid 
# About
This project has some API's to hasten the process of viewing patients records and keeping their status up to date

# How to Use
1. Clone this project
2. Install node and mongoose
3. Enter these commands
```
npm install
npm start
```
4. If you want to change the JWTSECRET you can change in .env file
5. Your project is ready

# Features 
## POSTMAN LINK
```
https://www.getpostman.com/collections/5b9194e812df3cd7ac56
```
You can find all the routes in here

### Register a new doctor
  * [Route](http://localhost:8002/doctors/register)
  * Method : POST
  * Request parameters: name, email, password & confirm_password
  * Response : Message stating success or failure

### Doctor's Login
  * [Route](http://localhost:8002/doctors/login)
  * Method : POST
  * Request parameters: email and password
  * Response : We get a JWT on succesfully login which needs to be passed in HEADERS for restricted routes

### Register a patient
  * [Route](http://localhost:8002/patients/register)
  * Method : POST
  * Request parameters: mobile
  * Request Header :    
    - Key: Authorization    
    - Value: bearer JWT token
  * Response: Returns complete info of the patient if regiestered or already registered

### Create a new report for the given patient
  * [Route](http://localhost:8002/patients/:id/create-report)
  * Method : POST
  * Request Header :    
    - Key: Authorization    
    - Value: bearer JWT TOKEN
  * Request parameters: patient _id in the url from the  database
  * Response: returns report or a failure message

### Returns all the reports of a patient from oldest to latest
  * [Route](http://localhost:8002/patients/:id/all-reports)
  * Method : GET
  * Request Header :    
    - Key: Authorization    
    - Value: bearer JWT Token
  * Request parameters: patient id in the url
  * Response: Returns all the reports of a patient from oldest to latest if succesful otherwise failure message

### Returns all reports of all the patients filtered by a specific status
  * [Route](http://localhost:8000/api/v1/reports/:status)
  * Method : GET
  * Request Header :    
    - Key: Authorization    
    - Value: bearer <token>
  * Response: Returns all reports of all the patients filtered by a specific status if request successful otherwise failure message


# Directory Structure 
This Application follows MVC Architecture

1. Config - Containes configuration files for database(mongoose)
2. Controllers - Core logic(contains functions and renders views)
3. models - schema for databases are defined in here
4. routes - contains all routes defined in the application

