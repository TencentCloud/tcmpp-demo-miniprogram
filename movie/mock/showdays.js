const moment = require('../utils/moment.min.js');

function getShowDays() {

    const dates = [
        {
            "date": "2024-08-09"
        },
        {
            "date": "2024-08-10"
        },
        {
            "date": "2024-08-11"
        },
        {
            "date": "2024-08-12"
        },
        {
            "date": "2024-08-13"
        },
        {
            "date": "2024-08-14"
        },
        {
            "date": "2024-08-15"
        }
    ];
    
    return {
        "code": 0,
        "data": {
            "dates": dates
        },
        "errMsg": "",
        "success": true
    }
}

module.exports = getShowDays();