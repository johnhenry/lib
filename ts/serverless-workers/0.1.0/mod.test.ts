/**
 * Unit tests for serverless-workers. Routing is exercised through
 * `server.handler` directly — no server is started and no network
 * access is needed.
 */
import Server from "./mod.ts";

const assert = (condition: boolean, message: string) => {
  if (!condition) throw new Error(`assertion failed: ${message}`);
};
const assertEquals = (actual: unknown, expected: unknown) => {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`expected ${e}, got ${a}`);
};

const text = async (response: Response | Promise<Response>) =>
  await (await response).text();

Deno.test("routes requests to a mounted handler by path prefix", async () => {
  const server = new Server();
  await server.mount(() => new Response("random"), { path: "/random" });

  const hit = await server.handler(new Request("http://localhost/random"));
  assertEquals(hit.status, 200);
  assertEquals(await hit.text(), "random");

  const sub = await server.handler(
    new Request("http://localhost/random/nested"),
  );
  assertEquals(await sub.text(), "random");
});

Deno.test("longest matching prefix wins", async () => {
  const server = new Server();
  await server.mount(() => new Response("root"), { path: "/" });
  await server.mount(() => new Response("api"), { path: "/api" });
  await server.mount(() => new Response("api-v2"), { path: "/api/v2" });

  assertEquals(await text(server.handler(new Request("http://x/"))), "root");
  assertEquals(await text(server.handler(new Request("http://x/api"))), "api");
  assertEquals(
    await text(server.handler(new Request("http://x/api/v2/users"))),
    "api-v2",
  );
  assertEquals(
    await text(server.handler(new Request("http://x/other"))),
    "root",
  );
});

Deno.test("does not match partial path segments", async () => {
  const server = new Server();
  await server.mount(() => new Response("api"), { path: "/api" });
  const miss = await server.handler(new Request("http://x/apiary"));
  assertEquals(miss.status, 404);
});

Deno.test("unmatched requests get a 404 by default", async () => {
  const server = new Server();
  const response = await server.handler(new Request("http://x/nothing"));
  assertEquals(response.status, 404);
});

Deno.test("a custom notFound handler is used for misses", async () => {
  const server = new Server({
    notFound: () => new Response("teapot", { status: 418 }),
  });
  const response = await server.handler(new Request("http://x/none"));
  assertEquals(response.status, 418);
  assertEquals(await response.text(), "teapot");
});

Deno.test("mount paths are normalized", async () => {
  const server = new Server();
  await server.mount(() => new Response("ok"), { path: "random/" });
  assertEquals(server.mounts[0].path, "/random");
  const response = await server.handler(new Request("http://x/random"));
  assertEquals(await response.text(), "ok");
});

Deno.test("unmount removes a mount by id", async () => {
  const server = new Server();
  const id = await server.mount(() => new Response("gone"), {
    path: "/gone",
  });
  assertEquals(server.mounts.length, 1);
  assert(server.unmount(id), "unmount should report success");
  assertEquals(server.mounts.length, 0);
  assert(!server.unmount(id), "second unmount should report failure");
  const response = await server.handler(new Request("http://x/gone"));
  assertEquals(response.status, 404);
});

Deno.test("mount accepts a module specifier with a default export", async () => {
  const server = new Server();
  const specifier = "data:application/typescript," + encodeURIComponent(
    "export default () => new Response('from module');",
  );
  await server.mount(specifier, { path: "/mod" });
  const response = await server.handler(new Request("http://x/mod"));
  assertEquals(await response.text(), "from module");
});

Deno.test("mount rejects modules without a default function export", async () => {
  const server = new Server();
  const specifier = "data:application/typescript," +
    encodeURIComponent("export const nothing = 1;");
  let thrown: unknown;
  try {
    await server.mount(specifier);
  } catch (error) {
    thrown = error;
  }
  assert(thrown instanceof TypeError, "should throw TypeError");
});

Deno.test("port and uptime reflect stopped state", () => {
  const server = new Server();
  assertEquals(server.port, undefined);
  assertEquals(server.uptime, 0);
});
