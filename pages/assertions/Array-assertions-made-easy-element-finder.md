# Array And Element Assertions

## Asserting an array response is easy and intuitive
e.g. if API `GET` response is as below,
```
Url: "/api/v1/screening/persons",
Operation: "GET",
Response: 
{
                "status": 200,
                "body": {
                    "type" : "HIGH-VALUE",
                    "persons":[
                        {
                            "id": "120.100.80.03",
                            "name": "Dan"
                        },
                        {
                            "id": "120.100.80.11",
                            "name": "Mike"
                        }
                    ]
                }
}
```
Then, you can simply assert by keeping the JSON structure as it is like below,
Note- Order of the fields(not the array elements) doesn't matter, you can keep them in any order

```
"verify" : {
                "status": 200,
                "body": {
                    "type" : "HIGH-VALUE",
                    "persons":[
                        {
                            "id": "120.100.80.03",
                            "name": "Dan"
                        },
                        {
                            "id": "120.100.80.11",
                            "name": "Mike"
                        }
                    ]
                }
}
```

Also, you can skip some fields you don't want to assert, e.g. let's skip the `name` field from both the elements of the array,
```
"verify" : {
                "status": 200,
                "body": {
                    "type" : "HIGH-VALUE",
                    "persons":[
                        {
                            "id": "120.100.80.03"
                        },
                        {
                            "id": "120.100.80.11"
                        }
                    ]
                }
}
```

-or-

we want to assert that the 2nd element has `name` called `Mike`, it's quite easy like below,

```
"verify" : {
                "status": 200,
                "body": {
                    "persons[1].name": "Mike"
                }
}
```

## Array size assertions can be done as easily as below,
e.g. your response has the below array structure:
```
e.g. http response body:
{
                "results": [
                    {
                        "id": 1,
                        "name": "Elon Musk"
                    },
                    {
                        "id": 2,
                        "name": "Jeff Bezos"
                    }
                ]
}
```

Then you can assert the array size in one of the many ways as needed,

```javaScript
        {
	    ...
            "verify": {
                "results.SIZE": 2
            }
        }

-or-
        {
	    ...
            "verify": {
                "results.SIZE": "$GT.1"
            }
        }
-or-
        {
	    ...
            "verify": {
                "results.SIZE": "$LT.3"
            }
        }
etc
```

See more SIZE examples [here](https://github.com/authorjapps/zerocode-hello-world/blob/master/src/test/resources/helloworld_array_size/hello_world_array_size_assertions_test.json) in the [hello-world repo](https://github.com/authorjapps/zerocode-hello-world).

## Finding the occurrence of an element in the array response
Your use-case is, `Dan` and `Mike` might not be returned in the same order always, but they appear only once in the array.

To assert the above criteria, you can find the element using `JSON path` as below and verify 'Dan' was returned only once in the array and 'Emma' was present in the 'persons' array.
(See more JSON paths [here](https://github.com/json-path/JsonPath))
```
{
    "scenarioName": "Scenario- Get all person details",
    "steps": [
        {
            "name": "get_screening_details",
            "url": "/api/v1/screening/persons",
            "operation": "GET",
            "request": {
            },
            "verify": {
                "status": 200,
                "body": {
                    "type": "HIGH-VALUE",
                    "persons.SIZE": 2,
                    "persons[?(@.name=='Dan')].id.SIZE": 1,
                    "persons[?(@.name=='Mike')].id.SIZE": 1,
                    "persons[?(@.name=='Emma')].id.SIZE": 0
                }
            }
        }
    ]
}
```
What `persons[?(@.name=='Dan')].id.SIZE` means is-
> In the `persons` array check every element with the name `Dan`, if found pick the `id` of element and return all of the `id`s as an array, then do `.SIZE` on the `id`s array and return a count.

Note-
Even if a single matching element is found, the return is always an array type. Also if you do a `.length()` on the returned `id`s e.g. `persons[?(@.name=='Dan')].id.length()`, that's also an array i.e. `[2]` instead of simple `2`. That's how JSON path behaves. Hence `.SIZE` helps to achieve this.

Note-
For the array assertions, the index matters

Run [the above test case](https://github.com/authorjapps/consumer-contract-tests/blob/master/src/test/resources/contract_tests/screeningservice/find_element_in_array_via_jsonpath.json) from [here - testFindElementInArray()](https://github.com/authorjapps/consumer-contract-tests/blob/master/src/test/java/org/jsmart/zerocode/testhelp/tests/screeningservice/ScreeningServiceContractTest.java).
