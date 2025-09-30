import dayjs from "dayjs";
import "dayjs/locale/fr.js";

dayjs.locale("fr");

const formatToHumanReading = (isoDate: string) => {
    return dayjs(isoDate).format("dddd D MMMM YYYY");
}

const formatToService = (date: string) => {
    return dayjs(date).format("YYYY-MM-DD");
}

export default { formatToHumanReading, formatToService };