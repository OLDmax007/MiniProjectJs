export function toUpperFirstChar(word) {
    if (!word) {
        throw new Error('Invalid input');
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
}
