# OpenAI Completions

Use artificial intelligence to complete text input.

## Help

Pass the `--help` flag to a `openai completions` to see the default help message.

```
openai completions --help
```

## Prompt

Provide a prompt to the application and it will use Open AI's models to complete it.

One can deliver the prompt to the application in a number of ways:

### Via FLag

Use the `--prompt` flag to pass in a prompt directly

```sh
openai completions --prompt "You! Complete me!"
```

See: [CLI Flags:Prompt](#cli-flags-prompt).

### Inline

Follow the invocation with '--' to indicate that everything afterward is part of the prompt

```sh
openai completions -- You! Complete me!
```

### Via File

Put the prompt within a text file and reference it with the `--input` flag.

```sh
openai completions --input prompt.text
```

See: [CLI Flags:Input](#cli-flags-prompt).

### Via STDIN

Set the input flag to '-' to indicate that the prompt is to be piped into STDIN.

```sh
echo "You! Complete me!" | openai completions --input -
```

OR

```sh
cat prompt.txt | openai completions --input -
```

See: [CLI Flags:Input](#cli-flags-prompt).

## CLI FLags

CLI flags are used to configure the application.

Most of these flags can be set via an Environmental Variable

### Verbose

|                      |     |                 |
| :------------------- | :-: | --------------: |
| Flag                 |  :  |       --verbose |
| Short flag           |  :  |              -v |
| Environment Variable |  :  | (not available) |

The _verbose_ flag determines how much data is logged.

Add multiple instances of the flag to increase the verbosity.

`openai completions -v` logs everyting with a log level of 1 or lower
`openai completions -vv` logs everyting with a log level of 2 or lower
`openai completions -vvv` logs everyting with a log level of 3 or lower

The current highest log level is `2`.

### Prompt

|                      |     |               |
| :------------------- | :-: | ------------: |
| Flag                 |  :  |      --prompt |
| Short flag           |  :  |            -P |
| Environment Variable |  :  | OPENAI_PROMPT |

The _prompt_ flag determines the prompt to be passed to the API.

See [prompt](#promt) for more ways to pass the prompt.

```sh
openai completions -P "<prompt>"
```

### Engine

|                      |     |               |
| :------------------- | :-: | ------------: |
| Flag                 |  :  |      --engine |
| Short flag           |  :  |            -g |
| Environment Variable |  :  | OPENAI_ENGINE |

The _engine_ flag determines the engine to be used.

```sh
openai completions -g "<prompt>"
```

Engines vary in quality and cost.

See [`openai engines` command](./engines.md) for more information.

### Flash Message

|                      |     |                      |
| :------------------- | :-: | -------------------: |
| Flag                 |  :  |      --flash-message |
| Short flag           |  :  |                   -F |
| Environment Variable |  :  | OPENAI_FLASH_MESSAGE |

The _flash_message_ determines a message to be flashed to the user.
This can be useful for giving instructions when using an .env file.

### Input

|                      |     |                   |
| :------------------- | :-: | ----------------: |
| Flag                 |  :  |           --input |
| Short flag           |  :  |                -i |
| Environment Variable |  :  | OPENAI_INPUT_FILE |

The _input_ flag provides a way to specify the prompt via file.

```sh: file:///prompt.txt
<prompt>
```

```sh
openai completions -i prompt.txt
```

Passing "-" to the input flag will allow reading via STDIN.

```sh
cat prompt.txt | openai completions -i -
```

```sh
echo "<prompt>" | openai completions -i -
```

### Output

|                      |     |                    |
| :------------------- | :-: | -----------------: |
| Flag                 |  :  |           --output |
| Short flag           |  :  |                 -o |
| Environment Variable |  :  | OPENAI_OUTPUT_FILE |

The _output_ flag allows you to specify a file into which to write the completed text.

```sh
 openai completions -o output.txt -- <prompt>
```

### Append

|                      |     |                       |
| :------------------- | :-: | --------------------: |
| Flag                 |  :  |              --append |
| Short flag           |  :  |                    -d |
| Environment Variable |  :  | OPENAI*APPEND_OUTPUT* |

Passing the _append_ flag along with the _output_
flag will cause data to be appended to the file rather than overwritten.

```sh
openai completions -o output.txt -d -- <prompt>
```

### Style

|                      |     |                    |
| :------------------- | :-: | -----------------: |
| Flag                 |  :  |            --style |
| Short flag           |  :  |                 -y |
| Environment Variable |  :  | OPENAI_TEMPERATURE |

Passing the a style to the _style_ flag will determine how
Currently the only supported value is "full", which will
return the full JSON object passed by the API.
Otherwise a simplified version of the output will be returned as pain text.

```sh
openai completions -y full -- <prompt>
```

### Full

|                      |     |             |
| :------------------- | :-: | ----------: |
| Flag                 |  :  |      --full |
| Short flag           |  :  |          -F |
| Environment Variable |  :  | OPENAI_FULL |

Passing the _full_ flag is equivalent to passing the _style_ flag with a value of "full".

```sh
openai completions -F -- <prompt>
```

### HTTP Proxy

|                      |     |                   |
| :------------------- | :-: | ----------------: |
| Flag                 |  :  |      --http-proxy |
| Short flag           |  :  |                -H |
| Environment Variable |  :  | OPENAI_HTTP_PROXY |

### Watch

|                      |     |                   |
| :------------------- | :-: | ----------------: |
| Flag                 |  :  |           --watch |
| Short flag           |  :  |                -w |
| Environment Variable |  :  | OPENAI_HTTP_PROXY |

### Interactive-file

|                      |     |                         |
| :------------------- | :-: | ----------------------: |
| Flag                 |  :  |      --interactive-file |
| Short flag           |  :  |                      -I |
| Environment Variable |  :  | OPENAI_INTERACTIVE_FILE |

This is equivalent to setting input, output, and watch to the same file and setting format to 'simple'.

### Interactive-Start

|                      |     |                          |
| :------------------- | :-: | -----------------------: |
| Flag                 |  :  |      --interactive-start |
| Short flag           |  :  |                       -a |
| Environment Variable |  :  | OPENAI_INTERACTIVE_START |

### Interactive-Retart

|                      |     |                            |
| :------------------- | :-: | -------------------------: |
| Flag                 |  :  |      --interactive-restart |
| Short flag           |  :  |                         -z |
| Environment Variable |  :  | OPENAI_INTERACTIVE_RESTART |

### REPL

|                      |     |             |
| :------------------- | :-: | ----------: |
| Flag                 |  :  |      --repl |
| Short flag           |  :  |          -R |
| Environment Variable |  :  | OPENAI_REPL |

## API FLags

These are CLI flags that correspond to properties passed to the API
Documentation for the object passed to the api is available here: https://beta.openai.com/docs/api-reference/completions/create

### Max Tokens

|                      |     |                   |
| :------------------- | :-: | ----------------: |
| Flag                 |  :  |      --max_tokens |
| Short flag           |  :  |                -m |
| Environment Variable |  :  | OPENAI_MAX_TOKENS |

### Temperature

|                      |     |                    |
| :------------------- | :-: | -----------------: |
| Flag                 |  :  |      --temperature |
| Short flag           |  :  |                 -t |
| Environment Variable |  :  | OPENAI_TEMPERATURE |

### Top P

|                      |     |              |
| :------------------- | :-: | -----------: |
| Flag                 |  :  |      --top_p |
| Short flag           |  :  |           -p |
| Environment Variable |  :  | OPENAI_TOP_P |

### N

|                      |     |          |
| :------------------- | :-: | -------: |
| Flag                 |  :  |      --n |
| Short flag           |  :  |       -n |
| Environment Variable |  :  | OPENAI_N |

### Stream

WARNING: Not implemeted. Will throw error if called.

|                      |     |               |
| :------------------- | :-: | ------------: |
| Flag                 |  :  |      --stream |
| Short flag           |  :  |            -s |
| Environment Variable |  :  | OPENAI_STREAM |

### Logprobs

|                      |     |                    |
| :------------------- | :-: | -----------------: |
| Flag                 |  :  |         --logprobs |
| Short flag           |  :  |                 -n |
| Environment Variable |  :  | OPENAI_TEMPERATURE |

### Echo

|                      |     |             |
| :------------------- | :-: | ----------: |
| Flag                 |  :  |      --echo |
| Short flag           |  :  |          -e |
| Environment Variable |  :  | OPENAI_ECHO |

### Stop

|                      |     |             |
| :------------------- | :-: | ----------: |
| Flag                 |  :  |      --stop |
| Short flag           |  :  |          -x |
| Environment Variable |  :  | OPENAI_STOP |

### Presence Penalty

|                      |     |                         |
| :------------------- | :-: | ----------------------: |
| Flag                 |  :  |      --presence_penalty |
| Short flag           |  :  |                      -r |
| Environment Variable |  :  | OPENAI_PRESENCE_PENALTY |

### Frequency Penalty

|                      |     |                          |
| :------------------- | :-: | -----------------------: |
| Flag                 |  :  |       --presence_penalty |
| Short flag           |  :  |                       -r |
| Environment Variable |  :  | OPENAI_FREQUENCY_PENALTY |

### Best Of

|                      |     |                |
| :------------------- | :-: | -------------: |
| Flag                 |  :  |      --best_of |
| Short flag           |  :  |             -b |
| Environment Variable |  :  | OPENAI_BEST_OF |

### Logit Bias

|                      |     |                |
| :------------------- | :-: | -------------: |
| Flag                 |  :  |   --logit_bias |
| Short flag           |  :  |             -l |
| Environment Variable |  :  | OPENAI_BEST_OP |

## Recipes

### Simple usage

```sh
openai completions -e -- hello i am text
```

### Create a repl

```sh
openai completions -R
```

### Create an interactive document

```sh
openai completions --input=document.txt --output=document.txt --watch=document.txt --format=simple --echo --verbose
```

```sh
openai completions -v -I=document.txt
```
