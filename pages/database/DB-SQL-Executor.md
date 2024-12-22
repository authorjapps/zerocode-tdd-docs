> If you are reading this wiki for the first time, this might take you around five minutes.
> Afterwards, it will take around a min only !

## DB SQL Executor

This is particularly useful where as part of your testing:
- You are not satisfied only with the REST responses and you want to verify the DB changes has gone right or not. 
- It's very easy to do and and sometimes it's a good practice to do DB verification as well.

## Make sure PostGres is Up and Running
Example:
```bash
➜  OSS> docker ps                                            
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                     NAMES
b421c19858f5   postgres:9.3   "docker-entrypoint.s…"   46 minutes ago   Up 46 minutes   0.0.0.0:35432->5432/tcp   compose-db-1
```

### Sample Test Scenario and Steps
```json
{
    "scenarioName": "DbSqlExecutor: Read and write data using SQL - PostgreSQL",
    "steps": [
        {
            "name": "Test database setup",
            "url": "org.jsmart.zerocode.core.db.DbSqlExecutor",
            "operation": "EXECUTE",
            "request": {
                "sql": "DROP TABLE IF EXISTS PEOPLE; CREATE TABLE PEOPLE (ID INTEGER, NAME VARCHAR(20), START DATE, ACTIVE BOOLEAN);"
            },
            "verify": { }
        },
        {
            "name": "Insert rows using SQL",
            "url": "org.jsmart.zerocode.core.db.DbSqlExecutor",
            "operation": "EXECUTE",
            "request": {
                "sql": "INSERT INTO PEOPLE VALUES (1, 'Jeff Bejo', '2024-09-01', true); INSERT INTO PEOPLE VALUES (2, 'John Bajo', '2024-09-02', false);"
            },
            "verify": { }
        },
        {
            "name": "Insert with parameters and nulls",
            "url": "org.jsmart.zerocode.core.db.DbSqlExecutor",
            "operation": "execute", //<-- Uppercase for consistency, but also allows lowercase
            "request": {
                "sql": "INSERT INTO PEOPLE (ID, NAME, START, ACTIVE) VALUES (?, ?, ?, ?);",
                "sqlParams": [3, null, null, true]
            },
            "verify": { }
        },
        {
            "name": "Retrieve rows using SQL",
            "url": "org.jsmart.zerocode.core.db.DbSqlExecutor",
            "operation": "EXECUTE",
            "request": {
                "sql": "SELECT ID, NAME, to_char(START,'yyyy-MM-dd') AS START, ACTIVE FROM PEOPLE WHERE ACTIVE=?",
                "sqlParams": [true]
            },
            "verify": {
				"rows.SIZE": 2,
                "rows": [ //<-- same than db_sql_execute.json, but keys in lowercase (postgres converts to lower)
                    { "id": 1, "name": "Jeff Bejo", "start": "2024-09-01", "active": true },
                    { "id": 3, "name": null, "start": null, "active": true }
                ]
            }
        }
    ]
}
```

### Execution Output
Here is the execution log after the above test scenario has successfully connected to the DB and able to perform the steps:
```text
-----------------------------------------------------------------------------------

Scenario:
+++++++++

DbSqlExecutor: Read and write data using SQL - PostgreSQL 

-----------------------------------------------------------------------------------
*requestTimeStamp:2024-12-22T12:45:54.187
step:Test database setup
url:org.jsmart.zerocode.core.db.DbSqlExecutor
method:EXECUTE
request:
{
  "sql" : "DROP TABLE IF EXISTS PEOPLE; CREATE TABLE PEOPLE (ID INTEGER, NAME VARCHAR(20), START DATE, ACTIVE BOOLEAN);"
} 

Response:
{
  "rows" : { }
}
*responseTimeStamp:2024-12-22T12:45:54.316 
*Response delay:129.0 milli-secs 
---------> Expected Response: <----------
{ } 
 
-done-

*requestTimeStamp:2024-12-22T12:45:54.320
step:Insert rows using SQL
url:org.jsmart.zerocode.core.db.DbSqlExecutor
method:EXECUTE
request:
{
  "sql" : "INSERT INTO PEOPLE VALUES (1, 'Jeff Bejo', '2024-09-01', true); INSERT INTO PEOPLE VALUES (2, 'John Bajo', '2024-09-02', false);"
} 

Response:
{
  "rows" : { }
}
*responseTimeStamp:2024-12-22T12:45:54.331 
*Response delay:11.0 milli-secs 
---------> Expected Response: <----------
{ } 
 
-done-


*requestTimeStamp:2024-12-22T12:45:54.335
step:Insert with parameters and nulls
url:org.jsmart.zerocode.core.db.DbSqlExecutor
method:execute
request:
{
  "sql" : "INSERT INTO PEOPLE (ID, NAME, START, ACTIVE) VALUES (?, ?, ?, ?);",
  "sqlParams" : [ 3, null, null, true ]
} 

Response:
{
  "rows" : { }
}
*responseTimeStamp:2024-12-22T12:45:54.350 
*Response delay:15.0 milli-secs 
---------> Expected Response: <----------
{ } 
 
-done-

*requestTimeStamp:2024-12-22T12:45:54.354
step:Retrieve rows using SQL
url:org.jsmart.zerocode.core.db.DbSqlExecutor
method:EXECUTE
request:
{
  "sql" : "SELECT ID, NAME, to_char(START,'yyyy-MM-dd') AS START, ACTIVE FROM PEOPLE WHERE ACTIVE=?",
  "sqlParams" : [ true ]
} 

Response:
{
  "rows" : [ {
    "id" : 1,
    "name" : "Jeff Bejo",
    "start" : "2024-09-01",
    "active" : true
  }, {
    "id" : 3,
    "name" : null,
    "start" : null,
    "active" : true
  } ]
}
*responseTimeStamp:2024-12-22T12:45:54.386 
*Response delay:32.0 milli-secs 
---------> Expected Response: <----------
{
  "rows.SIZE" : 2,
  "rows" : [ {
    "id" : 1,
    "name" : "Jeff Bejo",
    "start" : "2024-09-01",
    "active" : true
  }, {
    "id" : 3,
    "name" : null,
    "start" : null,
    "active" : true
  } ]
} 
 
-done-

```

### Errors or Exceptions
If you see errors like the below, then see these discussions [here](https://github.com/authorjapps/zerocode/pull/686).
1))
```text
No suitable driver found for jdbc:postgresql
```
Solution:
You need to add the correct Postgres Driver dependency

2))
```text
java.lang.RuntimeException: java.lang.ClassNotFoundException: org.jsmart.zerocode.core.db.DbSqlExecutor
```
Solution:
You need to add the correct version of zerocode-tdd dependency