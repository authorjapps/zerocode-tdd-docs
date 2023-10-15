# Table Of Contents
 * [Introduction](#introduction)
 * [Configuring Max Timeout](#configuring-max-timeout)
 * [How It Works](#how-it-works)
 * [Conclusion](#conclusion)

## Introduction
`Implicit Wait` is an optional config for the HttpClient.

+ If this is configured, then the client will implicitly wait till the configured amount of time for the server response
  + Then, if it doesn't receive the response from the server within that time, then it will throw `java.net.SocketTimeoutException`
  + And this test-step will be marked as FAIL and the execution will not continue to the next step. _If you want to forcefully continue the execution, then you can use `ignoreStepFailures` flag_
  + If the client/step receives the response before the configured `max implicit wait` time, then the execution will continue to the next step `as usual`

+ If this is not configured, then the client will continue working as usual.
  + In this case - 
    + e.g. if the server takes more time to respond, the client will keep on waiting till the server responds or till a network-timeout occurs.

## Configuring Max Timeout

```properties
http.max.timeout.milliseconds=5000
```
Configure the above flag in the `application host` properties. That's it 👍 

## How It Works
+ E.g. the config above is set to 5000 millisec(5sec)
  + If the server takes more than 5sec to respond e.g. 6sec or 60 sec, then the client gets a Time-Out exception after 5sec and the step fails
  + If the server takes less than 5sec to respond e.g. 1sec or 4 sec, then the client completes the execution in 1sec or 4sec respectively and moves to the next step.

## Conclusion
Please visit the HelloWorld repo for the `examples and usages`.