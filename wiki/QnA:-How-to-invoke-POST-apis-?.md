Hello, It's as simple as above calls, nothing different, Just instead of method GET, use POST or PUT etc. e.g.

`- How to invoke POST calls ?`

e.g. below- (Also check in the [Hello World demo repo](https://github.com/authorjapps/zerocode-hello-world))
```javaScript
        {
            "scenarioName": "Invoke POST, and receive the 201 status with an ID",
            "steps": [
                {
                    "name": "create_emp",
                    "url": "/api/v1/google-uk/employees",
                    "operation": "POST",
                    "request": {
                        "body": {
                            "id": 1000,
                            "name": "Larry Pg",
                            "addresses": [
                                {
                                    "gpsLocation": "x9000-y9000z-9000-home"
                                }
                            ]
                        }
                    },
                    "assertions": {
                        "status": 201,
                        "body": {
                            "id": 1000
                        }
                    }
                }
            ]
        }
```
