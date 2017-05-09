---
layout: side-code.html
language-tab: true
title: Document
---

# Document

Kuzzle handles documents, either as realtime messages or as stored documents. Document is the object representation of one of these documents.

## Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 Document objects are returned by various Collection methods.

 You may also use the Collection.document() method:
 */
var document = kuzzle.collection('collection', 'index').document('id');

document = kuzzle
  .collection('collection', 'index')
  .document({content: 'some content'});

document = kuzzle
  .collection('collection', 'index')
  .document('id', {content: 'some content'});
```

```java
Document document = new Document(collection);

Document document = new Document(collection, "id");

JSONObject content = new JSONObject();
content.put("content", "some content");
Document document = new Document(collection, content);

Document document = new Document(collection, "id", content);
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

// You can use the factory embeded in DataCollection object
$document = $dataCollection->document($documentId, $documentContent);

// or directly with public constructor
$document = new Document($dataCollection, $documentId, $documentContent);
```

### Document(Collection, [documentId], [content])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Collection`` | object | An instantiated Collection object |
| ``content`` | JSON Object | Initializes this document with the provided content |
| ``documentId`` | string | ID of an existing document. |

**Note:**  this constructor won't make any call to Kuzzle. When providing only a document ID, the `refresh` method should be called to retrieve the corresponding document content.

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| ``collection`` | string | The data collection associated to this document | get |
| ``content`` | JSON Object | The content of the document | get/set |
| ``headers`` | JSON Object | Common headers for all sent documents. | get/set |
| ``id`` | string | Unique document identifier | get/set |
| ``version`` | integer | Current document version | get |

**Notes:**  

* setting a new value to the ``content`` property is equivalent to calling ``setContent(data, false)``
* setting a new value to the ``id`` property will force this value for this document
* the ``headers`` property is inherited from the provided ``Collection`` object and can be overrided

## delete

```js
// Using callbacks (NodeJS or Web Browser)
document.delete(function (error, result) {
  // called once the delete action has been completed
});

// Using promises (NodeJS)
document.deletePromise().then(result => {
  // called once the delete action has been completed
});
```

```java
document.delete(new ResponseListener<Document>() {
    @Override
    public void onSuccess(Document object) {
      // called once the delete action has been completed
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
});
```

```php
<?php

use \Kuzzle\Document;

// ...

/**
 * @var $document Document
 */

try {
  $result = $document->delete();
} catch (ErrorException $e) {

}
```

Deletes this document in Kuzzle.

### delete([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON Object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the persistence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |

### Callback response

Resolves to the deleted document ID


## publish

```js
document.publish();
```

```java
document.publish();
```

```php
<?php

use \Kuzzle\Document;

// ...

/**
 * @var $document Document
 */

try {
  $document->publish();
} catch (ErrorException $e) {

}
```

Publishes the content of this document as a real-time message.

### publish([options])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON Object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns this `Document` object to allow chaining.


## refresh

```js
// Using callbacks (NodeJS or Web Browser)
document.refresh(function (error, result) {
  // called once the refresh action has been completed
});

// Using promises (NodeJS)
document.refreshPromise().then(result => {
  // called once the refresh action has been completed
});
```

```java
document.refresh(new ResponseListener<Document>() {
    @Override
    public void onSuccess(Document object) {
      // called once the refresh action has been completed
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
});
```

```php
<?php

use \Kuzzle\Document;

// ...

/**
 * @var $document Document
 */

try {
  $document = $document->refresh();
} catch (ErrorException $e) {

}
```

Creates a new `Document` object with the last version of this document stored in Kuzzle.

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

Resolves to a new `Document` object containing the last document version.


## save

```js
// Using callbacks (NodeJS or Web Browser)
document.save(function (error, result) {
  // called once the save action has been completed
});

// Using promises (NodeJS)
document.savePromise().then(result => {
  // called once the save action has been completed
});
```

```java
document.save(new ResponseListener<Document>() {
    @Override
    public void onSuccess(Document object) {
      // called once the save action has been completed
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
});
```

```php
<?php

use \Kuzzle\Document;

// ...

/**
 * @var $document Document
 */

try {
  $document->save();
} catch (ErrorException $e) {

}
```

Saves this document into Kuzzle.

If this is a new document, this function will create it in Kuzzle and the ``id`` property will be made available.  
Otherwise, this method will replace the latest version of this document in Kuzzle by the current content of this object.

### save([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON Object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the persistence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |

### Return value

Returns this `Document` object to allow chaining.

### Callback response

Resolves to this `Document` object once the document has been saved.



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

## subscribe

```js
document
  .subscribe(function (error, notification) {
    // called each time a change occurs on this document
  })
  .onDone(function (error, roomObject) {
    // Handles the subscription result
  });

document
  .subscribe({subscribeToSelf: true, volatile: { myId: 'someId'}}, function (error, notification) {
    // called each time a change occurs on this document
  })
  .onDone(function (error, roomObject) {
    // Handles the subscription result
  });
```

```java
Room room = document.subscribe(new ResponseListener<NotificationResponse>() {
    @Override
    public void onSuccess(NotificationResponse object) {
      // called each time a change occurs on this document
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  })
  .onDone(new ResponseListener<Room>() {
    @Override
    public void onSuccess(Room response) {
      // Handle subscription success
    }

    @Override
    public void onError(JSONObject error) {
      // Handle subscription error
    }
  });
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Listens to changes occuring on this document.
Throws an error if this document has not yet been created in Kuzzle.

### subscribe([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | object | Subscription configuration. Passed to the Room constructor. |
| ``callback`` | function | Callback that will be called each time a change has been detected on this document |


### Return value

Returns an object exposing the following method:  
  ```onDone(callback)```

The `callback` argument is called when the subscription ends, either successfully or with an error.
