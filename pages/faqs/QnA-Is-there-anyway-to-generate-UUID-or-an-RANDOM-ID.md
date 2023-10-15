See [examples here in README](https://github.com/authorjapps/zerocode#generating-random-strings-random-numbers-and-static-strings)
Precisely as below for `UUID`(you can use ${RANDOM.NUMBER} too)-
```javaScript
{
  "scenarioName": "random_UUID",
  "steps": [
    {
      "name": "create_new_employee",
      "url": "http://localhost:9998/google-emp-services/home/employees",
      "operation": "POST",
      "request": {
        "body": {
          "id": "${RANDOM.UUID}", //<-- Everytime it creates unique uuid. See below example.
          "name": "Elen M"   
        }
      },
      "assertions": {
        "status": 201
      }
    }
  ]
}
```
