"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { checkCookie, deleteCookie } from "@/app/cookies/actions";
import styles from "./../css/header.module.css";
import { fetchSearch } from "@/store/features/photo/photoSlice";
import AlertFails from "./AlertFails";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const MobileMenu = () => {
  const router = useRouter();
  const [logIn, setLogIn] = useState<boolean>(false);
  const [searchInp, setSearchInp] = useState<boolean>(false);
  const [searchTags, setSearchTags] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<boolean>(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const deleteCookieLogin = async () => {
    await deleteCookie("sessionid");
    setLogIn(false);
  };

  const changeSearch = () => {
    setSearchInp(!searchInp);
  };

  const workCookie = async () => {
    await deleteCookieLogin();
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

  useEffect(() => {
    if (pathname === "/login") {
      deleteCookieLogin();
      router.push("/login");
    }
  }, [pathname]);

  const actionSearch = () => {
    if (searchTags === "") {
      setAlertMessage(true);
      setTimeout(() => {
        setAlertMessage(false);
      }, 1000);
      return;
    }
    let dataSearch = {
      action: "search",
      tags: searchTags,
    };
    dispatch(fetchSearch(dataSearch));
    setSearchTags("");
    setSearchInp(false);
  };

  return (
    <>
      <div className="flex items-center min-[932px]:hidden z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">меню</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              <Link href="/">Главная</Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/about"> о проекте </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/contacts"> контакты </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/login" onClick={workCookie}>
                  {" "}
                  {logIn ? "выйти" : "войти"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile">профиль</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={changeSearch}>поиск</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className={
          searchInp
            ? `${styles.searchVisible} ${styles.searchBlock} ${styles.searchMobile}`
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
      {alertMessage && <AlertFails textError="заполните поле поиска" />}
    </>
  );
};

export default MobileMenu;
