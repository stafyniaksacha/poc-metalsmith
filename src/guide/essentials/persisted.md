---
layout: full.html
title: Working with persistent data
---

## Working with persistent data

Kuzzle relies on [Elasticsearch](https://www.elastic.co/) to store and fetch persistent data.

In Kuzzle, data is organized in the following way:

* **Documents** are the atomic unit of data. They are defined as JSON structures, in the classical NoSQL fashion and are identified by a unique `_id`.
* Documents are grouped into **Collections**, identified by a unique name.
* Collections are grouped into **Indexes**, identified by a unique name.

### Document CRUD

Kuzzle ships with a full data [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) API that enables you to operate in many ways on your documents.

Let's [**create a new document**](/api-reference/#create48), for example, in `mycollection`, within `myindex` via the HTTP protocol.
This is done by sending a `POST` request to the API endpoint `http://localhost:7512/myindex/mycollection/_create` with the body set to

```json
{
  "message": "Hello, world!"
}
```

Notice that the document is associated to the auto-generated id `AVkDBl3YsT6qHI7MxLz0`, as we can see in the response:

```json
{
  "status": 200,
  "error": null,
  "requestId": "38d08fa9-449d-47f7-8593-dc136f8b3559",
  "controller": "document",
  "action": "create",
  "collection": "mycollection",
  "index": "myindex",
  "volatile": null,
  "headers": {},
  "result": {
    "_index": "myindex",
    "_type": "mycollection",
    "_id": "AVkDBl3YsT6qHI7MxLz0",
    "_version": 1,
    "result": "created",
    "_shards": {
      "total": 2,
      "successful": 1,
      "failed": 0
    },
    "created": true,
    "_source": {
      "message": "Hello, world!",
      "_meta": {
        "author": "-1",
        "createdAt": 1481814465050,
        "updatedAt": null,
        "updater": null,
        "active": true,
        "deletedAt": null
      }
    }
  }
}
```

Take some time to examine the content of a [Kuzzle Response](#kuzzle-response-objects). You may notice that it contains useful information like the name of the [controller and action](/#core-architecture) that correspond to the HTTP route we hit with our request, or the complete KuzzleDocument object we just created.

One more thing you may notice is that `myindex` and `mycollection` are created on-the-fly along with the document. Let's verify it by [**getting the list of collections**](/api-reference/?http#list) stored in `myindex` by sending a `GET` request to `http://localhost:7512/myindex/_list`.

```json
{
  "status": 200,
  "error": null,
  "requestId": "51b276c3-3698-4412-b3dc-80d0f84541fb",
  "controller": "collection",
  "action": "list",
  "collection": null,
  "index": "myindex",
  "volatile": null,
  "headers": {},
  "result": {
    "collections": [
      {
        "name": "mycollection",
        "type": "stored"
      }
    ],
    "type": "all"
  }
}
```

Take a look at the `result` field in the Response from Kuzzle. It contains an array of `collections`, each one defined by a `name` and a `type`. `mycollection` is of type `stored` (which stands for persistent). This is made to distinguish persisted collection from the `realtime` (or volatile) collections, used to identify [real-time documents](#realtime-notifications).

Let's [**modify to our brand new document**](/api-reference/?http#update) by sending a `PUT` request to `http://localhost:7512/myindex/mycollection/AVkDBl3YsT6qHI7MxLz0/_update` with the body set to:

```json
{
  "message": "in a bottle",
  "an_englishman": "in New York"
}
```

Which gives us the response...

```json
{
  "status": 200,
  "error": null,
  "requestId": "6241ec4d-8529-43ba-9b77-3028b99cd621",
  "controller": "document",
  "action": "update",
  "collection": "mycollection",
  "index": "myindex",
  "volatile": null,
  "headers": {},
  "result": {
    "_index": "myindex",
    "_type": "mycollection",
    "_id": "AVkDBl3YsT6qHI7MxLz0",
    "_version": 2,
    "result": "updated",
    "_shards": {
      "total": 2,
      "successful": 1,
      "failed": 0
    }
  }
}
```

...telling us that the document has been successfully updated.

Now, we'll let you figure out what happens when we send a `DELETE` request to `http://localhost:7512/myindex/mycollection/AVkDBl3YsT6qHI7MxLz0` with an empty body (take a look at the [API Reference](/api-reference/?http#delete) if you don't want to try).

### Document Search

One thing that Elasticsearch is _really_ good at doing is... Searching! It enables to create extremely precise search queries, thanks to its powerful query DSL. We wrote a [comprehensive cookbook](#elasticsearch-cookbook) to help you understand how it works in detail, but let's take a look at a couple of simple examples, just to get started.

Say we want to [**find**](/api-reference/?http#search) all the documents within `mycollection`, via the HTTP protocol. To do it, we send a `POST` request to `http://localhost:7512/myindex/mycollection/_search` (we leave the body empty since we have no filters to apply to our query). Depending on the documents you have created in your database, the response will look like:

```json
{
  "status": 200,
  "error": null,
  "requestId": "3b486d49-f1f9-4595-8c10-b63cc5fc1279",
  "controller": "document",
  "action": "search",
  "collection": "mycollection",
  "index": "myindex",
  "volatile": null,
  "headers": {},
  "result": {
    "took": 69,
    "timed_out": false,
    "_shards": {
      "total": 5,
      "successful": 5,
      "failed": 0
    },
    "hits": [
      {
        "_index": "myindex",
        "_type": "mycollection",
        "_id": "AVkDLAdCsT6qHI7MxLz4",
        "_score": 0,
        "_source": {
          "message": "Hey! Ho!"
        },
        "_meta": {
          "author": "-1",
          "createdAt": 1481816934209,
          "updatedAt": null,
          "updater": null,
          "active": true,
          "deletedAt": null
        }
      },
      {
        "_index": "myindex",
        "_type": "mycollection",
        "_id": "AVkDK9iNsT6qHI7MxLz3",
        "_score": 0,
        "_source": {
          "message": "Hello, world!"
        },
        "_meta": {
          "author": "-1",
          "createdAt": 1481816922252,
          "updatedAt": null,
          "updater": null,
          "active": true,
          "deletedAt": null
        }
      },
      {
        "_index": "myindex",
        "_type": "mycollection",
        "_id": "AVkDLCdRsT6qHI7MxLz5",
        "_score": 0,
        "_source": {
          "message": "Let's go!"
        },
        "_meta": {
          "author": "-1",
          "createdAt": 1481816942415,
          "updatedAt": null,
          "updater": null,
          "active": true,
          "deletedAt": null
        }
      }
    ],
    "total": 3,
    "max_score": 0
  }
}
```

Looks neat. Say that now we only want to **query** the documents containing the word `Hey` in the `message` field. We can achieve this by adding the following query to our body:

```json
{
  "query": {
      "match": {
          "message":"Hey"
      }
    }
}
```

Which gives, as a result, the following response:

```json
{
  "status": 200,
  "error": null,
  "requestId": "e00cf6d6-8983-498b-8481-96a1fe1b5d46",
  "controller": "document",
  "action": "search",
  "collection": "mycollection",
  "index": "myindex",
  "volatile": null,
  "headers": {},
  "result": {
    "took": 6,
    "timed_out": false,
    "_shards": {
      "total": 5,
      "successful": 5,
      "failed": 0
    },
    "hits": [
      {
        "_index": "myindex",
        "_type": "mycollection",
        "_id": "AVkDLAdCsT6qHI7MxLz4",
        "_score": 0.25811607,
        "_source": {
          "message": "Hey! Ho!"
        },
        "_meta": {
          "author": "-1",
          "createdAt": 1481816934209,
          "updatedAt": null,
          "updater": null,
          "active": true,
          "deletedAt": null
        }
      }
    ],
    "total": 1,
    "max_score": 0.25811607
  }
}
```

### Document metadata

When you create or update a document, Kuzzle adds metadata. These metadata describe the life-cycle of the document.
They are available in the `_meta` part of a document:

```json
{
  "_index": "myindex",
  "_type": "mycollection",
  "_id": "AVkDLAdCsT6qHI7MxLz4",
  "_score": 0.25811607,
  "_source": {
    "message": "Hey! Ho!"
  },
  "_meta": {
    "author": "-1",
    "createdAt": 1481816934209,
    "updatedAt": null,
    "updater": null,
    "active": true,
    "deletedAt": null
  }
}
```

* `author`: The author identifier
* `createdAt`: The UNIX Timestamp of the document creation (create or replace)
* `updatedAt`: The UNIX Timestamp of the last document update, or `null` if no update has been made
* `updater`: The updater identifier, or `null` if no update has been made
* `active`: Always `true` for now
* `deletedAt`: Always `null` for now


They can be used in search queries to filter and sort documents like a normal document field:

```json
{
  "query": {
      "range": {
          "_meta.createdAt": {
            "lte": 1481816930000
          }
      }
    }
}
```

Which gives, as a result, the following response:

```json
{
  "status": 200,
  "error": null,
  "requestId": "e00cf6d6-8983-498b-8481-96a1fe1b5d46",
  "controller": "document",
  "action": "search",
  "collection": "mycollection",
  "index": "myindex",
  "volatile": null,
  "headers": {},
  "result": {
    "took": 6,
    "timed_out": false,
    "_shards": {
      "total": 5,
      "successful": 5,
      "failed": 0
    },
    "hits": [
      {
        "_index": "myindex",
        "_type": "mycollection",
        "_id": "AVkDK9iNsT6qHI7MxLz3",
        "_score": 0,
        "_source": {
          "message": "Hello, world!"
        },
        "_meta": {
          "author": "-1",
          "createdAt": 1481816922252,
          "updatedAt": null,
          "updater": null,
          "active": true,
          "deletedAt": null
        }
      }
    ],
    "total": 1,
    "max_score": 0.25811607
  }
}
```


### Document mapping

As previously said, Kuzzle relies on Elasticsearch to persist documents. Elasticsearch uses a mapping internally to match
a document field to a field type. This mapping is attached to a `collection` (a `type` in Elasticsearch terminology).
If no mapping is defined, Elasticsearch will infer it automatically from input documents.

ou may want to define mappings manually, especially to provide more details to Elasticsearch on how it should interpret the documents stored in your collections.
To do so, Kuzzle expose a mapping creation API route.
This is done by sending a `PUT` request to the API endpoint `http://localhost:7512/myindex/mycollection/_mapping` with the body set to your mapping:

```json
{
  "properties": {
    "someField": {
      "type": "date"
    }
  }
}
```

Which gives us the response...

```json
{
  "action": "updateMapping",
  "collection": "mycollection",
  "controller": "collection",
  "error": null,
  "index": "myindex",
  "volatile": null,
  "requestId": "8acca50e-592d-4f0d-962c-31719b11e171",
  "result": {
    "acknowledged": true
  },
  "status": 200
}
```

Here we defined a new field called `someField` of type `date` in our collection `mycollection`. This is especially useful when
dealing with capabilities such as specific types (`date`, `geo_shape`, ...), full-text search and complex data structures (`nested`, ...) of Elasticsearch.
As the mapping of the collection can not be changed once it is set (even if Elasticsearch did it automatically for you),
you should almost always define mappings when creating collections, preferably before sending documents in them.

The syntax to use is the one defined by [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/mapping.html).


#### Where do we go from here?

* Refer to the [Elasticsearch cookbook](#elasticsearch-cookbook) to get more details on how querying works in Kuzzle.
* Keep track of the changes on your documents via the [Realtime Notifications](#realtime-notifications).
