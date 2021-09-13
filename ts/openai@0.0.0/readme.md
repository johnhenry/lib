# Open AI

A command line tool for interacting with [Open AI](https://openai.com/).

## pre-requesites

Must have [deno](https://deno.land) installed.

## installation and usage

```sh
deno install --name=openai --allow-env --allow-net --allow-read --allow-write https://johnhenry.github.io/std/ts/openai@0.0.0/mod.ts
```

## Basic usage

```sh
openai --help
```

```sh
openai <command> --help
```

## API Key

To use the CLI commands, obtain an API key from here: https://beta.openai.com/account/api-keys.

You can set the key in one of three ways.

### Set Via .env file

In the directory where you intend to run openai,
set an environment variable named `OPENAI_ENV_KEY` to your API key.

```sh: file:///.env
OPENAI_API_KEY=$SECRET_KEY
```

and run the command you wish.

```sh
openai <command>
```

### Set Via environment variable

Set an environment variable named `OPENAI_ENV_KEY`,
to your API key as your run the program.

```sh
OPENAI_API_KEY=$SECRET_KEY openai <command>
```

### Set Via "--key" flag

Set the --key flag to your API key,
when your run the program

```sh
openai --key=$SECRET_KEY <command>
```

## Commands

- [openai completions](./completions.md)
- [openai engines](./engines.md)
