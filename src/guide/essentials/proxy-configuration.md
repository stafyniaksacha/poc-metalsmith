---
layout: full.html
algolia: true
title: Configuring Kuzzle proxy
---

# Configuring Kuzzle proxy

The **complete default configuration** of Kuzzle proxy is stored in the [proxyrc file](https://github.com/kuzzleio/kuzzle-proxy/blob/master/.proxyrc.sample) at the root of the installation directory.

Kuzzle proxy uses [rc](https://github.com/dominictarr/rc) to **override** its default configuration. The most common ways to do it is:

- via a `.proxyrc` file ([example here](https://github.com/kuzzleio/kuzzle-proxy/blob/master/.proxyrc.sample));
- via environment variables prefixed with `proxy_`.

## Logs

Kuzzle proxy uses two loggers: one is dedicated to output `access` logs, the second one is in charge of outputing `errors`.

### Default configuration

By default, on a fresh installation, Kuzzle proxy outputs both access and error logs to the console.  
The default format for access logs mimics [Apache combined log format](https://httpd.apache.org/docs/current/logs.html#combined).

For protocols other than http, the verb is arbitrary set to _DO_ and the url is computed based on the request `controller`, `action` and `index`, `collection` and `_id` if provided:

```
::ffff:172.23.0.1 - - [24/Apr/2017:14:02:19 +0000] "DO /server/now WEBSOCKET" 200 193 - -
```

### Custom logs configuration

Kuzzle proxy internally relies on [winston](https://github.com/winstonjs/winston) popular log library.

Any option given under `logs/<log type>/transport` will be passed as-is to Winston related transport.

<aside class="warning">As Kuzzle proxy configuration is stored in text mode, any option where Winston would accept a function is not supported</aside>

### Supported transports

Kuzzle proxy supports the following transports:

* [console](https://github.com/winstonjs/winston/blob/master/docs/transports.md#console-transport) (default)
* [file](https://github.com/winstonjs/winston/blob/master/docs/transports.md#file-transport)
* [elasticsearch](https://github.com/winstonjs/winston/blob/master/docs/transports.md#elasticsearch-transport)
* [syslog](https://github.com/winstonjs/winston-syslog)

#### Miscelaneous options

In addition to standard Winston options, Kuzzle proxy access logs accept two additional parameters:


| Option | Description |
| ------ | ----------- |
| **accessLogFormat** | Accepted values: **combined** (default) or **logstash**. If set to **logstash**, access logs are outputed in `JSON` |
| **accessLogIpOffset** | The offset starting from the right to extract the end-user ip address from the [`X-Forwarded-For`](https://en.wikipedia.org/wiki/X-Forwarded-For) header. This header is set by Kuzzle proxy protocols. The default value is _0_, which takes the last ip address from the header.<br>You may need to modify this value if Kuzzle is running behind a reverse proxy |

### Example - store logs to files

_.proxyrc_

```json
{
  "logs": {
    "access": {
      "transport": "file",
      "filename": "/var/logs/kuzzle/access.log",
      "json": false
    },
    "errors": {
      "transport": "file",
      "filename": "/var/logs/kuzzle/proxy-errors.log",
      "json": false,
      "maxsize": 15728640,
      "maxFiles": 10,
      "zippedArchive": true
    },
    "accessLogFormat": "combined",
    "accessLogIPOffset": 0
  }
}
```

<aside class="notice">
  Kuzzle proxy does not handle any log rotation by itself.<br>
  In the example above, error logs are configured to be rotated by winston but you will need to handle access logs rotation by yourself, for instance using logrotate.
</aside>
