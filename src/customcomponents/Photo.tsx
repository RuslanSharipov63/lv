import Image from "next/image";
import { FC } from "react";
import Link from "next/link";

type PhotoType = {
  photoname: string;
  user_id?: string | number;
  id?: string | number;
};

const Photo: FC<PhotoType> = ({ photoname, user_id, id }) => {

  return (
    <Link href={`/photo/${id}`}>
      <div className="p-2">
        <Image
          src={`https://ruslansharipov.site/lv${photoname}`}
          alt="photo"
          className="rounded-md"
          width={300}
          height={200}
          layout="responsive"
          objectFit="cover"
          loading="lazy"
        />
      </div>
    </Link>
  );
};

export default Photo;
