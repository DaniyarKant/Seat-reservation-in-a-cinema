import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeReservation } from "../../services/apiReservation";
import toast from "react-hot-toast";

export function useReservation() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: makeReservation,
        onSuccess: async () => {
            await queryClient.invalidateQueries("seats");
            toast.success("Reservation successfully created!");
        },
    });

    return mutation;
}
