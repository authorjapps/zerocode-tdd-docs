Use the version - [1.2.11](https://search.maven.org/search?q=zerocode-rest-bdd) or [higher](https://search.maven.org/search?q=zerocode-tdd)

Gradle: `group: 'org.jsmart', name: 'zerocode-rest-bdd', version:'1.2.11'`

Gradle Steps (sample [build.gradle - HelloWorld repo](https://github.com/authorjapps/zerocode-hello-world/blob/master/build.gradle) ) :
+ Clear the `target` folder
+ Configure the `test` to generate charts and csv
```
test {
    systemProperty 'zerocode.junit', 'gen-smart-charts-csv-reports'
    include 'org/jsmart/zerocode/testhelp/tests/HelloWorldGitHubSuite.class'
}
```
+ Issue a clean build command as below
>       /gradlew clean build

+ See the `target` folder for these two reports
   + zerocode-junit-granular-report.csv
   + zerocode-junit-interactive-fuzzy-search.html
   