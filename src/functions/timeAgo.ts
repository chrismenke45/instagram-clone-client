import pluralize from "./pluralize";

const timeAgo = (date: string, weeks?: boolean): string => {
    let theDate = new Date(date);
    let theDateSec = theDate.getTime() / 1000
    let currentDateSec = Date.now() / 1000
    let differenceInSec = currentDateSec - theDateSec
    if (differenceInSec < 60 * 60 * 24 * 3) {
        if (differenceInSec < 60 * 60 * 24) {
            if (differenceInSec < 60 * 60) {
                return `${pluralize(Math.ceil(differenceInSec / 60), "minute")} ago`
            } else {
                return `${pluralize(Math.ceil(differenceInSec / 60 / 60), "hour")} ago`
            }
        } else {
            return `${pluralize(Math.ceil(differenceInSec / 60 / 60 / 24), "day")} ago`
        }
    } else {
        if (weeks) {
            return `${pluralize(Math.ceil(differenceInSec / 60 / 60 / 24 / 7), "week")} ago`
        } else {
            return theDate.toLocaleDateString('en-us', { month:"long", day:"numeric", year:"numeric"})
        }
         
    }
}
export default timeAgo