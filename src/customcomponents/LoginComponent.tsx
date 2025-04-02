"use client";
import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import AlertFails from "./AlertFails";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchLogin } from "@/store/features/login/loginSlice";
import { createCookie } from "@/app/cookies/actions";
import Link from "next/link";
import AlertSuccess from "./AlertSuccess";
import { clearState } from "@/store/features/login/loginSlice";

const formSchema = z.object({
  email: z.string().email({ message: "Введите email" }),
  password: z
    .string()
    .min(8, { message: "не валидный пароль" })
    .max(10, { message: "не валидный пароль" }),
});

const LoginComponent = () => {
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState<boolean>(false);
  const { userData, loading } = useAppSelector((state) => state.datalogin);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    dispatch(clearState());
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setAlertMessage(false);
    let dataLogin = {
      email: values.email,
      password: values.password,
    };
    dispatch(fetchLogin(dataLogin));
  }

  useEffect(() => {
    if (loading === "succeeded") {
      if (userData.sessionid) {
        createCookie("sessionid", userData.sessionid);
        router.push("/user");
        return;
      }
    }
  }, [loading]);

  return (
    <div
      className="
        flex flex-col p-2 items-start
        w-[100%] 
        sm:w-[400px] sm:m-auto sm:items-center
        md:w-[400px] md:m-auto 
        lg:w-[500px] lg:m-auto 
        xl:w-[450px] xl:m-auto
        "
    >
      {userData.message === "неверный email или пароль" ? (
        <AlertFails textError={userData.message} />
      ) : null}
      {userData.message === "удаление прошло успешно" ? (
        <AlertSuccess title="удаление аккаунта" text={userData.message} />
      ) : null}
       {userData.message === "регистрация прошла успешно" ? (
        <AlertSuccess title="регистрация аккаунта" text={userData.message} />
      ) : null}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-[100%]"
        >
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
          <Button type="submit">Войти</Button>
        </form>
      </Form>
      <Link href="/registration" className="flex self-start mt-2">
        регистрация
      </Link>
    </div>
  );
};

export default LoginComponent;
