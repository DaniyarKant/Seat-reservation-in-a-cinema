import { useState } from "react";
import styles from "./BookingSeats.module.css";
import { useSeats } from "./useSeats";
import { useReservation } from "./useReservation";

function BookingSeats() {
    const { seats, isLoading } = useSeats();
    const { mutate: makeReservation } = useReservation();
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const toggleSeat = (seatNumber: string, seatStatus: string) => {
        if (seatStatus === "reserved") return;

        const isSelected = selectedSeats.includes(seatNumber);
        if (isSelected) {
            setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const onSubmit = async () => {
        await makeReservation({ seat: selectedSeats[0], showtime: seats[0].showtimeId });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.seatParametr}>
                <ul>
                    <li>
                        <div className={`${styles.seat} `}></div>
                        <small>Available</small>
                    </li>
                    <li>
                        <div className={`${styles.seat} ${styles.seatSelected}`}></div>
                        <small>Selected</small>
                    </li>
                    <li>
                        <div className={`${styles.seat} ${styles.seatSold}`}></div>
                        <small>Sold</small>
                    </li>
                </ul>
            </div>
            <div className={styles.seats}>
                <div className={styles.screen}></div>

                <div className={styles.row}>
                    {seats?.map((seat) => (
                        <div
                            key={seat.seatNumber}
                            className={`${styles.seat} ${
                                seat.status === "reserved"
                                    ? styles.seatSold
                                    : selectedSeats.includes(seat.seatNumber)
                                    ? styles.seatSelected
                                    : ""
                            }`}
                            onClick={() => toggleSeat(seat.seatNumber, seat.status)}
                        ></div>
                    ))}
                </div>
            </div>

            <div className={styles.yourSeats}>
                {selectedSeats.length ? <div>Selected seats:</div> : null}
                {selectedSeats.map((seat) => (
                    <div key={seat} className={styles.yourSeatsSelected}>
                        {seat}
                    </div>
                ))}
            </div>
            <div className={styles.yourSeatsButton}>
                {selectedSeats.length ? <button onClick={onSubmit}>Make reservation</button> : null}
            </div>
        </div>
    );
}

export default BookingSeats;
