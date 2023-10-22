## Test scenario
```JSON
{
    "scenarioName": "Produce and Consume XML as RAW message",
    "steps": [
        {
            "name": "load_kafka",
            "url": "kafka-topic:demo-raw1",
            "operation": "load",
            "request": {
                "record Type" : "RAW",
                "records": [
                    {
                        "key": "${RANDOM.NUMBER}",
                        "value": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n    <ConversionRate xmlns=\"http://www.webserviceX.NET/\">\n      <FromCurrency>AFA</FromCurrency>\n      <ToCurrency>GBP</ToCurrency>\n    </ConversionRate>\n  </soap:Body>\n</soap:Envelope>"
                    }
                ]
            },
            "assertions": {
                "status": "Ok"
            }
        },
        {
            "name": "onload_kafka",
            "url": "kafka-topic:demo-raw1",
            "operation": "unload",
            "request": {
                "consumerLocalConfigs": {
                    "recordType": "RAW",
                    "commitSync": true,
                    "showRecordsConsumed": true,
                    "maxNoOfRetryPollsOrTimeouts": 3
                }
            },
            "assertions": {
                "size": 1,
                "records": [
                    {
                        "key" : "$NOT.NULL",
                        "value": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n    <ConversionRate xmlns=\"http://www.webserviceX.NET/\">\n      <FromCurrency>AFA</FromCurrency>\n      <ToCurrency>GBP</ToCurrency>\n    </ConversionRate>\n  </soap:Body>\n</soap:Envelope>"
                    }
                ]
            }
        }
    ]
}
```

## Test log
Logs can be viewed at `target/logs/your-log-file.log` or at the console. In case you miss or clear the logs from the console, you can always go to the target folder and view the logs.

