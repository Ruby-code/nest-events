import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './userentity';

@Injectable()
export class AppService {
  // constructor(@InjectRepository(UserEntity)
  //   private readonly userRepository: Repository<UserEntity>){}
  constructor(@Inject('APP_NAME')
  private readonly name: string,
 // @Inject ('MESSAGE') private readonly message: string
  ) { }
  getHello(): string {
    return `Hello World! from ${this.name},`;
  }

// async create(data: any): Promise<UserEntity>{
//   return this.userRepository.save(data);
// }
}  
