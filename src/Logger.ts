import {dispatchLoggerEvent} from './LoggerEvent';

type LoggerOptions = {
    title?: string;
    debug?: boolean;
    silent?: boolean;
    format?: (...messages: unknown[]) => unknown[];
};

type LoggerMethods = 'debug' | 'error' | 'info' | 'log' | 'warn';

type Constructor = {
    new(options: LoggerOptions): {
        [Method in keyof Pick<Console, LoggerMethods>]: Console[Method];
    };
};

const Logger = function ({title, debug, silent, format}: LoggerOptions = {}) {
    return new Proxy({}, {
        get(target, name: LoggerMethods) {
            return (...message: unknown[]): void => {
                let data = [...message];

                if (title) {
                    data.unshift(title);
                }

                if (debug) {
                    const date = new Date();

                    data.unshift(date.toLocaleString());
                }

                if (format) {
                    data = format(...data);
                }

                if (!silent) {
                    console[name](...data);
                }

                dispatchLoggerEvent(data);
            };
        }
    });
} as unknown as Constructor;

export {Logger};

export type {
    LoggerMethods,
    LoggerOptions,
};
