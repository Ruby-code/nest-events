import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: process.env.AUTH_SECRET,
            secretOrKey: 'secret123'
        })
    } 

    async validate(payload:any){
    //    return {
    //     id: payload.sub,
    //     name: payload.name,
    // }
        return await this.userRepository.findBy({
            id: payload.sub,
             username: payload.name,
        });
    }

}