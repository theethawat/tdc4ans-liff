import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";
import liff from "@line/liff";

export default function Home({ props }) {
  const location = useLocation();
  const useQuery = () => new URLSearchParams(location?.search);
  const query = useQuery();

  useEffect(() => {
    if (query) {
      const loginInformation = {
        liffState: query.get("liff.state"),
        code: query.get("code"),
        liffClientId: query.get("liffClientId"),
        state: query.get("state"),
      };

      console.log("Login Information", loginInformation);
    }
    return () => {};
  }, [query]);

  useEffect(() => {
    if (liff.isLoggedIn()) {
      getProfile();
    }
    return () => {};
  }, []);

  const [profile, setProfile] = useState({
    name: "",
    profileImage: "",
    userId: "",
  });

  const getProfile = async () => {
    const liffProfile = await liff.getProfile();
    setProfile({
      name: liffProfile?.displayName,
      profileImage: liffProfile?.pictureUrl,
      userId: liffProfile?.userId,
    });
  };

  return (
    <div className='container mx-auto'>
      <div className='flex justify-center'>
        <div className='w-1/3'>
          <div className='text-center text-xl font-semibold'>User Profile</div>
          <div className='flex justify-center mt-4'>
            <Avatar
              name={profile?.name}
              src={profile?.profileImage}
              size='2xl'
            />
          </div>
          <div>
            <h3 className='text-lg text-center'>{profile?.name} </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
