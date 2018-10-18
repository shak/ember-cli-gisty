# ember-cli-gisty

[![Build Status](https://travis-ci.org/shak/ember-cli-gisty.svg?branch=master)](https://travis-ci.org/shak/ember-cli-gisty)

Ember CLI add-on for inserting :octocat: Gists within ember templates.

## Table of Contents

**Basic Information**

* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
  * [Params](#params)
* [Advance Usage](#advanceusage)
* [License](#license)

### Demo

[Ember CLI Gisty Demo](https://shak.github.io/ember-cli-gisty/)

### Installation

```sh
ember install ember-cli-gisty
```

## Usage

This add-on makes an Ember component available that will render the Gist in place when used in template.

For anonymous gists:

```hbs
{{ember-gisty gist="ca8aa7061ab4fd6b70492e8eaf19addb"}}
```

For Gists created under a particular Github user:

```hbs
{{ember-gisty user="shak" gist="ca8aa7061ab4fd6b70492e8eaf19addb"}}
```

For retrieving a particular file from a Gist:

```hbs
{{ember-gisty user="shak" gist="ca8aa7061ab4fd6b70492e8eaf19addb" filename="controller.js"}}
```

### Params

#### `gist` (required)

The hash for the Gist.

```hbs
{{ember-gisty gist="ca8aa7061ab4fd6b70492e8eaf19addb"}}
```

#### `user` (optional) (default = "anonymous")

The Github user name if it is a private Gist. Assumes `anonymous` if no user provided.

```hbs
{{ember-gisty user="shak"}}
```

#### `filename` (optional)

Will retrieve and render a particular file from a Gist when specified.

```hbs
{{ember-gisty user="shak" gist="ca8aa7061ab4fd6b70492e8eaf19addb" filename="controller.js"}}
```

## Advance Usage

Gisty yields `isError` and `isLoading` component states to allow you to show loading spinners or custom error messages in your templates.

#### `isError` (Boolean)

True when there is an error loading Gist.

```hbs
{{#ember-gisty gist="ca8aa7061ab4fd6b70492e8eaf19addb" as |gisty|}}
  {{#if gisty.isError}}
    <p>There was an error loading Gist</p>
  {{/if}}
{{/ember-gisty}}
```

#### `isLoading` (Boolean)

True when the Gist is being retrieved from Github.

```hbs
{{#ember-gisty gist="ca8aa7061ab4fd6b70492e8eaf19addb" as |gisty|}}
  {{#if gisty.isLoading}}
    <p>Be with you in a sec!</p>
  {{/if}}
{{/ember-gisty}}
```

#### `fetch()` (action)

Exposes action to retrieve Gist from Github, useful if you wish you to retry fetching a Gist.

```hbs
{{#ember-gisty gist="ca8aa7061ab4fd6b70492e8eaf19addb" as |gisty|}}
  {{#if gisty.isError}}
    <p>There was an error loading Gist</p>
    <button {{action gisty.fetch}}>Click here to try again.</button>
  {{/if}}
{{/ember-gisty}}
```

## License

ember-cli-gisty is released under an MIT license and is freely distributable.
