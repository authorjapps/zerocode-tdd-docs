# Partial Match
There are instances when you want to assert a API response field with a partial match such as 
- "starts with" or
- "contains string" or
- "matches pattern".
- etc

e.g.
- MATCHES.PATTERN : You can assert that a field matches certain pattern e.g. a specific date format (Use `$MATCHES.STRING:`)
- STARTS.WITH : You can assert that a field starts with certain text (Use `$MATCHES.STRING:`)

_Also look for "CONTAINS.STRING" in the search box and its usage._

Zerocode-tdd lib provides this mechanism out of the box. 

See examples below:

```
// Run Log //

-----------------------------------------------------------------------------------

Scenario:
+++++++++

Assert date field format only but not its exact content

-----------------------------------------------------------------------------------
 
url:http://localhost:9999/api/v1/google-uk/employees/UK-LON-1002
method:GET
request:
{ } 

Response:
{
  "status" : 200,
  "body" : {
    "empId" : "UK-LON-1002",
    "city" : "UK-London",
    "dob" : "1989-07-09"
  }
}

---------> Expected Response: <----------
{
  "status" : 200,
  "body" : {
    "dob" : "$MATCHES.STRING:\\d{4}-\\d{2}-\\d{2}"
  }
} 


-----------------------------------------------------------------------------------------------

 
url:http://localhost:9999/api/v1/google-uk/employees/UK-LON-1002
method:GET
request:
{ } 

Response:
{
  "status" : 200,
  "body" : {
    "empId" : "UK-LON-1002",
    "city" : "UK-London",
    "dob" : "1989-07-09"
  }
}

---------> Expected Response: <----------
{
  "status" : 200,
  "body" : {
    "city" : "$MATCHES.STRING:UK-(.*)"
  }
} 
 
-done-
```

## Starts With
There is no `STARTS.WITH` syntax.
As you can achieve the same with `$MATCHES.STRING:<aString(.*)>`, hence there was no `STARTS.WITH` implementation needed or provided.

## Regex String Match
You can assert a string with `$MATCHES.STRING:<a regex pattern>`

