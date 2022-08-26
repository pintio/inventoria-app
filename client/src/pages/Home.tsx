import React, { useEffect, useState } from "react";

import Layout from "../components/Layout";

import Greetings from "../components/homeComponents/Greetings";
import QuickLinks from "../components/homeComponents/QuickLinks";
import NavigationTileCoponents from "../components/homeComponents/NavigationTileComponent";
import QuickActions from "../components/homeComponents/QuickActions";
import axios from "axios";

interface UserData {
  fullname: string;
  position: string;
  joining_date: string;
  email_id: string;
}

const HomePage = function (): JSX.Element {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    axios.get("/api/currentuser").then((res) => {
      setUserData(res.data);
    });
  }, []);

  if (!userData) return <h1>Loading</h1>;

  return (
    <Layout>
      <Greetings name={userData.fullname} />
      <QuickActions />
      <QuickLinks />
      <NavigationTileCoponents />
    </Layout>
  );
};

export default HomePage;
