export declare class HashingService {
    hash(value: string): Promise<string>;
    comparePassword(value: string, hash: string): Promise<boolean>;
}
