/**
 * Proxy auto-config filtering script. This script minimises device's data usage by redirecting all traffic not white-listed to a non-existant proxy server.
 * For a basic understanding of proxy auto-config see https://en.wikipedia.org/wiki/Proxy_auto-config
 * For a developers reference see https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_PAC_file
 * Use this tool to check syntax if needed https://app.thorsen.pm/proxyforurl
 */

function FindProxyForURL(url, host) {
    // ------------------  LUP CORE ------------------
    // Lup Platform
    if (host == "lup.events" || shExpMatch(host, "*.lup.events") || // Production
        host == "lupstaging.events" || shExpMatch(host, "*.lupstaging.events")) { // Staging
        return "DIRECT";
    }

    // Lup Short
    if (host == "lup.to" || shExpMatch(host, "*.lup.to")) {
        return "DIRECT";
    }

    // Lup Legacy
    if (host == "lup.com.au" || shExpMatch(host, "*.lup.com.au")) {
        return "DIRECT";
    }

    // Lup Super-legacy
    if (host == "exponews.com.au" || shExpMatch(host, "*.exponews.com.au")) {
        return "DIRECT";
    }

    // Lup App library (via apps.lup.com.au)
    if (host == "lupmarvinthemartianprodu.blob.core.windows.net" ||
        host == "lupmarvinthemartianprlgy.blob.core.windows.net") { // NOTE this is different from the line above.
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
    if (host == "meraki-apac.s3.amazonaws.com" || shExpMatch(host, "*.s3.amazonaws.com") || shExpMatch(host, "*.amazonaws.com")) { // Yep, this is super broad and stinks, but fit for purpose
        return "DIRECT";
    }

    // ------------------ APPLE ------------------
    // Based on  https://support.apple.com/en-us/HT210060
    // Note that non-proxy addresses are included, as they are being used via proxy!

    // Apple device setup
    if (host == "albert.apple.com" ||
        host == "captive.apple.com" || // Internet connectivity validation for networks that use captive portals.
        host == "gs.apple.com" ||
        host == "humb.apple.com" ||
        host == "static.ips.apple.com" ||
        host == "sq-device.apple.com" || // eSIM activation
        host == "tbsc.apple.com" ||
        host == "time-ios.apple.com" || // Used by devices to set their date and time
        host == "time.apple.com" || // Used by devices to set their date and time
        host == "time-macos.apple.com" // Used by devices to set their date and time
    ) {
        return "DIRECT";
    }

    // Apple device management
    if (host == "push.apple.com" || shExpMatch(host, "*.push.apple.com") || // Push notifications
        host == "gdmf.apple.com" || // Used by an MDM server to identify which software updates are available to devices that use managed software updates
        host == "deviceenrollment.apple.com" || // DEP provisional enrollment
        host == "deviceservices-external.apple.com" ||
        host == "identity.apple.com" || // APNs certificate request portal.
        host == "iprofiles.apple.com" || // Hosts enrollment profiles used when devices enroll in Apple School Manager or Apple Business Manager through Device Enrollment
        host == "mdmenrollment.apple.com" || // MDM servers to upload enrollment profiles used by clients enrolling through Device Enrollment in Apple School Manager or Apple Business Manager, and to look up devices and accounts.
        host == "setup.icloud.com" || // Required to log in with a Managed Apple ID on Shared iPad
        host == "vpp.itunes.apple.com" // MDM servers to perform operations related to Apps and Books, like assigning or revoking licenses on a device.
    ) {
        return "DIRECT";
    }

    // Apple Business Manager
    if (host == "business.apple.com" || shExpMatch(host, "*.business.apple.com") || // Apple Business Manager
        host == "isu.apple.com") {
        return "DIRECT";
    }

    // Software update - DENIED!!
    if (host == "appldnld.apple.com" || // iOS updates
        host == "configuration.apple.com" || // Rosetta 2 updates
        host == "gg.apple.com" || // iOS, tvOS, and macOS update
        host == "gnf-mdn.apple.com" || // macOS updates
        host == "gnf-mr.apple.co" || // macOS updates
        host == "gs.apple.com" || // macOS updates	
        host == "ig.apple.com" || // macOS updates	
        host == "mesu.apple.com" || // Hosts software update catalogs
        host == "ns.itunes.apple.com" ||
        host == "oscdn.apple.com" || // macOS Recovery
        host == "osrecovery.apple.com" || // macOS Recovery
        host == "skl.apple.com" || // macOS updates	
        host == "swcdn.apple.com" || // macOS updates	
        host == "swdist.apple.com" || // macOS updates	
        host == "swdownload.apple.com" || // macOS updates
        host == "swpost.apple.com" || // macOS updates
        host == "swscan.apple.com" || // macOS updates
        host == "updates-http.cdn-apple.com" ||
        host == "updates.cdn-apple.com" //||
        //host == "xp.apple.com"
    ) {
        return "PROXY 127.0.0.1:8080"; // NOTE!!! Explicitly blackholed, so it doesn't taint debugging logging
    }

    // Apple App store
    if (host == "itunes.apple.com" || shExpMatch(host, "*.itunes.apple.com") || // Store content such as apps, books, and music
        host == "apps.apple.com" || shExpMatch(host, "*.apps.apple.com") || // Store content such as apps, books, and music
        host == "mzstatic.com" || shExpMatch(host, "*.mzstatic.com") || // Store content such as apps, books, and music
        host == "itunes.apple.com" || // Apple enterprise verification
        host == "ppq.apple.com" // Enterprise App validation
    ) {
        return "DIRECT";
    }

    // Content caching
    if (host == "lcdn-registration.apple.com" || // Content caching server registration
        host == "serverstatus.apple.com") { // Content caching client public IP determination
        return "DIRECT";
    }

    // App validation
    if (host == "appattest.apple.com" || shExpMatch(host, "*.appattest.apple.com")) {
        return "DIRECT";
    }

    // Apple Feedback Assistant
    if (host == "fba.apple.com" || // Used by Feedback Assistant to file and view feedback
        host == "cssubmissions.apple.com" || // Used by Feedback Assistant to upload files
        host == "bpapi.apple.com") { // Provides beta software updates
        return "DIRECT";
    }

    // Apple diagnostics
    if (host == "diagassets.apple.com") { // Used by Apple devices to help detect possible hardware issues
        return "DIRECT";
    }

    // Apple Domain Name System resolution
    if (host == "doh.dns.apple.com") { // Used for DNS over HTTPS (DoH)
        return "DIRECT";
    }

    // Apple certificate validation 
    if (
        host == "crl.apple.com" || // Added even though apparently it doesn't have proxy support - it's being used still!
        host == "crl.entrust.net" || // Added even though apparently it doesn't have proxy support - it's being used still!
        host == "crl3.digicert.com" || // Added even though apparently it doesn't have proxy support - it's being used still!
        host == "crl4.digicert.com" || // Added even though apparently it doesn't have proxy support - it's being used still!
        host == "ocsp.apple.com" || // Added even though apparently it doesn't have proxy support - it's being used still!
        host == "ocsp.digicert.com" || // Added even though apparently it doesn't have proxy support - it's being used still!
        host == "ocsp.entrust.net" || // Added even though apparently it doesn't have proxy support - it's being used still!
        host == "ocsp.verisign.net" || // Added even though apparently it doesn't have proxy support - it's being used still!
        host == "valid.apple.com") {
        return "DIRECT";
    }

    // Junk
    if (host == "c.apple.news" || // Apple News ?
        shExpMatch(host, "*.ls.apple.com")) { // Apple Maps ??
        return "PROXY 127.0.0.1:8080"; // NOTE!!! Explicitly blackholed, so it doesn't taint debugging logging
    }

    // Mystery - these are called when attempting to install an app from the app store
    if (host == "smoot.apple.com" || shExpMatch(host, "*.smoot.apple.com") || // Spotlight search?
        host == "gateway.icloud.com" ||
        host == "pancake.apple.com" ||
        host == "tr.iadsdk.apple.com" ||
        host == "xp.apple.com") {
        return "DIRECT";
    }

    // ------------------ STRIPE ------------------
    // Based on https://stripe.com/docs/ips
    if (host == "stripe.com" ||
        shExpMatch(host, "*.stripe.com") ||
        shExpMatch(host, "*.stripe.network") ||
        shExpMatch(host, "*.device.stripe-terminal-local-reader.net")) {
        return "DIRECT";
    }

    // ------------------ TESTING & DEBUGGING ------------------
    if (host == "asdf.com" ||
        host == "speedtest.net") {
        return "DIRECT";
    }


    // ------------------ SUPERMASSIVE BLACK HOLE ------------------
    // Based on: https://www.youtube.com/watch?v=Xsp3_a-PMTw
    //return "PROXY 127.0.0.1:8080";
    return "PROXY hq.lup.events:8085"; // Diagnostic proxy - logs and denies requests
}
