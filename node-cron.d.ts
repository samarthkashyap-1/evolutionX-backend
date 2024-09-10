declare module 'node-cron' {
    interface ScheduleOptions {
        scheduled?: boolean;
        timezone?: string;
    }

    interface ScheduledTask {
        start: () => void;
        stop: () => void;
        destroy: () => void;
        getStatus: () => string;
    }

    function schedule(cronExpression: string, func: () => void, options?: ScheduleOptions): ScheduledTask;

    export { schedule };
}
