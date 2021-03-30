/**
 * Proxy auto-config filtering script. This script minimises device's data usage by redirecting all APPLE IOS UPDATES to a non-existant proxy server.
 * For a basic understanding of proxy auto-config see https://en.wikipedia.org/wiki/Proxy_auto-config
 * For a developers reference see https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_PAC_file
 * Use this tool to check syntax if needed https://app.thorsen.pm/proxyforurl
 */

function FindProxyForURL(url, host) {
    // Block iOS updates
    if (host == "mesu.apple.com"
        || host == "appldnld.apple.com"
        || host == "updates-http.cdn-apple.com"
        || host == "updates.cdn-apple.com") {
        return "PROXY 127.0.0.1:8080";
    }

    // Allow everything else
    return "DIRECT";
}