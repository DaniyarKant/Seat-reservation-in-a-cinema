import { useMovies } from "./useMoives";
import styles from "./HomeSlider.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useState } from "react";

function HomeSlider() {
    const { movies, isLoading } = useMovies();
    const [currentIndex, setCurrentIndex] = useState(0);

    const step = 3;

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - step >= 0 ? prevIndex - step : 0;
            return newIndex;
        });
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + step < (movies?.length || 0) ? prevIndex + step : prevIndex;
            return newIndex;
        });
    };
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <button onClick={prevSlide} disabled={currentIndex === 0}>
                    <FaAngleLeft />
                </button>
                <div className={styles.slider}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        movies?.slice(currentIndex, currentIndex + step).map((movie) => (
                            <div key={movie.id} className={styles.movieDiv}>
                                <h3>{movie.title}</h3>
                            </div>
                        ))
                    )}
                </div>
                <button onClick={nextSlide} disabled={currentIndex + step >= (movies?.length || 0)}>
                    <FaAngleRight />
                </button>
            </div>
        </div>
    );
}

export default HomeSlider;
