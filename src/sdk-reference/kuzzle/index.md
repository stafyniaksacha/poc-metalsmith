---
layout: side-code.html
language-tab: true
algolia: true
title: Kuzzle
---

# Kuzzle

This is the main entry point to communicate with Kuzzle. Every other objects inherits properties from this one.

## Constructors

```js
var kuzzle = new Kuzzle('localhost', {
  defaultIndex: 'some index',
  autoReconnect: true,
  headers: {someheader: "value"},
  port: 7512
});

// A callback is also available and will be invoked once connected to the Kuzzle instance:
kuzzle = new Kuzzle('localhost', function (err, res) {
  // ...
});
```

```java
KuzzleOptions options = new KuzzleOptions();

options.setDefaultIndex("some index")
  .setAutoReconnect(true),
  .setHeaders(new JSONObject().put("someheader", "value"))
  .setPort(7512);

Kuzzle kuzzle = new Kuzzle("localhost", options, new ResponseListener<Void>() {
 @Override
 public void onSuccess(Void object) {
   // invoked once connected, object contains the kuzzle instance
 }

 @Override
 public void onError(JSONObject error) {
   // Handle connection error
 }
});
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost', [
  'defaultIndex' => 'some index',
  'port' => 7512
]);
```

Connects to a Kuzzle instance.

### Kuzzle(host, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``host`` | string | The server name (or the IP address) of a Kuzzle instance |
| ``options`` | JSON object | Optional Kuzzle connection configuration |
| ``callback`` | function | Optional callback |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``autoQueue`` | boolean | Automatically queue all requests during offline mode | ``false`` |
| ``autoReconnect`` | boolean | Automatically reconnect after a connection loss | ``true`` |
| ``autoReplay`` | boolean | Automatically replay queued requests on a ``reconnected`` event | ``false`` |
| ``autoResubscribe`` | boolean | Automatically renew all subscriptions on a ``reconnected`` event | ``true`` |
| ``connect`` | string | Manually or automatically connect to the Kuzzle instance | ``auto`` |
| ``defaultIndex`` | string | Set the default index to use | |
| ``headers`` | JSON object | Common headers for all sent documents | |
| ``volatile`` | JSON object | Common volatile data, will be sent to all future requests | |
| ``offlineMode`` | string | Offline mode configuration | ``manual`` |
| ``port`` | integer | Kuzzle network port | 7512 |
| ``queueTTL`` | integer | Time a queued request is kept during offline mode, in milliseconds | ``120000`` |
| ``queueMaxSize`` | integer | Number of maximum requests kept during offline mode | ``500`` |
| ``replayInterval`` | integer | Delay between each replayed requests, in milliseconds | ``10`` |
| ``reconnectionDelay`` | integer | number of milliseconds between reconnection attempts | ``1000`` |
| ``sslConnection`` | boolean | Switch Kuzzle connection to SSL mode | ``false`` |

**Notes:**

* the ``offlineMode`` option only accepts the ``manual`` and ``auto`` values

### Callback response

If the connection succeeds, resolves to the `Kuzzle` object itself.
If the `connect` option is set to `manual`, the callback will be called after the `connect` method is resolved.

## Properties

| Property name | Type | Description |
|---------------|------|-------------|
| ``autoQueue`` | boolean | Automatically queue all requests during offline mode |
| ``autoReconnect`` | boolean | Automatically reconnect after a connection loss |
| ``autoReplay`` | boolean | Automatically replay queued requests on a ``reconnected`` event |
| ``autoResubscribe`` | boolean | Automatically renew all subscriptions on a ``reconnected`` event |
| ``defaultIndex`` | string | Kuzzle's default index to use |
| ``headers`` | JSON object | Common headers for all sent documents. |
| ``host`` | string | Target Kuzzle host name/address |
| ``jwtToken`` | string | Token used in requests for authentication. |
| ``volatile`` | JSON object | Common volatile data, will be sent to all future requests |
| ``offlineQueue`` | JSON object | Contains the queued requests during offline mode |
| ``offlineQueueLoader`` | function | Called before dequeuing requests after exiting offline mode, to add items at the beginning of the offline queue |
| ``port`` | integer | Kuzzle network port |
| ``queueFilter`` | function | Called during offline mode. Takes a request object as arguments and returns a boolean, indicating if a request can be queued |
| ``queueMaxSize`` | integer | Number of maximum requests kept during offline mode |
| ``queueTTL`` | integer | Time a queued request is kept during offline mode, in milliseconds |
| ``replayInterval`` | integer | Delay between each replayed requests |
| ``reconnectionDelay`` | integer | Number of milliseconds between reconnection attempts |
| ``sslConnection`` | boolean | Connect to Kuzzle using SSL |

**Notes:**

