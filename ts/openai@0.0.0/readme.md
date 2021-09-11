# Open AI

A comman line tool tool for interacting with [Open AI](https://openai.com/).

## pre-requesites

Must have [deno](https://deno.land) installed.

## installation and usage

```sh
deno install --name=openai --allow-env --allow-net --allow-read --allow-write mod.ts
openai --help
```

## API Key

To use the CLI, obtain an API key here: https://beta.openai.com/account/api-keys

### Set Via .env file

```sh: file:///.env
OPENAI_API_KEY=$SECRET_KEY
```

```sh
openai completions -- You! Complete me!
```

### Set Via environment variable

```sh
OPENAI_API_KEY=$SECRET_KEY openai completions -- You! Complete me!
```

### Set Via argument

```sh
openai --key=$SECRET_KEY completions -- You! Complete me!
```

## Input

### Inline

```sh
openai completions -- You! Complete me!
```

### REPL (Read-Evaluate-Print-Loop)

```sh
openai completions --repl
> You! Complete me!
```

### File

```text:file:///input.txt
You! Complete me!
```

```sh
openai completions --input ./input.txt
```

### Standard Input

Set the input parameter to '-' to read from stdin

```sh
echo "You! Complete me!" | openai completions --input -
```

### Interactive-file

```sh
openai completions --interactive-file input.txt
echo "You! Complete me!" > input.txt
```

This is equivalent to setting input, output, and watch to the same file and setting format to 'simple'.

## TODO

- [/] docs
- [/] pretty print prompts and options
- [/] streaming output

## Example code

### Simple usage

```sh
openai completions -e -- hello i am text
```

### Create a repl

```sh
openai completions -RS
```

### Create an interactive document

```sh
openai completions --input=document.txt --output=document.txt --watch=document.txt --format=simple --echo --verbose
```

```sh
openai completions -v -I=document.txt
```

## Flags

Documentation for the object passed to the api is available here: https://beta.openai.com/docs/api-reference/completions/create
