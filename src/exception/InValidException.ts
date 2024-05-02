import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidException extends HttpException {
    constructor(message : string){
        super(message , HttpStatus.BAD_REQUEST)
    }
}