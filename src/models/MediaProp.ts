export interface MediaProp {
    username: string;
    user_id: number;
    id: number;
    like_id: number;
    comment_id: number | null;
    post_id: number | null;
    profile_picture: string;
    picture_url: string | null;
    created_at: string;
    text: string | null;
    current_user_follows: boolean | null;
}