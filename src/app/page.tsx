import Image from "next/image";
import AllPhotoContainer from "@/customcomponents/AllPhotoContainer";
export default function Home() {
  return (
    <>
       <div className="bg-[url(/photograph.jpg)] bg-top  bg-no-repeat bg-cover h-[500px] w-[99%] ml-[0.5%] mr-[0.5%] rounded-md">
      </div> 
      <AllPhotoContainer />
    </>
  );
}
