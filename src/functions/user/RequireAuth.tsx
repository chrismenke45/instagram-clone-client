import getUserObject from "./getUserObject"
import { Navigate } from "react-router-dom"
import { UserObjectProp } from "./getUserObject";
interface Props{
  children: JSX.Element;
};
interface Authed extends UserObjectProp {
  jwt: string
}

const RequireAuth = ({ children }: Props): JSX.Element => {
  const authed: Authed  = getUserObject();

  
  return authed.user_id ? children : <Navigate to="/login" replace={true} />;
  // below is to test with no auth
  //return true ? children : <Navigate to="/login" replace={true} />;
}

export default RequireAuth