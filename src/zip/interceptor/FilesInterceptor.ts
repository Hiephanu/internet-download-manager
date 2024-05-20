// import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
// import { Observable, catchError } from "rxjs";

// @Injectable()
// export class FilesInterceptor implements NestInterceptor {
//     intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
//         const request = context.switchToHttp().getRequest()
//         const files = request.files
//         console.log(request.body);
        
//         console.log(files);
        
//         if(!files || Object.keys(files).length === 0) {
//             throw new HttpException("No file upload", HttpStatus.BAD_REQUEST)
//         } 

//         return next.handle().pipe(
//             catchError((err)=> {
//                 throw err
//             })
//         )
//     }
// }