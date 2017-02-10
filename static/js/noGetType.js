export default function noGetType(value) {
    value = parseInt(value);
    switch (value) {
        case 0:
            return "dog";
            break;
        default:
            return "unKnown";
            break;
    }
}