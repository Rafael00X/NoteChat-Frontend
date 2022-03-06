import moment from "moment";

function getHourAndMinute(time) {
    return moment(time).local().format("HH:mm");
}

function getDate(time) {
    return moment(time).local().format("DD-MM-YYYY");
}

export { getHourAndMinute, getDate };
