---
layout: full.html
title: Installing Kuzzle
---

## Installing Kuzzle

### Docker

Before launching Kuzzle, ensure that your system matches the following pre-requisites:

- **Docker v1.10+**, see [instructions here](https://docs.docker.com/engine/installation/)
- **Docker-compose v1.8+**, see [instructions here](https://docs.docker.com/compose/install/)

Get the standard [docker-compose.yml](http://kuzzle.io/docker-compose.yml) file, copy it into a directory and start Kuzzle:

In this case, you need to increase the maximum virtual memory allowed by typing

```bash
$ sudo sysctl -w vm.max_map_count=262144
$ wget http://kuzzle.io/docker-compose.yml
$ docker-compose up
```

To persist this changes add this line to your /etc/sysctl.conf
```
vm.max_map_count=262144
```

<aside class="notice">
The "sysctl" command is needed by Elasticsearch v5.x. More details <a href="https://www.elastic.co/guide/en/elasticsearch/reference/5.x/vm-max-map-count.html">here</a>.
</aside>

Your terminal will show the log messages of Kuzzle's components starting. After only a few seconds, you should see the following ready message appear:

```
kuzzle_1         | [✔] Kuzzle server ready
```

Your Kuzzle server is now ready to be used. For instance, you can hit the main HTTP API endpoint by browsing the page <a href="http://localhost:7512">http://localhost:7512</a> or via cURL on the command line:

```bash
$ curl "http://localhost:7512/?pretty"
```

Kuzzle will respond you with a list of the existing routes.


##### Useful commands list

* Updating docker images used by Kuzzle:  
`docker-compose -f <docker-compose-file.yml> pull`
* Showing Kuzzle core or Kuzzle proxy logs:  
`docker exec -ti <docker core or proxy container name> pm2 logs`
* Restarting Kuzzle core or Kuzzle proxy:  
`docker exec -ti <docker core or proxy container name> pm2 restart all`
* Stopping Kuzzle core or Kuzzle proxy:  
`docker exec -ti <docker core or proxy container name> pm2 stop all`
* Starting Kuzzle core or Kuzzle proxy:  
`docker exec -ti <docker core or proxy container name> pm2 start all`
* Accessing Kuzzle CLI:  
`docker exec -ti <docker core container name> bin/kuzzle -h`

### Manually

In this section we will cover the manual installation on Linux systems, since this is the environment all the components of the Kuzzle stack work natively in.

<aside class="notice">
  By default, Kuzzle expects all the components to be running on localhost. You can use the <a href="#configuring-kuzzle">configuration parameters</a> to change this behavior.
</aside>

We will run the Kuzzle stack using [pm2](http://pm2.keymetrics.io/), from the current user home directory.

#### Supported operating systems

The following operating systems are actively supported:

* Ubuntu: 14.04 and 16.04
* Debian: 7 and 8

#### Prerequisites

* A [Elasticsearch](https://www.elastic.co/products/elasticsearch) version 5.0 instance or upper running on localhost:9200.
* A [Redis](http://redis.io/) version 3.x instance running on localhost:6379 (_preferred version: v3.2_).
* [NodeJS](https://nodejs.org/en/download/package-manager/) version 6.x or upper.
* [Python](https://www.python.org/) version 2.7 preferred.
* a C++11 compatible compiler.
* [GDB](https://www.gnu.org/software/gdb/) version 7.7 or upper.

<aside class="notice">
 The last three prerequisites can be fulfilled on Debian-based systems by installing packages : `build-essential`, `gdb` and `python`.
</aside>

#### Step 1 - Retrieve Kuzzle components source code

1. Create the Kuzzle root directory:

```bash
$ mkdir -p ~/kuzzle
$ cd ~/kuzzle
```

2. Create a directory for Kuzzle Proxy and install it:

```bash
$ cd ~/kuzzle
$ git clone https://github.com/kuzzleio/kuzzle-proxy.git
$ cd kuzzle-proxy
$ npm install
```

3. Create a directory for Kuzzle Core and install it:

```bash
$ cd ~/kuzzle
$ git clone https://github.com/kuzzleio/kuzzle.git
$ cd kuzzle
$ npm install
```

4. Create a directory for Kuzzle Back Office and [install it](#running-kuzzle-backoffice).

#### Step 2 - pm2

1. Install pm2:

```bash
$ sudo npm install -g pm2
```

2. Create a [pm2 configuration file](http://pm2.keymetrics.io/docs/usage/application-declaration/#process-file):

```bash
$ echo "apps:
   - name: kuzzle-proxy
     cwd: ${KUZZLE_PROXY_INSTALL_DIR}
     script: ${KUZZLE_PROXY_INSTALL_DIR}/index.js
   - name: kuzzle
     cwd: ${KUZZLE_CORE_INSTALL_DIR}
     script: ${KUZZLE_CORE_INSTALL_DIR}/bin/kuzzle
     args: start
     env:
       NODE_ENV: production
  " > ~/kuzzle/pm2.conf.yml
```

3. Run Kuzzle via pm2 and show the logs:

```bash
$ pm2 start ~/kuzzle/pm2.conf.yml
$ pm2 logs
```

After only a few seconds, you will see the following ready message appear:

```
kuzzle_1         | [✔] Kuzzle server ready
```

The Kuzzle Back-office can be reached on http://localhost:3000.  
Kuzzle HTTP API can be reached on http://localhost:7512/  
Socket IO and Websocket channels can be reached over the HTTP server, on port 7512.

##### Change external services hosts or ports

If you are running some of the service(s) externally, you can configure their host and port using some environment variables and/or a `.kuzzlerc` file.

Please refer to [Kuzzle configuration section](#configuration) for more information.

##### Useful commands list


* Showing Kuzzle logs:  
`pm2 logs`
* Starting, restarting or stopping Kuzzle core :  
`pm2 <start|stop|restart> KuzzleServer`
* Starting, restarting or stopping Kuzzle core :  
`pm2 <start|stop|restart> KuzzleProxy`
* Accessing Kuzzle CLI:  
`~/kuzzle/bin/kuzzle -h`

## Running Kuzzle Backoffice

The Kuzzle Backoffice is a handy **web application** that helps you administrate Kuzzle. You can use it to **manage your data**, subscribe to **realtime notifications** and manage **security** rules.

You can use the <a href="http://kuzzle-backoffice.netlify.com/">publicly hosted Kuzzle Backoffice</a>.
If you want to host the Kuzzle Backoffice on your own server, you can download the source code [here](https://github.com/kuzzleio/kuzzle-backoffice/releases).

In both cases, you'll be able to <a href="#select-the-kuzzle-instance-to-connect-to">select the Kuzzle server</a> you want to manage once the Backoffice starts up.

<aside class="notice">
Having trouble? <a href="https://gitter.im/kuzzleio/kuzzle-bo">Get in touch with us on Gitter!</a>
</aside>

### Select the Kuzzle server to connect to

The Kuzzle Backoffice automatically looks for a Kuzzle server on `localhost:7512`. If none is present, you will be prompted to choose a Kuzzle instance to connect to.

You can tell the Backoffice to connect to any Kuzzle server by clicking on the **"Choose Environment"** dropdown menu, then by selecting **"Create new"**.

![Kuzzle Backoffice is trying to connect to a Kuzzle server](/assets/images/kuzbo-connecting.png)

Create a new Backoffice environment by providing the address of the Kuzzle server you want to administrate. You can associate it with a custom **name** (e.g. "Development" or "My First Kuzzle") and a **color** (e.g. red may be a good idea for production environments).

<aside class="success">Your Kuzzle Backoffice is connected to Kuzzle.</aside>

<aside class="notice">
Having trouble? <a href="https://gitter.im/kuzzleio/kuzzle-bo">Get in touch with us on Gitter!</a> We'll be happy to help.
</aside>

### Create an admin account

At this point, Kuzzle is still pristine, which means that no admin account has been set-up: this means that the `anonymous` user has full rights on the server.

![Kuzzle Backoffice prompts the creation of a first admin account](/assets/images/kuzbo-firstadmin.png)

The Backoffice will prompt you with an admin account name and a password. **Leave the "Reset anonymous account rights" unchecked**, as we will use the `anonymous` account in the next steps of this tutorial.

Once you created the admin account, use its credentials to log-in.

<aside class="success">You are now able to manage Kuzzle via the Backoffice.</aside>

<aside class="notice">
Having trouble? <a href="https://gitter.im/kuzzleio/kuzzle-bo">Get in touch with us on Gitter!</a> We'll be happy to help.
</aside>
