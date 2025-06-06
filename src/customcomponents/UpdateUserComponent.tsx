"use client";
import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterUpdateUserType, UserType } from "@/types";
import Image from "next/image";
import { FileStatetype, alertMessageType } from "@/types";
import PreviewImageForInput from "./PreviewImageForInput";
import { fetchUpdateUser } from "@/store/features/login/loginSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

const UpdateUserComponent: FC<RegisterUpdateUserType> = ({
  id,
  email,
  username,
  awatar,
  toggleUpdate,
}) => {
  const { userData, loading } = useAppSelector((state) => state.datalogin);
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<null | FileStatetype>(null);
  const [stateForm, setStateForm] = useState({
    email: email,
    username: username,
  });

  const [alertMessage, setAlertMessage] = useState<alertMessageType>({
    photoSize: { status: false, message: "" },
    registrationStatus: { status: false, message: "" },
    checkEmail: { status: false, message: "" },
  });
  useEffect(() => {
    setStateForm({ email: email, username: username });
  }, [email, username]);

  useEffect(() => {
    setAlertMessage({
      ...alertMessage,
      registrationStatus: { status: false, message: "" },
      photoSize: { status: false, message: "" },
      checkEmail: { status: false, message: "" },
    });
  }, []);

  const clearAlertState = () => {
    setAlertMessage({
      ...alertMessage,
      registrationStatus: { status: false, message: "" },
      photoSize: { status: false, message: "" },
      checkEmail: { status: false, message: "" },
    });
  };

  useEffect(() => {
    if (userData.message === "succeeded") {
      setAlertMessage({
        ...alertMessage,
        registrationStatus: { status: true, message: "данные обновлены" },
      });
      if (toggleUpdate) {
        toggleUpdate();
      }
      return;
    }
    if (userData.message === "failed") {
      setAlertMessage({
        ...alertMessage,
        registrationStatus: {
          status: true,
          message: "ошибка. данные не обновились",
        },
      });
      return;
    }
    if (userData.message === "error") {
      setAlertMessage({
        ...alertMessage,
        registrationStatus: {
          status: true,
          message: "ошибка. поля не заполнены",
        },
      });
      return;
    }
  }, [userData.message]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlertMessage({
      ...alertMessage,
      photoSize: { status: false, message: "" },
    });
    if (!event.target.files) return;
    if (event.target.files[0].size > 47185920) {
      setAlertMessage({
        ...alertMessage,
        photoSize: { status: true, message: "фото не больше 45 Мб" },
      });
      return;
    }
    if (!event.target.files) return;
    if (event.target.files) {
      let timeArr = {
        nameImg: event.target.files[0].name,
        sizeImg: event.target.files[0].size,
        typeImg: event.target.files[0].type,
        fileImg: event.target.files[0],
      };

      setSelectedFile(timeArr);
    }
  };

  const checkRegEmail = (email: string | undefined) => {
    if (email) {
      let regEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      return regEmail.test(email);
    } else {
      return false;
    }
  };

  const checkLengthUsername = (userName: string | undefined) => {
    if (userName) {
      if (userName.length < 2 || userName.length > 20) {
        return false;
      } else {
        return true;
      }
    }
  };

  const sendForm = () => {
    setAlertMessage({
      ...alertMessage,
      checkEmail: { status: false, message: "" },
    });

    if (checkLengthUsername(stateForm.username) != true) {
      setAlertMessage({
        ...alertMessage,
        checkEmail: { status: true, message: "имя от 2 до 20 символов" },
      });
      return;
    }

    if (checkRegEmail(stateForm.email) != true) {
      setAlertMessage({
        ...alertMessage,
        checkEmail: { status: true, message: "не валидный email" },
      });
      return;
    }
    if (stateForm.username && stateForm.email && id) {
      let dataUpdate: UserType = {
        id: id,
        username: stateForm.username,
        email: stateForm.email,
        awatar: selectedFile?.fileImg,
      };
      dispatch(fetchUpdateUser(dataUpdate));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-2" onClick={clearAlertState}>
          редактировать
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col overflow-visible overflow-y-auto h-full">
        <DialogHeader>
          {alertMessage.registrationStatus.status === true
            ? alertMessage.registrationStatus.message
            : null}

          <DialogTitle>обновить профиль</DialogTitle>
          <DialogDescription>введите новые данные</DialogDescription>
          <DialogDescription>
            {alertMessage.checkEmail.status === true
              ? alertMessage.checkEmail.message
              : null}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col py-4">
          <div className="flex flex-col">
            <Label htmlFor="name" className="text-left">
              имя
            </Label>
            <Input
              id="name"
              value={stateForm.username}
              className="mt-2"
              onChange={(e) =>
                setStateForm({ ...stateForm, username: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="email" className="text-left mt-2">
              email
            </Label>
            <Input
              id="email"
              value={stateForm.email}
              className="mt-2"
              onChange={(e) =>
                setStateForm({ ...stateForm, email: e.target.value })
              }
            />
            <Label htmlFor="picture" className="m-2">
              аватар
            </Label>
            <Input
              id="picture"
              type="file"
              onChange={handleChange}
              accept="image/*, .png, .jpg, .gif, .webp, .web"
              onClick={() => setSelectedFile(null)}
              className="mt-2"
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-col items-start w-[99%]">
            <p className="mb-2">текущий аватар</p>
            <Image
              className="w-[100px] h-[100px]"
              src={`https://tehnogaz63.ru/lv/awatars/${id}/${awatar}`}
              alt="фото пользователя"
              width="100"
              height="100"
              style={{ objectFit: "cover", display: "flex" }}
            />

            {selectedFile && (
              <PreviewImageForInput
                nameImg={selectedFile.nameImg}
                sizeImg={selectedFile.sizeImg}
                typeImg={selectedFile.typeImg}
                fileImg={selectedFile.fileImg}
              />
            )}
            <Button className="mt-4" onClick={sendForm}>
              сохранить изменения
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserComponent;
