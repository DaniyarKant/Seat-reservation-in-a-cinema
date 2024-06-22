import { useMutation } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();

    const { mutate: logoutAcc } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            navigate("/login");
        },
    });

    return { logoutAcc };
}
