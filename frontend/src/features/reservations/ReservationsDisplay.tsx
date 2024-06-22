import styles from "./ReservationDisplay.module.css";
import { useGetReservation } from "./useGetReservation";

function ReservationDisplay() {
    const { getReservations, isLoading } = useGetReservation();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            {getReservations?.map((reservation) => (
                <div key={reservation.id} className={styles.wrapper}>
                    <div className={styles.wrapperTitle}>
                        <h2>{reservation.title}</h2>
                        <div>Start time: {reservation.startTime}</div>
                        <div>End time: {reservation.endTime}</div>
                    </div>

                    <div>
                        <div>{reservation.reservationDate.slice(0, 10)}</div>
                        <div>Seat number: {reservation.seatNumber}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ReservationDisplay;
