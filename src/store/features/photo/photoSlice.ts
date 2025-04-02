import { Action } from "@radix-ui/react-alert-dialog";
import { BASE_URL } from "../../../../base";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

/* выбрать все фото */


export const fetchGetAllPhotos = createAsyncThunk(
    'name/fetchGetAllPhotos',
    async (data: { action: string }) => {
        const formData = new FormData();
        formData.append("action", data.action);
        const response = await fetch(`${BASE_URL}/Photo.php`,
            {
                method: "POST",
                body: formData,
            })
        const photosList = await response.json();
        return photosList;
    }
)

/* поиск фото по тегам */

export const fetchSearch = createAsyncThunk(
    'name/fetchSearch',
    async (data: { action: string, tags: string }) => {
        const formData = new FormData();
        formData.append("tags", data.tags);
        formData.append("action", data.action);
        const response = await fetch(`${BASE_URL}/Photo.php`, {
            method: "POST",
            body: formData,
        })
        const photos = await response.json();
        return photos;
    }
)

export const fetchUploadPhoto = createAsyncThunk(
    'photo/fetchUploadPhoto',
    async (data: { user_id: number | string | undefined, tags: string, image?: Blob, action: 'upload' }) => {
        const formData = new FormData();
        formData.append("user_id", String(data.user_id));
        formData.append("tags", data.tags);
        if (data.image) {
            formData.append("photo", data.image);
        }
        formData.append('action', data.action)
        const response = await fetch(`${BASE_URL}/Photo.php`, {
            method: "POST",
            body: formData,
        })
        const photo = await response.text();
        return photo;
    },
)

/* все фото по id usera */
export const fetchGetAllPhotosByUserId = createAsyncThunk(
    'photo/fetchGetAllPhotosById',
    async (data: { user_id?: number | string, action: string }) => {
        const formData = new FormData();
        formData.append("user_id", String(data.user_id));
        formData.append('action', data.action)
        const response = await fetch(`${BASE_URL}/Photo.php`, {
            method: "POST",
            body: formData,
        })
        const photo = await response.json();
        return photo;
    },
)

/* одно фото по id фото */
export const fetchGetPhotoById = createAsyncThunk(
    'name/fetchGetPhotoById',
    async (data: { id?: number | string, action: string }) => {
        const formData = new FormData();
        formData.append("id", String(data.id));
        formData.append('action', data.action)
        const response = await fetch(`${BASE_URL}/Photo.php`, {
            method: "POST",
            body: formData,
        })
        const photo = await response.json();
        return photo;
    },

)


/* удаление фото по id */


export const fetchDeletePhotoByPhotoId = createAsyncThunk(
    'name/fetchDeletePhotoByPhotoId',
    async (data: { id?: number | string, action?: string, photoname?: string }) => {
        const formData = new FormData();
        formData.append("id", String(data.id));
        formData.append('action', String(data.action));
        formData.append('photoname', String(data.photoname));
        const response = await fetch(`${BASE_URL}/Photo.php`, {
            method: "POST",
            body: formData,
        })
        const photo = await response.text();
        return photo;
    }
)

export interface photoState {
    id: string,
    user_id: number | string,
    tags: string;
    photoname: string;
    size: string | number;
    type: string;
    username: string;
}

interface IPhoto {
    photos: photoState[],
    loading: string,
}
const initialState: IPhoto = {
    photos: [
        {
            id: '',
            user_id: '',
            tags: '',
            photoname: '',
            size: '',
            type: '',
            username: '',
        }],
    loading: '',
}
const photoSlice = createSlice({
    name: 'photodata',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUploadPhoto.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchUploadPhoto.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = action.payload
            })
            .addCase(fetchUploadPhoto.rejected, (state) => {
                state.loading = 'rejected'
            })
            .addCase(fetchGetAllPhotosByUserId.pending, (state) => {
                state.loading = 'фото загружаются';
            })
            .addCase(fetchGetAllPhotosByUserId.fulfilled, (state, action) => {
                state.photos = [...action.payload]
                state.loading = 'все фото загружены';
            })
            .addCase(fetchGetAllPhotosByUserId.rejected, (state) => {
                state.loading = 'rejected';
            })
            .addCase(fetchGetPhotoById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchGetPhotoById.fulfilled, (state, action) => {
                state.photos = [...action.payload]
                state.loading = 'фото загружено';
            })
            .addCase(fetchGetPhotoById.rejected, (state) => {
                state.loading = 'rejected';
            })
            .addCase(fetchDeletePhotoByPhotoId.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchDeletePhotoByPhotoId.fulfilled, (state, action) => {
                state.loading = action.payload;
            })
            .addCase(fetchDeletePhotoByPhotoId.rejected, (state) => {
                state.loading = 'rejected';
            })
            .addCase(fetchGetAllPhotos.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchGetAllPhotos.fulfilled, (state, action) => {
                if (action.payload.message === 'error') {
                    state.loading = 'произошла ошибка';
                } else {
                    state.photos = action.payload;
                    state.loading = 'фото загружены';
                }

            })
            .addCase(fetchGetAllPhotos.rejected, (state) => {
                state.loading = 'rejected';
            })
            .addCase(fetchSearch.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {

                if (action.payload.message === 'error') {
                    state.loading = 'произошла ошибка';
                } else if (action.payload.length === 0) {
                    state.loading = 'ничего не найдено';
                } else {
                    state.photos = action.payload;
                    state.loading = 'поиск завершен';
                }

            })
            .addCase(fetchSearch.rejected, (state) => {
                state.loading = 'rejected';
            })
    }

})


export default photoSlice.reducer;