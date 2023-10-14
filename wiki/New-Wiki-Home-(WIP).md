&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img width="135"  height="120" alt="Zerocode" src="https://upload.wikimedia.org/wikipedia/commons/9/98/New-Bouncywikilogo.gif">


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   Welcome to the zerocode wiki!

Use the sidebar on the right to locate a topic or use **"Ctrl+f"** to find a topic. 👉

If you are not sure where to start, why not take a look at the [What is Zerocode](https://github.com/authorjapps/zerocode/wiki/What-is-Zerocode-testing), then jump to the [Developer's Guide]() below.

Features
===
   * [Introduction](#introduction)
   * [Super Easy and Zero Complexity](#super-easy-and-reduced-complexity)
   * [Lenient and Strict Matching](#lenient-and-strict-matching)
   * [Validation and Verification](#validation-and-verification)
   * [Load Testing Made Easy](#load-testing-made-easy)
   * [Security Testing Made Easy](#security-testing-made-easy)
   * [Dev/Test/BA Collaboration Made Easy](#collaboration-made-easy)
   * [Useful Reports and Dashboards](#useful-reports-and-dashboards)
   * [Smart Projects Using Zerocode](#smart-projects-using-zerocode)

Developer Guide
===
* [Getting started ⛹‍♂](https://github.com/authorjapps/zerocode/wiki/Getting-Started)
* [Supported testing frameworks](#supported-testing-frameworks)
* [A HTTP REST scenario or an user journey](https://github.com/authorjapps/zerocode/wiki/User-journey:-Create,-Update-and-GET-Employee-Details)
* [Running one or more scenarios](#running-a-scenario)
* [Performance Testing - Auto HTTP load generation](https://github.com/authorjapps/zerocode/wiki/Load-or-Performance-Testing-(IDE-based))
* [Performance Testing - JUnit4](https://github.com/authorjapps/performance-tests#multi-scenario-parallel-load)
* [Performance Testing - JUnit5](https://github.com/authorjapps/zerocode/wiki/JUnit5-Jupiter-Parallel-Load-Extension)
* [Kafka Validation](https://github.com/authorjapps/zerocode/wiki/Kafka-Testing-Introduction)
* [Parameterized Scenario](#parameterized-scenario)
* [Using Custom HttpClient](#using-custom-httpclient)
* [Sending query params to HTTP hosts](#sending-query-params-to-http-hosts)
* [Http Basic-Auth security validation](#http-basic-auth-security-validation)
* [Boundary End Point Mocking](#boundary-end-point-mocking)
* [Externalizing RESTful host and port](#externalizing-restful-host-and-port)
* [Running a scenario in loop](#running-a-scenario-in-loop)
* [Passing Content-Type header](#passing-content-type-header)
* [Http Max TimeOut or Implicit Wait](https://github.com/authorjapps/zerocode/wiki/HTTP-max-timeout-or-implicit-wait)
* [Dealing with dynamic arrays](https://github.com/authorjapps/zerocode/wiki/When-JSON-Path-Matching-returns-value-or-values-as-an-array)
* [Chaining multiple steps for a scenario](https://github.com/authorjapps/zerocode/wiki/User-journey:-Create,-Update-and-GET-Employee-Details)
* [Ignoring step failures](#ignoring-step-failures)
* [Running a Suite of Tests](#running-a-suite-of-tests)
* [Zerocode test-input tokens](#zerocode-tokens)
* [Verifying HTTP error messages](#verifying-http-error-messages)
* [Invoking java utility methods](#invoking-java-utility-methods)
* [Re-Using or injecting custom properties](#re-using-or-injecting-custom-properties)
* [Bare JSON Strings as payload](#bare-json-strings-as-payload)
* [Empty HTTP body payload](#empty-http-body-payload)
* [Handling Content-Type with charset-16 or charset-32](#handling-content-type-with-charset-16-or-charset-32)
* [Environment switching in build pipeline](https://github.com/authorjapps/zerocode/wiki/After-you-have-written-all-the-tests,-what's-next)
* [SOAP method invocation with xml input](https://github.com/authorjapps/zerocode/wiki/SOAP-method-validation-with-xml-input)
* [SOAP method invocation via Corporate Proxy](https://github.com/authorjapps/zerocode/wiki/SOAP-method-invocation-through-Corporate-Proxy)
* [Chatbot Validation](#chatbot-validation)
* [Python DSL](#python-dsl)
* [YAML and JSON Slice And Dice - Solved](#yaml-and-json-slice-and-dice)
* [Inspired by and credits](#inspired-by)
* [References, Discussions and articles](#references-discussions-and-articles)

Introduction
===
[Zerocode](https://github.com/authorjapps/zerocode/blob/master/README.md) helps you to design better Test Cases for your business functionalities and then maintain them easily to avoid sleepless nights. You do this simply by configuring, declaring and executing the scenario-files enabling you to completely eliminate the glue or boilerplate coding.

Super Easy and Reduced Complexity
===
Simply annotate your test method with **@Test** and run like `JUnit` tests. 

Testing becomes an easy and effortless job due to the **simplicity** nature of YAML/JSON formats and their native support by popular IDEs e.g. `Eclipse /IntelliJ /NetBeans` etc with no extra plugin. Super easy!

### Reduced Complexity
It enables us to write automation tests for our 
+ `API End Point Validations`, 
+ `Performance(Load/Stress) Validations`, 
+ `Consumer Contract Validations`, 
+ `End to End User Journey`, 
+ `In Memory Application Validations`  and 
+ `API Security Validations` etc, 

at the **speed** of writing **JUnit** tests.

> It makes the tests declarative, configurable, and accurate.

Lenient and Strict Matching
===
Zerocode provides both [LENIENT and STRICT](https://github.com/authorjapps/zerocode/wiki/Strict-Mode-Payload-Comparison) matching mode for result comparison.


Validation and Verification
===
Zerocode enables you to achieve both [Verification and Validation](https://en.wikipedia.org/wiki/Verification_and_validation).


Load Testing Made Easy
===
Visit here to learn [JUnit way of load and stress generation](https://github.com/authorjapps/zerocode/wiki/Load-or-Performance-Testing-(IDE-based))

Security Testing Made Easy
===
Zerocode gives you out of the box **SSL** enabled Http Client and **SOAP** Client along with the optional MIME type converters e.g. XML to JSON if needed to increase test readability. It provides you with the options to configure **Corporate Proxy** at runtime to allow API invocations via `corporate-proxies`.

Zerocode has built general functionality which enables you to **extend** and enrich the **framework** behaviour by simply executing external Java methods as utility-functions to achieve business goals rather than putting every feature into the core framework. 


Useful Reports and Dashboards
===
Zerocode prints the request, response into the console as well as to the log file in the `/target` folder in a **human/business readable** format, along with producing granular report in the `CSV format` and `Interactive Fuzzy Search Enabled Chart report`. 

You can `search and filter` the test report by `author` or `test-scenario` or `test-step` or any relevant matching text making it super easy to trace a step in the context of a scenario or user-journey.

### Sample Test Report

Test reports are generated into  `/target`  folder every time the tests are run. Sample [reports are here](https://github.com/authorjapps/zerocode/blob/master/README.md#6) format. 

### Traceable Test Logs

Test logs are generated in the console as well as an user-defined log file. Default log location is  `target/logs/zerocode_rest_bdd_logs.log` . 

_::Note::_
Every **step** can be traced with an **auto** generated **STEP-ID** to correlate a request with its response.

e.g.
### If the test passed: 
```java
--------- CORRELATION-ID: e6170365-94e7-49dc-a1a3-5e102468acd9 ---------
requestTimeStamp:2017-12-20T10:00:48.840
step:get_same_employee
url:http://localhost:9999/api/testing/v1/persons/UK1001
method:GET
request:
{ } 
--------- CORRELATION-ID: e6170365-94e7-49dc-a1a3-5e102468acd9 ---------
Response:
{
  "status" : 200,
  "headers" : {
    "Date" : [ [ "Wed, 20 Dec 2016 03:00:48 GMT" ] ]
  },
  "body" : {
    "id" : "UK1001",
    "name" : "Gov UK",
    "addresses" : [ {
      "line1" : "HOME, AECS Layout, ZIP-56094"
      }
    ]
  }
}
*responseTimeStamp:2017-12-20T10:00:48.847 
*Response delay:7.0 milli-secs 
---------> Expected Response: <----------
{
  "status" : 200,
  "body" : {
    "id" : "UK1001"
  }
} 
-done-
```

### If the test failed: 

Scenario failed for :- 

```java
[test_get_request_response_rainy_scene.json] 
	|
	|
	+---Step --> [get_an_employee_detail] 

Failures:
--------- 
Assertion path '$.status' with actual value '200' did not match the expected value '400'
```

Collaboration Made Easy
===
Zerocode aims to make development and testing **easier and faster**, not _harder and slower_. Enables both Dev-team and Test-team to collaborate towards the highest **quality** of the software. 

<br/>
<br/>

                                               Developer's Guide


Supported testing frameworks
===
 * [JUnit4](http://junit.org)
 * [JUnit5 Jupiter](https://github.com/authorjapps/zerocode/wiki/JUnit5-Jupiter-Parallel-Load-Extension)


Running a scenario
===
`ZeroCodeUnitRunner` is the JUnit runner which enables us to run a single or more test-cases from a JUnit test-class.

e.g.
```java
@TargetEnv("app_sit1.properties")
@RunWith(ZeroCodeUnitRunner.class)
public class GitHubHelloWorldTest {

   @Test
   @Scenario("screening_tests/test_happy_flow.yml")
   public void testHappyFlow(){
   }

   @Test
   @Scenario("screening_tests/test_negative_flow.yml")
   public void testNegativeFlow(){
   }

}
```

Parameterized scenario
===
To run the scenario steps for each parameter from a list of values or CSV rows.

Examples:
+ YAML
<img width="460" alt="para yaml" src="https://user-images.githubusercontent.com/12598420/63848014-35304780-c9b9-11e9-85da-8419b5e49ded.png">

+ JSON
<img width="470" alt="para json" src="https://user-images.githubusercontent.com/12598420/63848012-35304780-c9b9-11e9-9e49-99b475ed0fa8.png">

Visit Wiki for details.
+ [Parameters as values - Wiki](https://github.com/authorjapps/zerocode/wiki/Parameterized-Testing-From-List-of-Values)
+ [Parameters as CSV rows - Wiki](https://github.com/authorjapps/zerocode/wiki/Parameterized-Testing-From-CSV-rows)

Using Custom HttpClient
===
Visit [HelloWorld](https://github.com/authorjapps/zerocode-hello-world) repo to see an example.

See example code:
> java/org/jsmart/zerocode/zerocodejavaexec/httpclient/CustomHttpClient.java

e.g.
```java
@TargetEnv("apihost_env1.properties")
@UseHttpClient(CustomHttpClient.class) //<--- Use your own HTTP client.
@RunWith(ZeroCodeUnitRunner.class)
public class HelloWorldCustomHttpClientSuite {
}
```

Sending query params to HTTP hosts
===
You can pass query params in the usual way in the URL e.g. `?page=1&page_size=5` -or-
You can pass them in the request as below.
```
...
            "request": {
                "queryParams":{
                    "page":1,
                    "per_page":6
                }
            }
...
```

Http Basic-Auth security validation
===
You can validate `Basic Auth` in so many ways, it depends on your project requirement. Most simplest one is to pass the `base64 basicAuth` in the request headers as below - e.g. `USERNAME/PASSWORD` as `charaanuser/passtwitter`

Zerocode framework helps you to achieve this, but has nothing to do with Basic-Auth. It uses `Apache Http Client` behind the scenes, this means whatever you can do using `Apache Http Client`, you can do it simply using `Zerocode`.

+ Positive scenario
```javaScript
{
    "name": "get_book_using_basic_auth",
    "url": "http://localhost:8088/api/v1/white-papers/WP-001",
    "method": "GET",
    "request": {
        "headers": {
            "Authorization": "Basic Y2hhcmFhbnVzZXI6cGFzc3R3aXR0ZXI=" // You can generate this using Postman or java code
        }
    },
    "verify": {
        "status": 200, // 401 - if unauthorized. See negative test below
        "body": {
            "id": "WP-001",
            "type": "pdf"
        }
    }
}        
```

+ Negative scenario
```
{
    "name": "get_book_using_wrong_auth",
    "url": "http://localhost:8088/api/v1/white-papers/WP-001",
    "method": "GET",
    "request": {
        "headers": {
            "Authorization": "Basic aWRONG-PASSWORD"
        }
    },
    "verify": {
        "status": 401 //401(or similar code whatever the server responds), you can assert here.
        "body": {
            "message": "Unauthorized" 
        }
    }
}        
```
+ If your requirement is to put basic auth for all the API tests e.g. GET, POST, PUT, DELETE etc commonly in the regression suite, then you can put this `"Authorization"` header into your SSL client code. 

Visit here to see an [example scenario](https://github.com/authorjapps/consumer-contract-tests/blob/master/src/test/java/org/jsmart/zerocode/testhelp/tests/basicauth/BasicAuthContractTest.java).

+ In your custom http-client, you add the header to the request at one central place, which is common to all the API tests.
See: `org.jsmart.zerocode.httpclient.CorpBankApcheHttpClient#addBasicAuthHeader` in the [http-client code](https://github.com/authorjapps/consumer-contract-tests/blob/master/src/main/java/org/jsmart/zerocode/httpclient/CorpBankApcheHttpClient.java) it uses.

Boundary End Point Mocking
===
Visit HelloWorld example repo and see the following example.

> src/test/resources/wiremock_tests/mock_via_wiremock_then_test_the_end_point.json


Externalizing RESTful host and port
===

Note:
Each runner is capable of running with a properties file which can have host and port for specific to this runner.
- So one can have a single properties file per runner which means you can run the tests against multiple environments
-OR-
- can have a single properties file shared across all the runners means running as a `suite` against the same environment.

** Note - As per Latest config update, we have updated endpoint configuration fields.
From the release 1.2.8 onwards we will be allowing `web.` and deprecating `restful.` in endpoint configurations.
We will take away support for `restful.` from endpoint configuration in the future releases.
Version 1.2.8 will work for both as we have made the framework backward compatible.

e.g.

```properties
              "config_hosts_sample.properties"
              --------------------------------

web.application.endpoint.host=http://{host-name-or-ip}
web.application.endpoint.port=9998
web.application.endpoint.context=/gov-uk-services
```

The runner looks like this:
```
@TargetEnv("config_hosts_sample.properties")
@RunWith(ZeroCodeUnitRunner.class)
public class ScreeningServiceContractTest {

    @Test
    @Scenario("contract_tests/screeningservice/get_screening_details_by_id.json")
    public void testScreeningLocalAndGlobal() throws Exception {
    }
}
```


Running a scenario in loop
===
Runs the entire scenario two times i.e. executing both the steps once for each time.

```javaScript
{
  "scenarioName": "Execute multiple times - Scenario",
  "loop": 2,
  "steps": [
    {
      "name": "create_emp",
      ...
    },
    {
      "name": "get_emp",
      ...
    }
  ]
}
```

Passing Content-Type header
===
It is very easy to send this content-type in the header and verify the response.

When you use this header, then you just need to put the `Key-Value` or `Name-Value` content under request `body` or request `queryParams` section. That's it.

e.g.
```javaScript
         "request": {
            "headers": {
               "Content-Type": "application/x-www-form-urlencoded"
            },
            "body": {
               "unit-no": "12-07",
               "block-number": 33,
               "state/region": "Singapore North",
               "country": "Singapore",
               "pin": "87654321",
            }
         }
```

- What happens if my **Key** contains a `space` or front slash `/` etc?

This is automatically taken care by `Apache Http Client`. That means it gets converted to the equivalent encoded char which is understood by the server(e.g. Spring boot or Jersey or Tomcat etc ).

e.g. 
The above name-value pair behind the scene is sent to the server as below:
> unit-no=12-07&country=Singapore&block-number=33&pin=87654321&state%2Fregion=Singapore+North

See more examples and usages in the [Wiki >>](https://github.com/authorjapps/zerocode/wiki/application-x-www-form-urlencoded-urlencoded-with-KeyValue-params)

Ignoring step failures
===
Setting `"ignoreStepFailures": true` will allow executing the next step even if the earlier step failed.

e.g.
```
{
    "scenarioName": "Multi step - ignoreStepFailures",
    "ignoreStepFailures": true,
    "steps": [...]
}
```

See HelloWorld repo for a running example.

Running a Suite of Tests
===

+ Selecting all tests as usual `JUnit Suite`

```java
@RunWith(Suite.class)       
@Suite.SuiteClasses({       
  HelloWorldSimpleTest.class,
  HelloWorldMoreTest.class,       
})    

public class HelloWorldJunitSuite {
    // This class remains empty   
}
```

Or
+ Selecting tests by cherry-picking from test resources
```java
@TargetEnv("app_dev1.properties")
@UseHttpClient(CustomHttpClient.class)
@RunWith(ZeroCodePackageRunner.class)
@Scenarios({
        @Scenario("path1/test_case_scenario_1.yml"),
        @Scenario("path2/test_case_scenario_2.json"),
})
// Or a folder containng the scenario-files
public class HelloWorldSelectedGitHubSuite {
    // This space remains empty
}
```

Zerocode Tokens
===
[Zerocode](https://github.com/authorjapps/zerocode/blob/master/README.md) provides built-in tokens that help with your testing ranging from generating random numbers through to accessing system properties. Currently Zerocode offers the following tokens:

+ [LOCALDATE.TODAY](https://github.com/authorjapps/zerocode/wiki/Token:-LocalDate-Today)
+ [LOCALDATETIME.NOW](https://github.com/authorjapps/zerocode/wiki/Token:-LocalDateTime-Now)
+ [RANDOM.NUMBER](https://github.com/authorjapps/zerocode/wiki/Token:-Random-Number)
+ [RANDOM.STRING.PREFIX](https://github.com/authorjapps/zerocode/wiki/Token:-Random-String)
+ [RANDOM.UUID](https://github.com/authorjapps/zerocode/wiki/Token:-Random-UUID)
+ [RECORD.DUMP](https://github.com/authorjapps/zerocode/wiki/Token:-Record-Dump)
+ [STATIC.ALPHABET](https://github.com/authorjapps/zerocode/wiki/Token:-Static-Alphabet)
+ [SYSTEM.ENV](https://github.com/authorjapps/zerocode/wiki/Token:-System-Environment)
+ [SYSTEM.PROPERTY](https://github.com/authorjapps/zerocode/wiki/Token:-System-Property)
+ [XML.FILE](https://github.com/authorjapps/zerocode/wiki/Token:-XML-File)

_Verifications/Matcher Tokens:_
+ [CONTAINS.STRING]()
+ [CONTAINS.STRING.IGNORECASE]()
+ [MATCHES.STRING]()
+ [IS.ONE.OF]()
+ [IS.NULL]()
+ [IS.NOTNULL]()
+ [GT]()
+ [LT]()
+ [SIZE]()
+ [LOCAL.DATETIME.AFTER]()
+ [LOCAL.DATETIME.BEFORE]()

Verifying HTTP error messages
===
Validating with `$CONTAINS.STRING:`

```javaScript
{
      ...
      ...
      "verify": {
        "status": 201,
        "body": {
          "name": "$CONTAINS.STRING:Larry"   //<-- PASS: If the "name" field in the response contains "Larry".
        }
      }
}
```

- Similar way exception messages can be validated for part or full message.

+ Validating with `$GT` or `$LT`

$GT.<any_number>

```javaScript
{
  ...
  ...
  "verify": {
    "status": "$GT.200"   //<--- PASS: 201 or 200+ is greater than 200
  }
}
```

$LT.<any_number>
```javaScript
{
  ...
  ...
  "verify": {
      "status": "$LT.500"   //<--- PASS: 200 is lesser than 500
  }
}
```

Invoking java utility methods
===
Sometimes it is handy to invoke a Java utility method to performa specific task e.g. simply generating a `custom random-ID` or any complex operation specific to scenario automation.

e.g.

```javaScript
{
    "scenarioName": "Java method request, response as JSON",
    "steps": [
        {
            "name": "execute_java_method",
            "url": "org.jsmart.zerocode.zerocodejavaexec.OrderCreator",
            "method": "createOrder",
            "request": {
                "itemName" : "Tier4 Visa",
                "quantity" : 15
            },
            "verify": {
                "orderId" : 1020301,
                "itemName" : "Tier4 Visa",
                "quantity" : 15
            }
        }
    ]
}
```

Order `pojo` looks like below, [full pojo src here](https://github.com/authorjapps/zerocode-hello-world/blob/master/src/main/java/org/jsmart/zerocode/zerocodejavaexec/pojo/Order.java)-
```java
public class Order {
    private Integer orderId;
    private String itemName;
    private Long quantity;

    @JsonCreator
    public Order(
            @JsonProperty("orderId")Integer orderId,
            @JsonProperty("itemName")String itemName,
            @JsonProperty("quantity")Long quantity) {
        this.orderId = orderId;
        this.itemName = itemName;
        this.quantity = quantity;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public String getItemName() {
        return itemName;
    }

    public Long getQuantity() {
        return quantity;
    }
```

Re-Using or injecting custom properties
===
You can directly use the framework properties or introduce new properties to be used in the test steps.

e.g. `${my_new_url}`, `${web.application.endpoint.host}`, `${X-APP-SAML-TOKEN}` etc

This is particularly useful when you want to introduce one or more common properties to use them across the test suite. :+1:

(Clone [HelloWorld repo](https://github.com/authorjapps/zerocode-hello-world) to run this from your IDE)

e.g.

"config_hosts_sample.properties"

```
web.application.endpoint.host=http://{host-name-or-ip}
web.application.endpoint.port=9998
web.application.endpoint.context=/gov-products
# or e.g. some new properties you introduced
my_new_url=http://localhost:9998
X-APP-SAML-TOKEN=<SAML>token-xyz</SAML>
```

Then, you can simply use the properties as below.
```json
{
    "scenarioName": "New property keys from host config file",
    "steps": [
        {
            "name": "get_api_call",
            "url": "${web.application.endpoint.host}:${web.application.endpoint.port}/v1/screenings",
            ...
        },
        {
            "name": "get_call_via_new_url",
            "url": "${my_new_url}/v1/sanctions",
            ...
        }

    ]
}
```


Bare JSON Strings as payload
===

e.g.
```json
{
  "scenarioName": "Bare string as json @@Oliver",
  "steps": [
    {
      "name": "bare_string",
      "url": "http://localhost:9999/api/v1/status",
      "operation": "GET",
      "assertions": {
        "status": 200,
        "body" : "completed" //<----- Base string as JSON
      }
    }
  ]
}
```

Empty HTTP body payload
===
e.g.
```json
{
  "scenarioName": "Empty body or no-body as payload @@John Smart@@",
  "steps": [
    {
      "operation": "GET OR POST",
      "request": {
           // No body content 
      }
    }
  ]
}
```

Handling Content-Type with charset-16 or charset-32
===
When the http server sends response with charset other than utf-8 i.e. utf-16 or utf-32 etc, then the Zerocode framework automatically handles it legally.
See [Wiki - Charset in response](https://github.com/authorjapps/zerocode/wiki/Charset-UTF-8-or-UTF-16-or-UTF-32-etc-in-the-http-response) for details on how it handles.

Also the framework enables you to override this behaviour/handling by overriding method `createCharsetResponse` in the class `BasicHttpClient.java`. See an example in the working code example of HelloWorld repo.

Chatbot Validation
===
When you have series of questions and answers to be validated, you can arrange them in a CSV format and drive a test.
Which means, for a given scenario, you just need to write `one` scenario and multiple CSV rows of input/output data nicely arranged to validate the Chatbot APIs.

e.g.

```
"parameterized": {
    "csvSource": [
        "What do you want to buy?,  Laptop, Color(Red or Blue)?,    Red,   RAM(16 or 32GB),    32,       2000 USD",
        "What do you want to buy?,  Laptop, Color(Red or Blue)?,    Blue,  RAM(16 or 32GB),    16,       1500 USD",
        "What do you want to buy?,  Mouse,  Color(Black or White)?, White, Wired or Wireless?, Wireless, 100 USD"
    ]
}
```

Python DSL
===
If you are looking for simillar REST API validation DSL in Python using YAML/JSON,
then visit this open-source [pyresttest](https://github.com/svanoort/pyresttest#sample-test) lib in the GitHub.

```yaml
- test: # create entity by PUT
    - name: "Create or update a person"
    - url: "/api/person/1/"
    - method: "PUT"
    - body: '{"first_name": "Gaius","id": 1,"last_name": "Baltar","login": "gbaltar"}'
    - headers: {'Content-Type': 'application/json'}
    - validators:  # This is how we do more complex testing!
        - compare: {header: content-type, comparator: contains, expected:'json'}
        - compare: {jsonpath_mini: 'login', expected: 'gbaltar'}  # JSON extraction
        - compare: {raw_body:"", comparator:contains, expected: 'Baltar' }  # Tests on raw response
```

The [Quick-Start](https://github.com/svanoort/pyresttest/blob/master/quickstart.md) guide explains how to bring up a REST end point and run the tests.

Zerocode equivalent of the above example is
+ `validators` / `comparator` is equivalent to `verify` / `assertions`
+ `raw_body` is equivalent to `rawBody`

YAML and JSON Slice And Dice
===
Handy JSON and YAML slice/dice, format conversion, JSON Path evaluations tools can be found below:
+ [JSON to YAML and vice versa](https://www.json2yaml.com/)
+ [Expand, Collapse, Remove Node and Traverse etc](https://jsoneditoronline.org/)
  + Tree structure viewing - Good for array traversing
  + Remove a node -> Click on left arrow
+ [Beautify, Minify, Copy Jayway JSON Path](http://jsonpathfinder.com/)
+ [JSON Path Evaluator](http://jsonpath.herokuapp.com/?path=$.store.book[*].author)

Inspired By
===
### Honorable references and credits

- [Pyresttest](https://github.com/svanoort/pyresttest) 
- [SkyScreamer](https://github.com/skyscreamer/JSONassert) 
- [Apache JMeter](https://github.com/apache/jmeter) 
- [JUnit5 Jupiter Engine](https://github.com/junit-team/junit5/) 

Pyresttest's JSON/YAML based test-DSL inspired many of Zerocode's Http DSL and test-config features.

Apache JMeter's intuitive load configuration inspired various Zerocode's declarative Load Testing DSL.

SkyScreamer's lenient and strict mode JSON matchers inspired various Zerocode's result matching features.

JUnit5 Jupiter engine's easy and declarative approach to parameterized testing inspired Zerocode's parameterized testing feature.

Credits to Jetbrains for IDE licenses
![Jetbrains](https://github.com/authorjapps/zerocode/blob/master/images/jetbrains.svg).

Credits to the team members at HomeOffice(GOV.UK), Mizuho Bank, CMC Markets, HSBC Bank, Barclays and Zohocorp whose comments have helped to shape the lib.

Powered by [open-source software](https://github.com/authorjapps/zerocode/wiki/Powered-by-open-source-software).

References, Discussions and articles
===
* [Performance testing using JUnit and maven](https://www.codeproject.com/Articles/1251046/How-to-do-performance-testing-using-JUnit-and-Mave) - Codeproject
* [REST API or SOAP End Point Testing](https://www.codeproject.com/Articles/1242569/REST-API-or-SOAP-End-Point-Testing-with-ZeroCode-J) - Codeproject
* [DZone- MuleSoft API Testing With Zerocode Test Framework](https://dzone.com/articles/zerocode-test-framework-for-restsoap-api-tddbdd-ap) - DZone
* [Testing need not be harder or slower, it should be easier and faster](https://dzone.com/articles/rest-api-testing-using-the-zerocode-json-based-bdd) - DZone
* [Kafka - Quick and Practical Testing With Zerocode](https://dzone.com/articles/a-quick-and-practical-example-of-kafka-testing) - DZone
* [Kotlin Apps Testing With Zerocode](https://dzone.com/articles/kotlin-spring-bootspring-data-h2-db-rest-api) - DZone
* [Google - Zerocode Kafka Testing](https://www.google.com/search?q=zerocode+kafka+testing&oq=zerocode+kafka+testing)
* [Google - Zerocode API Testing](https://www.google.com/search?q=zerocode+api+testing)
* [Google - Zerocode Mulesoft Testing](https://www.google.com/search?q=zerocode+mulesoft+testing)