"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetAllPhotos } from "@/store/features/photo/photoSlice";
import Photo from "./Photo";
import { photoState } from "@/store/features/photo/photoSlice";
const AllPhotoContainer = () => {
  const dispatch = useAppDispatch();
  const { photos, loading } = useAppSelector((state) => state.photo);

  useEffect(() => {
    dispatch(fetchGetAllPhotos({ action: "selectall" }));
  }, []);


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
        {loading === "pending" && <p className="text-center">Загрузка...</p>}
        {loading === "произошла ошибка" && (
          <p className="text-center">Сбой загрузки...</p>
        )}
        {loading === "rejected" && (
          <p className="text-center">Сбой загрузки...</p>
        )}
        {loading === "ничего не найдено" && (
          <p className="text-center">Ничего не найдено...</p>
        )}
        {(loading === "фото загружены" || loading === "поиск завершен") &&
          photos.map((item: photoState) => {
            return (
              <Photo
                photoname={item.photoname}
                user_id={item.user_id}
                key={item.id}
                id={item.id}
              />
            );
          })}
      </div>
    </>
  );
};

export default AllPhotoContainer;
