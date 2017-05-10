---
layout: full.html
algolia: true
title: The Plugin System
---

# The Plugin System

Being able to grab a full-feature backend and run it quickly is very convenient, but Kuzzle is about more than that. As soon as you start developing real-life applications that live out in the wild, you need to **extend your backend with your own business-logic**.
That's quite legitimate: some logic is sensible and cannot live on the client.

For example, imagine your application needs to leverage a **third-party payment system**, such as Braintree. You don't want to put the client in charge of bearing API keys and tokens. Also, you will probably want to **keep track of orders** and payments, once the transactions successfully end. This should be also a concern of your backend. Also, you are not likely to allow your customers to purchase more items than available, right? At some point, **your backend has to validate the transaction** by comparing the ordered quantity with the available stocks.

To make sure Kuzzle fits whatever needs you might have, it includes a powerful **[Plugin System](/plugin-reference)** allowing you to add features to your server in a modular fashion. With Kuzzle Plugins you can:

* use an existing plugin from the Kuzzle Plugins ecosystem (such as the [OAuth2 Authentication strategy](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth) or the [MQTT Protocol](https://github.com/kuzzleio/kuzzle-plugin-mqtt));
* [create your own plugin](/plugin-reference/#writing-plugin-code) from scratch.

## Plugin Types

There are three main Plugin types, each one has specific features.

### Core Plugins

They are the most common type of plugins and are meant to extend the Kuzzle Core features. They are plugged on the Kuzzle Core at startup and they share its execution thread. A Core Plugin can extend Kuzzle with the following features:

[Listen asynchronously](/plugin-reference#listener-plugins), and perform operations that depend on data-related events. The chunk of data involved with the event is passed to the triggered callback, but the Kuzzle Core continues its execution without waiting for the callback to return.

  _Example - "Write a log to a third-party log system every time a document is deleted"_. The [Logger Plugin](https://github.com/kuzzleio/kuzzle-plugin-logger), shipped with Kuzzle, uses this feature to log all the data-related events.

[Listen synchronously](/plugin-reference#pipe-plugins), and perform operations that depend on data-related events. Multiple synchronous listeners can be chained, forming a pipeline. The chunk of data involved with the event is passed to one plugin to another in the pipeline, and it can be modified. The Kuzzle Core waits for the pipeline to return and receives then processes the potentially modified value. A plugin can even stop a request life-cycle, by returning a standard Error to the Kuzzle Core.

  _Example - "Compare the ordered quantity with the available stocks and return an error if the amount of ordered items exceeds the stocks"_.

[Add a controller route](/plugin-reference#controllers) to expose new actions to the API.

  _Example - "Expose a `checkout` API endpoint that handles the Braintree payment process"_.

[Add an authentication strategy](/plugin-reference#authentication-plugin) to the User authentication system.

  _Example - "Enable Kuzzle to authenticate users via the OAuth strategy"_
  Kuzzle ships with an Authentication Plugin already bundled in its Community Edition, the [Local Strategy Plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local). Thanks to PassportJS, more than 300 authentication strategies are readily available.

### Worker Plugins

[Workers Plugins](/plugin-reference#worker-plugins) are Core Plugins running on separate processes. The only feature they can add is to [asynchronously listen to data-related events](/plugin-reference#listener-plugins). They are useful when performing costly operations as they have no impact on Kuzzle performances.

_Example - "Compute a complex data-mining operation and commit the result to a third-party Business-Intelligence platform every time a document is changed"._

### Protocol Plugins

[Protocol Plugins](/plugin-reference#protocol-plugins) extend Kuzzle networking capabilities by adding new network protocols.

_Example - "Enable Kuzzle to interact with XMPP-oriented services"_
Kuzzle ships with a Protocol Plugin already bundled in its Community Edition, the [MQTT Plugin](https://github.com/kuzzleio/kuzzle-plugin-mqtt).

## Examples

This example is a simplistic one: we are going to install the **Hello World Plugin**, adding a new API endpoint that simply... greets the client! Not very useful, except for the sake of this example.

To install a Plugin, you just need to make it accessible within the `plugins/enabled` directory (relative to the path of the Kuzzle installation directory). A common practice is to copy the Plugin code in the `plugins/available` directory, and to create a symbolic link in `plugins/enabled` pointing to it. This way, enabling and disabling a plugin is just a matter of creating or deleting a symbolic link.

<aside class="notice">
If you are running Kuzzle in a Docker container, you will need to enter the container to access the installation directory.
</aside>

Go to the Kuzzle installation directory and type:

```bash
$ cd plugins/available
$ git clone https://github.com/kuzzleio/kuzzle-plugin-helloworld.git
$ cd ../enabled
$ ln -s ../available/kuzzle-plugin-helloworld .
$ pm2 restart KuzzleServer
```

Once Kuzzle has restarted (that's what the last command is for) you can check the server information at `http://localhost:7512/?pretty=true` for the new `hello` endpoint:

```json
{
    ...
    "result": {
        "serverInfo": {
            "kuzzle": {
                ...
                "api": {
                    "routes":
                    ...
                    "kuzzle-plugin-helloworld/hello": {
                      "sayHello": {
                        "name": "sayHello"
                      }
                    }
                }
            }
        }
    }
}

```

Which means you can call the `http://localhost:7512/_plugin/kuzzle-plugin-helloworld/hello/` route and get the following response:

```json
{
  "requestId": "66265614-e908-4a91-a492-135e40e64aa3",
  "status": 200,
  "error": null,
  "controller": "kuzzle-plugin-helloworld/hello",
  "action": "sayHello",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "Hello world"
}
```

To get a deeper insight on how Plugins work in Kuzzle, please refer to the [Plugin Reference](/plugin-reference).

## Managing Plugins

To learn about how to manage or configure plugins, please check our [Plugin reference documentation].
