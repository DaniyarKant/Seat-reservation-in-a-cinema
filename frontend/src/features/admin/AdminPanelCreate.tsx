import { z } from "zod";
import styles from "./AdminPanelCreate.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateMovie } from "./useCreateMovie";

const schema = z.object({
    title: z.string().min(4).max(50),
    description: z.string().min(4).max(500),
    releaseDate: z.string().min(4).max(50),
    duration: z.string(),
    image: z.string(),
});

type FormFields = z.infer<typeof schema>;

function AdminPanelCreate() {
    const { newMovie } = useCreateMovie();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        await newMovie(data);
        reset();
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <h2>Create movie</h2>
            <div className={styles.wrapper}>
                <div className={styles.wrapperLeft}>
                    <div>
                        <label className={styles.wrapperLabel}>Title</label>
                        <input className={styles.wrapperInput} type="text" {...register("title")} />
                        {errors.title && <span className={styles.error}>{errors.title.message}</span>}
                    </div>
                    <div>
                        <label className={styles.wrapperLabel}>Description</label>
                        <input className={styles.wrapperInput} type="text" {...register("description")} />
                        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
                    </div>
                </div>
                <div className={styles.wrapperRight}>
                    <div>
                        <label className={styles.wrapperLabel}>Release Date</label>
                        <input className={styles.wrapperInput} type="text" {...register("releaseDate")} />
                        {errors.releaseDate && <span className={styles.error}>{errors.releaseDate.message}</span>}
                    </div>
                    <div>
                        <label className={styles.wrapperLabel}>Duration</label>
                        <input className={styles.wrapperInput} type="text" {...register("duration")} />
                        {errors.duration && <span className={styles.error}>{errors.duration.message}</span>}
                    </div>
                    <div>
                        <label className={styles.wrapperLabel}>Image</label>
                        <input className={styles.wrapperInput} type="text" {...register("image")} />
                        {errors.duration && <span className={styles.error}>{errors.duration.message}</span>}
                    </div>
                </div>
            </div>
            <button className={styles.wrapperButton} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Create"}
            </button>
        </form>
    );
}

export default AdminPanelCreate;
