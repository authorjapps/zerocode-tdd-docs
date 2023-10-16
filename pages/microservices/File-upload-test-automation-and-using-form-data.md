# Examples Repo

Visit [these examples](https://github.com/authorjapps/spring-boot-integration-test/tree/master/src/test/resources/integration_tests/upload_file) to learn how file upload tests can be automated.

# Sample Script:

```json
{
  "scenarioName": "Send a POST request using form-data - Upload a file to the server and assert success",
  "steps": [
    {
      "name": "upload_a_pdf_file",
      "url": "/api/abc-bank/upload",
      "operation": "POST",
      "request": {
        "headers": {
          "Content-Type": "multipart/form-data",
          "x-user-id": "bond007"
        },
        "body": {
          "files": ["file:project_files/my_zip_file.zip"],
          "boundary": "--1122-boundry-8980912-sadf098-werwer"

          // Comments -
          // file: match this fieldName to what your server expects
          //    -- e.g. "file": "content:project_files/my_zip_file.zip"
          //    -- e.g. "file": "binary:project_files/my_zip_file.zip"
          //    -- e.g. "file": "file1:project_files/my_zip_file.zip"
          //    -- e.g. "file": "file2:project_files/my_zip_file.zip" etc
          // and-
          // "project_files/my_zip_file.zip": Allows 'test/resources' path or full absolute path
        }
      },
      "assertions": {
        "status": 200,
        "body": {
          "message": "$CONTAINS.STRING:File uploaded successfully !",
          "metaData": "$CONTAINS.STRING:x-user-id=[bond007]"
        }
      }
    }
  ]
}
```
