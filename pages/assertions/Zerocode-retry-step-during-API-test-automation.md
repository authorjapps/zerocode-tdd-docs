## Introduction
Retry mechanism is particularly useful when the step fails for the first time and there is a chance to get the API response as expected in the subsequent invocations which could make the test pass.

This happens mostly during a async call or an CDC update in the earlier steps which could slightly delay the persistence of the state changes into the server/DB.
> where,  
> CDC = Change Data Capture

## Retry Example
+ YAML
```YAML
url: api/v1/customers/123
method: GET
request:
  headers:
    Content-Type: application/json
retry:
  max: 3
  delay: 1000
verify:
  status: 200
...
```

+ JSON
```JSON
{
  "url": "api/v1/customers/123",
  "method": "GET",
  "request": {
    "headers": {
      "Content-Type": "application/json"
    }
  },
  "retry": {
    "max": 3,
    "delay": 1000
  },
  "verify": {
    "status": 200
...
```

In the DSL above Zerocode framework will retry invoking the API only if the server does not respond with status of 200

When the server responds with status 200, there will be no more retries/invocation

## Reports
CSV or HTML report will have only one entry of this retry step i.e. the final outcome of the step after all retries exhausted

## Logs
`target/logs` will have all the retry logs and request/response payload