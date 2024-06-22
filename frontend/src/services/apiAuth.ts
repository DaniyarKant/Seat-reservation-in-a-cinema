import axios from "axios";
import Cookies from "universal-cookie";

interface SignupData {
    username: string;
    email: string;
    password: string;
}
const cookies = new Cookies();

export async function signup(userData: SignupData): Promise<void> {
    try {
        const response = await axios.post("http://localhost:8800/api/users/register", userData);

        if (response.status === 200) {
            console.log("User registered successfully!");
        } else {
            console.error("Failed to register user");
        }
    } catch (error) {
        console.error("An error occurred while registering user:", error);
    }
}

interface LoginData {
    email: string;
    password: string;
}

export async function login(userData: LoginData): Promise<any> {
    try {
        const response = await axios.post("http://localhost:8800/api/users/login", userData);
        if (response.status === 200) {
            console.log("Login successfully");
            cookies.set("accessToken", `${response.data.token}`);
            return response.data;
        } else {
            console.error("Failed to login user");
            throw new Error("Failed to login user");
        }
    } catch (error) {
        console.error("An error occurred while login user:", error);
        throw error;
    }
}

export async function logout(): Promise<void> {
    try {
        const response = await axios.post(`http://localhost:8800/api/users/logout`);
        cookies.remove("accessToken");
        if (response.status === 200) {
            console.log(response.data);
        } else {
            throw new Error("Failed to fetch reservations");
        }
    } catch (error) {
        console.error("An error occurred while logout:", error);
        throw error;
    }
}
