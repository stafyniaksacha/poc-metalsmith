---
layout: side-code.html
language-tab: true
algolia: true
title: collectionMapping
---

# collectionMapping

```js
let dataMapping = kuzzle
  .collection('collection', 'index')
  .collectionMapping({someField: {type: 'string', index: 'analyzed'}})
  .apply(function (error, result) {
    // called once the mapping action has been completed
  });
```

```java
CollectionMapping dataMapping = kuzzle
  .collection("collection", "index")
  .collectionMapping(new JSONObject().put("someFiled", new JSONObject().put("type", "string").put("index", "analyzed"))
  .apply(new ResponseListener<CollectionMapping>() {
     @Override
     public void onSuccess(CollectionMapping object) {
       // called once the mapping action has been completed
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
use \Kuzzle\DataMapping;

$mapping = [
  'someField' => [
    'type' => 'string',
    'index' => 'analyzed'
  ]
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $dataMapping = $dataCollection->collectionMapping($mapping);

  // $dataMapping instanceof DataMapping
  $dataMapping->apply();
}
catch (ErrorException $e) {

}
```

Creates a new `CollectionMapping` object, using its constructor.

## collectionMapping([mapping])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``mapping`` | JSON Object | Optional mapping |

## Return value

Returns the newly created `CollectionMapping` object.
