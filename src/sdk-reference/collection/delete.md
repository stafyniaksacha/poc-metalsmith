---
layout: full.html
language-tab: true
algolia: true
title: delete
---

# delete

<aside class="warning">
Since the 2.0 version, ElasticSearch <a href="https://www.elastic.co/guide/en/elasticsearch/reference/2.4/breaking_20_mapping_changes.html#_types_may_no_longer_be_deleted">removed the ability to delete a Type</a>, which is used internally by Kuzzle to store its collections.<br>
<br>
As such, it is not possible to delete a collection from Kuzzle either. You can still delete all the documents that belong to a collection but if you need to delete the collection mapping, you will need to use a new index.
</aside>
