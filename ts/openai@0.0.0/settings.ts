const SETTINGS: any = {};
{
  const set: any =
    (await settings.load({
      file: "openai",
      searchDir: Deno.cwd(),
    })) || {};
  const env = environment();
  SETTINGS.API_KEY = set.OPENAI_API_KEY;
}
export default SETTINGS;
