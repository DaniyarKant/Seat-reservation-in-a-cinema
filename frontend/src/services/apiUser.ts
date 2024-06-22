import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface UserData {
    id: number;
    username: string;
    email: string;
}

export async function getUser(): Promise<UserData[]> {
    try {
        const token = cookies.get("accessToken");

        if (!token) {
            throw new Error("Access token is missing!");
        }

        const config = {
            withCredentials: true,
            headers: {
                Cookie: `accessToken=${token}`,
            },
        };

        const response = await axios.get<UserData[]>(`http://localhost:8800/api/user`, config);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch user");
        }
    } catch (error) {
        console.error("An error occurred while getting user", error);
        throw new Error("An error occurred while getting user");
    }
}
