import { BASE_URL } from "../../../../base";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserForLoginType } from "@/types";
import { UserType } from "@/types";

const userData: UserForLoginType = { id: '', email: '', username: '', awatar: '', message: '', sessionid: '' }

const dataUserResponse = async (actionParam: any) => {
    if (actionParam[0].id) {
        userData.id = actionParam[0].id;
        userData.email = actionParam[1].email;
        userData.username = actionParam[2].username;
        userData.awatar = actionParam[3].awatar;
        if (actionParam.length === 5) {
            userData.sessionid = actionParam[4].sessionid
        }
    } else {
        userData.message = actionParam[0].message

    }
    return (await userData)

}


export const fetchSessionid = createAsyncThunk(
    'users/fetchSessionid',
    async (sessionid: string) => {
        const formData = new FormData();
        formData.append("sessionid", sessionid);
        const response = await fetch(`${BASE_URL}/UserDataWithSession.php`, {
            method: "POST",
            body: formData,
        })
        const dataUser = await response.json();
       /*  let userData = await dataUserResponse(dataUser); */

        return (await dataUser)
    },
)


export const fetchLogin = createAsyncThunk(
    'users/fetchLogin',
    async (data: { email: string, password: string }) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        const response = await fetch(`${BASE_URL}/Login.php`, {
            method: "POST",
            body: formData,
        })

        const dataUser = await response.json();
        let userData = await dataUserResponse(dataUser);
        return (await userData)
    },
);

export const fetchUpdateUser = createAsyncThunk(
    'users/fetchUpdateUser',
    async (data: UserType) => {
        const formData = new FormData();
        formData.append('id', String(data.id));
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('action', 'update');
        if (data?.awatar) {
            formData.append('awatar', data?.awatar);
        }
        if (data?.awatar) {
            formData.append('awatar', data?.awatar);
        }
        try {
            const response = await fetch(`${BASE_URL}/User.php`, {
                method: "POST",
                body: formData,
            })
            const data = await response.text();
            return (await data);
        } catch (error) {
            console.log(error);
            return (await 'error');
        }
    })

export const fetchDeleteUser = createAsyncThunk(
    'users/fetchDeleteUser',
    async (data: { id?: number | string, action?: string }) => {
        const formData = new FormData();

        formData.append('id', String(data.id));
        formData.append('action', String(data.action));
        try {
            const response = await fetch(`${BASE_URL}/User.php`, {
                method: "POST",
                body: formData,
            })
            const data = await response.text();
            return (await data);
        } catch (error) {
            console.log(error);
            return (await 'error');
        }
    }
)

interface UsersState {
    userData: UserForLoginType,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed' | 'error'
}

const initialState: UsersState = {
    userData: { id: '', email: '', username: '', awatar: '', message: '', sessionid: '' },
    loading: 'idle',
} satisfies UsersState as UsersState


const loginSlice = createSlice({
    name: 'usersdata',
    initialState,
    reducers: {
        clearState: (state) => {
            state.userData = { id: '', email: '', username: '', awatar: '', message: '', sessionid: '' }
        },
        pushRegister: (state) => {
            state.userData = { ...userData, message: 'регистрация прошла успешно' }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<UserForLoginType>) => {
                state.userData = { ...action.payload }
                state.loading = 'succeeded'
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.loading = 'failed';
            })
            .addCase(fetchSessionid.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchSessionid.fulfilled, (state, action: PayloadAction<UserForLoginType>) => {
               if(action.payload.message) {
                state.userData.message = action.payload.message
               } else {
                let newArr: any = action.payload
                state.userData = {...newArr[0]}
               }
                
                state.loading = 'succeeded'
            })
            .addCase(fetchSessionid.rejected, (state) => {

                state.loading = 'failed';
            })
            .addCase(fetchUpdateUser.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchUpdateUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.userData.message = action.payload;
                state.loading = 'succeeded'
            })
            .addCase(fetchUpdateUser.rejected, (state) => {
                state.loading = 'failed';
            })
            .addCase(fetchDeleteUser.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchDeleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.userData = { ...state.userData, message: action.payload };
            })
            .addCase(fetchDeleteUser.rejected, (state) => {
                state.loading = 'failed';
            })

    }
})
export const { clearState, pushRegister } = loginSlice.actions
export default loginSlice.reducer;