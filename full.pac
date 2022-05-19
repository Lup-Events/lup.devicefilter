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
        || host == "zzz.events" || shExpMatch(host, "*.zzz.events")) { // Staging
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
    
    // Lup Short 2
    if (host == "lup.bz" || shExpMatch(host, "*.lup.bz")) {
        return "DIRECT";
    }

    // ------------------ APP TESTING ------------------
    // Microsoft App Center
    if (host == "appcenter.ms" || shExpMatch(host, "*.appcenter.ms")) {
        return "DIRECT";
    }


    // ------------------ DEVICE MANAGEMENT ------------------

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
        || shExpMatch(host, "*.vendhq.com")
        || host == "vendfrontendassets.freetls.fastly.net"
        || host == "vendappcdn.global.ssl.fastly.net"
        || host == "cdn.raygun.io") {
        return "DIRECT";
    }


    // ------------------ TYRO ------------------
    // Based on https://help.tyro.com/s/article/What-are-the-Network-connectivity-requirements-so-set-up-my-Tyro-Terminal
    if (host == "tyro.com"
        || shExpMatch(host, "*.tyro.com")
    ) {
        return "DIRECT";
    }


    // ------------------ TESTING & DEBUGGING ------------------
    if (host == "asdf.com"
        || host == "speedtest.net") {
        return "DIRECT";
    }


    // ------------------ FIREBASE (PEOPLE COUNTER) ------------------
    if (host == "accounts.google.com"
        || shExpMatch(host, "*.googleapis.com")
        || shExpMatch(host, "*.firebaseio.com")) {
        return "DIRECT";
    }


    // ------------------ SQUARE ------------------
    // Based on https://squareup.com/help/au/en/article/6537-square-terminal-troubleshooting
    if (host == "squareup.com"
        || host == "issquareup.com"
        || host == "squarecdn.com"
        || host == "api.skyhookwireless.com"
        || host == "notify.bugsnag.com"
        || host == "apytiqcuyrsq6-ats.iot.us-east-2.amazonaws.com"
        || shExpMatch(host, "*.squareup.com")
        || shExpMatch(host, "*.issquareup.com")
        || shExpMatch(host, "*.squarecdn.com")) {
        return "DIRECT";
    }


    // ------------------ FAST.COM ------------------
        if (host == "fast.com"
        || shExpMatch(host, "*.fast.com")
        || shExpMatch(host, "*.nflxvideo.net")) {
        return "DIRECT";
    }


    // ------------------ MISC ------------------
    if (host == "code.jquery.com"
        || host == "fonts.googleapis.com"
        || host == "cdnjs.cloudflare.com"
        || host == "s3-ap-southeast-2.amazonaws.com"
        || host == "ssl.google-analytics.com"
        || host == "fonts.gstatic.com") {
        return "DIRECT";
    }


    // ------------------ BIT.LY ------------------
    if (host == "bit.ly") {
        return "DIRECT";
    }
    

    // ------------------ QR.IO ------------------
    if (host == "qr.io") {
        return "DIRECT";
    }


    // ------------------ SENSIS ------------------
    if (host == "api.sensisdata.com.au") {
        return "DIRECT";
    }
    

    // ------------------ RX ------------------
    if (host == "rxweb-pre.com" 
        || shExpMatch(host, "*.rxweb-pre.com")
        || host == "rxweb.com" // Guessed this host
        || shExpMatch(host, "*.rxweb.com")) { // Guessed this host
        return "DIRECT";
    }
    

    // ------------------ LOCAL NETWORK ------------------
    // Crass approximation of https://www.arin.net/reference/research/statistics/address_filters/
    if (host.startsWith("192.168.")
        || host.startsWith("172.")
        || host.startsWith("10.")) {
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
