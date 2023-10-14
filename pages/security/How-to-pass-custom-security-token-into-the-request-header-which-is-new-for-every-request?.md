#### How to pass custom security token into the header which is new for every request?

+ This is particularly useful for
  + JWT token
  + SAML token
  + Or any OAuth token which are dynamic every time

> > Hi @authorjapps . I am trying to use the zerocode to automate the integration testing. I have a question: How can i get the the gwt token and pass it dynamically to set it in the header when i execute the request.. i tried hard coded token the test works, but only till the token is valid.. i have the code to get the token,... my problem is how can i pass it every time i run the test... any information resource of example will be very helpful.    

@Sidharath, Understood. It's easy. Actually there are many ways you can do it. 
This one below should help and simpler approach. 
_(Also there is another approach to abstract this implementation to the HttpClient level, but let's take a simpler approach for now)_
```java
{
    "scenarioName": "Generate new Security Token and pass as custom header",
    "steps": [
        {
            "name": "token_brewer",
            "url": "org.jsmart.zerocode.zerocodejavaexec.utils.TokenGenerator",
            "operation": "generateNew",
            "request": "any_param_or_empty",
            "assertions": {
                "newToken" : "$NOT.NULL"
            }
        },
        {
            "name": "get_user_with_new_token",
            "url": "/users/octocat",
            "operation": "GET",
            "request": {
                "headers":{
                    "security_token":"${$.token_brewer.response.newToken}"
                }
            },
            "assertions": {
                "status": 200,
                "body": {
                    "login" : "octocat"
                }
            }
        }

    ]
}

```

- The working example is in `hello-world repo` to clone and execute locally : [JUnit Test code](https://github.com/authorjapps/zerocode-hello-world/blob/master/src/test/java/org/jsmart/zerocode/testhelp/tests/helloworldjavaexec/SecurityHeaderTokenDynamicTest.java)
- See the token generator code(you have to fit your logic here): [TokenGenerator.java](https://github.com/authorjapps/zerocode-hello-world/blob/master/src/main/java/org/jsmart/zerocode/zerocodejavaexec/utils/TokenGenerator.java)

After you execute the test, you should see that the token is new for every request; look at the

> "newToken" : "2018-11-24T10-57-21-158"

in the test log below.

```
------ BDD: Scenario:Generate new Security Token and pass as custom header -------


--------- TEST-STEP-CORRELATION-ID: d175f3a7-055a-4e9f-8711-d4b0b286f98b ---------
*requestTimeStamp:2018-11-24T10:57:21.145
step:token_brewer
url:org.jsmart.zerocode.zerocodejavaexec.utils.TokenGenerator
method:generateNew
request:
"any_param_or_empty" 
--------- TEST-STEP-CORRELATION-ID: d175f3a7-055a-4e9f-8711-d4b0b286f98b ---------
Response:
{
  "newToken" : "2018-11-24T10-57-21-158"
}
*responseTimeStamp:2018-11-24T10:57:21.162 
*Response delay:17.0 milli-secs 
---------> Assertion: <----------
{
  "newToken" : "$NOT.NULL"
} 
-done-


--------- TEST-STEP-CORRELATION-ID: 73fe4b9a-f0ce-4479-a5e0-8fe4bb99828f ---------
*requestTimeStamp:2018-11-24T10:57:21.221
step:get_user_with_new_token
url:https://api.github.com:443/users/octocat
method:GET
request:
{
  "headers" : {
    "security_token" : "2018-11-24T10-57-21-158"
  }
} 
--------- TEST-STEP-CORRELATION-ID: 73fe4b9a-f0ce-4479-a5e0-8fe4bb99828f ---------
Response:
{
  "status" : 200,
  "headers" : {
    "Date" : [ "Sat, 24 Nov 2018 10:57:22 GMT" ],
    "Status" : [ "200 OK" ]
  },
  "body" : {
    "login" : "octocat",
    "id" : 583231
  }
}
*responseTimeStamp:2018-11-24T10:57:22.206 
*Response delay:985.0 milli-secs 
---------> Assertion: <----------
{
  "status" : 200,
  "body" : {
    "login" : "octocat"
  }
} 
-done-


```