import { createContext } from "react";
import { usersInListStateInterface } from "../reducers/usersInListReducer";

export interface UsersInListContextInterface {
    usersInListState: usersInListStateInterface;
    usersInListDispatch: React.Dispatch<any>;
  }
export const initialUsersInListState = {
    users: []
}
 const UsersInListContext = createContext<UsersInListContextInterface>({usersInListState: initialUsersInListState, usersInListDispatch: () => null})


export default UsersInListContext