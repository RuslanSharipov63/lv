"use client";
import { FC, useEffect } from "react";
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
import AlertFails from "./AlertFails";
import AlertSuccess from "./AlertSuccess";
import { fetchDeleteUser } from "@/store/features/login/loginSlice";
import { fetchDeletePhotoByPhotoId } from "@/store/features/photo/photoSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { deleteCookie } from "@/app/cookies/actions";
import { useRouter } from "next/navigation";

type alertDialogType = {
  id?: number | string;
  title?: string;
  text?: string;
  action?: string;
  photoname?: string;
};

const DeleteAlertDilaog: FC<alertDialogType> = ({
  id,
  title,
  text,
  action,
  photoname,
}) => {
  const { userData } = useAppSelector((state) => state.datalogin);
  const { loading } = useAppSelector((state) => state.photo);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const deleteEntity = () => {
    let data: { id?: number | string; action?: string; photoname?: string } = {
      id,
      action,
    };

    if (action === "deleteuser") {
      dispatch(fetchDeleteUser(data));
      return;
    }

    if (action === "deletephoto") {
      data.photoname = photoname;
      dispatch(fetchDeletePhotoByPhotoId(data));
      return;
    }
  };

  const actionAfterDelete = async () => {
    await deleteCookie("sessionid");
    router.push("/login");
  };

  useEffect(() => {
    if (userData.message === "удаление прошло успешно") {
      actionAfterDelete();
    }
  }, [userData.message]);

  useEffect(() => {
    if (loading === "удаление прошло успешно") {
      setTimeout(() => {
        router.push("/user");
      }, 2000);
    }
  }, [loading]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="mb-2 w-[130px]">
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {title}
          
            {userData.message === "error" && (
              <AlertFails textError={"ошибка, попробуйте еще раз"} />
            )}
            {userData.message === "удаление прошло успешно" && (
              <AlertSuccess title={"успешно"} text={"аккаунт удален"} />
            )}

            {loading === "удаление прошло успешно" && (
              <AlertSuccess title={"успешно"} text={"фото удалено"} />
            )}

            {loading === "error" && (
              <AlertFails textError={"ошибка, попробуйте еще раз"} />
            )}
          </DialogTitle>
          <DialogDescription>
          {text}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={deleteEntity}>Продолжить?</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAlertDilaog;
