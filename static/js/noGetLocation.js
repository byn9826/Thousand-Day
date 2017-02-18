export default function noGetLocation(value) {
    value = parseInt(value);
    switch (value) {
        case 0:
            return "North America";
            break;
        case 1:
            return "East America";
            break;
        default:
            return "Other";
    }
}