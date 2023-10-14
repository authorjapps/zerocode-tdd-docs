## Introduction
When Jayway JSON path is used for finding one or more dynamic elements in an array, it always returns the matching result as an array. This means even it finds just one matching element, it returns that element as an array.

This makes it difficult to reuse that `leaf element` as a single field or single value.

e.g. given a JSON response as below,
```json
{
    "results": [
        {
            "id": 1,
            "name": "Foo"
        },
        {
            "id": 2,
            "name": "Bar"
        }
    ]
}
```

when, we search for `Foo` and find its `id` using below Jayway JSON Path,
> `$.results[?(@.name == 'Foo')].id`

it returns,
```json
[
   1
]
```

Similarly,
> $.results[?(@.id == 2)].name

returns,
```json
[
   "Bar"
]
```

and 

> $.results[?(@.id > 0)].name

returns
```json
[
   "Foo",
   "Bar"
]
```


## Pick the value from single-value array
To pick the 1st element, we can use the expression as below.
> "${$...results[?(@.id=='2')].name.$VALUE}"

will resolve to
> "Bar"


## Pick a value from multi-value array
To pick the 1st element, we can use the expression as below.
> "${$.results[?(@.id > 0)].name.$VALUE}"

will resolve to
> "Foo"

or

> "${$.results[?(@.id > 0)].name.$VALUE[0]}"

will resolve to
> "Foo"


To pick the 2nd element, we can use the expression as below.
> "${$.results[?(@.id > 0)].name.$VALUE[1]}"

will resolve to
> "Bar"

## Conclusion
We learnt how to pick an element from an array of leaf nodes. 

Please note-
> This works only when the JSON Path returns array of leaf nodes only(not the Key-Value pairs) as below.

(1) 
```json
[
   "Foo"
]
```

(2)
```json
[
   "Foo",
   "Bar"
]
```

**_Warning_** - When we point the `n` in `$VALUE[n]` to a wrong index, we get a `ArrayIndexOutOfBound` exception.

We can find the running examples in HelloWorld repo of the Zerocode.