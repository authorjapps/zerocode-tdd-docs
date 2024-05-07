# Flavors of Random Number

We can use `${RANDOM.NUMBER}` or `${RANDOM.NUMBER.FIXED}` depending on our business usecases

# Usecases of Random Number

Use case1: 
`${RANDOM.NUMBER}`

If we want the an ID or any field or part of a field to be a random value inside a scenario, and this value is further `random` if used more than once inside that scenario

Use case2:
`${RANDOM.NUMBER.FIXED}` 

If we want an ID or any field or part of a field to be a random value inside a scenario, and this value is `fixed` or same, if used more than once inside that scenario

# Using `${RANDOM.NUMBER}`

```JavaScript
"steps":[{
      "name": "mytest",
      "url": "/orders",
      "operation": "POST",
      "request": {
        "headers": {
          "Content-Type": "application/json;charset=UTF-8"
        },
        "body": {
          "orders": [
            {
              "orderId": "${RANDOM.NUMBER}",
              "amount": 5,
              "productName": "product1"
            },
            {
              "orderId": "${RANDOM.NUMBER}",
              "amount": 10,
              "productName": "product2"
            }
          ]
        }
      },
      "assertions": {
        "status": 200

      }
    }]
```

after replacing RANDOM.NUMBER placeholders,we get the following request:
```JavaScript
request:
{
  "headers" : {
    "Content-Type" : "application/json;charset=UTF-8"
  },
  "body" : {
    "orders" : [ {
      "orderId" : "6432473468588586502",
      "amount" : 5,
      "productName" : "product1"
    }, {
      "orderId" : "6249704932535842532",
      "amount" : 10,
      "productName" : "product2"
    } ]
  }
} 
```

Every instance of RANDOM.NUMBER is unique


#  Using `${RANDOM.NUMBER.FIXED}`

Sample step:
```
 {
      "name": "mytest",
      "url": "/orders",
      "operation": "POST",
      "request": {
        "headers": {
          "Content-Type": "application/json;charset=UTF-8"
        },
        "body": {
          "orders": [
            {
              "orderId": "${RANDOM.NUMBER.FIXED}",
              "amount": 5,
              "productName": "product1"
            },
            {
              "orderId": "${RANDOM.NUMBER.FIXED}",
              "amount": 10,
              "productName": "product2"
            }
          ]
        }
      },

      "retry":{
        "max": 2,
        "delay": 500
      },

      "assertions": {
        "status": 200

      }
    },
```

after `RANDOM.NUMBER.FIXED` placeholder are replaced we get the following request:

```
request:
{
  "headers" : {
    "Content-Type" : "application/json;charset=UTF-8"
  },
  "body" : {
    "orders" : [ {
      "orderId" : "6598115625161692428",
      "amount" : 5,
      "productName" : "product1"
    }, {
      "orderId" : "6598115625161692428",
      "amount" : 10,
      "productName" : "product2"
    } ]
  }
} 
```

`RANDOM.NUMBER.FIXED` placeholders get the `same` random number value within the step


# Using `${RANDOM.NUMBER:10}`

We can limit random numbers' length. In this case random numbers length(digit count) would be 10. 

# Using `${GLOBAL.RANDOM.NUMBER}`

In this case all the `${GLOBAL.RANDOM.NUMBER}` random numbers are replaced with a unique number for the entire test session until JVM exits.
This can be used in the scenarios or steps or the properties files where you need the randomness of the ID for the entire test suite run  
e.g. for an entire CI build job run.

Available since `V 1.3.31`

# Usage Example

Please visit the [Hello World Example(Click this)](https://github.com/sparrowV/zerocode-hello-world/blob/master/src/test/resources/helloworld_random_number/hello_world_random_numbers.json) to see the usages.

# Available since

`V 1.3.19`
