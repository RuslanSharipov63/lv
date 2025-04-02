'use server'

import { cookies } from 'next/headers'

export async function createCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { maxAge: 3600 })
}

export const getCookiesName = async (name: string) => {
  const cookieStore = await cookies();
  const cookiesName = await cookieStore.get(name);
  if(cookiesName != undefined) {
     return cookiesName.value;
  } 
}


export async function checkCookie(nameCookies: string) {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has(nameCookies);
  return hasCookie;
}


export async function deleteCookie(nameCookies: string) {
  (await cookies()).delete(nameCookies)
}