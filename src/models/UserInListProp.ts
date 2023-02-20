export interface UserInListProp {
    username: string;
    name: string;
    user_id: number;
    profile_picture: string;
    id: number | null;
    current_user_follows: boolean | null;
}