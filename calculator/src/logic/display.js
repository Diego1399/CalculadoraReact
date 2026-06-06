export default function formatDisplay(value) {
    if (typeof value === 'string') return value;
    const cleaned = parseFloat(value.toFixed(10));
    const str = cleaned.toString();
    return str.length > 12 ? cleaned.toExponential(4) : str;
}
