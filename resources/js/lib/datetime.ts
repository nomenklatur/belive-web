import { format, formatDistance } from "date-fns";
import { id } from "date-fns/locale";

export function formatToDateTime(date: any) {
    date = new Date(date);
    return format(date, "MM/dd/yyyy p");
}

export function formatToDate(date: any) {
    date = new Date(date);
    return format(date, "MM/dd/yyyy", { locale: id });
}

export function formatToDateString(date: any) {
    date = new Date(date);

    return format(date, "LLL d, y",  { locale: id });
}

export function toWhenAgo(date: any) {
    return formatDistance(date, new Date(), { addSuffix: true, locale: id });
}

export function formatToTime(date: any) {
    date = new Date(date);
    return format(date, "p",  { locale: id });
}

export function formatToIndonesiaDateString(date: any) {
    date = new Date(date);
    return format(date, "d MMMM yyyy", { locale: id });
}

export function formatToDateTimeString(date: any) {
    date = new Date(date);
    return format(date, "MM/dd/yyyy HH:mm",  { locale: id })
}