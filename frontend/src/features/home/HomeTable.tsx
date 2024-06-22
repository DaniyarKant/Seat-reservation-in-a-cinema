import { Link } from "react-router-dom";
import styles from "./HomeTable.module.css";
import { useMovies } from "./useMoives";

function HomeTable() {
    const { movies, isLoading } = useMovies();

    return (
        <div className={styles.container}>
            <h2>At the cinema today</h2>
            <div className={styles.moviesDiv}>
                {movies?.map((movie) => (
                    <Link to={`/booking/${movie.id}`} key={movie.id}>
                        <div className={styles.movieDiv}>
                            <img src={movie.image} alt={movie.title} />
                            <h3>{movie.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HomeTable;
