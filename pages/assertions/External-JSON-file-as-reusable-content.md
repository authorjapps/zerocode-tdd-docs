The following examples shows how to **reuse** an external JSON file or files in the Zerocode test cases

From this version onwards, Zerocode supports this feature. But there is a **usage warning** around it not to overuse this feature.


**Dependency:**
```xml
<dependency>
    <groupId>org.jsmart</groupId>
    <artifactId>zerocode-tdd</artifactId>
    <version>check-latest-in-readme-github</version>
</dependency>
```

Here is a **sample** test-case with external file as JSON content.

***

```javaScript
{
    "scenarioName": "POST API - File json as response content - Reuse body",
    "steps": [
        {
            "name": "create_emp",
            "url": "/api/v1/employees",
            "operation": "POST",
            "request": {
                "body" : "${JSON.FILE:reusable_content/request/request_body.json}"
            },
            "assertions": {
                "status": 201
            }
        },
        {
            "name": "get_user_details",
            "url": "/api/v1/employees/${$.create_emp.response.body.id}",
            "operation": "GET",
            "request": {
            },
            "assertions": {
                "status": 200,
                "body" : "${JSON.FILE:reusable_content/response/response_body.json}"
            }
        }
    ]
}
```

where the 
- `request_body.json`
```javaScript
{
    "name": "Emma",
    "surName": "Norton"
}
```

- `response_body.json`
```javaScript
{
    "id": 39001,
    "ldapId": "emmanorton",
    "name": "Emma",
    "surName": "Norton"
}
```

You can pick the handy examples from our [HelloWorld repo](https://github.com/authorjapps/zerocode-hello-world) (as shown below) : 

![hello_world_passed](https://user-images.githubusercontent.com/12598420/47264733-49dbbd80-d514-11e8-96db-4e593c68b96d.png)


Suggestions and Recommendations
===
 * Try to keep the test cases as independent possible. Do not create too much dependencies on external files which will add unnecessary complexity to the project. 
 * The complexity could be in terms project maintenance or interpreting the test case itself. Traversing around the tests are painful and we pay a price for it if they not readable.
 * We should use the IDE features which now a days, makes it a lot easier in terms of dealing with JSON contents to keep the testing life cycle simple n clean.