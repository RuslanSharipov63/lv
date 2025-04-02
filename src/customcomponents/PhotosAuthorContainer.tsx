"use client";
import { FC, useEffect } from "react";
import Photo from "./Photo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetAllPhotosByUserId } from "@/store/features/photo/photoSlice";
import { photoState } from "@/store/features/photo/photoSlice";

type PhotosContainerType = {
  user_id?: string | number;
  
};

const PhotosAuthorContainer: FC<PhotosContainerType> = ({ user_id }) => {
  const dispatch = useAppDispatch();
  const { photos, loading } = useAppSelector((state) => state.photo);

  useEffect(() => {
    let data = {
      user_id,
      action: "selectid",
    };
    dispatch(fetchGetAllPhotosByUserId(data));
  }, []);

  useEffect(() => {
    if (loading === "фото добавлено") {
      let data = {
        user_id,
        action: "selectid",
      };
      dispatch(fetchGetAllPhotosByUserId(data));
    }
  }, [loading]);


  return (
    <>
      <div
        style={{
          padding: "1%",
          columnCount: 3,
          columnWidth: "300px",
          columnGap: "10px",
        }}
      >
          {loading === "ничего не найдено" && (
          <p className="text-center">Ничего не найдено...</p>
        )}
        {loading === "фото загружаются" && 
          <p className="text-center">Загрузка...</p>
} 
{(loading === 'все фото загружены' && photos.length < 1 ) ?
 <p className="text-center">У пользователя нет фото</p>
        : photos.map((item: photoState) => {
            return (
              <Photo
                photoname={item.photoname}
                user_id={user_id}
                key={item.id}
                id={item.id}
              />
            );
          }) 
        }
      </div>
    </>
  );
};

export default PhotosAuthorContainer;
