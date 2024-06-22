import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "./useSignup";
import styles from "./SignupForm.module.css";

const schema = z.object({
    username: z.string().min(8),
    email: z.string().email(),
    password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

function SignupForm() {
    const { signup } = useSignup();
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
            await signup(data);
            reset();
        } catch (error) {
            setError("root", {
                message: "This username is already taken",
            });
        }
    };

    return (
        <section className={styles.centered}>
            <form className={styles.signupContainer} onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign up</h1>
                <div className={styles.inputWrapper}>
                    <label>Username:</label>
                    <input
                        placeholder="Entre your username"
                        type="text"
                        className={styles.inputField}
                        {...register("username")}
                    />
                    {errors.username && <div>{errors.username.message}</div>}
                </div>
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
                        {isSubmitting ? "Loading..." : "Sign up"}
                    </button>
                    {errors.root && <div>{errors.root.message}</div>}
                    <Link to="/login" className={styles.link}>
                        Login in
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default SignupForm;
