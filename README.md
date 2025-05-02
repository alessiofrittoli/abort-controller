# AbortController 🛑

[![NPM Latest Version][version-badge]][npm-url] [![Coverage Status][coverage-badge]][coverage-url] [![Socket Status][socket-badge]][socket-url] [![NPM Monthly Downloads][downloads-badge]][npm-url] [![Dependencies][deps-badge]][deps-url]

[![GitHub Sponsor][sponsor-badge]][sponsor-url]

[version-badge]: https://img.shields.io/npm/v/%40alessiofrittoli%2Fabort-controller
[npm-url]: https://npmjs.org/package/%40alessiofrittoli%2Fabort-controller
[coverage-badge]: https://coveralls.io/repos/github/alessiofrittoli/abort-controller/badge.svg
[coverage-url]: https://coveralls.io/github/alessiofrittoli/abort-controller
[socket-badge]: https://socket.dev/api/badge/npm/package/@alessiofrittoli/abort-controller
[socket-url]: https://socket.dev/npm/package/@alessiofrittoli/abort-controller/overview
[downloads-badge]: https://img.shields.io/npm/dm/%40alessiofrittoli%2Fabort-controller.svg
[deps-badge]: https://img.shields.io/librariesio/release/npm/%40alessiofrittoli%2Fabort-controller
[deps-url]: https://libraries.io/npm/%40alessiofrittoli%2Fabort-controller

[sponsor-badge]: https://img.shields.io/static/v1?label=Fund%20this%20package&message=%E2%9D%A4&logo=GitHub&color=%23DB61A2
[sponsor-url]: https://github.com/sponsors/alessiofrittoli

## Typed AbortController

### Table of Contents

- [Getting started](#getting-started)
- [API Reference](#api-reference)
  - [Type Parameters](#type-parameters)
  - [Methods](#methods)
  - [Examples](#examples)
- [Development](#development)
  - [Install depenendencies](#install-depenendencies)
  - [Build the source code](#build-the-source-code)
  - [ESLint](#eslint)
  - [Jest](#jest)
- [Contributing](#contributing)
- [Security](#security)
- [Credits](#made-with-)

---

### Getting started

Run the following command to start using `abort-controller` in your projects:

```bash
npm i @alessiofrittoli/abort-controller
```

or using `pnpm`

```bash
pnpm i @alessiofrittoli/abort-controller
```

---

### API Reference

The `AbortController` Class extends the [Native Web API AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) Class, but provides a typed `.abort()` method and `.signal.reason` using the [`AbortError`](https://npmjs.com/package/@alessiofrittoli/exception#aborterror-class) provided by [`@alessiofrittoli/exception`](https://npmjs.com/package/@alessiofrittoli/exception) package.

#### Type Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `TCode`   | `ErrorCode` | A custom type assigned to the `AbortError.code`. Default: [`ErrorCode`](https://www.npmjs.com/package/@alessiofrittoli/exception#errorcode-enum). |

---

#### Methods

##### `AbortController.abort()`

Invoking this method will set this object's AbortSignal's aborted flag and signal to any observers that the associated activity is to be aborted.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `reason`  | `string` | 'The operation was aborted.' | The abort reason. This will be set to `AbortError.message`. |
| `option`  | `AbortErrorOptions<TCode>` | - | Custom `AbortError` options. |

</details>

---

#### Examples

##### Listening to abort events

```ts
import { AbortController } from '@alessiofrittoli/abort-controller'

const controller  = new AbortController()
const { signal }  = controller

signal.addEventListener( 'abort', event => {
  console.log( 'Aborted at', event.timeStamp )
  console.log( signal.reason ) // `AbortSignal.reason` is now type of `AbortError`
} )

button.addEventListener( 'click', () => {
  controller.abort( 'User aborted the request.' )
} )
```

---

##### Using custom AbortError codes

```ts
import { AbortController } from '@alessiofrittoli/abort-controller'

enum CustomAbortErrorCode
{
  REASON_1 = 'ERR:ABORTREASON1',
  REASON_2 = 'ERR:ABORTREASON2',
}

const controller  = new AbortController()
const { signal }  = controller

signal.addEventListener( 'abort', () => {
  switch ( signal.reason.code ) {
    case CustomAbortErrorCode.REASON_1:
      console.log( 'User aborted the request due to button 1 click.' )
      break
    
    case CustomAbortErrorCode.REASON_2:
      console.log( 'User aborted the request due to button 2 click.' )
      break
  
    default:
      console.log( 'User aborted the request due to unknown reason.' )
      break
  }
} )
  
button.addEventListener( 'click', () => {
  controller.abort( 'User clicked button 1.', { code: CustomAbortErrorCode.REASON_1 } )
} )

button2.addEventListener( 'click', () => {
  controller.abort( 'User clicked button 2.', { code: CustomAbortErrorCode.REASON_2 } )
} )
```

---

### Development

#### Install depenendencies

```bash
npm install
```

or using `pnpm`

```bash
pnpm i
```

#### Build the source code

Run the following command to test and build code for distribution.

```bash
pnpm build
```

#### [ESLint](https://www.npmjs.com/package/eslint)

warnings / errors check.

```bash
pnpm lint
```

#### [Jest](https://npmjs.com/package/jest)

Run all the defined test suites by running the following:

```bash
# Run tests and watch file changes.
pnpm test:watch

# Run tests in a CI environment.
pnpm test:ci
```

- See [`package.json`](./package.json) file scripts for more info.

Run tests with coverage.

An HTTP server is then started to serve coverage files from `./coverage` folder.

⚠️ You may see a blank page the first time you run this command. Simply refresh the browser to see the updates.

```bash
test:coverage:serve
```

---

### Contributing

Contributions are truly welcome!

Please refer to the [Contributing Doc](./CONTRIBUTING.md) for more information on how to start contributing to this project.

Help keep this project up to date with [GitHub Sponsor][sponsor-url].

[![GitHub Sponsor][sponsor-badge]][sponsor-url]

---

### Security

If you believe you have found a security vulnerability, we encourage you to **_responsibly disclose this and NOT open a public issue_**. We will investigate all legitimate reports. Email `security@alessiofrittoli.it` to disclose any security vulnerabilities.

### Made with ☕

<table style='display:flex;gap:20px;'>
  <tbody>
    <tr>
      <td>
        <img alt="avatar" src='https://avatars.githubusercontent.com/u/35973186' style='width:60px;border-radius:50%;object-fit:contain;'>
      </td>
      <td>
        <table style='display:flex;gap:2px;flex-direction:column;'>
          <tbody>
              <tr>
                <td>
                  <a href='https://github.com/alessiofrittoli' target='_blank' rel='noopener'>Alessio Frittoli</a>
                </td>
              </tr>
              <tr>
                <td>
                  <small>
                    <a href='https://alessiofrittoli.it' target='_blank' rel='noopener'>https://alessiofrittoli.it</a> |
                    <a href='mailto:info@alessiofrittoli.it' target='_blank' rel='noopener'>info@alessiofrittoli.it</a>
                  </small>
                </td>
              </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
