# <picture> <img src="./logo.svg" alt="jth" style="height:32px"> - CLI

⚠️WARNING⚠️
Jth is still very much a work in progress.

- Many ideas around how the language _should_ work
  are up in the air.
- Many bugs exist in the implementation.

<hr >

Commandline interface for interacting with jth.

## Commands

### run

Run jth file

```
jth run ./hello.jth
```

Run jth code

```
jth run --code '"Hello World!" @!;'
```

### compile

Compile jth to javascript and print to console.

```
jth compile ./hello.jth
```

```
jth compile --code '"Hello World!" @!;'
```

Compile jth to javascript and send to file.

```
jth compile ./hello.jth ./hello.mjs
```

```
jth compile --code '"Hello World!" @!;' ./hello.mjs
```

Compile given directory

```
jth compile --directory src
```

Compile given directory to new directory

```
jth compile --directory src dist
```

### repl

Start a repl

Notice: this is EXTREMELY buggy.

```
jth repl
>"Hello World!" @!;
>'Hello World!'
```
