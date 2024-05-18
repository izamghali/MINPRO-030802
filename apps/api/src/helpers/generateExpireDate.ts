export function generateExpireDate() {
    const date = new Date();
    const current = date.getMonth();
    date.setMonth(current + 3)
    return date;
}