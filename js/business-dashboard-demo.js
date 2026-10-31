/* Demo dashboard only. No network calls.
   demoData is the shape a later GET /api/business/dashboard can replace. */
(function () {
  var STORAGE_KEY = "beehive-dashboard-sidebar";

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function money(amount) {
    var sign = amount < 0 ? "-" : "";
    var fixed = Math.abs(Number(amount) || 0).toFixed(2);
    if (fixed.slice(-3) === ".00") fixed = fixed.slice(0, -3);
    var parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return sign + "€" + parts.join(".");
  }

  function delta(value, label) {
    var down = value < 0;
    var arrow = down ? "↓" : "↑";
    return "<span class=\"delta" + (down ? " down" : "") + "\">" + arrow + " " + Math.abs(value).toFixed(1) + "% vs " + esc(label) + "</span>";
  }

  var demoData = {
    dashboardSummary: {
      activePartners: 24,
      pendingApplications: 7,
      customersFromPartners: 186,
      partnerSales: 12480,
      activeCampaigns: 3,
      rewards: 1860
    },
    phaseSummary: [
      { phase: 1, name: "Starter", partners: 8, text: "Joined, learning the rules and the approved range." },
      { phase: 2, name: "Active Ambassador", partners: 9, text: "Promoting and taking part in campaigns." },
      { phase: 3, name: "Partner", partners: 5, text: "A broader relationship after consistent activity." },
      { phase: 4, name: "Professional / Cash Partner", partners: 2, text: "A more formal commercial partnership." }
    ],
    programmeHealth: [
      { text: "24 active partners", view: "partners" },
      { text: "7 pending applications", view: "applications" },
      { text: "5 partners inactive 30+ days", view: "partners", status: "paused" },
      { text: "3 partners close to next phase", view: "phases" },
      { text: "2 active campaigns ending soon", view: "campaigns" }
    ],
    salesPerformance: {
      today: { net: 219.75, orders: 3, customers: 3, rewards: 32, refunds: 0, vs: "yesterday", delta: { net: 4.2, orders: 0, customers: 8 }, sales: [20, 35, 18, 42, 28, 76], ordersSeries: [0, 1, 0, 1, 0, 1], labels: ["9", "11", "13", "15", "17", "19"] },
      "7d": { net: 980, orders: 14, customers: 11, rewards: 140, refunds: 0, vs: "previous 7 days", delta: { net: 6.4, orders: 7.7, customers: 10 }, sales: [90, 120, 80, 160, 140, 175, 215], ordersSeries: [1, 2, 1, 2, 2, 3, 3], labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"] },
      "30d": { net: 2980, orders: 44, customers: 29, rewards: 430, refunds: 54, vs: "previous 30 days", delta: { net: 11.2, orders: 8.4, customers: 9.5 }, sales: [420, 510, 480, 560, 490, 520], ordersSeries: [6, 8, 7, 8, 7, 8], labels: ["W1", "W2", "W3", "W4", "W5", "W6"] },
      month: { net: 3150, orders: 48, customers: 31, rewards: 472, refunds: 89, vs: "previous month", delta: { net: 15.8, orders: 9.1, customers: 12 }, sales: [1120, 1540, 1890, 2060, 2720, 3150], ordersSeries: [22, 28, 31, 34, 40, 48], labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"] },
      all: { net: 12480, orders: 203, customers: 186, rewards: 1860, refunds: 360, vs: "prior year", delta: { net: 18.4, orders: 14.2, customers: 21 }, sales: [1120, 1540, 1890, 2060, 2720, 3150], ordersSeries: [22, 28, 31, 34, 40, 48], labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"] }
    },
    partners: [
      { id: "emma", name: "Emma Jansen", phase: 3, phaseName: "Partner", status: "active", isNew: false, joined: "2025-06-02", customers: 31, campaigns: ["October Wellness", "Green Juice introduction", "Sleep goal"], all: { orders: 36, gross: 2700, discounts: 120, net: 2480, refunds: 100, rewards: 370 }, month: { orders: 8, gross: 620, discounts: 30, net: 540, refunds: 50, rewards: 80 } },
      { id: "thomas", name: "Thomas de Wit", phase: 2, phaseName: "Active Ambassador", status: "active", isNew: false, joined: "2025-09-18", customers: 18, campaigns: ["Green Juice introduction", "October Wellness"], all: { orders: 20, gross: 1360, discounts: 80, net: 1240, refunds: 40, rewards: 180 }, month: { orders: 5, gross: 340, discounts: 20, net: 300, refunds: 20, rewards: 45 } },
      { id: "sophie", name: "Sophie Bakker", phase: 2, phaseName: "Active Ambassador", status: "active", isNew: false, joined: "2026-01-09", customers: 15, campaigns: ["October Wellness"], all: { orders: 16, gross: 1040, discounts: 40, net: 980, refunds: 20, rewards: 140 }, month: { orders: 4, gross: 260, discounts: 10, net: 230, refunds: 20, rewards: 35 } },
      { id: "lucas", name: "Lucas Meijer", phase: 1, phaseName: "Starter", status: "active", isNew: true, joined: "2026-10-20", customers: 6, campaigns: ["Green Juice introduction"], all: { orders: 6, gross: 360, discounts: 20, net: 340, refunds: 0, rewards: 40 }, month: { orders: 6, gross: 360, discounts: 20, net: 340, refunds: 0, rewards: 40 } },
      { id: "noah", name: "Noah Visser", phase: 4, phaseName: "Professional / Cash Partner", status: "active", isNew: false, joined: "2024-03-12", customers: 54, campaigns: ["October Wellness", "Green Juice introduction", "Sleep goal", "Omega week"], all: { orders: 62, gross: 4480, discounts: 210, net: 4120, refunds: 150, rewards: 640 }, month: { orders: 14, gross: 980, discounts: 40, net: 890, refunds: 50, rewards: 130 } },
      { id: "mila", name: "Mila Smit", phase: 3, phaseName: "Partner", status: "active", isNew: false, joined: "2025-04-28", customers: 27, campaigns: ["October Wellness", "Sleep goal", "Omega week"], all: { orders: 29, gross: 2000, discounts: 90, net: 1860, refunds: 50, rewards: 280 }, month: { orders: 7, gross: 480, discounts: 20, net: 420, refunds: 40, rewards: 60 } },
      { id: "julia", name: "Julia Vos", phase: 2, phaseName: "Active Ambassador", status: "paused", isNew: false, joined: "2025-02-11", customers: 4, campaigns: ["October Wellness"], all: { orders: 3, gross: 140, discounts: 10, net: 120, refunds: 10, rewards: 15 }, month: { orders: 0, gross: 0, discounts: 0, net: 0, refunds: 0, rewards: 0 } },
      { id: "omar", name: "Omar Demir", phase: 1, phaseName: "Starter", status: "active", isNew: true, joined: "2026-10-28", customers: 0, campaigns: [], all: { orders: 0, gross: 0, discounts: 0, net: 0, refunds: 0, rewards: 0 }, month: { orders: 0, gross: 0, discounts: 0, net: 0, refunds: 0, rewards: 0 } }
    ],
    orders: [
      { id: "NB-1048", partnerId: "emma", customer: "Anna de Boer", product: "Green Juice", value: 74.9, when: "Today", date: "31 Oct 2026", status: "Paid", campaign: "October Wellness" },
      { id: "NB-1047", partnerId: "noah", customer: "Jeroen Peters", product: "Magnesium Bisglycinaat", value: 54.95, when: "Yesterday", date: "30 Oct 2026", status: "Paid", campaign: "October Wellness" },
      { id: "NB-1046", partnerId: "thomas", customer: "Lisa Vermeer", product: "Green Juice + Visolie", value: 89.9, when: "Yesterday", date: "30 Oct 2026", status: "Paid", campaign: "Green Juice introduction" },
      { id: "NB-1045", partnerId: "sophie", customer: "Mark de Groot", product: "Collageen", value: 42.5, when: "27 Oct", date: "27 Oct 2026", status: "Paid", campaign: "October Wellness" },
      { id: "NB-1044", partnerId: "mila", customer: "Eva Mulder", product: "(Pro)Biotica", value: 36.95, when: "26 Oct", date: "26 Oct 2026", status: "Paid", campaign: "October Wellness" },
      { id: "NB-1043", partnerId: "lucas", customer: "Daan Hendriks", product: "Green Juice", value: 74.9, when: "25 Oct", date: "25 Oct 2026", status: "Processing", campaign: "Green Juice introduction" },
      { id: "NB-1042", partnerId: "noah", customer: "Sara Vos", product: "Visolie", value: 61, when: "24 Oct", date: "24 Oct 2026", status: "Paid", campaign: "October Wellness" },
      { id: "NB-1041", partnerId: "emma", customer: "Tim Kuipers", product: "Magnesium Bisglycinaat", value: 54.95, when: "23 Oct", date: "23 Oct 2026", status: "Paid", campaign: "Sleep goal" }
    ],
    applications: [
      { name: "Finn Kuipers", interest: "Content creation" },
      { name: "Noor Dijkstra", interest: "Coaching" },
      { name: "Sem Bakker", interest: "Social media" },
      { name: "Isa de Jong", interest: "Community" },
      { name: "Ruben Smit", interest: "Affiliate website" },
      { name: "Lotte van Dijk", interest: "Personal recommendations" },
      { name: "Bram Willems", interest: "Content creation" }
    ],
    campaigns: [
      { name: "October Wellness", status: "Active" },
      { name: "Green Juice introduction", status: "Active" },
      { name: "Sleep goal", status: "Scheduled" }
    ],
    products: ["Green Juice", "Magnesium Bisglycinaat", "(Pro)Biotica", "Visolie", "Collageen"],
    topPartners: [
      { name: "Noah Visser", sales: 4120, customers: 54 },
      { name: "Emma Jansen", sales: 2480, customers: 31 },
      { name: "Mila Smit", sales: 1860, customers: 27 },
      { name: "Thomas de Wit", sales: 1240, customers: 18 }
    ]
  };

  var state = {
    view: "overview",
    period: "month",
    trend: "sales",
    partnerPeriod: "all",
    quick: "all",
    phase: "all",
    status: "all",
    sales: "all",
    sort: "highest",
    query: "",
    drawerPartner: null,
    drawerTab: "overview"
  };

  var sidebar = document.querySelector("[data-sidebar]");
  var panel = document.querySelector("[data-panel]");
  var panelBody = document.querySelector("[data-panel-body]");
  var backdrop = document.querySelector("[data-backdrop]");
  var lastFocus = null;
  var partnerToolsReady = false;

  function metricsFor(partner) {
    if (state.partnerPeriod === "month") return partner.month;
    if (state.partnerPeriod === "all") return partner.all;
    var ratio = { today: 0.08, "7d": 0.22, "30d": 0.7 }[state.partnerPeriod] || 1;
    var source = partner.month;
    return {
      orders: Math.round(source.orders * ratio),
      gross: Math.round(source.gross * ratio),
      discounts: Math.round(source.discounts * ratio),
      net: Math.round(source.net * ratio),
      refunds: Math.round(source.refunds * ratio),
      rewards: Math.round(source.rewards * ratio)
    };
  }

  function passesQuick(partner, metrics) {
    if (state.quick === "1" && partner.phase !== 1) return false;
    if (state.quick === "2plus" && partner.phase < 2) return false;
    if (state.quick === "3plus" && partner.phase < 3) return false;
    if (state.quick === "4" && partner.phase !== 4) return false;
    if (state.quick === "sales" && metrics.net <= 0) return false;
    if (state.quick === "none" && metrics.net > 0) return false;
    if (state.quick === "new" && !partner.isNew) return false;
    return true;
  }

  function filteredPartners() {
    var query = state.query.trim().toLowerCase();
    var rows = demoData.partners.filter(function (partner) {
      var metrics = metricsFor(partner);
      if (state.phase !== "all" && String(partner.phase) !== state.phase) return false;
      if (state.status !== "all" && partner.status !== state.status) return false;
      if (state.sales === "has" && metrics.net <= 0) return false;
      if (state.sales === "none" && metrics.net > 0) return false;
      if (!passesQuick(partner, metrics)) return false;
      if (query && partner.name.toLowerCase().indexOf(query) === -1) return false;
      return true;
    });
    var sort = state.sort;
    rows.sort(function (a, b) {
      var am = metricsFor(a);
      var bm = metricsFor(b);
      if (sort === "newest") return b.joined.localeCompare(a.joined);
      if (sort === "oldest") return a.joined.localeCompare(b.joined);
      if (sort === "highest") return bm.net - am.net;
      if (sort === "lowest") return am.net - bm.net;
      if (sort === "orders") return bm.orders - am.orders;
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "phase") return b.phase - a.phase || a.name.localeCompare(b.name);
      return 0;
    });
    return rows;
  }

  function partnerName(id) {
    var found = demoData.partners.filter(function (partner) { return partner.id === id; })[0];
    return found ? found.name : id;
  }

  function chart(block) {
    var series = state.trend === "orders" ? block.ordersSeries : block.sales;
    var width = 560;
    var height = 168;
    var pad = 18;
    var max = Math.max.apply(null, series.concat([1]));
    var coords = series.map(function (value, index) {
      var x = pad + (series.length === 1 ? 0 : (index * (width - pad * 2)) / (series.length - 1));
      var y = height - 28 - (value / max) * (height - 46);
      return [x, y];
    });
    var line = coords.map(function (point) { return point[0] + "," + point[1]; }).join(" ");
    var area = line + " " + coords[coords.length - 1][0] + "," + (height - 28) + " " + coords[0][0] + "," + (height - 28);
    var labels = block.labels.map(function (label, index) {
      return "<text x=\"" + coords[index][0] + "\" y=\"" + (height - 8) + "\" text-anchor=\"middle\">" + esc(label) + "</text>";
    }).join("");
    return "<svg viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"Demo " + state.trend + " trend\">" +
      "<polygon class=\"fill\" points=\"" + area + "\"></polygon>" +
      "<polyline points=\"" + line + "\"></polyline>" + labels + "</svg>";
  }

  function periodControls() {
    var periods = [["today", "Today"], ["7d", "7 days"], ["30d", "30 days"], ["month", "This month"], ["all", "All time"]];
    return "<div class=\"periods\">" + periods.map(function (item) {
      return "<button type=\"button\" data-period=\"" + item[0] + "\" aria-pressed=\"" + (item[0] === state.period ? "true" : "false") + "\">" + item[1] + "</button>";
    }).join("") + "</div>";
  }

  function performanceBlock() {
    var block = demoData.salesPerformance[state.period];
    var average = block.orders ? block.net / block.orders : 0;
    return "<div class=\"perf\"><div><p class=\"demo-tag\">Demo data</p><div class=\"metrics\">" +
      "<p class=\"metric\"><span>Net partner sales</span><strong>" + money(block.net) + "</strong>" + delta(block.delta.net, block.vs) + "</p>" +
      "<p class=\"metric\"><span>Orders</span><strong>" + block.orders + "</strong>" + delta(block.delta.orders, block.vs) + "</p>" +
      "<p class=\"metric\"><span>New customers</span><strong>" + block.customers + "</strong>" + delta(block.delta.customers, block.vs) + "</p>" +
      "<p class=\"metric\"><span>Rewards / commission</span><strong>" + money(block.rewards) + "</strong></p>" +
      "<p class=\"metric\"><span>Average order</span><strong>" + money(average) + "</strong></p>" +
      "<p class=\"metric\"><span>Refunds</span><strong>" + money(block.refunds) + "</strong></p>" +
      "</div></div><div class=\"chart\"><div class=\"toggles\">" +
      "<button type=\"button\" data-trend=\"sales\" aria-pressed=\"" + (state.trend === "sales" ? "true" : "false") + "\">Sales</button>" +
      "<button type=\"button\" data-trend=\"orders\" aria-pressed=\"" + (state.trend === "orders" ? "true" : "false") + "\">Orders</button>" +
      "</div>" + chart(block) + "</div></div>";
  }

  function renderOverview() {
    var summary = demoData.dashboardSummary;
    var cards = [
      ["Active partners", summary.activePartners, "partners"],
      ["Pending applications", summary.pendingApplications, "applications"],
      ["Customers from partners", summary.customersFromPartners, "customers"],
      ["Partner sales", money(summary.partnerSales), "sales"],
      ["Active campaigns", summary.activeCampaigns, "campaigns"],
      ["Rewards / commission", money(summary.rewards), "rewards"]
    ];
    document.querySelector("[data-mount='kpis']").innerHTML = "<div class=\"kpis\">" + cards.map(function (card) {
      return "<button type=\"button\" class=\"kpi\" data-nav=\"" + card[2] + "\"><span>" + card[0] + "</span><strong>" + card[1] + "</strong><em class=\"demo-tag\">Demo data</em></button>";
    }).join("") + "</div>";

    document.querySelector("[data-mount='performance']").innerHTML = "<div class=\"section-head\"><h2>Partner performance</h2>" + periodControls() + "</div>" + performanceBlock();

    var recent = demoData.orders.slice(0, 5).map(function (order) {
      return "<tr><td>" + esc(partnerName(order.partnerId)) + "</td><td>" + esc(order.product) + "</td><td>" + esc(order.customer) + "</td><td>" + money(order.value) + "</td><td>" + esc(order.when) + "</td></tr>";
    }).join("");
    var tops = demoData.topPartners.map(function (partner, index) {
      return "<li><strong>" + (index + 1) + ". " + esc(partner.name) + "</strong><span>" + money(partner.sales) + " · " + partner.customers + " customers</span></li>";
    }).join("");
    document.querySelector("[data-mount='split']").innerHTML =
      "<article class=\"card\"><div class=\"section-head\"><h2>Recent partner sales</h2><button type=\"button\" class=\"text-btn\" data-nav=\"sales\">View all sales</button></div><p class=\"demo-tag\">Demo data</p><div class=\"table-card\"><table><tbody>" + recent + "</tbody></table></div></article>" +
      "<article class=\"card\"><h2>Top partners — this month</h2><p class=\"demo-tag\">Demo data</p><ol class=\"top-list\">" + tops + "</ol></article>";

    document.querySelector("[data-mount='health']").innerHTML = "<h2>Programme health</h2><div class=\"health\">" + demoData.programmeHealth.map(function (item) {
      return "<button type=\"button\" data-nav=\"" + item.view + "\"" + (item.status ? " data-status=\"" + item.status + "\"" : "") + ">" + esc(item.text) + "</button>";
    }).join("") + "</div>";

    var total = demoData.phaseSummary.reduce(function (sum, phase) { return sum + phase.partners; }, 0);
    document.querySelector("[data-mount='phases']").innerHTML = "<h2>Your partner programme</h2><p>Four phases stay fixed. The business configures requirements and rewards. <span class=\"demo-tag\">Demo data</span></p><div class=\"phases\">" +
      demoData.phaseSummary.map(function (phase) {
        var share = Math.round((phase.partners / total) * 100);
        return "<article class=\"phase\"><small>Phase " + phase.phase + "</small><strong>" + esc(phase.name) + "</strong><span class=\"count\">" + phase.partners + " partners</span><span>" + share + "%</span><button type=\"button\" data-goto=\"partners\" data-phase=\"" + phase.phase + "\">View partners</button></article>";
      }).join("") + "</div>";
  }

  function partnerRow(partner) {
    var metrics = metricsFor(partner);
    var statusClass = partner.status === "paused" ? "warn" : (partner.phase === 4 ? "deep" : "");
    var statusLabel = partner.isNew ? "New" : (partner.status === "paused" ? "Paused" : (partner.phase === 4 ? "Professional" : "Active"));
    return "<tr><td data-label=\"Partner\">" + esc(partner.name) + "</td><td data-label=\"Phase\">Phase " + partner.phase + "</td>" +
      "<td class=\"col-extra\" data-label=\"Orders\">" + metrics.orders + "</td>" +
      "<td class=\"col-extra\" data-label=\"Gross\">" + money(metrics.gross) + "</td>" +
      "<td class=\"col-extra\" data-label=\"Discounts\">" + money(metrics.discounts) + "</td>" +
      "<td data-label=\"Net sales\">" + money(metrics.net) + "</td>" +
      "<td class=\"col-extra\" data-label=\"Refunds\">" + money(metrics.refunds) + "</td>" +
      "<td data-label=\"Customers\">" + partner.customers + "</td>" +
      "<td class=\"col-extra\" data-label=\"Rewards\">" + money(metrics.rewards) + "</td>" +
      "<td data-label=\"Status\"><span class=\"pill " + statusClass + "\">" + statusLabel + "</span></td>" +
      "<td data-label=\"Action\"><button type=\"button\" class=\"text-btn\" data-open-partner=\"" + partner.id + "\">View profile</button></td></tr>";
  }

  function renderPartnerRows() {
    var body = document.getElementById("partner-rows");
    if (!body) return;
    var rows = filteredPartners();
    body.innerHTML = rows.length ? rows.map(partnerRow).join("") : "<tr><td colspan=\"11\">No demo partners match these filters.</td></tr>";
  }

  function renderPartnerTools() {
    var mount = document.querySelector("[data-mount='partners']");
    if (partnerToolsReady) { renderPartnerRows(); return; }
    partnerToolsReady = true;
    mount.innerHTML = "<p class=\"demo-tag\">Demo sample of the 24 partners</p>" +
      "<div class=\"chips\">" +
      [["all", "All"], ["1", "Phase 1"], ["2plus", "Phase 2+"], ["3plus", "Phase 3+"], ["4", "Phase 4"], ["sales", "With sales"], ["none", "No sales"], ["new", "New"]].map(function (item) {
        return "<button type=\"button\" data-quick=\"" + item[0] + "\" aria-pressed=\"" + (state.quick === item[0] ? "true" : "false") + "\">" + item[1] + "</button>";
      }).join("") + "</div>" +
      "<div class=\"filters\">" +
      "<label>Search partners<input data-partner-search value=\"" + esc(state.query) + "\" type=\"search\"></label>" +
      "<label>Period<select data-partner-period><option value=\"today\">Today</option><option value=\"7d\">7 days</option><option value=\"30d\">30 days</option><option value=\"month\">This month</option><option value=\"all\" selected>All time</option></select></label>" +
      "<label>Phase<select data-partner-phase><option value=\"all\">All phases</option><option value=\"1\">Phase 1 — Starter</option><option value=\"2\">Phase 2 — Active Ambassador</option><option value=\"3\">Phase 3 — Partner</option><option value=\"4\">Phase 4 — Professional / Cash Partner</option></select></label>" +
      "<label>Status<select data-partner-status><option value=\"all\">All</option><option value=\"active\">Active</option><option value=\"paused\">Paused</option></select></label>" +
      "<label>Sales<select data-partner-sales><option value=\"all\">All</option><option value=\"has\">Has sales</option><option value=\"none\">No sales</option></select></label>" +
      "<label>Sort by<select data-partner-sort><option value=\"newest\">Newest</option><option value=\"oldest\">Oldest</option><option value=\"highest\" selected>Highest sales</option><option value=\"lowest\">Lowest sales</option><option value=\"orders\">Most orders</option><option value=\"name\">Name A–Z</option><option value=\"phase\">Phase highest first</option></select></label>" +
      "</div>" +
      "<div class=\"table-card\"><table><thead><tr><th>Partner</th><th>Phase</th><th class=\"col-extra\">Orders</th><th class=\"col-extra\">Gross</th><th class=\"col-extra\">Discounts</th><th>Net sales</th><th class=\"col-extra\">Refunds</th><th>Customers</th><th class=\"col-extra\">Rewards</th><th>Status</th><th>Action</th></tr></thead><tbody id=\"partner-rows\"></tbody></table></div>";
    mount.querySelector("[data-partner-search]").addEventListener("input", function (event) {
      state.query = event.target.value;
      var headerSearch = document.querySelector("[data-search]");
      if (headerSearch) headerSearch.value = state.query;
      renderPartnerRows();
    });
    mount.querySelector("[data-partner-period]").addEventListener("change", function (event) { state.partnerPeriod = event.target.value; renderPartnerRows(); });
    mount.querySelector("[data-partner-phase]").addEventListener("change", function (event) {
      state.phase = event.target.value;
      if (state.quick === "1" || state.quick === "2plus" || state.quick === "3plus" || state.quick === "4") state.quick = "all";
      syncPartnerControls();
    });
    mount.querySelector("[data-partner-status]").addEventListener("change", function (event) { state.status = event.target.value; renderPartnerRows(); });
    mount.querySelector("[data-partner-sales]").addEventListener("change", function (event) {
      state.sales = event.target.value;
      if (state.quick === "sales" || state.quick === "none") state.quick = "all";
      syncPartnerControls();
    });
    mount.querySelector("[data-partner-sort]").addEventListener("change", function (event) { state.sort = event.target.value; renderPartnerRows(); });
    renderPartnerRows();
  }

  function syncPartnerControls() {
    var root = document.querySelector("[data-mount='partners']");
    if (!root) return;
    var phase = root.querySelector("[data-partner-phase]");
    var status = root.querySelector("[data-partner-status]");
    var sales = root.querySelector("[data-partner-sales]");
    if (phase) phase.value = ["1", "2", "3", "4"].indexOf(state.phase) === -1 ? "all" : state.phase;
    if (status) status.value = state.status;
    if (sales) sales.value = state.sales;
    root.querySelectorAll("[data-quick]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-quick") === state.quick ? "true" : "false");
    });
    renderPartnerRows();
  }

  function orderRows(list) {
    return list.map(function (order) {
      return "<tr><td data-label=\"Customer\">" + esc(order.customer) + "</td><td data-label=\"Partner source\">" + esc(partnerName(order.partnerId)) + "</td><td data-label=\"Order\">" + esc(order.id) + "</td><td data-label=\"Products\">" + esc(order.product) + "</td><td data-label=\"Order value\">" + money(order.value) + "</td><td data-label=\"Date\">" + esc(order.date) + "</td><td data-label=\"Status\">" + esc(order.status) + "</td><td data-label=\"Action\"><button type=\"button\" class=\"text-btn\" data-open-order=\"" + esc(order.id) + "\">View</button></td></tr>";
    }).join("");
  }

  function renderLists() {
    var query = state.query.trim().toLowerCase();
    var orders = demoData.orders.filter(function (order) {
      var blob = (order.customer + " " + partnerName(order.partnerId) + " " + order.product + " " + order.id).toLowerCase();
      return !query || blob.indexOf(query) !== -1;
    });
    var customerMount = document.querySelector("[data-mount='customers']");
    if (customerMount) {
      customerMount.innerHTML = "<p>Demo purchases attributed to partner links, codes or campaigns. Not the company’s full customer database.</p><p class=\"demo-tag\">Demo data</p><div class=\"table-card\"><table><thead><tr><th>Customer</th><th>Partner source</th><th>Order</th><th>Products</th><th>Order value</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>" + orderRows(orders) + "</tbody></table></div>";
    }
    var salesMount = document.querySelector("[data-mount='sales']");
    if (salesMount) salesMount.innerHTML = "<div class=\"section-head\"><h2>Sales period</h2>" + periodControls() + "</div>" + performanceBlock() + "<h2>Attributed orders</h2><div class=\"table-card\"><table><tbody>" + orderRows(orders) + "</tbody></table></div>";
    var apps = demoData.applications.filter(function (item) { return !query || item.name.toLowerCase().indexOf(query) !== -1; });
    var appMount = document.querySelector("[data-mount='applications']");
    if (appMount) {
      appMount.innerHTML = "<p class=\"demo-tag\">Demo data · " + demoData.dashboardSummary.pendingApplications + " fictional requests</p><div class=\"table-card\"><table><thead><tr><th>Name</th><th>Interest</th><th>Status</th></tr></thead><tbody>" +
        apps.map(function (item) { return "<tr><td>" + esc(item.name) + "</td><td>" + esc(item.interest) + "</td><td><span class=\"pill warn\">Pending</span></td></tr>"; }).join("") +
        "</tbody></table></div>";
    }
  }

  function show(view, options) {
    options = options || {};
    state.view = view;
    if (panel) panel.hidden = true;
    document.querySelectorAll("[data-view]").forEach(function (section) {
      section.hidden = section.getAttribute("data-view") !== view;
    });
    document.querySelectorAll(".side-nav [data-nav]").forEach(function (button) {
      if (button.getAttribute("data-nav") === view) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    if (sidebar) sidebar.classList.remove("is-open");
    if (backdrop) backdrop.hidden = true;
    if (view === "partners") renderPartnerTools();
    if (view === "overview") renderOverview();
    renderLists();
    if (!options.silent) {
      var heading = document.querySelector("[data-view='" + view + "'] h1, [data-view='" + view + "'] h2");
      if (heading) {
        if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
        heading.focus();
      }
    }
  }

  function panelHtml(title, body) {
    lastFocus = document.activeElement;
    panelBody.innerHTML = "<h2>" + esc(title) + "</h2>" + body;
    panel.hidden = false;
    backdrop.hidden = false;
    var close = panel.querySelector("[data-close-panel]");
    if (close) close.focus();
  }

  function partnerPanel(partner) {
    var metrics = metricsFor(partner);
    var tab = state.drawerTab;
    var tabs = ["overview", "sales", "customers", "campaigns", "phase", "rewards", "activity"].map(function (name) {
      return "<button type=\"button\" data-tab=\"" + name + "\" aria-selected=\"" + (tab === name ? "true" : "false") + "\">" + name.charAt(0).toUpperCase() + name.slice(1) + "</button>";
    }).join("");
    var orders = demoData.orders.filter(function (order) { return order.partnerId === partner.id; });
    var body = "";
    if (tab === "overview" || tab === "sales") {
      body = "<div class=\"metrics\"><p class=\"metric\"><span>Net sales</span><strong>" + money(metrics.net) + "</strong></p><p class=\"metric\"><span>Orders</span><strong>" + metrics.orders + "</strong></p><p class=\"metric\"><span>Customers</span><strong>" + partner.customers + "</strong></p><p class=\"metric\"><span>Rewards</span><strong>" + money(metrics.rewards) + "</strong></p></div>";
    }
    if (tab === "customers") body = orders.length ? "<ul>" + orders.map(function (order) { return "<li>" + esc(order.customer) + " · " + esc(order.product) + " · " + money(order.value) + "</li>"; }).join("") + "</ul>" : "<p>No demo orders for this partner.</p>";
    if (tab === "campaigns") body = partner.campaigns.length ? "<ul>" + partner.campaigns.map(function (name) { return "<li>" + esc(name) + "</li>"; }).join("") + "</ul>" : "<p>No demo campaigns.</p>";
    if (tab === "phase") body = "<p>Phase " + partner.phase + " — " + esc(partner.phaseName) + ". The business would set the rule for moving to the next phase. BeeHive does not invent a threshold.</p>";
    if (tab === "rewards") body = "<p>Demo rewards " + money(metrics.rewards) + ". Commission and benefits stay company-defined.</p>";
    if (tab === "activity") body = "<p>Demo activity only. Joined " + esc(partner.joined) + ".</p>";
    panelHtml(partner.name, "<p class=\"demo-tag\">Demo partner</p><p>" + esc(partner.phaseName) + " · " + esc(partner.status) + "</p><div class=\"tabs\">" + tabs + "</div>" + body);
  }

  function orderPanel(order) {
    panelHtml(order.customer, "<p class=\"demo-tag\">Demo customer</p><dl><dt>Order</dt><dd>" + esc(order.id) + "</dd><dt>Partner attribution</dt><dd>" + esc(partnerName(order.partnerId)) + "</dd><dt>Campaign</dt><dd>" + esc(order.campaign) + "</dd><dt>Products</dt><dd>" + esc(order.product) + "</dd><dt>Order value</dt><dd>" + money(order.value) + "</dd><dt>Date</dt><dd>" + esc(order.date) + "</dd><dt>Status</dt><dd>" + esc(order.status) + "</dd></dl><p>Fictional purchase. Not a real Nutribites order.</p>");
  }

  function closePanel() {
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    panelBody.innerHTML = "";
    if (backdrop && !(sidebar && sidebar.classList.contains("is-open"))) backdrop.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function setCollapsed(collapsed) {
    document.documentElement.classList.toggle("is-collapsed", collapsed);
    var button = document.querySelector("[data-collapse]");
    if (!button) return;
    button.setAttribute("aria-expanded", collapsed ? "false" : "true");
    button.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
    var icon = button.querySelector(".ph");
    if (icon) {
      icon.classList.toggle("ph-caret-left", !collapsed);
      icon.classList.toggle("ph-caret-right", collapsed);
    }
    try { localStorage.setItem(STORAGE_KEY, collapsed ? "collapsed" : "expanded"); } catch (error) { /* demo preference only */ }
  }

  document.addEventListener("click", function (event) {
    var nav = event.target.closest("[data-nav]");
    if (nav && nav.getAttribute("data-nav")) {
      if (nav.classList.contains("kpi") && nav.getAttribute("data-nav") === "partners") {
        state.status = "all";
        state.phase = "all";
        state.sales = "all";
        state.quick = "all";
      }
      if (nav.hasAttribute("data-status")) {
        state.status = nav.getAttribute("data-status");
        state.quick = "all";
        state.phase = "all";
        state.sales = "all";
      }
      show(nav.getAttribute("data-nav"));
      if (state.view === "partners") syncPartnerControls();
    }
    var goto = event.target.closest("[data-goto]");
    if (goto) {
      state.phase = goto.getAttribute("data-phase") || "all";
      state.quick = state.phase;
      state.status = "all";
      state.sales = "all";
      show("partners");
      syncPartnerControls();
    }
    var period = event.target.closest("[data-period]");
    if (period) { state.period = period.getAttribute("data-period"); renderOverview(); renderLists(); }
    var trend = event.target.closest("[data-trend]");
    if (trend) { state.trend = trend.getAttribute("data-trend"); renderOverview(); renderLists(); }
    var quick = event.target.closest("[data-quick]");
    if (quick && quick.closest("[data-mount='partners']")) {
      state.quick = quick.getAttribute("data-quick");
      if (state.quick === "1" || state.quick === "4") state.phase = state.quick;
      else if (state.quick === "2plus" || state.quick === "3plus" || state.quick === "all" || state.quick === "new") state.phase = "all";
      if (state.quick === "sales") state.sales = "has";
      else if (state.quick === "none") state.sales = "none";
      else if (state.quick === "all" || state.quick === "new" || state.quick === "1" || state.quick === "2plus" || state.quick === "3plus" || state.quick === "4") state.sales = "all";
      syncPartnerControls();
    }
    var partnerButton = event.target.closest("[data-open-partner]");
    if (partnerButton) {
      state.drawerPartner = partnerButton.getAttribute("data-open-partner");
      state.drawerTab = "overview";
      partnerPanel(demoData.partners.filter(function (item) { return item.id === state.drawerPartner; })[0]);
    }
    var orderButton = event.target.closest("[data-open-order]");
    if (orderButton) {
      var order = demoData.orders.filter(function (item) { return item.id === orderButton.getAttribute("data-open-order"); })[0];
      if (order) orderPanel(order);
    }
    var tab = event.target.closest("[data-tab]");
    if (tab && state.drawerPartner) {
      state.drawerTab = tab.getAttribute("data-tab");
      partnerPanel(demoData.partners.filter(function (item) { return item.id === state.drawerPartner; })[0]);
    }
    if (event.target.closest("[data-close-panel]")) closePanel();
    var pop = event.target.closest("[data-pop]");
    document.querySelectorAll("[data-popover]").forEach(function (box) { box.hidden = true; });
    if (pop) {
      var box = document.getElementById(pop.getAttribute("data-pop"));
      if (box) box.hidden = false;
    }
  });

  document.querySelector("[data-menu]").addEventListener("click", function () {
    sidebar.classList.add("is-open");
    backdrop.hidden = false;
  });
  document.querySelector("[data-drawer-close]").addEventListener("click", function () {
    sidebar.classList.remove("is-open");
    if (panel.hidden) backdrop.hidden = true;
  });
  backdrop.addEventListener("click", function () {
    sidebar.classList.remove("is-open");
    closePanel();
    backdrop.hidden = true;
  });
  document.querySelector("[data-collapse]").addEventListener("click", function () {
    setCollapsed(!document.documentElement.classList.contains("is-collapsed"));
  });
  document.querySelector("[data-search]").addEventListener("input", function (event) {
    state.query = event.target.value;
    var partnerSearch = document.querySelector("[data-partner-search]");
    if (partnerSearch) partnerSearch.value = state.query;
    renderPartnerRows();
    renderLists();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    closePanel();
    sidebar.classList.remove("is-open");
    backdrop.hidden = true;
    document.querySelectorAll("[data-popover]").forEach(function (box) { box.hidden = true; });
  });
  document.querySelectorAll("[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var note = form.querySelector("[data-demo-note]");
      if (!note) return;
      note.hidden = false;
      note.focus();
    });
  });

  setCollapsed(document.documentElement.classList.contains("is-collapsed"));
  show("overview", { silent: true });
}());
