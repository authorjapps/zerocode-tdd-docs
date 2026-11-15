>                   Anish Jha

# Purpose of a step file
Step file is a single json file which consist of one common api/step.Suppose when we are writing test for multiple flows and there will be the case where some common api/step needs to execute in more than one flow. So in this scenario instead of writing same api in each flow we can write the step in external file and can reuse in required flows.

## Using a single Step File
To understand it better, lets take an example. Suppose we have two flow flow1 and flow2 and there is a get api call which is common in both. So for get api call instead of writing in both the flow we will create an external step file and reuse this in both.

flow1.json
```json
{
  "scenarioName":"flow 1",
  "steps":[
    {
      "name": "api1",
      "url": "/api/v1/customers",
      "operation": "POST",
      "request": {
        "body": {
          "name":"anish jha",
          "age": "25",
          "gender": "male",
          "email": "anishjha93@gmail.com"
          "country": "india",
        }
      },
      "assertions": {
        "status":201
      }
    },
    {
      "id": "get_customers",
      "stepFile": "${JSON.FILE:resource_direcotry/get_customers.json}"
    }
}

```

flow2.json
```json
{
  "scenarioName":"flow 2",
  "steps":[
    {
      "name": "api2",
      "url": "/api/v1/customers/1",
      "operation": "PUT",
      "request": {
        "body": {
          "name":"anish jha",
          "age": "25",
          "gender": "male",
          "email": "anishjha93@gmail.com"
          "country": "india",
        }
      },
      "assertions": {
        "status":201
      }
    },
    {
      "id": "get_customers",
      "stepFile": "${JSON.FILE:resource_direcotry/get_customers.json}"
    }
}

```
get_customers.json
```json
{
      "name": "get_customers",
      "url": "/api/v1/customers/",
      "operation": "get",
      "request": {
      },
      "assertions": {
        "status":200
      }
    }

```

## Purpose of multiple step files
Multiple step file is same as single step file but the only difference is,single step file support one step/api call whereas multiple step file support one or more step/api call. 

## Using a multiple Step Files as Array
Lets take an example. Suppose we have two flow flow1 and flow2 and there is a two get api call which is common in both. So for get api call instead of writing in both the flow we will create an external step file and reuse this in both.

flow1.json
```json
{
  "scenarioName":"flow 1",
  "steps":[
    {
      "name": "api1",
      "url": "/api/v1/customers",
      "operation": "POST",
      "request": {
        "body": {
          "name":"anish jha",
          "age": "25",
          "gender": "male",
          "email": "anishjha93@gmail.com"
          "country": "india",
        }
      },
      "assertions": {
        "status":201
      }
    },
    {
      "id": "get_customers",
      "stepFile": "${JSON.FILE:resource_direcotry/get_customers.json}"
    }
}

```

flow2.json
```json
{
  "scenarioName":"flow 2",
  "steps":[
    {
      "name": "api2",
      "url": "/api/v1/customers/1",
      "operation": "PUT",
      "request": {
        "body": {
          "name":"anish jha",
          "age": "25",
          "gender": "male",
          "email": "anishjha93@gmail.com"
          "country": "india",
        }
      },
      "assertions": {
        "status":201
      }
    },
    {
      "id": "get_customers",
      "stepFile": "${JSON.FILE:resource_direcotry/get_customers.json}"
    }
}

```
get_customers.json
```json
[
   {
      "name": "get_customers",
      "url": "/api/v1/customers/",
      "operation": "get",
      "request": {
      },
      "assertions": {
        "status":200
      }
    },
    {
      "name": "get_customer",
      "url": "/api/v1/customer/1",
      "operation": "get",
      "request": {
      },
      "assertions": {
        "status":200
      }
    }
]

```

## Conclusion
Look for a working example in the [HelloWorld repo](https://github.com/authorjapps/zerocode-hello-world)
(Work in progress, an example to be added in the above repo)
## Passing parameters to a step file (from version 1.4.5)
Sometimes the same step file is needed more than once, but with different values. For example, creating an admin user and a viewer user uses the same steps, only the username and role are different. Instead of copying the step file for every value, add a `parameters` object to the step that uses the file, and read each value inside the step file with `${PARAM.name}`.

`parameters` works with both `stepFile` and `stepFiles`.

create_and_verify_user.json (the shared step file)
```json
[
    {
        "name": "create_user",
        "url": "/api/v1/users",
        "operation": "POST",
        "request": {
            "body": {
                "username": "${PARAM.username}",
                "role": "${PARAM.role}"
            }
        },
        "assertions": {
            "status": 201
        }
    },
    {
        "name": "get_user",
        "url": "/api/v1/users/${PARAM.username}",
        "operation": "GET",
        "request": {},
        "assertions": {
            "status": 200,
            "body": {
                "username": "${PARAM.username}",
                "role": "${PARAM.role}"
            }
        }
    }
]
```

user_roles_test.json (the scenario using the file twice, with different parameters)
```json
{
    "scenarioName": "Reuse the same step file to create an admin and a viewer user",
    "steps": [
        {
            "id": "create_admin",
            "name": "create_admin_reuse",
            "stepFiles": "${JSON.FILE:common/create_and_verify_user.json}",
            "parameters": {
                "username": "alice",
                "role": "ADMIN"
            }
        },
        {
            "id": "create_viewer",
            "stepFiles": "${JSON.FILE:common/create_and_verify_user.json}",
            "parameters": {
                "username": "bob",
                "role": "VIEWER"
            }
        }
    ]
}
```

### Things to know
- `${PARAM.name}` is replaced only in the step file used by that step. It is not available in the rest of the scenario.
- `{{PARAM.name}}` also works in place of `${PARAM.name}`.
- A parameter value can itself contain other tokens, for example `"username": "user_${RANDOM.NUMBER}"`. These are resolved after the parameters are filled in.
- Numbers and booleans are replaced as text, so use the usual casts where needed, for example `"retries": "(int)${PARAM.retries}"`.
- `parameters` is optional. Step files without it work as before.
- `parameters` must be a JSON object, and it can only be used together with `stepFile` or `stepFiles`.
- If the step file uses `${PARAM.role}` but `role` is missing from `parameters`, the test fails before any step runs, with a message like:
  `stepFiles 'common/create_and_verify_user.json' (id: create_admin) uses ${PARAM.role}, but 'role' is not in "parameters"`
- The names of the steps inside the file stay the same, so later steps can still use `${$.get_user.response...}`. In the logs and reports, each step is shown together with the step that used the file, for example `create_admin_reuse (id: create_admin) -> get_user`.