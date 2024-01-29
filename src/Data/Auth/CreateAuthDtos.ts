export interface CreateAuthDbDto {
    auth_user_id: string;
    token: string;
    login_token: string;
    exp_time: Date;
    active: boolean;
}