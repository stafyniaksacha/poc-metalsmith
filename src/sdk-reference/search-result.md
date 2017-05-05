---
layout: full.html
title: SearchResult
---

# SearchResult

This object is the result of a [search](#search) or a [scroll](#scroll) request, allowing to manipulate the result and do subsequent requests.

## Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 SearchResult objects are returned by search and scroll Collection methods.
 */

kuzzle.collection('collection', 'index').search({}, (error, searchResult) => {
  // searchResult is a SearchResult object
});
```

```java
JSONObject filter = new JSONObject();

kuzzle
  .collection("collection", "index")
  .search(filter, new ResponseListener<SearchResult>() {
    @Override
    public void onSuccess(SearchResult searchResult) {
      for (Document doc : result.getDocuments()) {
        // fetched documents
      }

      result.getTotal(); // returns the total number of documents returnable

      result.getAggregations(): // returns a JSONObject representing the aggregations response
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


$filters = (object) [];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $searchResult = $dataCollection->search($filters);

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

### Document(collection, total, documents, aggregations, options, filters, [previous])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``collection`` | Collection | An instantiated Collection object |
| ``total`` | integer | The total number of results of the search/scroll request |
| ``documents`` | Document[] | An array of instantiated Document objects |
| ``aggregations`` | object | The result of an aggregation produced by a search request |
| ``options`` | object | The arguments of the search/scroll request |
| ``filters`` | object | The filters of the search request |
| ``previous`` | SearchRequest | The previous SearchResult produced by a previous search/scroll request (see [fetchNext](#fetchnext)) |

**Note:** this constructor is meant to be called internally when retrieving results from a search or a scroll request.

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| ``aggregations`` | object | The result of an aggregation produced by a search request | get |
| ``collection`` | Collection | The data collection associated to this document | get |
| ``documents`` | Document[] | An array of instantiated Document objects | get |
| ``fetchedDocument`` | number | Represents the offset of the last document in the current SearchResult set | get/set |
| ``options`` | object | The arguments of the search/scroll request | get |
| ``filters`` | object | The filters of the search request | get |
| ``total`` | integer | The total number of results of the search/scroll request | get |

## Getters

| Getter name | Type | Description |
| ``getAggregations()`` | object | Returns the `aggregation` property value |
| ``getCollection()`` | Collection | Returns the `collection` property value |
| ``getDocuments()`` | Document[] | Returns the `documents` property value |
| ``getFetchedDocument()`` | number | Returns the `fetchedDocument` property value |
| ``getOptions()`` | object | Returns the `options` property value |
| ``getFilters()`` | object | Returns the `filters` property value |
| ``getTotal()`` | integer | Returns the `total` property value |


## fetchNext

```js
// Using callbacks (NodeJS or Web Browser)
searchResult.fetchNext(function (error, nextSearchResult) {
  // called once the fetchNext action has been completed
  // nextSearchResult is an instantiated SearchResult object
});

// Using promises (NodeJS)
searchResult.fetchNextPromise()
  .then(nextSearchResult => {
    // called once the fetchNext action has been completed
    // nextSearchResult is an instantiated SearchResult object
  });
```

```java
searchResult.fetchNext(new ResponseListener<SearchResult>() {
  @Override
  public void onSuccess(SearchResult nextSearchResult) {
    // called once the fetchNext action has been completed
    // nextSearchResult is an instantiated SearchResult object
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
});
```

```php
<?php

use \Kuzzle\SearchResult;

// ...

/**
 * @var $searchResult SearchResult
 */

try {
  $nextSearchResult = $searchResult->fetchNext();
} catch (ErrorException $e) {
    // Handle error
}
```

Fetches the next SearchResult, by triggering a new search/scroll request depending on the options and filters of the SearchResult.

If the previous request was a search or a scroll action which provided a `scroll` argument,
`fetchNext` will use the `scrollId` retrieved from the current result to make a new scroll request.

If the previous request was a search action which provided `from` and `size` arguments,
`fetchNext` will add `size` to `from` and make a new search request.
