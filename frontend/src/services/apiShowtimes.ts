import axios from "axios";

interface ShowtimeData {
    id: number;
    movieId: number;
    startTime: string;
    endTime: string;
    title: string;
    description: string;
    releaseDate: string;
    duration: number;
    image: string;
}

export async function getShowtimes(): Promise<ShowtimeData[]> {
    try {
        const response = await axios.get<ShowtimeData[]>(`http://localhost:8800/api/showtimes`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching showtimes:", error);
        throw error;
    }
}
