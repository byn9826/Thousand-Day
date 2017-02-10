export default function noGetLocation(value) {
    value = parseInt(value);
    switch (value) {
        case 0:
            return "North America";
            break;
        default:
            return "Other";
    }
}