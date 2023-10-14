Testing an API should always be easy irrespective of the language API is written with. 

**ZeroCode framework make sure that** you spend zero focus on the tools and technology for structuring or building your test strategy and rather ZeroCode enables you and your team to spend 100% of your time in thinking about application test scenarios, various use cases/functionalities so that you get best out of you project delivery.

With this point in mind, if you are building your API in Kotlin and you want to write integration tests, Performance test, Load Test etc for your API then, as I mentioned above, it's all very easy.

This wiki page, details out high level pointers with examples, **how easy is to test with ZeroCode, an API written in Kotlin with Spring Boot**. Complete Project code along with Kotlin general concepts are given below.

Let's say we have an API which exposes three REST end points written in Kotlin

**1) GET** - Fetch All runners profile

**2) POST** - Create runner profile

**3) PATCh**- update (few attributes) runner profile

The obvious thing to test any API is to validate the API contract for happy and negative scenarios and assert the expected response in both ( happy and negative ) the cases.

**Steps to write ZeroCode Test scripts for Kotlin API.**

**Step 1:-**

	Write a Kotlin class for a functionality you want to test.
**Step 2:-**

	Write the test scripts in simple json steps

That's all and DONE. Relax!!

**Let's start with writing our first test for 1st API end point**

**1) GET end point** - Fetch All runners profile.

**Step 1:-** Create a Kotlin class named **"TestGetOperations.kt"**

If you notice, there is no code actually in your @Test method!! Making your life easy.

```Kotlin
@TargetEnv("application_host.properties")
@RunWith(ZeroCodeUnitRunner::class)
class TestGetOperations {
	
	 @Test
	 @JsonTestCase("integration_tests/get/get_all_runners.json")
	 fun test_get_all_runners() {
	 }
	
}
```

**Step 2:-** Write the test scripts in simple json steps. Create a test script file named **"get_all_runners.json"**

If you notice below, it is simple json steps, so irrespective of language you can very well write your test cases in simplest ever way possible.

```json
{
    "scenarioName": "Get All Runners @@Neeraj",
    "steps": [
        {
            "name": "get_all_runners",
            "url": "/parkrun/runners/",
            "operation": "GET",
            "request": {
            },
            "assertions": {
                "status": 200,
                "body": {
                    "_embedded.runners.SIZE": "$GT.0",
                    "_embedded.runners[0]._links.self.href": "$NOT.NULL"
                }
            }
        }
    ]
}

```

**That's it and ALL DONE.**

I am sure, it will now be very easy for you to write test cases on your own for other end points I listed  earlier.

2) POST - Create runner profile
3) PATCh - update (few attributes) runner profile

The complete project code along with detailed explanation can be referred here 
[Kotlin-Spring Boot API](https://github.com/BeTheCodeWithYou/SpringBoot-Kotlin)

Detailed post about Kotlin general Concepts can be read here [Kotlin Concepts and Spring Boot Kotlin API](https://dzone.com/articles/kotlin-spring-bootspring-data-h2-db-rest-api)