addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * 
 * @param {Request} request
 */
const url = "https://cfw-takehome.developers.workers.dev/api/variants"

class ElementHandler {
  element(element) {
    var tagname = element.tagName;
    switch (tagname) {
      case 'title':
        element.setInnerContent('Custom Variant: ' + (random + 1));
        break;
      case 'h1':
        if (element.getAttribute('id') == 'title') {
          element.setInnerContent('Custom Variant: ' + (random + 1));
        }
        break;
      case 'p':
        if (element.getAttribute('id') == 'description') {
          element.setInnerContent('Perception is reality, alter your thoughts, alter your reality');
        }
        break;
      case 'a':
        if (element.getAttribute('id') == 'url') {
          element.setInnerContent('Let\'s redirect to GitHub!');
          element.setAttribute('href', 'https://github.com/amywangg');
        }
        break;
    }
  }
}

async function handleRequest(request) {
  // fetch variants
  result = await fetch(url)
  response = await result.json()
  random = Math.random() < 0.5 ? 0 : 1;
  varianturl = response.variants[random];

  // randomly choose a variant to render
  variant = await fetch(varianturl)
  html = await variant.text()
  res = new Response(html, {
    method: 'GET',
    headers : {'content-type': 'text/html'}
  });
// alter text with HTMLRewriter
  return new HTMLRewriter().on('*', new ElementHandler(random)).transform(res);

}

