import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';

export type user = User;

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

 // Authenticastion Logic : Start   

   

    async findOne(username: string): Promise<User | undefined> {
       // return this.usersRepository.findOneOrFail(username);
       return this.usersRepository.findOne({firstName:username});
    }

//   Authentication logic : End

    getAll():Promise<User[]> {
        return this.usersRepository.find(); // SELECT * FROM user
    }

    async getOneById(id: number) : Promise<User> {
        try{
            const user = await this.usersRepository.findOneOrFail(id);
            return user;
        }catch(err){
            throw err;
        };
    }

    
    createUser(user:UserDto): Promise<User>{
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    async updateInfoOfUser(id:number, user:UserDto) : Promise<User> {
        const updateUser = await this.getOneById(id);

        updateUser.city = user.city;
        updateUser.state = user.state;
        updateUser.country = user.country;
        updateUser.emailId = user.emailId;
        updateUser.firstName = user.firstName;
        updateUser.lastName = user.lastName;
        updateUser.password = user.password;
        updateUser.phoneNumber = user.phoneNumber;
        

        return this.usersRepository.save(updateUser);
    }

    async deleteOneUser(id:number) : Promise<User>{

        const deleteUser = await this.getOneById(id);
        return this.usersRepository.remove(deleteUser);

    }

}
