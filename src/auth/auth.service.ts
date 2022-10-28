import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
    ){}

    public getTokenForUser(user: User){
        const details = { username: user.username, sub: user.id }
        return this.jwtService.sign( details);
    }

    public async hashPassword(password: string): Promise<string>{
        return await bcrypt.hash(password, 10);
    }
}