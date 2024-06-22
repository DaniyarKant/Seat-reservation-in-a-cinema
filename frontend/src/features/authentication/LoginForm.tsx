import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "./useLogin";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
});

type FormFields = z.infer<typeof schema>;

function LoginForm() {
    const { login } = useLogin();
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await login(data);
            reset();
        } catch (error) {
            setError("root", {
                message: "Email or password are not correct",
            });
        }
    };

    return (
        <section className={styles.centered}>
            <form className={styles.loginContainer} onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
                <div className={styles.inputWrapper}>
                    <label>Email:</label>
                    <input
                        placeholder="Entre your email"
                        type="email"
                        className={styles.inputField}
                        {...register("email")}
                    />
                    {errors.email && <div>{errors.email.message}</div>}
                </div>
                <div className={styles.inputWrapper}>
                    <label>Password:</label>
                    <input
                        placeholder="Password"
                        type="password"
                        className={styles.inputField}
                        {...register("password")}
                    />
                    {errors.password && <div>{errors.password.message}</div>}
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting}>
                        Login in
                    </button>
                    {errors.root && <div>{errors.root.message}</div>}
                    <Link to="/signup" className={styles.link}>
                        Sign up
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default LoginForm;
