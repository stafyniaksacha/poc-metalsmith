---
layout: side-code.html
language-tab: true
algolia: true
title: deleteDocument
---

# deleteDocument

```js
// Deleting one document using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .deleteDocument('document unique ID', function (err, res) {
    // callback called once the delete action has been completed
  });

// Deleting one document using promises (NodeJS)
kuzzle
  .collection('collection', 'index')
  .deleteDocumentPromise('document unique ID')
  .then(res => {
    // promises resolved once the delete action has been completed
  });

// Deleting multiple documents using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .deleteDocument({filter: {equals: {title: 'foo'}}}, function (err, res) {
    // callback called once the delete with query has been completed
  });

// Deleting multiple documents using promises (NodeJS)
 kuzzle
 .collection('collection', 'index')
 .deleteDocumentPromise({filter: {equals: {title: 'foo'}}})
 .then(res => {
   // promise resolved once the delete by query has been completed
 });
```

```java
// Deleting one document
kuzzle
  .collection("collection", "index")
  .deleteDocument("document unique ID", new ResponseListener<String>() {
    @Override
    public void onSuccess(String object) {
      // The resulting string contains the deleted document ID
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });

// Deleting multiple documents
JSONObject equalsFilter = new JSONObject()
  .put("filter", new JSONObject()
  .put("equals",
    new JSONObject().put("title", "foo")
  ));

kuzzle
  .collection("collection", "index")
  .deleteDocument(equalsFilter, new ResponseListener<String[]>() {
    @Override
    public void onSuccess(String[] object) {
      // The resulting object contains the list of deleted document IDs
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
$dataCollection = $kuzzle->collection('collection', 'index');

// Deleting one document
try {
  $result = $dataCollection->deleteDocument('documentId');
}
catch (ErrorException $e) {

}

// Deleting multiple documents
$filters = [
  'filter' => [
    'equals' => ['field' => 'value']
  ]
];

try {
  $result = $dataCollection->deleteDocument($filters);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[ "AVCoeBkimsySTKTfa8AX" ]
```

<aside class="notice">
There is a small delay between documents creation and their existence in our search layer, usually a couple of seconds. That means that a document that was just been created won't be deleted by the filtered version of this function
</aside>

Delete either a stored document, or all stored documents matching search filters.

## deleteDocument(documentId, [options], [callback])

## deleteDocument(filters, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``documentId`` | string | Unique document identifier |
| ``filters`` | JSON object | Filters in [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/query-dsl.html) format |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Optional callback |


### Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the peristence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |


## Return value

Returns the `Collection` object to allow chaining.

## Callback response

Resolves to an `array` containing the deleted document IDs.
