---
layout: side-code.html
language-tab: true
algolia: true
title: refresh
---

## refresh

```js
// Using callbacks (NodeJS & Web Browser)
dataMapping.refresh(function (error, result) {
  // called once the mapping has been retrieved from Kuzzle
});

// Using promises (NodeJS)
dataMapping.refreshPromise().then(result => {
  // resolved once the mapping has been retrieved from Kuzzle
});
```

```java
dataMapping.refresh(new ResponseListener<CollectionMapping>() {
   @Override
   public void onSuccess(CollectionMapping object) {
     // called once the mapping has been retrieved from Kuzzle
   }

   @Override
   public void onError(JSONObject error) {
     // Handle error
   }
});
```

```php
<?php

use \Kuzzle\DataMapping;

// ...

/**
 * @var $dataMapping DataMapping
 */
$dataMapping->refresh();
```

Instantiates a new CollectionMapping object with an up-to-date content.

### refresh([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |


### Callback response

Resolves to this updated `CollectionMapping` object.
