## Introduction
We will learn here what these properties are and why/when do we need them. Then we will see how we can use them in Zerocode test scenario steps.

## What are System Properties
The Java platform uses a Properties object (subclass of Hashtable) to maintain key value pair, where both the key and the value are strings to store information about the local system and configuration. 
The default System Properties include basic information like current user, JRE version, file path separator, etc.

System properties can be set on the Java command line using `-Dpropertyname=value` or added/modified at runtime using `System.setProperty(String key, String value)`

To get a system property you can use 
- `System.getProperty(String key)` or 
- `System.getProperty(String key, String defaultValue).`

To use System Property in a `Zerocode step`

```
{
    "scenarioName": "System Property for host",
    "steps": [
        {
            "name": "get_api_call",
            "url":  "${SYSTEM.PROPERTY:hostname}/test/123",
             ...
        }  
     ]
}
```


Replaces with the value of the system property. E.g. `hostname ` resolves to `http://localhost:9998 `. If no property exists then the place holder remains in place i.e. `${SYSTEM.PROPERTY:hostname}`
The  value of hostname can be provided at runtime using `–Dhostname=http://localhost:9998` as the command line argument.


## What are System Environment Variables
Like properties in the Java platform, environment variables are key/value pairs, where both the key and the value are strings. 
The conventions for setting and using environment variables vary between operating systems, and also between command line interpreters.
To get a specific environment variable you can use `System.getenv(String name)`.
Environment variables are immutable.

```
{
    "scenarioName": "Environment Variable for host name",
    "steps": [
        {
            "name": "get_api_call",
            "url":  ${SYSTEM.ENV:HOSTNAME}/test/123",
            ...
        }
        
    ]
}
```


## When Do We Need Them in Test Scenarios
To use System Environment or System properties depends on the scope of the variable and the use case.

System properties can be used to define hostname, port etc where the developer/tester can run the test(s) against different ports(8080, 8090 etc) or different hosts(dev, sit, uat, preprod etc), typically in Jenkins pipeline by maven runtime args via `-D`.

Using Environment Variables, the same application can be deployed to multiple machines to run different instances and can be configured at the Operating System level, AWS, Azure Consoles; removing the need to rebuild the application to update config only. 

Hence, using Environment variables to store information like username, password etc can be useful where the data might change during the runtime.


## Conclusion
We have learnt here how to use the system properties and system env variables. Visit these issues to explore more about their usecases.
Issue # [282](https://github.com/authorjapps/zerocode/issues/282)
Issue # [248](https://github.com/authorjapps/zerocode/issues/248)
