export default (path: string) => (data: string) =>
  Deno.writeTextFileSync(path, data);
