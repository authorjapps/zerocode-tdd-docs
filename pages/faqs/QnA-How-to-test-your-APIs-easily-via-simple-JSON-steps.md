GitHub Link : https://github.com/authorjapps/zerocode

## Why is it useful?
- It's Open-Source and very easy to write an API tests using JSON
- E.g. if you have an `url`, `method`, and you know the expected result, simply you can assert keeping JSON structure as it is. 
e.g.
```
{
    "scenarioName": "Invoke the GitHub REST api and assert the result",
    "steps": [
        {
            "name": "get_user_details",
            "url": "/users/octocat",
            "operation": "GET",
            "request": {
            },
            "assertions": {
                "status": 200,
                "body": {
                    "login" : "octocat",
                    "type" : "User"
                }
            }
        }
    ]
}
```

## What problem it solves?
- You can chain multiple steps to create a `scenario` or an `user journey`
- Http/Https calling is handled by the framework
- Test Reports are fuzzy search and filter enabled

## A test case template chaining two steps
```javaScript
{
    "scenarioName": "Free text - Can put Given When Then BDDish style text",
    "steps": [
        {
            "name": "a_step_name",
            "url": "a relative or absolute url or java class name",
            "operation": "a http method or java method",
            "request": {
                "headers": {
                    "if_any_key": "a value"
                },
                "body": {
                    "any_field": "a value"
                }
            },
            "assertions": {
                "status": 200,
                "headers": {
                    "if_any_key": "$NOT.NULL"
                },
                "body": {
                    "id": "an expected value"
                }
            }
        },
        {
            "name": "another_step_name",
            "url": "a relative or absolute url or java class name",
            "operation": "a http method or java method",
            "request": {
                "headers": {
                    "if_any_key": "a value"
                },
                "body": {
                    "any_field": "${$.a_step_name.request.body.any_field}"
                }
            },
            "assertions": {
                "status": 200,
                "headers": {
                    "if_any_key": "$NOT.NULL"
                },
                "body": {
                    "id": "${$.a_step_name.response.body.id}"
                }
            }
        }
    ]
}
```

See examples in the [README](https://github.com/authorjapps/zerocode)

