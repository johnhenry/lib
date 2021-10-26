export default async (code, type = "application/javascript") =>
  await import(URL.createObjectURL(new Blob([code], { type })));
