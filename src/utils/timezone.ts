//时区：将获取到的UTC日期转换成当前时区的时间
import moment from 'moment';
let timeZone = localStorage.getItem('timeZone')

// 把时间字符串转成 当前店铺时区 的字符串
export function getTimeStringInSiteTimeZone(date) {
    //这个地方需要从localStorage重新取值，因为取上面的timeZone变量，会刷新不及时，需要手动刷新才会更新最新时区对应得值
    return moment.utc(date).tz(localStorage.getItem('timeZone')).format('YYYY-MM-DD HH:mm:ss')
}


// 把当前店铺时区的字符串 转换成 UTC时间字符串
export function transformTimeIntoUTC(date) {
    //这个地方需要从localStorage重新取值，因为取上面的timeZone变量，会刷新不及时，需要手动刷新才会更新最新时区对应得值
    return moment.tz(date, localStorage.getItem('timeZone')).utc().format('YYYY-MM-DD HH:mm:ss')
}
