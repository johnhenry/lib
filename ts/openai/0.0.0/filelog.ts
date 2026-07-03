export default (path: string, append: boolean = false) =>
  (data: string) =>
    Deno.writeTextFileSync(path, data, { append });
