import { createContext } from "react";
import { profileStateInterface } from "../reducers/profileReducer";

export interface ProfileContextInterface {
    profileState: profileStateInterface;
    profileDispatch: React.Dispatch<any>;
  }
export const initialProfileState = {
    profile: {
        post_count: 0,
        follower_count: 0,
        followee_count: 0,
        id: 0,
        username: "-",
        name: "-",
        bio: "",
        profile_picture: process.env.REACT_APP_DEFAULT_PROFILE_PICTURE || "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/White_square_50%25_transparency.svg/2048px-White_square_50%25_transparency.svg.png",
        current_user_follows: false
    }
}
 const ProfileContext = createContext<ProfileContextInterface>({profileState: initialProfileState, profileDispatch: () => null})


export default ProfileContext