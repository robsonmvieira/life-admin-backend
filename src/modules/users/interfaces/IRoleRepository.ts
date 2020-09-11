import CreateUserInput from "../dtos/create-user-input";
import User from "../models/user";
import UpdateUserInput from "../dtos/update-user-input";

export default interface IUserRepository{
  create(data: CreateUserInput):Promise<User>
  index():Promise<User[]>
  one(id: string):Promise<User| undefined>
  update(id: string, data: UpdateUserInput):Promise<User | undefined>
  remove(id: string): Promise<boolean>
  save(data: User):Promise<User>
}