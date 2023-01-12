import getUserObject from "./getUserObject"
import { Navigate } from "react-router-dom"
interface Props{
  children: JSX.Element;
};

const RequireAuth = ({ children }: Props): JSX.Element => {
  const authed: any  = getUserObject();

  return authed ? children : <Navigate to="/login" replace={true} />;
  //return <Navigate to="/login" replace={true} />
}

export default RequireAuth