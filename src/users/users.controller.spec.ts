import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUserService = {
    createUser: jest.fn(dto => {
      return {
        id :  Date.now(),
        ...dto
      }
    }),

    updateInfoOfUser: jest.fn().mockImplementation((id,dto) => ({
      id,
      ...dto
    })),


    deleteOneUser : jest.fn(id => {
      return  'User deleted'
    }),

    getAll : jest.fn(()=>{
      return 'All user details';
    }),

    getOneById : jest.fn(id =>{
      return 'Single user details with respective id'
    })

    

  }
 
  


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers : [UsersService],
    }).overrideProvider(UsersService).useValue(mockUserService).compile();

 
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  })

  it('should create a new user', () =>{
    expect(controller.create({firstName : 'Sudarshan',
    lastName : 'Shukla',
    emailId : 'Shukla@gmail.com',
    phoneNumber : 9889057397,
    city : 'Pratapgarh',
    state : 'UP',
    country : 'India',
    password : 'shukla@123'})).toEqual({
          id : expect.any(Number),
          firstName : 'Sudarshan',
          lastName : 'Shukla',
          emailId : 'Shukla@gmail.com',
          phoneNumber : 9889057397,
          city : 'Pratapgarh',
          state : 'UP',
          country : 'India',
          password : 'shukla@123'

    });
    
  })
  

  it('should update user information', () =>{
    const dto = {firstName : 'Sudarshan',
    lastName : 'Shukla',
    emailId : 'Shukla@gmail.com',
    phoneNumber : 9889057397,
    city : 'Pratapgarh',
    state : 'UP',
    country : 'India',
    password : '#4321S'}


    expect(controller.update(1,dto)).toEqual({
      id:1,
      ...dto
    })

  });

  it('should delete a user', () => {
    expect(controller.delete(1)).toBe('User deleted')
  })

  it('should get all user information', () =>{
    expect(controller.getUsers()).toEqual('All user details')
  })

  it('should fetch one user respective to user id', () =>{
    expect(controller.getUserById(1)).toBe("Single user details with respective id")
  })
  

});