```bash
2020-05-19 12:32:25,358 [main] INFO  org.jsmart.zerocode.core.runner.ZeroCodeMultiStepsScenarioRunnerImpl - 
-------------------------- BDD: Scenario:Produce and Consume XML as RAW message -------------------------

2020-05-19 12:32:25,401 [main] INFO  org.jsmart.zerocode.core.runner.ZeroCodeMultiStepsScenarioRunnerImpl - 
-------------------------------------------------------------------------
     Executing Scenario Count No. or parameter No. or Row No. | 0 | 
-------------------------------------------------------------------------
2020-05-19 12:32:25,461 [main] INFO  org.jsmart.zerocode.core.kafka.helper.KafkaConsumerHelper - 
---------------------------------------------------------
kafka.bootstrap.servers - localhost:9092
---------------------------------------------------------
2020-05-19 12:32:25,462 [main] INFO  org.jsmart.zerocode.core.kafka.client.BasicKafkaClient - brokers:localhost:9092, topicName:demo-raw1, operation:load, requestJson:{"record Type":"RAW","records":[{"key":"6784799632078391362","value":"<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n    <ConversionRate xmlns=\"http://www.webserviceX.NET/\">\n      <FromCurrency>AFA</FromCurrency>\n      <ToCurrency>GBP</ToCurrency>\n    </ConversionRate>\n  </soap:Body>\n</soap:Envelope>"}]}
2020-05-19 12:32:25,484 [main] INFO  org.apache.kafka.clients.producer.ProducerConfig - ProducerConfig values: 
	acks = 1
	batch.size = 16384
	bootstrap.servers = [localhost:9092]
	buffer.memory = 33554432
	client.dns.lookup = default
	client.id = zerocode-producer
	compression.type = none
	connections.max.idle.ms = 540000
	delivery.timeout.ms = 120000
	enable.idempotence = false
	interceptor.classes = []
	key.serializer = class org.apache.kafka.common.serialization.StringSerializer
	linger.ms = 0
	max.block.ms = 60000
	max.in.flight.requests.per.connection = 5
	max.request.size = 1048576
	metadata.max.age.ms = 300000
	metric.reporters = []
	metrics.num.samples = 2
	metrics.recording.level = INFO
	metrics.sample.window.ms = 30000
	partitioner.class = class org.apache.kafka.clients.producer.internals.DefaultPartitioner
	receive.buffer.bytes = 32768
	reconnect.backoff.max.ms = 1000
	reconnect.backoff.ms = 50
	request.timeout.ms = 30000
	retries = 2147483647
	retry.backoff.ms = 100
	sasl.client.callback.handler.class = null
	sasl.jaas.config = null
	sasl.kerberos.kinit.cmd = /usr/bin/kinit
	sasl.kerberos.min.time.before.relogin = 60000
	sasl.kerberos.service.name = null
	sasl.kerberos.ticket.renew.jitter = 0.05
	sasl.kerberos.ticket.renew.window.factor = 0.8
	sasl.login.callback.handler.class = null
	sasl.login.class = null
	sasl.login.refresh.buffer.seconds = 300
	sasl.login.refresh.min.period.seconds = 60
	sasl.login.refresh.window.factor = 0.8
	sasl.login.refresh.window.jitter = 0.05
	sasl.mechanism = GSSAPI
	security.protocol = PLAINTEXT
	send.buffer.bytes = 131072
	ssl.cipher.suites = null
	ssl.enabled.protocols = [TLSv1.2, TLSv1.1, TLSv1]
	ssl.endpoint.identification.algorithm = https
	ssl.key.password = null
	ssl.keymanager.algorithm = SunX509
	ssl.keystore.location = null
	ssl.keystore.password = null
	ssl.keystore.type = JKS
	ssl.protocol = TLS
	ssl.provider = null
	ssl.secure.random.implementation = null
	ssl.trustmanager.algorithm = PKIX
	ssl.truststore.location = null
	ssl.truststore.password = null
	ssl.truststore.type = JKS
	transaction.timeout.ms = 60000
	transactional.id = null
	value.serializer = class org.apache.kafka.common.serialization.StringSerializer

2020-05-19 12:32:25,613 [main] INFO  org.apache.kafka.common.utils.AppInfoParser - Kafka version : 2.1.0
2020-05-19 12:32:25,613 [main] INFO  org.apache.kafka.common.utils.AppInfoParser - Kafka commitId : eec43959745f444f
2020-05-19 12:32:25,669 [main] WARN  org.jsmart.zerocode.core.kafka.helper.KafkaProducerHelper - Could not find path '$.recordType' in the request. returned default type 'RAW'.
2020-05-19 12:32:25,677 [main] INFO  org.jsmart.zerocode.core.kafka.send.KafkaSender - Sending record number: 0

2020-05-19 12:32:25,678 [main] INFO  org.jsmart.zerocode.core.kafka.send.KafkaSender - Synchronous Producer sending record - ProducerRecord(topic=demo-raw1, partition=null, headers=RecordHeaders(headers = [], isReadOnly = false), key=6784799632078391362, value=<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ConversionRate xmlns="http://www.webserviceX.NET/">
      <FromCurrency>AFA</FromCurrency>
      <ToCurrency>GBP</ToCurrency>
    </ConversionRate>
  </soap:Body>
</soap:Envelope>, timestamp=null)
2020-05-19 12:32:25,821 [kafka-producer-network-thread | zerocode-producer] INFO  org.apache.kafka.clients.Metadata - Cluster ID: gnHjzbDdQ1ysLyePd3H6mQ
2020-05-19 12:32:25,856 [main] INFO  org.jsmart.zerocode.core.kafka.send.KafkaSender - Record was sent to partition- 0, with offset- 1 
2020-05-19 12:32:25,863 [main] INFO  org.jsmart.zerocode.core.kafka.send.KafkaSender - deliveryDetails- {"status":"Ok","recordMetadata":{"offset":1,"timestamp":1589887945831,"serializedKeySize":19,"serializedValueSize":407,"topicPartition":{"hash":749906548,"partition":0,"topic":"demo-raw1"}}}
2020-05-19 12:32:25,863 [main] INFO  org.apache.kafka.clients.producer.KafkaProducer - [Producer clientId=zerocode-producer] Closing the Kafka producer with timeoutMillis = 9223372036854775807 ms.
2020-05-19 12:32:25,873 [main] INFO  org.jsmart.zerocode.core.engine.validators.ZeroCodeValidatorImpl - Comparing results via LENIENT matchers
2020-05-19 12:32:25,878 [main] INFO  org.jsmart.zerocode.core.runner.StepNotificationHandler - 
***Step PASSED - Scenario:consume as RAW message -> load_kafka
2020-05-19 12:32:25,882 [main] INFO  org.jsmart.zerocode.core.runner.ZeroCodeMultiStepsScenarioRunnerImpl - 
--------- TEST-STEP-CORRELATION-ID: a8ebe4c6-c1fb-434c-9c00-b2cbdf2f7fe6 ---------
*requestTimeStamp:2020-05-19T12:32:25.455
step:load_kafka
id:null
url:kafka-topic:demo-raw1
method:load
request:
{
  "record Type" : "RAW",
  "records" : [ {
    "key" : "6784799632078391362",
    "value" : "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n    <ConversionRate xmlns=\"http://www.webserviceX.NET/\">\n      <FromCurrency>AFA</FromCurrency>\n      <ToCurrency>GBP</ToCurrency>\n    </ConversionRate>\n  </soap:Body>\n</soap:Envelope>"
  } ]
} 
--------- TEST-STEP-CORRELATION-ID: a8ebe4c6-c1fb-434c-9c00-b2cbdf2f7fe6 ---------
Response:
{
  "status" : "Ok",
  "recordMetadata" : {
    "offset" : 1,
    "timestamp" : 1589887945831,
    "serializedKeySize" : 19,
    "serializedValueSize" : 407,
    "topicPartition" : {
      "hash" : 749906548,
      "partition" : 0,
      "topic" : "demo-raw1"
    }
  }
}
*responseTimeStamp:2020-05-19T12:32:25.872 
*Response delay:417.0 milli-secs 
---------> Expected Response: <----------
{
  "status" : "Ok"
} 
 
-done-

2020-05-19 12:32:25,884 [main] INFO  org.jsmart.zerocode.core.kafka.helper.KafkaConsumerHelper - 
---------------------------------------------------------
kafka.bootstrap.servers - localhost:9092
---------------------------------------------------------
2020-05-19 12:32:25,884 [main] INFO  org.jsmart.zerocode.core.kafka.client.BasicKafkaClient - brokers:localhost:9092, topicName:demo-raw1, operation:unload, requestJson:{"consumerLocalConfigs":{"recordType":"RAW","commitSync":true,"showRecordsConsumed":true,"maxNoOfRetryPollsOrTimeouts":3}}
2020-05-19 12:32:25,898 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - 
### Kafka Consumer Effective configs:ConsumerLocalConfigs{recordType='RAW', fileDumpTo='target/temp/demo.txt', commitAsync=null, commitSync=true, showRecordsConsumed=true, maxNoOfRetryPollsOrTimeouts=3, pollingTime=1000, seek=null}

2020-05-19 12:32:25,904 [main] INFO  org.apache.kafka.clients.consumer.ConsumerConfig - ConsumerConfig values: 
	auto.commit.interval.ms = 5000
	auto.offset.reset = earliest
	bootstrap.servers = [localhost:9092]
	check.crcs = true
	client.dns.lookup = default
	client.id = 
	connections.max.idle.ms = 540000
	default.api.timeout.ms = 60000
	enable.auto.commit = false
	exclude.internal.topics = true
	fetch.max.bytes = 52428800
	fetch.max.wait.ms = 500
	fetch.min.bytes = 1
	group.id = consumerGroup14
	heartbeat.interval.ms = 3000
	interceptor.classes = []
	internal.leave.group.on.close = true
	isolation.level = read_uncommitted
	key.deserializer = class org.apache.kafka.common.serialization.StringDeserializer
	max.partition.fetch.bytes = 1048576
	max.poll.interval.ms = 300000
	max.poll.records = 2
	metadata.max.age.ms = 300000
	metric.reporters = []
	metrics.num.samples = 2
	metrics.recording.level = INFO
	metrics.sample.window.ms = 30000
	partition.assignment.strategy = [class org.apache.kafka.clients.consumer.RangeAssignor]
	receive.buffer.bytes = 65536
	reconnect.backoff.max.ms = 1000
	reconnect.backoff.ms = 50
	request.timeout.ms = 30000
	retry.backoff.ms = 100
	sasl.client.callback.handler.class = null
	sasl.jaas.config = null
	sasl.kerberos.kinit.cmd = /usr/bin/kinit
	sasl.kerberos.min.time.before.relogin = 60000
	sasl.kerberos.service.name = null
	sasl.kerberos.ticket.renew.jitter = 0.05
	sasl.kerberos.ticket.renew.window.factor = 0.8
	sasl.login.callback.handler.class = null
	sasl.login.class = null
	sasl.login.refresh.buffer.seconds = 300
	sasl.login.refresh.min.period.seconds = 60
	sasl.login.refresh.window.factor = 0.8
	sasl.login.refresh.window.jitter = 0.05
	sasl.mechanism = GSSAPI
	security.protocol = PLAINTEXT
	send.buffer.bytes = 131072
	session.timeout.ms = 10000
	ssl.cipher.suites = null
	ssl.enabled.protocols = [TLSv1.2, TLSv1.1, TLSv1]
	ssl.endpoint.identification.algorithm = https
	ssl.key.password = null
	ssl.keymanager.algorithm = SunX509
	ssl.keystore.location = null
	ssl.keystore.password = null
	ssl.keystore.type = JKS
	ssl.protocol = TLS
	ssl.provider = null
	ssl.secure.random.implementation = null
	ssl.trustmanager.algorithm = PKIX
	ssl.truststore.location = null
	ssl.truststore.password = null
	ssl.truststore.type = JKS
	value.deserializer = class org.apache.kafka.common.serialization.StringDeserializer

2020-05-19 12:32:25,932 [main] INFO  org.apache.kafka.common.utils.AppInfoParser - Kafka version : 2.1.0
2020-05-19 12:32:25,933 [main] INFO  org.apache.kafka.common.utils.AppInfoParser - Kafka commitId : eec43959745f444f
2020-05-19 12:32:25,934 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - polling records  - noOfTimeOuts reached : 0
2020-05-19 12:32:25,944 [main] INFO  org.apache.kafka.clients.Metadata - Cluster ID: gnHjzbDdQ1ysLyePd3H6mQ
2020-05-19 12:32:25,947 [main] INFO  org.apache.kafka.clients.consumer.internals.AbstractCoordinator - [Consumer clientId=consumer-1, groupId=consumerGroup14] Discovered group coordinator localhost:9092 (id: 2147483646 rack: null)
2020-05-19 12:32:25,951 [main] INFO  org.apache.kafka.clients.consumer.internals.ConsumerCoordinator - [Consumer clientId=consumer-1, groupId=consumerGroup14] Revoking previously assigned partitions []
2020-05-19 12:32:25,951 [main] INFO  org.apache.kafka.clients.consumer.internals.AbstractCoordinator - [Consumer clientId=consumer-1, groupId=consumerGroup14] (Re-)joining group
2020-05-19 12:32:26,939 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - polling records  - noOfTimeOuts reached : 1
2020-05-19 12:32:27,943 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - polling records  - noOfTimeOuts reached : 2
2020-05-19 12:32:28,946 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - polling records  - noOfTimeOuts reached : 3
2020-05-19 12:32:28,962 [main] INFO  org.apache.kafka.clients.consumer.internals.AbstractCoordinator - [Consumer clientId=consumer-1, groupId=consumerGroup14] Successfully joined group with generation 3
2020-05-19 12:32:28,963 [main] INFO  org.apache.kafka.clients.consumer.internals.ConsumerCoordinator - [Consumer clientId=consumer-1, groupId=consumerGroup14] Setting newly assigned partitions [demo-raw1-0]
2020-05-19 12:32:28,985 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - Got 1 records after 3 timeouts

2020-05-19 12:32:28,986 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - Consumer chosen recordType: RAW
2020-05-19 12:32:28,986 [main] INFO  org.jsmart.zerocode.core.kafka.helper.KafkaConsumerHelper - 
Record Key - 6784799632078391362 , Record value - <?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ConversionRate xmlns="http://www.webserviceX.NET/">
      <FromCurrency>AFA</FromCurrency>
      <ToCurrency>GBP</ToCurrency>
    </ConversionRate>
  </soap:Body>
</soap:Envelope>, Record partition - 0, Record offset - 1
2020-05-19 12:32:28,990 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - polling records  - noOfTimeOuts reached : 0
2020-05-19 12:32:29,992 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - polling records  - noOfTimeOuts reached : 1
2020-05-19 12:32:30,997 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - polling records  - noOfTimeOuts reached : 2
2020-05-19 12:32:31,998 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - polling records  - noOfTimeOuts reached : 3
2020-05-19 12:32:33,002 [main] INFO  org.apache.kafka.clients.consumer.internals.AbstractCoordinator - [Consumer clientId=consumer-1, groupId=consumerGroup14] Sending LeaveGroup request to coordinator localhost:9092 (id: 2147483646 rack: null)
2020-05-19 12:32:33,020 [main] INFO  org.jsmart.zerocode.core.engine.validators.ZeroCodeValidatorImpl - Comparing results via LENIENT matchers
2020-05-19 12:32:33,025 [main] INFO  org.jsmart.zerocode.core.runner.StepNotificationHandler - 
***Step PASSED - Scenario:consume as RAW message -> onload_kafka
2020-05-19 12:32:33,025 [main] INFO  org.jsmart.zerocode.core.runner.ZeroCodeMultiStepsScenarioRunnerImpl - 
--------- TEST-STEP-CORRELATION-ID: 53092b7e-ae92-4631-ad79-0602280650b9 ---------
*requestTimeStamp:2020-05-19T12:32:25.884
step:onload_kafka
id:null
url:kafka-topic:demo-raw1
method:unload
request:
{
  "consumerLocalConfigs" : {
    "recordType" : "RAW",
    "commitSync" : true,
    "showRecordsConsumed" : true,
    "maxNoOfRetryPollsOrTimeouts" : 3
  }
} 
--------- TEST-STEP-CORRELATION-ID: 53092b7e-ae92-4631-ad79-0602280650b9 ---------
Response:
{
  "records" : [ {
    "topic" : "demo-raw1",
    "partition" : 0,
    "offset" : 1,
    "timestamp" : 1589887945831,
    "timestampType" : "CREATE_TIME",
    "serializedKeySize" : 19,
    "serializedValueSize" : 407,
    "key" : "6784799632078391362",
    "value" : "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n    <ConversionRate xmlns=\"http://www.webserviceX.NET/\">\n      <FromCurrency>AFA</FromCurrency>\n      <ToCurrency>GBP</ToCurrency>\n    </ConversionRate>\n  </soap:Body>\n</soap:Envelope>",
    "leaderEpoch" : {
      "value" : 0
    }
  } ],
  "size" : 1
}
*responseTimeStamp:2020-05-19T12:32:33.020 
*Response delay:7136.0 milli-secs 
---------> Expected Response: <----------
{
  "size" : 1,
  "records" : [ {
    "key" : "$NOT.NULL",
    "value" : "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n    <ConversionRate xmlns=\"http://www.webserviceX.NET/\">\n      <FromCurrency>AFA</FromCurrency>\n      <ToCurrency>GBP</ToCurrency>\n    </ConversionRate>\n  </soap:Body>\n</soap:Envelope>"
  } ]
} 
 
-done-

2020-05-19 12:32:33,162 [main] INFO  org.jsmart.zerocode.core.runner.ZeroCodeUnitRunner - 
**FINISHED executing all Steps for [consume as RAW message] **.
Steps were:[load_kafka, onload_kafka]
2020-05-19 12:32:33,163 [main] INFO  org.jsmart.zerocode.core.engine.listener.ZeroCodeTestReportListener - #ZeroCode: Test run completed for this runner. Generating test reports and charts. 
* For more examples, helps, Kafka streams, APIs and Load use-cases visit https://zerocode.io
2020-05-19 12:32:33,233 [main] INFO  org.jsmart.zerocode.core.domain.builders.ExtentReportsFactory - Where were the tests fired? Ans: OS:Mac OS X, Architecture:x86_64, Java:1.8.0_91, Vendor:Oracle Corporation

Process finished with exit code 0

```

