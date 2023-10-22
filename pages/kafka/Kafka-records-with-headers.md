## Introduction
This page explains how to send Kafka headers through PRODUCE operation for automated Kafka testing

## Records With Headers (Produce)
Below are the examples of sample records with headers:

## JSON Record
```JSON
{
                        "key": 101,
                        "value": {
                            "name": "Foo",
                            "addressLine1": "99 Bar Street"
                        },
                        "headers": {
                            "my-company-header1": "my-value1",
                            "correlationId": "e.g.d85e88d2-9393-40a8-9c56-ec29004c45c9"
                        }
}
```

## RAW Record

```JSON
{
                        "key": 101,
                        "value": "Something",
                        "headers": {
                            "myKey": "MyValue",
                            "correlationId": "e.g.d85e88d2-9899-40a8-9c56-ec29004c45c9"
                        }
}
```

## Test Scenario
A sample PRODUCE and CONSUME scenario would look like below:
```JSON
{
    "scenarioName": "Produce a message with headers to a Kafka topic",
    "steps": [
        {
            "name": "produce_to_kafka",
            "url": "kafka-topic:demo-json-headers-topic",
            "operation": "PRODUCE",
            "request": {
                "recordType": "JSON",
                "records": [
                    {
                        "key": 101,
                        "value": {
                            "name": "Jey"
                        },
                        "headers": {
                            "myKey": "something",
                            "correlationId": "e.g.d85e88d2-3247-40a8-9c56-ec29004c45c9"
                        }
                    }
                ]
            },
            "assertions": {
                "status": "Ok",
                "recordMetadata": "$NOT.NULL"
            }
        },
        {
            "name": "consume_from_kafka",
            "url": "kafka-topic:demo-json-headers-topic",
            "operation": "unload",
            "request": {
                "consumerLocalConfigs": {
                    "recordType": "JSON",
                    "commitSync": true,
                    "maxNoOfRetryPollsOrTimeouts": 3
                }
            },
            "assertions": {
                "size": 1,
                "records": [
                    {
                        "key": 101,
                        "value": {
                            "name": "Jey"
                        },
                        "headers": {
                            "myKey": "something",
                            "correlationId": "e.g.d85e88d2-3247-40a8-9c56-ec29004c45c9"
                        }
                    }
                ]
            }
        }
    ]
}

```

or if you are using YAML, you can do it following way:
```YAML
---
scenarioName: Produce a message with headers to a Kafka topic
steps:
- name: produce_to_kafka
  url: kafka-topic:demo-json-headers-topic
  operation: PRODUCE
  request:
    recordType: JSON
    records:
    - key: 101
      value:
        name: Jey
      headers:
        myKey: something
        correlationId: e.g.d85e88d2-3247-40a8-9c56-ec29004c45c9
  assertions:
    status: Ok
    recordMetadata: "$NOT.NULL"
- name: consume_from_kafka
  url: kafka-topic:demo-json-headers-topic
  operation: unload
  request:
    consumerLocalConfigs:
      recordType: JSON
      commitSync: true
      maxNoOfRetryPollsOrTimeouts: 3
  assertions:
    size: 1
    records:
    - key: 101
      value:
        name: Jey
      headers:
        myKey: something
        correlationId: e.g.d85e88d2-3247-40a8-9c56-ec29004c45c9

```

## Conclusion
Please visit the example module repo for working examples to clone and try at home.
+ [Produce, Consume JSON with headers](https://github.com/authorjapps/zerocode/blob/master/kafka-testing/src/test/java/org/jsmart/zerocode/integration/tests/kafka/produce/KafkaProduceWithHeadersTest.java)
+ [Produce, Consume RAW with headers](https://github.com/authorjapps/zerocode/blob/master/kafka-testing/src/test/java/org/jsmart/zerocode/integration/tests/kafka/produce/KafkaProduceRawWithHeadersTest.java)

