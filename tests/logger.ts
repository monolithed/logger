import * as assert from 'assert';
import {SinonSpy, createSandbox} from 'sinon';
import {Logger} from '../';

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

    it('.title', async () => {
        const logger = new Logger({title: 'Hello'});

        logger.log('World');

        assert((<SinonConsole>console.log).calledWith(
            'Hello', 'World'
        ));
    });

    it('.debug', async () => {
        const logger = new Logger({debug: true});
        const date = new Date();

        logger.log('Hello', 'World');

        assert((<SinonConsole>console.log).calledWith(
            date.toLocaleString(), 'Hello', 'World'
        ));
    });

    it('.format', async () => {
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
});
