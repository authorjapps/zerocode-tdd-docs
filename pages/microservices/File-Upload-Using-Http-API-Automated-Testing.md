# What is File Upload

In a form, file upload is done using the `<input>` tag with **type="file"**, which allows the user to upload a one or more files from local storage to a server.
[Read more about file upload](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)

## Http Headers During The File Upload

Files are uploaded to server via a HTTP POST request, this request must however be encoded in one of the following methods:

1.  `application/x-www-form-urlencoded` (default method)
2.  `multipart/form-data`
3.  `text/plain`

The content type "application/x-www-form-urlencoded" is inefficient for sending large quantities of binary data or text containing non-ASCII characters. The content type "multipart/form-data" should be used for submitting forms that contain files, non-ASCII data, and binary data.
[Read more about form content types](https://www.w3.org/TR/html401/interact/forms.html#h-17.13.4)

## Writing An Automated Test Scenario

### Example 1

Upload one or more files using http post

```
{
    "scenarioName": "Upload a file to the server and assert success @@Harikachepuri04 And Santhoshkumar@@",
    "steps": [
        {
            "name": "upload_a_pdf_file",
            "url": "/api/abc-bank/upload",
            "method": "POST",
            "request": {
                "headers": {
                    "content-type": "multipart/form-data"
                },
                "body": {
                    "files": ["file:project_files/my_zip_file.zip"]

                    // Comments -
                    // file: match this field name "file:<path>" to what your server expects
                    //    -- e.g. "file": "content:project_files/my_zip_file.zip"
                    //    -- e.g. "file": "binary:project_files/my_pdf_file.pdf"
                    //    -- e.g. "file": "file1:project_files/my_file.txt"
                    //    -- e.g. "file": "file2:project_files/my_zip_file.zip" etc
                    // and-
                    // "project_files/my_zip_file.zip": Allows 'test/resources' path or full absolute path
                }
            },
            "assertions": {
                "status": 200,
                "body": {
                    "message": "$CONTAINS.STRING:File uploaded successfully !"
                }
            }
        }
    ]
}

```

### Example 2

Upload one or more files along with form key-value pairs

```
{
    "scenarioName": "Upload two files and send more key-value request params Santhoshkumar@@",
    "steps": [
        {
            "name": "upload_a_pdf_file",
            "url": "/api/abc-bank/upload/filesAndRequestParams",
            "method": "POST",
            "request": {
                "headers": {
                    "content-type": "multipart/form-data"
                },
                "body": {
                    "files": ["file:project_files/my_zip_file.zip", "file2:project_files/pdf_file.pdf"],
                    "trainList" : "Jubilee, Central, Bakerloo",
                    "id" : "LONDON-TUBE-UNDERGROUND"

                    // Comment-
                    // It uploads two files ".zip" and ".pdf" file
                    // Also sends two key-value param to server
                    // Server just prints these key-value(see in the server console)
                }
            },
            "assertions": {
                "status": 200,
                "body": {
                    "message": "$CONTAINS.STRING:File uploaded successfully !"
                }
            }
        }
    ]
}

```

## Conclusion

- Related [Issue link](https://github.com/authorjapps/zerocode/issues/107)
- Examples to clone and run locally using a spring-boot application is [here](https://github.com/authorjapps/spring-boot-integration-test)
