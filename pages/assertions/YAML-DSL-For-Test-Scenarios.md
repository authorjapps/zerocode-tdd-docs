## Introduction
YAML is a human-readable format to configure/declare the outcome of a system. Many projects orchestrate their automation scenarios using YAML due to its easy readable/manageable format(e.g. Kubernetes/Docker provides declarative/configurable `.yml` files to manage the containers). Zerocode provides the super-easy way to achieve this using YAML.

## A Test Scenario in YAML DSL format
For example, if we have an `GET` API `/api/v1/search/persons` which returns the Http status as `200` and the below response payload,
```json
{
	"exactMatches": true,
	"name": "Mr Bean",
	"city": "Lon"
}
```
then we can write the automation Test-case as below.

```yaml
---
scenarioName: Validate a GET API
steps:
- name: find_match
  url: "/api/v1/search/persons"
  method: GET
  request:
    queryParams:
      city: Lon
      char: Funny
  verify:
    status: 200
    body:
      exactMatches: true
      name: Mr Bean
``` 

Where
+ `scenarioName`: Unique Free text string describing precisely what is being tested
+ `name`: Unique name of this step wrt this scenario
+ `url` : Relative URL path or FQDN of the API end points
+ `method` : An http method e.g. GET, POST, PUT, DELETE, HEAD etc
+ `request` : The request `payload` with http `headers` and/or `query parameters`
+ `queryParams` : Http query-parameters to pass and filter the result
+ `verify` : The expected http status and response payload
+ `status`: An http status code e.g. 200 is OK, 201 is CREATED etc.

## Using JayWay JSON Path Between The Steps
The JSON Path can be used to pick an element/field and reuse it in subsequent steps.

In the below test scenario, please have a look at the 2nd step's `verifications` block where various JSON Paths are used to pick/reuse the desired fields rather than hard-coded values.

```yaml
---
scenarioName: As simple GET request response Multi STep
steps:
- name: find_match
  url: "/api/v1/search/persons"
  method: GET
  request:
    queryParams:
      char: Funny
      city: Lon
  verify:
    status: 200
    body:
      exactMatches: true
      name: Mr Bean

- name: find_match2
  url: "/api/v1/search/persons"
  method: GET
  request:
    queryParams:
      char: Kids
      city: Lon
  verify:
    status: "$EQ.${$.find_match.response.status}"
    body:
      exactMatches: true
      name: "$CONTAINS.STRING:Bean"
      city: "${$.find_match2.request.queryParams.city}"
```

## Using Array in YAML
e.g. the API responds with a `person` payload with array of `addresses`.

> In an YAML file if the line starts with a `-` mark, then the containing element is an `array`.

```yaml
---
scenarioName: "A simple GET API Scenario" #comments allowed
steps:
- name: "find_match"
  url: "/api/v1/persons/p001"
  method: "GET"
  request:
    headers:
      x-api-key: "Ama-zing-key"
      x-api-secret: "Sec-ret-stuff"
  verify:
    status: 200 #comment - a http status code as int value
    body:
      exactMatches: true
      name: "Mr Bean"
      addresses:
      - type: "office"
        line1: "10 Random St"
      - type: "home"
        line1: "300 Random St"
```

Here `addresses` in the response `body` is a collection of individual address. 
The equivalent JSON looks like below.
```json
{
  "addresses": [
    {
      "type": "office",
      "line1": "10 Random St"
    },
    {
      "type": "home",
      "line1": "300 Random St"
    }
  ]
}
```

## Conclusion
We can find the examples in the HelloWorld GitHub repo under `yaml` folder.

## JSON to YAML and YAML to JSON

+ JSON to YAML : https://www.json2yaml.com/
+ YAML to JSON : https://codebeautify.org/yaml-to-json-xml-csv
+ JSON to YAML(another) : https://codebeautify.org/json-to-yaml
