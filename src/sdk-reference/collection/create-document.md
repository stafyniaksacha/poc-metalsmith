---
layout: side-code.html
language-tab: true
algolia: true
title: createDocument
---

# createDocument

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .createDocument('foobar', {title: 'foo', content: 'bar'}, {ifExist: 'replace'}, function (err, res) {
    // callback called once the create action has been completed
    // => the result is a Document object
  });

// Using promises (NodeJS only)
kuzzle
 .collection('collection', 'index')
 .createDocumentPromise('foobar', {title: 'foo', content: 'bar'}, {ifExist: 'replace'})
 .then(res => {
   // promise resolved once the create action has been completed
   // => the result is a Document object
 });
```

```java
Document myDocument = new Document(collection);
myDocument.setContent("title", "foo");
myDocument.setContent("content", "bar");

Options opts = new Options();
opts.setIfExist = "replace";

kuzzle
  .collection("collection", "index")
  .createDocument(myDocument, new ResponseListener<Document>() {
    @Override
    public void onSuccess(Document object) {
      // callback called once the create action has been completed
      // => the result is a Document object
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
  'title' => 'foo',
  'content' => 'bar'
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $document = $dataCollection->createDocument($documentContent, $documentId);

  // $document instanceof Document
}
catch (ErrorException $e) {

}
```

Create a new document in Kuzzle.

## createDocument(Document, [options], [callback])

## createDocument([id], content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Document`` | object | Document object |
| ``id`` | string | Optional document identifier |
| ``content`` | JSON object | Content of the document to create |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Optional callback |

### Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the peristence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |
| ``ifExist`` | string | If the same document already exists: resolves to an error if sets to ``error``. Replaces the existing document if set to ``replace`` | ``false`` |

## Return value

Returns the `Collection` object to allow chaining.

## Callback response

Resolves to a `Document` object containing the newly created document.
