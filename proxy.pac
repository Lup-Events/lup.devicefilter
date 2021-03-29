function FindProxyForURL(url, host) {
    // Platform system
    if (host == "lup.events" || shExpMatch(host, "*.lup.events") ||
        host == "lupstaging.events" || shExpMatch(host, "*.lupstaging.events")){
		    return "DIRECT";
    }
  
    // Short domain
	  if (host == "lup.to" || shExpMatch(host, "*.lup.to")){
		  return "DIRECT";
    }

    // Legacy system
	  if (host == "lup.com.au" || shExpMatch(host, "*.lup.com.au")){
		  return "DIRECT";
    }

    // Super legacy system
    if (host == "exponews.com.au" || shExpMatch(host, "*.exponews.com.au")){
		  return "DIRECT";
    }

    // Lup app install (if done manually)
    if (host == "lupmarvinthemartianprodu.blob.core.windows.net" ||
        host == "lupmarvinthemartianprlgy.blob.core.windows.net"){
      return "DIRECT";
    }

    // App Center
    if (host == "appcenter.ms" || shExpMatch(host, "*.appcenter.ms")){
        return "DIRECT";
    }

    // Meraki MDM
    if (host == "meraki.com" || shExpMatch(host, "*.meraki.com")){
        return "DIRECT";
    }

    // Meraki MDM app install (automatic app deployments)
    if (host == "meraki-apac.s3.amazonaws.com" || shExpMatch(host, "*.s3.amazonaws.com") || shExpMatch(host, "*.amazonaws.com")){ // Yep, this is super broad and stinks, but fit for purpose
      return "DIRECT";
    }

    // Cambium APs cloud management
    if (host == "cloud.cambiumnetworks.com" || host == "s3.amazonaws.com"){
      return "DIRECT";
    }

    // Apple device setup https://support.apple.com/en-us/HT210060
    if (host == "albert.apple.com" ||
        host == "captive.apple.com" || // Internet connectivity validation for networks that use captive portals.
        host == "gs.apple.com" ||
        host == "humb.apple.com" ||
        host == "static.ips.apple.com" ||
        host == "tbsc.apple.com" ||
        host == "time-ios.apple.com" || // Used by devices to set their date and time
        host == "time.apple.com" || // Used by devices to set their date and time
        host == "time-macos.apple.com" // Used by devices to set their date and time
      ){
      return "DIRECT";
    }

    // Apple device management https://support.apple.com/en-us/HT210060
    if (shExpMatch(host, "*.push.apple.com") || // Push notifications
        host == "deviceenrollment.apple.com" || // DEP provisional enrollment.
        host == "deviceservices-external.apple.com" ||
        host == "identity.apple.com" || // APNs certificate request portal.
        host == "iprofiles.apple.com" || // Hosts enrollment profiles used when devices enroll in Apple School Manager or Apple Business Manager through Device Enrollment
        host == "mdmenrollment.apple.com" || // MDM servers to upload enrollment profiles used by clients enrolling through Device Enrollment in Apple School Manager or Apple Business Manager, and to look up devices and accounts.
        host == "setup.icloud.com" || // Required to log in with a Managed Apple ID on Shared iPad.
        host == "vpp.itunes.apple.com" // MDM servers to perform operations related to Apps and Books, like assigning or revoking licenses on a device.
      ){
      return "DIRECT";
    }

    // Apple App store - INTENTIONALLY OMITTING CONTENT URLs! https://support.apple.com/en-us/HT210060
    if (host == "itunes.apple.com" ||
        host == "ppq.apple.com" // Apple enterprise verification
      ){
      return "DIRECT";
    }

    // Apple certificate validation https://support.apple.com/en-us/HT210060
    if (host == "crl.apple.com" ||
      host == "crl.entrust.net" ||
      host == "crl3.digicert.com" ||
      host == "crl4.digicert.com" ||
      host == "ocsp.apple.com" ||
      host == "ocsp.digicert.com" ||
      host == "ocsp.entrust.net" ||
      host == "ocsp.verisign.net"
      ){
      return "DIRECT";
    }

    // Stripe - used for CC payments on Lup's ticketing site https://stripe.com/docs/ips
    if (host == "stripe.com" ||
      shExpMatch(host, "*.stripe.com") ||
      shExpMatch(host, "*.stripe.network") ||
      shExpMatch(host, "*.device.stripe-terminal-local-reader.net")){
      return "DIRECT";
    }
  
    // App Store
    if (shExpMatch(host, "*.itunes.apple.com") || // Store content such as apps, books and music
      shExpMatch(host, "*.apps.apple.com") || // Store content such as apps, books and music
      shExpMatch(host, "*.mzstatic.com") || // Store content such as apps, books and music
      shExpMatch(host, "itunes.apple.com") ||
      shExpMatch(host, "ppq.apple.com")){ // Enterprise App validation
      return "DIRECT";
    }
  
    // Apple Business Manager
    if (shExpMatch(host, "*.business.apple.com") || // Apple Business Manager
      shExpMatch(host, "isu.apple.com")){
      return "DIRECT";
    }

    // Testing
    if (host == "asdf.com" || host == "speedtest.net"){
        return "DIRECT";
    }

    // Otherwise blackhole the request
    return "PROXY 127.0.0.1:8080";
	  //return "PROXY proxy.example.com:8080; DIRECT";
}