* if ``connect`` is set to ``manual``, the ``connect`` method will have to be called manually
* the kuzzle instance will automatically queue all requests, and play them automatically once a first connection is established, regardless of the ``connect`` or offline mode option values.
* multiple methods allow passing specific ``volatile`` data. These ``volatile`` data will be merged with the global Kuzzle object ``volatile`` when sending the request, with the request specific ``volatile`` taking priority over the global ones.
* the ``queueFilter`` property is a function taking a JSON object as an argument. This object is the request sent to Kuzzle, following the [Kuzzle API](/api-reference/#query-syntax) format
* if ``queueTTL`` is set to ``0``, requests are kept indefinitely
* The offline buffer acts like a FIFO queue, meaning that if the ``queueMaxSize`` limit is reached, older requests are discarded to make room for new requests
* if ``queueMaxSize`` is set to ``0``, an unlimited number of requests is kept until the buffer is flushed
* the ``offlineQueueLoader`` must be set with a function, taking no argument, and returning an array of objects containing a `query` member with a Kuzzle query to be replayed, and an optional `cb` member with the corresponding callback to invoke with the query result
* updates to ``host``, ``port``, ``autoReconnect``, ``reconnectionDelay`` and ``sslConnection`` properties will only take effect on next ``connect`` call

## Offline mode

Working with an unstable network connection implies to handle what an application should be doing while being offline.  
Our goal is to provide our users with the right tools to handle such situations.


**There are two ways to handle a network disconnection**

* Stop all further communication with Kuzzle and invalidate the current instance and all its children. The application will have to manually instantiate a new Kuzzle object once the network has recovered. To do so, simply pass the ``autoReconnect`` option to ``false`` when starting a new Kuzzle instance.
* Reconnect automatically to Kuzzle when possible, and enter *offline mode*. This is the default behavior.

Offline mode simply refers to the time between a ``disconnected`` and a ``reconnected`` event.

**Handling subscriptions**

During offline mode, all subscriptions are kept indefinitely, with no maximum subscriptions retained.

By default, upon reconnection, all subscription are renewed. This behavior can be changed by setting the ``autoResubscribe`` to ``false``. In that case, each subscription must be renewed manually using the ``Room.renew`` method.

**Queuing requests while offline**

Requests can be queued while being offline, to be replayed once the network connection has been reestablished.  
By default, there is no request queuing.

You can:

* Queue all requests automatically when going offline by setting the ``autoQueue`` option to ``true``
* Start and stop queuing manually, by using the ``startQueuing`` and ``stopQueuing`` methods

The queue itself can be configured using the ``queueTTL`` and ``queueMaxSize`` options.

**Filter requests to be queued**

After request queuing is activated, by default, all requests are queued.

You can decide to filter some of these requests with the ``queueFilter`` property. This property must be set with a function taking the request to be queued as an argument, and it must return a boolean telling the Kuzzle SDK if the request can be queued or not.

Additionally, almost all methods accept a ``queuable`` option. If set to ``false``, the request will be discarded if the SDK is disconnected, and it will be played immediately with no queuing otherwise. This option bypasses the ``queueFilter`` property.


**Handling network reconnection**

Once a ``reconnected`` event is fired, you may replay the content of the queue with the ``replayQueue`` method. Or you can let the SDK replay it automatically upon reconnection, by setting the ``autoReplay`` option to ``true``.  

Requests are sent to Kuzzle with the ``replayInterval`` delay between each one of them.

Requests submitted while replaying the queue are delayed until the queue is empty, to ensure all requests are played in the right order.

<aside class="warning">
Setting <code>autoReplay</code> to <code>true</code> when using user authentication should generally be avoided.<br/>
When leaving offline-mode, the JWT Token validity is verified. If it has expired, the token will be removed and a <code>jwtTokenExpired</code> event will be fired.<br/>
If <code>autoReplay</code> is set, then all pending requests will be automatically played as an anonymous user.
</aside>


**Taking control of the offline queue**

You can be notified about what's going on about the offline queue, with the `offlineQueuePush` and the `offlineQueuePop` events.  

The `offlineQueuePush` event is fired whenever a request is queued. It provides to its listeners an object containing a `query` property, describing the queued request, and an optional `cb` property containing the corresponding callback, if any.

The `offlineQueuePop` event is fired whenever a request has been removed from the queue, either because the queue limits have been reached, or because the request has been replayed. It provides the removed request to its listeners.

The `offlineQueueLoader` property allows loading requests to the queue, **before any previously queued request**. It is invoked every time the SDK starts dequeuing requests.  
This property must be set with a function returning an array of objects with the following accessible properties: a `query` property, containing the request to be replayed, and an optional `cb` property pointing to the callback to invoke after the completion of the request.

Finally, if the provided methods don't give you enough control over the offline queue, you can access and edit the queue directly with the ``offlineQueue`` property.



**Automatic offline-mode**

You can set the ``offlineMode`` option to ``auto``. This configures the offline mode behavior with the following options:

* ``autoReconnect`` = ``true``
* ``autoQueue`` = ``true``
* ``autoReplay`` = ``true``
* ``autoResubscribe`` = ``true``


## Event Handling

The Kuzzle object listens to global events fired by Kuzzle. To subscribe or unsubscribe on these events, simply plug a callback function to the event you want to act upon, using the functions ``addListener`` and ``removeListener``.

Here is the list of these special events:

| Event Name | Callback arguments | Description |
|------------|-------------|-------------|
| ``connected`` | _(none)_ | Fired when the SDK has successfully connected to Kuzzle |
| `discarded` | `error` (object) | Fired when Kuzzle reject a request (e.g. request can't be parsed, request too large, ...) |
| ``disconnected`` | _(none)_ |  Fired when the current session has been unexpectedly disconnected |
| ``error`` | `error` (object) | Fired when the SDK has failed to connect to Kuzzle. Does not trigger offline mode. |
| ``jwtTokenExpired`` | _(none)_ |  Fired when Kuzzle rejected a request because the authentication token expired |
| ``loginAttempt`` | `{ "success": <boolean>, "error": "<error message>" }` |  Fired when a login attempt completes, either with a success or a failure result |
| ``offlineQueuePop`` | `query` (object) | Fired whenever a request is removed from the offline queue. |
| ``offlineQueuePush`` | `{ "query": <object>, "cb": <function> }` | Fired whenever a request is added to the offline queue |
| ``queryError`` | `error` (object), `query` (object) | Fired whenever Kuzzle responds with an error |
| ``reconnected`` | _(none)_ |  Fired when the current session has reconnected to Kuzzle after a disconnection, and only if ``autoReconnect`` is set to ``true`` |


**Note:** listeners are called in the order of their insertion.

## addListener

```js
  var listenerId = kuzzle.addListener('connected', function () {
    // Actions to perform when receiving a 'connected' global event
  });
```

```java
String listenerId = kuzzle.addListener(Event.connected, new EventListener() {
  @Override
  public void trigger() {
    // Actions to perform when receiving a 'connected' global event
  }
});
```

```php
<?php

$kuzzle->addListener('jwtTokenExpired', function() {
  // Actions to perform when receiving a 'jwtTokenExpired' global event
});

```

Adds a listener to a Kuzzle global event. When an event is fired, listeners are called in the order of their insertion.

See the [event handling](docs.kuzzle.io/sdk-reference/#event-handling) section for a full events list.

<aside class="notice">
The ID returned by this function is required if you want to remove this listener later.
</aside>

### addListener(event, listener)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``event`` | string | One of the event described in the ``Event Handling`` section of this documentation |
| ``listener`` | function | The function to call each time one of the registered event is fired |

### Return value

Returns a `string` containing an unique listener ID.

## checkToken

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.checkToken(token, function (err, res) {
  // ...
});

// Using promises (NodeJS only)
kuzzle.checkTokenPromise(token)
  .then(res => {
    // ...
  });
```

```java
kuzzle.checkToken("some jwt token", new ResponseListener<TokenValidity>() {
  @Override
  public void onSuccess(TokenValidity tokenInfo) {
    if (tokenInfo.isValid()) {
      // tokenInfo.getExpiresAt() returns the expiration timestamp
    }
    else {
      // tokenInfo.getState() returns the invalidity reason
    }
  }
});
```

```php
<?php

$result = $kuzzle->checkToken('some jwt token');

/*
$result = [
  'expiresAt' => 1468257834099, //timestamp in milliseconds
  'valid' => true
];
*/
```

> Callback response if the token is valid:

```json
{
  "expiresAt": 1454588077399,
  "valid": true
}
```

> Callback response if the token is invalid:

```json
{
  "valid": false,
  "state": "<invalidity reason>"
}
```

Checks the validity of a JSON Web Token.

### checkToken(token, callback)

<aside class="notice">
This method is non-queuable, meaning that during offline mode, it will be discarded and the callback will be called with an error.
</aside>

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``token``    | string   | The token to check |
| ``callback`` | function | Callback handling the response |

**Note:** this method sends an unauthenticated API call to Kuzzle, meaning it ignores the JWT Token property, even if it has been set.

### Callback response

A JSON object with a `valid` boolean property.  
If the token is valid, a `expiresAt` property is set with the expiration timestamp. If not, a `state` property is set explaining why the token is invalid.

## collection (property)

```js
var collection = kuzzle.collection('collection', 'index');

// or using a default index:
var
  kuzzle = new Kuzzle('localhost', {defaultIndex: 'index'});

collection = kuzzle.collection('collection');
```

```java
Collection collection = kuzzle.collection("collection", "index");

// or using a default index:
kuzzle.setDefaultIndex("index");
Collection collection = kuzzle.collection("collection");
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

// or using a default index:
$kuzzle = new Kuzzle('localhost', [
  'defaultIndex' => 'some index'
]);
$dataCollection = $kuzzle->collection('collection', 'index');
```

Instantiates a new Collection object.

### collection(collection, [index])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``collection`` | string | The name of the data collection you want to manipulate |
| ``index`` | string | The name of the index containing the data collection |

If no ``index`` is provided, the factory will take the default index set in the main Kuzzle instance. If no default index has been set, an error is thrown.

The ``index`` argument takes precedence over the default index.


### Return value

Returns a `Collection` object.

## connect

```js
kuzzle.connect();
```

```java
kuzzle.connect();
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Connects to the Kuzzle instance using the provided `host` in the constructor.
Has no effect if ``connect`` is set to ``auto``, unless ``disconnect`` has been called first.

### Return value

Returns the `Kuzzle` object to allow chaining.

### Callback response

If a callback has been provided to the `Kuzzle` constructor, it will be called with the `Kuzzle` instance once successfully connected

## disconnect

```js
kuzzle.disconnect();
```
```java
kuzzle.disconnect();
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Closes the current connection.

## flushQueue

```js
kuzzle.flushQueue();
```

```java
kuzzle.flushQueue();
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Empties the offline queue without replaying it.

### Return value

Returns the `Kuzzle` object to allow chaining.

## createIndex

```js
// Using callbacks (node.js or browser)
kuzzle.createIndex('myIndex', function (err, res) {
  console.log(res);     // {acknowledge: true}
});

// Using promises (node.js)
kuzzle
  .createIndexPromise('myIndex')
  .then(res => {
    console.log(res);   // {acknowledge: true}
  });
```

```java
kuzzle.createIndex("myIndex", new ResponseListener<Boolean>() {
  @Override
  public void onSuccess(JSONObject result) {
    // result var contains the creation status of myIndex.
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
}
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$result = $kuzzle->createIndex('myIndex');

// $result = [acknowledge => true]
```

Create a new empty data index, with no associated mapping.

#### createIndex([index], [options], callback)

| Arguments | Type | Description
|-----------|------|------------
| `index` | string | Optional index to query. If no set, defaults to [Kuzzle.defaultIndex](#properties)
| `options` | JSON object | Optional parameters
| `callback`| function | Callback handling the response

Available options:

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Mark this request as (not) queuable | `true`

#### Callback response

The response is a an object reflecting the index `create` status.


## getAllStatistics

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.getAllStatistics(function (err, stats) {
  stats.forEach(function (frame) {
    // loop through all returned frames
  });
});

// Using promises (NodeJS only)
kuzzle
  .getAllStatisticsPromise()
  .then(stats => {
    stats.forEach(function (frame) {
      // loop through all returned frames
    });
  });
```

```java
kuzzle.getAllStatistics(new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray object) {
    // loop through all returned frames
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
};
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$stats = $kuzzle->getAllStatistics();

foreach($stats as $frame) {
  // loop through all returned frames
}
```

> Callback response example:

```json
[{ "connections": { "socketio": 1 },
    "ongoingRequests": { "rest": 0, "socketio": 0 },
    "completedRequests": { "mqtt": 37, "socketio": 17 },
    "failedRequests": { "socketio": 1 },
    "timestamp": "1453110641308" },
  { "connections": { "socketio": 1 },
    "ongoingRequests": { "rest": 0, "socketio": 0 },
    "completedRequests": { "socketio": 34 },
    "failedRequests": { "socketio": 3 },
    "timestamp": "1453110642308" },
  { "connections": {},
    "ongoingRequests": { "rest": 0, "socketio": 0 },
    "completedRequests": { "socketio": 40 },
    "failedRequests": {},
    "timestamp": "1453110643308" }]
```

Kuzzle monitors active connections, and ongoing/completed/failed requests.  
This method returns all available statistics from Kuzzle.

### getAllStatistics([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |


### Callback response

The response is an array of JSON objects, each one of them being a statistic frame.

## getAutoRefresh

```js
// Using callbacks (node.js or browser)
kuzzle.getAutoRefresh('myIndex', function (err, autoRefresh) {
  console.log(autoRefresh);     // true|false
});

// Using promises (node.js)
kuzzle
  .getAutoRefreshPromise('myIndex')
  .then(autoRefresh => {
    console.log(autoRefresh);   // true|false
  });
```

```java
kuzzle.getAutoRefresh("myIndex", new ResponseListener<Boolean>() {
  @Override
  public void onSuccess(Boolean autoRefresh) {
    // autoRefresh var contains the autoRefresh status of myIndex.
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
}
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$result = $kuzzle->getAutoRefresh('myIndex');

// $result = true | false
```

The `autoRefresh` flag, when set to true, will make Kuzzle perform a
[`refresh`](https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api) request
immediately after each write request, forcing the documents to be immediately visible to search.

The `getAutoRefresh` function returns the current `autoRefresh` status for the given index.

<aside class="left warning">
    <p>
        A refresh operation comes with some performance costs.
    </p>
    <p>
        While forcing the autoRefresh can be convenient on a development or test environmnent, it is advised to avoid
        using it on production or at least to carefully monitor its implications before using it.
    </p>
</aside>

#### getAutoRefresh([index], [options], callback)

| Arguments | Type | Description
|-----------|------|------------
| `index` | string | Optional index to query. If no set, defaults to [Kuzzle.defaultIndex](#properties)
| `options` | JSON object | Optional parameters
| `callback`| function | Callback handling the response

Available options:

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Mark this request as (not) queuable | `true`

#### Callback response

The response is a boolean reflecting the index `autoRefresh`status.

## getJwtToken

```js
var jwtToken = kuzzle.getJwtToken();
```

```java
String jwtToken = kuzzle.getJwtToken();
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
// ...
$token = $kuzzle->getJwtToken();
```

Get internal jwtToken used to request kuzzle.

### getJwtToken()

### Return value

Returns the `jwtToken` property to export previous kuzzle logged connection.


## getMyRights

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .getMyRights(function(error, result) {
    // result is a JSON object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .getMyRightsPromise()
  .then((result) => {
    // result is a JSON object
  });
```

```java

kuzzle
  .security
  .getMyRights(new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject rights) {
        // result is a JSON object
    }

    @Override
    public void onError(JSONObject error) {
        // Handle error
    }
  });
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$result = $kuzzle->security()->getMyRights();

// $result is an array
```

> Callback response example:

```js
[
  {
    controller: 'my-controller', action: 'my-action', index: '*', collection: '*',
    value: 'allowed'
  },
  {
    controller: 'another-controller', action: '*', index: 'my-index', collection: '*',
    value: 'conditional'
  }
]
```

Gets the rights of the current user

#### getMyRights([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

#### Callback response

Resolves to a `JSON` object.

## getServerInfo

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.getServerInfo(function (err, stats) {
  // ...
});

// Using promises (NodeJS only)
kuzzle.getServerInfoPromise()
  .then(infos => {
  // ...  
  });
```

```java
kuzzle.getServerInfo(new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject result) {
    // Handle success
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
});
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$result = $kuzzle->getServerInfo();

// $result is an array
```

> Callback response example:

```json
{
  "kuzzle": {
    "api": {
      "routes": {
        "admin": [
          "deleteCollection",
          "putMapping",
          "getMapping",
          "getStats",
          "getLastStats",
          "getAllStats",
          "truncateCollection",
          "putRole",
          "deleteIndexes",
          "createIndex",
          "deleteIndex",
          "removeRooms"
        ],
        "auth": [
          "login"
        ],
        "bulk": [
          "import"
        ],
        "read": [
          "search",
          "get",
          "count",
          "listCollections",
          "now",
          "listIndexes",
          "serverInfo"
        ],
        "subscribe": [
          "on",
          "join",
          "off",
          "count",
          "list"
        ],
        "write": [
          "create",
          "publish",
          "createOrUpdate",
          "update",
          "delete",
          "deleteByQuery",
          "createCollection"
        ]
      },
      "version": "1.0"
    },
    "memoryUsed": 99901440,
    "nodeVersion": "v4.2.1",
    "plugins": {
      "kuzzle-plugin-auth-passport-local": {
        "activated": true,
        "hooks": [
          "auth:loadStrategies"
        ],
        "name": "kuzzle-plugin-auth-passport-local"
      },
      "kuzzle-plugin-logger": {
        "activated": true,
        "hooks": [
          "log:silly",
          "log:verbose",
          "log:info",
          "log:debug",
          "log:warn",
          "log:error",
          "data:*",
          "subscription:*",
          "websocket:*",
          "prepare:*",
          "cleanDb:done",
          "cleanDb:error",
          "server:*",
          "rabbit:started",
          "rabbit:error",
          "rabbit:stopped",
          "internalBroker:*",
          "room:new",
          "room:remove",
          "workerGroup:loaded",
          "profiling:*"
        ],
        "name": "kuzzle-plugin-logger",
        "version": "1.0.6"
      },
      "kuzzle-plugin-socketio": {
        "activated": true,
        "hooks": [
          "protocol:broadcast",
          "protocol:joinChannel",
          "protocol:leaveChannel"
        ],
        "name": "kuzzle-plugin-socketio",
        "version": "1.0.4"
      }
    },
    "system": {
      "cpus": [
        {
          "model": "Intel(R) Core(TM) i5-4310M CPU @ 2.70GHz",
          "speed": 800,
          "times": {
            "idle": 8859265400,
            "irq": 500,
            "nice": 4325300,
            "sys": 115447100,
            "user": 497028200
          }
        },
        {
          "model": "Intel(R) Core(TM) i5-4310M CPU @ 2.70GHz",
          "speed": 2701,
          "times": {
            "idle": 8848628800,
            "irq": 400,
            "nice": 3648100,
            "sys": 115458300,
            "user": 495154300
          }
        },
        {
          "model": "Intel(R) Core(TM) i5-4310M CPU @ 2.70GHz",
          "speed": 1300,
          "times": {
            "idle": 8875594600,
            "irq": 4200,
            "nice": 3956800,
            "sys": 98348100,
            "user": 538083800
          }
        },
        {
          "model": "Intel(R) Core(TM) i5-4310M CPU @ 2.70GHz",
          "speed": 2701,
          "times": {
            "idle": 8801022600,
            "irq": 0,
            "nice": 3946300,
            "sys": 97387200,
            "user": 552344400
          }
        }
      ],
      "memory": {
        "free": 1651486720,
        "total": 16729739264
      }
    },
    "uptime": "161016.824s",
    "version": "0.9.2"
  },
  "services": {
    "internalCache": {
      "memoryPeak": "4.88M",
      "memoryUsed": "4.88M",
      "mode": "standalone",
      "type": "redis",
      "version": "3.0.2"
    },
    "readEngine": {
      "api": "1.7",
      "lucene": "4.10.4",
      "nodes": {
        "count": {
          "client": 0,
          "data_only": 0,
          "master_data": 1,
          "master_only": 0,
          "total": 1
        },
        "fs": {
          "available": "5.5gb",
          "available_in_bytes": 5996474368,
          "free": "7.4gb",
          "free_in_bytes": 8013250560,
          "total": "36.5gb",
          "total_in_bytes": 39237341184
        },
        "jvm": {
          "max_uptime": "1.9d",
          "max_uptime_in_millis": 171087444,
          "mem": {
            "heap_max": "990.7mb",
            "heap_max_in_bytes": 1038876672,
            "heap_used": "51.8mb",
            "heap_used_in_bytes": 54394592
          },
          "threads": 75,
          "versions": [
            {
              "count": 1,
              "version": "1.8.0_66-internal",
              "vm_name": "OpenJDK 64-Bit Server VM",
              "vm_vendor": "Oracle Corporation",
              "vm_version": "25.66-b01"
            }
          ]
        },
        "os": {
          "available_processors": 4,
          "cpu": [
            {
              "cache_size": "3kb",
              "cache_size_in_bytes": 3072,
              "cores_per_socket": 16,
              "count": 1,
              "mhz": 2701,
              "model": "Core(TM) i5-4310M CPU @ 2.70GHz",
              "total_cores": 4,
              "total_sockets": 4,
              "vendor": "Intel"
            }
          ],
          "mem": {
            "total": "15.5gb",
            "total_in_bytes": 16729739264
          }
        },
        "plugins": [],
        "process": {
          "cpu": {
            "percent": 0
          },
          "open_file_descriptors": {
            "avg": 190,
            "max": 190,
            "min": 190
          }
        },
        "versions": [
          "1.5.2"
        ]
      },
      "spaceUsed": "14.5kb",
      "status": "red",
      "type": "elasticsearch",
      "version": "1.5.2"
    }
  }
}
```

Retrieves information about Kuzzle, its plugins and active services.

### getServerInfo([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Optional callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Callback response

Resolves to a JSON object containing server information.

## getStatistics

> Without argument, retrieves the last statistic frame in an array:

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.getStatistics(function (err, stats) {
  // ...
});

// Using promises (NodeJS only)
kuzzle
  .getStatisticsPromise()
  .then(stats => {
    // ...
  });
```

```java
kuzzle.getStatistics(new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject object) {
    // ...
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
});
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$result = $kuzzle->getStatistics();

// $result is an array
```

> Callback response:

```json
[{ "connections": { "socketio": 1 },
    "ongoingRequests": { "rest": 0, "socketio": 0 },
    "completedRequests": { "mqtt": 37, "socketio": 17 },
    "failedRequests": { "socketio": 1 },
    "timestamp": "1453110641308" }]
```

> When providing a timestamp, retrieves all frames recorded after that timestamp:

```js
// Date can be either in ISO format or a timestamp (utc, in milliseconds)
var ts = Date.parse('2015-10-26T12:19:10.213Z');

// Using callbacks (NodeJS or Web Browser)
kuzzle.getStatistics(ts, function (err, stats) {
  // ...
});

// Using promises (NodeJS only)
kuzzle
  .getStatisticsPromise(ts)
  .then(stats => {
    // ...
  });
```

```java
// Date can be either in ISO format or a timestamp (utc, in milliseconds)
kuzzle.getStatistics("2015-11-15T13:36:45.558Z", new KuzzleResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray results) {
    // ...
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
};
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
// Date can be either in ISO format or a timestamp (utc, in milliseconds)
$date = time() * 1000;
$result = $kuzzle->getStatistics($date);

// $result is an array
```

> Callback response:

```json
[{ "connections": { "socketio": 1 },
    "ongoingRequests": { "rest": 0, "socketio": 0 },
    "completedRequests": { "mqtt": 37, "socketio": 17 },
    "failedRequests": { "socketio": 1 },
    "timestamp": "1453110641308" },
  { "connections": { "socketio": 1 },
    "ongoingRequests": { "rest": 0, "socketio": 0 },
    "completedRequests": { "socketio": 34 },
    "failedRequests": { "socketio": 3 },
    "timestamp": "1453110642308" },
  { "connections": {},
    "ongoingRequests": { "rest": 0, "socketio": 0 },
    "completedRequests": { "socketio": 40 },
    "failedRequests": {},
    "timestamp": "1453110643308" }]
```

Kuzzle monitors active connections, and ongoing/completed/failed requests.  
This method allows getting either the last statistics frame, or a set of frames starting from a provided timestamp.

### getStatistics([timestamp], [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``timestamp`` | Epoch time | Optional starting time from which the frames are to be retrieved |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

**Note:** Kuzzle statistics are cleaned up regularly. If the timestamp is set too far in the past, then this method will return all available statistics.

### Callback response

Resolves to an `array` containing one or more statistics frame(s), as JSON objects.

## listCollections

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.listCollections('index', {type: 'stored', from: 0, size: 42}, function (err, collections) {
  // ...
});

// Using promises (NodeJS only)
kuzzle
  .listCollectionsPromise('index', {type: 'stored'})
  .then(collections => {
    // ...
  });
```

```java
kuzzle.listCollections("index", new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject object) {
    // ...
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
});
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$collections = $kuzzle->listCollections('index', [
  'type' => 'stored',
  'from' => 0,
  'size' => 42
]);
```

> Callback response:

```json
[
  {"name": "realtime_1", "type": "realtime"},
  {"name": "realtime_2", "type": "realtime"},
  {"name": "realtime_...", "type": "realtime"},
  {"name": "realtime_n", "type": "realtime"},
  {"name": "stored_1", "type": "stored"},
  {"name": "stored_2", "type": "stored"},
  {"name": "stored_...", "type": "stored"},
  {"name": "stored_n", "type": "stored"}
]
```

Retrieves the list of known data collections contained in a specified index.

### listCollections([index], [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``index`` | string | Index containing the collections to be listed |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``from`` | integer | Determines the starting point of the pagination. By default, start at the beggining | ``0`` |
| ``size`` | integer | Determines the size of the returned result set. By default, no limit is applied | ``undefined`` |
| ``type`` | string | Get either ``stored`` collections or ``realtime`` ones. By default, list ``all`` collections | ``all`` |


If no `index` argument is provided, the `defaultIndex` property is used. If no default index is found, this method throws an error.

### Callback response

Resolves to a `JSON object` containing the list of stored and/or realtime collections on the provided index.

## listIndexes

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.listIndexes(function (err, indexes) {
  // ...
});

// Using promises (NodeJS only)
kuzzle
  .listIndexesPromise()
  .then(indexes => {
    // ...
  });
```

```java
kuzzle.listIndexes(new ResponseListener<String[]>() {
  @Override
  public void onSuccess(String[] result) {
    // ...
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
});
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$indexes = $kuzzle->listIndexes();
```

> Callback response:

```json
[ "index", "another index", "..."]
```

Retrieves the list of indexes stored in Kuzzle.

### listIndexes([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Callback response

The response is an `array` of index names.


## login

<aside class="notice">
This method is non-queuable, meaning that during offline mode, it will be discarded and the callback will be called with an error.
</aside>

```js
// Expiration time is expressed as a string following the
// time conversion library: https://www.npmjs.com/package/ms
 var expiresIn = "1h";

// Using callbacks (NodeJS or Web Browser)
kuzzle.login("local", {username: "username", password: "password"}, expiresIn, function (err, res) {
  // ...
});

// Using promises (NodeJS only)
kuzzle.loginPromise("local", {username: "username", password: "password"}, expiresIn)
  .then(res => {
    // ...
  });
```

```java
JSONObject credentials = new JSONObject()
  .put("username", "John Doe")
  .put("password", "my secret password");

kuzzle.login("local", credentials, 30000, new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject result) {
    // ...
  }

  @Override
  public void onError() {
    // Handle error
  }
});
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

// Expiration time is expressed as a string following the
// time conversion library: https://www.npmjs.com/package/ms
$expiresIn = "1h";

try {
  $result = $kuzzle->login('local', [
    'username' => 'myusername',
    'password' => 'secret'
  ], $expiresIn);

  // ...
}
catch (ErrorException $e) {
  // Handle error
}
```

Log a user according to a strategy and credentials.

If the Kuzzle response contains a JWT Token, the SDK token is set and the `loginAttempt` event is fired immediately with the following object:
`{ success: true }`
This is the case, for instance, with the `local` authentication strategy.

If the request succeeds but there is no token, then it means that the chosen strategy is a two-steps authentication method, like OAUTH. In that case, the `loginAttempt` event is **not** fired. To complete the login attempt, the `setJwtToken` method must be called either with a token or with an appropriate Kuzzle response.

If the login attempt fails, the `loginAttempt` event is fired with the following response:  
`{ success: false, error: 'error message' }`

### login(strategy, [credentials], [expiresIn], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``strategy`` | string | Authentication strategy (local, facebook, github, ...) |
| ``credentials`` | JSON object | Optional login credentials, depending on the strategy |
| ``expiresIn`` | \<varies\> | Login expiration time |
| ``callback`` | function | Optional callback handling the response |

**Note:** If the ``expiresIn`` argument is not set, the default token expiration value will be taken from the Kuzzle server configuration.

By default, kuzzle embed the plugin [kuzzle-plugin-auth-passport-local](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local) which provide `local` stored password authentication strategy.
This strategy require `username` and `password` as `credentials`

### Callback response

Resolves to a JSON object containing the Kuzzle response.

## logout

<aside class="notice">
This method is non-queuable, meaning that during offline mode, it will be discarded and the callback will be called with an error.
</aside>

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.logout(function (err, res) {
  // ...
});

// Using promises (NodeJS only)
kuzzle.logoutPromise()
  .then(res => {
    // ...
  });
```

```java
kuzzle.logout(new ResponseListener<Void>() {
  @Override
  public void onSuccess(Void result) {
    // ...
  }

  @Override
  public void onError() {
    // Handle error
  }
});
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

try {
  $kuzzle->logout();
  // everything went fine
}
catch (ErrorException $e) {

}
```

Logs the user out.

### logout([callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``callback`` | function | Optional callback handling the response |

This method empties the `jwtToken` property

### Return value

Returns the `Kuzzle` object to allow chaining.

### Callback response

Resolves to the `Kuzzle` object itself once the logout process is complete, either successfully or not.  
The `Kuzzle` object will unset the property `jwtToken` if the user is successfully logged out.

## memoryStorage (property)

A `MemoryStorage` singleton.

## now

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.now(function (err, res) {
  // 'res' contains the Kuzzle timestamp (utc, in milliseconds)
});

// Using promises (NodeJS only)
kuzzle.nowPromise().then(res => {
  // 'res' contains the Kuzzle timestamp (utc, in milliseconds)
});
```

```java
kuzzle.now(new ResponseListener<Date>() {
  @Override
  public void onSuccess(Date object) {
    // 'object' contains the Kuzzle timestamp (utc, in milliseconds)
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
});
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$kuzzleTime = $kuzzle->now();

// $kuzzleTime instanceof DateTime
```

> Callback response:

```json
1447151167622
```

Retrieves the current Kuzzle time.

### now([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |


### Callback response

Returns a `integer` containing the current Kuzzle time, encoded as an UTC Epoch time in milliseconds.

## query

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.query({controller: 'document', action: 'search'}, {match: { message: 'this is a test' }}, function (err, res) {
  // ...
});

// Using promises (NodeJS only)
kuzzle
  .queryPromise({controller: 'document', action: 'search'}, {match: { message: 'this is a test' }})
  .then(result => {

  });
```

```java
QueryArgs args = new QueryArgs();
args.controller = "document";
args.action = "search";
kuzzle.query(args, new JSONObject(), new OnQueryDoneListener() {
  @Override
  public void onSuccess(JSONObject object) {

  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
});
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$queryArgs = [
  'controller' => 'document',
  'action' => 'search'
];

$query = [
  'filter' => [
    'equals' => ['field' => 'value']
  ]
];

try {
  $response = $kuzzle->query($queryArgs, $query);
  // var_dump($response['result']['hits']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{ "error": null,
  "result": {
    "_shards": {
      "failed": 0,
      "successful": 5,
      "total": 5
    },
    "_source": {},
    "action": "search",
    "collection": "foo",
    "controller": "document",
    "hits": {
      "hits": [],
      "max_score": 0,
      "total": 0
    },
    "requestId": "bf87b930-7c02-11e5-ab10-dfa9e9fd2e07",
    "timed_out": false,
    "took": 1
  }
}
```

<aside class="warning">
This is a low-level method, exposed to allow advanced SDK users to bypass high-level methods.<br/>
Check the Kuzzle API Reference available <a href="/api-reference">here</a>
</aside>

Base method used to send queries to Kuzzle, following the [API Reference](/api-reference)

### query(queryArgs, query, [options], [callback])

| Argument | Type | Description |
|---------------|---------|----------------------------------------|
| ``queryArgs`` | JSON object | Query base arguments |
| ``query`` | JSON object | Query to execute |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Optional callback |


Expected `queryArgs` content:

| Option | Type | Description |  Required? |
|---------------|---------|----------------------------------------|---------|
| ``controller`` | string | API Controller argument | required |
| ``action`` | string | API Controller action | required |
| ``index`` | string | Index concerned by the action | optional |
| ``collection`` | string | Data collection concerned by the action | optional |


Available `options`:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `Kuzzle` object to allow chaining.

### Callback response

Resolves to a `JSON object` containing the raw Kuzzle response.


## refreshIndex

```js
kuzzle.refreshIndex('myIndex');
```

```java
kuzzle.refreshIndex("myIndex");
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

try {
  $kuzzle->refreshIndex('myIndex');
}
catch (ErrorException $e) {

}
```

When writing or deleting documents in Kuzzle's database layer, the update needs to be indexed before being reflected
in the search index.  
By default, this operation can take up to 1 second.

Given an index, the `refresh` action forces a [`refresh`](https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api),
 on it, making the documents visible to search immediately.

<aside class="left warning">
    A refresh operation comes with some performance costs.<br>
    <br>
    From <a href="https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api">elasticsearch documentation</a>:
    <div class="quote">
    "While a refresh is much lighter than a commit, it still has a performance cost. A manual refresh can be useful when writing tests, but don’t do a manual refresh every time you index a document in production; it will hurt your performance. Instead, your application needs to be aware of the near real-time nature of Elasticsearch and make allowances for it."
    </div>
</aside>

#### refreshIndex([index], [options], [callback])

| Argument | Type | Description
|----------|------|-------------
| `index` | string | _Optional_. The index to refresh. If not set, defaults to [kuzzle.defaultIndex](#properties).
| `options` | JSON object | Optional parameters
| `callback` | function | _Optional_. Callback handling the response.

Available options:

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Mark this request as (not)queuable | `true`

#### Return value

Returns the `Kuzzle` object to allow chaining.

#### Callback response

The response is a JSON structure matching the response from Elasticsearch.


## removeAllListeners

```js
// Removes all listeners on the "unsubscribed" global event
kuzzle.removeAllListeners('disconnected');

// Removes all listeners on all global events
kuzzle.removeAllListeners();
```

```java
// Removes all listeners on the "unsubscribed" global event
kuzzle.removeAllListeners(Event.disconnected);

// Removes all listeners on all global events
kuzzle.removeAllListeners();
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

// Removes all listeners on the "jwtTokenExpired" global event
$kuzzle->removeAllListeners('jwtTokenExpired');

// Removes all listeners on all global events
$kuzzle->removeAllListeners();
```

Removes all listeners, either from a specific event or from all events

### removeAllListeners([event])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``event`` | string | One of the event described in the ``Event Handling`` section of this documentation |

#### Return value

Returns the `Kuzzle` object to allow chaining.

## removeListener

```js
kuzzle.removeListener('disconnected', listenerId);
```

```java
kuzzle.removeListener(Event.disconnected, "listenerId");
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$kuzzle->removeListener('jwtTokenExpired', $listenerId);
```

Removes a listener from an event.

### removeListener(event, listenerID)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``event`` | string | One of the event described in the ``Event Handling`` section of this documentation |
| ``listenerID`` | string | The ID returned by ``addListener`` |

#### Return value

Returns the `Kuzzle` object to allow chaining.

## replayQueue

```js
kuzzle.replayQueue();
```

```java
kuzzle.replayQueue();
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Replays the requests queued during offline mode. Works only if the SDK is not in a ``disconnected`` state, and if the ``autoReplay`` option is set to ``false``.

### Return value

Returns the `Kuzzle` object to allow chaining.

## security (property)

A `Security` singleton.

## setAutoRefresh

```js
kuzzle.setAutoRefresh('myIndex', true);
```


```java
kuzzle.setAutoRefresh("myIndex", true);
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$kuzzle->setAutoRefresh('myIndex', true);
```

The `autoRefresh` flag, when set to true, will make Kuzzle perform a
[`refresh`](https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api) request
immediately after each write request, forcing the documents to be immediately visible to search.

Given an index, the `setAutoRefresh` function updates its `autoRefresh` status.

<aside class="left warning">
    <p>
        A refresh operation comes with some performance costs.
    </p>
    <p>
        While forcing the autoRefresh can be convenient on a development or test environmnent, it is advised to avoid
        using it on production or at least to carefully monitor its implications before using it.
    </p>
</aside>

#### setAutoRefresh([index], autoRefresh, [options], [callback])

| Argument | Type | Description
|----------|------|-------------
| `index` | string | _Optional_ The index to set the `autoRefresh` for. If not set, defaults to [kuzzle.defaultIndex](#properties).
| `autoRefresh` | boolean | The value to set for the `autoRefresh` setting.
| `options` | JSON object | Optional parameters
| `callback` | function | _Optional_ Callback handling the response

Available options:

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Makr this request as (non)queuable | `true`

#### Return value

Returns the `Kuzzle` object to allow chaining.

#### Callback response

The response is a boolean reflecting the new `autoRefresh` status.

## setDefaultIndex

```js
kuzzle.setDefaultIndex('index');
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$kuzzle->setDefaultIndex('myIndex');
```

Set the default data index. Has the same effect than the `defaultIndex` constructor option.

### Return value

Returns the `Kuzzle` object to allow chaining.

## updateSelf

```js
var newContent = {
  firstname: 'My Name Is',
  lastname: 'Jonas'
};


// Using callbacks (NodeJS or Web Browser)
kuzzle
  .updateSelf(newContent, function (err, updatedUser) {

  });

// Using promises (NodeJS)
kuzzle
  .updateSelfPromise(newContent)
  .then(updatedUser => {

  });
```

```java
JSONObject newContent = new JSONObject()
  .put("firstname", "My Name Is")
  .put("lastname", "Jonas");

kuzzle
  .updateSelf(newContent, new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject user) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php
use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$kuzzle = new Kuzzle('localhost');
$newContent = [
  'firstname' => 'My Name Is',
  'lastname' => 'Jonas'
];

try {
  $updatedUser = $kuzzle->updateSelf($newContent);
  // $updatedUser instanceof User
}
catch (ErrorException $e) {

}
```

#### updateSelf(content, [options], [callback])

Performs a partial update on the current user.

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | A plain javascript object representing the user |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

#### Return value

Returns the `Kuzzle` object to allow chaining.

#### Callback response

Resolves to the updated user plain object.


## setHeaders

```js
kuzzle.setHeaders({someContent: 'someValue'}, true);
```

```java
JSONObject headers = new JSONObject().put("someContent", "someValue");

kuzzle.setHeaders(headers, true);
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$newHeaders = [
  'someContent' => 'someValue'
];

$kuzzle->setHeaders($newHeaders);
```

This is a helper function returning itself, allowing to easily chain calls.

### setHeaders(content, [replace])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | New content |
| ``replace`` | boolean | true: replace the current content with the provided data, false: merge it |

**Note:** by default, the ``replace`` argument is set to ``false``

### Return value

Returns the `Kuzzle` object to allow chaining.

## setJwtToken

```js
// Directly with a JWT Token
kuzzle.setJwtToken('some jwt token');

/*
 Or with a Kuzzle response.
 For instance, the final OAUTH2 response is obtained with a redirection from Kuzzle,
 and it can be provided to this method directly
 */
kuzzle.setJwtToken(authenticationResponse);
```

```java
// Directly with a JWT Token
kuzzle.setJwtToken("some jwt token");

/*
 Or with a Kuzzle response.
 For instance, the final OAUTH2 response is obtained with a redirection from Kuzzle,
 and it can be provided to this method directly.

 Here, "authenticationResponse" is an instance of JSONObject
 */
kuzzle.setJwtToken(authenticationResponse)
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

// Directly with a JWT Token
$kuzzle->setJwtToken('some jwt token');


/*
 Or with a Kuzzle response.
 For instance, the final OAUTH2 response is obtained with a redirection from Kuzzle,
 and it can be provided to this method directly
 */
 $kuzzle->setJwtToken($authenticationResponse);
```

Sets the internal JWT token which will be used to request kuzzle.

If the provided token is correct, a `loginAttempt` event is fired with the following object:  
`{ success: true }`

If not, the `loginAttempt` event is fired with the following response:  
`{ success: false, error: 'error message' }`

### setJwtToken(jwtToken)

### setJwtToken(kuzzleResponse)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``jwtToken`` | string | Previously generated JSON Web Token |
| ``kuzzleResponse`` | JSON object | Final Kuzzle response from a 2-steps authentication process |

### Return value

Returns the `Kuzzle` object to allow chaining.

## unsetJwtToken

```js
kuzzle.unsetJwtToken();
```

```java
kuzzle.unsetJwtToken();
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$kuzzle->unsetJwtToken();
```

Unsets the internal JWT token used for authentication, and stops all existing subscriptions

### Return value

Returns the `Kuzzle` object to allow chaining.


## startQueuing

```js
kuzzle.startQueuing();
```

```java
kuzzle.startQueuing();
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Starts the requests queuing. Works only during offline mode, and if the ``autoQueue`` option is set to ``false``.

### Return value

Returns the `Kuzzle` object to allow chaining.


## stopQueuing

```js
kuzzle.stopQueuing();
```

```java
kuzzle.stopQueuing();
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Stops the requests queuing. Works only during offline mode, and if the ``autoQueue`` option is set to ``false``.

### Return value

Returns the `Kuzzle` object to allow chaining.

## whoAmI

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.whoAmI(function (err, result) {
  // "result" is a User object
});

// Using promises (NodeJS only)
kuzzle.whoAmIPromise()
  .then(res => {
    // "res" is a User object
  });
```

```java
kuzzle.whoAmI(new ResponseListener<User>() {
  @Override
  public void onSuccess(User myself) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```php
<?php
use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$kuzzle = new Kuzzle('localhost');

try {
  $me = $kuzzle->whoAmI();
  // $me instanceof User
}
catch (ErrorException $e) {

}
```

Retrieves current user object.

### whoAmI(callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``callback`` | function | Callback handling the response |


### Callback response

An instantiated `User` object.
