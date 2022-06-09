const toDay = () => {
    const date = new Date();
    return String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')) + "T00:00:00.000+00:00";
}

module.exports = toDay;