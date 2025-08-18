
# volta
> volta is a JavaScript tool manager that makes it easy to install and manage different versions of Node.js, npm, and Yarn.

### Installation

```bash
# linux / macOS
curl https://get.volta.sh | bash
# windows
# download  from https://github.com/volta-cli/volta/releases
```

### Usage
```bash
# install node
volta install node

# install sepcific version of node
volta install node@16.13.0

# pin a specific version of node, this will create a `package.json` file if it doesn't exist,if it exists, it will update the `engines` field
volta pin node@16.13.0

```

### Commands

```bash
# list installed tools
volta list
# list installed node versions
volta list node

# install pnpm
volta install pnpm
# install yarn
volta install yarn
# install npm
volta install npm
```