---
layout: side-code.html
language-tab: true
algolia: true
title: publishMessage
---

# publishMessage

```js
kuzzle
  .collection('collection', 'index')
  .publishMessage({foo: 'bar', baz: 'qux'});
```

```java
JSONObject message = new JSONObject().put("some", "content");
JSONObject volatile = new JSONObject().put("volatile", "are volatile information");
Options opts = new Options().setVolatile(volatile);

kuzzle
  .collection("collection", "index")
  .publish(message, opts);
```

```php
<?php

use \Kuzzle\Kuzzle;

$message = [
  'field' => 'value'
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $result = $dataCollection->publishMessage($message);
}
catch (ErrorException $e) {

}
```

Publish a realtime message

## publishMessage(Document, [options], [callback])

## publishMessage(content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Document`` | object | Document object |
| ``content`` | JSON Object | Content of the document to publish |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

### Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON Object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

## Return value

Returns the `Collection` object to allow chaining.

## Callback response

Resolves to a raw Kuzzle response in JSON format.
