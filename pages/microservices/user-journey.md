<br/>

> _Visit here for a quick introduction to [What is Declarative Testing And Zerocode](https://github.com/authorjapps/zerocode/wiki/What-is-Zerocode-testing)_

# Quick Overview

In _Declarative Testing_, the framework here does the job for us behind the scene i.e.

- Making Http calls to the target end-point, with our request payload
- Receiving the server response into the test case
- Doing the result comparison of the **actual** vs **expected** response for our "_assertions_".
  - Here we can choose to skip the fields we do not need to assert
  - Or keep some fields as `not null` if server response is in-deterministic
  - We keep the payload as JSON structure as it is or we have the option to use the flat key-value assertions using the JSON Path
  - We have the option of comparing the results in [LINIENT or STRICT mode](https://github.com/authorjapps/zerocode/wiki/Strict-Mode-Payload-Comparison)

_It saves us from the major hassles of writing any code to do the above repetitive tasks._

Let's see how it is applied to a user journey.

## USER JOURNEY - Acceptance Criteria(ACs)

- AC1

```
GIVEN- The Create API POST:"/api/v1/employees"
WHEN I invoke the POST operation with a "employee" payload
and content-type as "application/json"
THEN I will create a new employee
AND validate the 201(created) status
and verify the response has only the employeeId(strict matching).
```

- AC2

```
GIVEN- The Get API GET:"/api/v1/employees/{employeeId}"
WHEN I invoke the GET operation with max 5 retries with 1sec gap
THEN I will fetch the employee details
AND validate the status as 200(OK) along with
AND response has the expected payload with the required fields(lenient matching).
```

To write a test-case for the above CRUD operation scenario is quite easy using [Zerocode](https://github.com/authorjapps/zerocode/blob/master/README.md#hello-world), just our IDE's **JSON editor is easy enough** to hook these rwo steps/ACs. For instance, `POST` and `GET` step would look like below(simple and clean).

> _Hosts and ports are externalized to a properties file for env switching_

And at the same time we **don't have to search** for or think hard of any **syntaxes** to do the job. That means, we are ready with a BDD test scenario quickly with these simple JSON steps(see below).

> The advantage here is the tests are instantly readable to any stakeholder

View the JSON or YAML based test-scenario below.

### Using JSON

<details>
<summary>JSON (Click to expand)</summary>
<p>

```javaScript
{
    "scenarioName": "Validate the POST and GET employee API",
    "steps": [
        {
            "name": "create_emp",
            "url": "/api/v1/employees",
            "method": "POST",
            "request": {
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": {
                    "id": "DEP-CROY-9001",
                    "name": "Oliver",
                    "postcode": "EC2 9XY"
                }
            },
            "retry": {
                "max": 3, //<--- configure to your "retry" requirement or skip it
                "delay": 1000
             },
            "verify": {
                "status": 201,
                "body": {
                    "id": "DEP-CROY-9001"
                }
            },
            "verifyMode": "STRICT"
        },
        {
            "name": "get_emp",
            "url": "/api/v1/employees/${$.create_emp.response.body.id}",
            "method": "GET",
            "retry": {
                "max": 5,
                "delay": 1000
            },
            "request": {
                "headers": {
                    "Content-Type": "application/json"
                }
            },
            "verify": {
                "status": 200,
                "body": {
                    "id": "${$.create_emp.response.body.id}",
                    "deptCode": "DEP.ASY"
                }
            },
            "verifyMode": "LENIENT"
        }
    ]
}
```

</p>
</details>

### Using YAML

<details>
<summary>YAML (Click to expand)</summary>
<p>

#### Or you can use YAML DSL

- YAML DSL

```yaml
---
scenarioName: Validate the POST and GET employee API
steps:
  - name: create_emp
    url: "/api/v1/employees"
    method: POST
    retry:
      max: 3
      delay: 1000
    request:
      headers:
        Content-Type: application/json
      body:
        id: DEP-CROY-9001
        name: Oliver
        postcode: EC2 9XY
    verify:
      status: 201
      body:
        id: DEP-CROY-9001
    verifyMode: STRICT
  - name: get_emp
    url: "/api/v1/employees/${$.create_emp.response.body.id}"
    method: GET
    retry:
      max: 5
      delay: 1000
    request:
      headers:
        Content-Type: application/json
    verify:
      status: 200
      body:
        id: "${$.create_emp.response.body.id}"
        deptCode: DEP.ASY
    verifyMode: LENIENT
```

</p>
</details>

That's it, done. We are ready to run the above scenario.

The hosts and ports in the `url` fields are externalized as usual(explained below).

---

Then we stick the above json/yml file to a JUnit runner and run. We can point to any `host` and `port` in the `Runner`. See the sample below.

```java
@TargetEnv("application_host.properties")
@RunWith(ZeroCodeUnitRunner.class)
public class JustHelloWorldTest {

    @Test
    @Scenario("helloworld/user_crud_journey_test.json")
    public void testGet() throws Exception {
       // No code is needed here.
    }
}
```

the `application_host.properties` looks as below:

```
web.application.endpoint.host=https://hbc.banking.co.local.uk
web.application.endpoint.port=443
web.application.endpoint.context=
```

                                 Done. Happy days!

---

# If You Have Time To Read

_If you have little more time to read below, see what all hassles we escaped and how much time we saved !_

- No need to write pojos and builder for the domain objects(e.g. Employee here)
- No need of any serialization/deserialization
- No need of http client calls and read the response
- No need to `assertThat(expected, is(actual))` etc multiple times
- No need of any feature files and syntax searchings
- No need of English statements and grammars

## What We Did Not Have to Do(luckily)

JOURNEY1 :

- Step 1

```
~~Employee emp =~~
    ~~EmployeeBuilder.aNewInstance();~~
    ~~.name("Larry P")~~
    ~~.job("Full Time")~~
    ~~.build()~~
```

> Make the POST call

```
~~ObjectMapper objectMapper = ObjectMapperProvider.getInjectedObjectMapper();~~

~~HttpResponse<> postResponse =~~

~~aHttpClient.post("http://host:port/api/v1/persons")~~

  ~~.header("accept", "application/json")~~

  ~~.body(objectMapper.writeValueAsString(emp))~~

  ~~.execute();~~
```

> Assert the response

```
~~assertThat(postResponse.getStatusCode(), is(201))~~

~~assertThat(postResponse.getEntity().getId(), is(1001))~~
```

- Step 2

> Create an employee with updated payload

```
~~Employee empForUpdate = EmployeeBuilder.aNewInstance()~~
    ~~.name("Larry Page")~~
    ~~.job("Co-Founder")~~
    ~~.build();~~
```

> Make a PUT call

```
~~HttpResponse<Employee> putResponse =~~

~~aHttpClient.put("http://host:port/api/v1/persons/" + postResponse.getEntity().getId())~~

  ~~.header("accept", "application/json")~~

  ~~.body(objectMapper.writeValueAsString(empForUpdate))~~

  ~~.execute();~~

~~Employee empUpdated = response.getUser();~~
```

> Assert the response

```
~~assertThat(putResponse.getStatusCode(), is(200))~~

~~assertThat(empUpdated.getName(), is(empForUpdate.getName()))~~

~~assertThat(empUpdated.getJob(), is(empForUpdate.getJob()))~~
```

- Step 3

```
> Make the GET call

~~HttpResponse<Employee> response =~~

~~aHttpClient.get("http://host:port/api/v1/persons/" + postResponse.getEntity().getId())~~

  ~~.header("accept", "application/json")~~

  ~~.execute();~~

~~Employee empFetched = response.getEmployee();~~
```

> Assert the response

```
~~assertThat(response.getStatusCode(), is(200))~~

~~assertThat(empFetched.getName(), is(empForUpdate.getName()))~~

~~assertThat(empFetched.getJob(), is(empForUpdate.getJob()))~~
```

Also, we escaped the **hard** way of doing things with special attention to English statements and grammars. See below:

---

This approach might take different `shapes and forms` for developers/test-engineers who need to spend lot of time agreeing on the semantics rather than spending time in creating actual executable test-scenarios.

**e.g.**

```
~~GIVEN- the REST api POST end point,~~ <br/>
~~WHEN- I invoke the API with a payload,~~ <br/>
~~THEN- I will receive 201(Created) status with a newly created ID and assert the response~~ <br/>

or

~~GIVEN- the REST url and the method POST,~~ <br/>
~~WHEN- I invoke the API with a body,~~ <br/>
~~THEN- I will receive 201(Created) status with newly created ID~~ <br/>
~~AND assert the response~~ <br/>
```

or

```
~~GIVEN- the REST url /api/v1/persons/ ~~ <br/>
~~AND the http method POST ~~ <br/>
~~WHEN- I invoke the API using a HTTP client and send the body,~~ <br/>
~~THEN- I will receive 200(OK) status with body~~ <br/>
~~AND assert the response~~ <br/>
```

> and so on...

**Note**- Too much is going on the above around an `user journey`, in terms of writing correct sentences or **nearly** correct sentences/grammars, too many `assertThat`s to come up with a test scenario.

> And imagine the maintenance overhead and difficulty in tracing the steps, when we have more number of steps in an user journey !

<br/>

:::Note:::

It might(arguably) make sense for the **BAs**(Business Analysts) or non-technology folks while creating the stories and defining the entry and exit criteria of the tickets for a business scenario or User-Journey. But the techincal folks simply picking these statements and trying hard syntactically to fit these into the executable scenarios seems like bit too much of a wastage of time and maintenance overhead.

But we should choose the `tools`, `technologies` and `solutions` which best fits to our project and situation and really helps us solving the testing challenges.

## See This in Action(HelloWorld):

The simplified HelloWorld projects are in GitHub repo to clone and run locally

- Simple HelloWorld repo : https://github.com/authorjapps/zerocode-hello-world
