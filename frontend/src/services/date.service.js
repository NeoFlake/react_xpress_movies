import dayjs from "dayjs";
import "dayjs/locale/fr.js";

dayjs.locale("fr");

const formatToHumanReading = (isoDate) => {
    return dayjs(isoDate).format("dddd D MMMM YYYY");
}

const formatToService = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
}

export default { formatToHumanReading, formatToService };