export interface ProfileProp {
    post_count: number;
    follower_count: number | null;
    following_count: number | null;
    id: number;
    username: string;
    name: string;
    bio: string;
    profile_picture: string;
}