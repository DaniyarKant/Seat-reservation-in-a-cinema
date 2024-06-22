import styles from "./BookingMovie.module.css";
import { useSingleMovie } from "./useSingleMovie";

function BookingMovie() {
    const { singleMovie, isLoading } = useSingleMovie();

    if (isLoading) return <div>Loading...</div>;

    if (!singleMovie || singleMovie.length === 0) return <div>No movie found.</div>;

    const { image, title, description, releaseDate, duration } = singleMovie[0];

    return (
        <div className={styles.container}>
            <div className={styles.bookingMovieLeft}>
                <img src={image} className={styles.bookingImage} />
                <div>
                    <h2>You buy tickets</h2>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
            <div className={styles.bookingMovieRight}>
                <div>Release date: {releaseDate.slice(0, 10)}</div>
                <div>Duration: {duration}</div>
            </div>
        </div>
    );
}

export default BookingMovie;
