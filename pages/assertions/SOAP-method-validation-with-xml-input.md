
SOAP Testing
===

You can invoke SOAP as below which is already supported by zerocode lib, or you can write your own SOAP executor using Java(optionally). 

> _If you want to write custom handling- Then, read section "Calling java methods(apis) for specific tasks"_

```javaScript
{
    "scenarioName": "GIVEN a SOAP end poinr WHEN I invoke a method with a request XML, THEN I will ge the SOAP response in XML",
    "steps": [
        {
            "name": "invoke_currency_conversion",
            "url": "http://<target-domain.com>/<path etc>",
            "method": "POST",
            "request": {
                "headers": {
                    "Content-Type": "text/xml; charset=utf-8",
                    "SOAPAction": "<get this from WSDL file, this has the port or method or action name in the url>"
                    //"SOAPAction": "\"<or wrap it in double quotes as some SOAP servers understand it>\""
                },
                "body": "escaped request XML message ie the soap:Envelope message"
                -or- // pick from- src/test/resources/soap_requests/xml_files/soap_request.xml
                "body": "${XML.FILE:soap_requests/xml_files/soap_request.xml}" 
            },
            "verify": {
                "status": 200
            }
        }
    ]
}
```

e.g. below-
This example invokes a free SOAP service over internet.
Note:
If this service is down, the invocation might fail.
So better to test against an available SOAP service to you or a local stub service.

```javaScript
{
    "scenarioName": "GIVEN a SOAP end point WHEN I invoke a method with a request XML, THEN I will get response in XML",
    "steps": [
        {
            "name": "invoke_currency_conversion",
            "url": "http://www.webservicex.net/CurrencyConvertor.asmx",
            "method": "POST",
            "request": {
                "headers": {
                    "Content-Type": "text/xml; charset=utf-8",
                    "SOAPAction": "http://www.webserviceX.NET/ConversionRate"
                    //"SOAPAction": "\"http://www.webserviceX.NET/ConversionRate\""
                },
                "body": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n    <ConversionRate xmlns=\"http://www.webserviceX.NET/\">\n      <FromCurrency>AFA</FromCurrency>\n      <ToCurrency>GBP</ToCurrency>\n    </ConversionRate>\n  </soap:Body>\n</soap:Envelope>"
                // -or- 
                // "body": "${XML.FILE:soap_requests/xml_files/soap_request.xml}"
            },
            "verify": {
                "status": 200
            }
        }
    ]
}
```

You should received the below-
```
Response:
{
  "status" : 200,
  "headers" : {
    "Date" : [ "Fri, 16 Feb 2018 05:38:27 GMT" ],
    "Server" : [ "Microsoft-IIS/7.0" ]
  },
  
  "rawBody" : "<?xml version=\"1.0\" encoding=\"utf-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body><ConversionRateResponse xmlns=\"http://www.webserviceX.NET/\"><ConversionRateResult>-1</ConversionRateResult></ConversionRateResponse></soap:Body></soap:Envelope>"
}
*responseTimeStamp:2018-02-16T05:38:35.254
*Response delay:653.0 milli-secs
 ```

Convert XML to JSON and assert using JSON Path
===
See an example [here(Click this)](https://github.com/authorjapps/zerocode/blob/master/core/src/test/resources/integration_test_files/soap/soap_endpoint_soap_action_post_200.json).


Note:
The 2nd step has converted the XML to JSON, then the usual way, you can validate your response.


```json
{
    "scenarioName": "GIVEN a SOAP end point WHEN I invoke a method with a request XML, THEN I will get the SOAP response in XML",
    "steps": [
        {
            "name": "invoke_currency_conversion",
            "url": "/CurrencyConvertor.asmx",
            "operation": "POST",
            "request": {
                "headers": {
                    "Content-Type": "text/xml; charset=utf-8",
                    //"SOAPAction": "\"http://www.webserviceX.NET/ConversionRate\""
                    "SOAPAction": "http://www.webserviceX.NET/ConversionRate"
                },
                "body": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n    <ConversionRate xmlns=\"http://www.webserviceX.NET/\">\n      <FromCurrency>AFA</FromCurrency>\n      <ToCurrency>GBP</ToCurrency>\n    </ConversionRate>\n  </soap:Body>\n</soap:Envelope>"
            },
            "assertions": {
                "status": 200,
                "rawBody": "$CONTAINS.STRING:<ConversionRateResult>-1</ConversionRateResult>"
            }
        },
        {
            "name": "response_xml_to_json",
            "url": "org.jsmart.zerocode.converter.MimeTypeConverter",
            "operation": "xmlToJson",
            "request": "${$.invoke_currency_conversion.response.rawBody}",
            "assertions": {
                "soap:Envelope": {
                    "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
                    "xmlns:soap": "http://schemas.xmlsoap.org/soap/envelope/",
                    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "soap:Body": {
                        "ConversionRateResponse": {
                            "xmlns": "http://www.webserviceX.NET/",
                            "ConversionRateResult": -1
                        }
                    }
                }
            }
        }
    ]
}

```
