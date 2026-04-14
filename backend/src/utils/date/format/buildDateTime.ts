export function buildDateTime(dateString: string, timeString: string): Date {

    const [year, month, day] = dateString.split('-').map(Number);
    const [hours, minutes] = timeString.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes);
}