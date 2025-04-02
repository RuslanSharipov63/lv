"use client";
import { useState, FC, useEffect } from "react";
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
import { FileStatetype } from "@/types";
import PreviewImageForInput from "./PreviewImageForInput";
import AlertFails from "./AlertFails";
import { fetchUploadPhoto } from "@/store/features/photo/photoSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AlertSuccess from "./AlertSuccess";

type UploadImageType = {
  id?: string | number;
};

const UploadImage: FC<UploadImageType> = ({ id }) => {
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector((state) => state.photo)
  const [selectedFile, setSelectedFile] = useState<null | FileStatetype>(null);
  const [alertMessage, setAlertMessage] = useState({
    photoSize: { status: false, message: "" },
  });
  const [tags, setTags] = useState("");

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

  const uploadPhoto = () => {
    setAlertMessage({
      ...alertMessage,
      photoSize: { status: false, message: "Загрузка..." },
    });
    if (selectedFile === null || tags === "") {
      setAlertMessage({
        ...alertMessage,
        photoSize: { status: true, message: "заполните все поля" },
      });
      return;
    }
if(id) {
let dataNewPhoto: {user_id: string | number | undefined, tags: string, image?: Blob, action: 'upload'} = {
      user_id: id,
      tags,
      image: selectedFile?.fileImg,
      action: 'upload',
    }
 dispatch(fetchUploadPhoto(dataNewPhoto));
}
  };

useEffect(() => {
  if(loading === 'фото добавлено') {
    setAlertMessage({
      ...alertMessage,
      photoSize: { status: false, message: loading },
    });
  }

}, [loading])

useEffect(() => {
  setTags("");
  setSelectedFile(null);  
}, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="min-w-[130px]">
          добвить фото
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-visible overflow-y-auto h-96">
        <DialogHeader>
          <DialogTitle>Загрузка</DialogTitle>
          {alertMessage.photoSize.status && (
              <AlertFails textError={alertMessage.photoSize.message} />
            )}
            {alertMessage.photoSize.message === "фото добавлено" ? <AlertSuccess title={"Статус загрузки"} text={alertMessage.photoSize.message} /> : null }
            {alertMessage.photoSize.message === "Загрузка..." ? <AlertSuccess title={"Статус загрузки"} text={alertMessage.photoSize.message} /> : null }
            {alertMessage.photoSize.message === "фото не загружено" ? <AlertFails textError={alertMessage.photoSize.message} /> : null }
          <DialogDescription>
            Загрузите фото и введите теги
           
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">
              Фото
            </Label>
            <Input
              id="picture"
              type="file"
              className="col-span-3"
              onChange={handleChange}
              accept="image/*, .png, .jpg, .gif, .webp, .web"
              onClick={() => setSelectedFile(null)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              теги
            </Label>
            <Input
              id="username"
              value={tags}
              className="col-span-3"
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter></DialogFooter>
        <Button type="submit" onClick={uploadPhoto}>
          Загрузить
        </Button>
        {selectedFile && (
          <div className="mt-12 flex justify-start w-[100%]">
            <PreviewImageForInput
              nameImg={selectedFile.nameImg}
              sizeImg={selectedFile.sizeImg}
              typeImg={selectedFile.typeImg}
              fileImg={selectedFile.fileImg}
              title={"Новое фото"}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadImage;
