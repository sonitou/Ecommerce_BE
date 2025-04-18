export declare const REQUEST_USER_KEY = "user";
export declare const AuthType: {
    readonly Bearer: "Bearer";
    readonly None: "None";
    readonly APIKey: "ApiKey";
};
export type AuthTypeType = (typeof AuthType)[keyof typeof AuthType];
export declare const ConditionGuard: {
    readonly And: "and";
    readonly Or: "or";
};
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly BLOCKED: "BLOCKED";
};
export type ConditionGuardType = (typeof ConditionGuard)[keyof typeof ConditionGuard];
