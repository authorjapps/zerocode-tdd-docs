Just keep them in the "headers" section inside `assertions` block as below.
> you can choose the fields to keep/skip, order doesn't matter, space doesn't matter,
as the engine performs a JSON compare

e.g.
```javaScript
            "assertions": {
                "status": 200,
                "headers" : {
                    "X-Server-Token": 190215, //<--- e.g. If this is random/indeterministic, then use "$NOT.NULL"
                    "X-Client-Id": "xx-yy-zz",
                    "Server" : [ "hsbcbank.co.uk" ],
                    "DateTime" : "$NOT.NULL" //<--- Not null due to indeterministic for every response 
                },
                "body": {
                    "login" : "octocat",
                    "id" : 583231
                }
            }
```

In case you want to use the custom header(s) in for your **next step(s)**, then just point your `JSON path` to that header. 
e.g.
> `${$.create_emp.response.headers.X-Server-Token}`  //<--- This will resolve to `190215`

> `${$.create_emp.response.headers.X-Client-Id}`  //<--- This will resolve to `xx-yy-zz`

#### See below Hello World project for full working examples
- GitHub basic [Hello World repo](https://github.com/authorjapps/zerocode-hello-world) - Clone n run locally
- More [Hello World repos](https://github.com/authorjapps/zerocode/blob/master/README.md#hello-world)

