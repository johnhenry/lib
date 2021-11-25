Task:

1. Allow multiple versions of python via pyenv
2. Install latest version of python (3.10.0 as of writing)

OS: Mac OS Monterey
Shell: ZSH

Pre-Requesites:
[Brew](https://brew.sh/)

```bash
brew install pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init --path)"\nfi' >> ~/.zshrc
pyenv install 3.10.0
pyenv global 3.10.0
```

Sources:

- https://stackoverflow.com/questions/33321312/cannot-switch-python-with-pyenv (Basic Steps)
- https://stackoverflow.com/a/68228627/1290781 (Fixes due to updated API)
- https://www.python.org/doc/versions/#:~:text=8%20December%202020.-,Python%203.9.,released%20on%2030%20August%202021. (latest python version)
