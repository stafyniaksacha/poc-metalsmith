---
layout: side-code.html
language-tab: true
algolia: true
title: document
---

# document

```js
let document = kuzzle
  .collection('collection', 'index')
  .document('id', {some: 'content'})
  .save();
```

```java
Document document = kuzzle
  .collection("collection", "index")
  .document("id", new JSONObject().put("some", "content"))
  .save();
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
$document = $dataCollection->document($documentId, $documentContent);

// $document instanceof Document

try {
  $document->save();
}
catch (ErrorException $e) {

}
```

Creates a new `Document` object, using its constructor.

## document([id], [content])

| Arguments | Type | Description |
|-----------|------|-------------|
| ``id`` | string | Optional document unique ID |
| ``content`` | JSON object | Optional document content |

## Return value

Returns the newly created `Document` object.
