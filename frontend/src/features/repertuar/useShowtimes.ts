import { useQuery } from "@tanstack/react-query";
import { getShowtimes } from "../../services/apiShowtimes";

export function useShowtimes() {
    const { data: showtimes, isLoading } = useQuery({ queryKey: ["showtimes"], queryFn: getShowtimes });

    return { showtimes, isLoading };
}
