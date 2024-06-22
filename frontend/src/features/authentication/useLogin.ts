import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();

    const { mutate: login } = useMutation({
        mutationFn: loginApi,
        onSettled: (data, error) => {
            if (error) {
                console.error("An error occurred while login user:", error);
                toast.error("Failed to login");
            } else {
                toast.success("Login successfully! ");
                navigate("/home");
            }
        },
    });

    return { login };
}
