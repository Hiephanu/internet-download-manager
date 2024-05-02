import { HttpCode, HttpException, HttpStatus } from "@nestjs/common";

export class InternalServerErrorException extends HttpException {
    constructor() {
        super("InternalServerError", HttpStatus.INTERNAL_SERVER_ERROR)
    }
}