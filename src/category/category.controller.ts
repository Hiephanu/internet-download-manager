import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Res } from "@nestjs/common";
import { CategorySaveReq } from "./dto/category-save-req";
import { CategoryUpdateReq } from "./dto/category-update-req";
import { CategoryService } from "./category.service";
import {Response} from 'express'

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService : CategoryService){}
    @Get(':id')
    async getCategoryById(@Param('id') id : number, @Res() res : Response){
        try {
            const category = await this.categoryService.getCategoryById(id)
            return res.status(200).json(category)
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException('Internal err!')
        }
    }
    @Get('user')
    async getCategoryByUserId(@Body() userId : number, @Res() res : Response) {
        try {
            const categories = await this.categoryService.getAllCategoryByUserId(userId)
            return res.status(200).json(categories)
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException('Internal err!')
        }

    }
    @Post('')
    async saveCategory(@Body() categorySaveReq : CategorySaveReq, @Res() res : Response) {
        try {
            console.log(categorySaveReq);
            
            const category = await this.categoryService.saveCategory(categorySaveReq)
            return res.status(201).json(category)
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException('Internal err!')
        }

    }
    @Put('')
    async updateCategory(@Body() categoryUpdateReq : CategoryUpdateReq, @Res() res : Response) {
        try {
            const category = await this.categoryService.updateCategory(categoryUpdateReq)
            return res.status(200).json(category)
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException('Internal err!')
        }

    }
    @Delete(':id')
    async deleteCategoryAndAllFile(@Param('id') id : number, @Res() res : Response) {
        try {
            await this.categoryService.deleteCategory(id)
            res.status(200).json({
                status: 200,
                message: "Success",
                data : null
            })
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException('Internal err!')
        }

    }
}