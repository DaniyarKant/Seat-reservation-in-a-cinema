import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
    const navigate = useNavigate();

    const { mutate: signup } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success("Account successfully created! ");
            navigate("/login");
        },
    });

    return { signup };
}
