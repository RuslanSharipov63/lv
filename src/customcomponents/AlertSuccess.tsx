"use client";
import { FC } from "react";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AlertSuccessType = {
  title: string;
  text: string;
};

const AlertSuccess: FC<AlertSuccessType> = ({ title, text }) => {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
       {text}
      </AlertDescription>
    </Alert>
  );
};

export default AlertSuccess;
