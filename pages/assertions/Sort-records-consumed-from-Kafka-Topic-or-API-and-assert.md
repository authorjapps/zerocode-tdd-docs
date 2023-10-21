## Note:
This sorting mechanism works for API responses as well as records consumed from a Kafka topic.

Without sorting sometimes you can't be sure in which order the HTTP server or Kafka topic will return you an array of results (records).

Sorting step support next fields:
* "key" - the key which will be used for sorting an array
* "order" - order, by which an array will be sorted (for now we support only "natural" and "reverse" orders)
* "path" - path, where the array that needs to be sorted is located in response (e.x. "$.body.persons")

See examples below for Kafka topics.

## Without Sorting (Unstable so-called 'flaky' test)

Example scenario:

```

{
  "scenarioName": "Scenario without sorting",
  "steps": [
    {
      "name": "produce some records",
      "url": "kafka-topic:demo-sorting",
      "operation": "PRODUCE",
      "request": {
        "records": [
          {
            "key": "${RANDOM.NUMBER}",
            "value": "Record 1"
          },
          {
            "key": "${RANDOM.NUMBER}",
            "value": "Record 2"
          }
        ]
      },
      "assertions": {
        "status": "Ok"
      }
    },
    {
      "name": "consume records and validate",
      "url": "kafka-topic:demo-sorting",
      "operation": "CONSUME",
      "request": {
        "consumerLocalConfigs": {
          "showRecordsConsumed": true,
          "commitSync": true,
          "maxNoOfRetryPollsOrTimeouts": 3
        }
      },
      "assertions": {
           "size": 2,
           "records": [
               {
                   "value": "Record 1"
               },
               {
                   "value": "Record 2"
               }
           ]
       }
    }
  ]
}


```

## Sort Order - Natural
Example scenario:

```
{
  "scenarioName": "Scenario without sorting",
  "steps": [
    {
      "name": "produce some records",
      "url": "kafka-topic:demo-sorting",
      "operation": "PRODUCE",
      "request": {
        "records": [
          {
            "key": "${RANDOM.NUMBER}",
            "value": "Record 1"
          },
          {
            "key": "${RANDOM.NUMBER}",
            "value": "Record 2"
          }
        ]
      },
      "assertions": {
        "status": "Ok"
      }
    },
    {
      "name": "consume records and validate",
      "url": "kafka-topic:demo-sorting",
      "operation": "CONSUME",
      "request": {
        "consumerLocalConfigs": {
          "showRecordsConsumed": true,
          "commitSync": true,
          "maxNoOfRetryPollsOrTimeouts": 3
        }
      },
      "sort": {
        "key": "value",
        "order": "natural",
        "path": "$.records"
      },
      "assertions": {
           "size": 2,
           "records": [
               {
                   "value": "Record 1"
               },
               {
                   "value": "Record 2"
               }
           ]
       }
    }
  ]
}


```

Sort Order - Reverse
===
Example scenario:

```
{
  "scenarioName": "Scenario without sorting",
  "steps": [
    {
      "name": "produce some records",
      "url": "kafka-topic:demo-sorting",
      "operation": "PRODUCE",
      "request": {
        "records": [
          {
            "key": "${RANDOM.NUMBER}",
            "value": "Record 1"
          },
          {
            "key": "${RANDOM.NUMBER}",
            "value": "Record 2"
          }
        ]
      },
      "assertions": {
        "status": "Ok"
      }
    },
    {
      "name": "consume records and validate",
      "url": "kafka-topic:demo-sorting",
      "operation": "CONSUME",
      "request": {
        "consumerLocalConfigs": {
          "showRecordsConsumed": true,
          "commitSync": true,
          "maxNoOfRetryPollsOrTimeouts": 3
        }
      },
      "sort": {
        "key": "value",
        "order": "reverse",
        "path": "$.records"
      },
      "assertions": {
           "size": 2,
           "records": [
               {
                   "value": "Record 2"
               },
               {
                   "value": "Record 1"
               }
           ]
       }
    }
  ]
}


```

## Version to Use
[1.3.33](https://github.com/authorjapps/zerocode/releases/tag/zerocode-tdd-parent-1.3.33) (Click to see details of whats included)

