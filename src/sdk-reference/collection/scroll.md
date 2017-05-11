---
layout: side-code.html
language-tab: true
algolia: true
title: scroll
---

# scroll

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .scroll(scrollId, {scroll: '1m'}, function (err, searchResult) {
    searchResult.getDocuments().forEach(function (document) {
      console.log(document.toString());
    });
  });

// Using promises (NodeJS only)
kuzzle
  .collection('collection', 'index')
  .scrollPromise(scrollId, {scroll: '1m'})
  .then(searchResult => {
    searchResult.getDocuments().forEach(document => {
      console.log(document.toString());
    });
  });
```

```java
Options opts = new Options();
opts.setScroll("1m");

kuzzle
  .collection("collection", "index")
  .scroll(scrollId, opts, new ResponseListener<SearchResult>() {
    @Override
    public void onSuccess(SearchResult searchResult) {
      for (Document doc : searchResult.getDocuments()) {
        // Get documents
      }

      searchResult.getTotal(); // return total of documents returned

      searchResult.getAggregations(): // return a JSONObject representing the aggregations response
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
use \Kuzzle\Document;
use \Kuzzle\Util\SearchResult;

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $searchResult = $dataCollection->scroll($scrollId, ['scroll' => '1m']);

  // $searchResult instanceof SearchResult
  $searchResult->getTotal();

  foreach($searchResult->getDocuments() as $document) {
    // $document instanceof Document
  }

  // return an array representing the aggregations response
  $searchResult->getAggregations();
}
catch (ErrorException $e) {

}
```

> Callback response:

Resolves to an instantiated [SearchResult](#searchresult) object.

<aside class="notice">
  There is a small delay between documents creation and their existence in our search layer, usually a couple of seconds. That means that a document that was just been created won't be returned by this function
</aside>

Returns the next page of the scroll session, and the `scrollId` to be used by the next `scroll` action.
A scroll session is always initiated by a `search` action by using the `scroll` argument; more information below.


## scroll(scrollId, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``scrollId`` | string | The "scrollId" provided with the last scroll response or from the initial search request if it is the first scroll call |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |


### Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``scroll`` | string | Re-initializes the scroll session timeout to its value. If not defined, the scroll timeout is defaulted to a Kuzzle configuration | ``undefined`` |

<aside class="notice">
  To get more information about scroll sessions, please refer to the <a href="/api-reference/#search">API reference documentation</a>.
</aside>

## Callback response


Resolves to an instantiated [SearchResult](#searchresult) object.
