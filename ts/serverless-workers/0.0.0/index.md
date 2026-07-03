```javascript
// file:///./random.fetch.mjs
export default (fetchEvent) => {};
```

```javascript
// file:///./random.express.mjs
export const ran = (req, res) => {};
```

```javascript
// file:///./random.fetch.js
addEventListener((fetchEvent) => {});
```

```javascript
// file:///./random.fetch.js
module.exports = (req, res) => {};
```

```javascript
import random from "./random.fetch.mjs";
const server = new Server({
  globals: { Request, Response },
  incomingTransform: (req) => req,
  outgoingTransform: (res) => res,
});

server.start(8080);

await server.mount(random, { path: "random", module: true, fetch: true });
await server.mount("./random.express.mjs", {
  path: "random1",
  module: true,
  express: true,
  export: "ran",
});

await server.mount("./random.fetch.js", {
  path: "random2",
  fetch: true,
});

await server.mount("./random.express.js", { path: "random3", express: true });

await server.mount("./images", { path: "static", static: true });

server.id;
server.mounts;
server.port;
server.uptime;
server.mounts;
```

```sh
$ worker daemon start
daemon started at /unix/tmp/worker.0123456789.daemon.sock
```

```sh
$ worker daemon status
daemon running at /unix/tmp/worker.0123456789.daemon.sock
```

```sh
$ worker server create
server created with id 12345
```

| id    | uptime | port | mounts | status  |
| ----- | ------ | ---- | ------ | ------- |
| 12345 | 0s     | 8080 | 0      | stopped |

```sh
$ worker server get 12345
```

**12345**

- port: 8080 (running)
- type: fetch (modular)
- uptime: 14s

```sh
$ worker server start 12345 --port=8080
server 12345 running on port 8080
```

| id    | uptime | port | mounts | status  |
| ----- | ------ | ---- | ------ | ------- |
| 12345 | 0s     | 8080 | 0      | running |

```sh
$ worker servers
```

| id    | uptime | port | mounts | status  |
| ----- | ------ | ---- | ------ | ------- |
| 12345 | 1s     | 8080 | 0      | running |

```sh
$ worker server mount --server=12345 --path=/random --module --fetch ./random.fetch.mjs
./random.fetch.mjs mounted on 12345 at http://localhost:8080/ramdom as fetchEvent module with id 12345.0

$ worker server mount --port=8080 --path=/random1 --module --export="ran" --express ./random.express.mjs
./random.express.mjs mounted on 12345 at http://localhost:8080/random1 as express module with id 12345.1

$ worker server default 12345
Default server set to 12345

$ worker server mount --path=/random2 --module ./random.fetch.js
./random.fetch.js mounted on 12345 at http://localhost:8080/random2 as fetchEvent file with id 12345.2

$ worker server mount --path=/random3 --express ./random.express.js
./random.express.js mounted on 12345 at http://localhost:8080/random2 as express file with id 12345.3

$ worker server mount --path=/static --static ./images
./random.express.js mounted on 12345 at http://localhost:8080/random2 as static directory with id 12345.4

```

```sh
$ worker servers
```

| id      | uptime | port | mounts | status  |
| ------- | ------ | ---- | ------ | ------- |
| \*12345 | 7s     | 8080 | 5      | running |

```sh
$ worker mounts
```

| id      | path                          | uptime | type        | mounts                    | active |
| ------- | ----------------------------- | ------ | ----------- | ------------------------- | ------ |
| 12345.0 | http://localhost:8080/random  | 12s    | fetch (m)   | /.../.random.fetch.mjs    | true   |
| 12345.1 | http://localhost:8080/random1 | 11s    | express (m) | /..././random.express.mjs | true   |
| 12345.2 | http://localhost:8080/random2 | 10s    | fetch       | /..././random.fetch.js    | true   |
| 12345.3 | http://localhost:8080/random3 | 9s     | express     | /..././random.express.js  | true   |
| 12345.4 | http://localhost:8080/static  | 8s     | static      | /..././images             | true   |

```sh
$ worker mount get 12345.0
```

**12345.0** http://localhost:8080/random

- server: 12345 (running 8080)
- path: /random
- type: fetch (modular)
- uptime: 14s

```sh
$ worker server stop 12345
12345 stopped on port 8080

$ worker server start 12345 --8081
12345 started on port 8081

$ worker server stop 12345
12345 stopped on port 8081

$ wworker server restart 12345
12345 started on port 8081

$ worker server destroy 12345
12345 stopped on port 8081
12345 destroyed

$ worker server mount --port=8082 ...
no server running on port 8082
server created with id 23456
server 12345 running on port 8082
... mounted on 23456 at ... as ... with id 23456.0

$ worker server mount --port=8082
... mounted on 23456 at ... as ... with id 23456.1

$ worker server start
no server specified
server created with id 34567
server 34567 running on port 24824 (randomly chosen)

$ worker server copy --path="" 23456.1 8082
[23456.1] mounted on 34567 at ... as ... with id 34567.0

$ worker mount copy --path="" 23456.1 8082
[23456.1] mounted on 34567 at ... as ... with id 34567.0

$ worker server tail 23456
Logs for server 23456:

$ worker server tail 34567
Logs for server 34567:

$ worker mount tail 23456
Logs for server 23456:
```

```sh
$ worker daemon stop
daemon stopped at /unix/tmp/worker.0123456789.daemon.sock
```
