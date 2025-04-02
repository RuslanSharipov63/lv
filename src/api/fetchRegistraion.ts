import { BASE_URL } from "../../base";
import { RegistartionType } from "@/types";


export const fetchRegistration = async (dataRegistration: RegistartionType) => {
const formData = new FormData();
formData.append('username', dataRegistration.username);
formData.append('email', dataRegistration.email);
formData.append('password', dataRegistration.password);
if(dataRegistration?.awatar)  {
    formData.append('awatar', dataRegistration?.awatar);
} 


try {
    const response = await fetch(`${BASE_URL}/Registration.php`, {
        method: 'POST',
        body: formData,
    });
    const data  = await response.text();
    return data;
} catch (error) {
    return {message: false}
}

}