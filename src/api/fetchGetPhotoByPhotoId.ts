import { BASE_URL } from "../../base";

export const fetchGetPhotoByPhotoId = async (data: { id?: number | string, action: string }) => { 
        const formData = new FormData();
        formData.append("id", String(data.id));
        formData.append('action', data.action)
        const response = await fetch(`${BASE_URL}/Photo.php`, {
            method: "POST",
            body: formData,
        })
        const photo = await response.json();
        return photo;
    }

