# Standard Library

[home](/#)

tl;dr [skip straight to some demos](./demos.html)

⚠ This is very much a work in progress. ⚠

This is my standard library.
It is a collection of modules, tools and components that
I've created for my personal projects over the years.
I hope that publishing them here, I will be able to easily pull them
into other projects that I create.

Most importantly, I also hope that you will be able to use them too!
Everything is still in the early stages,
but I'm working to make everything accessible to the average user!
This means adding documentation, a search function, and [more demos](./demos.html).

Everything is written in pure, uncompliled languages -- JavaScript and CSS.
This makes it easy to import them directly into your project -- web or [deno](https://deno.land/). I'm currently in the process of languages that compile to the web -- Typescript, Rust, and AssemblyScript are the prime candidates.

Keep in mind that this is still in the early stages. The code in all modules should be considered unstable unless versioned 1.0.0 or above. (No modules currently fit this criterion). If you want to search for something specific, you'll have a better time by visiting the [github repository](https://github.com/johnhenry/lib) directly.

## Links

- [js](./js/) Contains importable JavaScript modules
- [css](./css/) Contains importable CSS modules
- [bash](./bash/) Contains a few useful Command Line Tools
- [html](./html/) Contains a few useful HTML snippets
- [demos](./demos.html) Contains importable JavaScript modules

## Search

<section>
<script src="https://unpkg.com/lunr/lunr.js"></script>
<script type="module">
  import textToDOM from "./js/text-to-DOM-nodes/0.0.0/index.mjs";
  const searchBox = document.querySelector("#search-box");
  const searchResults = document.querySelector("#search-results");
  let index;
  let rev = {};
  const search = (inputValue) => {
    const foundDocuments = index.search(inputValue).map(({ ref }) => rev[ref]);
    display(foundDocuments);
  };
  const startAutocomplete = async (i) => {
    if (index) {
      return;
    }
    try {
      const documents = await fetch("./index.json").then((res) => res.json());
      rev = Object.fromEntries(documents.map((doc) => [doc.url, doc]));
      index = lunr(function () {
        this.ref("url");
        this.field("content");
        this.field("content");
        this.field("url");
        documents.forEach(function (doc) {
          this.add(doc);
        }, this);
      });
    } catch (e) {
      console.error(e);
    } finally {
      search(searchBox.value);
    }
  };
  const display = (documents) => {
    searchResults.innerHTML = "";
    searchResults.append(
      ...textToDOM(
        documents
          .map(({ title, url }) => `<li><a href="${url}">${title}</a></li>`)
          .join("")
      )
    );
  };

searchBox.onmouseover = searchBox.onclick = startAutocomplete;
searchBox.onkeyup = (e) => {
search(e.target.value);
};
</script>

<input id="search-box" type="search" placeholder="Site search..." />

<ul id="search-results"></ul>

</section>

## About

This site is published at [https://johnhenry.github.io/lib) via the [dist branch](https://github.com/johnhenry/lib/tree/dist) of [https://github.com/johnhenry/lib](https://github.com/johnhenry/lib).

- [Project](https://github.com/users/johnhenry/projects/2)
- [Discussion](https://github.com/johnhenry/lib/discussions)
- [Issues](https://github.com/johnhenry/lib/issues)
