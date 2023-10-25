# Mocking

Mocking means simulating the behaviour of external dependencies and components such as APIs, services, or databases so that they can be tested in isolation from the real implementations. In Zerocode, mocking lets you create mock endpoints or services that mimic the responses and behaviours of the actual components without the need to interact with the real systems. This is can be useful in various testing scenarios, particularly in unit and integration testing to ensure that your application functions correctly without relying on external services.

## Test Scenario Using WireMock and Zerocode

The provided JSON configuration from the Zerocode Hello World API defines a test scenario that involves setting up mocks using WireMock and then testing endpoints using Zerocode. 

~~~
{
    "scenarioName": "Will Mock some End Points via WireMock and Test the end points using Zerocode",
    "steps": [
        {
            "name": "setup_mocks",
            "url": "/$MOCK",
            "method": "$USE.WIREMOCK",
            "request": {
                "mocks": [
                    {
                        "name": "mocking_a_GET_endpoint",
                        "operation": "GET",
                        "url": "/api/v1/amazon/customers/UK001",
                        "response": {
                            "status": 200,
                            "headers": {
                                "Accept": "application/json"
                            },
                            "body": {
                                "id": "UK001",
                                "name": "Adam Smith",
                                "Age": "33"
                            }
                        }
                    },
                    {
                        "name": "mocking_a_GET_endpoint_with_headers",
                        "operation": "GET",
                        "url": "/api/v1/amazon/customers/cust-007",
                        "request": {
                            "headers": {
                                "api_key": "key-01-01",
                                "api_secret": "secret-01-01"
                            }
                        },
                        "response": {
                            "status": 200,
                            "body": {
                                "id": "cust-007",
                                "type": "Premium"
                            }
                        }
                    }
                ]
            },
            "verify": {
                "status": 200
            }
        },
        //------------- All mocking done at this point via WireMock ---------------

        //------------- Let's verify the end points by writing the following small tests ------------
        {
            "name": "actual_test_verify_get_customer",
            "url": "/api/v1/amazon/customers/UK001",
            "method": "GET",
            "request": {
            },
            "verify": {
                "status": 200
            }
        },
        {
            "name": "verify_get_customer_with_headers",
            "url": "/api/v1/amazon/customers/cust-007",
            "method": "GET",
            "request": {
                "headers": {
                    "api_key": "key-01-01", //<--- Please try with a wrong key. The test should fail.
                    "api_secret": "secret-01-01"
                }
            },
            "verify": {
                "status": 200,
                "body": {
                    "id": "cust-007",
                    "type": "Premium"
                }
            }
        },
        {
            "name": "verify_get_customer_without_headers",
            "url": "/api/v1/amazon/customers/cust-007",
            "method": "GET",
            "request": {
                "headers": {
                    //"api_key": "key-01-01", //<--- Please do not put a header, you should get 404.
                    "api_secret": "secret-01-01"
                }
            },
            "verify": {
                "status" : 404,
                "rawBody" : "$CONTAINS.STRING:Request was not matched"
            }
        }

    ]
}
~~~

[mock_via_wiremock_then_test_the_end_point.json](https://github.com/authorjapps/zerocode-hello-world/blob/master/src/test/resources/wiremock_tests/mock_via_wiremock_then_test_the_end_point.json)

1. Setup Mocks
   - The test scenario starts by setting up mock endpoints using WireMock that simulate responses for certain requests. 
   - The first mock, named "mocking_a_GET_endpoint," simulates a GET request to the URL /api/v1/amazon/customers/UK001. It responds with a JSON object containing customer information and returns a 200 status code.
   - The second mock, "mocking_a_GET_endpoint_with_headers," simulates a GET request to the URL /api/v1/amazon/customers/cust-007 with specific headers (api_key and api_secret). It responds with a different JSON object and a 200 status code.
2. Verification of Mocks
   - After setting up the mocks, the scenario proceeds to verify the behavior of these mock endpoints. The first two verification steps perform GET requests to the mock endpoints to check if the expected responses are received. The third verification step tests a case where a header is intentionally omitted.
3. Tests
   - The "actual_test_verify_get_customer" step performs a GET request to the /api/v1/amazon/customers/UK001 endpoint, which was mocked earlier. This test aims to verify that the mock response matches the expected status code (200).
   - The "verify_get_customer_with_headers" step tests a GET request to the /api/v1/amazon/customers/cust-007 endpoint with specific headers (api_key and api_secret). The test expects a 200 status code and a specific JSON response. If the headers don't match, the test should fail.
   - The "verify_get_customer_without_headers" step tests a GET request to the same endpoint but intentionally omits the api_key header. The test expects a 404 status code and a response containing the string "Request was not matched." This is used to verify that WireMock correctly handles unmatched requests.

## REST end point mocking

An example Zerocode mock configuration which is a mocking of a simple REST endpoint for a list of products:

- URL example: https://api.example.com/products
- HTTP Method: 'GET'

~~~
{
  "name": "Mock_Get_Products",
  "url": "/products",
  "method": "GET",
  "request": {
    // You can define request parameters here if needed
  },
  "response": {
    "status": 200,
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "products": [
        {
          "id": "1",
          "name": "Product A",
          "price": 19.99
        },
        {
          "id": "2",
          "name": "Product B",
          "price": 29.99
        }
        // Additional product items can be added here
      ]
    }
  }
}
~~~

When you use Zerocode to run the tests, any GET request to /products will receive the mock response defined in the above configuration. This allows you to test your application's behavior as if it were interacting with the real endpoint, but in a controlled and predictable manner. This example can be extended to include other scenarios such as error responses, timeouts, or different sets of data.

## If the calling client doesn't match the mocked end point

WireMock provides detailed logs to highlight if the calling client doesn't match the mocked endpoint. When a client request doesn't match the expected request as defined in the WireMock stub (mock), WireMock will give a log entry similar to the following:

~~~
Request was not matched:
{
  "method" : "POST",
  "url" : "/api/v1/resource",
  "headers" : {
    "Content-Type" : "application/json"
  },
  "body" : "..."
}
~~~