import axios from "axios";

interface MovieData {
    id: number;
    title: string;
    description: string;
    releaseDate: string;
    duration: number;
    image: string;
}

export async function getMovies(): Promise<MovieData[]> {
    try {
        const response = await axios.get<MovieData[]>("http://localhost:8800/api/movies");
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching movies:", error);
        throw error;
    }
}

export async function getSingleMovie(movieId: string | undefined): Promise<MovieData[]> {
    try {
        const response = await axios.get<MovieData[]>(`http://localhost:8800/api/movies/${movieId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching movies:", error);
        throw error;
    }
}

interface MovieData2 {
    title: string;
    description: string;
    releaseDate: string;
    duration: string;
    image: string;
}

export async function createMovie(newMovieData: MovieData2): Promise<MovieData> {
    try {
        const response = await axios.post<MovieData>("http://localhost:8800/api/movies", newMovieData);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating a new movie:", error);
        throw error;
    }
}
