Table Of Contents
===
   * [Introduction](#introduction)
   * [Example Input Data](#example-input-data)
   * [Test Scenario](#test-scenario)
   * [Type Casting(optional)](#type-castingoptional)
   * [Conclusion](#conclusion)

Introduction
===
During the user journey, if the scenario to be validated has a number of similar set of input, then we can arrange them by `comma separated values` called CSV and fire the tests.

Example Input Data
===
When the source is a simple list of CSV rows as below:
```java
//user - {0}   //name - {1}     //city - {2}         //id - {3}
"octocat,      The Octocat,     San Francisco,       583231",
"foo,          Foo Is My Name,  Bar City,            112233"
```

It looks like below in a table-format:

|user           |name           |city   |id    |
| ------------- |:-------------:| -----:|-----:|
| octocat      | The Octocat | San Francisco |583231|
| foo      | Foo Is My Name | Bar City | 112233|


Test Scenario
===
In `Zerocode` we arrange the test input like below:
```json
    "parameterized": {
        "csvSource":[
              "octocat,      The Octocat,     San Francisco,       583231",
              "foo,          Foo Is My Name,  Bar City,            112233"
        ]
    }
```

The full `test scenario` looks like below and runs twice for two(2) for the CSV rows i.e. once for each row.
```json
{
    "scenarioName": "Fetch and assert GitHub userIds by their userNames",
    "steps": [
        {
            "name": "get_user_details",
            "url": "/users/${0}",
            "operation": "GET",
            "request": {
            },
            "assertions": {
                "status": 200,
                "body": {
                    "login" : "${0}",
                    "type" : "User",
                    "name" : "${1}",
                    "location" : "${2}",
                    "id" : "$EQ.${3}"
                }
            }
        }
    ],
    "parameterized": {
        "csvSource":[
              "octocat,      The Octocat,     San Francisco,       583231",
              "foo,          Foo Is My Name,  Bar City,            112233"
        ]
    }
}
```

Type Casting(optional)
===
While driving the tests from the set of input data, all input field are `String` by default. But if we want to use any of the fields as `(int)` or `(decimal)` or `(boolean)` etc, then we can cast them to the needed type as below.

```json
{
    "scenarioName": "Parameterized and type casted example - GET API",
    "steps": [
        {
            "name": "get_user_details",
            "url": "/users/${0}",
            "operation": "GET",
            "request": {
            },
            "assertions": {
                "status": 200,
                "body": {
                    "login" : "${0}",
                    "type" : "User",
                    "name" : "${1}",
                    "location" : "${2}",
                    "id" : "(int)${3}",
                    "site_admin" : "(boolean)${4}"
                }
            }
        }
    ],
    "parameterized": {
        "csvSource":[
              "octocat,      The Octocat,     San Francisco,       583231, false",
              "foo,          Foo Is My Name,  Bar City,            112233, true"
        ]
    }
}
```


Conclusion
===
We learned here how we can do parameterized testing and how(optionally) we can do type-casting of a field to the desired type.

The examples are available in the HelloWorld section of the README file. We can clone this repo and try at home! 

