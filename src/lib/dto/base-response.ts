export interface BaseResponse<T> {
	data: T;
	success: boolean;
	error: string;
}

export class ServiceError implements BaseResponse<null> {
	data: null;
	success: boolean;
	error: string;

	constructor(message: string) {
		this.data = null;
		this.success = false;
		this.error = message;
	}
}

export class ServiceSuccess<T> implements BaseResponse<T> {
	data: T;
	success: boolean;
	error: string;

	constructor(data: T) {
		this.data = data;
		this.success = true;
		this.error = '';
	}
}