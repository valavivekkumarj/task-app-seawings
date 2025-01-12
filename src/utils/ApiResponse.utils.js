export class ApiResponse {
    constructor(statusCode, message = "success", data = null) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = this.isSuccess(statusCode);
    }
    isSuccess(statusCode) {
        return statusCode >= 200 && statusCode < 300;
    }
}
