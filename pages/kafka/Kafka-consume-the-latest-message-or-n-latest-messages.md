# How to consume n latest messages from a Kafka partition

> Available in version `1.3.25` onwards.

## Consuming the latest message

The challenge here is you may not know the offset number of the last message deterministically, hence "-1", "-2" etc helps here, because whatever is the offset, it will always read the messages from the end of the partition.

```
offset 1        offset 2        offset 3                offset 4
order4-guitar   order3-flute    order2-acoustic-piano   order1-digital-piano
-4              -3              -2                      -1
```

To consume the last record i.e. the record at the last offset, use the following.

```
"seek": "order-topic,0,-1",
```

In the above, topic=order-topic, partition=0, offset=the offset of the last record.

See an example of a scenario step below to read the last message "order1-digital-piano" at "offset4"

```
{
    "name": "consume_last1",
    "url": "kafka-topic:order-topic",
    "operation": "CONSUME",
    "request": {
        "consumerLocalConfigs": {
            "seek": "order-topic,0,-1",
            "commitSync": true,
            "recordType": "RAW",
            "showRecordsConsumed": true,
            "maxNoOfRetryPollsOrTimeouts": 3
        }
    },
    "assertions": {
        "size": 1
    }
}
```

## Consuming the latest two messages

To consume the last 2(two) records, "order1-digital-piano" at "offset4" and "order2-acoustic-piano" at "offset3"

```
"seek": "order-topic,0,-2",
```

See an example of a scenario step below:

```
{
    "name": "consume_last2",
    "url": "kafka-topic:order-topic",
    "operation": "CONSUME",
    "request": {
        "consumerLocalConfigs": {
            "seek": "order-topic,0,-2",
            "commitSync": true,
            "recordType": "RAW",
            "showRecordsConsumed": true,
            "maxNoOfRetryPollsOrTimeouts": 3
        }
    },
    "assertions": {
        "size": 2
    }
}
```

## Consuming the latest n messages

To consume the last n records, replace `n` with the number of messages you want to consume. The format is `"seek": "topic-name,partition,-n"` where `n` is the number of messages to read from the end of the partition.

For example, to consume the last 3 records:

```
"seek": "order-topic,0,-3"
```

See an example of a scenario step below:

```
{
    "name": "consume_last3",
    "url": "kafka-topic:order-topic",
    "operation": "CONSUME",
    "request": {
        "consumerLocalConfigs": {
            "seek": "order-topic,0,-3",
            "commitSync": true,
            "recordType": "RAW",
            "showRecordsConsumed": true,
            "maxNoOfRetryPollsOrTimeouts": 3
        }
    },
    "assertions": {
        "size": 3
    }
}
```

> ⚠️ **Note:** The `seek` configuration determines where the consumer starts reading. If new messages are actively being published to the topic while this test runs, the consumer may read more than the expected number of messages, causing the size assertion to fail.

## CI-tested example

The following scenario from the CI build produces two messages and then consumes the latest 1 and 2 messages using `seek`:

```
{
    "scenarioName": "Consume latest n messages from a partition",
    "steps": [
        {
            "name": "load_kafka",
            "url": "kafka-topic:demo-c3",
            "operation": "PRODUCE",
            "request": {
                "records": [
                    {
                        "key": "${RANDOM.NUMBER}",
                        "value": "Hello World1"
                    }
                ]
            },
            "assertions": {
                "status": "Ok"
            }
        },
        {
            "name": "load_kafka2",
            "url": "kafka-topic:demo-c3",
            "operation": "PRODUCE",
            "request": {
                "records": [
                    {
                        "key": "${RANDOM.NUMBER}",
                        "value": "Hello World2"
                    }
                ]
            },
            "assertions": {
                "status": "Ok"
            }
        },
        {
            "name": "consume_last1",
            "url": "kafka-topic:demo-c3",
            "operation": "CONSUME",
            "request": {
                "consumerLocalConfigs": {
                    "seek": "demo-c3,0,-1",
                    "commitSync": true,
                    "recordType": "RAW",
                    "showRecordsConsumed": true,
                    "maxNoOfRetryPollsOrTimeouts": 3
                }
            },
            "assertions": {
                "size": 1
            }
        },
        {
            "name": "consume_last2",
            "url": "kafka-topic:demo-c3",
            "operation": "CONSUME",
            "request": {
                "consumerLocalConfigs": {
                    "seek": "demo-c3,0,-2",
                    "commitSync": true,
                    "recordType": "RAW",
                    "showRecordsConsumed": true,
                    "maxNoOfRetryPollsOrTimeouts": 3
                }
            },
            "assertions": {
                "size": 2
            }
        }
    ]
}
```

## Source Code Reference

- [test_kafka_consume_seek_offset_latest.json](https://github.com/authorjapps/zerocode/blob/master/kafka-testing-examples/src/test/resources/kafka/consume/test_kafka_consume_seek_offset_latest.json) — CI-tested scenario
- [KafkaConsumeSeekOffsetTest.java](https://github.com/authorjapps/zerocode/blob/master/kafka-testing-examples/src/test/java/org/jsmart/zerocode/integration/tests/kafka/consume/KafkaConsumeSeekOffsetTest.java) — JUnit test runner