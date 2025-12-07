import {useEffect, useRef, useState} from "react";

function Clock() {
    const [time, setTime] = useState("");
    const intervalRef = useRef(null);

    useEffect(() => {
        // interval faqat 1 marta yaratiladi
        intervalRef.current = setInterval(() => {
            const now = new Date().toLocaleString("uz-UZ", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });
            setTime(now);
        }, 1000);

        // component unmount bo‘lsa interval tozalanadi
        return () => clearInterval(intervalRef.current);
    }, []);

    return time;
}

export default Clock;