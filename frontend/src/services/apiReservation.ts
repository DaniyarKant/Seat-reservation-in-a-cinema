import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface ReservationData {
    seat: string;
    showtime: string;
}
// reservationData: ReservationData
export async function makeReservation(reservationData: ReservationData): Promise<string> {
    try {
        const token = cookies.get("accessToken");

        if (!token) {
            return "Access token is missing!";
        }

        const config = {
            withCredentials: true,
            headers: {
                Cookie: `accessToken=${token}`,
            },
        };

        const response = await axios.post(
            `http://localhost:8800/api/reservations/${reservationData.seat}/${reservationData.showtime}`,
            null,
            config
        );

        if (response.status === 200) {
            console.log(cookies.get("accessToken"));
            return "Reserved successfully!";
        } else {
            return "Failed to reserve";
        }
    } catch (error) {
        console.error("An error occurred while making reservation:", error);
        return "An error occurred while making reservation";
    }
}

interface ReservationGet {
    id: number;
    reservationDate: string;
    startTime: string;
    endTime: string;
    title: string;
    seatNumber: string;
}

export async function getReservation(): Promise<ReservationGet[]> {
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

        const response = await axios.get<ReservationGet[]>(`http://localhost:8800/api/reservations`, config);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch reservations");
        }
    } catch (error) {
        console.error("An error occurred while getting reservation", error);
        throw new Error("An error occurred while getting reservation");
    }
}
