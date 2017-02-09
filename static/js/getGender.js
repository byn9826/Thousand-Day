export default function getGender(value) {
    let gender;
    if (value === 0) {
        return "♂";
    } else {
        return "♀";
    }
}