import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createMovie } from "../../services/apiMovies";

export function useCreateMovie() {
    const { mutate: newMovie } = useMutation({
        mutationFn: createMovie,
        onSuccess: () => {
            toast.success("Movie successfully created! ");
        },
    });

    return { newMovie };
}
