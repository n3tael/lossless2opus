import type { Tween } from 'svelte/motion';

export type QueueItem = {
	status: QueueItemStatus;
	input_file: File;
	output_file?: Blob;
	progress: Tween<number>;
};

export enum QueueItemStatus {
	DONE = 0,
	ERROR = 1,
	PROCESSING = 2,
	WAITING = 3
}

export enum WorkerDataType {
	DONE = 0,
	ERROR = 1,
	PROGRESS = 2
}

type WorkerDataDone = {
	type: WorkerDataType.DONE;
	data: Uint8Array<ArrayBuffer>;
};

type WorkerDataError = {
	type: WorkerDataType.ERROR;
	data: string;
};

type WorkerDataProgress = {
	type: WorkerDataType.PROGRESS;
	data: number;
};

export type WorkerData = WorkerDataDone | WorkerDataError | WorkerDataProgress;
