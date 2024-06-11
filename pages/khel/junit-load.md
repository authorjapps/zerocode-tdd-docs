# Parallel Running `as well as`, Load and Stress Testing of JUnit5 tests

## Tests

> /src/test/java/.../samplesjunit5/jupiter/JUnit5Test.java
```java
@ExtendWith({ExtensionA.class, ExtensionB.class}) //<--- Just for demonstration purpose
public class JUnit5Test {

    @Test
    public void testX() {
        assertTrue(2 == 2); //<--- jupiter assertion
    }

    @Test
    public void testY() throws InterruptedException {
        assertTrue(2 == 2); //<--- jupiter assertion
    }

}
```

> /src/test/java/.../samplesjunit5/jupiter/JUnit5MoreTest.java
```java
@ExtendWith({ExtensionA.class, ExtensionB.class})
public class JUnit5MoreTest {

    @Test
    public void testZ() throws InterruptedException {
        assertTrue(2 == 2); //jupiter assertion
    }

}
```

## Load

> /src/test/java/org/jsmart/zerocode/samplesjunit5/loadjupiter/simpleload/JUnit5LoadTest.java
```java
@LoadWith("load_generation.properties")
@ExtendWith({ParallelLoadExtension.class})
public class JUnit5LoadCommonLoadTest {

    @Test
    @DisplayName("testing parallel load for X, Y and Z scenarios")
    @TestMappings({
            @TestMapping(testClass = JUnit5Test.class, testMethod = "testX"),
            @TestMapping(testClass = JUnit5Test.class, testMethod = "testY"),
            @TestMapping(testClass = JUnit5MoreTest.class, testMethod = "testZ")
    })
    public void testLoad_xyz() {
        // This space remains empty
    }

}
```

> load_generation.properties

```properties
number.of.threads=50
ramp.up.period.in.seconds=50
loop.count=2
````

## Maven Dependencies
+ Add the following dependencies
JUnit5/Jupiter Extension
```xml
<dependency>
    <groupId>org.jsmart</groupId>
    <artifactId>zerocode-tdd-jupiter</artifactId>
    <version>1.3.7</version> <!-- or higher -->
</dependency>
```

Maven `maven-surefire-plugin` version
```xml
<dependency>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.0.0-M3</version> <!-- or higher -->
</dependency>
```

## Existing JUnit5 tests

> In the `HelloWorld` performance test repo, the below are the JUnit5 tests

![image](https://user-images.githubusercontent.com/12598420/57195971-0563bc80-6f50-11e9-9d68-ef86ed4c4a57.png)

## Generating Load

> Or we can alternatively say - Running the tests in parallel as configured

![image](https://user-images.githubusercontent.com/12598420/57195957-e06f4980-6f4f-11e9-975c-2f8e3bfb6967.png)

## What does JUnit5LoadTest example do?
+ This generates load as configured in the `@LoadWith("load_generation.properties")`

## What does JUnit5LoadCommonLoadTest example do?
+ If your load generation configuration is same for all kind of load you are setting up to generate, then
you can annotate the config at the `Class` level `@LoadWith("load_generation.properties")`

e.g.

```java
@LoadWith("load_generation.properties")
@ExtendWith({ParallelLoadExtension.class})
public class JUnit5LoadCommonLoadTest {
   //...
}
```

## What does JUnit5LoadDifferentLoadTest example do?
+ If your load generation configuration is different for different kind of load you are setting up to generate, then, you need to annotate the config at the `Method` level `@LoadWith("load_generation.properties")`

e.g.,
+ Two tests below run in parallel 1)"testX"  2)"testY"

```java
@ExtendWith({ParallelLoadExtension.class})
public class JUnit5LoadDifferentLoadTest {

    @Test
    @DisplayName("1sec gap per user - Firing parallel load for X and Y scenarios")
    @TestMappings({
            @TestMapping(testClass = JUnit5Test.class, testMethod = "testX"),
            @TestMapping(testClass = JUnit5Test.class, testMethod = "testY")
    })
    @LoadWith("load_generation.properties")
    public void testLoad_xy() {
        // This space remains empty
    }

```

+ The below configuration means, two `users` firing the requests in parallel with `2 sec` gap.
```properties
number.of.threads=2
ramp.up.period.in.seconds=4
loop.count=1
````

You can manipulate this to match your parallel-run/load requirement e.g.
```properties
number.of.threads=50
ramp.up.period.in.seconds=50
loop.count=2
````
which means, 50 `users` firing the requests in parallel with `1 sec` gap and they repeat `twice`. That leads to `100 users` firing tests in parallel within `100 sec`. Visit here to know [How to Manipulate the config](https://github.com/authorjapps/performance-tests/blob/master/src/test/resources/load_generation_1per1sec.properties)


## Reports
+ This generates CSV report only which is useful and efficient for tracing the failures
+ We have deliberately suppressed the HTML reports as they are not particularly useful for load tests
+ CSV gives us flexibility to `slice n dice` for analysis purpose.
+ Using CSV we can generate various throughput, 2D, 3D metrices of our performance testing


## Running the Load tests as a Suite
+ This setup(JUnit5LoadDifferentLoadTest, JUnit5LoadCommonLoadTest) is already like a Suite setup
  + which means you don't need another Suite-Runner 
+ Nevertheless there will be always situations to bring up a load suite. 
  + So we have put [an example here](https://github.com/authorjapps/performance-tests/blob/master/src/test/java/org/jsmart/zerocode/samplesjunit5/loadjupiter/ParallelLoadTestSuite.java) to get you covered, which looks like below. 
```java
@RunWith(JUnitPlatform.class)
@IncludeEngines("junit-jupiter")
@SelectPackages("org.jsmart.zerocode.samplesjunit5.loadjupiter")
public class ParallelLoadTestSuite {
   // Nothing goes in this space
}
```

## GitHub Repo - Examples
+ The regular `Junit` tests and the `load` generating tests are [here](https://github.com/authorjapps/performance-tests/tree/master/src/test/java/org/jsmart/zerocode/samplesjunit5)
+ You can clone [this repo](https://github.com/authorjapps/performance-tests) and run from your IDE
+ Please note- Junit5/Jupiter tests and JUnit4 tests can co-exist. 
  + Which means - Junit4 tests run via the Vintage engine, JUnit5 tests run via Jupiter engine
  + That's not really an issue to maintain both tests, as explained here [JUnit5 user-guide](https://junit.org/junit5/docs/current/user-guide/#migrating-from-junit4)
  > Which reads : Since all classes and annotations specific to JUnit Jupiter reside under a new org.junit.jupiter base package, having both JUnit 4 and JUnit Jupiter in the classpath does not lead to any conflicts.

## Good Luck n Happy Load Testing 🐼 