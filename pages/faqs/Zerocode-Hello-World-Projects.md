Hello World 🙌
====

In a typical TDD approach, Zerocode is used in various phases of a project to pass though various quality gates. 
This makes the TDD cycle very very easy, clean and efficient.
e.g.
+ NFR - Performance Testing
+ NFR - Security Testing
+ DEV - Integration Testing
+ DEV - Dev Build/In-Memory Testing
+ CI - End to End Testing Build
+ CI - SIT(System Integration Testing) Build
+ CI - Contract Test Build
+ CI - DataBase Integrity Testing
+ MANUAL - Manual Testing like usual REST clients(Postman or Insomnia etc)
+ MOCK - API Mocking/Service Virtualization


Clone or download the below quick-start repos to run these from your local IDE or maven. 

 * Quick start - [**Hello World** examples](https://github.com/authorjapps/zerocode-hello-world) <br/> 
  
 * Quick start - [**Hello World Kafka Testing** examples](https://github.com/authorjapps/hello-kafka-stream-testing) <br/> 

 * Quick start - [**API Contracts testing** - Interfacing applications](https://github.com/authorjapps/consumer-contract-tests) <br/> 
 
 *  Quick start - [**Performance** testing -  Varying **Load/Stress** generation](https://github.com/authorjapps/performance-tests) <br/> 
 
 * Quick start - [**Spring Boot** application - **Integration testing** - In-Memory](https://github.com/authorjapps/spring-boot-integration-test) <br/>
 
 * Quick start - [**Performance testing** - Resusing Spring JUnit tests(`less common`) - JUnit-Spring-Zerocode](https://github.com/authorjapps/zerocode-spring-junit) <br/>

 * Quick start - [**Kotlin Integration** - A Simple Kotlin Application - Dev and Test Best Practice](https://github.com/BeTheCodeWithYou/SpringBoot-Kotlin) <br/>


To build any of the above projects, we can use the following command
```
mvn clean install -DskipTests
```

For selected module build
> mvn clean install -pl core,http-testing
