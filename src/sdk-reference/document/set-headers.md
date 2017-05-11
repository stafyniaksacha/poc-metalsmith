---
layout: side-code.html
language-tab: true
algolia: true
title: setHeaders
---

## setHeaders

```js
document.setHeaders({someContent: 'someValue'}, true);
```

```java
JSONObject headers = new JSONObject().put("someContent", "someValue");

document.setHeaders(headers, true);
```

```php
<?php

use \Kuzzle\Document;

// ...

$headers = [
  'header' => 'value'
];

/**
 * @var $document Document
 */
$document->setHeaders($headers);
```

This is a helper function returning itself, allowing to easily chain calls.

### setHeaders(content, [replace])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | New content |
| ``replace`` | boolean | true: replace the current content with the provided data, false: merge it |

**Note:** by default, the ``replace`` argument is set to ``false``

### Return value

Returns this `Document` object to allow chaining.
