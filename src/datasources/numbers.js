
const axios = require('axios')

const API_BASE = 'http://numbersapi.com'

module.exports.get_trivia = async function({ number, fact_type='trivia' }) {
    
    // do input validation
    const VALID_FACT_TYPES = ['trivia', 'year', 'date', 'math'];
    if (!(VALID_FACT_TYPES.includes(fact_type))) {
        // fact_type is not a valid value
        const e = new Error(`Invalid value '${fact_type}' for parameter fact_type! Must be one of '${VALID_FACT_TYPES.join("', '")}'.`)
        e.status = 400
        throw e
    }
    if (!Number.isInteger(parseInt(number))) {
        const e = new Error(`Invalid value '${number}' for parameter number! Must be an integer.`)
        e.status = 400
        throw e
    }

    // call external API
    try {
        const result = await axios.get(`${API_BASE}/${number}/${fact_type}`)
        return result
    } catch(e) {
        console.error("Error when calling Numbers API using inputs:", { number, fact_type })
        throw e
    }
}