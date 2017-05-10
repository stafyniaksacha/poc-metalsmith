---
layout: side-code.html
language-tab: true
algolia: true
title: Profile
---

# Profile

Profile is the object representation of a profile, which is a set of one or many Role objects.

## Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 Profile objects are returned by Security.profile method:
 */
var profileDefinition = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};

var role = kuzzle.security.profile('myprofile', profileDefinition);
```

```java
JSONObject policy1 = new JSONObject()
  .put("roleId", "myrole");

JSONObject policy2 = new JSONObject()
  .put("roleId", "default")
  .put("restrictedTo", new JSONArray()
    .put(new JSONObject().put("index", "index1"))
    .put(new JSONObject()
      .put("index", "index2")
      .put("collections",new JSONArray().put("foo").put("bar"))
    )
  );
JSONObject roles = new JSONObject()
  .put("policies", new JSONArray()
    .put(policy1)
    .put(policy2)
  );

Profile profile = new Profile(kuzzle.security, "profileId", roles);
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Profile;

$profileId = 'myProfile';
$profileDefinition = [
  'policies' => [
    [
      'roleId' => 'myRole'
    ],
    [
      'roleId' => 'anonymous',
      'restrictedTo' => [
        ['index' => 'my-second-index', 'collection' => ['my-collection']]
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();


// Using the Security factory:
$profile = $security->profile($profileId, $profileDefinition);

// Or directly with the constructor:
$profile = new Profile($security, $profileId, $profileDefinition);
```

Instantiates a new `Profile` object.

### Profile(Security, id, content)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Security`` | Security | An instantiated Security object |
| ``id`` | string | Unique profile identifier |
| ``content`` | JSON Object | Profile content |

**Note:**  this constructor won't make any call to Kuzzle.

### Return value

Returns to the `Profile` object.

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| `content` | JSON object | Raw profile content | get |
| `id` | string | Unique profile identifier | get |

## addPolicy

```js
profile.addPolicy({
  'roleId': 'some role id',
  'restrictedTo': [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ]
});
```

```java
JSONObject policy = new JSONObject()
  .put("roleId", "some role id")
  .put("restrictedTo", new JSONArray()
    .put(new JSONObject().put("index", "index1"))
    .put(new JSONObject()
      .put("index", "index2")
      .put("collections", new JSONArray().put("foo").put("bar"))
    )
  );

profile.addPolicy(policy);

// you may also add a role ID directly
profile.addPolicy("some role id");
```

Adds a role to the profile.

<aside class="note">
Updating a profile will have no impact until the <code>save</code> method is called
</aside>

### addPolicy(id)

### addPolicy(policy)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique id corresponding to the new associated role |
| ``policy`` | JSON Object | policy instance corresponding to the new associated role and its restrictions |

### Return value

Returns the `Profile` object to allow chaining calls.


## delete

```js
// Using callbacks (NodeJS or Web Browser)
profile
  .delete(function(error, result) {
    // result is the id of deleted profile
  });

// Using promises (NodeJS)
profile
  .deletePromise()
  .then((result) => {
    // result is the id of deleted profile
  });
```

```java
profile
  .delete(new ResponseListener<String>() {
    @Override
    public void onSuccess(String deleteId) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use Kuzzle\Security\Profile;

// ...

/*
 * @var $profile Profile
 */
try {
  $profile->delete();
}
catch(ErrorException $e) {

}
```

Deletes this profile from Kuzzle.

### delete([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Callback response

Resolves to the id of the deleted profile.

## getPolicies

```js
for (policy of profile.getPolicies()) {
  // policy is a JSON object
}
```

```java
for(JSONArray policy : profile.getPolicies()) {
  // policy is a JSON object
}
```

```php
<?php

use Kuzzle\Security\Profile;
use Kuzzle\Security\Policy;

// ...

/*
 * @var $profile Profile
 */
foreach($profile->getPolicies() as $policy) {
  // $policy instanceof Policy
}
```

Returns this profile associated roles.

### Return value

An array of associated roles

## save

```js
var profileDefinition = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};

var profile = kuzzle.security.profile('myprofile', profileDefinition);

// Using callbacks (NodeJS or Web Browser)
profile
  .save(function(error, result) {
    // result is a Profile object
  });

// Using promises (NodeJS)
profile
  .savePromise()
  .then(result => {
    // result is a Profile object
  });
```

```java
JSONObject policy1 = new JSONObject()
  .put("roleId", "myrole");

JSONObject policy2 = new JSONObject()
  .put("roleId", "default")
  .put("restrictedTo", new JSONArray()
    .put(new JSONObject().put("index", "index1"))
    .put(new JSONObject()
      .put("index", "index2")
      .put("collections",new JSONArray().put("foo").put("bar"))
    )
  );

JSONObject roles = new JSONObject()
  .put("policies", new JSONArray()
    .put(policy1)
    .put(policy2)
  );

Profile profile = kuzzle.security.profile("myprofile", roles);

profile.save(new ResponseListener<Profile>() {
  @Override
  public void onSuccess(Profile savedProfile) {

  }

  @Overrid public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\Profile;

// ...

/*
 * @var $profile Profile
 */

try {
  $profile = $profile->save();

  // $profile instanceof Profile
}
catch (ErrorException $e) {

}
```

Creates or replaces the profile in Kuzzle.

<aside class="warning">
Saving the object will rise an error if the bound roles have not been previously created in Kuzzle.
</aside>

### save([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `Profile` object to allow chaining.

### Callback response

Resolves to a `Profile` object.


## setContent

<aside class="note">
Updating a profile will have no impact until the <code>save</code> method is called
</aside>

```js
var profile = kuzzle.security.fetchProfile('myprofile');
var profileDefinition = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};

profile = profile.setContent(profileDefinition);
```

```java
JSONObject policy1 = new JSONObject()
  .put("roleId", "myrole");

JSONObject policy2 = new JSONObject()
  .put("roleId", "default")
  .put("restrictedTo", new JSONArray()
    .put(new JSONObject().put("index", "index1"))
    .put(new JSONObject()
      .put("index", "index2")
      .put("collections",new JSONArray().put("foo").put("bar"))
    )
  );

JSONObject newContent = new JSONObject()
  .put("policies", new JSONArray()
    .put(policy1)
    .put(policy2)
  );

profile.setContent(newRolesList);
```

```php
<?php

use Kuzzle\Security\Profile;

// ...

$profileDefinition = [
  'policies' => [
    [
      'roleId' => 'anonymous',
      'restrictedTo' => [
        ['index' => 'my-second-index', 'collection' => ['my-collection']]
      ]
    ]
  ]
];

/*
 * @var $profile Role
 */
$profile->setContent($profileDefinition);
```

Replaces the content of the `Profile` object.

### setContent(data)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``data`` | JSON Object | Profile content |

### Return value

Returns the `Profile` object.


## setPolicies

<aside class="note">
Updating a profile will have no impact until the <code>save</code> method is called
</aside>

```js
policy = { "roleId": "roleId" };

// Replaces the profile policies set with the given entry.
profile.setPolicies([policy]);
```

```java
// Binding role IDs to a profile
profile.setPolicies({"role1 ID", "role2 ID", "role3 ID"});

// Binding policies definition to a profile
profile.setPolicies({
  new JSONObject().put('roleId', 'role1 ID'),
  new JSONObject().put('roleId', 'role2 ID'),
  new JSONObject().put('roleId', 'role3 ID')
});
```

Replaces the roles associated to the profile.

### setPolicies(Array<String> policyIDs)

### setPolicies(Array<JSONObject> policyDefinitions)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``policyIDs`` | array of strings | Policy IDs to add |
| ``policyDefinitions`` | array of JSON objects | Policy definitions to add |

### Return value

Returns the `Profile` object.

## update

```js
var updateContent = {
  policies: [
    {roleId: 'myrole'},
  ]
};

// Using callbacks (NodeJS or Web Browser)
profile.update(updateContent, function(err, updatedProfile) {
  // the updatedProfile variable is the updated Profile object
})

// Using promises (NodeJS)
profile
  .updatePromise(updateContent)
  .then(updatedProfile => {
    // the updatedProfile variable is the updated Profile object
  });
```

```java
JSONObject policy1 = new JSONObject().put("roleId", "myrole");

JSONObject updateContent = new JSONObject()
  .put("policies", new JSONArray().put(policy1));

profile.update(updateContent, new ResponseListener<Profile>() {
  @Override
  public void onSuccess(Profile updatedProfile) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

Performs a partial content update on this object.

### update(content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | Profile content |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `Profile` object to allow chaining.

### Callback response

Resolves to the updated version of this object
