import type { Tween } from "svelte/motion";

export type QueueItem = {
    uuid: string;
    status: QueueItemStatus;
    input_file: File;
    output_file: {
        name: string;
        url: string;
    } | null;
    progress: Tween<number>;
};

export enum QueueItemStatus {
    DONE = 0,
    ERROR = 1,
    PROCESSING = 2,
    WAITING = 3
}