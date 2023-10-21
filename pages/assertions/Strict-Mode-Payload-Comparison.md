## Introduction
Strict mode Payload comparison makes strict comparison of the expected payload with the actual response payload. 

The default mode of comparison is `LENIENT` i.e. the actual response can have more properties than the expected payload and the test will still pass. 

In `STRICT` mode, **the response is not allowed to have extra properties** as compared to the expected payload. It should always find EXACT match else the test will fail. 


## Strict comparison DSL flag
To use `STRICT` comparison you just need to add the flag `verifyMode` to the test case

For example, if we have an `GET` API `/api/v1/search/persons` which returns the Http status as `200` and the below response payload,
```java
payLoad:
{
   "applicationId": "P010203"
   "visaType": "Tier2"
}
```
then we can write the automation Test-case as below.

```yaml
---
scenarioName: Validate a GET API
steps:
-     
  ...
  verifyMode: STRICT
  verify:
    body: 
       applicationId:P010203
       visaType: Tier2
      
``` 

## Using STRICT mode for Payload verification
The test will pass only if the actual response exactly contains the expected fields, if there are extra properties in the actual response, then you will receive the following message:
```java
Assertion jsonPath [extra property name]' with actual value 'Unexpected: [extra property name]' did not match the expected value
```

## Using LENIENT mode for Payload verification
The test will pass even if the actual response contains the expected fields plus any extra fields. 
```yaml
---
scenarioName: Validate a GET API
steps:
-     
  ...
  verifyMode: LENIENT
  verify:
    body: 
       visaType: Tier2
      
``` 

If there are no  properties in the actual response matching the expected response, then you will receive the following message:
```java
Assertion jsonPath [property name] with actual value '[property name]' did not match the expected value '[property name]'
```


## Conclusion
`STRICT` mode can be very useful in testing use cases where the application wants to restrict the response only to the expected fields both qualitatively as well as quantitatively.

`LENIENT` mode can be very useful in testing use cases where the application wants to verify the expected response only but not concerned about the extra fields present in the actual response.
