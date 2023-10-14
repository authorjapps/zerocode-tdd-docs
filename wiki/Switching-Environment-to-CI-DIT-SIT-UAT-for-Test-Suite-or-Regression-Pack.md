Passing environment param via Jenkins and dynamically picking environment specific properties file in CI
==

- [See a running example of passing envronment param and value](https://github.com/authorjapps/helpme/blob/master/zerocode-rest-help/src/test/java/org/jsmart/zerocode/testhelp/tests/EnvPropertyHelloWorldTest.java)
```java
package org.jsmart.zerocode.testhelp.tests;

import org.jsmart.zerocode.core.domain.EnvProperty;
import org.jsmart.zerocode.core.domain.JsonTestCase;
import org.jsmart.zerocode.core.domain.TargetEnv;
import org.jsmart.zerocode.core.runner.ZeroCodeUnitRunner;
import org.junit.Test;
import org.junit.runner.RunWith;

@EnvProperty("_${env}") //any meaningful string e.g. `env.name` or `envName` or `app.env` etc
@TargetEnv("hello_world_host.properties")
@RunWith(ZeroCodeUnitRunner.class)
public class EnvPropertyHelloWorldTest {

    @Test
    @JsonTestCase("hello_world/hello_world_get.json")
    public void testRunAgainstConfigPropertySetViaJenkins() throws Exception {
        
    }
}

/**
 Set "env=ci" in Jenkins (or via .profile in a Unix machine, 
 System/User properties in Windows).  Then the runner picks "hello_world_host_ci.properties" 
 and runs.
 if -Denv=sit, then runner looks for and picks "hello_world_host_sit.properties" and runs.

 If `env` not supplied, then defaults to "hello_world_host.properties" 
 which by default mentioned mentioned via @TargetEnv
 
 -or-
 
 Configure the below `mvn goal` when you run via Jenkins goal in the specific environment e.g. -
 
 For CI :
 mvn clean install -Denv=ci
 
 For SIT:
 mvn clean install -Denv=sit
 
 and make sure:
 `hello_world_host_ci.properties` and hello_world_host_sit.properties etc are available in the 
 resources folder or class path.
 */
```

Note-
- If you make this `${envName}`, then use `-DenvName=dit` or `-DenvName=sit` etc
- If you make this `${xyz}`, then use `-Dxyz=dit` or `-Dxyz=sit` etc