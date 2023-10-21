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
