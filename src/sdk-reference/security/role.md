---
layout: full.html
title: Role
---

# Role

Role is the object representation of a set of right policies.


## Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 Role objects are returned by Security.role method:
 */
var roleDefinition = {
  controllers: {
    "*": {
      actions: {
        "*": true
      }
    }
  }
};

var role = kuzzle.security.role('myrole', roleDefinition);
```

```java
JSONObject roleDefinition = new JSONObject()
  .put("controllers", new JSONObject()
    .put("*", new JSONObject()
      .put("actions", new JSONObject()
        .put("*", true)
      )
    )
  )
);

Role role = new Role(kuzzle.security, "role ID", roleDefinition);
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Role;

$roleId = 'myRole';
$roleDefinition = [
  'controllers' => [
    '*' => [
      'actions' => [
        '*' => true
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

// Using the Security factory:
$role = $security->role($roleId, $roleDefinition);

// Or directly with the constructor:
$role = new Role($security, $roleId, $roleDefinition);
```

Instantiates a new `Role` object.

### Role(Security, id, content)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Security`` | Security | An instantiated Security object |
| ``id`` | string | Unique role identifier |
| ``content`` | JSON Object | Role content |

**Note:**  this constructor won't make any call to Kuzzle.

### Return value

Returns the `Role` object.

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| `content` | JSON object | Raw role content | get |
| `id` | string | Unique profile identifier | get |

## delete

```js
// Using callbacks (NodeJS or Web Browser)
role.delete(function(error, deletedId) {
  // ...
});

// Using promises (NodeJS)
role.deletePromise()
  .then(deletedId => {
    // ...
  });
```

```java
role.delete(new ResponseListener<String>() {
  @Override
  public void onSuccess(String deletedId) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\Role;

// ...

/*
 * @var $role Role
 */
try {
  $role->delete();
}
catch(ErrorException $e) {
  // error occurred
}
```

Deletes the role from Kuzzle's database layer.

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

Resolves to the id of the deleted role.

## save

```js
// Using callbacks (NodeJS or Web Browser)
role
  .save(function(error, result) {
    // result is a Role object
  });

// Using promises (NodeJS)
role
  .savePromise()
  .then((result) => {
    // result is a Role object
  });
```

```java
role.save(new ResponseListener<Role> {
  @Override
  public void onSuccess(Role savedRole) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\Role;

// ...

/*
 * @var $role Role
 */

try {
  $role = $role->save();

  // $role instanceof Role
}
catch (ErrorException $e) {
  // error occured
}
```

Creates or replaces the role in Kuzzle's database layer.


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

Returns the `Role` object to allow chaining.

### Callback response

Resolves to a `Role` object.


## setContent

<aside class="note">
Updating a role content will have no impact until the <code>save</code> method is called
</aside>

```js
var roleDefinition = {
  controllers: {
    "*": {
      actions: {
        "*": true
      }
    }
  }
};

role = role.setContent(roleDefinition);
```

```java
JSONObject roleDefinition = new JSONObject()
  .put("controllers", new JSONObject()
    .put("*", new JSONObject()
      .put("actions", new JSONObject()
        .put("*", true)
      )
    )
  )
);

role.setContent(roleDefinition);
```

```php
<?php

use Kuzzle\Security\Role;

// ...

$roleDefinition = [
  'controllers' => [
    '*' => [
      'actions' => [
        '*' => true
      ]
    ]
  ]
];

/*
 * @var $role Role
 */
$role->setContent($roleDefinition);
```

Replaces the content of the `Role` object.

### setContent(data)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``data`` | JSON Object | Role content |

### Return value

Returns the `Role` object.

## update

```js
var updateContent = {
  controllers: {
    "document": {
      actions: {
        "get": true
      }
    }
  }
};

// Using callbacks (NodeJS or Web Browser)
role.update(updateContent, function(err, updatedRole) {
  // the updatedRole variable is the updated Role object
})

// Using promises (NodeJS)
role
  .updatePromise(updateContent)
  .then(updatedRole => {
    // the updatedRole variable is the updated Role object
  });
```

```java
JSONObject roleDefinition = new JSONObject()
  .put("controllers", new JSONObject()
    .put("document", new JSONObject()
      .put("actions", new JSONObject()
        .put("get", true)
      )
    )
  )
);

role.update(roleDefinition, new ResponseListener<Role>() {
  @Override
  public void onSuccess(Role updatedRole) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\Role;

// ...

$roleDefinition = [
  'controllers' => [
    'document' => [
      'actions' => [
        'get' => true
      ]
    ]
  ]
];

/*
 * @var $role Role
 */

try {
  $role = $role->update($roleDefinition);

  // $role instanceof Role
}
catch (ErrorException $e) {
  // error occured
}
```

Updates the role object Kuzzle's database layer.

<aside class="warning">
  <p>
    Unlike a regular document update, this method will replace the whole role definition under the indexes node by the <code>updateContent</code> parameter.<br>
    In other words, you always need to provide the complete role definition in the <code>updateContent</code> object.
  </p>
  <p>
    This method has the same effect as calling <a href="#setContent"><code>setContent</code></a> followed by the <a href="#save"><code>save</code></a> method.
  </p>
</aside>

To get more information on Kuzzle permissions, please refer to our [Kuzzle Permissions guide](/guide/#permissions).


### update(content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | New role content |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `Role` object to allow chaining.

### Callback response

Resolves to the updated version of this object
