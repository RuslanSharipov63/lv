"use client"
import * as React from "react"
import Link from "next/link"
import { Caveat, Montserrat } from 'next/font/google'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import MobileMenu from "./MobileMenu";

const caveat = Caveat({ subsets: ['cyrillic'], weight: '600', });
const montserrat = Montserrat({ subsets: ['cyrillic'], weight: '600', });

const Header = () => {
    return (
        <div className="flex justify-between p-1 min-[932px]:items-center">
            <div className={`flex justify-start z-10 text-[44px] ${caveat.className}`}>Лови момент</div>
            <MobileMenu />
            <div className={`hidden min-[932px]:flex min-[932px]:w-[50%] min-[932px]:justify-end min-[932px]:text-orange-500`}>
                <NavigationMenu className={`flex ${montserrat.className}`}>
                    <NavigationMenuList className="flex">
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink >
                                    главная
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/about" legacyBehavior passHref>
                                <NavigationMenuLink>
                                    о нас
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/contacts" legacyBehavior passHref>
                                <NavigationMenuLink >
                                    контакты
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/docs" legacyBehavior passHref>
                                <NavigationMenuLink>
                                    войти/выйти
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/registration" legacyBehavior passHref>
                                <NavigationMenuLink>
                                    регистрация
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>


        </div>
    )
}



export default Header;