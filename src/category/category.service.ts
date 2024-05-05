import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Category } from "./entity/category.entity";
import { CategorySaveReq } from "./dto/category-save-req";
import { CategoryUpdateReq } from "./dto/category-update-req";
import { FileService } from "src/file/file.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/entity/user.entity";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private readonly categoryRepository : Repository<Category>,
                private readonly fileService : FileService
    ) {}
    
    async getCategoryById (id : number) {
        const category = await this.categoryRepository.findOneBy({id})
        if(category) {
            return category
        } else {
            throw new NotFoundException('Category not found')
        }
    }

    async getAllCategoryByUserId(userId : number) {
        const categories = await this.categoryRepository.find({where : {user : {id : userId}}})
        return categories
    }

    async saveCategory(categorySaveReq : CategorySaveReq) {
        const category = new Category()
        const user = new User()
        user.id = categorySaveReq.userId
        category.title = categorySaveReq.title
        category.user = user
        

        return await this.categoryRepository.save(category)
    }

    async updateCategory(categoryUpdateReq : CategoryUpdateReq) {
        const category =await this.categoryRepository.findOne({where : {id : categoryUpdateReq.id}})
        if(category){
            category.title = categoryUpdateReq.title

            return await this.categoryRepository.save(category)
        }
        else {
            throw new NotFoundException('Category not found')
        }
    }
    
    async deleteCategory(id : number) {
        const files =await this.fileService.getAllFileByCategory(id)
        await this.categoryRepository.delete({id : id})

        files.forEach(async (file) => {
            await this.fileService.deleteFileById(file.id)
        })
    }
}