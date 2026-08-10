export function calculateHours(value) {
    if (
        value === "" ||
        value === null ||
        value === undefined
    ) {
        return "";
    }

    const totalHours = Number(value);

    if (Number.isNaN(totalHours)) {
        return "Please enter valid hours";
    }

    if (totalHours < 0) {
        return "Hours cannot be negative";
    }

    const totalMinutes = Math.round(
        totalHours * 60
    );

    const days = Math.floor(
        totalMinutes / (24 * 60)
    );

    const remainingMinutes =
        totalMinutes % (24 * 60);

    const hours = Math.floor(
        remainingMinutes / 60
    );

    const minutes =
        remainingMinutes % 60;

    const hourText =
        hours
            .toString()
            .padStart(2, "0");

    let result =
        `${days} Day${days !== 1 ? "s" : ""} + ` +
        `${hourText} Hour${hours !== 1 ? "s" : ""}`;

    if (minutes > 0) {
        const minuteText =
            minutes
                .toString()
                .padStart(2, "0");

        result +=
            ` + ${minuteText} Min${minutes !== 1 ? "s" : ""}`;
    }

    return result;
}