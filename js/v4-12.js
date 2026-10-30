/* Guided Journey: native scroll updates a sticky diagram. No wheel hijacking. */
(function () {
  var root = document.querySelector("[data-journey]");
  if (!root) return;
  var visual = root.querySelector("[data-diagram]");
  var steps = Array.prototype.slice.call(root.querySelectorAll(".gj-step"));
  var dots = Array.prototype.slice.call(document.querySelectorAll("[data-dot]"));
  var phases = Array.prototype.slice.call(document.querySelectorAll("[data-phase-pip]"));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) document.documentElement.classList.add("motion-ok");

  function activate(step) {
    var n = String(step);
    if (visual) {
      visual.dataset.step = n;
      visual.querySelectorAll("[data-n]").forEach(function (node) {
        node.classList.toggle("is-on", Number(node.getAttribute("data-n")) <= Number(n));
      });
    }
    steps.forEach(function (item) {
      item.classList.toggle("is-active", item.getAttribute("data-step") === n);
    });
    dots.forEach(function (dot) {
      dot.classList.toggle("is-on", Number(dot.getAttribute("data-dot")) <= Number(n));
    });
    var phase = n < 3 ? 1 : n < 6 ? 2 : n < 7 ? 3 : 4;
    phases.forEach(function (pip) {
      pip.classList.toggle("is-on", Number(pip.getAttribute("data-phase-pip")) <= phase);
    });
  }

  if (!reduce && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activate(entry.target.getAttribute("data-step"));
      });
    }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });
    steps.forEach(function (step) { observer.observe(step); });
  } else {
    activate("8");
  }

  var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-view-tab]"));
  function selectTab(tab) {
    tabs.forEach(function (item) {
      var on = item === tab;
      item.setAttribute("aria-selected", on ? "true" : "false");
      item.tabIndex = on ? 0 : -1;
    });
    root.dataset.view = tab.getAttribute("data-view-tab");
  }
  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      var next = event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      selectTab(tabs[next]);
    });
  });
}());
