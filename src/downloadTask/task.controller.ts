import { Body, Controller, Get, InternalServerErrorException, Param, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express'
import { DownloadTaskService } from "./task.service";
import { DownloadTaskReqDto } from "./dto/download-task-req-dto";
import { AuthGuard } from "src/auth/auth.guard";
@Controller('task')
export class DownloadTaskController {
    constructor(private readonly downloadTaskService: DownloadTaskService){}
    @UseGuards(AuthGuard)
    @Post('init-task')
    async initDownloadTask(@Body() downloadTaskReq : DownloadTaskReqDto,@Res() res : Response) {
        try {
            const task =await this.downloadTaskService.initDownloadTask(downloadTaskReq)
            return res.status(200).json({task : task})
        } catch (err){
            console.log(err);
            throw new InternalServerErrorException("Init task fail")
        }
    }
    @UseGuards(AuthGuard)
    @Get(':id')
    async downloadTask(@Param('id') taskId : number,@Res() res: Response) {
        try {
            await this.downloadTaskService.implementDownloadTask(taskId,res)
            
        } catch(err) {
            console.log(err);
            throw new InternalServerErrorException("File download fail")
        }
    }
    @UseGuards(AuthGuard)
    @Get('/history/:id')
    async getAllDownloadedTaskByUserId(@Param('id') userId : number, @Res() res : Response) {
        try {
            const downloadTasks = this.downloadTaskService.getAllDownloadTaskByUserId(userId)
        } catch(err) {
            console.log(err)
            throw new InternalServerErrorException("Error")
        }
    }
}