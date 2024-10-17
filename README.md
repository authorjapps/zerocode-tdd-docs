# Zerocode TDD - Documentation Overview

Zerocode is a powerful, lightweight, and extensible framework that makes it easy to automate API and Kafka data stream regression testing with minimal overhead. It leverages community-driven best practices and supports both JSON and YAML formats for seamless test automation, making it highly adoptable among developers and testers.


## Features

- **Automated Regression Testing**: Perform end-to-end automated regression tests for REST, SOAP, and Kafka microservices via JSON or YAML.
- **API Performance Testing**: Measure and validate API performance and load using simple declarative configurations.
- **Kafka Data Stream Testing**: Test Kafka real-time data streams with automated workflows.
- **Easy Validation**: Effortlessly validate API responses, including headers and body content, using JSON or YAML.
- **CI Integration**: Integrate seamlessly with CI pipelines to automate workflows.

## Why Zerocode?

Zerocode makes testing APIs and Kafka data streams fast and easy by reducing the complexity of writing test cases. Its intuitive YAML/JSON-based approach simplifies handling scenarios like response validations, stress testing, and security checks.

### Supported Features:
- **Microservices API Testing**: Use JSON/YAML to automate microservice validation.
- **Kafka Stream Testing**: Handle complex Kafka streams with ease.
- **Declarative Configuration**: No programming needed—just simple configuration.
- **Built-in Retry Logic**: Built-in support for retrying failed requests.
- **IDE Support**: Full support for Jetbrains IDEs.

## Documentation

To get started, visit the [documentation](https://zerocode-tdd.tddfy.com/). It is indexed, searchable, and provides instant results for your queries.

### Example

Here's a sample test for an API endpoint:

#### JSON Example:
```json
{
  "url": "api/v1/customers/123",
  "method": "GET",
  "request": {
    "headers": {
      "Content-Type": "application/json"
    }
  },
  "retry": {
    "max": 3,
    "delay": 1000
  },
  "verify": {
    "status": 200,
    "headers": {
      "Content-Type": [ "application/json; charset=utf-8" ]
    },
    "body": {
      "id": 123,
      "type": "Premium Visa",
      "addresses": [
        {
          "type": "Billing",
          "line1": "10 Random St"
        }
      ]
    }
  },
  "verifyMode": "LENIENT"
}
```

#### YAML Example:
```yaml
---
url: api/v1/customers/123
method: GET
request:
  headers:
    Content-Type: application/json
retry:
  max: 3
  delay: 1000
verify:
  status: 200
  headers:
    Content-Type:
      - application/json; charset=utf-8
  body:
    id: 123
    type: Premium Visa
    addresses:
      - type: Billing
        line1: 10 Random St
verifyMode: LENIENT
```

## IDE Support
Zerocode has excellent support for JetBrains IDEs, making test development and execution seamless.

## Contributing

We welcome contributions from the community! Here are the steps to contribute:

1. **Fork the Repository:**
   - Click the "Fork" button at the top right of the repository page to create a copy of the repository under your GitHub account.

2. **Clone Your Fork:**
   - Clone your forked repository to your local machine:
     ```sh
     git clone https://github.com/authorjapps/zerocode-tdd-docs
     cd zerocode-tdd-docs
     ```

3. **Create a New Branch:**
   - Create a new branch for your feature or bug fix:
     ```sh
     git checkout -b feature-branch-name
     ```

4. **Make Your Changes:**
   - Implement your changes in the new branch.

5. **Commit Your Changes:**
   - Commit your changes with a meaningful commit message:
     ```sh
     git commit -m "Description of your changes"
     ```

6. **Push to Your Fork:**
   - Push your changes to your forked repository:
     ```sh
     git push origin feature-branch-name
     ```

7. **Create a Pull Request:**
   - Go to the original repository and click the "New Pull Request" button.
   - Select your branch and submit the pull request for review.

8. **Review Process:**
   - Your pull request will be reviewed by the maintainers. You may be asked to make additional changes before it is merged.

## License

This Documentation project is licensed under the MIT License.
