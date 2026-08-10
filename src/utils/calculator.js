export function calculateHours(value) {
    const hours = Number(value);

    if (!Number.isFinite(hours) || hours < 0) {
        return "";
    }

    const totalHours = Math.floor(hours);

    const days = Math.floor(totalHours / 24);

    const remainingHours = totalHours % 24;

    if (days === 0) {
        return `${remainingHours} Hours`;
    }

    if (remainingHours === 0) {
        return `${days} Days`;
    }

    return `${days} Days + ${remainingHours} Hours`;
}