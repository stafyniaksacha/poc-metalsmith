---
layout: side-code.html
language-tab: true
algolia: true
title: setContent
---

## setContent

```js
document.setContent({newContent: 'someValue'}, true);
```

```java
JSONObject content = new JSONObject().put("content", "some content");

document.setContent(content, true);
```

```php
<?php

use \Kuzzle\Document;

// ...

$documentContent = [
  'field' => 'value'
];

/**
 * @var $document Document
 */
$document->setContent($documentContent);
```

<aside class="notice">
Changes made by this function won't be applied until the <code>save</code> method is called
</aside>

Replaces the current content with new data.  
This is a helper function returning itself, allowing to easily chain calls.


### setContent(data, [replace])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``data`` | JSON Object | New content |
| ``replace`` | boolean | true: replace the current content with the provided data, false: merge it |

**Note:** by default, the ``replace`` argument is set to ``false``

### Return value

Returns this `Document` object to allow chaining.
