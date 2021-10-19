import { User } from "@src/fragments/types/User";
import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import { getUser } from "@src/api/home/queries";
import fppClient from "@src/api/base";
import { shopSettingGeneric } from "@src/api/generalSet";
import { Spin } from "antd";
import Loading from "@src/common/components/Loading";
import { UserContext } from "./";
import { getTokens, removeTokens } from "./utils";
import { getDomainList } from "@src/api/domainManage";
import { get, find } from "lodash";

interface AuthProviderFPPProps {
  children: React.ReactNode;
}

const AuthProviderFPP: React.FC<AuthProviderFPPProps> = ({ children }) => {
  const [userContext, setUserContext] = useState<undefined | User>(undefined);
  const [hasToken, setHasToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storeName, setStoreName] = useState("");

  const logout = () => {
    setUserContext(undefined);
    removeTokens();
  };
  const getUserData = () => {
    setLoading(true);
    fppClient
      .query({
        query: getUser,
        fetchPolicy: "network-only"
      })
      .then(({ data }) => {
        setUserContext(data.user);
        setLoading(false);
      });
  };
  const getUnit = () => {
    shopSettingGeneric().then(({ data }) => {
      const currency = data.shopSettingGeneric.currency;
      const weightUnit = data.shopSettingGeneric.weightUnit;
      const timeZone = data.shopSettingGeneric.timeZone;
      const timeZoneLabel = data.shopSettingGeneric.timeZoneLabel;
      localStorage.setItem("currency", currency);
      localStorage.setItem("weightUnit", weightUnit);
      localStorage.setItem("timeZone", timeZone);
      localStorage.setItem("timeZoneLabel", timeZoneLabel);
      moment.tz.setDefault(timeZone);
      setStoreName(data.shopSettingGeneric.name);
    });
  };

  const getDomain = () => {
    getDomainList().then(data => {
      const list = get(data, "data.domains.edges", []);
      const defaultDomain = find(list, item => item.node.isDefault === true);
      if (defaultDomain) {
        const domain = get(defaultDomain, "node.domain");
        localStorage.setItem("default_domain", `https://${domain}`);
      }
    });
  };

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      setHasToken(true);
      getUserData();
      getUnit();
      getDomain();
    }
  }, []);

  return (
    <Loading loading={loading}>
      <UserContext.Provider
        value={{
          user: userContext,
          storeName,
          hasToken,
          logout
        }}
      >
        {children}
      </UserContext.Provider>
    </Loading>
  );
};

export const useAuth = () => {
  const user = useContext(UserContext);
  return {
    hasToken: user.hasToken,
    user: user.user,
    storeName: user.storeName
  };
};

export default AuthProviderFPP;
