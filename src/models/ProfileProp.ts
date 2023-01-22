export interface ProfileProp {
    post_count: number;
    follower_count: number | null;
    followee_count: number | null;
    id: number;
    username: string;
    name: string;
    bio: string;
    profile_picture: string;
    current_user_follows: boolean;
}