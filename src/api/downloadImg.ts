import { BASE_URL } from "../../base";

export const downloadImg = async (fileName: string) => {
    const formData = new FormData();
    formData.append('action', 'downloadimg');
    formData.append('pathname', fileName);

    try {
        const response = await fetch(`${BASE_URL}/Photo.php`, {
            method: "POST",
            body: formData,
        })

        const data = await response.blob();
        return data;

    } catch (error) {
        console.log('error')
        return { message: 'не удалось скачать файл' }
    }

}