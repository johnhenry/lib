// const f = fetcher("https://api.openai.com/v1/engines/", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${this.#apiKey}`,
//   },
//   body: JSON.stringify({ prompt, ...options }),
// }, fetch);

// f(`${engine_id}/completions`, {body :JSON.stringify({ prompt, ...options }})

const { fetch: fetchPlus } = fetchBuilder
  .base(globalThis.fetch)
  .url({
    prepend: "https://api.openai.com/v1/engines/",
    append: "/completions",
  })
  .body({ transform: (x) => JSON.stringify(x) })
  .header("Content-Type", "application/json")
  .header("Authorization", `Bearer ${this.#apiKey}`)
  .header({
    name: "Content-Type",
    value: "application/json",
    extend: false,
  })
  .header({
    name: "Content-Type",
    allow: false,
  });

fetchPlus(engine_id, { body: { prompt, ...options } });
