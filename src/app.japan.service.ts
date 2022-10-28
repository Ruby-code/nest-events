import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AppJapanService {
    constructor(
    @Inject('APP_NAME')
    private readonly name: string,
    @Inject ('MESSAGE')
    private readonly message: string
    ) { }

    getHello(): string{
        console.log(process.env.DB_HOST); 
        return `言語を希望の順序に並べ替えます! from ${this.name}, ${this.message}`
    }
}
