import dayjs from "dayjs";

export const TIME_FORMAT = 'HH:mm';
export const TIME_VERBOSE_FORMAT = 'HH:mm:ss';

export const parseTime = (time)=>{
    const reg = /(\d\d):(\d\d)/;
    const match = reg.exec(time);
    if(match){
        const h = parseInt(match[1]);
        const m = parseInt(match[2]);
        if(0 <= h && h <= 23 && 0 <= m && m <= 59) {
            return {h, m};
        }
    }
    return {};
}

export const duration = (start, end = dayjs().format(TIME_FORMAT))=>{
    const {h:sh, m:sm} = parseTime(start);
    const {h:eh, m:em} = parseTime(end);
    return (eh - sh) * 60 * 60 + (em - sm) * 60;
}