import geoip2 from 'geoip2'

geoip2.init();

module.exports = geoip2.lookupSync