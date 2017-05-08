---
layout: full.html
title: Command Line Interface
---

# Command Line Interface

Kuzzle ships with a [Command line interface](https://en.wikipedia.org/wiki/Command-line_interface) which enables you to:

* start and stop Kuzzle Core,
* install and configure plugins,
* create the first administrator user,
* reset Kuzzle internal data _(use with caution !)_.

<aside class="warning">
If you are running Kuzzle in a Docker container, you will have to <a href="https://docs.docker.com/engine/reference/commandline/exec/">enter the Kuzzle container</a> to run these commands.
</aside>

```bash
$ ./bin/kuzzle

  Usage: kuzzle [options] [command]


  Commands:

    createFirstAdmin          create the first administrator user
    clearCache                clear internal caches in Redis
    plugins [options] [name]  manage plugins
    reset [options]           delete Kuzzle configuration and users from database
    start [options]           start a Kuzzle instance
    dump                      create a dump of current state of Kuzzle

  Options:

    -h, --help      output usage information
    -V, --version   output the version number
    -d, --debug     make errors more verbose
    -C, --noColors  do not use ANSI coloring

```

### createFirstAdmin

```bash
$ ./bin/kuzzle createFirstAdmin
```

When Kuzzle runs for the first time, no users are defined and the anonymous user is granted with super-admin rights.

The `createFirstAdmin` command lets you define an administrator user and set your own permissions.

<aside class="notice">NB: This command can only be run interactively</aside>

### clearCache

```bash
$ ./bin/kuzzle clearCache
```

Kuzzle relies on the Redis service to store some frequently accessed internal data. If you need to restart Kuzzle with a fresh cache, this command can come in hand.

### reset

```
$ ./bin/kuzzle reset --help

    Usage: reset [options]

    delete Kuzzle configuration and users from database

    Options:

      -h, --help             output usage information
      --fixtures <fixtures>  import some fixtures from file
      --mappings <mappings>  load and apply mappings from file
      --noint                non interactive mode
```

The `reset` command deletes all currently set configurations and users from the database.

If business data were imported in Kuzzle's database layer, these are kept intact.

### start

```
$ ./bin/kuzzle start --help

    Usage: start [options]

    start a Kuzzle instance

    Options:

      -h, --help                 output usage information
      -p, --port <port>          Kuzzle port number
          --fixtures <fixtures>  import some fixtures from file
          --mappings <mappings>  load and apply mappings from file
```

The `start` command starts a Kuzzle server in the foreground.

### dump

```bash
$ ./bin/kuzzle dump --help
[ℹ] Creating dump file...
[✔] Done!

[ℹ] Dump has been successfully generated in "dump/20161214-1555-cli" folder
[ℹ] You can send the folder to the kuzzle core team at support@kuzzle.io
```

The `dump` command creates a snapshot of the state of Kuzzle. It includes
* a core dump of Kuzzle Core,
* a dump of the main configuration,
* a dump of all the server logs,
* a dump of the Node.js engine properties,
* a dump of the OS properties,
* a dump of the plugins configuration,
* a dump of the usage statistics of the Kuzzle Server.

This can be particularly handy to feed a crash report to the support team if you own a Kuzzle License.
