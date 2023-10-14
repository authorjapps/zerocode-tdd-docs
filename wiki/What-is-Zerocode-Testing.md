Table of Contents
* [What is Declarative Testing](#what-is-declarative-testing)
* [Advantages of Declarative Testing](#advantages-of-declarative-testing)
* [Drawing a Simile](#drawing-a-simile)
* [YAML or JSON based test-scenarios](https://github.com/authorjapps/zerocode/wiki/User-journey:-Create,-Update-and-GET-Employee-Details#using-json)
* [Testing Without Writing Code](#testing-without-writing-code)
* [Test Case Fields](#test-case-fields)
     * [Http(REST API and SOAP)](#httprest-api-and-soap)
        * [SCENARIO](#scenario)
        * [LOOP](#loop)
        * [IGNORESTEPFAILURES](#ignorestepfailures)
        * [URL](#url)
        * [METHOD](#method)
        * [RETRY](#retry)
        * [CUSTOMLOG](#customlog)
        * [REQUEST](#request)
        * [QUERYPARAMS](#queryparams)
        * [HEADERS](#headers)
        * [VERIFYMODE](#verifymode)
        * [VERIFY](#verify)
        * [STATUS](#status)
        * [BODY](#body)
     * [Kafka](#kafka)
        * [TOPIC](#topic)
        * [OPERATION](#operation-1)
        * [PRODUCE/CONSUME](#request-1)
     * [Kafka Produce](#)
        * [RECORDTYPE](#)
        * [RECORDS](#)
        * [RECORDMETADATA](#recordMetadata)
        * [LOAD](#)
        * [STATUS](#)
        * [OFFSET](#)
        * [TIMESTAMP](#)
        * [PARTITION](#)
     * [Kafka Consume](#)
        * [COMMITSYNC](#)
        * [POLLINGTIME](#)
        * [SHOWRECORDSCONSUMED](#)
        * [MAXNOOFRETRYPOLLSORTIMEOUTS](#)
        * [FILEDUMPTO](#)
        * [CONSUMERLOCALCONFIGS](#)
        * [UNLOAD](#)
        * [FILEDUMPTO](#)
* [HelloWorld Examples (Try at home)](#helloworld-examples-try-at-home)
* [Running the Tests using <em>JUnit</em>](#running-the-tests-using-junit)
* [Both Declarative and Extensible](#both-declarative-and-extensible)

What Is Declarative Testing
===
Here is some similar insight from [IEEE](https://ieeexplore.ieee.org/document/5070714)- 
> We propose a software testing paradigm called declarative testing. In declarative testing, a test scenario focuses on what to accomplish rather than on the imperative details of how to manipulate the state of an application under test and verify the final application state against an expected state. Declarative testing is a test design paradigm which separates test automation code into conceptual Answer, Executor, and Verifier entities. 

+ According to [Wikipedia](https://en.wikipedia.org/wiki/Declarative_programming) - 
> In computer science, declarative programming is a programming paradigm—a style of building the structure and elements of computer programs—that expresses the logic of a computation without describing its control flow.

Advantages of Declarative Testing
===
+ According to [IEEE](https://ieeexplore.ieee.org/document/5070714) - 
> Preliminary experience with declarative testing suggests that the modular characteristics of the paradigm may significantly enhance the ability of a testing effort to keep pace with the evolution of a software application during the application's development process.

+ Instead of writing code `how` to achieve the testing goals, we write `what` to achieve in the test intentions i.e. the test input and the expectations<br/>

+ Here the framework, behind the scene, handles the execution via necessary code to do the job for us e.g. API calls, DB executions, producing/consuming from Kafka topics etc

+ In this style we attempt to minimize or eliminate side effects by describing what the `test` must accomplish in terms of the business functionality, rather than describe how to accomplish it via programming or coding

<br/>

> That makes the test automation a lot easy and clean.

<br/>

In the _Declarative Style_ **we don't need to write** any of the below.
+ The Http Client (or Kafka Client) calls for REST APIs
+ Request payload parsing
+ Response payload parsing
+ Code for assertions/verifications e.g. comparing actual vs expected response

| Declarative Style                            | Traditional Style                                        |
| :-------------------------------------------- | :-------------------------------------------------------- |
| `"url":"/api/v1/register/persons"`    | Create an _HttpClient_ object. Set the `url` to `"/api/v1/register/persons"` <br/> e.g. `RequestBuilder.setUri(httpUrl);`  |
| `"method": "POST"`  | Set this `POST` operaton to the _HttpClient_ object <br/> e.g. `RequestBuilder.create(methodName).setUri(httpUrl);`| 
| `"request": { ... }` | Parse the request payload and set to HttpEntity. <br/> e.g. `HttpEntity httpEntity = EntityBuilder.create().setContentType(APPLICATION_JSON).setText(reqBody).build();` |
| _None. Nothing to do._ | Parse the response to Java object or JSON String  |
| `"verify": {JSON as-it-is} ` | Compare the actual response against expected field by field. <br/> - Use multiple `assertThat(...)`. <br/> - Traverse through the response Object field by field <br/> - Or use `JSON Path` to extract value |
| Display **all** the mismatches and fail the test(time saver) | Stop at **first** mismatch and fail the test(unwanted delay in getting feedback)  |
| Straight forward and easy | Step chaining is not straight forward   |

<br/>


Drawing a Simile
===

To draw a _simile_, we can pay attention to how docker-compose works. In `docker-compose` we tell the `Docker-Compose` framework(in a YAML file) to spin up certain things at certain ports etc, and then, things are done for us by the framework. 

> _That's declarative way of doing things_

e.g. of a `compose YAML` file
```yaml
---
version: '2'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:5.0.1
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
  kafka:
    image: confluentinc/cp-kafka:5.0.1
    depends_on:
      - zookeeper
    ports:
      - 9092:9092
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
```

How neat and compact is that? 
Just think of it, for instance, if we had to write code/shell-scripts for the same repetitive tasks, how much hassle we would have gone through!

Example of a [Zerocode YAML Test Scenario(more>>)](https://github.com/authorjapps/zerocode/wiki/YAML-DSL-For-Test-Scenarios) is below.

```yaml
---
scenarioName: As simple GET request response
steps:
- name: "find_match"
  url: "/api/v1/search/persons"
  method: "GET"
  request:
    queryParams:
      lang: "Amazing"
      city: "Lon"
  verify:
    status: 200
    body:
      exactMatches: true
      name: "Mr Bean"
```

Testing Without Writing Code.
===
e.g.

<img width="521" alt="YAML large" src="https://www.codeproject.com/KB/applications/1242569/bf168275-8d2f-4969-82a1-51b4e640dad9.Png">

> _That's the declarative way of validating an API what we discussed earlier_

<br/>

Test Case Fields
===

1. **Http**(_REST API and SOAP_)
2. **Kafka** (_Produce, Consume RAW vs JSON_)
3. **Java Function** call e.g. _DB SQL Executror_

### Http(REST API and SOAP)

#### SCENARIO
`Scenario` means a Test-Scenario or an User-Journey or a Use-Case during test automation. It is represented in the following way.
```
"scenarioName": "Free text - Validate a POST and GET method for a customer"
```
#### LOOP
`loop` means the same Test-Scenario to be executed a number of times.

e.g.
```java
    "scenarioName": "Free text - A scenario"
    "loop": 3
```

#### IGNORESTEPFAILURES

When this DSL flag is set to `true`, the framework will go ahead and execute the subsequent steps in the scenario file.

```java
    "ignoreStepFailures": true
```

This is an optional flag and you can skip this or set to false to retain the default behavior.

#### URL

REST endpoint or a SOAP end-point or a Kafka topic.

```java
    "url": "/api/v1/register/persons",
```

Or you can mention the FQDN with http or https with port 

```
    "url": "https://apphost.gov.uk/api/v1/register/persons",
```

See ahead examples on how you can point to a Kafka topic using this `url` field.

#### METHOD

REST end-point or SOAP end-point
All Http methods such as `POST, PUT, GET, PATCH, DELETE` etc

```
    "method": "POST",
```

Or when we need to call a Java function
```
    "method": "executeSql",
```

Or 

when we need to validate Kafka events
```
    "operation": "produce",
or
    "operation": "consume",
```

Note- `method` and `operation` are identical and can be used interchangeably. Preferably `method` is used for `http` calls and `operation` is used for `Kafka` calls.

_(See Kafka DSLs below)_


#### RETRY
`Retry` comes handy when the actual response doesn't match the expected values in certain use-cases.
```
           "retry": {
                "max": 5,
                "delay": 2000
            },
```
The above settings will retry maximum of `5` times with 2sec delay between the retries.

If one fo the retries goes success(meaning if the actual response matches the expected response), then the framework will stop retrying further and come out of that step marking the it as `PASSED`.

#### CUSTOMLOG
`Custom Log` This is an optional field which can be used when user want custom log for particular step.
```
           "customLog": "custom message"
```

#### REQUEST

For REST end-point or SOAP end-point, request details with _Headers_ and _Body_ payload

```
           "request": {
                "body": {
                    "id": 1000,
                    "name": "Titan"
                }
            },
```

Or when we need to call a _Java_ function with a SQL query as method parameter
```
    "request": "select id, name from customers"
```

#### QUERYPARAMS

This DSL field can be used for sending query params to the HTTP endpoints.

```json
"queryParams":{
   "param1": "value1",
   "param2": "value2"
}
```

which is equivalent to `?param1=value1&param2=value2`

#### HEADERS
Request with headers and body payload,
```
           "request": {
                "headers": {
                    "X-GOVT-TOKEN": "90945"
                },
                "body": {
                    "id": 1000,
                    "name": "Titan"
                }
            },
```

#### VERIFYMODE
+ `verifyMode` is STRICT or LENIENT

```json
{
   "verifyMode": "STRICT",
   "verify":{
      ...
   }
}
```
When we specify `STRICT` mode, then the actual payload has to exactly match the expected payload.

`LENIENT` is the default mode even if we do not mention it.

#### VERIFY
`Verifications` and `Assertions` are used for the similar purpose where,
+ `verify` is mostly used for `verification` of an implementation against a Spec
+ `assertions` is mostly used for `validation` an implementation

For REST services, we need to put the expected response with response _Status_, _Headers_ and _Body_ payload.

Only `status` validation
```
           "verify": {
                "status": 200
            }
```

or

```
           "verify": {
                "status": 200
            }
```


Or `status` and payload `id` assertions
Only `status` assertion
```
           "verify": {
                "status": 200,
                "body": {
                    "id" : 583231
                }
            }
```

Or `partial` or `full` payload assertions 

```
            "verify": {
                "status": 200,
                "body": {
                    "login" : "octocat",
                    "id" : 583231,
                    "type" : "User"
                }
            }
```

Or with response `headers` details
```
           "verify": {
                "status": 200,
                "headers":{
                  "Server":"sit2.hsbc.co.uk",
                  "X-HSBC-BANK":"$NOT.NULL" //<--- "$NOT.NULL" if value is undeterministic
                },
                "body": {
                    "login" : "octocat",
                    "id" : 583231,
                    "type" : "User"
                }
            }
```



#### STATUS

For REST services or SOAP, we need to put the expected response with response _Status_, _Headers_ and _Body_ payload.

Only `status` assertion
```
           "verify": {
                "status": 200
            }
```

#### BODY
This is the payload, if present in the `request` section, then passed to the REST endpoint. 
This is the payload, if present in the `response` section, then treated as `expected response` from the REST endpoint. 

```
           "verify": {
                "status": 200
                "body": {
                    "login" : "octocat",
                    "id" : 583231,
                    "type" : "User"
                }
            }
```

***

### Kafka

#### TOPIC

We mention the Kafka topic name

```
    "url": "kafka-topic:heathrow-inbound",
```


#### OPERATION

We need to mention `produce` or `consume` from/to a Kafka topic
```
    "operation": "produce",
```

or

```
    "operation": "consume",
```

#### REQUEST

We need to _Produce_ or _Consume_ to/from a Kafka topic,
- a `RAW` record
```
           "request": {
                "records": [
                    {
                        "key": "key-101",
                        "value": "Hello Kafka"
                    }
                ]
            },
```

- a JSON record
```
           "request": {
                "recordType" : "JSON",
                "records": [
                    {
                        "key": "key-101",
                        "value": {
                            "name" : "Jey"
                        }
                    }
                ]
            },
```

Or while _Consuming_ we can specify whether to `commitSync` after consuming, `recordType` as RAW or JSON etc.

```
            "request": {
                "consumerLocalConfigs": {
                    "recordType" : "JSON",
                    "commitSync": true,
                    "maxNoOfRetryPollsOrTimeouts": 3
                }
            },
```


#### ASSERTIONS

For Kafka services, we can put the expected response with response _Status_, _RecordMetadata_.

Only `status` assertion
```
           "verify": {
                "status": "Ok"
            }
```

Or `status` with `recordMetadata` assertion while _Producing_
```
           "verify": {
                "status": "Ok",
                "recordMetadata": "$NOT.NULL"
            }
```

Or `size` with `records` assertion while _Consuming_
```
           "verify": {
                "size": 1,
                "records": [
                    {
                        "key": 101,
                        "value": {
                            "name" : "Jey"
                        }
                    }

                ]
            }
``` 

<br/>

HelloWorld Examples (Try at home)
===
+ Http examples are here in [GitHub-Http](https://github.com/authorjapps/zerocode-hello-world/tree/master/src/test/resources)
+ Kafka examples are here in [GitHub-Kafka](https://github.com/authorjapps/hello-kafka-stream-testing/tree/master/src/test/resources/kafka)
+ Java Function Call examples are here in [GitHub-Java](https://github.com/authorjapps/zerocode-hello-world/tree/master/src/test/resources/helloworldjavaexec)


<details>
  <summary>More About Kafka, DB, OAuth2, Http etc (Click to expand)</summary>

+ [Kafka application testing](https://github.com/authorjapps/zerocode/wiki/Kafka-Testing-Introduction)

+ [Database persistence testing](https://github.com/authorjapps/zerocode/wiki/Sample-DB-SQL-Executor)

+ [OAuth2 testing](https://github.com/authorjapps/zerocode-hello-world/blob/master/src/test/java/org/jsmart/zerocode/testhelp/tests/OAuth2/OAuth2Test.java)

+ [Many more HelloWorld examples](https://github.com/authorjapps/zerocode/blob/master/README.md#hello-world-), such as Spring boot app testing, Performance testing, Kotlin app testing etc.

</details>


<br/>

> The purpose of Zerocode lib is to make your API tests easy to write, easy to change, easy to share.

See the [Table Of Contents](https://github.com/authorjapps/zerocode#table-of-contents--) for usages and examples.

For Kafka testing approach, visit this page [Kafka-Testing Quick Start](https://github.com/authorjapps/zerocode/wiki/Kafka-Testing-Introduction).

Running the Tests using _JUnit_
===
+ All examples above run via Junit `@Test` annotation like below.
```java
@TargetEnv("github_host.properties")
@RunWith(ZeroCodeUnitRunner.class)
public class JustHelloWorldTest {

    @Test
    @Scenario("helloworld/hello_world_status_ok_assertions.json")
    public void testGet() throws Exception {

    }
}
```

> You point to any JSON file and run. Hosts details are in the `.properties` file by `@TargetEnv`

+ Also you can run as a `Suite` pointing to the root of a `package`.

Both Declarative and Extensible
===

**While** Zerocode framework is light-weight and simple to write test intentions in JSON/YAML format, **at the same time** we can customize/extend it to add our own flavours. 

For instance, we can add custom _Http Headers_ to the entire test-suite or an individual test-case, automate _OAuth2_ secured APIs, or use our own flavour of _Apache Kafka Client_ to deal with _Kafka Brokers_ and much more stuff.

...making all these things **super easy** and **straight forward**.
