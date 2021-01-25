const formatDate = (date) => {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var ddate = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear()
    return ddate + ' ' + months[month - 1] + ' ' + year ;
}

const nextDate = (selectedDate) => {
    var datevar = new Date(selectedDate)
    datevar.setDate(datevar.getDate() + 1)
    console.log('date is ', formatDate(datevar))
    return formatDate(datevar)
}
const previousDate = (selectedDate) => {
    var datevar = new Date(selectedDate)
    datevar.setDate(datevar.getDate() -1)
    console.log('date is ', formatDate(datevar))
    return formatDate(datevar)
}
exports.formatDate = formatDate
exports.nextDate = nextDate
exports.previousDate = previousDate