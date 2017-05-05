---
layout: full.html
title: Getting started
---

# Getting started

In this tutorial you will learn in a few steps how to **launch** Kuzzle and how to interact with it by **persisting data** and **being notified** when data is updated.

## Running Kuzzle

Before launching Kuzzle, ensure that your system matches the following pre-requisites:

- **Docker v1.10+**, see [instructions here](https://docs.docker.com/engine/installation/)
- **Docker-compose v1.8+**, see [intructions here](https://docs.docker.com/compose/install/)

<aside class="notice">
<b>Docker and Docker-compose are not mandatory</b>. Kuzzle can run outside a Docker container. This tutorial uses Docker as it simplifies a lot the startup process. If you wish to run Kuzzle without Docker, jump to the <a href="#manual-install">manual installation guide</a>.
</aside>

Thanks to Docker-compose, running Kuzzle is easy. Just grab the standard [docker-compose.yml](http://kuzzle.io/docker-compose.yml) file, copy it into a directory and start Kuzzle:

```bash
$ sudo sysctl -w vm.max_map_count=262144
$ wget http://kuzzle.io/docker-compose.yml
$ docker-compose up
```

<aside class="notice">
The "sysctl" command is needed by Elasticsearch v5.x. More details <a href="https://www.elastic.co/guide/en/elasticsearch/reference/5.x/vm-max-map-count.html">here</a>.
</aside>

Your terminal will show the log messages of Kuzzle's components starting. After only a few seconds, you should see the following ready message appear:

```
kuzzle_1         | [✔] Kuzzle server ready
```

Your Kuzzle server is now ready to be used. For instance, you can hit the main HTTP API endpoint by browsing the page <a href="http://localhost:7512?pretty=true">http://localhost:7512?pretty=true</a> or via cURL on the command line:

```bash
$ curl "http://localhost:7512/?pretty=true"
```

Kuzzle will respond you with a list of the existing routes.

<aside class="success">
Kuzzle is up and running. It will accept requests at <code>localhost:7512</code>:
<ul>
  <li>via <strong>standard HTTP requests,</strong></li>
  <li>via a <strong>Websocket</strong> client (like the <a href="https://github.com/kuzzleio/sdk-javascript">Javascript SDK</a>),</li>
  <li>via <strong>Socket.IO</strong> (used as a fallback by the SDK on browsers that do not provide Websocket support).</li>
</ul>
</aside>

<aside class="notice">
Having trouble? <a href="https://gitter.im/kuzzleio/kuzzle">Get in touch with us on Gitter!</a> We'll be happy to help.
</aside>

#### Where do we go from here?
Now that Kuzzle is running on your computer, you can dive into playing with it by:

* <a href="#running-kuzzle-backoffice">installing the Backoffice</a>, a handy way to manage data and security in Kuzzle;
* installing one of the available <a href="/sdk-reference/">Kuzzle SDK</a> to power-up one of your projects:
 * <a href="https://github.com/kuzzleio/sdk-javascript">Javascript</a> (check the <a href="#sdk-play-time">SDK play time</a> section below),
 * <a href="https://github.com/kuzzleio/sdk-php">PHP</a>,
 * <a href="https://github.com/kuzzleio/sdk-ios">iOS</a>,
 * <a href="https://github.com/kuzzleio/sdk-android">Android</a>;
* exploring the <a href="/api-reference/">Kuzzle API reference</a>;
* <a href="#manual-install">setting-up a Kuzzle Server without Docker</a>.

<aside class="notice">
You can also <a href="#installing-kuzzle-manually-on-linux">install Kuzzle manually</a>.
</aside>

## SDK play time

It's time to play with the [Kuzzle SDK](/sdk-reference). In this section, we will persist a document and subscribe to notifications in Kuzzle using the JS SDK.

Before proceeding, ensure that your system matches the following requisites:

* A fairly recent version of **NodeJS** (i.e. v6+) should be installed on your system (<a href="https://nodejs.org/en/download/">instructions here</a>),
* A Kuzzle server up and running.

### Create your first "Hello World" document

Create your playground directory and install the [Javascript SDK](/sdk-reference) from the command line using npm:

```bash
$ mkdir kuzzle-playground
$ cd kuzzle-playground
$ npm install kuzzle-sdk
```

Save the following JS code in the new `create.js` file:

```javascript
var Kuzzle = require('kuzzle-sdk')

// connect to the Kuzzle server
var kuzzle = new Kuzzle('localhost', {
    defaultIndex: 'playground'
  })

// get a reference to the a collection
var collection = kuzzle.collection('mycollection')

// define the document itself
var document = {
    message: 'Hello, world!'
}

// persist the document into the collection
collection.createDocument(document)
```

Run your file in NodeJS

```bash
$ node create.js
```

<aside class="success">
You have persisted your first document in Kuzzle. If you are running the Backoffice, you can use it to check the existence of the newly created document.
</aside>

<aside class="notice">
Having trouble? <a href="https://gitter.im/kuzzleio/kuzzle-bo">Get in touch with us on Gitter!</a> We'll be happy to help.
</aside>

_You can find more resources about Kuzzle SDK in the [SDK Documentation](/sdk-reference)._

### Subscribe to data changes (pub/sub)

Kuzzle provides pub/sub features that allow you to be notified in real-time on the state of your data (check the <a href="/sdk-reference/#room">Room Class Documentation</a> for a deep-dive on notifications).

Let's get started. Open a new termnial in the playground directory you created before and create the `subscribe.js` file containing the following code:

```javascript
var Kuzzle = require('kuzzle-sdk')

// connect to the Kuzzle server
var kuzzle = new Kuzzle('localhost', {
    defaultIndex: 'playground'
  })

// create a reference to the data collection
var collection = kuzzle.collection('mycollection')

// define a filter
var filter = {
    exists: {
        field: 'message'
    }
}

// create a subscription on the collection matching given filters
collection.subscribe(filter, function(error, result) {
    // this function is called each time kuzzle notifies us with a document matching our filters
    console.log('message received from kuzzle:', result)
})
```

Run your file in NodeJS

```bash
$ node subscribe.js
```

And let it wait for documents entering the scope of the filter.

Now, get back to the previous terminal window and execute once more the `create.js` script. Take a look at the output of the `subscribe.js` script. You will see that, each time a document with a `message` field is persisted in Kuzzle, a [notification](#realtime-notifications) is shown as standard output.

<aside class="success">
You just leveraged Kuzzle's pub/sub mechanism.
</aside>

<aside class="notice">
Having trouble? <a href="https://gitter.im/kuzzleio/kuzzle-bo">Get in touch with us on Gitter!</a> We'll be happy to help.
</aside>

#### Where do we go from here?
Now that you are started and operational with Kuzzle, you can fully leverage its power by:

* <a href="/sdk-reference">taking a look at the SDK reference</a>;
* <a href="/real-time-filters">mastering the Kuzzle real-time filtering syntax</a> to create incredibly fine-grained and blazing-fast subscriptions;
* <a href="/guide/#security">learning how to manage users and set-up fine-grained permission rights</a>.
