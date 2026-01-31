
/**
 * Pseudo-random string generator
 * http://stackoverflow.com/a/27872144/383904
 * Default: return a random alpha-numeric string
 * 
 * @param {Integer} len Desired length
 * @param {String} an Optional (alphanumeric), "a" (alpha), "n" (numeric)
 * @return {String}
 */
const randStr = function randomString(len, an) {
    an = an && an.toLowerCase();
    var str = "",
        i = 0,
        min = an == "a" ? 10 : 0,
        max = an == "n" ? 10 : 62;
    for (; i++ < len;) {
        var r = Math.random() * (max - min) + min << 0;
        str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
    }
    return str;
}
// console.log(randomString(10));      // i.e: "4Z8iNQag9v"
// console.log(randomString(10, "a")); // i.e: "aUkZuHNcWw"
// console.log(randomString(10, "n")); // i.e: "9055739230"

const User = function DataExt(db, callback) {
    db.all('SELECT * FROM migration ', [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        else {
            //            rows.forEach((row)=>{
            //                GetDBList.push(row);
            //             });

            return callback(err, rows);
            //		callback(err, rows);
        }

    });

}

const User1Line = function DataExt(db, uniq_str, callback) {
    db.each('select * from migration where ext_path = ? ', [uniq_str], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        else {
            //            rows.forEach((row)=>{
            //                GetDBList.push(row);
            //             });

            return callback(err, rows);
            //              callback(err, rows);
        }

    });

}

const SantyStr = function (var_string) {
    let noSpecialCharacters = var_string.replace(/[^a-zA-Z0-9]/g, '');
    let santy_space = noSpecialCharacters.replace(/  +/g, '-');
    let santy_str_low = santy_space.toLowerCase();
    return santy_str_low;
}
const SantyStr_keep_space = function (var_string) {
    let noSpecialCharacters = var_string.replace(/[^a-zA-Z0-9 ]/g, '');
    // let santy_space = noSpecialCharacters.replace(/  +/g, '-');
    // let santy_str_low = santy_space.toLowerCase();
    return noSpecialCharacters;
}
/**
 * Sanitize a URL.
 *
 * Source @braintree/sanitize-url
 * <https://github.com/braintree/sanitize-url>
 *
 * @param {string} url
 * @return {string}
 */
const SantyLink = function sanitizeUrl(url) {
    if (!url) {
        return "about:blank";
    }

    var invalidProtocolRegex = /^(%20|\s)*(javascript|data|vbscript)/im;
    var ctrlCharactersRegex = /[^\x20-\x7EÀ-ž]/gim;
    var urlSchemeRegex = /^([^:]+):/gm;
    var relativeFirstCharacters = [".", "/"];

    function _isRelativeUrlWithoutProtocol(url) {
        return relativeFirstCharacters.indexOf(url[0]) > -1;
    }

    var sanitizedUrl = url.replace(ctrlCharactersRegex, "").trim();
    if (_isRelativeUrlWithoutProtocol(sanitizedUrl)) {
        return sanitizedUrl;
    }

    var urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);
    if (!urlSchemeParseResults) {
        return sanitizedUrl;
    }

    var urlScheme = urlSchemeParseResults[0];
    if (invalidProtocolRegex.test(urlScheme)) {
        return "about:blank";
    }

    return sanitizedUrl;
}
const SantyEmail = function (var_string) {
    let noSpecialCharacters = var_string.replace(/[^a-zA-Z0-9@.]/g, '');
    // let santy_space = noSpecialCharacters.replace(/  +/g, '-');
    let santy_str_low = noSpecialCharacters.toLowerCase();
    return santy_str_low;
}
const rm_subdomain = function strip(url) {
    const fragments = url.split('.');
    const last = fragments.pop();
    try {
        // if its a valid url with a protocol (http/https)
        const instance = new URL(url);
        return `${instance.protocol}//${fragments.pop()}.${last}`;
    } catch (_) {
        return `${fragments.pop()}.${last}`;
    }
}
// strip('https://subdomain.example.com') // https://example.com
// strip('subdomain.example.com') // example.com
// strip('https://subdomain.another-subdomain.example.com') // https://example.com


module.exports = {
    randStr,
    User,
    User1Line,
    SantyStr,
    SantyStr_keep_space,
    SantyLink,
    SantyEmail,
    rm_subdomain,

};
