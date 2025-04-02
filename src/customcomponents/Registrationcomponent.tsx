"use client";
import React, { useState, FC } from "react";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PreviewImageForInput from "./PreviewImageForInput";
import AlertFails from "./AlertFails";
import { fetchRegistration } from "@/api/fetchRegistraion";
import { useRouter } from 'next/navigation'
import { FileStatetype, alertMessageType } from "@/types";
import { pushRegister } from "@/store/features/login/loginSlice";
import { useAppDispatch } from "@/store/hooks";
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "имя - минимум 2 символов" })
    .max(20, { message: "имя - максимум 20 символов" }),
  email: z.string().email({ message: "Введите email" }),
  password: z
    .string()
    .min(8, { message: "пароль - минимум 8 символов" })
    .max(10, { message: "пароль - максимум 10 символов" })
    
});

const RegistrationComponent = () => {
const dispatch =  useAppDispatch();
  const router = useRouter(); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const [selectedFile, setSelectedFile] = useState<null | FileStatetype>(null);
  const [alertMessage, setAlertMessage] = useState<alertMessageType >({
    photoSize: {status: false, message: ''},
    registrationStatus: {status: false, message: ''},
    checkEmail: {status: false, message: ''},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    let dataRegistration = {
      username: values.username,
      email: values.email,
      password: values.password,
      awatar: selectedFile?.fileImg,
    };
    setAlertMessage({...alertMessage, registrationStatus: {status: false, message: ''}});
 

    fetchRegistration(dataRegistration)
    .then((text)=>{
      if(text === 'success') {
         dispatch(pushRegister());
         router.push('/login');
        return;
      } 
      if(text === 'email fails') {
        setAlertMessage({...alertMessage, checkEmail: {status: true, message: 'email уже существует'}});
      }
      else {
        setAlertMessage({...alertMessage, registrationStatus: {status: false, message: 'неизвестная ошибка'}});
      }
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlertMessage({...alertMessage, photoSize: {status: false, message: ''}});
    if (!event.target.files) return;
    if (event.target.files[0].size > 47185920) {
      setAlertMessage({...alertMessage,  photoSize: {status: true, message: 'фото не больше 45 Мб'}});
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

  return (
    <div
      className="
        flex flex-col p-2 
        w-[100%] 
        sm:w-[400px] sm:m-auto sm:items-center
        md:w-[400px] md:m-auto 
        lg:w-[500px] lg:m-auto 
        xl:w-[450px] xl:m-auto
        "
    >
      {alertMessage.photoSize.status && <AlertFails textError={alertMessage.photoSize.message} />}
      {alertMessage.checkEmail.status && <AlertFails textError={alertMessage.checkEmail.message}/>}
      {alertMessage.registrationStatus.status && <AlertFails textError={alertMessage.registrationStatus.message}/>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-[100%]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 
          <div className="flex flex-col w-full items-start mt-2">
            <Label htmlFor="picture" className="m-2">
              Аватар
            </Label>
            <Input
              id="picture"
              type="file"
              onChange={handleChange}
              accept="image/*, .png, .jpg, .gif, .webp, .web"
              onClick={() => setSelectedFile(null)}
            />          
          </div>
          <Button type="submit">Отправить</Button>
        </form>
      </Form>
      {selectedFile && (
        <PreviewImageForInput
          nameImg={selectedFile.nameImg}
          sizeImg={selectedFile.sizeImg}
          typeImg={selectedFile.typeImg}
          fileImg={selectedFile.fileImg}
        />
      )}
    </div>
  );
};

export default RegistrationComponent;
