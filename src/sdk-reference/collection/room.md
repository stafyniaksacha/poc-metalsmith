---
layout: side-code.html
language-tab: true
algolia: true
title: room (property)
---

# room (property)

```js
let room = kuzzle
  .collection('collection', 'index')
  .room()
  .renew({in: {field: ['some', 'new', 'filter']}}, function (err, res) {
    // handle notifications
  });
```

```java
JSONObject filters = new JSONObject()
  .put("in",
    new JSONObject("field")
      .put(new JSONArray()
        .put("some")
        .put("filter")
      )
  );

Room room = kuzzle.collection("collection", "index")
  .room()
  .renew(filters, new ResponseListener<NotificationResponse>() {
    @Override
      public void onSuccess(NotificationResponse object) {
        // handle notifications
      }

      @Override
      public void onError(JSONObject error) {
        // Handle notifications error
      }
  });
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Creates a new `Room` object, using its constructor.

## room([options])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | object | Subscription configuration |

## Return value

Returns the newly created `Room` object.
