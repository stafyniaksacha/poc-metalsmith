---
layout: full.html
algolia: true
title: Running Kuzzle Backoffice
---

# Running Kuzzle Backoffice

The Kuzzle Backoffice is a handy **web application** that helps you administrate Kuzzle. You can use it to **manage your data**, subscribe to **realtime notifications** and manage **security** rules.

You can use the <a href="http://kuzzle-backoffice.netlify.com/">publicly hosted Kuzzle Backoffice</a>.
If you want to host the Kuzzle Backoffice on your own server, you can download the source code [here](https://github.com/kuzzleio/kuzzle-backoffice/releases).

In both cases, you'll be able to <a href="#select-the-kuzzle-instance-to-connect-to">select the Kuzzle server</a> you want to manage once the Backoffice starts up.

<aside class="notice">
Having trouble? <a href="https://gitter.im/kuzzleio/kuzzle-bo">Get in touch with us on Gitter!</a>
</aside>

## Select the Kuzzle server to connect to

The Kuzzle Backoffice automatically looks for a Kuzzle server on `localhost:7512`. If none is present, you will be prompted to choose a Kuzzle instance to connect to.

You can tell the Backoffice to connect to any Kuzzle server by clicking on the **"Choose Environment"** dropdown menu, then by selecting **"Create new"**.

![Kuzzle Backoffice is trying to connect to a Kuzzle server](/assets/images/kuzbo-connecting.png)

Create a new Backoffice environment by providing the address of the Kuzzle server you want to administrate. You can associate it with a custom **name** (e.g. "Development" or "My First Kuzzle") and a **color** (e.g. red may be a good idea for production environments).

<aside class="success">Your Kuzzle Backoffice is connected to Kuzzle.</aside>

<aside class="notice">
Having trouble? <a href="https://gitter.im/kuzzleio/kuzzle-bo">Get in touch with us on Gitter!</a> We'll be happy to help.
</aside>

## Create an admin account

At this point, Kuzzle is still pristine, which means that no admin account has been set-up: this means that the `anonymous` user has full rights on the server.

![Kuzzle Backoffice prompts the creation of a first admin account](/assets/images/kuzbo-firstadmin.png)

The Backoffice will prompt you with an admin account name and a password. **Leave the "Reset anonymous account rights" unchecked**, as we will use the `anonymous` account in the next steps of this tutorial.

Once you created the admin account, use its credentials to log-in.

<aside class="success">You are now able to manage Kuzzle via the Backoffice.</aside>

<aside class="notice">
Having trouble? <a href="https://gitter.im/kuzzleio/kuzzle-bo">Get in touch with us on Gitter!</a> We'll be happy to help.
</aside>
