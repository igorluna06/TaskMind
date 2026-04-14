export function isValidTime(timeString: string): boolean {

    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

    return timeRegex.test(timeString);
}