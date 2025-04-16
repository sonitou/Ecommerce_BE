import { AuthTypeType, ConditionGuardType } from '../constants/auth.constants';
export declare const AUTH_TYPE_KEY = "authType";
export type AuthTypeDecoratorPayload = {
    authTypes: AuthTypeType[];
    options: {
        condition: ConditionGuardType;
    };
};
export declare const Auth: (authTypes: AuthTypeType[], options?: {
    condition: ConditionGuardType;
}) => import("@nestjs/common").CustomDecorator<string>;
