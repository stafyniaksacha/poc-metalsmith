---
layout: side-code.html
language-tab: true
algolia: true
title: fetchAllDocuments
---

# fetchAllDocuments

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .fetchAllDocuments(function (error, result) {
    // result is an object containing the total number of documents
    // and an array of Document objects
  });

// Using promises (NodeJS)
kuzzle
  .collection('collection', 'index')
  .fetchAllDocumentsPromise()
  .then(result => {
    // result is an object containing the total number of documents
    // and an array of Document objects
  });
```

```java
kuzzle
  .collection("collection", "index")
  .fetchAllDocuments(new ResponseListener<DocumentList>() {
    @Override
    public void onSuccess(DocumentList object) {
      // result is an object containing the total number of documents
      // and an array of Document objects
      for (Document doc : result.getDocuments()) {
        // Get documents
      }

      result.getTotal(); // return total of documents returned
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
use \Kuzzle\Util\SearchResult;

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $result = $dataCollection->fetchAllDocuments();

  // $result instanceof SearchResult

  foreach($result->getDocuments() as $document) {
    // $result instanceof Document
  }
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{ "total": 3,
  "documents": [<Document>, <Document>, <Document>]
}
```

Retrieves all documents stored in this data collection.

## fetchAllDocuments([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |


### Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | integer | Upper bounds for paginated results. | ``0`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``size`` | integer | Lower bounds for paginated results. | ``10`` |

## Callback response

Resolves to an object containing:

- the total number of retrieved documents
- a `array` of `Document` objects
