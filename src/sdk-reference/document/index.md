---
layout: side-code.html
language-tab: true
algolia: true
title: Document
---

# Document

Kuzzle handles documents, either as realtime messages or as stored documents. Document is the object representation of one of these documents.

## Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 Document objects are returned by various Collection methods.

 You may also use the Collection.document() method:
 */
var document = kuzzle.collection('collection', 'index').document('id');

document = kuzzle
  .collection('collection', 'index')
  .document({content: 'some content'});

document = kuzzle
  .collection('collection', 'index')
  .document('id', {content: 'some content'});
```

```java
Document document = new Document(collection);

Document document = new Document(collection, "id");

JSONObject content = new JSONObject();
content.put("content", "some content");
Document document = new Document(collection, content);

Document document = new Document(collection, "id", content);
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

// You can use the factory embeded in DataCollection object
$document = $dataCollection->document($documentId, $documentContent);

// or directly with public constructor
$document = new Document($dataCollection, $documentId, $documentContent);
```

### Document(Collection, [documentId], [content])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Collection`` | object | An instantiated Collection object |
| ``content`` | JSON Object | Initializes this document with the provided content |
| ``documentId`` | string | ID of an existing document. |

**Note:**  this constructor won't make any call to Kuzzle. When providing only a document ID, the `refresh` method should be called to retrieve the corresponding document content.

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| ``collection`` | string | The data collection associated to this document | get |
| ``content`` | JSON Object | The content of the document | get/set |
| ``headers`` | JSON Object | Common headers for all sent documents. | get/set |
| ``id`` | string | Unique document identifier | get/set |
| ``version`` | integer | Current document version | get |

**Notes:**  

* setting a new value to the ``content`` property is equivalent to calling ``setContent(data, false)``
* setting a new value to the ``id`` property will force this value for this document
* the ``headers`` property is inherited from the provided ``Collection`` object and can be overrided
