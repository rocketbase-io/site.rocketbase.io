// {% raw %}

window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#efefef",
      "text": "#404040"
    },
    "button": {
      "background": "transparent",
      "text": "#8ec760",
      "border": "#8ec760"
    }
  },
  "content": {
    "message": "Wir verwenden Cookies, um Ihnen ein besseres Online Erlebnis anbieten zu können. Indem Sie \"OK\" anklicken ohne Ihre Cookie Einstellungen zu verändern, geben Sie uns Ihre Einwilligung Cookies zu verwenden.",
    "dismiss": "Ok",
    "link": "Mehr Infos",
    "href": "https://www.rocketbase.io/privacy"
  }
});

var gaProperty = 'UA-72837925-1';
var disableStr = 'ga-disable-' + gaProperty;
if (document.cookie.indexOf(disableStr + '=true') > -1) {
  window[disableStr] = true;
}
function gaOptout() {
  document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  window[disableStr] = true;
}
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', gaProperty, 'auto');
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');

// {% endraw %}
