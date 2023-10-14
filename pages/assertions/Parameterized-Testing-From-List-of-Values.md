Table Of Contents
===
   * [Introduction](#introduction)
   * [Example Input Data](#example-input-data)
   * [Test Scenario](#test-scenario)
   * [Conclusion](#conclusion)

Introduction
===
During the user journey, if the scenario to be validated has a number of similar set of input, then we can arrange them in a list and fire the tests. This saves us the time from creating new test scenarios.

Example Input Data
===
When the source is a simple list of values as below:
```java
[
    // userIds - ${0}
    "octocat",
    "foo",
    "bar"
]
```

Test Scenario
===
In `Zerocode` we arrange the test input like below:
```json
"parameterized": {
    "valueSource": [
       "octocat",
       "foo",
       "bar"
    ]
}
```

The full `test scenario` looks like below and runs thrice for three(3) values i.e. once for each value.
```json
{
    "scenarioName": "Fetch and assert GitHub userNames",
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
                    "login": "${0}"
                }
            }
        }
    ],
    "parameterized": {
        "valueSource": [
            "octocat",
            "foo",
            "bar"
        ]
    }
}
```

Conclusion
===
We learned here how we can do parameterized testing from the list of input values.

The examples are available in the HelloWorld section of the README file to clone and try at home! 

