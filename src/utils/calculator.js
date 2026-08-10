export function calculateHours(hours) {
    const totalHours = Number(hours);

    if (
        !Number.isFinite(totalHours) ||
        totalHours < 0
    ) {
        return "";
    }

    const days = Math.floor(
        totalHours / 24
    );

    const remainingHours =
        totalHours % 24;

    return `${days} Days + ${String(
        remainingHours
    ).padStart(2, "0")} Hours`;
}