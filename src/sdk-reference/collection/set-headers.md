---
layout: side-code.html
language-tab: true
algolia: true
title: setHeaders
---

# setHeaders

```js
kuzzle
  .collection('collection', 'index')
  .setHeaders({
    someContent: 'someValue',
    volatile: { someVolatileData: ['with', 'some', 'values']}
  }, true);
```

```java
JSONObject headers = new JSONObject()
  .put("someContent", "someValue")
  .put("volatile", new JSONObject()
    .put("someVolatileData", new JSONArray()
      .put("with")
      .put("some")
      .put("values")
    )
  );

kuzzle
  .collection("collection", "index")
  .setHeaders(content, true);
```

```php
<?php

use \Kuzzle\Kuzzle;

$headers = [
  'someContent' => 'someValue'
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');
$dataCollection->setHeaders($headers, true);
```

This is a helper function returning itself, allowing to easily set headers while chaining calls.

## setHeaders(content, [replace])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | New content |
| ``replace`` | boolean | true: replace the current content with the provided data, false: merge it |

**Note:** by default, the ``replace`` argument is set to ``false``

## Return value

Returns the `Collection` object to allow chaining.
