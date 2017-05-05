---
layout: full.html
title: Request and Response format
---

## Request and Response format

All transactions in Kuzzle are represented by a [Request](https://github.com/kuzzleio/kuzzle-common-objects#request) object. The object is created by the client to send a request to Kuzzle and returned by Kuzzle containing the response.

The state of this object evolves along with the [lifecycle of the transaction](#lifecycle).

The `Request` object is [sealed](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/seal), which means you cannot add or delete fields once the object is initialized.

Let's take a look at the structure of the `Request` object.

```javascript
Request {
    // members
    status,     // {integer}        The status of the transaction (matches HTTP codes)
    timestamp,  // {integer}
    id,         // {string}         
    context,    // {RequestContext} Contains information about the connection and the current token & user
    input,      // {RequestInput}   The request input params sent by the client
    result,     // {Object}         The raw result sent by the controller (defaults to null)
    error,      // {KuzzleError}    Defaults to null
    response,   // {property}       The final response sent out of Kuzzle (enumerable, get-only property)

    // methods
    setError (error),               // Sets the status to the error.code and fills the error member.
    setResult (obj, [status=200])   // Sets the result and the status code.
}
```

Let's take a look at the attributes of this object.

* The `id` attribute bears a unique, auto-generated value that identifies the transaction.
* The `timestamp` attribute stores the creation date (in seconds after the Epoch time).

### Input

The `input` field contains all the parameters that express the request from the client. It has the following structure:

```javascript
RequestInput {
    // members
    args,           // {Object}     Parametric arguments. i.e. for REST, taken from the query string
    volatile,       // {Object}
    body,           // {Object}     Content of the resource for REST like routes, main parameters for others
    controller,     // {string}
    action,         // {string}
    resource {
        index,
        collection,
        _id
    }

    // methods
    constructor (data) // data is a JS Object that has the same structure as the Websocket message
}
```

### Context

The `context` attribute contains information about the state of the connection at the moment the request is sent. It has the following structure:

```javascript
RequestContext {
    connectionId,   // {scalar}     Unique identifier of the user connection
    protocol,       // {string}
    token,          // {Token}      Auth token
    user            // {User}       Represents the current User associated to the transaction
}
```

### Status codes

The `status` attribute is a numeric code similar to [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
It is used to inform the client about the real status of his request (if an error occurred or not).

#### List of status codes supported by Kuzzle

##### 1xx Processing

* `102`: Standard status for an unhandled request.

##### 2xx Success

* ``200``: Standard status for a successful request.
* ``206``: The request (typically a bulk import) is partially successful, but some actions encountered an error.
(in this case, error details are returned within _error.errors_)

##### 4xx Client Error

* ``400``: The request is malformed (usually: an argument is missing).
* ``403``: The client is not allowed to perform the requested action.
* ``404``: The requested resource cannot be found.

##### 5xx Server Error

* ``500``: Kuzzle encountered an unexpected error (standard code for internal error).
* ``503``: An external service is unavailable

### Error objects format

When an error occurred, the `error` attribute contains [KuzzleError](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#errorskuzzleerror) object, which inherits from the primitive Javascript `Error` type.

### Life-cycle

Here is how it works.

* The client initializes the object with the arguments passed to the [constructor](https://github.com/kuzzleio/kuzzle-common-objects#new-requestdata-options).
  - The `status` field is always initialized to 102 ("processing").
  - The `context` field is initialized with the connection status and ID.
  - The `input` field is initialized with the request parameters specified in the options.
  - The fields `error`, `result` and `response` contain `null`.
* Kuzzle receives the response. The corresponding controller handles it according to the `input` field.
  - The raw response of the controller is set to the `result` field.
  - If an error occurs, Kuzzle updates the `error` field via the `setError` method.
  - The `status` field is update consequently with a HTTP-compliant numeric code.
  - Kuzzle fills the `response` field with an object compliant with the [Kuzzle Response API standard](/api-reference/?websocket#kuzzle-response)
* Kuzzle sends the response back to the client.
