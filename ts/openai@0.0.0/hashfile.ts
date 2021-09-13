import { createHash } from "https://deno.land/std@0.80.0/hash/mod.ts";

export default async (input: string) => {
  const hasher = createHash("md5");
  const file = await Deno.open(input);
  for await (const chunk of Deno.iter(file)) {
    hasher.update(chunk);
  }
  Deno.close(file.rid);
  return hasher.toString();
};
