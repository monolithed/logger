const LoggerEventType  = '@monolithed/logger';

type LoggerEventDetail = any;

class LoggerEvent extends CustomEvent<LoggerEventDetail> {
    constructor(type: string, detail: {detail: LoggerEventDetail[]}) {
        super(LoggerEventType, {detail});
    }
}

const dispatchLoggerEvent = (detail: LoggerEventDetail[]): void => {
    const event = new LoggerEvent(LoggerEventType, {detail});

    globalThis.dispatchEvent(event);
};

declare global {
    interface WindowEventMap {
        [LoggerEventType]: LoggerEvent;
    }
}

export {
    LoggerEvent,
    LoggerEventType,
    dispatchLoggerEvent
};

export type {
    LoggerEventDetail
};
