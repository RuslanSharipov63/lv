import { BASE_URL } from "../../base";


type RegistartionType = {
    username: string,
    email: string,
    password: string,
    awatar: string,
}

export const fetchRegistration = async (dataRegistration: RegistartionType) => {
const formData = new FormData();
formData.append('username', dataRegistration.username);
formData.append('email', dataRegistration.email);
formData.append('password', dataRegistration.password);
formData.append('awatar', dataRegistration.awatar);

try {
    const response = await fetch(`${BASE_URL}/`);
} catch (error) {
    
}

}