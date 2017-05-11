---
layout: side-code.html
language-tab: true
algolia: true
title: CollectionMapping
---

# CollectionMapping

When creating a new data collection in the persistent data storage layer, Kuzzle uses a default mapping.
It means that, by default, you won't be able to exploit the full capabilities of our persistent data storage layer (currently handled by [ElasticSearch](https://www.elastic.co/products/elasticsearch)), and your searches may suffer from below-average performances, depending on the amount of data you stored in a collection and the complexity of your database.

The CollectionMapping object allow to get the current mapping of a data collection and to modify it if needed.

<aside class="notice">
Once a field mapping has been set, it cannot be removed without reconstructing the data collection.
</aside>

## Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 CollectionMapping objects are returned by the method
 Collection.getMapping

 You may also use the Collection.collectionMapping() method:
 */
var mapping = kuzzle.collection('collection', 'index').collectionMapping();

mapping = kuzzle.collection('collection', 'index').collectionMapping(mapping);
```

```java
CollectionMapping dataMapping = new CollectionMapping(dataCollection);

JSONObject mapping = new JSONObject();
JSONObject type = new JSONObject();
type.put("type", "string");
mapping.put("foo", type);

CollectionMapping dataMapping = new CollectionMapping(dataCollection, mapping);
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

$dataMapping = $dataCollection->collectionMapping($mapping);
// $dataMapping instanceof DataMapping
```

### CollectionMapping(Collection, [mapping])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Collection`` | JSON Object | An instantiated Collection object |
| ``mapping`` | JSON Object | Optional mapping |

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| ``headers`` | JSON Object | Common headers for all sent documents. | get/set |
| ``mapping`` | object | Easy-to-understand list of mappings per field | get/set |

**Note:** the ``headers`` property is inherited from the provided ``Collection`` object and can be overrided
