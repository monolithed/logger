import * as assert from 'assert';
import {SinonSpy, createSandbox} from 'sinon';
import {Logger,} from '..';

type SinonConsole = Console & SinonSpy;

describe('Logger', () => {
    const sandbox = createSandbox();

    beforeEach(() => {
        sandbox.spy(console, 'log');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Nested methods', async () => {
        const logger = new Logger({});

        logger.log('Hello', 'World');

        assert((<SinonConsole>console.log).calledWith(
            'Hello', 'World'
        ));
    });

    it('The title option', async () => {
        const logger = new Logger({title: 'Hello'});

        logger.log('World');

        assert((<SinonConsole>console.log).calledWith(
            'Hello', 'World'
        ));
    });

    it('The debug option', async () => {
        const logger = new Logger({debug: true});
        const date = new Date();

        logger.log('Hello', 'World');

        assert((<SinonConsole>console.log).calledWith(
            date.toLocaleString(), 'Hello', 'World'
        ));
    });

    it('The format option', async () => {
        const logger = new Logger({
            format(message) {
                return [message, 'World'];
            }
        });

        logger.log('Hello');

        assert((<SinonConsole>console.log).calledWith(
            'Hello', 'World'
        ));
    });

    it('Options together', async () => {
        const date = new Date();

        const logger = new Logger({
            title: 'Hello',
            debug: true,
            format(time, title, message) {
                return [time, title, message, '!'];
            }
        });

        logger.log('World');

        assert((<SinonConsole>console.log).calledWith(
            date.toLocaleString(), 'Hello', 'World', '!'
        ));
    });

    it('Event with silent mode', () => {
        const expected = {
            'detail': ['Hello World']
        };

        let actual;

        globalThis.addEventListener(Logger.EVENT_TYPE, ({detail}: CustomEvent<string[]>) => {
            actual = detail;
        });

        const logger = new Logger({silent: true});

        logger.log('Hello World');

        assert.deepStrictEqual(expected, actual);

        assert((<SinonConsole>console.log).notCalled);
    });
});
