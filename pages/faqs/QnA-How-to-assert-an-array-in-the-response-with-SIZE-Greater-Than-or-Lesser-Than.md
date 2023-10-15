The [Section TOC - Table of content in the README](https://github.com/authorjapps/zerocode#table-of-contents--) has may examples for reference. Please have a look there.

<br>

> an array in the response ?

- Array `as it is` in the `assertions` block. 
   - See [more examples here](https://github.com/authorjapps/zerocode#asserting-an-array-size), go to section `"Dealing with arrays"`
e.g.
```javaScript
"assertions": {
                "status": 200,
                "body": {
                    "type": "HIGH-VALUE",
                    "persons":[
                        {
                            "id": "120.100.80.03",
                            "name": "Dan"
                        },
                        {
                            "id": "120.100.80.11",
                            "name": "Mike"
                        }
                    ]                
               }
            }
```
- Also, in case you are only interested in array `size` etc, then below might help-
```javaScript
        {
	    ...
            "assertions": {
                "persons.SIZE": 2
            }
        }

-or-
        {
	    ...
            "assertions": {
                "persons.SIZE": "$GT.1"
            }
        }
-or-
        {
	    ...
            "assertions": {
                "persons.SIZE": "$LT.3"
            }
        }
etc
```
- In case you want to find an element in the array, then below explains using `JSON Path` -
```javaScript
            "assertions": {
                "status": 200,
                "body": {
                    "type": "HIGH-VALUE",
                    "persons.SIZE": 2,
                    "persons[?(@.name=='Dan')].id.SIZE": 1,
                    "persons[?(@.name=='Mike')].id.SIZE": 1,
                    "persons[?(@.name=='Emma')].id.SIZE": 0
                }
            }
```

<br>