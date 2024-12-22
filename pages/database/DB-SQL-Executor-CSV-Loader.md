> If you are reading this wiki for the first time, this might take you around five minutes.
> Afterwards, it will take just a min only !

## DB SQL Executor (CSV Loader or CSV Importeer)

This is particularly useful where as part of your testing:
- You are not satisfied only with the REST responses and you want to verify the DB changes has gone well or not. It's very easy to and sometimes it's a good practice to test this DB verification bit too.
- You need to perform a database setup step to load data using SQL or from a CSV file.

## Sample Test steps

### CSV Data to Store

Given a data file `my_csv_data_file.csv` in csv format:
```
ID,  AGE, NAME
1001, 23, Ronaldo
1002,   , Devaldo
1003, 35, Trevaldo
```

### Test Scenario

When executing the scenario below, the first step loads data in CSV format into the table `players` and the second
reads the data using a SQL query and verifies the stored values.
```json
{
    "scenarioName": "DbSqlExecutor: Load a CSV file with headers",
    "steps": [
        {
            "name": "Insert rows from a CSV file with headers",
            "url": "org.jsmart.zerocode.core.db.DbSqlExecutor",
            "operation": "LOADCSV",
            "request": {
                "tableName": "players",
                "csvSource": "my_csv_data_file.csv",
                "withHeaders": true
            },
            "verify": {
                "size": 3
            }
        },
        {
            "name": "Check the content of inserted rows",
            "url": "org.jsmart.zerocode.core.db.DbSqlExecutor",
            "operation": "EXECUTE",
            "request": {
                "sql": "SELECT ID, NAME, AGE FROM PLAYERS ORDER BY ID"
            },
            "verify": {
                "rows.SIZE": 3, 
                "rows": //<-- to make this pass in postgres, set the keys (example: "rows") to lowercase
                [
                    {
                        "ID": 1001,
                        "NAME": "Ronaldo",
                        "AGE": 23
                    },
                    {
                        "ID": 1002,
                        "NAME": "Devaldo",
                        "AGE": null
                    },
                    {
                        "ID": 1003,
                        "NAME": "Trevaldo",
                        "AGE": 35
                    }
                ]
            }
        }
    ]
}
```

where, 
the "verify" block represents the rows/records of the SELECT query result, as shown below:
```
            "verify": {
                ...
                "rows":
                [
                    {"ID": 1001, "NAME": "Ronaldo", "AGE": 23},
                    {"ID": 1002, "NAME": "Devaldo", "AGE": null},
                    {"ID": 1003, "NAME": "Trevaldo", "AGE": 35}
                ]
            }
```

### Config properties

To connect the database, you have to add your DB host, user and password details in the target environment properties file, e.g.

Using the H2 Database Engine in a local file, without authentication:
```
db.driver.url=jdbc:h2:./db_file_name
db.driver.user=
db.driver.password=
```

Using the PostgreSQL Database Engine, using the default user:
```
db.driver.url=jdbc:postgresql://localhost:5432/postgres
db.driver.user=postgres
db.driver.password=mypassword
```

## DB SQL Executor operations

To interact with the database you have to set the url to `org.jsmart.zerocode.core.db.DbSqlExecutor` 
as indicated in the example. 
Then you can invoke two different operations:

The `EXECUTE` operation runs a SQL statement:
- Request: 
  - `sql` (required): The SQL statement to execute.
  - `sqlParams` (optional): An array with the values of paramameters that are to be
    pased to the statement (the statement should includes placeholders `?`
    to match the parameters).
- Response:
  - `rows` (if the query is a SELECT): The data retrieved from the database.
  - empty (if the query is INSERT, UPDATE or DELETE).

The `LOADCSV` operation stores the content of a CSV file into a table.
- Request:
  - `tableName` (required): The name of the table where load the data into.
  - `csvSource` (required): The name of the CSV file that is stored in the resources folder.
    Alternatively, you can pass an array of strings, each is a CSV line.
  - `withHeaders` (optional): 
    - If false (default), all columns in the table are loaded
      (number and order of columns in CSV must match with the database).
    - If true, the first row in the CSV indicates the columns that are to be loaded. 
  - `nullString` (optional): 
    - By default, empty or blank columns in the CSV are inserted as NULL.
    - If you need to load empty non null columns, set this property to some value (e.g. `NULL`)
      to indicate the column values that must be stored as NULL.
- Response:
  - `size`: The number of rows that where stored.
