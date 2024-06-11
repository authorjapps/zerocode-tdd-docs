# When to use JUnit Suite runner Vs Zerocode Package runner
+ Principally both do the same thing
  + i.e. Run all the tests from the single runner
+ When to use JUnit Suite runner ?
  + Use it - when you want to control which `Test` class to run and which not to run
  + The one you don't want to be part of the `Test Suite`, then just don't add them to the annotation
  + Env switching goes into the individual classes

+ When to use Zerocode Package runner(which is a JUnit custom runner) ?
  + Points to the JSON test cases root of the package e.g. `src/test/resources/tests`
  + It picks all tests from the folder and sub folders and runs them
  + You can add env switching at single place(i.e. just annotate this class with env details)

```java
// ------------------------------------------------------------------------
// Via mvn command -
// $ mvn test -Denv=ci -Dtest=com.hsbc.regulatory.tests.ContractTestSuite
// $ mvn test -Denv=dit -Dtest=com.hsbc.regulatory.tests.ContractTestSuite
// $ mvn test -Denv=sst -Dtest=com.hsbc.regulatory.tests.ContractTestSuite
// ------------------------------------------------------------------------

@TargetEnv("app_host.properties")       // <--- "app_host_sst.properties" if running against 'sst'
@TestPackageRoot("tests")               // <--- Root of the all tests folder in the test/resources
@EnvProperty("_${env}")                 // <--- mvn clean install -Denv=ci1 or -Denv=sst1
@RunWith(ZeroCodePackageRunner.class)
public class ContractTestSuite{

}
```

Have your host properties present in the `test/resources` folder.
```
e.g.
app_host.properties
app_host_ci.properties
app_host_dit.properties
app_host_sit.properties

etc...
```