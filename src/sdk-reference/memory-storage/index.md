---
layout: side-code.html
language-tab: true
algolia: true
title: MemoryStorage
---

# MemoryStorage

Kuzzle's memory storage is a data store separated from the database layer.
It is internally based on Redis, and most of its functions are exposed by Kuzzle.

## Constructors

```js
/*
 Constructor is not exposed in the JS/Node SDK. You may get the instantiated
 MemoryStorage object by calling Kuzzle.memoryStorage
 */
var memoryStorage = kuzzle.memoryStorage;
```

```java
// using the static instance
MemoryStorage memoryStorage = kuzzle.memoryStorage;

// or instantiating a new MemoryStorage object
MemoryStorage memoryStorage = new MemoryStorage(kuzzle);
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\MemoryStorage;

$kuzzle = new Kuzzle('localhost');

// using the static instance
$memoryStorage = $kuzzle->memoryStorage();

// or instantiating a new MemoryStorage object
$memoryStorage = new MemoryStorage($kuzzle);
```

### MemoryStorage(Kuzzle)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `Kuzzle` | object | An instantiated `Kuzzle` object |


## Properties

There are no exposed properties for this object.

## append

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.append('key', 'value', function (err, newLength) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.appendPromise('key', 'value')
  .then(newLength => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.append("key", "value", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int newLength) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $newLength = $kuzzle->memoryStorage()->append('key', 'value');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
5
```

Appends a value to a key. If the key does not exist, it is created.

[[_Redis documentation_]](https://redis.io/commands/append)

### append(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Value to append to the key |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the new length of the key's value

## bitcount

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.bitcount('key', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.bitcountPromise('key')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.bitcount("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->bitcount('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
21
```

Counts the number of set bits (population counting) in a string.

[[_Redis documentation_]](https://redis.io/commands/bitcount)

### bitcount(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `end` | int | Ending offset | `-1` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |
| `start` | int | Starting offset | `0` |


### Callback response

Resolves to an integer containing the count of set bits

## bitop

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.bitop('key', 'AND', ['srckey1', 'srckey2', '...'], function (err, length) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.bitopPromise('key', 'AND', ['srckey1', 'srckey2', '...'])
  .then(length => {
    // resolved once the action has completed
  });
```

```java
JSONArray sourceKeys = new JSONArray().put("srckey1").put("srckey2").put("...");
kuzzle.memoryStorage.bitop("key", "AND", sourceKeys, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int length) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $length = $kuzzle->memoryStorage()->bitop('key', 'AND', ['srckey1', 'srckey2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
42
```


Performs a bitwise operation between multiple keys (containing string values) and stores the result in the destination key.

[[_Redis documentation_]](https://redis.io/commands/bitop)

### bitop(key, operation, keys, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Destination key identifier |
| `operation` | string | Bitwise operation to perform.<br/>Allowed values: `AND`, `OR`, `XOR`, `NOT` |
| `keys` | array | list of source keys on which the bitwise operation will be applied |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the length of the new key's value

## bitpos

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.bitpos('key', 0, function (err, position) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.bitpos('key', 0)
  .then(position => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.bitpos("key", 0, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int position) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $position = $kuzzle->memoryStorage()->bitpos('key', 0);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
0
```


Returns the position of the first bit set to 1 or 0 in a string, or in a substring.

[[_Redis documentation_]](https://redis.io/commands/bitpos)

### bitpos(key, bit, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `bit` | int | Bit to search.<br/>Allowed values: `0`, `1` |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `end` | int | Ending offset | `-1` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |
| `start` | int | Starting offset | `0` |


### Callback response

Resolves to an integer containing the first position of the searched bit in the string value

## dbsize

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.dbsize(function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.dbsize()
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.dbsize(new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->dbsize();
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
12
```

Returns the number of keys in the application database.

[[_Redis documentation_]](https://redis.io/commands/dbsize)

### dbsize([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the number of keys in the application database

## decr

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.decr('key', function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.decrPromise('key')
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.decr("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->decr('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
-1
```

Decrements the number stored at `key` by 1. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/decr)

### decr(key, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the updated key value

## decrby

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.decrby('key', 42, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.decrbyPromise('key', 42)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.decrby("key", 42, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->decrby('key', 42);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
57
```

Decrements the number stored at `key` by a provided integer value. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/decrby)

### decrby(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | int | Decrement value |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the updated key value

## del

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.del(['key1', 'key2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.delPromise(['key1', 'key2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");
kuzzle.memoryStorage.del(keys, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->del(['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```

Deletes a list of keys.

[[_Redis documentation_]](https://redis.io/commands/del)

### del(keys, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `keys` | array | List of keys to delete |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of deleted keys.

## exists

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.exists(['key1', 'key2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.existsPromise(['key1', 'key2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");
kuzzle.memoryStorage.exists(keys, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->exists(['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Checks if the specified keys exist in the database.

[[_Redis documentation_]](https://redis.io/commands/exists)

### exists(keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `keys` | array | List of keys to check for existence |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the number of existing keys amongst the provided list.

## expire

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.expire('key', 42, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.expirePromise('key', 42)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.expire("key", 42, new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->expire('key', 42);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets a timeout (in seconds) on a key. After the timeout has expired, the key will automatically be deleted.

[[_Redis documentation_]](https://redis.io/commands/expire)

### expire(key, seconds, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `seconds` | int | Time to live, in seconds |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the operation status (`0`: fail, `1`: success).

## expireat

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.expireat('key', 1488372354, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.expireatPromise('key', 1488372354)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.expireat("key", 1488372354, new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->expireat('key', 1488372354);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets an expiration timestamp on a key. After the timestamp has been reached, the key will automatically be deleted.
The `timestamp` parameter accepts an [Epoch time](https://en.wikipedia.org/wiki/Unix_time) value.

[[_Redis documentation_]](https://redis.io/commands/expireat)

### expireat(key, timestamp, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `timestamp` | int | Expiration timestamp |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the operation status (`0`: fail, `1`: success).

## flushdb

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.flushdb(function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.flushdbPromise()
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.flushdb(new ResponseListener<Long>() {
  @Override
  public void onSuccess(int status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->flushdb();
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Deletes all the keys of the database dedicated to client applications (the reserved space for Kuzzle is unaffected).

[[_Redis documentation_]](https://redis.io/commands/flushdb)

### flushdb([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to a simple "OK" string.

## geoadd

```js
// Using callbacks (NodeJS or Web Browser)
var points = [
  {
    lon: 13.361389,
    lat: 38.115556,
    name: 'Palermo'
  },
  {
    lon: 15.087269,
    lat: 37.502669,
    name: 'Catania'
  }
];

kuzzle.memoryStorage.geoadd('key', points, function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.geoaddPromise('key', points)
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray points = new JSONArray()
  .put(new JSONObject()
    .put("lon", 13.361389)
    .put("lat", 38.115556)
    .put("name", "Palermo")
  )
  .put(new JSONObject()
    .put("lon", 15.087269)
    .put("lat", 37.502669)
    .put("name", "Catania")
  );

kuzzle.memoryStorage.geoadd("key", points, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$points = [
  [
    'lon' => 13.361389,
    'lat' => 38.115556,
    'name' => 'Palermo'
  ],
  [
    'lon' => 15.087269,
    'lat' => 37.502669,
    'name' => 'Catania'
  ]
];

try {
  $count = $kuzzle->memoryStorage()->geoadd('key', points);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Adds geospatial points to the specified key.

[[_Redis documentation_]](https://redis.io/commands/geoadd)

### geoadd(key, points, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Destination key identifier |
| `points` | array of objects | List of geospatial points to add. Each point is described by a JSON object containing the following properties:<br/>`lon` (longitude, `float`), `lat` (latitude, `float`), `name` (point identifier, `string`) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of points added to the key

## geodist

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.geodist('key', 'Palermo', 'Catania', function (err, distance) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.geodistPromise('key', 'Palermo', 'Catania')
  .then(distance => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.geodist("key", "Palermo", "Catania", new ResponseListener<double>() {
  @Override
  public void onSuccess(double distance) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $distance = $kuzzle->memoryStorage()->geodist('key', 'Palermo', 'Catania');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
166274.1516
```

Returns the distance between two geospatial members of a key (see [geoadd](#geoadd)).  
The returned distance is expressed in meters by default.

[[_Redis documentation_]](https://redis.io/commands/geodist)

### geodist(key, member1, member2, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member1` | string | Name of the first geospatial point |
| `member2` | string | Name of the second geospatial point |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |
| `unit` | string | Distance unit.<br/>Allowed values: `m`, `km`, `mi`, `ft` | `m` |


### Callback response

Resolves to the calculated distance between the two provided geospatial points

## geohash

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.geohash('key', ['Palermo', 'Catania'], function (err, hashes) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.geohashPromise('key', ['Palermo', 'Catania'])
  .then(hashes => {
    // resolved once the action has completed
  });
```

```java
JSONArray members = new JSONArray().put("Palermo").put("Catania");
kuzzle.memoryStorage.geohash("key", members, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray hashes) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $hashes = $kuzzle->memoryStorage()->geohash('key', ['Palermo', 'Catania']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
["sqc8b49rny0", "sqdtr74hyu0"]
```

Returns a valid [geohash](https://en.wikipedia.org/wiki/Geohash) for the provided key's members (see [geoadd](#geoadd)).  

[[_Redis documentation_]](https://redis.io/commands/geohash)

### geohash(key, members, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `members` | array | List of geospatial points contained in the key |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an array of geohashes, in the same order than the provided members list.

## geopos

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.geopos('key', ['Palermo', 'Catania'], function (err, positions) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.geoposPromise('key', ['Palermo', 'Catania'])
  .then(positions => {
    // resolved once the action has completed
  });
```

```java
JSONArray members = new JSONArray().put("Palermo").put("Catania");
kuzzle.memoryStorage.geopos("key", members, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray positions) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $positions = $kuzzle->memoryStorage()->geopos('key', ['Palermo', 'Catania']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[ [13.361389, 38.115556], [15.087269, 37.502669]]
```


Returns the positions (longitude, latitude) of the provided key's members (see [geoadd](#geoadd)).  

[[_Redis documentation_]](https://redis.io/commands/geopos)

### geopos(key, members, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `members` | array | List of geospatial points contained in the key |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an array of longitude-latitude pairs, in the same order than the provided members list.  

## georadius

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.georadius('key', 15, 37, 200, 'km', function (err, points) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.georadiusPromise('key', 15, 37, 200, 'km')
  .then(points => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.georadius("key", 15, 37, 200, "km", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray points) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $points = $kuzzle->memoryStorage()->georadius('key', 15, 37, 200, 'km');
}
catch (ErrorException $e) {

}
```

> Callback response, with no option provided:

```json
[
  {"name": "Palermo"},
  {"name": "Catania"}
]
```

> Callback response, with the "withcoord" option:

```json
[
  {"name": "Palermo", "coordinates": [13.361389338970184, 38.1155563954963]},
  {"name": "Catania", "coordinates": [15.087267458438873, 37.50266842333162]}
]
```

> Callback response, with the "withdist" option:

```json
[
  {"name": "Palermo", "distance": 190.4424},
  {"name": "Catania", "distance": 56.4413}
]
```

Returns the members (added with [geoadd](#geoadd)) of a given key inside the provided geospatial radius.

[[_Redis documentation_]](https://redis.io/commands/georadius)

### georadius(key, longitude, latitude, distance, unit, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `longitude` | double | Longitude of the center of the radius |
| `latitude` | double | Latitude of the center of the radius |
| `distance` | double | Maximum distance from the center |
| `unit`  | string | Distance unit |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `count` | int | Limit the result set to `count` members | `null` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |
| `sort` | string | Return items from the nearest to the farthest to the center (`ASC`) or vice versa (`DESC`) | `null` |
| `withcoord` | boolean | Also return the longitude and latitude coordinates of the matching items | `false` |
| `withdist` | boolean | Also return the distance of the returned items from the specified center, in the same unit than the one provided with `unit` | `false` |

### Callback response

Resolves to an array of point names inside the provided radius.

## georadiusbymember

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.georadiusbymember('key', 'Palermo', 200, 'km', function (err, points) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.georadiusbymemberPromise('key', 'Palermo', 200, 'km')
  .then(points => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.georadiusbymember("key", "Palermo", 200, "km", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray points) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $points = $kuzzle->memoryStorage()->georadiusbymember('key', 'Palermo', 200, 'km');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  {"name": "Palermo"},
  {"name": "Catania"}
]
```
> Callback response, with the "withcoord" option:

```json
[
  {"name": "Palermo", "coordinates": [13.361389338970184, 38.1155563954963]},
  {"name": "Catania", "coordinates": [15.087267458438873, 37.50266842333162]}
]
```

> Callback response, with the "withdist" option:

```json
[
  {"name": "Palermo", "distance": 190.4424},
  {"name": "Catania", "distance": 56.4413}
]
```

Returns the members (added with [geoadd](#geoadd)) of a given key inside the provided geospatial radius, centered around one of a key's member.


[[_Redis documentation_]](https://redis.io/commands/georadiusbymember)

### georadiusbymember(key, member, distance, unit, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member` | string | Name of the point to use as the center of the radius |
| `distance` | double | Maximum distance from the center |
| `unit`  | string | Distance unit |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `count` | int | Limit the result set to `count` members | `null` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |
| `sort` | string | Return items from the nearest to the farthest to the center (`ASC`) or vice versa (`DESC`) | `null` |
| `withcoord` | boolean | Also return the longitude and latitude coordinates of the matching items | `false` |
| `withdist` | boolean | Also return the distance of the returned items from the specified center, in the same unit than the one provided with `unit` | `false` |


### Callback response

Resolves to an array of point names inside the provided radius.

## get

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.get('key', function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.getPromise('key')
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.get("key", new ResponseListener<String>() {
  @Override
  public void onSuccess(String value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->get('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"value"
```

Returns the value of a key, or null if the key doesn’t exist.

[[_Redis documentation_]](https://redis.io/commands/get)

### get(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to the key's value.

## getbit

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.getbit('key', 10, function (err, bit) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.getbitPromise('key', 10)
  .then(bit => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.getbit("key", 10, new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int bit) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $bit = $kuzzle->memoryStorage()->getbit('key', 10);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Returns the bit value at `offset`, in the string value stored in a key.

[[_Redis documentation_]](https://redis.io/commands/getbit)

### getbit(key, offset, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `offset` | int | Offset position in the key's value |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to the bit value at the provided offset.

## getrange

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.getrange('key', 2, 4, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.getrangePromise('key', 2, 4)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.getrange("key", 2, 4, new ResponseListener<String>() {
  @Override
  public void onSuccess(String value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->getrange('key', 2, 4);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"lue"
```

Returns a substring of a key's value (index starts at position `0`).

[[_Redis documentation_]](https://redis.io/commands/getrange)

### getrange(key, start, end, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `start` | int | Starting index |
| `end` | int | Ending index |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to a substring of the key's value.

## getset

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.getset('key', 'new value', function (err, oldValue) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.getsetPromise('key', 'new value')
  .then(oldValue => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.getset("key", "new value", new ResponseListener<String>() {
  @Override
  public void onSuccess(String oldValue) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $oldValue = $kuzzle->memoryStorage()->getset('key', 'oldValue');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"value"
```

Sets a new value for a key and returns its previous value.

[[_Redis documentation_]](https://redis.io/commands/getset)

### getset(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Key's new value |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to the key's previous value.

## hdel

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hdel('key', ['field1', 'field2'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hdelPromise('key', ['field1', 'field2'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray fields = new JSONArray().put("field1").put("field2");
kuzzle.memoryStorage.hdel("key", fields, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->hdel('key', ['field1', 'field2']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Removes fields from a hash.

[[_Redis documentation_]](https://redis.io/commands/hdel)

### hdel(key, fields, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `fields` | array | List of field names to delete |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to the number of removed fields.

## hexists

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hexists('key', 'field1', function (err, exists) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hexistsPromise('key', 'field1')
  .then(exists => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hexists("key", "field1", new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int exists) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $exists = $kuzzle->memoryStorage()->hexists('key', 'field1');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Checks if a field exists in a hash.

[[_Redis documentation_]](https://redis.io/commands/hexists)

### hexists(key, field, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Field name |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

`1` if field exists, `0` otherwise.

## hget

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hget('key', 'field1', function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hgetPromise('key', 'field1')
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hget("key", "field1", new ResponseListener<String>() {
  @Override
  public void onSuccess(String value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->hget('key', 'field1');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"foo"
```

Returns the field’s value of a hash.

[[_Redis documentation_]](https://redis.io/commands/hget)

### hget(key, field, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Field name |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Returns the requested field's value.

## hgetall

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hgetall('key', function (err, hash) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hgetallPromise('key')
  .then(hash => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hgetall("key", new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject hash) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $hash = $kuzzle->memoryStorage()->hgetall('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{
  "field1": "value",
  "field2": "value",
  "...": "..."
}
```

Returns all fields and values of a hash.

[[_Redis documentation_]](https://redis.io/commands/hgetall)

### hgetall(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to a JSON object containing the fields and values of a hash.

## hincrby

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hincrby('key', 'field', 42, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hincrbyPromise('key', 'field', 42)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hincrby("key", "field", 42, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->hincrby('key', 'field', 42);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
45
```

Increments the number stored in a hash field by the provided integer value.

[[_Redis documentation_]](https://redis.io/commands/hincrby)

### hincrby(key, field, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Hash field to increment |
| `value` | int | Increment value |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to the new incremented value.

## hincrbyfloat

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hincrbyfloat('key', 'field', 3.14159, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hincrbyfloatPromise('key', 'field', 3.14159)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hincrbyfloat("key", "field", 3.14159, new ResponseListener<Double>() {
  @Override
  public void onSuccess(int value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->hincrbyfloat('key', 'field', 3.14159);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
48.14159
```

Increments the number stored in a hash field by the provided float value.

[[_Redis documentation_]](https://redis.io/commands/hincrbyfloat)

### hincrbyfloat(key, field, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Hash field to increment |
| `value` | double | Increment value |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to the new incremented value, as a floating point number.

## hkeys

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hkeys('key', function (err, fields) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hkeysPromise('key')
  .then(fields => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hkeys("key", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray fields) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $fields = $kuzzle->memoryStorage()->hkeys('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "field1",
  "field2",
  "..."
]
```

Returns all field names contained in a hash.

[[_Redis documentation_]](https://redis.io/commands/hkeys)

### hkeys(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves an array of field names.

## hlen

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hlen('key', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hlenPromise('key')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hlen("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->hlen('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
13
```

Returns the number of fields contained in a hash.

[[_Redis documentation_]](https://redis.io/commands/hlen)

### hlen(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the number of fields in the hash.

## hmget

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hmget('key', ['field1', 'field2', '...'], function (err, values) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hmgetPromise('key', ['field1', 'field2', '...'])
  .then(values => {
    // resolved once the action has completed
  });
```

```java
JSONArray fields = new JSONArray().put("field1").put("field2");

kuzzle.memoryStorage.hmget("key", fields, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray values) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $values = $kuzzle->memoryStorage()->hmget('key', ['field1', 'field2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "field1's value",
  "field2's value",
  "..."
]
```

Returns the values of the specified hash’s fields.

[[_Redis documentation_]](https://redis.io/commands/hmget)

### hmget(key, fields, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `fields` | array | List of fields to examine |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an array containing the specified fields values.

## hmset

```js
var entries = [
  {"field": "field1", "value": "foo"},
  {"field": "field2", "value": "bar"},
  {"field": "...", "value": "..."}
];

// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hmset('key', entries, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hmsetPromise('key', entries)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
JSONArray entries = new JSONArray()
  .put(new JSONObject().put("field", "field1").put("value", "foo"))
  .put(new JSONObject().put("field", "field2").put("value", "bar"))
  .put(new JSONObject().put("field", "...").put("value", "..."));

kuzzle.memoryStorage.hmset("key", entries, new ResponseListener<String>() {
  @Override
  public void onSuccess(String status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

$entries = [
  ['field' => 'field1', 'value' => 'foo'],
  ['field' => 'field2', 'value' => 'bar'],
  ['field' => '...', 'value' => '...']
];

try {
  $status = $kuzzle->memoryStorage()->hmset('key', entries);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Sets multiple fields at once in a hash.

[[_Redis documentation_]](https://redis.io/commands/hmset)

### hmset(key, entries, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `entries` | array | List of fields to add, with their value. Each entry is described by a JSON object containing the following properties:<br/>`field` (field name), `value` (field's value) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to a simple "OK" string.

## hscan

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hscan('key', 0, function (err, page) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hscanPromise('key', 0)
  .then(page => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hscan("key", 0, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray page) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $page = $kuzzle->memoryStorage()->hscan('key', 0);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  18,
  [
    "field1",
    "field1's value",
    "field2",
    "field2's value"
  ]
]
```

Identical to [scan](#scan), except that `hscan` iterates the fields contained in a hash.  

[[_Redis documentation_]](https://redis.io/commands/hscan)

### hscan(key, cursor, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `cursor` | int | Page number (iteration starts with a cursor value of `0`, and ends when the next cursor position is `0`) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `count` | int | Return the _approximate_ `count` number of items per result page | `10` |
| `match` | string | Search only for field names matching the provided pattern | `*` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to a JSON array containing 2 entries:

* the cursor position for the next page of results (a next position of `0` indicates the end of the scan)
* a list of, alternatively, field names and their associated value

## hset

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hset('key', 'field', 'value', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hsetPromise('key', 'field', 'value')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hset("key", "field", "value", new ResponseListener<Integer>() {
  @Override
  public void onSuccess(Integer status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->hset('key', 'field', 'value');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets a field and its value in a hash. If the key does not exist, a new key holding a hash is created. If the field already exists, its value is overwritten.

[[_Redis documentation_]](https://redis.io/commands/hset)

### hset(key, field, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Field name to insert or to update |
| `value` | string | Associated field value |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer indicating if the insertion succeeded (`1`) or failed (`0`).

## hsetnx

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hsetnx('key', 'field', 'value', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hsetnxPromise('key', 'field', 'value')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hsetnx("key", "field", "value", new ResponseListener<Integer>() {
  @Override
  public void onSuccess(Integer status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->hsetnx('key', 'field', 'value');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets a field and its value in a hash, only if the field does not already exist.

[[_Redis documentation_]](https://redis.io/commands/hsetnx)

### hsetnx(key, field, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Field name to insert or to update |
| `value` | string | Associated field value |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer indicating if the insertion succeeded (`1`) or failed (`0`).

## hstrlen

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hstrlen('key', 'field', function (err, length) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hstrlenPromise('key', 'field')
  .then(length => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hstrlen("key", "field", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int length) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $length = $kuzzle->memoryStorage()->hstrlen('key', 'field');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```

Returns the string length of a field’s value in a hash.

[[_Redis documentation_]](https://redis.io/commands/hstrlen)

### hstrlen(key, field, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Hash field name |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to the string length of a field's value.

## hvals

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hvals('key', function (err, values) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hvalsPromise('key')
  .then(values => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hvals("key", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray values) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $values = $kuzzle->memoryStorage()->hvals('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "field1's value",
  "field2's value",
  "..."
]
```

Returns all values contained in a hash.

[[_Redis documentation_]](https://redis.io/commands/hvals)

### hvals(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an array containing the values of a hash.

## incr

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.incr('key', function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.incrPromise('key')
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.incr("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->incr('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
42
```

Increments the number stored at `key` by 1. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/incr)

### incr(key, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the updated key value

## incrby

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.incrby('key', -3, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.incrbyPromise('key', -3)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.incrby("key", -3, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->incrby('key', -3);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
39
```

Increments the number stored at `key` by the provided integer value. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/incrby)

### incrby(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | int | Increment value |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the updated key value

## incrbyfloat

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.incrbyfloat('key', -3.14159, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.incrbyfloatPromise('key', -3.14159)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.incrbyfloat("key", -3.14159, new ResponseListener<Double>() {
  @Override
  public void onSuccess(double value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->incrbyfloat('key', -3.14159);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
38.85841
```

Increments the number stored at `key` by the provided float value. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/incrbyfloat)

### incrbyfloat(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | double | Increment value |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to a floating point number containing the updated key value

## keys

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.keys('foo*', function (err, keys) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.keysPromise('foo*')
  .then(keys => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.keys("foo*", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray keys) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $keys = $kuzzle->memoryStorage()->keys('foo*');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "foo",
  "foobar",
  "foofighters"
]
```

Returns all keys matching the provided pattern.

[[_Redis documentation_]](https://redis.io/commands/keys)

### keys(pattern, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `pattern` | string | Pattern used to filter the returned key names |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an array of key names matching the provided pattern.

## lindex

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.lindex('key', 3, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.lindexPromise('key', 3)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.lindex("key", 3, new ResponseListener<String>() {
  @Override
  public void onSuccess(String value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->lindex('key', 3);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"foo"
```

Returns the element at the provided index in a list.

[[_Redis documentation_]](https://redis.io/commands/lindex)

### lindex(key, index, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `index` | int | Element position in the list |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to a string containing the retrieved element's value.

## linsert

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.linsert('key', 'after', 'foo', 'bar', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.linsertPromise('key', 'after', 'foo', 'bar')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.linsert("key", "after", "foo", "bar", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->linsert('key', 'after', 'foo', 'bar');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Inserts a value in a list, either before or after the reference pivot value.

[[_Redis documentation_]](https://redis.io/commands/linsert)

### linsert(key, position, pivot, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `position` | string | Indicates if the new value is to be inserted before or after the pivot value.<br/>Allowed values: `before`, `after` |
| `pivot` | string | Pivot value used as a point of reference in the list |
| `value` | string | The value to insert |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the updated number of items in the list.

## llen

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.llen('key', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.llenPromise('key')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.llen("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->llen('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```

Counts the number of items in a list.

[[_Redis documentation_]](https://redis.io/commands/llen)

### llen(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the number of items of a list.

## lpop

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.lpop('key', function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.lpopPromise('key')
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.lpop("key", new ResponseListener<String>() {
  @Override
  public void onSuccess(String value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->lpop('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"foo"
```

Removes and returns the first element of a list.

[[_Redis documentation_]](https://redis.io/commands/lpop)

### lpop(key, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to the value of the removed item.

## lpush

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.lpush('key', ['foo', 'bar', 'baz'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.lpushPromise('key', ['foo', 'bar', 'baz'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray values = new JSONArray().put("foo").put("bar").put("baz");

kuzzle.memoryStorage.lpush("key", items, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->lpush('key', ['foo', 'bar', 'baz']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
6
```

Prepends the specified values to a list. If the key does not exist, it is created holding an empty list before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/lpush)

### lpush(key, values, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `values` | array | Values to add at the beginning of the list |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the updated number of items in the list.

## lpushx

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.lpushx('key', 'foo', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.lpushxPromise('key', 'foo')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.lpushx("key", "foo", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->lpushx('key', 'foo');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Prepends the specified value to a list, only if the key already exists and if it holds a list.

[[_Redis documentation_]](https://redis.io/commands/lpushx)

### lpush(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | array | Value to add at the beginning of the list |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the updated number of items in the list.

## lrange

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.lrange('key', 0, 1, function (err, values) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.lrangePromise('key', 0, 1)
  .then(values => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.lrange("key", 0, 1, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray values) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $values = $kuzzle->memoryStorage()->lrange('key', 0, 1);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "foo",
  "bar"
]
```

Returns the list elements between the start and stop positions (inclusive).

[[_Redis documentation_]](https://redis.io/commands/lrange)

### lrange(key, start, stop, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `start` | int | Start position |
| `stop` | int | End position |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an array of retrieved values.

## lrem

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.lrem('key', 1, 'foo', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.lremPromise('key', 1, 'foo')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.lrem("key", 1, "foo", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->lrem('key', 1, 'foo');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Removes the first `count` occurences of elements equal to `value` from a list.

[[_Redis documentation_]](https://redis.io/commands/lrem)

### lrem(key, count, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `count` | int | Number of occurences of the value to remove |
| `value` | string | Value to be removed from the list |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of removed elements.

## lset

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.lset('key', 2, 'bar', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.lsetPromise('key', 2, 'bar')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.lset("key", 2, "bar", new ResponseListener<String>() {
  @Override
  public void onSuccess(String status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->lset('key', 2, 'bar');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Sets the list element at `index` with the provided value.

[[_Redis documentation_]](https://redis.io/commands/lset)

### lset(key, index, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `index` | int | Position of the list to update |
| `value` | string | New value at the provided list index |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to a simple "OK" string.

## ltrim

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.ltrim('key', 1, 2, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.ltrimPromise('key', 1, 2)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.ltrim("key", 1, 2, new ResponseListener<String>() {
  @Override
  public void onSuccess(String status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->ltrim('key', 1, 2);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Trims an existing list so that it will contain only the specified range of elements specified.

[[_Redis documentation_]](https://redis.io/commands/ltrim)

### decr(key, start, stop, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `start` | int | Starting position of the range of items to keep (inclusive) |
| `stop` | int | Ending position of the range of items to keep (inclusive) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to a simple "OK" string.

## mget

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.mget(['key1', 'key2', '...'], function (err, values) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.mgetPromise(['key1', 'key2', '...'])
  .then(values => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.mget(keys, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray values) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $values = $kuzzle->memoryStorage()->mget(['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "key1's value",
  "key2's value",
  "..."
]
```

Returns the values of the provided keys.

[[_Redis documentation_]](https://redis.io/commands/mget)

### mget(keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `keys` | string | List of keys to retrieve |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an array of the specified keys' values

## mset

```js
var entries = [
  {key: 'key1', value: 'foo'},
  {key: 'key2', value: 'bar'},
  {key: '...', value: '...'}
];

// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.mset(entries, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.msetPromise(entries)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
JSONArray entries = new JSONArray()
  .put(new JSONObject().put("key", "key1").put("value", "foo"))
  .put(new JSONObject().put("key", "key2").put("value", "bar"))
  .put(new JSONObject().put("key", "...").put("value", "..."));

kuzzle.memoryStorage.mset(entries, new ResponseListener<String>() {
  @Override
  public void onSuccess(String status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$entries = [
  ['key' => 'key1', 'value' => 'foo'],
  ['key' => 'key2', 'value' => 'bar'],
  ['key' => '...', 'value' => '...']
];

try {
  $status = $kuzzle->memoryStorage()->mset(entries);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Sets the provided keys to their respective values. If a key does not exist, it is created. Otherwise, the key’s value is overwritten.

[[_Redis documentation_]](https://redis.io/commands/mset)

### mset(entries, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `entries` | array | List of objects each containing the key identifier to add with its associated value.<br/>Properties: `key` (key identifier), `value` (associated value)  |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to a simple "OK" string.

## msetnx

```js
var entries = [
  {key: 'key1', value: 'foo'},
  {key: 'key2', value: 'bar'},
  {key: '...', value: '...'}
];

// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.msetnx(entries, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.msetnxPromise(entries)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
JSONArray entries = new JSONArray()
  .put(new JSONObject().put("key", "key1").put("value", "foo"))
  .put(new JSONObject().put("key", "key2").put("value", "bar"))
  .put(new JSONObject().put("key", "...").put("value", "..."));

kuzzle.memoryStorage.msetnx(entries, new ResponseListener<Integer>() {
  @Override
  public void onSuccess(String status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$entries = [
  ['key' => 'key1', 'value' => 'foo'],
  ['key' => 'key2', 'value' => 'bar'],
  ['key' => '...', 'value' => '...']
];

try {
  $status = $kuzzle->memoryStorage()->msetnx(entries);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets the provided keys to their respective values, only if they do not exist. If a key exists, then the whole operation is aborted and no key is set.

[[_Redis documentation_]](https://redis.io/commands/msetnx)

### msetnx(entries, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `entries` | array | List of objects each containing the key identifier to add with its associated value.<br/>Properties: `key` (key identifier), `value` (associated value)  |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the operation status (`0`: fail, `1`: success).

## object

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.object('key', 'encoding', function (err, property) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.objectPromise('key', 'encoding')
  .then(property => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.object("key", "encoding", new ResponseListener<String>() {
  @Override
  public void onSuccess(String property) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $property = $kuzzle->memoryStorage()->object('key', 'encoding');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"raw"
```

Inspects the low-level properties of a key.

[[_Redis documentation_]](https://redis.io/commands/object)

### object(key, subcommand, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `subcommand` | string | Name of the low-level property to inspect.<br/>Allowed values: `refcount`, `encoding`, `idletime` |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to the value of the inspected property.

## persist

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.persist('key', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.persistPromise('key')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.persist("key", new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->persist('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Removes the expiration delay or timestamp from a key, making it persistent.

[[_Redis documentation_]](https://redis.io/commands/persist)

### persist(key, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the operation status (`0`: fail, `1`: success).

## pexpire

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.pexpire('key', 42000, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pexpirePromise('key', 42000)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.pexpire("key", 42000, new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->pexpire('key', 42000);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets a timeout (in milliseconds) on a key. After the timeout has expired, the key will automatically be deleted.

[[_Redis documentation_]](https://redis.io/commands/pexpire)

### pexpire(key, ttl, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `ttl` | int | Time to live of the key, in milliseconds |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the operation status (`0`: fail, `1`: success).

## pexpireat

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.pexpireat('key', 1488540242465, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pexpireatPromise('key', 1488540242465)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.pexpireat("key", 1488540242465, new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->pexpireat('key', 1488540242465);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets an expiration timestamp on a key. After the timestamp has been reached, the key will automatically be deleted.  
The `timestamp` parameter accepts an [Epoch time](https://en.wikipedia.org/wiki/Unix_time) value, in milliseconds.

[[_Redis documentation_]](https://redis.io/commands/pexpireat)

### pexpire(key, timestamp, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `timestamp` | int | Key's expiration timestamp, in milliseconds |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the operation status (`0`: fail, `1`: success).

## pfadd

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.pfadd('key', ['foo', 'bar', 'baz'], function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pfaddPromise('key', ['foo', 'bar', 'baz'])
  .then(status => {
    // resolved once the action has completed
  });
```

```java
JSONArray elements = new JSONArray().put("foo").put("bar").put("baz");

kuzzle.memoryStorage.pfadd("key", elements, new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->pfadd('key', ['foo', 'bar', 'baz']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Adds elements to an [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structure.

[[_Redis documentation_]](https://redis.io/commands/pfadd)

### pfadd(key, elements, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `elements` | array | Elements to add to the HyperLogLog structure |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the operation status (`0`: fail, `1`: success).

## pfcount

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.pfcount(['key1', 'key2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pfcountPromise(['key1', 'key2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.pfcount(keys, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->pfcount(['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
42
```

Returns the probabilistic cardinality of a [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structure, or of the merged HyperLogLog structures if more than 1 is provided (see [pfadd](#pfadd)).

[[_Redis documentation_]](https://redis.io/commands/pfcount)

### pfcount(keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `keys` | string | List of HyperLogLog key identifiers |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the aggregated probabilistic cardinality of HyperLogLog structures.

## pfmerge

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.pfmerge('key', ['key1', 'key2', '...'], function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pfmergePromise('key', ['key1', 'key2', '...'])
  .then(status => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.pfmerge('key', keys, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->pfmerge('key', ['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Merges multiple [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structures into an unique HyperLogLog structure stored at `key`, approximating the cardinality of the union of the source structures.

[[_Redis documentation_]](https://redis.io/commands/pfmerge)

### pfmerge(key, sources, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Destination key identifier |
| `sources` | string | List of HyperLogLog source key identifiers |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to a simple "OK" string.

## ping

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.ping(function (err, response) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pingPromise()
  .then(response => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.ping(new ResponseListener<String>() {
  @Override
  public void onSuccess(String response) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $ping = $kuzzle->memoryStorage()->ping();
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"PONG"
```

Pings the memory storage database.

[[_Redis documentation_]](https://redis.io/commands/ping)

### ping([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to a simple "PONG" string.

## psetex

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.psetex('key', 'value', 42000, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.psetexPromise('key', 'value', 42000)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.psetex("key", "value", 42000, new ResponseListener<String>() {
  @Override
  public void onSuccess(String status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->psetex('key', 'value', 42000);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Sets a key with the provided value, and an expiration delay expressed in milliseconds. If the key does not exist, it is created beforehand.

[[_Redis documentation_]](https://redis.io/commands/psetex)

### psetex(key, value, ttl, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Value to set |
| `ttl` | int | Time to live of the key, in milliseconds |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to a simple "OK" string.

## pttl

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.pttl('key', function (err, ttl) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pttlPromise('key')
  .then(ttl => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.pttl("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int ttl) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $ttl = $kuzzle->memoryStorage()->pttl('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
43159
```

Returns the remaining time to live of a key, in milliseconds.

[[_Redis documentation_]](https://redis.io/commands/pttl)

### pttl(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the remaining time to live of the key, in milliseconds.

## randomkey

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.randomkey(function (err, key) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.randomkeyPromise()
  .then(key => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.randomkey(new ResponseListener<String>() {
  @Override
  public void onSuccess(String key) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $key = $kuzzle->memoryStorage()->randomkey();
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"key2"
```

Returns a random key from the memory storage.

[[_Redis documentation_]](https://redis.io/commands/randomkey)

### randomkey([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to one of the stored key name, at random.

## rename

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.rename('key', 'newId', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.renamePromise('key', 'newId')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.rename("key", "newId", new ResponseListener<String>() {
  @Override
  public void onSuccess(String status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->rename('key', 'newId');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Renames a key to `newkey`. If `newkey` already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/rename)

### rename(key, newkey, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `newkey` | string | New key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to a simple "OK" string.

## renamenx

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.renamenx('key', 'newId', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.renamenxPromise('key', 'newId')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.renamenx("key", "newId", new ResponseListener<String>() {
  @Override
  public void onSuccess(String status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->renamenx('key', 'newId');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Renames a key to `newkey`, only if `newkey` does not already exist.

[[_Redis documentation_]](https://redis.io/commands/renamenx)

### renamenx(key, newkey, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `newkey` | string | New key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to a simple "OK" string.

## rpop

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.rpop('key', function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.rpopPromise('key')
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.rpop("key", new ResponseListener<String>() {
  @Override
  public void onSuccess(String value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->rpop('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"foo"
```

Removes and returns the last element of a list.

[[_Redis documentation_]](https://redis.io/commands/rpop)

### rpop(key, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to the value of the removed item.

## rpoplpush

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.rpoplpush('sourceKey', 'destKey', function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.rpoplpushPromise('sourceKey', 'destKey')
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.rpoplpush("sourceKey", "destKey", new ResponseListener<String>() {
  @Override
  public void onSuccess(String value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->rpoplpush('sourceKey', 'destKey');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"foo"
```

Removes the last element of the list at `source` and pushes it back at the start of the list at `destination`.

[[_Redis documentation_]](https://redis.io/commands/rpoplpush)

### rpoplpush(source, destination, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `source` | string | Source key identifier |
| `destination` | string | Destination key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to the value of the removed and pushed item.

## rpush

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.rpush('key', ['foo', 'bar', 'baz'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.rpushPromise('key', ['foo', 'bar', 'baz'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray values = new JSONArray().put("foo").put("bar").put("baz");

kuzzle.memoryStorage.rpush("key", items, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->rpush('key', ['foo', 'bar', 'baz']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
6
```

Appends the specified values at the end of a list. If the key does not exist, it is created holding an empty list before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/rpush)

### rpush(key, values, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `values` | array | Values to add at the end of the list |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the updated number of items in the list.

## rpushx

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.rpushx('key', 'foo', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.rpushxPromise('key', 'foo')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.rpushx("key", "foo", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->rpushx('key', 'foo');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Appends the specified value at the end of a list, only if the key already exists and if it holds a list.

[[_Redis documentation_]](https://redis.io/commands/rpushx)

### rpushx(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Value to add at the end of the list |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the updated number of items in the list.

## sadd

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sadd('key', ['foo', 'bar', 'baz'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.saddPromise('key', ['foo', 'bar', 'baz'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray values = new JSONArray().put("foo").put("bar").put("baz");

kuzzle.memoryStorage.sadd("key", items, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->sadd('key', ['foo', 'bar', 'baz']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
6
```

Adds members to a set of unique values stored at `key`. If the `key` does not exist, it is created beforehand.

[[_Redis documentation_]](https://redis.io/commands/sadd)

### sadd(key, members, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `members` | array | Members to add to the list of unique values |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of added elements to the set.

## scan

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.scan(0, function (err, page) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.scanPromise(0)
  .then(page => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.scan(0, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray page) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $page = $kuzzle->memoryStorage()->scan(0);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  18,
  [
    "key1",
    "key2",
    "..."
  ]
]
```

Iterates incrementally the set of keys in the database using a cursor.

An iteration starts when the cursor is set to `0`.  
To get the next page of results, simply re-send the identical request with the updated cursor position provided in the result set.  
The scan terminates when the next position cursor returned by the server is `0`.

[[_Redis documentation_]](https://redis.io/commands/scan)

### scan(cursor, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `cursor` | int | Page number (iteration starts with a cursor value of `0`, and ends when the next cursor position is `0`) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `count` | int | Return the _approximate_ `count` number of items per result page | `10` |
| `match` | string | Search only for field names matching the provided pattern | `*` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to a JSON array containing 2 entries:

* the cursor position for the next page of results (a next position of `0` indicates the end of the scan)
* a list of keys

## scard

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.scard('key', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.scardPromise('key')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.scard("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->scard('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```

Returns the number of members stored in a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/scard)

### scard(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the number of items in the set.

## sdiff

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sdiff('key', ['key1', 'key2', '...'], function (err, diff) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sdiffPromise('key', ['key1', 'key2', '...'])
  .then(diff => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.sdiff("key", keys, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray diff) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $diff = $kuzzle->memoryStorage()->sdiff('key', ['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "diff value1",
  "diff value2",
  "..."
]
```


Returns the difference between the set of unique values stored at `key` and the other provided sets.

[[_Redis documentation_]](https://redis.io/commands/sdiff)

### sdiff(key, keys, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier to compare |
| `keys` | array | list of set keys to compare with the set stored at `key` |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an array of differences.

## sdiffstore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sdiffstore('key', ['key1', 'key2', '...'], 'destination', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sdiffstorePromise('key', ['key1', 'key2', '...'], 'destination')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.sdiffstore("key", keys, "destination", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->sdiffstore('key', ['key1', 'key2', '...'], 'destination');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```


Computes the difference between the set of unique values stored at `key` and the other provided sets, and stores the result in the key stored at `destination`.

If the `destination` key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sdiffstore)

### sdiffstore(key, keys, destination, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier to compare |
| `keys` | array | list of set keys to compare with the set stored at `key` |
| `destination` | string | Destination key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of stored elements.

## set

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.set('key', 'value', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.setPromise('key', 'value')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.set("key", "value", new ResponseListener<String>() {
  @Override
  public void onSuccess(String status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->set('key', 'value');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Creates a key holding the provided value, or overwrites it if it already exists.

[[_Redis documentation_]](https://redis.io/commands/set)

### set(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Value to store |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `ex` | int | Time to live of the key, in seconds | `0` |
| `nx` | boolean | Set the key only if it does not already exist | `false` |
| `px` | int | Time to live of the key, in milliseconds | `0` |
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |
| `xx` | boolean | Set the key only if it already exists | `false` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to a simple "OK" string.

## setex

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.setex('key', 'value', 42, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.setexPromise('key', 'value', 42)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.setex("key", "value", 42, new ResponseListener<String>() {
  @Override
  public void onSuccess(String status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->setex('key', 'value', 42);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Sets a key with the provided value, and an expiration delay expressed in seconds. If the key does not exist, it is created beforehand.

[[_Redis documentation_]](https://redis.io/commands/setex)

### setex(key, value, ttl, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Value to set |
| `ttl` | int | Time to live of the key, in seconds |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to a simple "OK" string.

## setnx

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.setnx('key', 'value', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.setnxPromise('key', 'value')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.setnx("key", "value", new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->setnx('key', 'value');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets a value on a key, only if it does not already exist.

[[_Redis documentation_]](https://redis.io/commands/setnx)

### setnx(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Value to store |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer indicating if the insertion succeeded (`1`) or failed (`0`).

## sinter

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sinter(['key1', 'key2', '...'], function (err, values) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sinterPromise(['key1', 'key2', '...'])
  .then(values => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.sinter(keys, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray values) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $values = $kuzzle->memoryStorage()->sinter(['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "intersection value1",
  "intersection value2",
  "..."
]
```

Returns the intersection of the provided sets of unique values.

[[_Redis documentation_]](https://redis.io/commands/sinter)

### sinter(keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `keys` | string | List of sets of unique values to intersect |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an array of the values in the computed intersection.

## sinterstore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sinterstore('destination', ['key1', 'key2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sinterstorePromise('destination', ['key1', 'key2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.sinterstore("destination", keys, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->sinterstore('destination', ['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Computes the intersection of the provided sets of unique values and stores the result in the `destination` key.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sinterstore)

### sinterstore(destination, keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `destination` | string | Destination key identifier |
| `keys` | array | List of sets of unique values to intersect |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of elements in the stored intersection.

## sismember

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sismember('key', 'member', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sismemberPromise('key', 'member')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.sismember("key", "member", new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->sismember('key', 'member');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Checks if `member` is a member of the set of unique values stored at `key`.

[[_Redis documentation_]](https://redis.io/commands/sismember)

### sismember(key, member, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member` | string | Value tested against the set of unique values |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer indicating if the provided value is a member of the set (`1`) or not (`0`).

## smembers

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.smembers('key', function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.smembersPromise('key')
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.smembers("key", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray members) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $members = $kuzzle->memoryStorage()->smembers('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "member1",
  "member2",
  "..."
]
```

Returns the members of a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/smembers)

### smembers(key, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an array of values held by the provided set.

## smove

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.smove('key', 'destination', 'member', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.smovePromise('key', 'destination', 'member')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.smove("key", "destination", "member", new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $status = $kuzzle->memoryStorage()->smove('key', 'destination', 'member');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Moves a member from a set of unique values to another.

[[_Redis documentation_]](https://redis.io/commands/smove)

### smove(key, destination, member, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Source key identifier |
| `destination` | string | Destination key identifier |
| `member` | string | Member to be moved |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the operation status (`0`: fail, `1`: success).

## sort

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sort('key', function (err, values) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sortPromise('key')
  .then(values => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.sort("key", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray values) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $values = $kuzzle->memoryStorage()->sort('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "sorted element1",
  "sorted element2",
  "..."
]
```

Sorts and returns elements contained in a list, a set of unique values or a sorted set.
By default, sorting is numeric and elements are compared by their value interpreted as double precision floating point number.

<aside class="left notice">
While Kuzzle API supports the "store" option for this command, SDK methods do not, as it changes drastically the result format. To sort and store in the same process, use the <a href="#query">query method</a>
</aside>

[[_Redis documentation_]](https://redis.io/commands/sort)

### sort(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `alpha` | boolean | Perform an alphanumerical sort instead of a numeric one | `false` |
| `by` | string | Instead of sorting the values stored at `key`, use them to complete the provided key pattern, and return the sorted list of values stored in those keys. | `null` |
| `direction` | string | Sort in ascendant (`ASC`) or descendant (`DESC`)  order | `ASC` |
| `get` | array | Sort the values stored at `key` but, instead of returning these directly, return the values contained in external keys, using the provided array of patterns completed by the sorted values | `null` |
| `limit` | array | Limit the result set to a range of matching elements (similar to _SELECT LIMIT offset, count_ in SQL).<br/>Format: `[<offset(int)>, <count(int)>]` | `null` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

### Callback response

Resolves to an array of sorted values.

## spop

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.spop('key', function (err, elements) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.spopPromise('key')
  .then(elements => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.spop("key", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray elements) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $elements = $kuzzle->memoryStorage()->spop('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[ "removed element" ]
```

Removes and returns one or more elements at random from a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/spop)

### spop(key, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `count` | int | Number of elements to remove | `1` |
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an array of removed elements.

## srandmember

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.srandmember('key', function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.srandmemberPromise('key')
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.srandmember("key", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray members) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $members = $kuzzle->memoryStorage()->srandmember('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "member1",
  "member2",
  "..."
]
```

Returns one or more members of a set of unique values, at random.  
If `count` is provided and is positive, the returned values are unique. If `count` is negative, a set member can be returned multiple times.

[[_Redis documentation_]](https://redis.io/commands/srandmember)

### srandmember(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `count` | int | Number of members to return. If set with a positive value, the returned values are unique. If `count` is negative, a set member can be returned multiple times | `1` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an array of members of a set of unique values.

## srem

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.srem('key', ['member1', 'member2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sremPromise('key', ['member1', 'member2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray members = new JSONArray().put("member1").put("member2").put("...");

kuzzle.memoryStorage.srem("key", members, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->srem('key', ['member1', 'member2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Removes members from a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/srem)

### srem(key, members, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `members` | array | List of members to remove from the set |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of removed elements.

## sscan

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sscan('key', 0, function (err, page) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sscanPromise('key', 0)
  .then(page => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.sscan("key", 0, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray page) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $page = $kuzzle->memoryStorage()->sscan('key', 0);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  18,
  [
    "member1",
    "member2",
    "..."
  ]
]
```

Identical to [scan](#scan), except that `sscan` iterates the members held by a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/sscan)

### sscan(key, cursor, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `cursor` | int | Page number (iteration starts with a cursor value of `0`, and ends when the next cursor position is `0`) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `count` | int | Return the _approximate_ `count` number of items per result page | `10` |
| `match` | string | Search only for member values matching the provided pattern | `*` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to a JSON array containing 2 entries:

* the cursor position for the next page of results (a next position of `0` indicates the end of the scan)
* a list of members

## strlen

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.strlen('key', function (err, length) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.strlenPromise('key')
  .then(length => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.strlen("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int length) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $length = $kuzzle->memoryStorage()->strlen('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
13
```

Returns the length of a value stored at `key`.

[[_Redis documentation_]](https://redis.io/commands/strlen)

### strlen(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the length of a value.

## sunion

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sunion(['key1', 'key2', '...'], function (err, values) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sunionPromise(['key1', 'key2', '...'])
  .then(values => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.sunion(keys, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray values) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $values = $kuzzle->memoryStorage()->sunion(['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "union value1",
  "union value2",
  "..."
]
```

Returns the union of the provided sets of unique values.

[[_Redis documentation_]](https://redis.io/commands/sunion)

### sunion(keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `keys` | string | List of sets of unique values |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an array of the values in the computed union.

## sunionstore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sunionstore('destination', ['key1', 'key2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sunionstorePromise('destination', ['key1', 'key2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.sunionstore("destination", keys, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->sunionstore('destination', ['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Computes the union of the provided sets of unique values and stores the result in the `destination` key.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sunionstore)

### sunionstore(destination, keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `destination` | string | Destination key identifier |
| `keys` | string | List of sets of unique values to intersect |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the number of elements in the stored union.

## time

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.time(function (err, result) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.timePromise()
  .then(result => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.time(new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray result) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $result = $kuzzle->memoryStorage()->time();
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  1488791347,
  494938
]
```

Returns the current server time.

[[_Redis documentation_]](https://redis.io/commands/time)

### time([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an array containing the following two items, in this order:

* a timestamp in [Epoch time](https://en.wikipedia.org/wiki/Unix_time)
* the number of microseconds already elapsed in the current second

## touch

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.touch(['key1', 'key2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.touchPromise(['key1', 'key2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.touch(keys, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->touch(['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```

Alters the last access time of one or multiple keys. A key is ignored if it does not exist.

[[_Redis documentation_]](https://redis.io/commands/touch)

### touch(keys, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `keys` | array | List of keys to alter |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of altered keys.

## ttl

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.ttl('key', function (err, ttl) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.ttlPromise('key')
  .then(ttl => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.ttl("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int ttl) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $ttl = $kuzzle->memoryStorage()->ttl('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
42
```

Returns the remaining time to live of a key, in seconds, or a negative value if the key does not exist or if it is persistent.

[[_Redis documentation_]](https://redis.io/commands/ttl)

### ttl(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the remaining time to live of the key, in seconds.

## type

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.type('key', function (err, type) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.typePromise('key')
  .then(type => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.type("key", new ResponseListener<String>() {
  @Override
  public void onSuccess(String type) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $type = $kuzzle->memoryStorage()->type('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"zset"
```

Returns the type of the value held by a key.

[[_Redis documentation_]](https://redis.io/commands/type)

### type(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to one of the following values: `hash`, `list`, `set`, `string`, `zset`

## zadd

```js
var elements = [
  {'score': 1, 'member': 'foo'},
  {'score': 2, 'member': 'bar'},
  {'score': 3, 'member': 'baz'}
];

// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zadd('key', elements, function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zaddPromise('key', elements)
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray elements = new JSONArray()
  .put(new JSONObject().put("score", 1).put("member", "foo"))
  .put(new JSONObject().put("score", 2).put("member", "bar"))
  .put(new JSONObject().put("score", 3).put("member", "baz"));

kuzzle.memoryStorage.zadd("key", elements new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

$elements = [
  ['score' => 1, 'member' => 'foo'],
  ['score' => 2, 'member' => 'bar'],
  ['score' => 3, 'member' => 'baz']
];

try {
  $value = $kuzzle->memoryStorage()->zadd('key', elements);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```

Adds the specified elements to the sorted set stored at `key`. If the key does not exist, it is created, holding an empty sorted set. If it already exists and does not hold a sorted set, an error is returned.

Scores are expressed as floating point numbers.

If a member to insert is already in the sorted set, its score is updated and the member is reinserted at the right position in the set.

[[_Redis documentation_]](https://redis.io/commands/zadd)

### zadd(key, elements, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `elements` | array | List of JSON objects detailing the element to add to the sorted set.<br/>Properties: `score` (element's score, `double`), `member` (element's value, `string`) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `ch` | boolean | Instead of returning the number of added allements, return the total number of changes performed (including updates) | `false` |
| `incr` | boolean | Instead of adding elements, increment the existing member with the provided `score` value. Only one score+element pair can be specified if this option is set | `false` |
| `nx` | boolean | Only add new elements, do not update existing ones | `false` |
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |
| `xx` | boolean | Never add new elements, update only exiting ones | `false` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of elements added to the sorted set.

## zcard

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zcard('key', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zcardPromise('key')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zcard("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->zcard('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Returns the number of elements held by a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zcard)

### zcard(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the number of elements in a sorted set.

## zcount

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zcount('key', 2, 3, function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zcountPromise('key', 2, 3)
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zcount("key", 2, 3, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->zcount('key', 2, 3);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Returns the number of elements held by a sorted set with a score between the provided `min` and `max` values.

By default, the provided min and max values are inclusive. This behavior can be changed using the syntax described in the Redis [ZRANGEBYSCORE](https://redis.io/commands/zrangebyscore) documentation.

[[_Redis documentation_]](https://redis.io/commands/zcount)

### zcount(key, min, max, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | int | Minimum score (inclusive by default) |
| `max` | int | Maximum score (inclusive by default) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the number of elements in the provided score range.

## zincrby

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zincrby('key', 'foo', 3.14159, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zincrbyPromise('key', 'foo', 3.14159)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zincrby("key", "foo", 3.14159, new ResponseListener<double>() {
  @Override
  public void onSuccess(double value) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $value = $kuzzle->memoryStorage()->zincrby('key', 'foo', 3.14159);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4.14159
```

Increments the score of a `member` in a sorted set by the provided `value`.

[[_Redis documentation_]](https://redis.io/commands/zincrby)

### zincrby(key, member, increment, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member` | string | Member element to increment |
| `increment` | double | Increment value |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to a double containing the updated member's score in the sorted set.

## zinterstore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zinterstore('destination', ['key1', 'key2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zinterstorePromise('destination', ['key1', 'key2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.zinterstore("destination", keys, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->zinterstore('destination', ['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Computes the intersection of the provided sorted sets and stores the result in the `destination` key.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/zinterstore)

### zinterstore(destination, keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `destination` | string | Destination key identifier |
| `keys` | string | List of sorted sets to intersect |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `aggregate` | string | Specify how members' scores are aggregated during the intersection.<br/>Allowed values: `min`, `max`, `sum` | `sum` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |
| `weights` | array | Specify a multiplication factor for each input sorted set | `[1]` |


### Callback response

Resolves to an integer containing the number of members in the stored intersection.

## zlexcount

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zlexcount('key', '[b', '[f' function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zlexcountPromise('key', '[b', '[f')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zlexcount("key", "[b", "[f", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->zlexcount('key', '[b', '[f');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Counts elements in a sorted set where all members have equal score, using lexicographical ordering. The `min` and `max` values are inclusive by default. To change this behavior, please check the syntax detailed in the [Redis documentation](https://redis.io/commands/zrangebylex).

[[_Redis documentation_]](https://redis.io/commands/zlexcount)

### zlexcount(key, min, max, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | string | Minimum member value (inclusive by default) |
| `max` | string | Maximum member value (inclusive by default) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the number of elements in the provided lexicographical value range.

## zrange

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrange('key', 0, -1, function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zrangePromise('key', 0, -1)
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zrange("key", 0, -1, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray members) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $members = $kuzzle->memoryStorage()->zrange('key', 0, -1);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  { "member": "foo", "score": 1 },
  { "member": "bar", "score": 2 },
  { "member": "baz", "score": 3 }
]
```

Returns elements from a sorted set depending on their position in the set, from a `start` position index to a `stop` position index (inclusives).  
First position starts at `0`.

[[_Redis documentation_]](https://redis.io/commands/zrange)

### zrange(key, start, stop, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `start` | int | Start position in the set (index starts at position `0`) |
| `stop` | int | End position in the set |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an array of objects, each containing the following properties:

* `member`: member value in the sorted set
* `score`: member associated score

## zrangebylex

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrangebylex('key', '-', '(g', function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zrangebylexPromise('key', '-', '(g')
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zrangebylex("key", "-", "(g", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray members) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $members = $kuzzle->memoryStorage()->zrangebylex('key', '-', '(g');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "member1",
  "member2",
  "..."
]
```

Returns elements in a sorted set where all members have equal score, using lexicographical ordering. The `min` and `max` values are inclusive by default. To change this behavior, please check the full documentation.

[[_Redis documentation_]](https://redis.io/commands/zrangebylex)

### zrangebylex(key, min, max, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | string | Minimum member value (inclusive by default) |
| `max` | string | Maximum member value (inclusive by default) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `limit` | array | Limit the result set to a range of matching elements (similar to _SELECT LIMIT offset, count_ in SQL).<br/>Format: `[<offset(int)>, <count(int)>]` | `null` |
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an array of matching members.

## zrangebyscore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrangebyscore('key', 2, 3, function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zrangebyscorePromise('key', 2, 3)
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zrangebyscore("key", 2, 3, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray members) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $members = $kuzzle->memoryStorage()->zrangebyscore('key', 2, 3);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  { "member": "foo", "score": 1 },
  { "member": "bar", "score": 2 },
  { "member": "baz", "score": 3 }
]
```

Returns all the elements in the sorted set at key with a score between `min` and `max` (inclusive). The elements are considered to be ordered from low to high scores.

[[_Redis documentation_]](https://redis.io/commands/zrangebyscore)

### zrangebyscore(key, min, max, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | double | Minimum score value (inclusive by default) |
| `max` | double | Maximum score value (inclusive by default) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `limit` | array | Limit the result set to a range of matching elements (similar to _SELECT LIMIT offset, count_ in SQL).<br/>Format: `[<offset(int)>, <count(int)>]` | `null` |
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an array of matching members.

## zrank

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrank('key', 'foo', function (err, position) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zrankPromise('key', 'foo')
  .then(position => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zrank("key", "member", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int position) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $position = $kuzzle->memoryStorage()->zrank('key', 'foo');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
0
```

Returns the position of an element in a sorted set, with scores in ascending order. The index returned is 0-based (the lowest score member has an index of 0).

[[_Redis documentation_]](https://redis.io/commands/zrank)

### zrank(key, member, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member` | string | Member of the sorted set |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the member's position in the sorted set.

## zrem

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrem('key', ['foo', 'bar', 'baz'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zremPromise('key', ['foo', 'bar', 'baz'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray members = new JSONArray().put("foo").put("bar").put("baz");

kuzzle.memoryStorage.zrem("key", members, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->zrem('key', ['foo', 'bar', 'baz']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```

Removes members from a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zrem)

### zrem(key, members, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `members` | array | List of members to remove |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of members removed from the sorted set.

## zremrangebylex

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zremrangebylex('key', '[b', '(f', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zremrangebylexPromise('key', '[b', '(f')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zremrangebylex("key", "[b", "(f", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->zremrangebylex('key', '[b', '(f');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Removes members from a sorted set where all elements have the same score, using lexicographical ordering. The `min` and `max` interval are inclusive, see the [Redis documentation](https://redis.io/commands/zrangebylex) to change this behavior.

[[_Redis documentation_]](https://redis.io/commands/zremrangebylex)

### zremrangebylex(key, min, max, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | string | Minimum member value (inclusive by default) |
| `max` | string | Maximum member value (inclusive by default) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of removed members from the sorted set.

## zremrangebyrank

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zremrangebyrank('key', 1, 2, function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zremrangebyrankPromise('key', 1, 2)
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zremrangebyrank("key", 1, 2, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->zremrangebyrank('key', 1, 2);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Removes members from a sorted set with their position in the set between `start` and `stop` (inclusive).

Positions are 0-based, meaning the first member of the set has a position of 0.

[[_Redis documentation_]](https://redis.io/commands/zremrangebyrank)

### zremrangebyrank(key, min, max, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | int | Minimum position index (inclusive by default) |
| `max` | int | Maximum position index (inclusive by default) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of removed members from the sorted set.

## zremrangebyscore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zremrangebyscore('key', 1, 2, function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zremrangebyscorePromise('key', 1, 2)
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zremrangebyscore("key", 1, 2, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->zremrangebyscore('key', 1, 2);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Removes members from a sorted set with a score between `min` and `max` (inclusive by default).

[[_Redis documentation_]](https://redis.io/commands/zremrangebyscore)

### zremrangebyscore(key, min, max, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | double | Minimum score (inclusive by default) |
| `max` | double | Maximum score (inclusive by default) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an integer containing the number of removed members from the sorted set.

## zrevrange

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrevrange('key', 0, -1, function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zrevrangePromise('key', 0, -1)
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zrevrange("key", 0, -1, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray members) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $members = $kuzzle->memoryStorage()->zrevrange('key', 0, -1);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  { "member": "baz", "score": 3 },
  { "member": "bar", "score": 2 },
  { "member": "foo", "score": 1 }
]
```

Identical to [zrange](#zrange), except that the sorted set is traversed in descending order.

[[_Redis documentation_]](https://redis.io/commands/zrevrange)

### zrevrange(key, start, stop, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `start` | int | Start position in the set (index starts at position `0`) |
| `stop` | int | End position in the set |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an array of objects, each containing the following properties:

* `member`: member value in the sorted set
* `score`: member associated score

## zrevrangebylex

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrevrangebylex('key', '-', '(g', function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zrevrangebylexPromise('key', '-', '(g')
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zrevrangebylex("key", "-", "(g", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray members) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $members = $kuzzle->memoryStorage()->zrevrangebylex('key', '-', '(g');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "member1",
  "member2",
  "..."
]
```

Identical to [zrangebylex](#zrangebylex) except that the sorted set is traversed in descending order.

[[_Redis documentation_]](https://redis.io/commands/zrevrangebylex)

### zrevrangebylex(key, min, max, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | string | Minimum member value (inclusive by default) |
| `max` | string | Maximum member value (inclusive by default) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `limit` | array | Limit the result set to a range of matching elements (similar to _SELECT LIMIT offset, count_ in SQL).<br/>Format: `[<offset(int)>, <count(int)>]` | `null` |
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an array of matching members.

## zrevrangebyscore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrevrangebyscore('key', 2, 3, function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zrevrangebyscorePromise('key', 2, 3)
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zrevrangebyscore("key", 2, 3, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray members) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $members = $kuzzle->memoryStorage()->zrevrangebyscore('key', 2, 3);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  { "member": "baz", "score": 3 },
  { "member": "bar", "score": 2 },
  { "member": "foo", "score": 1 }
]
```

Identical to [zrangebyscore](#zrangebyscore) except that the sorted set is traversed in descending order.

[[_Redis documentation_]](https://redis.io/commands/zrevrangebyscore)

### zrevrangebyscore(key, min, max, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | double | Minimum score value (inclusive by default) |
| `max` | double | Maximum score value (inclusive by default) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `limit` | array | Limit the result set to a range of matching elements (similar to _SELECT LIMIT offset, count_ in SQL).<br/>Format: `[<offset(int)>, <count(int)>]` | `null` |
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `MemoryStorage` object to allow chaining.

### Callback response

Resolves to an array of matching members.

## zrevrank

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrevrank('key', 'foo', function (err, position) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zrevrankPromise('key', 'foo')
  .then(position => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zrevrank("key", "member", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int position) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $position = $kuzzle->memoryStorage()->zrevrank('key', 'foo');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
0
```

Returns the position of an element in a sorted set, with scores in descending order. The index returned is 0-based (the lowest score member has an index of 0).

[[_Redis documentation_]](https://redis.io/commands/zrevrank)

### zrevrank(key, member, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member` | string | Member of the sorted set |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to an integer containing the member's position in the sorted set.

## zscan

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zscan('key', 0, function (err, page) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zscanPromise('key', 0)
  .then(page => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zscan("key", 0, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray page) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $page = $kuzzle->memoryStorage()->zscan('key', 0);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  18,
  [
    "member1",
    "member1's score",
    "member2",
    "member2's score",
    "..."
  ]
]
```

Identical to [scan](#scan), except that `zscan` iterates the members held by a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zscan)

### zscan(key, cursor, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `cursor` | int | Page number (iteration starts with a cursor value of `0`, and ends when the next cursor position is `0`) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `count` | int | Return the _approximate_ `count` number of items per result page | `10` |
| `match` | string | Search only for member values matching the provided pattern | `*` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to a JSON array containing 2 entries:

* the cursor position for the next page of results (a next position of `0` indicates the end of the scan)
* a list of, alternatively, sorted set members and their scores

## zscore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zscore('key', 'bar', function (err, score) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zscorePromise('key', 'bar')
  .then(score => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zscore("key", "bar", new ResponseListener<Double>() {
  @Override
  public void onSuccess(double score) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $score = $kuzzle->memoryStorage()->zscore('key', 'bar');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Returns the score of a member in a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zscore)

### zscore(key, member, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member` | string | Sorted set member |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


### Callback response

Resolves to a floating point number containing the searched member's score.

## zunionstore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zunionstore('destination', ['key1', 'key2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zunionstorePromise('destination', ['key1', 'key2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.zunionstore("destination", keys, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $count = $kuzzle->memoryStorage()->zunionstore('destination', ['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Computes the union of the provided sorted sets and stores the result in the `destination` key.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/zunionstore)

### zunionstore(destination, keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `destination` | string | Destination key identifier |
| `keys` | string | List of sorted sets to intersect |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `aggregate` | string | Specify how members' scores are aggregated during the intersection.<br/>Allowed values: `min`, `max`, `sum` | `sum` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |
| `weights` | array | Specify a multiplication factor for each input sorted set | `[1]` |


### Callback response

Resolves to an integer containing the number of members in the stored union.
