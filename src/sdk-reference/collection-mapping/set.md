---
layout: side-code.html
language-tab: true
algolia: true
title: set
---

## set

```js
dataMapping.set('field', {type: 'string', index: 'analyzed', null_value: ''});
```

```java
JSONObject mapping = new JSONObject();
mapping.put("type", "string");
mapping.put("index", "analyzed");
mapping.put("null_value", "");

dataMapping.set("field", mapping);
```

```php
<?php

use \Kuzzle\DataMapping;

// ...

$field = 'field';
$mapping = [
  'type' => 'string',
  'index' => 'analyzed',
  'null_value' => ''
];

/**
 * @var $dataMapping DataMapping
 */
$dataMapping->set($field, $mapping);
```

<aside class="notice">Changes made by this function won't be applied until you call the <code>apply</code> method</aside>

Adds or updates a field mapping.

### set(field, mapping)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``field`` | string | Name of the field from which the mapping is to be added or updated |
| ``mapping`` | JSON Object | Mapping for this field, following the [Elasticsearch Mapping format](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/mapping.html)

### Return value

Returns this `CollectionMapping` object to allow chaining.
