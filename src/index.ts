type Options = {
    title?: string;
    debug?: boolean;
    format?: (...messages: unknown[]) => unknown[];
};

type Methods = 'debug' | 'error' | 'info' | 'log' | 'warn';

type Constructor = {
    new (options: Options): {
        [Method in keyof Pick<Console, Methods>]: Console[Method];
    };
};

const Logger = function({title, debug, format}: Options = {}) {
    return new Proxy({}, {
        get (target, name: Methods) {
            return (...message: unknown[]): void => {
                let data = [...message];
                const date = new Date();

                if (title) {
                    data.unshift(title);
                }

                if (debug) {
                    data.unshift(date.toLocaleString());
                }

                if (format) {
                    data = format(...data);
                }

                console[name](...data);
            }
        }
    });
} as unknown as Constructor;

export {Logger};
export type {Methods, Options};
