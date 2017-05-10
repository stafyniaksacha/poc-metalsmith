---
layout: full.html
algolia: true
title: Security
---

# Security

Kuzzle provides a full set of functionalities to finely define the permissions for your data.

## Fresh installation default rights.

When installing Kuzzle for the very first time, no default user is created and the Anonymous user is allowed to perform any action on the data. The only restriction is on the internal data storage used by Kuzzle to store its configuration.

Once a first admin user is created, either via the [Kuzzle Back Office](#create-an-admin-account) or the [CLI](#createfirstadmin), the Anonymous permissions are dropped.

You can then use the Back Office to administrate your user rights.

## Authentication

The first step to secure your data is to be able to identify your users.
Kuzzle ships by default with a local login/password strategy.

If the "local" strategy (i.e. storing the users' credentials in the local database) doesn't fit your needs, you can use the [Oauth authentication plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth), or develop your own (see [Core documentation](#authentication-process) for more details).

If the authentication request identifies an existing user, Kuzzle generates a [JSON Web Token](https://tools.ietf.org/html/rfc7519) that must be [appended to all the subsequent requests](/api-reference/#authorization-header).

<aside class="notice">
More information on the login process <a href="/api-reference/#login">here</a>.
</aside>

## Permissions

Once you know who is connected, you need a way to grant your users with some privileges to control their access to data.

### Users, profiles and roles

Kuzzle associates `users` to one or more `profiles`.  
You can think to a `profile` as a user group. All the `users` that share the same `profile` will get the same privileges.

Because some sets of permissions can be shared between several `profiles`, Kuzzle includes an additional level of abstraction below the `profile`: the `roles`.

A `profile` is associated to a set of `roles`. Each `role` defines a set of permissions.

![Users, profiles and roles](/assets/images/permissions/profiles-roles.png)

In the simple example above, the *editor* profile is a superset of the *contributor* one, which, in turn, extends the *default* profile.

`roles` and `profiles` can be edited in [Kuzzle Back Office](https://github.com/kuzzleio/kuzzle-backoffice).

### Role definition

A `role` definition is a hierarchical JSON object in which permissions can be defined at `controller` and `action` level.

The `role` definition is represented as a Javascript object. Each key at the root of the object identifies a `controller` by its name.

```js
var myRoleDefinition = {
  controllers: {
    < controller|* >: {
      actions: {
        < action|* >: < action permission|* >,
        < action|* >: < action permission|* >,
        ...
      }
    }
  }
};
```

Each entry of the `controllers`, `actions` tree can be set to either an explicit value or the "&#42;" wildcard.

When `controller` is declared within a Plugin, its name must be prefixed with the name of the Plugin, like `< plugin-name/controller-name >`.

The `action permission` value can be set either to:

- a boolean. When set to `true`, the user is allowed to perform the action.
- an object that describes a function (more about it in the [action permissions functions section](#actions-permissions-functions)).

You can find a **comprehensive summary of all the available controllers** and actions by sending a `GET` request to the root endpoint of the Kuzzle API via the HTTP protocol:

```bash
$ curl -XGET http://localhost:7512/\?pretty\=true
```

Take a look at the example below:

```js
var anonymousRole = {
  controllers: {
    auth: {
      actions: {
        login: true,
        checkToken: true,
        getCurrentUser: true
      }
    }
  }
};
```

The example above is the permission definition set by Kuzzle for the Anonymous user after the first admin user has been created.

In this example, the role grants the user with the permission to perform the `login`, `checkToken` and `getCurrentUser` actions of the `auth` controller.

### Profile definition

A `profile` definition is a Javascript object that contains an array of policies, composed by a roleId and restrictions:

```js
var myProfileDefinition = {
  policies: [
    {
      roleId: "< role Id >",
      restrictedTo: [
        {
          index: "< some index >",
          collections: [
            "< a collection >",
            "< another collection >"
          ]
        },
        ...
      ]  
    },
    <another role>,
    ...
  ]
};
```

A role can be applied globally on the profile, or it can be restricted to a list of indexes or index/collections pairs.

For example, if we have a "publisher" role which allows to request any action of the `document` controller:

```js
var publisherRole = {
  controllers: {
    document: {
      actions: {
        '*': true
      }
    }
  }
};
```

Then we declare 3 profiles using this role:

```js
var profile1 = {
  roles: [ {_id: 'publisherRole' } ]
};

var profile2 = {
  roles: [
    {
      _id: 'publisherRole',
      restrictedTo: [{index: 'index1'}]
    }
  ]
};

var profile3 = {
  roles: [
    {
      _id: 'publisherRole',
      restrictedTo: [
        {index: 'index1', collections: ['foo', 'bar']},
        {index: 'index2'}
      ]
    }
  ]
};
```

With this sample profiles:

* users with `profile1` are allowed to use all `document` controller actions on all indexes and collections.
* users with `profile2` are only allowed to use `document` controller actions on collections stored in index `index1`.
* users with `profile3` are only allowed to use `document` controller actions on:
  * all collections stored in index `index2`
  * collections `foo` and `bar` stored in index `index1`.

#### Composition rules

In Kuzzle, permissions follow the [Whitelist](https://en.wikipedia.org/wiki/Whitelist) strategy, which means that **an action must be explicitly allowed** by at least one role of the user profile (including restrictions).

That means:

* If a role allows it, the action is authorized, *even if another role denies it*.
* If no role explicitly allows it, the action if denied, even if no role explicitly denies it as well.

### Actions permissions functions

So far, we've seen how to set permissions based on the user profile only.

Now, let's say we have a chat application and want the users to be allowed to edit & delete their own messages only.

**This type of rules depends on the context and cannot be expressed as a simple boolean**.

Kuzzle lets you define more complex permissions using custom functions, allowing dynamic decision about whether the user is allowed to proceed or not, depending on the context.

In our chat example, the rule can be expressed as:

```js
var role = {
  controllers: {
    write: {
      actions: {
        create: true,
        delete: {
          args: {
            document: {
              index: "$requestObject.index",
              collection: "$requestObject.collection",
              action: {
                get: "$currentId"
              }
            }
          },
          test: "return args.document.content.user.id === $currentUserId"
        }
      }
    }
  }
};
```

See more details at [Core documentation section](#permission-closures)
