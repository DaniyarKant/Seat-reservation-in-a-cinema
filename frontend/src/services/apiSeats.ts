import axios from "axios";

interface SeatData {
    id: number;
    seatNumber: string;
    status: string;
    showtimeId: number;
}

export async function getSeats(showtimeId: string | undefined): Promise<SeatData[]> {
    try {
        const response = await axios.get<SeatData[]>(`http://localhost:8800/api/seats/${showtimeId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching seats:", error);
        throw error;
    }
}
