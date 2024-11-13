import Image from "next/image";
export default function Home() {
  return (
    <div>
     <Image
      alt="фотограф"
      src='/photograph.jpg'
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }}
    />
    </div>
  );
}
