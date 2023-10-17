> _If you are reading this 1st time, then you might need 10 to 15 mins, but afterwards you can skip the intro topics and directly jump to [Docker - Kafka In a Container](https://github.com/authorjapps/zerocode/wiki/Kafka-Testing-Introduction#9-docker---bringing-up-kafka-in-a-container) section, then you need only 2mins._

# 1. Introduction

In this Wiki page, first we will discuss various concepts of Kafka distributed streams and then learn how to test an application built involving Kafka. We will explore basic to high-level approaches for testing microservices applications built involving Http and Kafka. Also, we will learn about the advantages of the declarative way of testing Kafka applications over the traditional/existing way of testing.

We will learn how it enables us to keep the test-cases clean, readable, simple and elegant

For everything explained here, we can find a **working code sample** in the [Conclusion](https://github.com/authorjapps/zerocode/wiki/Kafka-Testing-Introduction#10-conclusion) section

If you are already aware of fundamental concepts, you can directly jump to - [Section 3. Writing our first produce test-case](https://github.com/authorjapps/zerocode/wiki/Kafka-Testing-Introduction#3--writing-our-first-produce-test-case)

_Visit here for a quick overview of [What is Declarative Testing and Its Advantages](https://github.com/authorjapps/zerocode/wiki/What-is-Zerocode-testing)_

# 1.1 Kafka Testing Challenges

The difficult part is, some part of the application logic or a DB procedure keeps producing records to a topic and another part of the application keeps consuming the records and continuously processes them based on certain business rules.

The records, partitions, offsets, exception scenarios etc keep on changing, making it difficult to think in terms of what to test, when to test, and how to test.

![kafka_stream_loaded](https://user-images.githubusercontent.com/12598420/53636875-884b5c80-3c19-11e9-85fb-7812281353db.jpg)
_Photo credit:[@dnevozhai:unsplash](https://unsplash.com/photos/7nrsVjvALnA)_

# 1.2 Testing Solution Approach

We can go for an end-to-end testing approach which will validate both producing, consuming, and DLQ records as well as the application processing logic. This will give us good confidence in releasing our application to higher environments.

Here we pick a functionality, produce the desired data and validate, consume the intended data and validate, alongside of the HTTP REST or SOAP API validation which helps in keeping our tests much cleaner and less noisy.

![kafka_stream_clean](https://user-images.githubusercontent.com/12598420/53637422-0825f680-3c1b-11e9-99c9-4ad76a66d5a7.jpg)
_Photo credit:[@jannerboy62:unsplash](https://unsplash.com/@jannerboy62)_

We can do this by bringing up Kafka in dockerized containers or by pointing our tests to any integrated test environment somewhere in our Kubernetes-Kafka cluster or any other microservices infrastructure.

# 2. What We Need To Know To Test Kafka

Kafka is a distributed messaging system. When we deal with a Kafka application, we need to know where the `topic` resides and what types of messages aka `records` are written aka `produced` to the topic, then what happens when the messages are `consumed` by the listeners.

Once we know these four things, we should be able to test a Kafka application easily.

# 2.1. What is a Kafka topic

Kafka topics are divided into a number of partitions. Partitions allow you to parallelize a topic by splitting the data in a particular topic across multiple brokers — each partition can be placed on a separate machine to allow for multiple consumers to read from a topic in parallel.

# 2.2. What is produce and consume

`Produce` is simply writing one or more records to a topic.

`Consume` is simply reading one or more records from one or more topic(s).

# 2.3. Writing tests only to produce

When you write or produce to a topic you can verify the acknowledgment from a Kafka broker which is in the form of `recordMetadata`.

e.g.

```java

Response from broker after a successful "produce".

{
    "recordMetadata": {
        "offset": 0,
        "serializedKeySize": 13,
        "serializedValueSize": 34,
        "topicPartition": {
            "partition": 0,
            "topic": "demo-topic"
        }
    }
}
```

![kafka produce v2](https://user-images.githubusercontent.com/12598420/52596194-a3f7ea00-2e47-11e9-93c2-0895608ef93a.gif)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
_(Click [here](https://user-images.githubusercontent.com/12598420/52596194-a3f7ea00-2e47-11e9-93c2-0895608ef93a.gif) to see the enlarged clip)_

# 2.4. Writing tests only to consume

When you read or consume from a topic you can verify the record(s) from the topics.
Here you can validate/assert some of the metadata too, but most of the times you might only need to deal with the records only(not the metadata).

e.g.

```java

Response from broker after a successful "consume".
{
    "records": [
        {
            "topic": "demo-topic",
            "key": "1547792460796",
            "value": "Hello World"
        }
    ]
}
```

The full record with meta data information looks like below, which too you can validate/assert in case you have a test-requirement to do so.

```java
{
    "records": [
        {
            "topic": "demo-topic",
            "partition": 0,
            "offset": 3,
            "timestamp": 1547792461364,
            "timestampType": "CREATE_TIME",
            "serializedKeySize": 13,
            "serializedValueSize": 11,
            "headers": {
                "headers": [],
                "isReadOnly": false
            },
            "key": "1547792460796",
            "value": "Hello World",
            "leaderEpoch": {
                "value": 0
            }
        }
    ]
}
```

# 2.5. Writing tests for both produce and consume

In the same test, you can hook the two steps like below <br/>

- Step-1) Produce to a topic e.g. `demo-topic` and validate `recordMetadata`

  - e.g. Produce a record with "key":"1234", "value":"Hello World"

- Step-2) Consume from the same topic i.e. `demo-topic` and validate `records`
  - Assert that the same record was in the consumed records with "key": "1234", "value": "Hello World", because we might have consumed more that one record if they were produced to the same topic.

# 2.6. Knowing The Record Format

A record is a message which can be written to or fetched from a topic. A record can be of various formats, e.g. RAW, JSON, CSV, AVROetc and many others.

Records are represented in Key, Value pair. Also, it can have optional headers.

> "key":"1234", "value":"Hello World"

Key can also be optional.

# 3. Writing our first produce test-case

To write the tests for any of 'Produce' or 'Consume' tests, we need to know the following details

- The topic name which is our "end point" aka "url"

```

"url": "kafka-topic: demo-topic"

```

- The operation i.e. `'produce' (or 'consume'`)

```

"operation": "produce"

```

- While sending a message to the topic, we need to send as below

```java

"request": {
    "records": [
        {
            "key": "KEY-1234",
            "value": "Hello World"
        }
    ]
}

```

Now our test-case looks like below,

```JSON
{
    "name": "produce_a_record",
    "url": "kafka-topic:demo-topic",
    "operation": "produce",
    "request": {
        "recordType" : "RAW",
        "records": [
            {
                "key": 101,
                "value": "Hello World"
            }
        ]
    },
    "verify": {
        "status": "Ok",
        "recordMetadata": "$NOT.NULL"
    }
}
```

That's sit. Then we run this via a JUnit runner pointing to the above test-case e.g. `produce_test_case.json`.

```
@Test
@JsonTest("produce_test_case.json")
public void testProduceToATopic(){
   //no code needed here
}
```

Please visit these pages for examples and explanations.

- [Produce a RAW message](https://github.com/authorjapps/zerocode/wiki/Produce-raw-message)
- [Produce a JSON message](https://github.com/authorjapps/zerocode/wiki/Produce-JSON-message)

# 3.1. Writing our first "consume" test-case

We need to know,

- The topic name which is our "end point" aka "url"

```

"url": "kafka-topic: demo-topic"

```

- The operation i.e. 'consume'`

```

"operation": "consume"

```

- While consuming message(s) from the topic, we need to send as below

```java

"request": { },

```

The above means do nothing, but simply consume.

Or we can configure our test to do certain things while consuming or after consuming the records.

```
"request": {
    "consumerLocalConfigs": {
        "commitSync": true,
        "showRecordsConsumed": true,
        "maxNoOfRetryPollsOrTimeouts": 3
    }
}

```

>         "commitSync": true,

Here, we are telling the test to do a `commitSync` after consuming the message, that means, it won't read the message again when you `poll` next time. It will only read the new messages if any arrives on the topic.

>        "showRecordsConsumed": true,  // Default is true
>
> Here, we are telling the test to show the consumed records in the response. If you set `"showRecordsConsumed": false`, then it will only show the size, not the actual records.

>        "maxNoOfRetryPollsOrTimeouts": 3
>
> Here, we are telling the test to show poll 3 times maximum, then stop polling. If we have more records, we can set to a larger value. The default value is 5.

>        "pollingTime": 500   // Default is 100 mili sec if you skip this flag.
>
> Here, we are telling the test to poll for 500 mili sec each time it polls.

- Visit this page [All configurable keys - ConsumerLocalConfigs](https://github.com/authorjapps/zerocode/blob/master/core/src/main/java/org/jsmart/zerocode/core/kafka/consume/ConsumerLocalConfigs.java) for the source code.
- Visit the [HelloWorld Kafka examples repo](https://github.com/authorjapps/hello-kafka-stream-testing/tree/master/src/test/resources/kafka) to try it at home.

### :::Note:::

These config values can be set in the properties file global to all the tests, which means it will apply to all the tests in our test suite or the test pack. Also, we can override any of the configs for a particular test or tests inside the suite. **Hence it gives us very flexibility for covering all kind of test scenarios.**

Please visit these pages for examples and explanations.

- [Consume a RAW message](https://github.com/authorjapps/zerocode/wiki/Consume-RAW-message)
- [Consume a JSON message](https://github.com/authorjapps/zerocode/wiki/Consume-JSON-message)

# 4. Validating Kafka response after producing

We can simply tell the test to check that it has been produced successfully as below

```JSON
"verify": {
    "status": "Ok"
}
```

Or we can ask the test to assert that we have received `not null` "recordMetadata" from the Kafka brokers

```json
"verify": {
    "status": "Ok",
    "recordMetadata": "$NOT.NULL"
}
```

Or we can go further and ask the test to assert the "recordMetadata" field-by-field to verify it has written to correct `partition` of the correct `topic` and much more as below.

```json
"verify": {
    "status": "Ok",
    "recordMetadata": {
        "offset": 0,
        "serializedKeySize": 13,
        "serializedValueSize": 34,
        "topicPartition": {
            "partition": 0,
            "topic": "demo-topic"
        }
    }
}
```

Yes, just stick the JSON block as it is.

Isn't it awesome and clean? Hasn't it take away a lot of hassles from us of doing vicious deserialization of the `acknowledgment` or the asserting field-by-field, making the test almost not-readable?

Or if you are not really bothered about some fields, you can simply put as `$NOT.NULL` against them as below or completely skip them from the "verify block".

### :::Note:::

Field order doesn't really matter here as long as the structure is maintained. 👍

```json
{
  "status": "Ok",
  "recordMetadata": {
    "topicPartition": {
      "partition": 0,
      "topic": "demo-2"
    },
    "offset": "$NOT.NULL",
    "timestamp": "$NOT.NULL",
    "serializedKeySize": "$NOT.NULL",
    "serializedValueSize": "$NOT.NULL"
  }
}
```

# 5. Validating Kafka response after consuming

We can simply tell the test to check that we have received a number of records we intended to consume.

```java
"verify": {
    "size" : 1
}
```

Or we can ask the test to assert a record as not null or field-by-field of key/values of that record.

```java
"verify": {
    "size": 1
    "records": [
        {
            "key": "1547792460796",
            "value": "Hello World"
        }
    ]
}
```

Or we can ask the test to assert the records along with some metadata e.g. topic and partition info too.

```java
"verify": {
    "records": [
        {
            "key": "1547792460796",
            "value": "Hello World",
            "topic": "demo-ksql",
            "partition": 0,
            "offset": 3,
            "timestamp": 1547792461364
        }
    ],
    "size": 1
}
```

### :::Note:::

Field order doesn't really matter here as long as the structure is maintained. 👍

# 6. Combining Kafka testing with REST API testing

Most of the time we have situations to deal with Kafka and REST API testing. With `Zerocode` it's just zero effort when comes to this kind of situation or any API testing situation. You only need to hook below things to create a test-case

| FIELDS      | Usage                                    |
| ----------- | ---------------------------------------- |
| "url"       | The REST API Path or SOAP end point Path |
| "operation" | Http verb e.g. PUT, POST, GET etc        |
| "request"   | Payload with Http headers and body       |
| "headers"   | Http headers                             |
| "body"      | Http payload body                        |
| "verify"    | Expected response from server            |

Let's see how we can fit REST API validation along with Kafka produce/consume validation at the same time.

In the first place, this is not a big deal. Nothing really changes from a test perspective other than the "url".

That means the "url" is a REST end point as below:

>            "url": "/api/v1/persons"

Then, the Zerocode framework picks the REST endpoint details from the "host.properties" and create the full URL and invokes the REST API and asserts the response. The effective URL will be as below behind the scene

>            "url": "http://localhost:8082/api/v1/persons"

```properties
"host.properties"

kafka.bootstrap.servers=localhost:9092
kafka.producer.properties=kafka_servers/kafka_producer_avro.properties
kafka.consumer.properties=kafka_servers/kafka_consumer_avro.properties

# REST End point server FQDN
web.application.endpoint.host=http://localhost
web.application.endpoint.port=8082
web.application.endpoint.context=

# URL of any other REST/Http server
kafka-ksql-server-fqdn=http://localhost:8088

```

If we are inside a micro-services deployment world, simply put more "url"s of our `Kubernetes` pods you need to deal with e.g.

>            "url": "${http-server-fqdn}/api/v1/persons"

The "http-server-fqdn" above is another config key-value which can be simply put into the host properties file where we keep Kafka `kafka.bootstrap.servers` details.

Now, in a BDD scenario like below, the tests steps would involve calls to Kafka topics and validate the REST api response over an Http call(s).

```
AC1:
Given I send an "Address" record with id "id-lon-123" to the "address-topic",
When the(my) record gets processed by the Kafka application,
Then the message will be "PUT" to the "address REST api" and updated in the DB

AC2:
Given I query(GET) the "Address" REST API by using "/api/v1/addresses/id-lon-123" ,
When I receive the updated "Address" record,
Then I will receive the updated address and validate the fields.

```

We have at least two steps(can be more steps the cover Happy and Sad paths) to perform here to test the scenario end-to-end.

To keep it simple, lets first go with the simple two steps, later we can explore that it's so easy to hook more additional steps.

Step-1 (AC1)

---

```json
{
  "name": "produce_to_kafka",
  "url": "kafka-topic:people-address",
  "operation": "produce",
  "request": {
    "recordType": "JSON",
    "records": [
      {
        "key": "id-lon-123",
        "value": {
          "id": "id-lon-123",
          "postCode": "UK-BA9"
        }
      }
    ]
  },
  "verify": {
    "status": "Ok",
    "recordMetadata": "$NOT.NULL"
  }
}
```

Step-2 (AC2)

---

```json
{
  "name": "verify_updated_address",
  "url": "/api/v1/addresses/id-lon-123",
  "operation": "GET",
  "request": {
    "headers": {
      "X-GOVT-API-KEY": "top-key-only-known-to-secu-cleared" // Skip this if Auth key not needed
    }
  },
  "verify": {
    "status": 200,
    "value": {
      "id": "id-lon-123",
      "postCode": "UK-BA9"
    }
  }
}
```

When we combine the steps it looks like below. Here we can avoid hardcoding the value and reuse the "postcode" from the "request" payload.

> $.produce_to_kafka.request.records[0].value.postcode

This will resolve to "UK-BA9" in the runtime.

Step1 + Step2

---

```java

test_kafka_and_rest.json
------------------------

{
    "scenarioName": "Kafka and REST api validation example",
    "steps": [
        {
            "name": "produce_to_kafka",
            "url": "kafka-topic:people-address",
            "operation": "produce",
            "request": {
                "recordType" : "JSON",
                "records": [
                    {
                        "key": "id-lon-123",
                        "value": {
                            "id": "id-lon-123",
                            "postCode": "UK-BA9"
                        }
                    }
                ]
            },
            "verify": {
                "status": "Ok",
                "recordMetadata" : "$NOT.NULL"
            }
        },
        {
            "name": "verify_updated_address",
            "url": "/api/v1/addresses/${$.produce_to_kafka.request.records[0].value.id}",
            "operation": "GET",
            "request": {
                "headers": {
                    "X-GOVT-API-KEY": "top-key-only-known-to-secu-cleared"
                }
            },
            "verify": {
                "status": 200,
                "value": {
                    "id": "${$.produce_to_kafka.request.records[0].value.id}",
                    "postCode": "${$.produce_to_kafka.request.records[0].value.postcode}"
                }
            }
        }
    ]
}

```

# 7. Producing RAW messages vs JSON messages

When we have situation or requirements to produce simple texts which are not JSON records, then the framework takes care of it by default. Or for the test readability(you can even skip this field), you can mention it as below.

>          "recordType" : "RAW",

When we have situation or requirements to produce JSON records, then we need to tell the test to do so as below.

>          "recordType" : "JSON"

The host properties are defined as below

```properties

"host.properties"
-----------------

kafka.bootstrap.servers=localhost:9092
kafka.producer.properties=kafka_servers/kafka_producer_avro.properties
kafka.consumer.properties=kafka_servers/kafka_consumer_avro.properties

# REST End point server FQDN
web.application.endpoint.host=http://localhost
web.application.endpoint.port=8082
web.application.endpoint.context=

```

You simply run the test(s) via a JUnit runner `ZeroCodeUnitRunner.class` as below

```java
@TargetEnv("kafka_servers/host.properties")
@RunWith(ZeroCodeUnitRunner.class)
public class KafkaRestTest {

    @Test
    @JsonTestCase("kafka/produce/test_kafka_and_rest.json")
    public void testKafkaAndRestApi() throws Exception {
    }

}
```

See more RAW and JSON examples in the sidebar of the Wiki. :raised_hands:

# 8. Why do I need `zerocode-tdd` lib

Zerocode is a light-weight, simple and extensible open-source framework for writing test intentions in a simple JSON format that facilitates both declarative configuration and automation. The framework manages the request payload handling and response verifications at the same time.

Zerocode has taken a different approach to solve the fuss involved in the Kafka and REST API testing.

It has got the best of best ideas and practices from the community and the adoption is rapids growing among the developer/tester community. Even many times the manual test engineers come out and help in automation due to the simplicity of writing tests.

# 9. Docker - Bringing up Kafka in a Container

- [Single Node Kafka](https://github.com/authorjapps/zerocode-docker-factory/wiki/Docker-container-for-a-single-node-Kafka-broker)
- [Kafka with Schema Registry and REST Proxy](https://github.com/authorjapps/zerocode-docker-factory/wiki/Docker-container-for-Kafka-and-Schema-Registry)

# 10. Conclusion

In this tutorial, we looked at some of the Kafka concepts and how to test Kafka applications using the Zerocode Testing Framework.

Using this approach, we have tested and validated clustered Kafka Data Pipelines to Hadoop as well as Http REST APIs deployed in Kubernetes orchestrated pods. We found this approach very very straight forward and reduced complexity to maintain and promote the code to higher environments.

The complete source code and all example code snippets for this Wiki page can be found in [GitHub Repo(Try at home)](https://github.com/authorjapps/hello-kafka-stream-testing).

Or directly visit the below executable test-cases.

- [Produce Tests](https://github.com/authorjapps/hello-kafka-stream-testing/tree/master/src/test/resources/kafka/produce)
- [Consume Tests](https://github.com/authorjapps/hello-kafka-stream-testing/tree/master/src/test/resources/kafka/consume)
- [KSQL Tests](https://github.com/authorjapps/hello-kafka-stream-testing/tree/master/src/test/resources/kafka/consume/ksql)
- [Produce Records Directly From File](https://github.com/authorjapps/hello-kafka-stream-testing/tree/master/src/test/resources/kafka/produce/file_produce)
- [Consume Records And Dump To File](https://github.com/authorjapps/hello-kafka-stream-testing/tree/master/src/test/resources/kafka/consume/file_dump)

> To run any test(s), we can directly navigate to their corresponding JUnit @Test, under 'src/test/java' and run as JUnit.
> Prior to that, we need to bring up Docker with Kafka(Spin up [kafka-schema-registry.yml (See Wiki)](https://github.com/authorjapps/zerocode-docker-factory/wiki/Docker-container-for-Kafka-and-Schema-Registry).

## _Note_

- Kafka testing framework in Zerocode has been built using Apache Kafka client and it abstracts the complexities of writing Java code to acieve the same end goal
- It completely bypasses the Java layer to save us from the fire-fighting we need to do otherwise. It enables us to focus on testing rather than solving coding issues
- At the same time, along with the simplicity, it is also gives the flexibility to **still** use the Java client(s), to keep the test-cases _declarative_ as they were

# Maven Dependency

Visit [README](https://github.com/authorjapps/zerocode) page in GitHub.

```
<dependency>
    <groupId>org.jsmart</groupId>
    <artifactId>zerocode-tdd</artifactId>
    <version>1.3.x</version>
</dependency>
```

If you found this tutorial helpful for testing Kafka and HTTP APIs, then feel free to mark a "star" on our [GitHub](https://github.com/authorjapps/zerocode) repo (Top right corner)!

### Happy Testing! 🐼
