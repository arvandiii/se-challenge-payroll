const calculatePayPeriod = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const isFirstHalf = day <= 15;

    return {
        startDate: new Date(year, month, isFirstHalf ? 1 : 16).toISOString().split('T')[0],
        endDate: new Date(year, month, isFirstHalf ? 15 : new Date(year, month + 1, 0).getDate()).toISOString().split('T')[0]
    };
}

const convertToDate = (dateString) => {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
}

module.exports = { calculatePayPeriod, convertToDate };