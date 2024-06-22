import { useMovies } from "../home/useMoives";
import styles from "./RepertuarList.module.css";
import RepertuarMovie from "./RepertuarMovie";
import { useShowtimes } from "./useShowtimes";

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

function RepertuarList() {
    const { showtimes, isLoading: isLoadingShowtimes } = useShowtimes();
    const { movies, isLoading: isLoadingMovies } = useMovies();

    if (isLoadingShowtimes || isLoadingMovies) {
        return <div>Loading...</div>;
    }

    const groupShowtimesByMovieId = (showtimes: ShowtimeData[]) => {
        const groupedShowtimes: { [key: number]: ShowtimeData[] } = {};

        showtimes.forEach((showtime) => {
            if (!groupedShowtimes[showtime.movieId]) {
                groupedShowtimes[showtime.movieId] = [];
            }
            groupedShowtimes[showtime.movieId].push(showtime);
        });

        return groupedShowtimes;
    };

    const groupedShowtimes = groupShowtimesByMovieId(showtimes);

    return (
        <div className={styles.container}>
            {movies?.map((movie) => (
                <div key={movie.id}>
                    <RepertuarMovie movie={movie} showtimes={groupedShowtimes[movie.id] || []} />
                </div>
            ))}
        </div>
    );
}

export default RepertuarList;
