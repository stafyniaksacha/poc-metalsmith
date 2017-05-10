---
layout: full.html
algolia: true
title: Request Life-Cycle
---

# Request Life-Cycle

In this section we are going to focus on how Requests flow between Kuzzle components. We are going to analyze the life-cycle of a Request in order to understand in depth the Kuzzle Core architecture.

### Reading content from Kuzzle

By "reading", we mean any action involving getting content from the persistent layer: getting a single document, count documents, or search contents with advanced filters.

#### HTTP Request

The schema below shows the [Architecture overview](#kuzzle-in-depth) showed above and highlights the components involved in reading actions:

![read_scenario_http_overview](/assets/images/request-scenarios/read-http/overview.png)

The following diagram shows how the Request flows between the client application, the different Kuzzle components, and the external services:

![read_scenario_http_details](/assets/images/request-scenarios/read-http/details.png)

* The HTTP client asks for a document via a HTTP GET Request. For instance, to retrieve the document '739c26bc-7a09-469a-803d-623c4045b0cb' in the collection `users`: `GET http://kuzzle:7512/mainindex/users/739c26bc-7a09-469a-803d-623c4045b0cb`.
* The proxy forwards the Request through the HTTP Entry point to the Router, which handles it and forwards the formatted Request to the Funnel.

The formatted Request `input` looks like the following:

```json
{
  "controller": "read",
  "action": "get",
  "resource": {
    "index": "mainindex",
    "collection": "users",
    "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
  }
}
```

* The Funnel Controller validates the data before sending the request to the Document Controller.
* The Document Controller calls the Read Engine service.
* The Read Engine service performs an HTTP request to get the data from the data storage.

The content returned by Elasticsearch looks like the following:

```json
{
  "_index": "mainindex",
  "_type": "users",
  "_id": "739c26bc-7a09-469a-803d-623c4045b0cb",
  "_version": 1,
  "found": true,
  "_source": {
      "firstName": "Grace",
      "lastName": "Hopper",
      "age": 85,
      "location": {
          "lat": 32.692742,
          "lon": -97.114127
      },
      "city": "NYC",
      "hobby": "computer"
  }
}
```

* Promises functions are resolved to forward the response message back to the HTTP Router.
* The HTTP Router sends the response to the HTTP client.

#### Websocket connection

The schema below shows the [Architecture overview](#kuzzle-in-depth) showed above and highlights the components involved in reading actions:

![read_scenario_websocket_overview](/assets/images/request-scenarios/read-websocket/overview.png)

The following diagram shows how the Request flows between the client application, the different Kuzzle components, and the external services:

![read_scenario_websocket_details](/assets/images/request-scenarios/read-websocket/details.png)

* The client application opens a Websocket connection to Kuzzle Proxy and emits a "read" event containing the request. For instance, to retrieve the document `739c26bc-7a09-469a-803d-623c4045b0cb` in the collection `users`:

```json
{
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "action": "get",
  "collection": "users",
  "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
}
```

The client then listens to the `<requestId>` event on the socket, like the following:

```javascript
  this.socket.once("ed4faaff-253a-464f-a6b3-387af9d8483d", function(response) {
    callback(response);
  });
```

* The Kuzzle Websocket plugin handles the Request and forwards the message to the Backend Broker.
* The Backend Broker sends the message to the Proxy Broker (within the Kuzzle Core) through a Websocket connection.
* The Proxy Broker forwards the Request through the Proxy Entry Point to the Router, who handles it and forwards the formatted Request to the Funnel.

The formatted Request `input` looks like the following:

```json
{
  "controller": "read",
  "action": "get",
  "resource": {
    "index": "mainindex",
    "collection": "users",
    "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
  }
}
```

* The Funnel validates the message and forward the request to the Document Controller.
* The Document Controller forwards the Request `input` to the Read Engine service.
* The Read Engine service performs an HTTP request to get the data from Elasticsearch.

The content returned by Elasticsearch looks like the following:

```json
{
  "_index": "mainindex",
  "_type": "users",
  "_id": "739c26bc-7a09-469a-803d-623c4045b0cb",
  "_version": 1,
  "found": true,
  "_source": {
      "firstName": "Grace",
      "lastName": "Hopper",
      "age": 85,
      "location": {
          "lat": 32.692742,
          "lon": -97.114127
      },
      "city": "NYC",
      "hobby": "computer"
  }
}
```

* Promises functions are resolved to forward the response message back to the Proxy Broker.
* The Proxy Broker sends the response to the proxy's Backend Broker through the Websocket connection.
* The Proxy triggers the callback, which emits a `<requestId>` event to the Websocket client.

### Subscribing and writing content to Kuzzle

This section explains what happens when clients send new content to Kuzzle.

Kuzzle is able to handle two different types of input:

* **persisted data**, via the `_create_`, `_createOrUpdate_`, or `_delete_` actions.
* **real-time data**, via the `_publish_` action.

#### Writing persistent data

This subsection describes the process for **persistent** data, with an example using the "_create_" action (see also [API Documentation](/api-reference/#create48)).

![persistence_overview](/assets/images/request-scenarios/persistence/overview.png)

Detailed workflow:

![persistence_scenario_details](/assets/images/request-scenarios/persistence/details.png)

* A client sends new content to Kuzzle, either via an HTTP request, through a Websocket connection or using a custom plugin protocol.
* The router handles the Request and forwards the message to the Funnel.

```json
{
  "status": 102,
  "id": "...", // ... The connection id
  "context": {
    // ... The connection context
  },
  "input": {
    "resource": {
      "index": "mainindex",
      "collection": "users"
    },
    "controller": "document",
    "action": "create",
    "body": {
      "firstName": "Grace",
      "lastName": "Hopper",
      "age": 85,
      "location": {
        "lat": 32.692742,
        "lon": -97.114127
      },
      "city": "NYC",
      "hobby": "computer"
    }
  }
}
```

* The Funnel validates the Request and triggers the Plugins Manager with a `document:create` event. The Plugins Manager calls all pipes and hooks configured by the active plugins (see the [Plugin Reference](/plugin-reference/)).
* The Funnel forwards the Request to the Document Controller.
* The Document Controller sends the request to the Storage Engine service.
The Storage Engine sends the request to the database.
* Once the Storage Engine gets the response back, it replies to the Document Controller.
* The Document Controller wraps the response in a Kuzzle Response and forwards it back to the user.

#### Subscribe and Notification scenario

This subsection describes the life-cycle of **non persistent** data notifications as well as real-time notifications, implementing the [Publish/Subscribe pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern).

Remember the [Architecture overview](#kuzzle-in-depth) and focus on the components involved by pub/sub actions:
![pubsub_overview](/assets/images/request-scenarios/pubsub/overview.png)

##### 1st step: subscription

The following diagram shows how two different clients, a Websocket and a MQ one, subscribe to data.

![pubsub_scenario_details1](/assets/images/request-scenarios/pubsub/details1.png)

* The client application opens a Websocket or a MQ connection and emits a "subscribe" event with some filters (see the [API Documentation](/api-reference/#subscribe)). For instance, to be notified about all contents posted to the collection `users`, containing a field `hobby` equals to `computer`:

```json
{
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "index": "mainindex",
  "collection": "users",
  "action": "on",
  "body": {
    "equals": {
      "hobby": "computer"
    }
  },
  "state": "all"
}
```

See the [Real-time Filters Reference](/real-time-filters/) for more details.

The client then listens to the `<requestId>` event on the socket.
Kuzzle will get back to him with a corresponding Room ID and a Room Channel using this event.

Sample Javascript code, using Websocket:

```javascript
  this.socket.once("ed4faaff-253a-464f-a6b3-387af9d8483d", function(response) {
    callback(response);
  });
```

* The Router interprets the input request and transfer the subscription message to the Funnel.

```json
{
  "index": "mainindex",
  "collection": "users",
  "controller": "subscribe",
  "action": "on",
  "filter": {
    "equals": {"hobby": "computer" }
  }
}
```

* The Funnel validates the message and transfers it to the Realtime Controller.
* The Realtime Controller calls the HotelClerk internal component to create the subscription.
* The HotelClerk calls the DSL component to get a formated filter related to the subscription (see [DSL Readme](https://github.com/kuzzleio/kuzzle/blob/master/lib/api/dsl/README.md) for more details).
* The HotelClerk creates a channel related to the filters and gives it back to the Realtime Controller.
* The channel is sent back to the Websocket (or MQ) Router through the internal components.
* The Websocket (or MQ) Router emits a `<requestId>` event to the client, containing the subscribed channel ID.

Sample response content:

```json
{
  "status": 200,
  "error": null,
  "index": "mainindex",
  "collection": "users",
  "controller": "subscribe",
  "action": "on",
  "state": "all",
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "result": {
    "roomId": "78c5b0ba-fead-4535-945c-8d64a7927459",
    "channel": "c5cd8bdc-06a4-4d6e-bae3-61f1a8ac2982"
  }
}
```

* The client now listens to this `channel` events to be notified about new messages corresponding to his subscription filters.

##### 2nd step : notify about real-time actions

The following diagram shows how Kuzzle handles a new message and how subscribed clients are notified:

![pubsub_scenario_details2](/assets/images/request-scenarios/pubsub/details2.png)

* A new content is published to the Notifier component. The `_publish_` method can be triggered:
  * either directly by the Document Controller for non persistent data (using the [publish](/api-reference/#publish) action).
  * or by the Plugins Manager when a 'document:create' event is triggered, to notify users in real-time before the data are sent to the storage Engine.
* The Notifier calls the DSL component to test registered filters that match the content, and get related rooms.
* The Notifier uses the Notification Cache engine to store the mapping content/rooms into cache.
* The Notifier calls the HotelClerk to get the channels related to the rooms.
* The Notifier broadcasts the message to each related channel to the Websocket and MQ plugins.
* Finally, the plugins send the message to the clients who subscribed to it.

##### 3rd step : notify about persisted data

![pubsub_scenario_details2](/assets/images/request-scenarios/pubsub/details3.png)

* The Notifier component is notified about a new action by the Document Controller (see [write scenario](#writing-persistent-data)).
* The Notifier calls the Notification Cache to get the rooms related to the content.
* The Notifier calls the HotelClerk to get the channels related to the rooms.
* The Notifier broadcasts the message to each related channel to the Websocket and MQ plugins.
* Finally, the plugins send the message to the clients who subscribed to it.
