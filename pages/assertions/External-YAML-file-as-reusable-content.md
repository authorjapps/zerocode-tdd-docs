The following example shows how to **reuse** an external YAML file (or an external YAML step) as re-usable content in Zerocode test cases, using the new `${YAML.FILE:<path>}` token.

This mirrors the already existing `${JSON.FILE:<path>}` token(see: [External JSON file content](https://github.com/authorjapps/zerocode/wiki/External-JSON-file-as-reusable-content)) but lets you author the re-usable content(or even a whole step) in YAML instead of JSON.

Raised via [Issue #492](https://github.com/authorjapps/zerocode/issues/492) and delivered via [PR #505](https://github.com/authorjapps/zerocode/pull/505).

**Dependency:**
```xml
<dependency>
    <groupId>org.jsmart</groupId>
    <artifactId>zerocode-tdd</artifactId>
    <version>check-latest-in-readme-github</version>
</dependency>
```

## Scenario This Feature Can Be Used
- You already have (or prefer to write) a step, a request body, or an expected response body in YAML, and want to reuse it across one or more test scenarios(JSON or YAML) instead of duplicating it.
- You are gradually moving your test suite from JSON to YAML and want both formats to interoperate - a JSON scenario can pull in a YAML step, and vice versa.

## Solution Example - Reusing a whole Step written in YAML

Main scenario file - `scenario_get_api_step_test.yml`
```yaml
---
scenarioName: "GIVEN-the GitHub REST end point, WHEN-I invoke GET, THEN-I will receive the 200 status with body"
steps:
  - stepFile: ${YAML.FILE:unit_test_files/yaml/scenario_get_api_step.yml}
```

Re-usable step file - `scenario_get_api_step.yml`
```yaml
name: "get_user_details"
url: "/users/googlebot"
operation: "GET"
request:
  -
verify:
  status: 200
  body:
    login: "googlebot"
    type: "User"
```

> `verify` above is just an alias of `assertions` - both are supported, use whichever reads better for your team.

## Reusing just a request/response body from a YAML file
The same `${YAML.FILE:<path>}` token also works for any leaf node inside a step, e.g. to pull in a re-usable request or expected-response body from a separate `.yaml`/`.yml` file - exactly the way `${JSON.FILE:<path>}` already works:

```javaScript
{
    "scenarioName": "POST API - Yaml file as request/response content - Reuse body",
    "steps": [
        {
            "name": "create_emp",
            "url": "/api/v1/employees",
            "operation": "POST",
            "request": {
                "body" : "${YAML.FILE:reusable_content/request/request_body.yaml}"
            },
            "assertions": {
                "status": 201
            }
        }
    ]
}
```

where `request_body.yaml`:
```yaml
name: "Emma"
surName: "Norton"
```

## Run Log / Where to find the tests
This feature is covered by the below unit tests in the Zerocode repo itself:
- Test runner: [`YamlUnitTest.java`](https://github.com/authorjapps/zerocode/blob/master/core/src/test/java/org/jsmart/zerocode/core/yaml/YamlUnitTest.java)
- Main scenario file: [`scenario_get_api_step_test.yml`](https://github.com/authorjapps/zerocode/blob/master/core/src/test/resources/unit_test_files/yaml/scenario_get_api_step_test.yml)
- Re-usable step file: [`scenario_get_api_step.yml`](https://github.com/authorjapps/zerocode/blob/master/core/src/test/resources/unit_test_files/yaml/scenario_get_api_step.yml)

## Available since
`V 1.4.x` - see the [releases page](https://github.com/authorjapps/zerocode/releases) for the exact version that includes PR #505.

## Related
- [External JSON file content](https://github.com/authorjapps/zerocode/wiki/External-JSON-file-as-reusable-content)
- [Reusing step via step file(s)](https://github.com/authorjapps/zerocode/wiki/Reusing-Single-and-Multiple-Step-Files)
