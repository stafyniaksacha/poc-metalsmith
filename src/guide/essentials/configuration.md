---
layout: full.html
title: Configuring Kuzzle
---

# Configuring Kuzzle

The **complete default configuration** of Kuzzle is stored in the [kuzzlerc file](https://github.com/kuzzleio/kuzzle/blob/master/.kuzzlerc.sample) at the root of the installation directory.

Kuzzle uses [rc](https://github.com/dominictarr/rc) to **override** its default configuration. The most common ways to do it is:

- via a `.kuzzlerc` file ([example here](https://github.com/kuzzleio/kuzzle/blob/master/.kuzzlerc.sample));
- via environment variables prefixed with `kuzzle_`.

#### Example 1: configuring Kuzzle via a custom `.kuzzlerc` file

You can write your custom config in `$HOME/.kuzzlerc` or [any other valid location](https://github.com/dominictarr/rc/blob/master/README.md#standards):

```json
{
  "services": {
    "db": {
      "host": "<ES_HOST>",
      "port": <ES_PORT>
    },
    "proxyBroker": {
      "host": "<PROXY_HOST>"
    }
  }
}
```

#### Example 2: configuring Kuzzle via Environment Variables

The name of the environment variables must mimic the structure of the configuration object to override:

* the variable needs to be prefixed with `kuzzle_`,
* the `__` correspond to the levels of nesting in the configuration object (e.g. `kuzzle_services__proxyBroker__host` corresponds to `services.proxyBroker.host`).

```bash
$ kuzzle_services__proxyBroker__host=<PROXY_HOST> node bin/kuzzle start
```

Environment variables are particularly handy to set your custom configuration **through a Docker container**. It is very easy to pass environment variables via the `environment` section of a `docker-compose.yml` file. Take a look at how we pass environment variables to Kuzzle in our default docker-compose file:

```yaml
version: '2'

services:
  proxy:
    image: kuzzleio/proxy
    ports:
      - "7512:7512"

  kuzzle:
    image: kuzzleio/kuzzle
    depends_on:
      - proxy
      - redis
      - elasticsearch
    environment:
      - kuzzle_services__db__host=elasticsearch
      - kuzzle_services__internalCache__node__host=redis
      - kuzzle_services__memoryStorage__node__host=redis
      - kuzzle_services__proxyBroker__host=proxy
      - NODE_ENV=production

  redis:
    image: redis:3.2

  elasticsearch:
    image: elasticsearch:5.0
```

<aside class="notice">
  For an exhaustive list of configuration parameters, please refer to the <a href="https://github.com/kuzzleio/kuzzle/blob/master/.kuzzlerc.sample">kuzzlerc</a> file.
</aside>
