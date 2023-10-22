# Description
Google Protobuf is an excellent candidate for serializing messages to send over network due to it provides a very fast serialization algorithm, allows disk space optimization etc. It is also very efficient to serialize the Kafka value to send to a kafka topic.

Protobuf can be used for serializing, deserializing and validating data structures/schemas. `proto-c` is used as Protobuf compiler which compiles the “.proto” files into Java code(also supports for native code generation for most of the mainstream programming languages)

## Creating Proto Messages
The compiled java class for the proto messages are generated at the `target` folder.
e.g.
![image](https://user-images.githubusercontent.com/12598420/92155197-e4023180-ee1e-11ea-93e1-1597ba17d89c.png)

## Compiling Proto Messages
See `zerocode/kafka-testing/pom.xml`.

Using maven plugin,
```XML
<plugin>
	<groupId>com.github.os72</groupId>
	<artifactId>protoc-jar-maven-plugin</artifactId>
	<version>3.11.4</version>
	<executions>
		<execution>
			<phase>generate-sources</phase>
			<goals>
				<goal>run</goal>
			</goals>
			<configuration>
				<protocVersion>3.11.4</protocVersion> <!-- Pick your project compatible version -->
				<includeDirectories>
					<include>src/main/proto</include>
				</includeDirectories>
				<inputDirectories>
					<include>src/main/proto</include>
				</inputDirectories>
			</configuration>
		</execution>
	</executions>
</plugin>
```


## Producing Proto Messages
See the section "Working Example"


## Consuming Proto Messages
See the section "Working Example"


## SerDe Properties
Producer:
```properties
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
#          kafka producer properties
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
client.id=zerocode-producer
key.serializer=org.apache.kafka.common.serialization.IntegerSerializer
value.serializer=org.apache.kafka.common.serialization.ByteArraySerializer

```

Consumer:
```properties
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
#          kafka consumer properties
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
group.id=consumerGroup14
key.deserializer=org.apache.kafka.common.serialization.IntegerDeserializer
value.deserializer=org.apache.kafka.common.serialization.ByteArrayDeserializer
```


## Working Example

JUnit class:
```
zerocode/kafka-testing/src/test/java/org/jsmart/zerocode/integration/tests/kafka/protobuf/KafkaProtobufTest.java
```
Scenario:
```
zerocode/kafka-testing/src/test/resources/kafka/produce-consume/test_kafka_protobuf.json
```

## Sample Test Result and Logs

<details>
<summary>Result and Logs(click to expand)</summary>
<p>

```bash
2020-09-03 19:00:54,559 [main] INFO  org.jsmart.zerocode.core.runner.ZeroCodeMultiStepsScenarioRunnerImpl - 

-------------------------- BDD: Scenario:Produce and consume a protobuf message -------------------------

2020-09-03 19:00:54,582 [main] INFO  org.jsmart.zerocode.core.runner.ZeroCodeMultiStepsScenarioRunnerImpl - 
-------------------------------------------------------------------------
     Executing Scenario Count No. or parameter No. or Row No. | 0 | 
-------------------------------------------------------------------------
2020-09-03 19:00:54,636 [main] INFO  org.jsmart.zerocode.core.kafka.helper.KafkaConsumerHelper - 
---------------------------------------------------------
kafka.bootstrap.servers - localhost:9092
---------------------------------------------------------
2020-09-03 19:00:54,637 [main] INFO  org.jsmart.zerocode.core.kafka.client.BasicKafkaClient - brokers:localhost:9092, topicName:demo-protobuf-topic, operation:produce, requestJson:{"recordType":"PROTO","protoClassType":"org.jsmart.zerocode.proto.PersonsProto$Person","records":[{"key":700,"value":{"name":"John Doe","id":700,"email":"john.doe@zerocode.com","phones":[{"number":"123-321-1234","type":"HOME"}]}}]}
2020-09-03 19:00:54,672 [main] INFO  org.apache.kafka.clients.producer.ProducerConfig - ProducerConfig values: 
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
        key.serializer = class org.apache.kafka.common.serialization.IntegerSerializer
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
        value.serializer = class org.apache.kafka.common.serialization.ByteArraySerializer
...
2020-09-03 19:00:55,362 [main] INFO  org.jsmart.zerocode.core.engine.validators.ZeroCodeValidatorImpl - Comparing results via LENIENT matchers

--------- TEST-STEP-CORRELATION-ID: 1e2cc337-15d6-44f2-9aa9-53d1238431b9 ---------
*requestTimeStamp:2020-09-03T19:00:54.631
step:produce_protobuf_person
id:null
url:kafka-topic:demo-protobuf-topic
method:PRODUCE
request:
{
  "recordType" : "PROTO",
  "protoClassType" : "org.jsmart.zerocode.proto.PersonsProto$Person",
  "records" : [ {
    "key" : 700,
    "value" : {
      "name" : "John Doe",
      "id" : 700,
      "email" : "john.doe@zerocode.com",
      "phones" : [ {
        "number" : "123-321-1234",
        "type" : "HOME"
      } ]
    }
  } ]
} 
--------- TEST-STEP-CORRELATION-ID: 1e2cc337-15d6-44f2-9aa9-53d1238431b9 ---------
Response:
{
  "status" : "Ok",
  "recordMetadata" : {
    "offset" : 0,
    "timestamp" : 1599156055327,
    "serializedKeySize" : 4,
    "serializedValueSize" : 54,
    "topicPartition" : {
      "hash" : 978987352,
      "partition" : 0,
      "topic" : "demo-protobuf-topic"
    }
  }
}
*responseTimeStamp:2020-09-03T19:00:55.362 
*Response delay:731.0 milli-secs 
---------> Expected Response: <----------
{
  "status" : "Ok",
  "recordMetadata" : "$NOT.NULL"
} 
 
-done-

2020-09-03 19:00:55,373 [main] INFO  org.jsmart.zerocode.core.kafka.helper.KafkaConsumerHelper - 
---------------------------------------------------------
kafka.bootstrap.servers - localhost:9092
---------------------------------------------------------
2020-09-03 19:00:55,373 [main] INFO  org.jsmart.zerocode.core.kafka.client.BasicKafkaClient - brokers:localhost:9092, topicName:demo-protobuf-topic, operation:unload, requestJson:{"consumerLocalConfigs":{"recordType":"PROTO","commitSync":true,"maxNoOfRetryPollsOrTimeouts":5,"protoClassType":"org.jsmart.zerocode.proto.PersonsProto$Person"}}
2020-09-03 19:00:55,383 [main] INFO  org.jsmart.zerocode.core.kafka.receive.KafkaReceiver - 
### Kafka Consumer Effective configs:ConsumerLocalConfigs{recordType='PROTO'protobufMessageClassType='org.jsmart.zerocode.proto.PersonsProto$Person', fileDumpTo='target/temp/demo.txt', commitAsync=null, commitSync=true, showRecordsConsumed=true, maxNoOfRetryPollsOrTimeouts=5, pollingTime=3000, seek=null}

2020-09-03 19:00:55,394 [main] INFO  org.apache.kafka.clients.consumer.ConsumerConfig - ConsumerConfig values: 
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
        key.deserializer = class org.apache.kafka.common.serialization.IntegerDeserializer
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
        value.deserializer = class org.apache.kafka.common.serialization.ByteArrayDeserializer


...

--------- TEST-STEP-CORRELATION-ID: 584b5e93-d0ac-4f1a-a59e-a12fcbeb27ee ---------
*requestTimeStamp:2020-09-03T19:00:55.373
step:consume_protobuf_person
id:null
url:kafka-topic:demo-protobuf-topic
method:CONSUME
request:
{
  "consumerLocalConfigs" : {
    "recordType" : "PROTO",
    "commitSync" : true,
    "maxNoOfRetryPollsOrTimeouts" : 5,
    "protoClassType" : "org.jsmart.zerocode.proto.PersonsProto$Person"
  }
} 
--------- TEST-STEP-CORRELATION-ID: 584b5e93-d0ac-4f1a-a59e-a12fcbeb27ee ---------
Response:
{
  "records" : [ {
    "key" : 700,
    "jsonKey" : null,
    "value" : {
      "name" : "John Doe",
      "id" : 700,
      "email" : "john.doe@zerocode.com",
      "phones" : [ {
        "number" : "123-321-1234",
        "type" : "HOME"
      } ]
    },
    "headers" : { }
  } ],
  "size" : 1
}
*responseTimeStamp:2020-09-03T19:01:13.558 
*Response delay:18185.0 milli-secs 
---------> Expected Response: <----------
{
  "size" : 1,
  "records" : [ {
    "key" : 700,
    "value" : {
      "name" : "John Doe",
      "email" : "john.doe@zerocode.com"
    }
  } ]
} 
 
-done-

2020-09-03 19:01:13,693 [main] INFO  org.jsmart.zerocode.core.runner.ZeroCodeUnitRunner - 
**FINISHED executing all Steps for [Produce and consume a protobuf message] **.
Steps were:[produce_protobuf_person, consume_protobuf_person]

...

Results :

Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
$ 

```
</p>
</details>
