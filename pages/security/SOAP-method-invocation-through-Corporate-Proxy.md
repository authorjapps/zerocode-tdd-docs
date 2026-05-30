# SOAP Method Invocation Through Corporate Proxy

When your test environment is behind a corporate proxy, you need to override the default `BasicHttpClient` and configure proxy settings. Zerocode provides two built-in HTTP clients for this.

## Available Corporate Proxy HTTP Clients

- `SslTrustCorporateProxyHttpClient` — Routes requests through the proxy with SSL trust enabled (accepts all certificates). Use this when your SOAP endpoint uses HTTPS with self-signed or internal certificates.
- `CorporateProxyNoSslContextHttpClient` — Routes requests through the proxy without an SSL context. Use this when SSL is not required.

Both clients are in the package `org.jsmart.zerocode.core.httpclient.ssl`.

## How to Use

### Step 1 — Properties Configuration

Create a properties file with your SOAP host and corporate proxy details:

```properties
                       soap_host_with_corp_proxy.properties
                       ------------------------------------
# Web Server host and port
web.application.endpoint.host=https://soap-server-host/ServiceName
web.application.endpoint.port=443
# Web Service context; Leave it blank in case you do not have a common context
web.application.endpoint.context=

# Corporate proxy settings
corporate.proxy.host=http://exam.corporate-proxy-host.co.uk
corporate.proxy.port=80
corporate.proxy.username=HAVYSTARUSER
corporate.proxy.password=i#am#here#for#soap#
```

### Step 2 — Annotate Your Test Class

Use `@UseHttpClient` to tell Zerocode to route requests through the proxy, and `@TargetEnv` to point to your properties file:

```java
@UseHttpClient(SslTrustCorporateProxyHttpClient.class)       // <--- Use proxy client
@TargetEnv("soap_host_with_corp_proxy.properties")            // <--- Host + proxy config
@RunWith(ZeroCodeUnitRunner.class)
public class SoapCorpProxyTest {

    @Test
    @JsonTestCase("soap_tests/soap_via_proxy_test.json")      // <--- Your SOAP scenario
    public void testSoapThroughProxy() throws Exception {
    }
}
```

For the non-SSL variant, swap the client:

```java
@UseHttpClient(CorporateProxyNoSslContextHttpClient.class)    // <--- No SSL context
```

### Step 3 — Write Your SOAP Scenario

The SOAP test scenario is the same whether or not you use a proxy — the proxy handling is transparent:

```json
{
    "scenarioName": "SOAP currency conversion via corporate proxy",
    "steps": [
        {
            "name": "invoke_currency_conversion",
            "url": "/CurrencyConvertor.asmx",
            "operation": "POST",
            "request": {
                "headers": {
                    "Content-Type": "text/xml; charset=utf-8",
                    "SOAPAction": "http://www.webserviceX.NET/ConversionRate"
                },
                "body": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n    <ConversionRate xmlns=\"http://www.webserviceX.NET/\">\n      <FromCurrency>AFA</FromCurrency>\n      <ToCurrency>GBP</ToCurrency>\n    </ConversionRate>\n  </soap:Body>\n</soap:Envelope>"
            },
            "assertions": {
                "status": 200
            }
        }
    ]
}
```

## How It Works Under the Hood

The proxy client injects the corporate proxy details from your properties file using `@Named` annotations:

```java
public class SslTrustCorporateProxyHttpClient extends BasicHttpClient {

    @Inject
    @Named("corporate.proxy.host")
    private String proxyHost;

    @Inject
    @Named("corporate.proxy.port")
    private int proxyPort;

    @Inject
    @Named("corporate.proxy.username")
    private String proxyUserName;

    @Inject
    @Named("corporate.proxy.password")
    private String proxyPassword;

    // Builds an HttpClient with proxy credentials and SSL trust
}
```

You can also create your own custom `HttpClient` by extending `BasicHttpClient` and injecting the same proxy properties. See the [Apache HttpClient proxy authentication example](https://hc.apache.org/httpcomponents-client-ga/httpclient/examples/org/apache/http/examples/client/ClientProxyAuthentication.java) for reference.

## When to Use Which Client

| Client | Use When |
|--------|----------|
| `SslTrustCorporateProxyHttpClient` | SOAP endpoint uses HTTPS and you need to bypass certificate validation (e.g. self-signed certs in test environments) |
| `CorporateProxyNoSslContextHttpClient` | SOAP endpoint does not require SSL, or SSL is handled separately |

## Source Code Reference

- [SslTrustCorporateProxyHttpClient.java](https://github.com/authorjapps/zerocode/blob/master/core/src/main/java/org/jsmart/zerocode/core/httpclient/ssl/SslTrustCorporateProxyHttpClient.java)
- [CorporateProxyNoSslContextHttpClient.java](https://github.com/authorjapps/zerocode/blob/master/core/src/main/java/org/jsmart/zerocode/core/httpclient/ssl/CorporateProxyNoSslContextHttpClient.java)
- [SoapCorpProxySslHttpClientTest.java](https://github.com/authorjapps/zerocode/blob/master/core/src/test/java/org/jsmart/zerocode/core/soap/SoapCorpProxySslHttpClientTest.java)