        
e.g. below- (Also check in the [TOC README file](https://github.com/authorjapps/zerocode#passing-headers-to-the-rest-api))

```javaScript
{
    "scenarioName": "Passing  headers to a rest api @@JohnSmart",
    "steps": [
        {
            "name": "create_new_employee",
            "url": "http://localhost:9999/google-emp-services/home/employees",
            "operation": "POST",
            "request": {
                "headers": {
                    "clientId": "client-sadfsdf-twertert-13123",
                    "clientSecret": "pwd-sadfasdf1234234-sdfsdf-4234",
                    "customParam1": "customParam1Value"
                },
                "body": {
                    "id": 1000,
                    "name": "Larry ${RANDOM.STRING:5}",
                    "password": "${RANDOM.STRING:10}"
                }
            },
            "assertions": {
                "status": 201
            }
        }
    ]
}
``` 

## Note-
The host and port can be externalized into a properties file too for the regression suites-
e.g.

```java
@TargetEnv("hello_world_host.properties")
@RunWith(ZeroCodeUnitRunner.class)
public class JustHelloWorldMoreTest {

    @Test
    @JsonTestCase("helloworld_more/hello_world_post_201.json")
    public void testHelloWorld_post() throws Exception {
    }

}
```

where "hello_world_host.properties" is like below-
```properties
# Web Server host and port
restful.application.endpoint.host=http://localhost
restful.application.endpoint.port=9999
# Web Service context; Leave it blank in case you do not have a common context
restful.application.endpoint.context=
```
