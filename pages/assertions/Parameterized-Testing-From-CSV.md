# Zerocode CSV Parameterized Testing Guide
includes :
- valueSource (list of values)
- csvSource (rows and columns of data)
- external CSV files
- CSV with headers
- CSV without headers
- Named parameters (using with CSV field name)
- Index-based parameters (using with column index)

This guide will help you understand how to use CSV options to run data-driven tests efficiently.

CSV Examples:
https://github.com/authorjapps/zerocode/tree/master/http-testing-examples/src/test/resources/parameterized_csv

CSV Named Parameters example:
https://github.com/authorjapps/zerocode/blob/master/http-testing-examples/src/test/resources/parameterized_csv/hello_world_test_named_parameterized.json

## What is CSV Parameterized Testing?

CSV parameterized testing allows you to run the same test scenario multiple times with different sets of input data. 
Instead of creating separate test files for similar test cases, you can define one test scenario and provide multiple 
rows of test data in CSV format.

## Why Use CSV Parameterized Testing?

- **Reduce test maintenance**: Write one test scenario instead of many
- **Improve test coverage**: Easily test multiple data combinations
- **Better organization**: Keep test data separate from test logic
- **Scalability**: Add new test cases by simply adding CSV rows

# Introduction

During the user journey, if the scenario to be validated has a number of similar set of input,
then we can arrange them by `comma separated values` called CSV and fire the tests.

## Example Input Data

When the source is a simple list of CSV rows as below:

```java
//user - {0}   //name - {1}     //city - {2}         //id - {3}
"octocat,      The Octocat,     San Francisco,       583231",
"foo,          Foo Is My Name,  Bar City,            112233"
```

It looks like below in a table-format:

| user    |      name      |          city |     id |
| ------- | :------------: | ------------: | -----: |
| octocat |  The Octocat   | San Francisco | 583231 |
| foo     | Foo Is My Name |      Bar City | 112233 |

## Test Scenario

In `Zerocode` we arrange the test input like below:

```json
    "parameterized": {
        "csvSource":[
              "octocat,      The Octocat,     San Francisco,       583231",
              "foo,          Foo Is My Name,  Bar City,            112233"
        ]
    }
```

The full `test scenario` looks like below and runs twice for two(2) for the CSV rows i.e. once for each row.

```json
{
  "scenarioName": "Fetch and assert GitHub userIds by their userNames",
  "steps": [
    {
      "name": "get_user_details",
      "url": "/users/${0}",
      "operation": "GET",
      "request": {},
      "assertions": {
        "status": 200,
        "body": {
          "login": "${0}",
          "type": "User",
          "name": "${1}",
          "location": "${2}",
          "id": "$EQ.${3}"
        }
      }
    }
  ],
  "parameterized": {
    "csvSource": [
      "octocat,      The Octocat,     San Francisco,       583231",
      "foo,          Foo Is My Name,  Bar City,            112233"
    ]
  }
}
```

## Type Casting(optional)

While driving the tests from the set of input data, all input field are `String` by default. But if we want to use any of the fields as `(int)` or `(decimal)` or `(boolean)` etc, then we can cast them to the needed type as below.

```json
{
  "scenarioName": "Parameterized and type casted example - GET API",
  "steps": [
    {
      "name": "get_user_details",
      "url": "/users/${0}",
      "operation": "GET",
      "request": {},
      "assertions": {
        "status": 200,
        "body": {
          "login": "${0}",
          "type": "User",
          "name": "${1}",
          "location": "${2}",
          "id": "(int)${3}",
          "site_admin": "(boolean)${4}"
        }
      }
    }
  ],
  "parameterized": {
    "csvSource": [
      "octocat,      The Octocat,     San Francisco,       583231, false",
      "foo,          Foo Is My Name,  Bar City,            112233, true"
    ]
  }
}
```

## String With White Spaces

You can wrap it in single quotes in the CSV rows in order to accomodate white spaces or blank spaces:

e.g.

```
' HELLO STRING '

' The Octocat '
```

Sample:

```
{
    "csvSource": [
      "octocat,      '  The Octocat  ',     San Francisco,       583231, false",
      "foo,          Foo Is My Name,        Bar City,            112233, true"
    ]
  }
```

## Two Ways to Provide CSV Data

### 1. Inline CSV Data (Simple Approach)

Define your test data directly in the JSON test scenario file.

**Example: Testing GitHub Users API**

```json
{
  "scenarioName": "Parameterized and type casted example - GET API",
  "steps": [
    {
      "name": "get_user_details",
      "url": "/users/${0}",
      "operation": "GET",
      "request": {},
      "assertions": {
        "status": 200,
        "body": {
          "login": "${0}",
          "type": "User",
          "name": "${1}",
          "location": "${2}",
          "id": "(int)${3}",
          "site_admin": "(boolean)${4}"
        }
      }
    }
  ],
  "parameterized": {
    "csvSource": [
      "octocat, The Octocat, San Francisco, 583231, false",
      "foo, Foo Is My Name, Bar City, 112233, true"
    ]
  }
}
```

**How it works:**
- The test runs twice (once for each CSV row)
- `${0}` refers to the first column value (username)
- `${1}` refers to the second column value (name)
- `${2}` refers to the third column value (location)
- `${3}` refers to the fourth column value (id)
- `${4}` refers to the fifth column value (site_admin)

### 2. External CSV File (Scalable Approach)

For larger datasets, store your test data in a separate CSV file.

**Test Scenario File: `test_users.json`**

