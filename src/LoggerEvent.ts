class LoggerEvent extends CustomEvent<any> {
    constructor(type: string, detail: {detail: any[]}) {
        super(LoggerEvent.EVENT_TYPE, {detail});
    }

    static readonly EVENT_TYPE = '@monolithed/logger';
}

declare global {
    interface WindowEventMap {
        [LoggerEvent.EVENT_TYPE]: LoggerEvent;
    }
}

export {
    LoggerEvent
};
