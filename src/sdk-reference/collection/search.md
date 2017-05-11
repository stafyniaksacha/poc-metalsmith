---
layout: side-code.html
language-tab: true
algolia: true
title: search
---
# search

```js
let filter = {
  filter: {
    and: [
      {
        in: {
          status: ['idle', 'wantToHire', 'toHire', 'riding'],
        }
      },
      {
        in:{
          type: ['cab']
        }
      },
      {
        geo_distance: {
          distance: '10km',
          pos: {
            lat: '48.8566140', lon: '2.352222'
          }
        }
      }
    ]
  },
  aggregations: {
    aggs_name: {
      terms: {
        field: "field_name"
      }
    }
  }
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .search(filter, function (err, searchResult) {
    searchResult.getDocuments().forEach(function(document) {
      console.log(document.toString());
    });
  });

// Using promises (NodeJS only)
kuzzle
  .collection('collection', 'index')
  .searchPromise({})
  .then(searchResult => {
    searchResult.getDocuments().forEach(document => {
      console.log(document.toString());
    });
  });
```

```java
JSONObject filter = new JSONObject()
  .put("filter", new JSONObject()
    .put("and", new JSONArray()
      .put(
        new JSONObject().put("in",
          new JSONObject().put("status",
            new JSONArray()
              .put("idle")
              .put("wantToHire")
              .put("toHire")
              .put("riding")
          )
        )
      )
      .put(
        new JSONObject().put("in",
          new JSONObject()
            .put("type", new JSONArray().put("cab"))
        )
      )
      .put(
        new JSONObject().put("geo_distance",
          new JSONObject()
            .put("distance", "10km")
            .put("pos",
              new JSONObject()
                .put("lat", "48.8566140")
                .put("lon", "2.352222")
            )
        )
      )
    )
  )
  .put("aggregations", new JSONObject()
    .put("aggs_name", new JSONObject()
      .put("terms", new JSONObject()
        .put("field", "field_name")
      )
    )
  );

kuzzle
  .collection("collection", "index")
  .search(filter, new ResponseListener<SearchResult>() {
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

$filters = [
  'filter' => [
    'and' => [
      [
        'in' => [
          'status' => ['idle', 'wantToHire', 'toHire', 'riding'],
        ]
      ],
      [
        'in' => [
          'type' => ['cab']
        ]
      ],
      [
        'geo_distance' => [
          'distance' => '10km',
          'pos' => [
            'lat' => '48.8566140',
            'lon' => '2.352222'
          ]
        ]
      ]
    ]
  ],
  'aggregations' => [
    'aggs_name' => [
      'terms' => [
        'field' => 'field_name'
      ]
    ]
  ]
];

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

> Callback response:

Resolves to an instantiated [SearchResult](#searchresult) object.


<aside class="notice">
  There is a small delay between documents creation and their existence in our search layer, usually a couple of seconds. That means that a document that was just been created won't be returned by this function
</aside>

Executes a search on the data collection.

## search(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON object | Filters in [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/query-dsl.html) format |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |


### Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | number | Provide the starting offset of the request (used to paginate results) | ``0`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``scroll`` | string | Start a scroll session, with a time to live equals to this parameter's value following the [Elastisearch time format](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/common-options.html#time-units) | ``undefined`` |
| ``size`` | number | Provide the maximum number of results of the request (used to paginate results) | ``10`` |

<aside class="notice">
  To get more information about scroll sessions, please refer to the <a href="/api-reference/#search">API reference documentation</a>.
</aside>

## Callback response


Resolves to an instantiated [SearchResult](#searchresult) object.