```json
{
  "scenarioName": "Test users from CSV file",
  "steps": [
    {
      "name": "get_user_details",
      "url": "/users/${0}",
      "operation": "GET",
      "request": {},
      "assertions": {
        "status": 200,
        "body": {
          "login": "${0}",
          "name": "${1}"
        }
      }
    }
  ],
  "parameterized": {
    "csvSource": "parameterized_csv/params.csv"
  }
}
```

**CSV File: `parameterized_csv/params.csv`**

```csv
username,fullname,location,id
octocat,The Octocat,San Francisco,583231
foo,Foo Is My Name,Bar City,112233
bar,Bar Lastname,New York,998877
```

**Note:** The first line is treated as a header and is automatically ignored during test execution.

## Understanding Column References

### Method 1: Index-Based References (Positional)

CSV columns are zero-indexed, meaning:
- First column: `${0}`
- Second column: `${1}`
- Third column: `${2}`
- And so on...

You can use these placeholders in:
- **URLs**: `/api/users/${0}`
- **Request headers**: `"Authorization": "Bearer ${1}"`
- **Request body**: `{"username": "${0}", "email": "${2}"}`
- **Assertions**: `"name": "${1}"`

### Method 2: Named Parameters (Header-Based)

**Test Scenario with Named Parameters:**
```json
{
    "scenarioName": "Named Parameterized Scenario for ---> ${0}",
    "steps": [
        {
            "name": "get_user_details",
            "url": "/users/${PARAM.USERID}",
            "method": "GET",
            "request": {
            },
            "assertions": {
                "status": 200,
                "body": {
                    "login" : "${PARAM.USERID}",
                    "type" : "User",
                    "name" : "${PARAM.USERNAME}",
                    "location" : "${PARAM.ADDRESS}",
                    "id" : "(int)${PARAM.USERNO}",
                    "site_admin" : "(boolean)${PARAM.ISADMIN}"
                }
            }
        }
    ],
    "parameterized": {
        "csvSource":[
            "|USERID|,     |USERNAME|,  |ADDRESS|,     |USERNO|,        |ISADMIN|",
            "octocat,      The Octocat, San Francisco, 583231,          false",
            "siddhagalaxy, Sidd,        UK,            33847730,        false"
        ]
    }
}
```

**Important Notes:**
- Named parameters only work with inline `csvSource` arrays, not with **external CSV files** yet (check future releases for this feature) 
- The first row of the CSV file **must be headers** (it's automatically skipped during test execution)
- For external CSV data, you must use index-based references: `${0}`, `${1}`, etc.

Visit this Issue for external CSV file support with named parameters:
https://github.com/authorjapps/zerocode/issues/743


## Type Casting (Optional but Powerful)

By default, all CSV values are treated as strings. You can explicitly cast values to other types:

```json
"assertions": {
  "body": {
    "id": "(int)${3}",
    "salary": "(double)${4}",
    "isActive": "(boolean)${5}",
    "age": "(long)${6}"
  }
}
```

**Supported type casts:**
- `(int)` - Integer
- `(long)` - Long integer
- `(double)` - Double precision number
- `(boolean)` - Boolean (true/false)
- `(String)` - String (default, can be omitted)

## Real-World Use Cases

### Use Case 1: E-commerce Product Search (Index-Based)

```json
{
  "scenarioName": "Search products with different criteria",
  "steps": [
    {
      "name": "search_products",
      "url": "/api/products/search?category=${0}&minPrice=${1}&maxPrice=${2}",
      "operation": "GET",
      "request": {},
      "assertions": {
        "status": 200,
        "body": {
          "category": "${0}",
          "resultCount.$GT": "(int)${3}"
        }
      }
    }
  ],
  "parameterized": {
    "csvSource": [
      "electronics, 100, 500, 10",
      "books, 10, 50, 50",
      "clothing, 20, 200, 25"
    ]
  }
}
```


### Use Case 5: Chatbot Conversational Testing

For testing chatbots with question-answer flows, CSV format helps organize test conversations:

```json
{
  "scenarioName": "Chatbot product selection flow",
  "steps": [
    {
      "name": "ask_question",
      "url": "/api/chatbot/query",
      "operation": "POST",
      "request": {
        "body": {
          "question": "${0}"
        }
      },
      "assertions": {
        "status": 200,
        "body": {
          "answer": "${1}"
        }
      }
    },
    {
      "name": "select_option",
      "url": "/api/chatbot/select",
      "operation": "POST",
      "request": {
        "body": {
          "selection": "${2}"
        }
      },
      "assertions": {
        "body": {
          "nextQuestion": "${3}"
        }
      }
    }
  ],
  "parameterized": {
    "csvSource": [
      "What do you want to buy?, Laptop, Color(Red or Blue)?, Red",
      "What do you want to buy?, Mouse, Color(Black or White)?, White"
    ]
  }
}
```


## Additional Resources
- [Getting Started Guide](https://github.com/authorjapps/zerocode/wiki/Getting-Started)

## Quick Reference

| Feature | Syntax                                | Example |
|---------|---------------------------------------|---------|
| Inline CSV | `"csvSource": [...]`                  | `["val1,val2", "val3,val4"]` |
| External CSV | `"csvSource": "path/file.csv"`        | `"csvSource": "data/users.csv"` |
| Index reference | `${index}`                            | `${0}`, `${1}`, `${2}` |
| Named reference | `${PARAM.columnName}`                 | `${PARAM.username}`, `${PARAM.email}` |
| Type casting | `(type)${index}` or `(type)${$.name}` | `(int)${3}`, `(boolean)${$.isActive}` |
| Value list | `"valueSource": [...]`                | `["val1", "val2"]` |

**Happy Testing!** 🚀
