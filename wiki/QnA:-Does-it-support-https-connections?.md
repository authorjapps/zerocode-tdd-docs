
The current apache http client used in the framework supports both `http` and `https` ssl/tls connections. But you can customize this if(your project needs) you need to add anything extra e.g. more authentication mechanism like tokens in the headers for your entire regression suite in a single/central place. 

Note- You can add token to the headers without customizing it(http client) too, that means you need to add to every test case. This depends on the use case and how we go about it.

See [table-of-contents](https://github.com/authorjapps/zerocode#table-of-contents--) for more.