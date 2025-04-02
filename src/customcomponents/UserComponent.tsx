"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { checkCookie, getCookiesName } from "@/app/cookies/actions";
import { fetchSessionid } from "@/store/features/login/loginSlice";
import { useRouter } from "next/navigation";
import UpdateUserComponent from "./UpdateUserComponent";
import DeleteAlertDilaog from "./DeleteAlertDialog";
import UploadImage from "./UploadImage";
import TitleComponent from "./TitleComponent";
import PhotosAuthorContainer from "./PhotosAuthorContainer";


const UserComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userData, loading } = useAppSelector((state) => state.datalogin);
  const [checkUpdate, setCheckUpdate] = useState(false);

  const getCookies = async () => {
    setCheckUpdate(false);
    let cookiesId = await checkCookie("sessionid");
    if (cookiesId) {
      let sessionid = await getCookiesName("sessionid");
      dispatch(fetchSessionid(String(sessionid)));
      if (userData.message === "неверный email или пароль")
         router.push("/login");
      return;
    } else {
      router.push("/login");
      return;
    }
  };

  useEffect(() => {
    getCookies();  
  }, [userData.message]);


  const toggleUpdate = () => {
    setCheckUpdate(true);
  };

  useEffect(() => {
    if (checkUpdate === true) {
      getCookies();
    }
  }, [checkUpdate]);

  return (
    <>
      <div className="">
        <Card className="w-[100%] m-auto flex flex-col justify-around items-center bg-[url('./../../img/bgphoto.jpg')] bg-cover">
          <CardHeader>
            {/*  <CardTitle>профиль</CardTitle> */}
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage
                src={`https://ruslansharipov.site/lv/awatars/${userData.id}/${userData.awatar}`}
                alt="фото пользователя"
                className="object-cover"
              />
              <AvatarFallback>ФП</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <p>{userData.username}</p>
            <p>{userData.email}</p>
          </CardContent>
          <CardFooter className="flex flex-col justify-start items-center w-[100%]">
            <DeleteAlertDilaog
              id={userData.id}
              title={"удалить"}
              text={"удалив, аккаунт вы не сможете его восстановить"}
              action={"deleteuser"}
            />
            <UpdateUserComponent
              id={userData.id}
              email={userData.email}
              username={userData.username}
              awatar={userData.awatar}
              toggleUpdate={toggleUpdate}
            />
            <UploadImage id={userData.id} />
          </CardFooter>
        </Card>
      </div>
      <TitleComponent text={"Мои фото"} />
      {userData.id != "" ? <PhotosAuthorContainer user_id={userData.id} /> : 'Загрузка...'}
    </>
  );
};

export default UserComponent;
