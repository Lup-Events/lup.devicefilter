/**
 * Proxy auto-config filtering script. This script minimises device's data usage by redirecting all traffic not white-listed to a non-existant proxy server.
 * For a basic understanding of proxy auto-config see https://en.wikipedia.org/wiki/Proxy_auto-config
 * For a developers reference see https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_PAC_file
 * Use this tool to check syntax if needed https://app.thorsen.pm/proxyforurl
 */

function FindProxyForURL(url, host) {
    // Block iOS updates - this should never be removed, otherwise our data usage will be significant!
    if (host == "mesu.apple.com"
        || host == "appldnld.apple.com"
        || host == "updates-http.cdn-apple.com"
        || host == "updates.cdn-apple.com") {
        return "PROXY 127.0.0.1:8080";
    }

    // ------------------  LUP CORE ------------------
    // Lup Platform
    if (host == "lup.events" || shExpMatch(host, "*.lup.events")// Production
        || host == "lupstaging.events" || shExpMatch(host, "*.lupstaging.events")) { // Staging
        return "DIRECT";
    }

    // Lup Short
    if (host == "lup.to" || shExpMatch(host, "*.lup.to")) {
        return "DIRECT";
    }

    // Lup Legacy
    if (host == "lup.com.au" || shExpMatch(host, "*.lup.com.au")
        || host == "lup.co.nz" || shExpMatch(host, "*.lup.co.nz")) {
        return "DIRECT";
    }

    // Lup Super-legacy
    if (host == "exponews.com.au" || shExpMatch(host, "*.exponews.com.au")) {
        return "DIRECT";
    }

    // Lup App library (via apps.lup.com.au)
    if (host == "lupmarvinthemartianprodu.blob.core.windows.net"
        || host == "lupmarvinthemartianprlgy.blob.core.windows.net") { // NOTE this is different from the line above.
        return "DIRECT";
    }

    // ------------------ APP DEPLOYMENT AND TESTING ------------------
    // Microsoft App Center
    if (host == "appcenter.ms" || shExpMatch(host, "*.appcenter.ms")) {
        return "DIRECT";
    }

    // Meraki MDM
    if (host == "meraki.com" || shExpMatch(host, "*.meraki.com")) {
        return "DIRECT";
    }

    // Meraki MDM app deployment
    if (host == "meraki-apac.s3.amazonaws.com"
        || shExpMatch(host, "*.s3.amazonaws.com")
        || shExpMatch(host, "*.amazonaws.com")) { // Yep, this is super broad and stinks, but fit for purpose
        return "DIRECT";
    }

    // ------------------ APPLE ------------------
    // Based on  https://support.apple.com/en-us/HT210060

    if (shExpMatch(host, "*.apple.com")
        || shExpMatch(host, "*.*.apple.com")) { // This probably isn't needed - but didn't want to waste time checking
        return "DIRECT";
    }
    if (shExpMatch(host, "*.icloud.com")) {
        return "DIRECT";
    }

    // Store content
    if (host == "mzstatic.com" || shExpMatch(host, "*.mzstatic.com")) {
        return "DIRECT";
    }

    // Certificate validation
    if (shExpMatch(host, "*.entrust.net")
        || shExpMatch(host, "*.digicert.com")
        || shExpMatch(host, "*.verisign.net")
        || shExpMatch(host, "*.digicert.com")) {
        return "DIRECT";
    }


    // ------------------ STRIPE ------------------
    // Based on https://stripe.com/docs/ips
    if (host == "stripe.com"
        || shExpMatch(host, "*.stripe.com")
        || shExpMatch(host, "*.stripe.network")
        || shExpMatch(host, "*.device.stripe-terminal-local-reader.net")) {
        return "DIRECT";
    }

    // ------------------ VEND ------------------
    if (host == "vendhq.com"
        || shExpMatch(host, "*.vendhq.com")) { // According to their support it just needs "domainName.vendhq.com", however the cost of being narrow exceeds the time to correct - so going wide.
        return "DIRECT";
    }

    // ------------------ TESTING & DEBUGGING ------------------
    if (host == "asdf.com"
        || host == "speedtest.net") {
        return "DIRECT";
    }


    // ------------------ SUPERMASSIVE BLACK HOLE ------------------
    // Based on: https://www.youtube.com/watch?v=Xsp3_a-PMTw
    // Junk requests - skip logging
    if (host == "c.apple.news"
        || host == "calendars.icloud.com"
        || host == "apple-finance.query.yahoo.com") {
        return "PROXY 127.0.0.1:8080";
    }
    return "PROXY 127.0.0.1:8080";
    //return "PROXY hq.lup.events:8085"; // Diagnostic proxy - logs and denies requests
}
