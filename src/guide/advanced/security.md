---
layout: full.html
algolia: true
title: Authentication
---

# Authentication

Kuzzle uses [PassportJS](http://PassportJS.org/) to enable authentication through a large amount of providers, for example:

- local username/password authentication (enabled by default)
- OAuth2 providers like GitHub or google (using [Oauth plugin](https://GitHub.com/kuzzleio/kuzzle-plugin-auth-passport-oauth))
- SAML providers

Remember the [Architecture overview](#core-architecture) and focus on the components involved by reading actions:
![read_scenario_http_overview](/assets/images/request-scenarios/auth/overview.png)

Kuzzle uses the following internal components during the authentication process:

* The Auth Controller.
* The Passport Wrapper, which acts as an interface between Kuzzle controllers and the Passport library,
* The User and Token [Repositories](https://GitHub.com/kuzzleio/kuzzle/tree/master/lib/api/core/models/repositories), to retrieve users' data.
* The Authentication strategy, implemented within a dedicated plugin.

### Example - Local Strategy

The "Local" strategy (implemented by the [Passport Local Plugin](https://GitHub.com/kuzzleio/kuzzle-plugin-auth-passport-local)) authenticates a user via a username/password pair (locally stored).

![auth_scenario_details_local](/assets/images/request-scenarios/auth/details-local.png)

* The user calls the `login` action of the Auth Controller:

```json
{
  "controller": "auth",
  "action": "login",
  "body": {
    "strategy": "local",
    "username": "<my_username>",
    "password": "<my_password>"
  }
}
```

* The Auth Controller calls the `authenticate()` method of the Passport Wrapper which formats and sends the related request to the Passport local strategy.
* The Passport local strategy calls the `verify()` callback method declared by the Local Authentication Plugin to check credentials.
* The plugin calls the User Repository and check if credentials are good and resolve to an existing user.
* If a user is found, he is resolved and sent back to the Auth Controller through the internal components.
* The Auth Controller calls the `generateToken()` method to get a [JWT Token](https://jwt.io/) corresponding to the user.
* The JWT Token is sent back to the client, who will use it in next requests to be authenticated:

Sample response:

```json
{
  "status": 200,
  "error": null,
  "controller": "auth",
  "action": "login",
  "state": "done",
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "volatile": {},
  "result": {
    "_id": "my_username",
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJteV91c2VybmFtZSIsIm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.BefoyfAKzwXuGhbYe0iPeG0v9F4HmikvahqwqzQr3pE"
  }
}
```

### Example - OAuth2 Strategy

The "Oauth" strategy, implemented by the [Passport Oauth Plugin](https://GitHub.com/kuzzleio/kuzzle-plugin-auth-passport-oauth), authenticates a user  via Github, Google+, Facebook, Twitter, or any identity provider using OAUth2 protocol with "Authorization Code" grant type.

For more details about OAuth2 protocol, see [here](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2#grant-type-authorization-code).

![auth_scenario_details_oauth2](/assets/images/request-scenarios/auth/details-oauth2.png)

The authentication flow is a 2-step flow:

#### 1st step: get the OAuth2 Provider's URL

* The user calls the `login` action of the Auth Controller:

```json
{
  "controller": "auth",
  "action": "login",
  "body": {
    "strategy": "GitHub"
  }
}
```

* The Auth Controller calls the `authenticate()` method of the Passport Wrapper which formats and sends the related request to the Passport OAuth2 strategy.
* The strategy calls a redirection to the OAuth2 Provider.
* The Passport Wrapper intercepts the redirection request and formats a Kuzzle Response for the client:

```json
{
  "headers":
  {
    "Content-Length": "0",
    "Location": "https://GitHub.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Fkuzzle%2Fapi%2F1.0%2F_login%2Fgithub&client_id=MY_CLIENT_ID"
  },
  "statusCode": 302
}
```

* The Auth Controller sends the response to the client, with the redirection URL to the OAUth2 Provider:

```json
{
  "action": "login",
  "controller": "auth",
  "error": null,
  "volatile": {},
  "requestId": "fd4246f9-717c-4503-b50b-3a5bf0f142b5",
  "result": {
    "headers": {
      "Content-Length": "0",
      "Location": "https://GitHub.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Fkuzzle%2Fapi%2F1.0%2F_login%2Fgithub&client_id=MY_CLIENT_ID"
    },
    "statusCode": 302
  },
  "scope": null,
  "state": "done",
  "status": 200
}
```

#### 2nd step: authenticate the user with the OAuth2 code.

* The Client sends an HTTP request to the OAuth2 Provider (unless you are using a Kuzzle SDK, this has to be implemented within the client's application code).
* The user authenticates to the OAuth2 Provider and allow Kuzzle Application to use his credentials (that is the standard OAuth2 flow, managed at the provider's side).
* The OAuth2 Provider sends a HTTP redirect response to the client, containing the OAuth2 authorization code:

```
HTTP/1.1 302 Found
Location: http://<kuzzle>/_login/GitHub?code=OAUTH2_CODE
```

* The client calls again the `login` action of the Auth Controller, now with the OAuth2 authorization code:
  * either in HTTP, simply following the redirection `curl http://<kuzzle>/_login/GitHub?code=OAUTH2_CODE`
  * or, with another protocol (for example WebSocket), after having parsed the URL to get the authorization code:

```json
{
  "controller": "auth",
  "action": "login",
  "body": {
    "strategy": "GitHub",
    "code": "OAUTH2_CODE"
  }
}
```

* The Auth Controller calls the `authenticate()` method of the Passport Wrapper which formats and sends the related request to the Passport OAuth2 strategy.
* The Passport OAuth2 strategy forwards the OAuth2 authorization code to the OAuth2 Provider in order to retrieve the OAuth2 Token.
* The Passport OAuth2 strategy calls the `verify()` callback method declared by the OAuth2 Authentication Plugin
* The plugin calls the User Repository to check for an existing user with the given GitHub ID. _(Note: If no related user is found in Kuzzle, the plugin can either deny the authentication or create automatically the user, depending on the settings)._
* The user is resolved and sent back to the Auth Controller through the internal components.
* The Auth Controller calls the `generateToken()` method to get a [JWT Token](https://jwt.io/) related to the user.
* The JWT Token is sent back to the client, who will use it in next requests to be authenticated.

#### How to provide your own strategy

Any strategy supported by PassportJS can be implemented in Kuzzle with a dedicated plugin. Please refer to the [Plugins Reference](/plugin-reference/#authentication-plugin)).

### Advanced Roles Definitions

In the [User Guide](#permissions), we have seen how to assign basic roles to profiles and profiles to users. Here, we are going to learn how to set complex and dynamic permissions.

The privileges for a certain action (restricted to a given set of indexes and collections) must be expressed as a boolean value. So far, we hard-coded this value within the permissions configuration. In some cases, this will not fit your needs. In a collaborative TO-DO list application, for example, a user should not be allowed to update other user's items. This need is addressed by what we call Permission Closures.

#### Permission Closures

Instead of hard-coding the permission boolean value, we assign a function (a closure) that computes this value and returns it based on the execution context.

For example, if we need to allow users to update only their own documents, it can be done with this sample role:

```javascript
let role = {
  controllers: {
    write: {
      actions: {
        update: {
          args: {
            document: {
              index: "$request.input.resource.index",
              collection: "$request.input.resource.collection",
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

Where:

- `test` is the body of [the permission function](#the-permission-function)
- `args` is the parameter given to [the fetch definition function](#the-fetch-definition)

#### The permission function

The permission function is executed in a sandbox with a limited context. Its body is the evaluation of the `test` parameter given in the role's definition and **must return a boolean value**.

The permission function has the following signature:

```javascript
/**
 * @param {Request} $request              The current action request.
 * @param {string} $currentUserId         The current user Id. Shortcut to request.context.token.userId
 * @param {Object} args                   The result of the evaluated args definition.
 *
 * @return {Boolean}
 */
function ($request, $currentUserId, args) {
  // the function body is built from the "test" parameter.
  // Example, with the sample role above:
  return args.document.content.user.id === $currentUserId;
};
```

##### $request

The [Request](https://github.com/kuzzleio/kuzzle-common-objects#request) object is the request that is currently being evaluated.  

##### $currentUserId

The `$currentUserId` variable contains the current user ID. It is an alias for `request.context.token.userId`.

##### args

The main purpose of the "closures" behavior is to define a role policy based on the current state of the persistence layer. This means that we need to fetch documents from the storage engine in order to use them within the permission function.

The `args` object contains these documents, as a result of the evaluation of the [fetch definition](#the-fetch-definition).
Each `args` item will look like:

```javascript
{
  content: <the document itself>,
  id: <the document id>
}
```

In the sample role above (`return args.document.content.user.id === $currentUserId`), the `update` action is allowed only if the fetched document contains an attribute `user.id` which value is the current user ID.

#### The Fetch Definition

The Fetch Definition allows you to pass some documents fetched from the persistence layer to your permission function.

In our sample role above, we fetch a `document` variable which contains the document that was requested for update, and we use it in the permission function to test if it is owned by the current user.

##### args element structure

The `args` element is the place where we define our Fetch Definitions and has the following structure:

```json
{
  "args": {
    "<some variable>": {
      "index": <index from which to fetch the document(s)>,
      "collection": <collection from which to fetch the document(s)>,
      "action": {
        "<action type (get|mget|search)>": <action type specific parameters>
      }
    },
    "<another variable>": {
      ...
    },
    ...
  }
}
```

You can define one or more variables inside the args element and, for each of them, the action to use to populate them. Each variable will then be available in [your permission function](#the-permission-function) as `args.<variable>`.

##### Embedded variables

Some variables are exposed by Kuzzle and can be used within your Fetch  Definition:

- `$request`: The complete request object being evaluated.
- `$currentId`: The current request document ID. It is an alias for `$request.input.resource._id`.

##### action types

###### `get`

The `get` action type performs a read/get call. It fetches a document by its ID.

Example:

```json
{
  "args": {
    "currentDocument": {
      "index": "$request.input.resource.index",
      "collection": "$request.input.resource.collection",
      "action": {
        "get": "$currentId"
      }
    },
    "anotherDocument": {
      "index": "myIndex",
      "collection": "myCollection",
      "action": {
        "get": "document_id"
      }
    }
  }
}
```

In the `args` field, we declare the following Fetch Definitions:

* `currentDocument`, which represents the document that the user wants to update and whose Fetch Definition is composed of:
  - `index`: the index pointed by the current Request;
  - `collection`: the collection pointed by the current Request;
  - `$currentId`: the document ID pointed by the current Request, passed as an argument to the `get` action.
* `anotherDocument`, which represents another document, just as an example, fetched the same way as the previous one but with different parameters.

###### `mget`

The `mget` action type takes a list of document ids for entry and returns the list of matching documents.

```json
{
  "args": {
    "myDocuments": {
      "index": "myIndex",
      "collection": "myCollection",
      "action": {
        "mget": [
          "id_1",
          "id_2",
          ...
        ]
      }
    }
  }
}
```

In the `args` field, we declare a multi-valued Fetch Definition. Notice how the `mget` action takes an array of IDs rather than a single value.

These documents are accessed in the Permission Function as follows:

```javascript
args.myDocuments = [
  { id: "id_1", content: {name: "Document 1", description: "Cum sociis natoque penatibus et magnis dis parturient montes"},
  }
  { id: "id_2", content: {name: "Document 2", description: "nascetur ridiculus mus. Nulla nunc velit"},
  }
  ...
]
```

###### `search`

The `search` action type performs a search on the persistence layer and returns the resulting documents. It behave exactly like a normal [document search](#document-search).

Example:

```json
{
  "args": {
    "myDocuments": {
      "index": "myIndex",
      "collection": "myCollection",
      "action": {
        "search": {
          "filter": {
            "match": {
              "name": "$request.input.body.name"
            }
          }
        }
      }
    }
  }  
}
```

The search results are available in the Permission Function as an array of documents fetched from `myIndex`/`myCollection`, for which the `name` attribute matches the `name` attribute of the request:

```javascript
args.myDocuments = [
  { id: "id_1", content: {name: "foo", description: "Cum sociis natoque penatibus et magnis dis parturient montes"},
  }
  { id: "id_2", content: {name: "foo bar", description: "nascetur ridiculus mus. Nulla nunc velit"},
  }
  ...
]
```

The content of `action.search` is directly passed to Elasticsearch.

Please refer to [our Elasticsearch Cookbook](/elasticsearch-cookbook/) for additional information on how to build your query.
