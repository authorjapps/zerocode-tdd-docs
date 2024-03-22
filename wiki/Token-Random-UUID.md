## Contents
   * [Flavors of UUID](#flavors-of-uuid)
   * [Usecases of UUID](#usecases-of-uuid)
   * [Using ${RANDOM.UUID}](#using-randomuuid)
   * [Using ${RANDOM.UUID.FIXED}](#using-randomuuidfixed)
   * [Conclusion](#conclusion)
   * [Available since](#available-since)

Flavors of UUID
===
UUID stands for a universally unique identifier.
e.g.
`8807947f-3082-47fa-a100-e7b1cfbc4c79`

Zerocode supports the following flavours of UUID
- RANDOM.UUID
  - Random for every scenario and random inside a scenario if used more than once
- RANDOM.UUID.FIXED
  - Random for every scenario and fixed inside a scenario if used more than once

Usecases of UUID
===
The chance that generated UUIDs will duplicate is almost zero. It is used when you dont want some other system to generate unique identifier for you(primary keys in tables for example),or when dealing with multiple components and afraid of generating non unique ids.UUID can solve above problems.


Using `${RANDOM.UUID}`
===
sample step:



***
```JavaScript

 {
      "name": "uuid",
      "url": "/posts",
      "operation": "POST",
      "request": {
        "headers": {
          "Content-Type": "application/json;charset=UTF-8"
        },
        "body": {
          "posts": [
            {
              "title": "title1",
              "body": "${RANDOM.UUID}",
              "userId": "${RANDOM.UUID}"
            },
            {
              "title": "title2",
              "body": "${RANDOM.UUID}",
              "userId": "${RANDOM.UUID}"
            }
          ]
        }
      },

      "assertions": {
        "status": 201

      }
    },
```
when `RANDOM.UUID` placeholders are replaced with uuids, we get:

```JavaScript
request:
{
  "headers" : {
    "Content-Type" : "application/json;charset=UTF-8"
  },
  "body" : {
    "posts" : [ {
      "title" : "title1",
      "body" : "a6239590-1f0b-4335-b2c7-946c97a2c2fd",
      "userId" : "54858c89-b884-4f8d-96fe-6e1564c3e18d"
    }, {
      "title" : "title2",
      "body" : "31fe7508-5564-466a-a6d1-1ae78f06e445",
      "userId" : "1a510358-654c-4005-88c6-7adbee901e44"
    } ]
  }
}


```

Using `${RANDOM.UUID.FIXED}`
===
sample step:

***

```JavaScript
 {
      "name": "uuid_fixed",
      "url": "/posts",
      "operation": "POST",
      "request": {
        "headers": {
          "Content-Type": "application/json;charset=UTF-8"
        },
        "body": {
          "posts": [
            {
              "title": "title3",
              "body": "${RANDOM.UUID.FIXED}",
              "userId": "${RANDOM.UUID.FIXED}"
            },
            {
              "title": "title4",
              "body": "${RANDOM.UUID.FIXED}",
              "userId": "${RANDOM.UUID.FIXED}"
            }
          ]
        }
      },
      "assertions": {
        "status": 201
      }
    },

```
After `RANDOM.UUID.FIXED` are replaced with fixed uuids, we get  

```JavaScript
request:
{
  "headers" : {
    "Content-Type" : "application/json;charset=UTF-8"
  },
  "body" : {
    "posts" : [ {
      "title" : "title3",
      "body" : "8807947f-3082-47fa-a100-e7b1cfbc4c79",
      "userId" : "8807947f-3082-47fa-a100-e7b1cfbc4c79"
    }, {
      "title" : "title4",
      "body" : "8807947f-3082-47fa-a100-e7b1cfbc4c79",
      "userId" : "8807947f-3082-47fa-a100-e7b1cfbc4c79"
    } ]
  }
}

```
As we can see in case of fixed one, all uuids are the same within the step.

Conclusion
===
Visit the Zerocode "Hello World" repo for a [UUID working example and usage(click)](https://github.com/authorjapps/zerocode-hello-world/blob/master/src/test/resources/helloworld_uuid/hello_world_uuid.json)


Available since
===
V 1.3.19
