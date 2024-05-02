import { HttpException, HttpStatus } from "@nestjs/common";

export class BadRequestException extends HttpException {
    constructor(){
        super('BadRequest', HttpStatus.BAD_REQUEST)
    }
}