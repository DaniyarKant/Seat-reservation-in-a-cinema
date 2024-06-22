import { useQuery } from "@tanstack/react-query";
import { getSingleMovie } from "../../services/apiMovies";
import { useParams } from "react-router-dom";

export function useSingleMovie() {
    const { movieId } = useParams();

    const { data: singleMovie, isLoading } = useQuery({
        queryKey: ["singleMovie", movieId],
        queryFn: () => getSingleMovie(movieId),
    });

    return { singleMovie, isLoading };
}
