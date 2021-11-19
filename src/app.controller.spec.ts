import { Test } from "@nestjs/testing";
import { AppController } from "./app.controller"
import { AppService } from "./app.service";

describe('AppController',()=>{

  let controller = AppController;
  let service = AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile()

    
  })





})