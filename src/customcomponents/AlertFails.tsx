"use client";
import { FC } from "react";
import { AlertCircle } from "lucide-react";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

type AlertFailsProps = {
    textError: string;
}


const AlertFails:FC<AlertFailsProps> = ({textError}) => {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>
                {textError}
            </AlertDescription>
        </Alert>
    );
}

export default AlertFails;