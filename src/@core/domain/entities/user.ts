import { Entity } from "../base/entity";


export class User extends Entity {
    public name: string;
    public password?: string;
    public email: string;

    public constructor(data: Partial<User>) {
        super();

        if (!data.name) {
            throw new Error("Name is required");
        } else if (!data.email) {
            throw new Error("Email is required");
        }

        this.id = data.id;
        this.name = data.name!;
        this.password = data.password;
        this.email = data.email!;
    }
}