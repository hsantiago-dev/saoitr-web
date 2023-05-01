
export class UserLoggedDto {
    id: number;
    name: string;
    email: string;
    token: string;

    constructor(data: UserLoggedDto) {
        
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.token = data.token;
    }
}