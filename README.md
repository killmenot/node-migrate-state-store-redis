# node-migrate state storage for Redis

This is a [state storage implementation](https://github.com/tj/node-migrate#custom-state-storage) for the [`node-migrate`](https://github.com/tj/node-migrate) framework. It will store your migration state in Redis.

In case you’re using `node-migrate` for migrating your Redis, it makes sense to keep the state within the database itself, instead of a separate file which is used by `node-migrate` per default.

## Installation

```shell
$ yarn add migrate-state-store-redis redis
```

## Usage

### Basic

```javascript
import * as migrate from 'migrate';
import RedisStateStore from 'migrate-state-store-redis';

migrate.load({
  stateStore: new RedisStateStore(),
  // further configuration …
}, (err, set) => {
  // your code …
});
```

### Passing configuration via constructor

```javascript
import * as migrate from 'migrate';
import RedisStateStore from 'migrate-state-store-redis';

const config = {
  storeUrl: 'redis://localhost:6379/10',
  migrationKey: 'my-migrations-key',
  lastRunKey: 'my-last-run-key',
};

migrate.load({
  stateStore: new RedisStateStore(config),
  // further configuration …
}, (err, set) => {
  // your code …
});
```

### Passing configuration via environment variables

```javascript
import * as migrate from 'migrate';
import RedisStateStore from 'migrate-state-store-redis';

process.env.REDIS_STATE_STORE_URL = 'redis://localhost:6379/10';
process.env.REDIS_STATE_MIGRATION_KEY = 'my-migrations-key';
process.env.REDIS_STATE_LAST_RUN_KEY = 'my-last-run-key';

migrate.load({
  stateStore: new RedisStateStore(),
  // further configuration …
}, (err, set) => {
  // your code …
});
```

### Command-line

```shell
$ migrate up --env .env --store migrate-state-store-redis
```

## License

    The MIT License (MIT)

    Copyright (c) Alexey Kucherenko

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