## Analysis
### Produced XML log
You can look inside the log for the following and see the `produced XML message` is printed.

```bash
2020-05-19 12:32:25,677 [main] INFO  org.jsmart.zerocode.core.kafka.send.KafkaSender - Sending record number: 0

2020-05-19 12:32:25,678 [main] INFO  org.jsmart.zerocode.core.kafka.send.KafkaSender - Synchronous Producer sending record - ProducerRecord(topic=demo-raw1, partition=null, headers=RecordHeaders(headers = [], isReadOnly = false), key=6784799632078391362, value=<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ConversionRate xmlns="http://www.webserviceX.NET/">
      <FromCurrency>AFA</FromCurrency>
      <ToCurrency>GBP</ToCurrency>
    </ConversionRate>
  </soap:Body>
</soap:Envelope>, timestamp=null)
```

### Consumed XML log
You can look inside the log for the following and see the `consumed XML message` is printed.

```bash
2020-05-19 12:32:28,985 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - Got 1 records after 3 timeouts

2020-05-19 12:32:28,986 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - Consumer chosen recordType: RAW
2020-05-19 12:32:28,986 [main] INFO  org.jsmart.zerocode.core.kafka.helper.KafkaConsumerHelper - 
Record Key - 6784799632078391362 , Record value - <?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ConversionRate xmlns="http://www.webserviceX.NET/">
      <FromCurrency>AFA</FromCurrency>
      <ToCurrency>GBP</ToCurrency>
    </ConversionRate>
  </soap:Body>
</soap:Envelope>, Record partition - 0, Record offset - 1
```

## Conclusion
As expected both produced and consumed records are identical. This is not magic as it appears to be.
How else it should have been otherwise...?

Happy testing 🐼 