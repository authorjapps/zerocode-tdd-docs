>               Original Author Name: @kristin-smith

# Background

_A great time saver!_

This archetype helps developers or a Dev-In-Test automation engineers to set up a working maven project quickly. Also, we can think of this archetype might help us to avoid any errors which could otherwise occur during setting up a project manually.

# Sample CLI

```bash
mvn archetype:generate \
-DarchetypeGroupId=org.jsmart \
-DarchetypeArtifactId=zerocode-maven-archetype \
-DarchetypeVersion=1.3.20 \
-DgroupId=com.myproject \
-DartifactId=my-api-testing \
-Dversion=1.0.0-SNAPSHOT

Note:
Use the latest version instead of "1.3.20" if available. Check the release notes.
Release note link: https://github.com/authorjapps/zerocode/releases

```

OLD version:

```java
$ mvn archetype:generate -DarchetypeGroupId=zerocode.archetype -DarchetypeArtifactId=zerocodeArchetype -DarchetypeVersion=1.0-SNAPSHOT -DgroupId=com.xbox -DartifactId=game-app
```

<img width="916" alt="Green Test" src="https://user-images.githubusercontent.com/12598420/67926647-6a6e3700-fbae-11e9-8d65-755e9820fb57.png">

### Step 2)

To generate a new archetype-based project:

1. Navigate to the directory that will house the project.

   > _e.g. a brand new folder or a new git repo._

1. Run

```bash
mvn archetype:generate \
-DarchetypeGroupId=org.jsmart \
-DarchetypeArtifactId=zerocode-maven-archetype \
-DarchetypeVersion=1.3.20 \
-DgroupId=com.myproject \
-DartifactId=my-api-testing \
-Dversion=1.0.0-SNAPSHOT
```

2. The generic command format is:

```
    "mvn archetype:generate -DarchetypeGroupId=<custom-archetype group id e.g. zerocode.archetype>
    -DarchetypeArtifactId=<custom-archetype artifactid e.g. zerocode-maven-archetype>
    -DarchetypeVersion=<custom-archetype version e.g. 1.3.20>
    -DgroupId=<new project Group Id e.g. com.mycompany>
    -DartifactId=<new project artifact Id e.g. my-api-e2e-testing>"
```

The final command should look like below:

> $ mvn archetype:generate -DarchetypeGroupId=org.jsmart -DarchetypeArtifactId=zerocode-maven-archetype -DarchetypeVersion=1.3.20 -DgroupId=com.mycompany -DartifactId=my-api-e2e-testing

# Optional step

The sample test scenario [get_api_200](https://github.com/authorjapps/zerocode/wiki/Zerocode-archetype-to-auto-generate-a-maven-testing-project#sample-cli) works fine i.e. the test turns green.

The other two samples "post" and "put" may not be relevant to your project, but can be used as a reference only or to manipulate with your payload/headers. The purpose of the above archetype is to generate a ready-made maven project to make it easy for a developer to start with automation.

Add personal GitHub token to test files:

- In both `post_api_200.json` and `put_api_200.json`, substitute your own GitHub token for the placeholder.
- In `put_api_200.json`, also update the name of the owner in the URL to your GitHub username
