import { ClassSerializerInterceptor, Controller, Get, Post, Request, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuardJwt } from "./auth-guard.jwt";
import { AuthGuardLocal } from "./auth-guard.local";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { User } from "./user.entity";

@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll'})
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('login')
    // @UseGuards(AuthGuardJwt)
    @UseGuards(AuthGuardLocal)
    async login(@CurrentUser() user: User){
        return {
            userId: user.id,
            token: this.authService.getTokenForUser(user)
        }
    } 

    @UseGuards(AuthGuardJwt)
    @Get('profile')
    @UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(AuthGuardLocal)
    async getProfile(@CurrentUser() user: User){
    console.log(user)
    return  user;
    
    }
}