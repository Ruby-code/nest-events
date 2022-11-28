import { ExecutionContext, createParamDecorator, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";



export class AuthGuardLocal extends AuthGuard('local'){
    async canActivate(context: ExecutionContext){
        const result =(await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();

        await super.logIn(request);
        return result;
        
    }
}
 
