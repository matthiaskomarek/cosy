<h2 align="center">
  <img src="https://raw.githubusercontent.com/matthiaskomarek/cosy/master/other/logo.png" alt="cosy" title="cosy" width="200">
  <br>
  COSY
  <br>
</h2>
<p align="center" style="font-size: 1.2rem;">A Yeoman Generator for your <strong>CO</strong>mponent <strong>SY</strong>stem.<br> Creates a Lerna Project with Storybook, React, Jest, Rollup Bundle, Visual Regression Tests and more coming soon!</p>
<img src="https://img.shields.io/npm/v/generator-cosy.svg" alt="npm version">

# Usage

## Create your project

Install the required tools and generator: `yo`, `generator-cosy`
```
// npm
npm install -g yo generator-cosy

// yarn
yarn global add yo generator-cosy
```

Make a new directory, and `cd` into it:
```
mkdir my-new-component-system && cd $_
```

Run `yo cosy` to setup your component system folder structure
```
yo cosy
```

## Questions the generator will ask

1. Your project name
2. Do you want to use `@scoped` npm package names
3. Package scope name (only if previous question is true, will use `@scope` as prefix for your packages)
4. Do you want to use yarn?
5. Do you want to use yarn workspaces (only if previous question is true)

## Subgenerators

```
yo cosy:package <component-name>
```

Generates a new component as package.
If you have specified a `@scope`, this subgenerator will use the package scope as prefix for your new created package name.

You can omit the `<component-name>` part on the cli, the generator will than ask for your component name.

#### Questions

1. Component name (only if not specified as cli argument)
2. Package name
3. Atomic design stage (Atom, Molecules, Organism, Template, Page)

