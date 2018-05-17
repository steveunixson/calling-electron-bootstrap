require('dotenv').config()

if (process.env.NODE_ENV === 'PACKAGE'){
    module.exports = {
        "beeline"    : "https://some-domain.com/api/",
        "baseurl"           : "https://api.bonobo-systems.com/",
        "timeout"    : 1000,
    }
} else {
    module.exports = {
        "beeline"    : "https://some-domain.com/api/",
        "baseurl"           : "http://localhost:8001/",
        "timeout"    : 1000,
    }
}

