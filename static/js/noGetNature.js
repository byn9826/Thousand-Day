export default function noGetNature(value) {
    value = parseInt(value);
    switch (value) {
        case 0:
            return "cute";
            break;
        case 1:
            return "strong";
            break;
    }
}