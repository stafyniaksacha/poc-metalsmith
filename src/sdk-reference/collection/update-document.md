---
layout: side-code.html
language-tab: true
algolia: true
title: updateDocument
---

# updateDocument

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .updateDocument('documentId', {title: 'foo', content: 'bar'}, function (error, result) {
    // result is a Document object
  });

// Using promises (NodeJS)
kuzzle
  .collection('collection', 'index')
  .updateDocumentPromise('documentId', {title: 'foo', content: 'bar'})
  .then(result => {
    // result is a Document object
  });
```

```java
JSONObject newTitle = new JSONObject().put("title", "a shiny new title");

kuzzle
  .collection("collection", "index")
  .updateDocument("documentId", newTitle, new ResponseListener<Document>() {
    @Override
    public void onSuccess(Document result) {
      // result is an updated Document object
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
use \Kuzzle\Document;

$documentId = 'foobar';
$documentContent = [
  'newField' => 'foo'
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $document = $dataCollection->updateDocument($documentId, $documentContent);

  // $document instanceof Document
}
catch (ErrorException $e) {

}
```

Update parts of a document, by replacing some fields or adding new ones.
Note that you cannot remove fields this way: missing fields will simply be left unchanged.

## updateDocument(documentId, content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``documentId`` | string | Unique document identifier |
| ``content`` | JSON object | Content of the document to create |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Optional callback |

### Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the persistence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |
| `retryOnConflict` | int | Number of retries to attempt before rejecting this update because of a cluster sync conflict | `0` |

## Return value

Returns the `Collection` object to allow chaining.

## Callback response

Resolves to an up-to-date `Document` object.
