### http-code

- 200 ok

  > 表明请求已经成功

- 201 Created

  > 代表成功的应答状态码，表示请求已经被成功处理，并且创建了新的资源

- 204 No Content

  > HTTP 204 No Content 成功状态响应码，表示该请求已经成功了，但是客户端客户不需要离开当前页面

- 206 Partial Content

  > HTTP 206 Partial Content 成功状态响应代码表示请求已成功，并且主体包含所请求的数据区间，该数据区间是在请求的 Range 首部指定的。

- 301 Moved Permanently

> 说明请求的资源已经被移动到了由 Location 头部指定的 url 上，是固定的不会再改变。搜索引擎会根据该响应修正。有缓存/SEO(收录重定向之后的页面)

- 302 Found

> HTTP 302 Found 重定向状态码表明请求的资源被暂时的移动到了由该 HTTP 响应的响应头 Location 指定的 URL 上。浏览器会重定向到这个 URL，但是搜索引擎不会对该资源的链接进行更新 (In SEO-speak, it is said that the link-juice is not sent to the new URL)可以修改 location （收录之前的页面）

- 304 Not Modified

  > HTTP 304 Not Modified 说明无需再次传输请求的内容，也就是说可以使用缓存的内容

- 307 Temporary Redirect

  > 状态码 307 与 302 之间的唯一区别在于，当发送重定向请求的时候，307 状态码可以确保请求方法和消息主体不会发生变化。如果使用 302 响应状态码，一些旧客户端会错误地将请求方法转换为 GET：也就是说，在 Web 中，如果使用了 GET 以外的请求方法，且返回了 302 状态码，则重定向后的请求方法是不可预测的；但如果使用 307 状态码，之后的请求方法就是可预测的。对于 GET 请求来说，两种情况没有区别

- 308 Permanent Redirect

  > 308 Permanent Redirect（永久重定向）是表示重定向的响应状态码，说明请求的资源已经被永久的移动到了由 Location 首部指定的 URL 上。浏览器会进行重定向，同时搜索引擎也会更新其链接（用 SEO 的行话来说，意思是“链接汁”（link juice）被传递到了新的 URL）。在重定向过程中，请求方法和消息主体不会发生改变，然而在返回 301 状态码的情况下，请求方法有时候会被客户端错误地修改为 GET 方法

- 400 Bad Request

  > HTTP 400 Bad Request 响应状态码表示由于语法无效，服务器无法理解该请求。客户端不应该在未经修改的情况下重复此请求

- 401 Unauthorized

  > 状态码 401 Unauthorized 代表客户端错误，指的是由于缺乏目标资源要求的身份验证凭证，发送的请求未得到满足。(未登陆)

- 403 Forbidden

  > 状态码 403 Forbidden 代表客户端错误，指的是服务器端有能力处理该请求，但是拒绝授权访问 （登陆）

- 405 Method Not Allowed

  > 状态码 405 Method Not Allowed 表明服务器禁止了使用当前 HTTP 方法的请求

- 500 Internal Server Error

  > 在 HTTP 协议中，500 Internal Server Error 是表示服务器端错误的响应状态码，意味着所请求的服务器遇到意外的情况并阻止其执行请求

- 502 Bad Gateway

  > 502 Bad Gateway 是一种 HTTP 协议的服务端错误状态代码，它表示作为网关或代理的服务器，从上游服务器中接收到的响应是无效的

- 504 Gateway Timeout
  > 504 Gateway Timeout 是一种 HTTP 协议的服务器端错误状态代码，表示扮演网关或者代理的服务器无法在规定的时间内获得想要的响应。
