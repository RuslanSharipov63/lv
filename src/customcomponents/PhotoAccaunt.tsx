"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchGetPhotoByPhotoId } from "@/api/fetchGetPhotoByPhotoId";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { checkCookie } from "@/app/cookies/actions";
import { downloadImg } from "@/api/downloadImg";
import AlertFails from "./AlertFails";
import { Loader2 } from "lucide-react";
import PhotosAuthorContainer from "./PhotosAuthorContainer";
import { photoState } from "@/store/features/photo/photoSlice";
import DeleteAlertDilaog from "./DeleteAlertDialog";

const PhotoAccaunt = () => {
  const [deletePhoto, setDeletePhoto] = useState<boolean>(false);
  const pathname = usePathname();
  let pathnameArr = pathname.split("/");
  let id = pathnameArr[pathnameArr.length - 1];

  const dispatch = useAppDispatch();
  const { photos, loading } = useAppSelector((state) => state.photo);
  const [onePhoto, setOnePhoto] = useState<photoState[]>([]);
  const [alertMessage, setAlertMessage] = useState(false);
  const [btnDis, setBtnDis] = useState(false);

  const checkCookiesHeader = async () => {
    if (await checkCookie("sessionid")) {
      setDeletePhoto(true);
      return;
    } else {
      setDeletePhoto(false);
      return;
    }
  };

  const getPhoto = async (data: { id: string; action: string }) => {
    const photoId = await fetchGetPhotoByPhotoId(data);
    setOnePhoto(photoId);
  };

  useEffect(() => {
    checkCookiesHeader();
    let data = {
      id: id,
      action: "selectphotobyid",
    };
    getPhoto(data);
  }, []);

  const handleClick = async () => {
    setBtnDis(true);
    setAlertMessage(false);
    const blob: any = await downloadImg(onePhoto[0].photoname);

    if (!blob.message) {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = photos[0].photoname;
      link.click();
      setBtnDis(false);
      return;
    } else {
      setAlertMessage(true);
      setBtnDis(true);
    }
  };

  return (
    <>
      <div
        className="flex justify-around h-auto"
        style={{
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          background:
            "radial-gradient(circle at center,rgb(22, 125, 228), #e1e5e9)",
        }}
      >
        {onePhoto.length != 0 ? (
          <div className="w-[100%] h-auto p-2 flex flex-col justify-between items-center">
            {alertMessage && (
              <AlertFails textError="не удалось загрузить фото" />
            )}
            <div className="w-[70%] flex items-center justify-around flex-wrap min-h-[400px]">
              <div
                style={{
                  width: "500px",
                  height: "400px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={`https://ruslansharipov.site/lv${onePhoto[0].photoname}`}
                  alt="photo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="flex flex-col gap-2 text-orange-800 font-bold">
                <p>
                  размер: {(Number(onePhoto[0].size) / 1024 / 1024).toFixed(2)}{" "}
                  Мб
                </p>
                <p>тип: {onePhoto[0].type}</p>
                <p>тэги: {onePhoto[0].tags}</p>
                <p>автор: {onePhoto[0].username}</p>
                {deletePhoto && (
                  <DeleteAlertDilaog
                    id={id}
                    title={"Удалить"}
                    text={"Удалив фото, вы не сможете его восстановить"}
                    action={"deletephoto"}
                    photoname={onePhoto[0].photoname}
                  />
                )}
                {btnDis ? (
                  <Button disabled className="w-[130px]">
                    <Loader2 className="animate-spin" />
                    ждем
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-[130px]"
                    onClick={handleClick}
                  >
                    скачать
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          "Загрузка"
        )}
      </div>
      <h2 className="text-center mt-4 mb-4 text-3xl font-semibold">
        Фотографии автора
      </h2>
      {onePhoto.length > 0 ? (
        <PhotosAuthorContainer user_id={onePhoto[0].user_id} />
      ) : (
        "Загрузка..."
      )}
    </>
  );
};

export default PhotoAccaunt;
