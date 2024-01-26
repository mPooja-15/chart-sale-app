import React, { useEffect, useState } from "react";
import UserBar from "../auth/UserBar";
import BoxCenter from "../auth/UI/box/Center";
import { getProfileAPI } from "../auth/core/api";
import Dashboard from "./Dashboard";

const Home = () => {
  const [authData, setAuthData] = useState();
  const localId = localStorage.getItem("token");
  const _id = JSON.parse(localId);
  useEffect(
    () => {
      if (_id?.userId) {
        getProfileAPI(_id).then((data) => {
          setAuthData(data.user);
        });
      }
    },
    [_id?.userId]
  );

  return (
    <div>
      {authData && (
        <>
          <UserBar auth={authData} />
          <BoxCenter>
            {authData?._id && (
              <>
                <p>
                  Hello <strong>{authData.name}</strong>.
                </p>
                <Dashboard />
              </>

            )}
          </BoxCenter>
        </>
      )}
    </div>
  );
};

export default Home;
