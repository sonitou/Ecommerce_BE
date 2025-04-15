export declare class UserModel {
    id: number;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<UserModel>);
}
