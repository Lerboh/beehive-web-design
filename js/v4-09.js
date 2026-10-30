/* Kinetic Hive: line draw is CSS. This script only marks the active zone and a slight hex shift. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var net = document.querySelector("[data-network]");
  var mobile = window.matchMedia("(max-width: 800px)").matches;

  if (net && "IntersectionObserver" in window) {
    var zones = document.querySelectorAll("[data-zone]");
    var zoneObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) net.dataset.active = entry.target.dataset.zone;
      });
    }, { threshold: 0.45 });
    zones.forEach(function (zone) { zoneObserver.observe(zone); });
  }

  if (reduce || mobile) return;

  var layers = document.querySelectorAll("[data-depth]");
  if (!layers.length) return;
  var frame = 0;
  window.addEventListener("scroll", function () {
    if (frame) return;
    frame = window.requestAnimationFrame(function () {
      var y = window.scrollY || 0;
      layers.forEach(function (layer) {
        var depth = Number(layer.getAttribute("data-depth")) || 0;
        var shift = Math.max(-depth, Math.min(depth, ((y % 360) / 360) * depth - depth / 2));
        layer.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
      });
      frame = 0;
    });
  }, { passive: true });
}());
