
# How to consume n latest messages from a Kafka partition

> Available in version `1.3.25` onwards.

## Consuming the latest message

The challenge here is you may not know the offset number of the last message deterministically, hence "-1", "-2" etc helps here, because whatever is the offset, it will always read the messages from the end of the partition.

```
offset 1	offset 2	offset 3	        offset 4
order4-guitar	order3-flute	order2-acoustic-piano	order1-digital-piano
-4	        -3	        -2	                -1
```

To consume the last record i.e. the record at the last offset, use the following.

```
"seek": "order-topic,0,-1", 
```

In the above, topic=order-topic, partition=0, offset=the offset of the last record.

See an example of a scenario step below to read the lat message "order1-digital-piano" at "offset4"

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

Consuming the latest two messages
To consume the last 2(two) records, "order1-digital-piano" at "offset4" and "order2-acoustic-piano" at "offset3"

"seek": "order-topic,0,-2", 
See an example of a scenario step below:
```
{
    "name": "consume_last1",
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
        "size": 1
    }
}
```

Consuming the latest n messages
To consume the last n records, use the following

```
"seek": "order-topic,0,-n"
```

See an example of a scenario step below:
```
{
    "name": "consume_last1",
    "url": "kafka-topic:order-topic",
    "operation": "CONSUME",
    "request": {
        "consumerLocalConfigs": {
            "seek": "order-topic,0,-n", 
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


