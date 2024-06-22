import { Link } from "react-router-dom";
import styles from "./RepertuarMovie.module.css";

interface MovieData {
    id: number;
    title: string;
    description: string;
    releaseDate: string;
    duration: number;
    image: string;
}

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

interface Props {
    movie: MovieData;
    showtimes: ShowtimeData[];
}

function RepertuarMovie({ movie, showtimes }: Props) {
    return (
        <div className={styles.movieContainer}>
            <div className={styles.movieImage}>
                <img src={movie.image} alt={movie.title} />
            </div>
            <div className={styles.movieDescription}>
                <div>
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                </div>

                {/* <div className={styles.movieShowtimes}>{showtime.startTime}</div> */}
                <div className={styles.showtimeDiv}>
                    {showtimes?.map((showtime) => (
                        <Link to={`/booking/${showtime.movieId}/${showtime.id}`} key={showtime.id}>
                            <div className={styles.movieShowtimes}>
                                <div>{showtime.startTime}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RepertuarMovie;
