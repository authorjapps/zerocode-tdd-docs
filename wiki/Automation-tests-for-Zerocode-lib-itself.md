How Zerocode is built?
===

Zerocode has been built using TDD methodology. Which means tests are written first, then the implementation of the feature is coded.

All collaborators have been motivated/encouraged to do this way wherever applicable. Where the "tests first" not applicable or difficult to write, then the committers make sure they cover them with unit tests and integration tests after they implement the feature.

How the PRs or branch build is automated?
===
There are three categories of tests at least existing to cover all the branches of the code.
1. Unit tests
1. Feature tests or local-integration tests or in-memory tests
1. Actual integration tests i.e. post-deployment tests

Where are the automation tests?
===
Please look at the "src/test/java" package- It has close to 200+ running test-cases just for the core module. Which means- Everytime a PR is raised or a branch is built, all these tests run. Then these are (1) and (2) of the above. After these `run` completed, the (3) i.e. post-deployment test run.

- For Http module - We use service virtualization by bringing up REST endpoints in a local container and fire the e2e REST/SOAP/Security tests
- For Kafka module - We bring up dockerized Kafka containers, then file e2e Kafka tests.

Other than the above, the `HelloWorld` project has its own CI job. In this project, we run test coverages for many usecase scenarios to make sure that our new released Zerocode artefact is backward compatible and not breaking any existing customer's contract(zerocode DSL features) intentionally. 

#### Why do we have this?
Because this is mostly downloaded by folks(testers/developers) just to try out the Zerocode features independently. That's why a separate pipe-line job has been set up to ensure it is `green` always.

Only after all the tests are `Green` in the pipeline,  the artefact is released to Maven Nexus Repository.

To view all the setup above, just have a look at the build YAML files