# @monolithed/logger

[![Build Status](https://travis-ci.org/monolithed/logger.png)](https://travis-ci.org/monolithed/logger)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)

A simple logger

## Installation

Install with npm or Yarn:

**npm**:

```
npm install @monolithed/logger --save
```

**Yarn**:

```
yarn add @monolithed/logger
```

## Synopsis

```ts
type Logger = {
    new (options: Options): {
        [Method in keyof Pick<Console, Methods>]: Console[Method];
    };
};
```

## Basic usage

```typescript
import {Logger} from '@monolithed/logger';

const logger = new Logger({title: 'Hello'});

logger.info('World'); // Hello World
```

## Options

```typescript
type Options = {
    title?: string;
    debug?: boolean;
    format?: (...messages: unknown[]) => unknown[];
};
```

### title 

```typescript
import {Logger} from '@monolithed/logger';

const logger = new Logger({title: 'Hello'});

logger.info('World'); // Hello World
```

### debug 

```typescript
import {Logger} from '@monolithed/logger';

const logger = new Logger({debug: true});

logger.info('Hello', 'World'); // 01.07.2021, 02:05:34 Hello World
```

### format 

```typescript
import {Logger} from '@monolithed/logger';

const logger = new Logger({
    format(...message) {
        return ['Hello', ...message]
    }
});

logger.info('World'); // Hello World
```

### Methods

```typescript
type Methods = 'debug' | 'error' | 'info' | 'log' | 'warn';
```

A wide variety of [Console API](https://developer.mozilla.org/en-US/docs/Web/API/Console) methods are available out of the box.

```typescript
import {Logger} from '@monolithed/logger';

const logger = new Logger({title: 'Hello'});

logger.error('World'); // Hello World
```

## Contributing
   
Feel free to submit a pull request if you find any bugs. 
Please make sure all commits are properly documented.

## Tests

```
npm test
```

## Publishing

```
npm publish --access public --verbose
```

## License

MIT
