import { useQuery } from "@tanstack/react-query";
import { getReservation } from "../../services/apiReservation";

export function useGetReservation() {
    const { data: getReservations, isLoading } = useQuery({
        queryKey: ["reservations"],
        queryFn: getReservation,
    });

    return { getReservations, isLoading };
}
