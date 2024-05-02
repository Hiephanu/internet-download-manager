import { User } from "../entity/user.entity";
import { RegisterRes } from "../res/register-res";

export class ConvertUser {
    convertFromUserToRegisterRes(user : User) {
        const registerRes = new RegisterRes()
        registerRes.id = user.id
        return registerRes
    }
}