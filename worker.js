/**
 * Redirect requests to the Lup Device Filter GitHub project (https://github.com/Lup-Events/lup.devicefilter)
 */

async function handleRequest(request) {
  // Patch request
  const url = new URL(request.url)
  url.hostname = "raw.githubusercontent.com";
  url.pathname = "/Lup-Events/lup.devicefilter/main" + url.pathname;

  // Make request
  var response = await fetch(url.toString(), request);

  // If PAC file, correct content-type
  if(response.status == 200 && response.url.endsWith(".pac")){
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      headers: {
        "content-type":"application/x-ns-proxy-autoconfig"
      }
    });
  }

  return response;
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
