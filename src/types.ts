export type UserForLoginType = {
    id?: string | number;
    email?: string | undefined;
    username?: string;
    awatar?: string;
    message?: string;
    sessionid?: string;

} 

export type RegisterUpdateUserType = {
    id?: string | number;
    email?: string | undefined;
    username?: string;
    awatar?: string;
    toggleUpdate?: () => void
}

export type RegistartionType = {
    username: string,
    email: string,
    password: string,
    awatar: Blob | undefined,
}

export interface UserType {
    id: string | number,
    username: string,
    email: string,
    awatar: Blob | undefined

}

export type FileStatetype = {
    nameImg: string;
    sizeImg: number;
    typeImg: string;
    fileImg: Blob;
  };

  export type alertMessageType = {
    photoSize: {status: boolean, message: string},
    registrationStatus: {status: boolean, message: string},
    checkEmail: {status: boolean, message: string},
  }