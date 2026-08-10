/**
 * Hours Calculator
 * Example:
 * 48  -> 2 Days + 00 Hours
 * 25  -> 1 Day + 01 Hours
 * 72  -> 3 Days + 00 Hours
 */

export function calculateHours(value) {

    if (value === "" || value === null || value === undefined) {
        return "";
    }

    const totalHours = Number(value);

    if (isNaN(totalHours)) {
        return "Please enter valid hours";
    }

    if (totalHours < 0) {
        return "Hours cannot be negative";
    }

    const days = Math.floor(totalHours / 24);

    const hours = totalHours % 24;

    return `${days} ${days === 1 ? "Day" : "Days"} + ${hours
        .toString()
        .padStart(2, "0")} Hours`;
}