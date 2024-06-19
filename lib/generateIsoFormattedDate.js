export function generateIsoFormattedDate(normalDate) {
    const dateTimeExpiryDate = new Date(normalDate).toISOString();
    return dateTimeExpiryDate
}