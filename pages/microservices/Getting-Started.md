# Minimum System Requirements

- JDK 8
- JUnit 4.12

# Steps

Add this maven dependencies in `test` scope which transitively brings in `JUnit` lib.

```xml
<dependency>
    <groupId>org.jsmart</groupId>
    <artifactId>zerocode-tdd</artifactId>
    <version>1.3.x</version> <!-- Pick the latest release -->
    <scope>test</scope>
</dependency>
```


**Latest release:** [![Maven](https://maven-badges.herokuapp.com/maven-central/org.jsmart/zerocode-tdd/badge.svg)](https://maven-badges.herokuapp.com/maven-central/org.jsmart/zerocode-tdd/) 🏹

Then annotate your `JUnit` test method pointing to the JSON/YAML scenario-file as below via `@Scenario` and `run` as a JUnit test. That's it really!

```java
@TargetEnv("github_host.properties")
@RunWith(ZeroCodeUnitRunner.class)
public class JustHelloWorldTest {

    @Test
    @Scenario("helloworld/hello_world_scenario_happy_path.json")
    public void testGet() throws Exception {

    }
}
```

Where, the `hello_world_scenario_happy_path.json` looks like below.

```javaScript
                          hello_world_scenario_happy_path.json
                          ------------------------------------
{
    "scenarioName": "Validate the GET api @@Richard",     // <--- Free text with author meta data
    "steps": [
        {
            "name": "get_user_details",                   // <--- Hook for next step
            "url": "/users/octocat",                      // <--- Http URL relative to the host
            "method": "GET",                              // <--- Http method GET, PUT, POST or DELETE etc
            "retry": {
                "max": 5,
                "delay": 500                              // <--- configurable retry options
            },
            "request": {
                "headers": {
                    "Content-Type": "application/json"    // <--- Http request headers
                },
                "queryParams":{
                    "type": "user"                        // <--- Http query params
                }
            },
            "verify": {
                "status": 200,                            // <--- Http status code
                "headers": {
                    "Content-Type": [
                        "application/json; charset=utf-8" // <--- Http response headers
                    ]
                },
                "body": {
                    "login": "octocat"                    // <--- Http response payload
                }
            }
        }
    ]
}
```

the `github_host.properties` looks as below:

```properties
                       github_host.properties
                       ----------------------
web.application.endpoint.host=https://api.github.com
web.application.endpoint.port=443
web.application.endpoint.context=
```

---

Or using YAML:

```yml
                       hello_world_scenario_happy_path.yaml
                       ------------------------------------

scenarioName: Validate the GET api @@Richard
steps:
 -
  name: get_user_details                                  // <--- Hook for next step
  url: /users/octocat                                     // <--- Http URL relative to the host
  method: GET                                             // <--- Http method GET, PUT, POST or DELETE etc
  retry:
   max: 3                                                 // <--- configurable retry options
   delay: 1000
  request:
   headers:
    Content-Type: application/json                        // <--- Http request headers
   queryParams:
    type: user                                            // <--- Http query params
  verify:
   status: 200                                            // <--- Http status code
   headers:
    Content-Type:
     - application/json; charset=utf-8                    // <--- Http response headers
   body:                                                  // <--- Http response payload
    login: octocat
```

Runner:

```java
@TargetEnv("github_host.properties")
@RunWith(ZeroCodeUnitRunner.class)
public class JustHelloWorldTest {

    @Test
    @Scenario("helloworld/hello_world_scenario_happy_path.yaml")
    public void testGet() throws Exception {

    }
}
```

# An User-Journey Test Scenario Example

Visit this [User-Journey CRUD testing automation](https://github.com/authorjapps/zerocode/wiki/User-journey:-Create,-Update-and-GET-Employee-Details)

# Try-at-home examples

Clone or Download the [HelloWord](https://github.com/authorjapps/zerocode-hello-world) project, and follow the [Steps](https://github.com/authorjapps/zerocode-hello-world/blob/master/README.md) to Run Hello World
