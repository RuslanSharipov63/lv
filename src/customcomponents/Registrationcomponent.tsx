"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import PreviewImageForInput from "./PreviewImageForInput";
import AlertFails from "./AlertFails";

const formSchema = z.object({
    username: z.string().min(2, { message: 'имя - минимум 2 символов' }).max(20, { message: 'имя - максимум 20 символов' }),
    email: z.string().email({ message: "Введите email" }),
    password: z.string().min(8, { message: 'пароль - минимум 8 символов' }).max(10, { message: 'пароль - максимум 10 символов' }),
})

const Registrationcomponent = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    })

    const [selectedFile, setSelectedFile] = useState<null | { name: string, size: number, type: string, fileImg: Blob }>(null);
    const [alertMessage, setAlertMessage] = useState<boolean>(false);

    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlertMessage(false);
        if (!event.target.files) return;
        if (event.target.files[0].size > 47185920) {
            setAlertMessage(true);
            return;
        } 
        if (!event.target.files) return;
        if(event.target.files) {
             setSelectedFile(event.target.files[0])
        }
           
    }

    return (
        <div className="
        flex flex-col p-2 
        w-[100%] 
        sm:w-[400px] sm:m-auto sm:items-center
        md:w-[400px] md:m-auto 
        lg:w-[500px] lg:m-auto 
        xl:w-[450px] xl:m-auto
        ">
            {alertMessage && <AlertFails textError={'изображение не больше 45Мб'} />}
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[100%]">
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
                        <Label htmlFor="picture" className="m-2">Аватар</Label>
                        <Input id="picture" type="file"
                            onChange={handleChange}
                            accept="image/*, .png, .jpg, .gif, .webp, .web" />
                    </div>
                    <Button type="submit">Отправить</Button>
                </form>
            </Form>
            {selectedFile && <PreviewImageForInput
                nameImg={selectedFile.name}
                sizeImg={selectedFile.size}
                typeImg={selectedFile.type}
                fileImg={selectedFile}
            />}
        </div>
    );

}

export default Registrationcomponent;