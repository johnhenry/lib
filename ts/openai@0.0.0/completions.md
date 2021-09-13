# Open AI completions

Takes a prompt and uses Artifical Intelligence to create complete it.

```
openai completions --help
```

### CLI FLags

## Prompt (--prompt, -p, OPENAI_PROMPT)

To provide a prompt, use the `--prompt` flag

```sh
openai completions --prompt "<prompt>"
```

or follow the invocation witn '--'
to indicate that everything afterward is part of the prompt

```sh
openai completions -- <prompt>
```

## Input (--input, -i, OPENAI_INPUT)

The input flag provides an alternative way to specify the prompt via file.

Create a file containing the prompt.

```sh: file:///prompt.txt
<prompt>
```

And either pass the file name to the input flag

```sh
openai completions -i prompt.txt
```

or pass "-" to the input flag and read it from stdin.

```sh
cat prompt.txt | openai completions -i -
```

```sh
echo "<prompt>" | openai completions -i -
```

## Engine (-g, --engine, OPENAI_ENGINE)

### Full (--full, -F)

Bla, bla, bla...

## API FLags

These are CLI flags that correspond to properties passed to the API

### Temperature (--temperature, -t, OPENAI_TEMPERATURE)

Bla, bla, bla...

[Offical API Documentation]()

### --full

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
