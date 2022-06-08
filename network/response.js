const success = (req, res, data, codeStatus) =>{
    res.status(codeStatus).json({
        data
    })
}

const error = (req, res, message, codeStatus) =>{
    res.status(codeStatus).json({
        message
    })
}

module.exports = {
    success,
    error
}
