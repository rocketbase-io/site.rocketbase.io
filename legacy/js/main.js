// {% raw %}
// Event DOM ready
var callback = function(){
  // trigger events on Dom ready.

  // ===========
  // Navbar Menu
  // ===========
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });

      $el.onkeydown = function(evt) {
        evt = evt || window.event;
        var isEnter = false;
        var isEscape = false;
        if ("key" in evt) {
          isEnter = (evt.key == "Enter" || evt.key == "Ent");
          isEscape = (evt.key == "Escape" || evt.key == "Esc");
        } else {
          isEnter = (evt.keyCode == 13);
          isEscape = (evt.keyCode == 27);
        }
        if (isEnter) {
          // Get the target from the "data-target" attribute
          var target = $el.dataset.target;
          var $target = document.getElementById(target);

          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.add('is-active');
          $target.classList.add('is-active');
        }

        if (isEscape) {
          // Get the target from the "data-target" attribute
          var target = $el.dataset.target;
          var $target = document.getElementById(target);

          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.remove('is-active');
          $target.classList.remove('is-active');
        }
      };
    });
  }
};

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}
// {% endraw %}

