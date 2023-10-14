How to handle response with charset other than UTF-8 ?
===

Once the client executes the http call, then it receives the http response. Framework method takes care of handling the charset automatically if provided by the server, otherwise if defaults to `UTF-8` or any  `defaultCharset` set by the JVM. In case you need to handle it differently you can override the method `createCharsetResponse` in the class `httpclient.BasicHttpClient.java`

#### Note-
Override this method in case you want to make the Charset response differently for your project. Otherwise the framework falls back to this implementation by default which means- If the Charset is not set by the server framework will default to Charset.defaultCharset(), otherwise it will use the Charset sent by the server e.g. UAT-8 or UTF-16 or UTF-32 etc.

FYI-  
See implementation of java.nio.charset.Charset#defaultCharset. Here the default is UTF-8 if the defaultCharset is not set by the JVM, otherwise it picks the JVM provided defaultCharset