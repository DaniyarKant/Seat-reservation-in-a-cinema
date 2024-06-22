import BookingMovie from "./BookingMovie";
import BookingSeats from "./BookingSeats";

function BookingMain() {
    return (
        <div style={{ marginTop: "50px" }}>
            <BookingMovie />
            <BookingSeats />
        </div>
    );
}

export default BookingMain;
