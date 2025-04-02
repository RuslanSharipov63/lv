"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Caveat, Montserrat } from "next/font/google";
import AlertFails from "./AlertFails";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import MobileMenu from "./MobileMenu";
import { checkCookie, deleteCookie } from "@/app/cookies/actions";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from "./../css/header.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSearch } from "@/store/features/photo/photoSlice";
import { Nunito } from 'next/font/google';

const dancingScript = Nunito({ subsets: ['cyrillic'], weight: "600"  });
const caveat = Caveat({ subsets: ["cyrillic"], weight: "600" });
const montserrat = Montserrat({ subsets: ["cyrillic"], weight: "600" });

const Header = () => {
  const pathname = usePathname();
  const [logIn, setLogIn] = useState<boolean>(false);
  const [searchInp, setSearchInp] = useState<boolean>(false);
  const [searchTags, setSearchTags] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.photo);

  const changeSearch = () => {
    setSearchInp(!searchInp);
  };

  const checkCookiesHeader = async () => {
    if (await checkCookie("sessionid")) {
      setLogIn(true);
      return;
    } else {
      setLogIn(false);
      return;
    }
  };

  useEffect(() => {
    setSearchInp(false);
    checkCookiesHeader();
  }, [pathname]);

  const deleteCookieLogin = async () => {
    await deleteCookie("sessionid");
    setLogIn(false);
  };

  useEffect(() => {
    if (pathname === "/login") {
      deleteCookieLogin();
      router.push("/login");
    }
  }, [pathname]);

  const workCookie = async () => {
    await deleteCookieLogin();
  };

  const actionSearch = () => {
    if(searchTags === '') {
      setAlertMessage(true);
      setTimeout(() =>{
        setAlertMessage(false);
      }, 1000)
      return;
    }
    let dataSearch = {
      action: 'search',
      tags: searchTags
    }
    dispatch(fetchSearch(dataSearch));
    setSearchTags('');
    setSearchInp(false);

  };

  return (
    <>
      <div className="flex justify-between p-1 min-[932px]:items-center">
        <div
          className={`flex justify-start z-10 text-[44px] ${caveat.className}`}
        >
          <Link href="/"> Лови момент</Link> 
        </div>
        <MobileMenu />
        <div
          className={`hidden min-[932px]:flex min-[932px]:w-[50%] min-[932px]:justify-end min-[932px]:text-orange-500`}
        >
          <NavigationMenu className={`flex ${dancingScript.className}`}>
            <NavigationMenuList className="flex">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink>главная</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink>о проекте</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contacts" legacyBehavior passHref>
                  <NavigationMenuLink>контакты</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink onClick={workCookie}>
                    {logIn ? "выйти" : "войти"}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/user" legacyBehavior passHref>
                  <NavigationMenuLink>профиль</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="cursor-pointer"
                  onClick={changeSearch}
                >
                  поиск
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div
        className={
          searchInp
            ? `${styles.searchVisible} ${styles.searchBlock}`
            : `${styles.searchHidden} ${styles.searchBlock}`
        }
      >
        <Input
          type="text"
          value={searchTags}
          onChange={(e) => setSearchTags(e.target.value)}
          className="bg-orange-300 text-amber-900 ring-0 border-0 
          focus-visible:ring-offset-0 focus-visible:ring-0"
        />
        <Button
          type="submit"
          className="ml-2 bg-cyan-500"
          onClick={actionSearch}
        >
          найти
        </Button>
      </div>
    {alertMessage && <AlertFails textError="заполните поле поиска"/> }
    </>
  );
};

export default Header;
