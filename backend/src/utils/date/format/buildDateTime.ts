export function buildDateTime(dateString: string, timeString: string): Date {
    return new Date(`${dateString}T${timeString}:00`);
}