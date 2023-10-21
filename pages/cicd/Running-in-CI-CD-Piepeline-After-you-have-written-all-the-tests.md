# After you have finished writing all your tests, what all things to take care next?
These are general things to take care, nothing specific to `Zerocode`, but `Zerocode` makes your life very easy to achieve all these things.

## Organization

+ Please check the organization of the tests.
  + Check you have organized the test cases by the API features?
  + Check you have organized the test cases by API methods?
  + Check the sub-organization by `Positive` or `Negative` flows
     + Sometimes they are called `Happy` and `Sad` flows
     + Sometimes they are called `Sunny` and `Rainy` cenarios
  + If they are `Consumer` or `Boundary` contract tests
     + Check you have organized them by the `consumer` names or `boundary` names.
     + Bring up a single Suite runner pointing to the root of the tests(JSON test files). [See here how](https://github.com/authorjapps/zerocode/wiki/Suite-Runner-Vs-Package-runner)

## Individual Test Classes
```java
import org.jsmart.zerocode.core.domain.EnvProperty;
import org.jsmart.zerocode.core.domain.Scenario;
import org.jsmart.zerocode.core.domain.TargetEnv;
import org.jsmart.zerocode.core.runner.ZeroCodeUnitRunner;
import org.junit.Test;
import org.junit.runner.RunWith;

@EnvProperty("_${env}") //any meaningful string e.g. `env.name` or `envName` or `app.env` etc
@TargetEnv("hello_world_host.properties")
@RunWith(ZeroCodeUnitRunner.class)
public class EnvPropertyHelloWorldTest {

    @Test
    @Scenario("hello_world/hello_world_get.json")
    public void testRunAgainstConfigPropertySetViaJenkins() throws Exception {
        
    }
}

/**
 Set "env=ci" in Jenkins (or via .profile in a Unix machine, System/User properties in Windows)
 then the runner picks "hello_world_host_ci.properties" and runs.
 if -Denv=sit, then runner looks for and picks "hello_world_host_sit.properties" and runs.

If `env` not supplied, then defaults to "hello_world_host.properties" which by default mentioned mentioned via @TargetEnv
 
 -or-
 
 Configure the below `mvn goal` when you run via Jenkins goal in the specific environment e.g. -
 
 For CI :
 mvn clean install -Denv=ci
 
 For SIT:
 mvn clean install -Denv=sit
 
 and make sure:
 hello_world_host_ci.properties and hello_world_host_sit.properties etc are available in the resources folder or class path.
 */
```


## Test Suite
+ Create a `package` of tests aka `suite` of tests
  + Sometime this may not need any additional work too
  + i.e. just identify the root of the tests for which you want to create a suite runner, that's it.
+ Create a Suite runner or a Package runner.
  + It's good to bring up a Package runner or Suite runner for all your tests or subset of your tests. [See here how](https://github.com/authorjapps/zerocode/wiki/Suite-Runner-Vs-Package-runner)

e.g.
```java
@TargetEnv("app_host.properties")       // <--- "app_host_sst.properties" if running against 'sst'
@TestPackageRoot("tests")               // <--- Root of the all tests folder in the test/resources
@EnvProperty("_${env}")                 // <--- mvn clean install -Denv=ci1 or -Denv=sst1
@RunWith(ZeroCodePackageRunner.class)
public class ContractTestSuite{
}
```


## CI Build/Jenkins (POM)

+ Create a Jenkin Build Pipe line for your project.
  + This depends on how you have organized your tests
  + If you have multi-module maven project(POM or Gradle based), then you might need a pipe line
  + If you have only one `maven module` or only one type of `suite` or one regression `pack`, then you just need one Jenkin Job, not a Jenkins Pipe Line

In the Jenkins `build goal`, you need to configure which suite you want to run,
e.g.
```java
// ------------------------------------------------------------------------
// Via mvn command -
// $ mvn clean install -Denv=ci -Dtest=com.hsbc.regulatory.tests.ContractTestSuite
// $ mvn clean install -Denv=dit -Dtest=com.hsbc.regulatory.tests.ContractTestSuite
// $ mvn clean install -Denv=sst -Dtest=com.hsbc.regulatory.tests.ContractTestSuite
// ------------------------------------------------------------------------

```

or

+ Configure your `sure fire` plugin (if you using POM) like [this](https://github.com/authorjapps/zerocode-hello-world/blob/master/pom.xml)
```xml
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-surefire-plugin</artifactId>
	<version>2.19.1</version>
	<configuration>
		<includes>
			<include>com.hsbc.regulatory.tests.ContractTestSuite.class</include>
		</includes>
	</configuration>
</plugin>
```
Then your Jenkins build goal will be as below(bit shorter than earlier).

```java
// ------------------------------
// Via mvn command -
// $ mvn clean install -Denv=ci 
// $ mvn clean install -Denv=dit 
// $ mvn clean install -Denv=sst 
// ------------------------------
```

_(Basically, it depends on the situation and varies from project to project how teh setup should be)_

## CI Build/Jenkins (Gradle)

+ Configure your `Task` fire(if you using Gradle) like [this](https://github.com/BeTheCodeWithYou/SpringBoot-Kotlin/blob/master/build.gradle)

```java
task integrationTestsDev(type: Test) {
    delete 'target/'
    systemProperty 'env', 'dev'
    systemProperty 'zerocode.junit', 'gen-smart-charts-csv-reports'
    include 'com/mastercard/vm/tests/ContractTestSuite.class'
    testLogging {
        showStandardStreams = true
    }
}

task integrationTestsSst(type: Test) {
    delete 'target/'
    systemProperty 'env', 'sst'
    systemProperty 'zerocode.junit', 'gen-smart-charts-csv-reports'
    include 'com/mastercard/vm/tests/ContractTestSuite.class'
    testLogging {
        showStandardStreams = true
    }
}

```

Then your Jenkins goal would be
> gradle clean build integrationTestsDev  <---- For running against Dev pod

> gradle clean build integrationTestsSst  <---- For running against Sst pod


## Running from IDE
@TargetEnv("app_host.properties")  <--- Point this to any `properties file` to run the tests against that env

```
e.g.
app_host.properties  <-- against localhost/or dev or default type env.
app_host_ci.properties  <--- against ci
app_host_dit.properties <--- against dit
app_host_sit.properties <--- against sst
```
