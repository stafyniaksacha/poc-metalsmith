---
layout: full.html
title: User
---

# ~ User

User is the object representation of an user, which is associated to a Profile object

## Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 User objects are returned by Security.user method:
 */
 var userContent = {
   // A "profile" field is required to bind a user to an existing profile
   profileIds: ['admin'],

   // The "local" authentication strategy requires a password
   password: 'secretPassword',

   // You can also set custom fields to your user
   firstname: 'John',
   lastname: 'Doe'
 };

var user = kuzzle.security.user('myuser', userContent);
```

```java
JSONObject userContent = new JSONObject()
  // A "profile" field is required to bind a user to an existing profile
  .put("profileIds", new JSONArray().put("admin"))
  // The "local" authentication strategy requires a password
  .put("password", "secret password")
  // You can also set custom fields to your user
  .put("firstname", "John")
  .put("lastname", "Doe");

// Using the KuzzleSecurity factory:
User user = kuzzle.security.user("user ID", userContent);

// Or directly with the constructor:
User user = new User(kuzzle.security, "user ID", userContent);
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$userId = 'myUser';
$userDefinition = [
  // A "profileIds" field is required to bind a user to an existing profile
  'profileIds' => ['myProfile'],
  // The "local" authentication strategy requires a password
  'password' => 'secret',
  'firstname' => 'John',
  'lastname' => 'Doe'
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

// Using the Security factory
$user = $security->user($userId, $userDefinition);

// Or directly with the constructor:
$user = new User($security, $userId, $userDefinition);
```

Instantiates a new User object.

### User(Security, id, content)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Security`` | Security | An instantiated Security object |
| ``id`` | string | Unique user identifier |
| ``content`` | JSON Object | User content |

**Note:**  this constructor won't make any call to Kuzzle.

### Return value

Returns the `User` object.

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| `content` | JSON object | Raw user content | get |
| `id` | string | Unique profile identifier | get |


## addProfile

```js
var profile = kuzzle.security.fetchProfile('myprofile', function(error, profile) {
  // Can add a profile directly with a Profile object
  user.addProfile(profile);
});

// Or by passing an id
user.addProfile('myprofile');
```

```java

// Updating the profile with a Profile object
kuzzle
  .security
  .fetchProfile("myprofile", opts, new ResponseListener<Profile>() {
    @Override
    public void onSuccess(Profile profile) {
      // Can add the profile directly with a Profile object
      user.addProfile(profile);
    }
  });

// Updating the profile with a profile ID
user.addProfile("myprofile");
```

```php
<?php

use Kuzzle\Security\Profile;
use Kuzzle\Security\User;

// ...

$profile = $kuzzle->security->fetchProfile('myProfile');

/*
 * @var $user User
 */

// Updating the profile with a Profile object
$user->addProfile($profile);

// Updating the profile with a profile ID
$user->addProfile('myProfile');
```

<aside class="note">
Updating an user will have no impact until the <code>save</code> method is called
</aside>


Replace the profile associated to the user

### addProfile(profileId)

### addProfile(profile)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``profileId`` | string | Profile ID |
| ``profile`` | Profile | An instantiated Profile object |

### Return value

Returns the `User` object.

## delete

```js
// Using callbacks (NodeJS or Web Browser)
user
  .delete(function(error, result) {
    // result is the id of deleted user
  });

// Using promises (NodeJS)
user
  .deletePromise()
  .then((result) => {
    // result is the id of deleted user
  });
```

```java
user.delete(new ResponseListener<String>() {
  @Override
  public void onSuccess(String deletedId) {

  }

  @Override public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\User;

// ...

/*
 * @var $user User
 */

try {
  $user->delete();
}
catch (ErrorException $e) {

}
```

Deletes the user in Kuzzle

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

Resolves to a `String` containing the deleted user ID

## getProfiles

```js
for (profile of user.getProfiles()) {
  // profile can either be a profile ID if the object has not been hydrated,
  // or a Profile object otherwise
}
```

```java
for(Profile profile : user.getProfiles()) {
  // if this object has not been hydrated, the profile object has no content
}
```

Returns this user associated profiles.

### Return value

Returns an array of associated profiles

## save

```js
// Using callbacks (NodeJS or Web Browser)
user
  .save(function(error, result) {
    // result is a User object
  });

// Using promises (NodeJS)
user
  .savePromise()
  .then((result) => {
    // result is a User object
  });
```

```java
user.save(new ResponseListener<User>() {
  @Override
  public void onSuccess(User user) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\User;

// ...

/*
 * @var $user User
 */

try {
  $user->save();
}
catch (ErrorException $e) {

}
```

Create or replace the user in kuzzle

<aside class="warning">
Saving this object can rise an error if the associated profile is not created in Kuzzle
</aside>

### save([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `User` object to allow chaining.

### Callback response

Resolves to a `User` object.

## saveRestricted

```js
// Using callbacks (NodeJS or Web Browser)
user
  .saveRestricted(function(error, result) {
    // result is a User object
  });

// Using promises (NodeJS)
user
  .saveRestrictedPromise()
  .then((result) => {
    // result is a User object
  });
```

```java
user.saveRestricted(new ResponseListener<User>() {
  @Override
  public void onSuccess(User user) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\User;

// ...

/*
 * @var $user User
 */

try {
  $user->saveRestricted();
}
catch (ErrorException $e) {

}
```

Saves this user as restricted into Kuzzle.


### saveRestricted([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `User` object to allow chaining.

### Callback response

Resolves to a `User` object.


## setContent

```js
var user = kuzzle.security.fetchUser('myuser');
var userContent = {
  profileIds: ['profileId']
};

user = user.setContent(userContent);
```

```java
JSONObject newContent = new JSONObject()
  .put("profileIds", new JSONArray()
    .put("profileId")
  );

user.setContent(newContent);
```

```php
<?php

use Kuzzle\Security\User;

// ...

$userContent = [
  'profileIds' => ['profileId']
];

/*
 * @var $user User
 */
$user->setContent($userContent);
```

<aside class="note">
Updating an user will have no impact until the <code>save</code> method is called
</aside>

Replaces the content of User

### setContent(data)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``data`` | JSON Object |  User content |

### Return value

Returns the `User` object.


## setProfiles

```js
var profile = kuzzle.security.fetchProfile('myprofile', function(error, profile) {
  // Can set the profiles directly with a Profile object
  user.setProfiles([profile]);
});

// Or by passing their ids
user.setProfiles(['myprofile']);
```

```java

// Updating the profile with a Profile object
kuzzle
  .security
  .fetchProfile("myprofile", opts, new ResponseListener<Profile>() {
    @Override
    public void onSuccess(Profile profile) {

      ArrayList<Profile> profileIds = new ArrayList<Profile>();
      profileIds.add(profile);

      user.setProfiles(profileIds);

    }
  });

// Updating the profile with a profile ID
ArrayList<String> profileIds = new ArrayList<String>();
profileIds.add("myprofile");

user.setProfiles(profileIds);
```

```php
<?php

use Kuzzle\Security\Profile;
use Kuzzle\Security\User;

// ...

$profile = $kuzzle->security->fetchProfile('myProfile');

/*
 * @var $user User
 */

// Updating the profile with a Profile object
$user->setProfiles([$profile]);

// Updating the profile with a profile ID
$user->setProfiles(['myProfile']);
```

<aside class="note">
Updating an user will have no impact until the <code>save</code> method is called
</aside>


Replace the profile associated to the user

### setProfiles(profileIds)

### setProfiles(profiles)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``profileIds`` | array of strings | List of profile IDs |
| ``profiles`` | array of Profile objects | An array of instantiated Profile objects |

### Return value

Returns the `User` object.

## update

```js
var updateContent = {
  firstname: 'My Name Is',
  lastname: 'Jonas'
};

// Using callbacks (NodeJS or Web Browser)
user.update(updateContent, function(err, updatedUser) {
  // the updatedUser variable is the updated User object
})

// Using promises (NodeJS)
role
  .updatePromise(updateContent)
  .then(updatedUser => {
    // the updatedUser variable is the updated User object
  });
```

```java
JSONObject updateContent = new JSONObject()
  .put("firstname", "My Name Is")
  .put("lastname", "Jonas");

user.update(updateContent, new ResponseListener<User>() {
  @Override
  public void onSuccess(User updatedUser) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\User;

// ...

/*
 * @var $user User
 */

$userContent = [
  'firstname' => 'My Name Is',
  'lastname' => 'Jonas'
];

try {
  $user->update($userContent);
}
catch (ErrorException $e) {

}
```

Performs a partial content update on this object.

### update(content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | User content |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `User` object to allow chaining.

### Callback response

Resolves to the updated version of this object
