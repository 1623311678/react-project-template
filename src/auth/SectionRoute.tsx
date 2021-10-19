import React,{useState,useEffect} from "react";
import { Route, RouteProps } from "react-router-dom";
import NotFound from "../NotFound";
import NotPermissionPage from "@src/components/NotPermissionPage";
import { useAuth } from "@src/auth/AuthProviderFPP";

interface SectionRouteProps extends RouteProps {
  permissionKey?: any;
}

export const SectionRoute: React.FC<SectionRouteProps> = ({
  permissionKey,
  ...props
}) => {
    const {user} = useAuth()
  if (permissionKey === "acceptInvitation") {
    return <Route {...props} />;
  }
  if (
    permissionKey !== "acceptInvitation" &&
    user &&
    user.permissions.length === 0
  ) {
    return <NotPermissionPage />;
  }
  if(permissionKey==='PREFERENCES || PAYMENTS || CHECKOUTS || DOMAINS'){//这里将收款设置和结账设置特殊处理
      return (user && user.permissions.indexOf('PREFERENCES') > -1) || (user && user.permissions.indexOf('PAYMENTS') > -1) || (user && user.permissions.indexOf('CHECKOUTS') > -1) || (user && user.permissions.indexOf('DOMAINS') > -1) ? (
          <Route {...props} />
      ) : (
          <NotFound />
      );
  }else{
      return user && user.permissions.indexOf(permissionKey) > -1 ? (
          <Route {...props} />
      ) : (
          <NotFound />
      );
  }

};
SectionRoute.displayName = "Route";
export default SectionRoute;
