import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSeats } from "../../services/apiSeats";

export function useSeats() {
    const { showtimeId } = useParams();

    const { data: seats, isLoading } = useQuery({
        queryKey: ["seats", showtimeId],
        queryFn: () => getSeats(showtimeId),
    });

    return { seats, isLoading };
}
