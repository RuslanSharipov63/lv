import * as React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

type PreviewImageForInputProps = {
    fileImg: Blob;
   nameImg: string;
    sizeImg: number;
    typeImg: string; 
    title?: string
}

const PreviewImageForInput: React.FC<PreviewImageForInputProps> = ({
   nameImg,
    sizeImg,
    typeImg, 
    fileImg,
    title
}) => {

    return (
        <Card className="w-full mt-4">
            <CardHeader>
                <CardTitle>{title ? title : "Новый аватар"}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5 truncate">
                        <ul className="flex flex-col space-y-1.5">
                           <li> <Image
                                src={URL.createObjectURL(fileImg)}
                                alt="аватар"
                                width={200}
                                height={200}
                            />
                            </li>
                            <li>имя: {nameImg}</li>
                            <li>размер: {Number((sizeImg / 1024 / 1024).toFixed(1))} Mб</li>
                            <li>тип: {typeImg} </li>
                        </ul>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}

export default PreviewImageForInput;