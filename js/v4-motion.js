/* Progressive reveals for concepts 09–12. Content stays visible if JS does not run. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  function inView(node) {
    var rect = node.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.92 && rect.bottom > 40;
  }

  nodes.forEach(function (node) {
    if (inView(node)) node.classList.add("is-in");
  });

  document.documentElement.classList.add("motion-ok");

  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (node) { node.classList.add("is-in"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.22, rootMargin: "0px 0px -8% 0px" });

  nodes.forEach(function (node) {
    if (!node.classList.contains("is-in")) observer.observe(node);
  });
}());
