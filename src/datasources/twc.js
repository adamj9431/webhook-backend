
const axios = require('axios')

const API_BASE = 'https://api.weather.com'

// Get the API key from the enviornment variable TWC_API_KEY
const TWC_API_KEY = process.env.TWC_API_KEY
if (!TWC_API_KEY) {
    console.warn("WARNING: Environment value TWC_API_KEY is not set!")
}
const MEASUREMENT_UNITS = {
    IMPERIAL: 'e',
    METRIC: 'm',
    HYBRID: 'h'
}
module.exports.units = MEASUREMENT_UNITS;


/**
 * TWC Current Conditions
 * See https://weather.com/swagger-docs/ui/sun/v3/sunV3CurrentsOnDemand.json
 * @param {Object} args
 * @param {string} args.postalCode - Postal code for desired location
 * @param {string} args.countryCode - Two-letter country code for desired location
 * @param {string} [args.units=twc.units.IMPERIAL]  - One of twc.units.IMPERIAL, twc.units.METRIC, twc.units.HYBRID
 * @param {string} [args.language=en-US] - Language code 
 */
module.exports.current_conditions = async function(args) {
    const { postalCode, countryCode, units = MEASUREMENT_UNITS.IMPERIAL, language = 'en-US' } = args;
    // call external API
    try {
        const result = await axios.get(`${API_BASE}/v3/wx/observations/current`, {
            params: {
                postalKey: `${postalCode}:${countryCode}`,
                units: units,
                language: language,
                format: 'json',
                apiKey: TWC_API_KEY
            }
        })
        return result.data
    } catch(e) {
        console.error("Error when calling API using inputs:", args)
        throw e
    }
}

/**
 * TWC Daily Forecast
 * See https://docs.google.com/document/d/1RY44O8ujbIA_tjlC4vYKHKzwSwEmNxuGw5sEJ9dYjG4/edit
 * @param {Object} args
 * @param {string} args.postalCode - Postal code for desired location
 * @param {string} args.countryCode - Two-letter country code for desired location
 * @param {Number} [args.days=7] - Number of future days to return
 * @param {string} [args.units=twc.units.IMPERIAL]  - One of twc.units.IMPERIAL, twc.units.METRIC, twc.units.HYBRID
 * @param {string} [args.language=en-US] - Language code 
 */
module.exports.forecast = async function(args) {
    const { postalCode, countryCode, days = 3, units = MEASUREMENT_UNITS.IMPERIAL, language = 'en-US' } = args;
    try {
        const postalKey = `${postalCode}:4:${countryCode}`
        const result = await axios.get(`${API_BASE}/v3/wx/forecast/daily/${days}day`, {
            params: {
                postalKey: `${postalCode}:${countryCode}`,
                units: units,
                language: language,
                format: 'json',
                apiKey: TWC_API_KEY
            }
        })
        return result.data
    } catch(e) {
        console.error("Error when calling API using inputs:", args)
        throw e
    }
}

/**
 * Get weather URL for postal code (supports only US ZIP)
 * @param {Object} args
 * @param {string} args.postalCode - Postal code for desired location
 */
module.exports.url = function(args) {
    const { postalCode } = args;

    if (!postalCode.match(/^[0-9]{5}$/)) {
        throw new Error("Malformed postalCode, currently only US five-digit ZIP codes are supported!")
    }
    return `https://weather.com/weather/today/l/${postalCode}`
}