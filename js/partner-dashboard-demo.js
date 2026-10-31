/* Demo only. No network calls.
   demoData is the shape later replaced by:
   GET /api/partner/me
   GET /api/partner/relationships
   GET /api/partner/relationships/:companyId
   GET /api/partner/campaigns
   GET /api/partner/orders
   GET /api/partner/rewards */
(function () {
  var STORAGE_KEY = "beehive-partner-dashboard-sidebar";
  var PHASES = [
    { n: 1, name: "Starter" },
    { n: 2, name: "Active Ambassador" },
    { n: 3, name: "Partner" },
    { n: 4, name: "Professional / Cash Partner" }
  ];

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

  function hours() { return ["9", "11", "13", "15", "17", "19"]; }
  function days() { return ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]; }
  function weeks() { return ["W1", "W2", "W3", "W4", "W5", "W6"]; }
  function monthWeeks() { return ["W1", "W2", "W3", "W4"]; }
  function months() { return ["May", "Jun", "Jul", "Aug", "Sep", "Oct"]; }

  var demoData = {
    partner: {
      name: "Emma Jansen",
      location: "Netherlands",
      memberSince: "March 2026",
      status: "Active",
      email: "emma.jansen@example.com",
      country: "Netherlands",
      interests: "Wellness, training, everyday routines",
      social: "@emma.example",
      website: "example.com/emma",
      language: "English",
      notifications: "Partnership updates and reward summaries"
    },
    relationships: [
      {
        id: "nutribites",
        name: "Nutribites",
        category: "Health & Supplements",
        demoCompany: false,
        note: "Demo business context. Nutribites is not a BeeHive customer.",
        status: "Active",
        phase: 2,
        phaseName: "Active Ambassador",
        nextPhase: "Phase 3 — Partner",
        progress: "€640 / demo target",
        progressNote: "Demo company configuration. Not a real Nutribites threshold.",
        sales: 1520,
        code: "EMMA-NB",
        link: "beehive.partners/r/emma/nutribites",
        rewards: { available: 82.5, earned: 34, used: 20, pending: 12.5 },
        rewardTypes: ["Store Credit", "Campaign Reward"],
        campaigns: [
          { id: "nb-mag", name: "Magnesium Month", reward: "Company-defined", sales: 420, orders: 6, status: "Active" },
          { id: "nb-juice", name: "Green Juice Autumn", reward: "Company-defined", sales: 310, orders: 4, status: "Active" }
        ],
        products: [
          { name: "Green Juice", fromPhase: 1, campaign: "Green Juice Autumn", materials: "Demo brief", performance: "€310 in this demo campaign" },
          { name: "Magnesium Bisglycinaat", fromPhase: 1, campaign: "Magnesium Month", materials: "Demo brief", performance: "€420 in this demo campaign" },
          { name: "(Pro)Biotica", fromPhase: 2, campaign: "None in this demo", materials: "Demo notes", performance: "No separate campaign" },
          { name: "Visolie", fromPhase: 2, campaign: "None in this demo", materials: "Demo notes", performance: "Included in partner sales" },
          { name: "Nachtrust", fromPhase: 2, campaign: "None in this demo", materials: "Demo notes", performance: "Included in partner sales" },
          { name: "Collageen", fromPhase: 3, campaign: "Locked in this demo", materials: "Not released at phase 2", performance: "Available from phase 3 in this demo" }
        ],
        actions: [
          { id: "nb-content", title: "Create product content", status: "Available", reward: "Company-defined", requirement: "Use the approved product notes." },
          { id: "nb-share", title: "Share Magnesium Month", status: "In progress", reward: "Campaign reward", requirement: "Use your Nutribites partner link." },
          { id: "nb-review", title: "Complete a product review", status: "Submitted", reward: "Company-defined", requirement: "Waiting in this demo. Nothing is reviewed." },
          { id: "nb-intro", title: "Introduce a customer", status: "Available", reward: "No reward configured", requirement: "Share a product link. No customer profile is collected here." },
          { id: "nb-event", title: "Join an event", status: "Planned", reward: "Not configured", requirement: "This company has not opened an event." },
          { id: "nb-profile", title: "Complete your BeeHive profile", status: "Completed", reward: "None", requirement: "Demo profile is already filled in." },
          { id: "nb-explore", title: "Explore a phase 3 product", status: "Locked", reward: "Not available yet", requirement: "Collageen stays locked until this company moves the partnership to phase 3." }
        ],
        performance: {
          today: { net: 67.41, orders: 1, discounts: 7.49, refunds: 0, customers: 1, delta: { net: 4.2, orders: 0, customers: 0 }, sales: [8, 10, 12, 9, 14, 14], ordersSeries: [0, 0, 0, 0, 0, 1], labels: hours() },
          "7d": { net: 148, orders: 2, discounts: 14, refunds: 0, customers: 1, delta: { net: 6.4, orders: 5, customers: 0 }, sales: [12, 18, 16, 22, 20, 28, 32], ordersSeries: [0, 0, 1, 0, 0, 1, 0], labels: days() },
          "30d": { net: 510, orders: 8, discounts: 51, refunds: 0, customers: 5, delta: { net: 7.1, orders: 6, customers: 4 }, sales: [70, 80, 85, 90, 90, 95], ordersSeries: [1, 1, 1, 2, 1, 2], labels: weeks() },
          month: { net: 480, orders: 7, discounts: 48, refunds: 0, customers: 4, delta: { net: 8.2, orders: 6.1, customers: 4 }, sales: [90, 120, 140, 130], ordersSeries: [1, 2, 2, 2], labels: monthWeeks() },
          all: { net: 1520, orders: 22, discounts: 152, refunds: 24, customers: 14, delta: { net: 12, orders: 9, customers: 8 }, sales: [180, 210, 220, 250, 280, 380], ordersSeries: [2, 3, 3, 4, 4, 6], labels: months() }
        }
      },
      {
        id: "muskle",
        name: "MUSKLE",
        category: "Training",
        demoCompany: false,
        note: "Demo partnership only. These figures are not the live MUSKLE trainer portal.",
        status: "Active",
        phase: 3,
        phaseName: "Partner",
        nextPhase: "Phase 4 — Professional / Cash Partner",
        progress: "Phase requirement achieved",
        progressNote: "Demo company configuration. Not a live MUSKLE rule.",
        sales: 3340,
        code: "EMMA-MSK",
        link: "beehive.partners/r/emma/muskle",
        rewards: { available: 135, earned: 60, used: 25, pending: 18 },
        rewardTypes: ["Commission", "Campaign Reward", "Bonus"],
        campaigns: [
          { id: "ms-strength", name: "Strength Month", reward: "Company-defined", sales: 860, orders: 11, status: "Active" },
          { id: "ms-recovery", name: "Recovery Week", reward: "Company-defined", sales: 540, orders: 7, status: "Active" },
          { id: "ms-brief", name: "Partner Briefing", reward: "Company-defined", sales: 220, orders: 3, status: "Active" }
        ],
        products: [
          { name: "Demo training product", fromPhase: 1, campaign: "Strength Month", materials: "Demo brief", performance: "€860 in this demo campaign" },
          { name: "Demo recovery product", fromPhase: 2, campaign: "Recovery Week", materials: "Demo brief", performance: "€540 in this demo campaign" },
          { name: "Demo omega product", fromPhase: 3, campaign: "Partner Briefing", materials: "Demo notes", performance: "€220 in this demo campaign" }
        ],
        actions: [
          { id: "ms-share", title: "Share Strength Month", status: "Available", reward: "Campaign reward", requirement: "Use the MUSKLE partner link for this demo." },
          { id: "ms-intro", title: "Introduce a customer", status: "In progress", reward: "Commission if the company confirms the order", requirement: "Attribution only. No customer address or email is shown." },
          { id: "ms-brief", title: "Finish the partner briefing", status: "Completed", reward: "Bonus", requirement: "Marked complete in this demo." },
          { id: "ms-cash", title: "Professional cash commission", status: "Locked", reward: "Not configured for phase 3", requirement: "Phase 4 is where a company may offer a cash commission. This demo does not turn it on." }
        ],
        performance: {
          today: { net: 89, orders: 1, discounts: 0, refunds: 0, customers: 1, delta: { net: 3.1, orders: 0, customers: 0 }, sales: [10, 12, 14, 18, 16, 19], ordersSeries: [0, 0, 0, 1, 0, 0], labels: hours() },
          "7d": { net: 260, orders: 3, discounts: 18, refunds: 0, customers: 2, delta: { net: 5.5, orders: 4, customers: 3 }, sales: [30, 32, 34, 36, 40, 42, 46], ordersSeries: [0, 1, 0, 1, 0, 1, 0], labels: days() },
          "30d": { net: 940, orders: 12, discounts: 74, refunds: 12, customers: 7, delta: { net: 9.2, orders: 8, customers: 6 }, sales: [140, 150, 155, 160, 165, 170], ordersSeries: [2, 2, 2, 2, 2, 2], labels: weeks() },
          month: { net: 890, orders: 11, discounts: 70, refunds: 12, customers: 6, delta: { net: 11.4, orders: 9, customers: 7.5 }, sales: [180, 210, 240, 260], ordersSeries: [2, 3, 3, 3], labels: monthWeeks() },
          all: { net: 3340, orders: 45, discounts: 268, refunds: 40, customers: 29, delta: { net: 14, orders: 11, customers: 10 }, sales: [420, 480, 510, 560, 640, 730], ordersSeries: [6, 7, 7, 8, 8, 9], labels: months() }
        }
      },
      {
        id: "companyC",
        name: "Company C",
        category: "Demo company",
        demoCompany: true,
        note: "DEMO COMPANY. Not a real BeeHive customer.",
        status: "Active",
        phase: 1,
        phaseName: "Starter",
        nextPhase: "Phase 2 — Active Ambassador",
        progress: "Starting",
        progressNote: "Demo company configuration. No target is set.",
        sales: 0,
        code: "EMMA-CC",
        link: "beehive.partners/r/emma/company-c",
        rewards: { available: 0, earned: 0, used: 0, pending: 0 },
        rewardTypes: [],
        campaigns: [],
        products: [],
        actions: [
          { id: "cc-start", title: "Read the starter notes", status: "Available", reward: "None configured", requirement: "Company C has not published rules in this demo." },
          { id: "cc-campaign", title: "Join a campaign", status: "Locked", reward: "None", requirement: "This demo company has no campaigns." }
        ],
        performance: {
          today: { net: 0, orders: 0, discounts: 0, refunds: 0, customers: 0, delta: { net: 0, orders: 0, customers: 0 }, sales: [0, 0, 0, 0, 0, 0], ordersSeries: [0, 0, 0, 0, 0, 0], labels: hours() },
          "7d": { net: 0, orders: 0, discounts: 0, refunds: 0, customers: 0, delta: { net: 0, orders: 0, customers: 0 }, sales: [0, 0, 0, 0, 0, 0, 0], ordersSeries: [0, 0, 0, 0, 0, 0, 0], labels: days() },
          "30d": { net: 0, orders: 0, discounts: 0, refunds: 0, customers: 0, delta: { net: 0, orders: 0, customers: 0 }, sales: [0, 0, 0, 0, 0, 0], ordersSeries: [0, 0, 0, 0, 0, 0], labels: weeks() },
          month: { net: 0, orders: 0, discounts: 0, refunds: 0, customers: 0, delta: { net: 0, orders: 0, customers: 0 }, sales: [0, 0, 0, 0], ordersSeries: [0, 0, 0, 0], labels: monthWeeks() },
          all: { net: 0, orders: 0, discounts: 0, refunds: 0, customers: 0, delta: { net: 0, orders: 0, customers: 0 }, sales: [0, 0, 0, 0, 0, 0], ordersSeries: [0, 0, 0, 0, 0, 0], labels: months() }
        }
      }
    ],
    orders: [
      { id: "NB-1048", companyId: "nutribites", date: "29 Oct 2026", product: "Green Juice", gross: 74.9, discount: 7.49, net: 67.41, refund: 0, status: "Paid", first: true },
      { id: "MSK-2201", companyId: "muskle", date: "28 Oct 2026", product: "Demo training product", gross: 89, discount: 0, net: 89, refund: 0, status: "Paid", first: false },
      { id: "NB-1044", companyId: "nutribites", date: "26 Oct 2026", product: "Magnesium Bisglycinaat", gross: 54.95, discount: 0, net: 54.95, refund: 0, status: "Paid", first: false },
      { id: "MSK-2194", companyId: "muskle", date: "24 Oct 2026", product: "Demo recovery product", gross: 64, discount: 6.4, net: 57.6, refund: 0, status: "Paid", first: true },
      { id: "NB-1039", companyId: "nutribites", date: "22 Oct 2026", product: "Visolie", gross: 61, discount: 6.1, net: 54.9, refund: 0, status: "Paid", first: false },
      { id: "NB-1031", companyId: "nutribites", date: "18 Oct 2026", product: "(Pro)Biotica", gross: 36.95, discount: 0, net: 0, refund: 36.95, status: "Refunded", first: false }
    ],
    discover: [
      { id: "nutribites", name: "Nutribites", category: "Health & Supplements", state: "joined" },
      { id: "muskle", name: "MUSKLE", category: "Training", state: "joined" },
      { id: "beauty", name: "Example Beauty Company", category: "Beauty", state: "pending" },
      { id: "lifestyle", name: "Example Lifestyle Company", category: "Lifestyle", state: "open" }
    ],
    applications: [
      { id: "beauty", name: "Example Beauty Company", submitted: "25 Oct 2026", status: "Pending" },
      { id: "companyD", name: "Company D", submitted: "02 Oct 2026", status: "Approved" }
    ],
    help: [
      { q: "How does BeeHive work?", a: "One person has one BeeHive identity and can join more than one company. Each partnership keeps its own phase, campaigns, links, sales and rewards." },
      { q: "How do the four phases work?", a: "BeeHive always uses four phases: Starter, Active Ambassador, Partner, and Professional / Cash Partner. The company decides the requirements and benefits for each phase." },
      { q: "Why is my phase different per company?", a: "Progress belongs to the relationship with that company. Nutribites phase 2 does not move the MUSKLE partnership, and the conditions do not have to match." },
      { q: "How do partner links work?", a: "Each company gives its own code and link. A Nutribites link is not a MUSKLE link." },
      { q: "How are sales attributed?", a: "A company would attribute orders to the partner link or code. This demo does not read a live store, and it does not show a customer’s private profile." },
      { q: "How do rewards work?", a: "A company chooses the reward type. That can be store credit, commission, a campaign reward, a product reward, a bonus, or a professional cash commission. A company does not have to use every type." },
      { q: "How do campaigns work?", a: "Campaigns belong to one company. Opening a Nutribites campaign does not change MUSKLE or Company C." },
      { q: "How do I join another business?", a: "Discover Businesses is the prototype for finding a programme. Apply does not send an application." },
      { q: "How do I leave a partnership?", a: "Leaving would close that company relationship only. It is not available in this demo, and it would not delete the BeeHive identity." }
    ]
  };

  var state = { view: "overview", company: "all", period: "month", trend: "sales" };
  var sidebar = document.querySelector("[data-sidebar]");
  var panel = document.querySelector("[data-panel]");
  var panelBody = document.querySelector("[data-panel-body]");
  var backdrop = document.querySelector("[data-backdrop]");

  function companyById(id) {
    return demoData.relationships.filter(function (item) { return item.id === id; })[0];
  }

  function selectedCompanies() {
    if (state.company === "all") return demoData.relationships.slice();
    var one = companyById(state.company);
    return one ? [one] : [];
  }

  function companyName(id) {
    var found = companyById(id);
    return found ? found.name : id;
  }

  function firstName() {
    return demoData.partner.name.split(" ")[0] || demoData.partner.name;
  }

  function combined(period) {
    var rows = selectedCompanies().map(function (company) { return company.performance[period]; });
    var base = rows[0];
    var sum = { net: 0, orders: 0, discounts: 0, refunds: 0, customers: 0, sales: base.sales.slice(), ordersSeries: base.ordersSeries.slice(), labels: base.labels.slice(), delta: null };
    rows.forEach(function (row, index) {
      sum.net += row.net;
      sum.orders += row.orders;
      sum.discounts += row.discounts;
      sum.refunds += row.refunds;
      sum.customers += row.customers;
      if (index === 0) return;
      sum.sales = sum.sales.map(function (value, point) { return value + row.sales[point]; });
      sum.ordersSeries = sum.ordersSeries.map(function (value, point) { return value + row.ordersSeries[point]; });
    });
    if (rows.length === 1) sum.delta = base.delta;
    return sum;
  }

  function summary() {
    return demoData.relationships.reduce(function (total, company) {
      total.partnerships += 1;
      total.sales += company.sales;
      total.orders += company.performance.all.orders;
      total.rewards += company.rewards.available;
      total.campaigns += company.campaigns.filter(function (item) { return item.status === "Active"; }).length;
      return total;
    }, { partnerships: 0, sales: 0, orders: 0, rewards: 0, campaigns: 0, applications: demoData.applications.filter(function (item) { return item.status === "Pending"; }).length });
  }

  function periodControls() {
    var periods = [["today", "Today"], ["7d", "7 days"], ["30d", "30 days"], ["month", "This month"], ["all", "All time"]];
    return "<div class=\"periods\">" + periods.map(function (item) {
      return "<button type=\"button\" data-period=\"" + item[0] + "\" aria-pressed=\"" + (state.period === item[0] ? "true" : "false") + "\">" + item[1] + "</button>";
    }).join("") + "</div>";
  }

  function chart(block) {
    var series = state.trend === "orders" ? block.ordersSeries : block.sales;
    var width = 560;
    var height = 150;
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
    return "<svg viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"Demo " + state.trend + " trend\"><polygon class=\"fill\" points=\"" + area + "\"></polygon><polyline points=\"" + line + "\"></polyline>" + labels + "</svg>";
  }

  function salesBlock() {
    var block = combined(state.period);
    var average = block.orders ? block.net / block.orders : 0;
    var versus = state.period === "today" ? "yesterday" : (state.period === "7d" ? "previous 7 days" : (state.period === "30d" ? "previous 30 days" : (state.period === "month" ? "previous month" : "prior year")));
    function metric(label, value, change) {
      var extra = "";
      if (block.delta && change != null) {
        var down = change < 0;
        extra = "<span class=\"delta" + (down ? " down" : "") + "\">" + (down ? "↓" : "↑") + " " + Math.abs(change).toFixed(1) + "% vs " + versus + "</span>";
      }
      return "<p class=\"metric\"><span>" + label + "</span><strong>" + value + "</strong>" + extra + "</p>";
    }
    return "<div class=\"perf\"><div><p class=\"demo-tag\">Demo data</p><div class=\"metrics\">" +
      metric("Net sales", money(block.net), block.delta && block.delta.net) +
      metric("Orders", String(block.orders), block.delta && block.delta.orders) +
      metric("Discounts", money(block.discounts)) +
      metric("Refunds", money(block.refunds)) +
      metric("Average order value", money(average)) +
      metric("New customers", String(block.customers), block.delta && block.delta.customers) +
      "</div></div><div class=\"chart\"><div class=\"toggles\">" +
      "<button type=\"button\" data-trend=\"sales\" aria-pressed=\"" + (state.trend === "sales" ? "true" : "false") + "\">Sales</button>" +
      "<button type=\"button\" data-trend=\"orders\" aria-pressed=\"" + (state.trend === "orders" ? "true" : "false") + "\">Orders</button>" +
      "</div>" + chart(block) + "</div></div>";
  }

  function phaseTrack(current) {
    return "<div class=\"track\">" + PHASES.map(function (phase) {
      var kind = "future";
      if (phase.n < current) kind = "done";
      else if (phase.n === current) kind = "current";
      else if (phase.n === current + 1) kind = "next";
      var mark = kind === "done" ? "<i class=\"ph ph-check\" aria-hidden=\"true\"></i> Completed" : (kind === "current" ? "Current" : (kind === "next" ? "Next" : "Later"));
      return "<article class=\"step " + kind + "\"><small>0" + phase.n + "</small><strong>" + esc(phase.name) + "</strong><span>" + mark + "</span></article>";
    }).join("") + "</div>";
  }

  function partnershipCard(company) {
    var active = company.campaigns.filter(function (item) { return item.status === "Active"; }).length;
    return "<article class=\"card\"><p class=\"meta\">" + esc(company.category) + "</p><h3>" + esc(company.name) + "</h3>" +
      (company.demoCompany ? "<p class=\"demo-tag\">Demo company</p>" : "") +
      "<p>Phase " + company.phase + " — " + esc(company.phaseName) + "</p>" +
      "<p>" + esc(company.progress) + "</p>" +
      "<p>" + active + " campaigns · " + money(company.sales) + " sales</p>" +
      "<p>" + money(company.rewards.available) + " available rewards</p>" +
      "<p><span class=\"pill\">" + esc(company.status) + "</span></p>" +
      "<button class=\"primary\" type=\"button\" data-open-company=\"" + company.id + "\">Open " + esc(company.name) + "</button></article>";
  }

  function orderRows(list) {
    if (!list.length) return "<tr><td colspan=\"9\">No attributed orders in this demo.</td></tr>";
    return list.map(function (order) {
      var flag = order.first ? " <span class=\"pill\">New customer</span>" : "";
      return "<tr><td data-label=\"Order\">" + esc(order.id) + flag + "</td><td data-label=\"Date\">" + esc(order.date) + "</td><td data-label=\"Company\">" + esc(companyName(order.companyId)) + "</td><td data-label=\"Product\">" + esc(order.product) + "</td>" +
        "<td class=\"col-extra\" data-label=\"Gross\">" + money(order.gross) + "</td><td class=\"col-extra\" data-label=\"Discount\">" + money(order.discount) + "</td><td data-label=\"Net\">" + money(order.net) + "</td><td class=\"col-extra\" data-label=\"Refund\">" + money(order.refund) + "</td><td data-label=\"Status\">" + esc(order.status) + "</td></tr>";
    }).join("");
  }

  function orderTable(list) {
    return "<div class=\"table-card\"><table><thead><tr><th>Order</th><th>Date</th><th>Company</th><th>Product</th><th class=\"col-extra\">Gross</th><th class=\"col-extra\">Discount</th><th>Net</th><th class=\"col-extra\">Refund</th><th>Status</th></tr></thead><tbody>" +
      orderRows(list) + "</tbody></table></div>";
  }

  function visibleOrders() {
    var ids = selectedCompanies().map(function (company) { return company.id; });
    return demoData.orders.filter(function (order) { return ids.indexOf(order.companyId) !== -1; });
  }

  function toolsBlock(company) {
    return "<article class=\"tools\"><h2>Your partner tools</h2><p class=\"demo-tag\">Prototype only · separate from other companies</p>" +
      "<p>Partner code<br><code>" + esc(company.code) + "</code></p>" +
      "<p>Partner link<br><code>" + esc(company.link) + "</code></p>" +
      "<div class=\"row-actions\"><button type=\"button\" class=\"line\" data-copy=\"" + esc(company.code) + "\">Copy code</button>" +
      "<button type=\"button\" class=\"line\" data-copy=\"" + esc(company.link) + "\">Copy link</button>" +
      "<button type=\"button\" class=\"text-btn\" data-landing=\"" + company.id + "\">View landing page</button></div>" +
      "<p class=\"callout\" data-copy-note hidden>Copied for this demo.</p></article>";
  }

  function rewardBlock(company) {
    var types = company.rewardTypes.length ? company.rewardTypes.map(function (type) { return "<li>" + esc(type) + "</li>"; }).join("") : "<li>No reward type is configured for this demo company.</li>";
    return "<article class=\"card\"><h2>Your rewards</h2><p class=\"demo-tag\">Demo data · " + esc(company.name) + "</p><div class=\"metrics\">" +
      "<p class=\"metric\"><span>Available</span><strong>" + money(company.rewards.available) + "</strong></p>" +
      "<p class=\"metric\"><span>Earned this month</span><strong>" + money(company.rewards.earned) + "</strong></p>" +
      "<p class=\"metric\"><span>Used</span><strong>" + money(company.rewards.used) + "</strong></p>" +
      "<p class=\"metric\"><span>Pending</span><strong>" + money(company.rewards.pending) + "</strong></p></div>" +
      "<p>Reward types this company has configured</p><ul>" + types + "</ul>" +
      "<p>Other reward types are not turned on for this company.</p></article>";
  }

  function campaignCard(company, campaign) {
    return "<article class=\"card\"><p class=\"meta\">" + esc(company.name) + "</p><h3>" + esc(campaign.name) + "</h3>" +
      "<p>Reward: " + esc(campaign.reward) + "</p><p>Sales " + money(campaign.sales) + " · " + campaign.orders + " orders</p>" +
      "<p><span class=\"pill\">" + esc(campaign.status) + "</span></p>" +
      "<div class=\"row-actions\"><button type=\"button\" class=\"primary\" data-open-campaign=\"" + campaign.id + "\">Open campaign</button>" +
      "<button type=\"button\" class=\"line\" data-copy=\"" + esc(company.link) + "\">Copy link</button>" +
      "<button type=\"button\" class=\"text-btn\" data-materials=\"" + campaign.id + "\">Marketing materials</button></div></article>";
  }

  function actionCard(action) {
    var tone = action.status === "Locked" || action.status === "Planned" ? "muted" : (action.status === "Completed" ? "deep" : (action.status === "Submitted" || action.status === "In progress" ? "warn" : ""));
    return "<article class=\"card\"><h3>" + esc(action.title) + "</h3><p><span class=\"pill " + tone + "\">" + esc(action.status) + "</span></p>" +
      "<p>Possible reward: " + esc(action.reward) + "</p><p>" + esc(action.requirement) + "</p>" +
      "<button type=\"button\" class=\"text-btn\" data-action=\"" + action.id + "\">Open</button></article>";
  }

  function statusPill(status) {
    var tone = status === "Pending" ? "warn" : (status === "Approved" ? "deep" : "");
    return "<span class=\"pill " + tone + "\">" + esc(status) + "</span>";
  }

  function renderOverview() {
    if (state.company === "all") {
      var totals = summary();
      var cards = [
        ["Active partnerships", totals.partnerships, "partnerships"],
        ["Total partner sales", money(totals.sales), "sales"],
        ["Orders", totals.orders, "sales"],
        ["Available rewards", money(totals.rewards), "rewards"],
        ["Active campaigns", totals.campaigns, "campaigns"],
        ["Pending applications", totals.applications, "applications"]
      ];
      document.querySelector("[data-mount='overview']").innerHTML =
        "<p class=\"kicker\">Overview</p><h1>Good morning, " + esc(firstName()) + "</h1>" +
        "<p class=\"lead\">Here’s what is happening across your BeeHive partnerships.</p>" +
        "<div class=\"kpis\">" + cards.map(function (card) {
          return "<button type=\"button\" class=\"kpi\" data-nav=\"" + card[2] + "\"><span>" + card[0] + "</span><strong>" + card[1] + "</strong><em class=\"demo-tag\">Demo data</em></button>";
        }).join("") + "</div>" +
        "<h2>My partnerships</h2><div class=\"cards partners\">" + demoData.relationships.map(partnershipCard).join("") + "</div>" +
        "<h2>Recent attributed sales</h2><p>Order references only. Customer addresses and email addresses are not shown.</p>" +
        orderTable(demoData.orders.slice(0, 5));
      return;
    }
    var company = companyById(state.company);
    var campaigns = company.campaigns.length ? "<div class=\"cards\">" + company.campaigns.map(function (item) { return campaignCard(company, item); }).join("") + "</div>" : "<p>No active campaigns in this demo.</p>";
    document.querySelector("[data-mount='overview']").innerHTML =
      "<p class=\"kicker\">Your partnership</p><h1>" + esc(company.name) + "</h1><p class=\"lead\">" + esc(company.note) + "</p>" +
      "<button type=\"button\" class=\"text-btn\" data-switch-company=\"all\">All partnerships</button>" +
      "<article class=\"hero\"><p class=\"kicker\">Your current phase</p><p class=\"phase-no\">Phase " + company.phase + "</p><h2>" + esc(company.phaseName) + "</h2>" +
      "<p><span class=\"pill deep\">Current</span></p><p>Progress: " + esc(company.progress) + "</p><p>Next: " + esc(company.nextPhase) + "</p>" +
      "<p class=\"demo-tag\">Demo company configuration</p><p>" + esc(company.progressNote) + "</p></article>" +
      "<h2>Four phases</h2><p>The four phase names stay the same. This company sets its own requirements, rewards and campaign access.</p>" +
      phaseTrack(company.phase) + toolsBlock(company) + rewardBlock(company) +
      "<h2>Active campaigns</h2>" + campaigns +
      "<h2>Action centre</h2><p>What you can do in this partnership.</p><div class=\"actions\">" + company.actions.map(actionCard).join("") + "</div>" +
      "<div class=\"section-head\"><h2>Sales</h2>" + periodControls() + "</div>" + salesBlock() +
      "<h2>Recent attributed sales</h2>" + orderTable(visibleOrders());
  }

  function renderPartnerships() {
    document.querySelector("[data-mount='partnerships']").innerHTML =
      "<p class=\"kicker\">My partnerships</p><h1>My partnerships</h1><p class=\"lead\">Each company keeps its own phase. They are not one combined BeeHive level.</p>" +
      "<div class=\"cards partners\">" + demoData.relationships.map(partnershipCard).join("") + "</div>";
  }

  function renderDiscover() {
    document.querySelector("[data-mount='discover']").innerHTML =
      "<p class=\"kicker\">Discover</p><h1>Discover businesses</h1><p>Prototype only. Apply does not send an application.</p><div class=\"cards\">" +
      demoData.discover.map(function (item) {
        var label = item.state === "joined" ? "Already joined" : (item.state === "pending" ? "Application pending" : "Available to apply");
        var actions = item.state === "joined"
          ? "<button type=\"button\" class=\"primary\" data-open-company=\"" + item.id + "\">Open partnership</button>"
          : "<button type=\"button\" class=\"line\" data-programme=\"" + esc(item.name) + "\">View programme</button>" +
            (item.state === "pending"
              ? "<button type=\"button\" class=\"text-btn\" data-nav=\"applications\">View application</button>"
              : "<button type=\"button\" class=\"primary\" data-apply=\"" + esc(item.name) + "\">Apply</button>");
        return "<article class=\"card\"><p class=\"meta\">" + esc(item.category) + "</p><h3>" + esc(item.name) + "</h3><p><span class=\"pill" + (item.state === "open" ? "" : " warn") + "\">" + label + "</span></p><div class=\"row-actions\">" + actions + "</div></article>";
      }).join("") + "</div>";
  }

  function renderCampaigns() {
    var cards = [];
    selectedCompanies().forEach(function (company) {
      company.campaigns.forEach(function (campaign) { cards.push(campaignCard(company, campaign)); });
    });
    document.querySelector("[data-mount='campaigns']").innerHTML =
      "<p class=\"kicker\">Campaigns</p><h1>Campaigns</h1><p class=\"demo-tag\">Demo data</p>" +
      (cards.length ? "<div class=\"cards\">" + cards.join("") + "</div>" : "<p>No campaigns for this partnership in the demo.</p>");
  }

  function renderProducts() {
    var cards = [];
    selectedCompanies().forEach(function (company) {
      company.products.forEach(function (product) {
        var locked = product.fromPhase > company.phase;
        cards.push("<article class=\"card\"><p class=\"meta\">" + esc(company.name) + "</p><h3>" + esc(product.name) + "</h3>" +
          "<p>Available from phase " + product.fromPhase + "</p><p>Campaign: " + esc(product.campaign) + "</p>" +
          "<p>Partner link: <code>" + esc(company.code) + "</code></p><p>Materials: " + esc(product.materials) + "</p><p>" + esc(product.performance) + "</p>" +
          "<button type=\"button\" class=\"primary\" data-open-product=\"" + esc(company.id + "::" + product.name) + "\">" + (locked ? "Locked in this demo" : "Open opportunity") + "</button></article>");
      });
    });
    document.querySelector("[data-mount='products']").innerHTML =
      "<p class=\"kicker\">Products</p><h1>Products and opportunities</h1><p>What a partner can promote is decided by each company.</p>" +
      (cards.length ? "<div class=\"products\">" + cards.join("") + "</div>" : "<p>No product opportunities in this demo yet.</p>");
  }

  function renderSales() {
    var title = state.company === "all" ? "Sales across partnerships" : companyById(state.company).name + " sales";
    document.querySelector("[data-mount='sales']").innerHTML =
      "<p class=\"kicker\">Sales</p><h1>" + esc(title) + "</h1><div class=\"section-head\">" + periodControls() + "</div>" +
      salesBlock() + "<h2>Recent attributed orders</h2><p>Demo sample. Not the full order history, and not a customer database.</p>" + orderTable(visibleOrders());
  }

  function renderRewards() {
    var blocks = selectedCompanies().map(rewardBlock).join("");
    document.querySelector("[data-mount='rewards']").innerHTML =
      "<p class=\"kicker\">Rewards</p><h1>Rewards</h1><p>Rewards stay with the company that configured them. Store credit is only one possible type.</p>" + blocks;
  }

  function renderLinks() {
    document.querySelector("[data-mount='links']").innerHTML =
      "<p class=\"kicker\">My links</p><h1>My links</h1><p>Each partnership has its own code. There is no single code for every business.</p>" +
      selectedCompanies().map(toolsBlock).join("");
  }

  function renderProgress() {
    document.querySelector("[data-mount='progress']").innerHTML =
      "<p class=\"kicker\">My progress</p><h1>My progress</h1><p>Phases are not combined into one BeeHive level. Each company relationship stands on its own.</p>" +
      demoData.relationships.map(function (company) {
        var viewing = state.company === company.id ? " <span class=\"pill deep\">Viewing</span>" : "";
        return "<article class=\"card\"><h2>" + esc(company.name) + viewing + "</h2><p>Phase " + company.phase + " — " + esc(company.phaseName) + "</p><p>" + esc(company.progress) + "</p>" +
          (company.demoCompany ? "<p class=\"demo-tag\">Demo company</p>" : "") + phaseTrack(company.phase) +
          "<button type=\"button\" class=\"text-btn\" data-open-company=\"" + company.id + "\">Open " + esc(company.name) + "</button></article>";
      }).join("");
  }

  function renderApplications() {
    document.querySelector("[data-mount='applications']").innerHTML =
      "<p class=\"kicker\">Applications</p><h1>My applications</h1><p>Prototype only. Nothing here was sent to a company.</p><div class=\"cards\">" +
      demoData.applications.map(function (item) {
        return "<article class=\"card\"><h3>" + esc(item.name) + "</h3><p>Submitted " + esc(item.submitted) + "</p><p>" + statusPill(item.status) + "</p>" +
          "<button type=\"button\" class=\"primary\" data-programme=\"" + esc(item.name) + "\">Open programme</button></article>";
      }).join("") + "</div>";
  }

  function renderAccount() {
    var partner = demoData.partner;
    var connected = demoData.relationships.map(function (company) {
      return "<li>" + esc(company.name) + " — Phase " + company.phase + " " + esc(company.phaseName) + (company.demoCompany ? " (demo company)" : "") + "</li>";
    }).join("");
    document.querySelector("[data-mount='account']").innerHTML =
      "<p class=\"kicker\">Account</p><h1>Account</h1><p>This BeeHive identity is Emma’s. Companies do not each get a separate login in this model.</p>" +
      "<form class=\"settings\" data-demo-form action=\"#\" method=\"post\">" +
      "<p class=\"avatar\" aria-hidden=\"true\">EJ</p><p>Profile picture upload is not connected.</p>" +
      "<label>Name<input data-field=\"name\" value=\"" + esc(partner.name) + "\"></label>" +
      "<label>Email<input data-field=\"email\" type=\"email\" value=\"" + esc(partner.email) + "\"></label>" +
      "<label>Country<input data-field=\"country\" value=\"" + esc(partner.country) + "\"></label>" +
      "<label>Location<input value=\"" + esc(partner.location) + "\" readonly></label>" +
      "<label>BeeHive member since<input value=\"" + esc(partner.memberSince) + "\" readonly></label>" +
      "<label>Interests<textarea data-field=\"interests\">" + esc(partner.interests) + "</textarea></label>" +
      "<label>Social profiles<input data-field=\"social\" value=\"" + esc(partner.social) + "\"></label>" +
      "<label>Website<input data-field=\"website\" value=\"" + esc(partner.website) + "\"></label>" +
      "<label>Notification preferences<textarea data-field=\"notifications\">" + esc(partner.notifications) + "</textarea></label>" +
      "<label>Language<select data-field=\"language\"><option" + (partner.language === "English" ? " selected" : "") + ">English</option><option" + (partner.language === "Nederlands" ? " selected" : "") + ">Nederlands</option></select></label>" +
      "<h2>Security</h2><p>Sign-in is not connected. Password, sessions and two-factor checks are not available in this demo.</p>" +
      "<h2>Connected partnerships</h2><ul>" + connected + "</ul>" +
      "<p class=\"callout\" data-demo-note hidden>Demo only — nothing was saved.</p>" +
      "<button class=\"primary\" type=\"submit\">Save account</button></form>";
  }

  function renderHelp() {
    document.querySelector("[data-mount='help']").innerHTML =
      "<p class=\"kicker\">Help</p><h1>Help and support</h1><p>Answers describe the BeeHive model. They do not send a message.</p><div class=\"help\">" +
      demoData.help.map(function (item) {
        return "<details><summary>" + esc(item.q) + "</summary><p>" + esc(item.a) + "</p></details>";
      }).join("") + "</div>";
  }

  var views = {
    overview: renderOverview,
    partnerships: renderPartnerships,
    discover: renderDiscover,
    campaigns: renderCampaigns,
    products: renderProducts,
    sales: renderSales,
    rewards: renderRewards,
    links: renderLinks,
    progress: renderProgress,
    applications: renderApplications,
    account: renderAccount,
    help: renderHelp
  };

  function renderChrome() {
    var context = document.querySelector("[data-context]");
    if (state.company === "all") {
      context.innerHTML = "<strong>BeeHive Partner</strong><span>" + esc(demoData.partner.name) + " · " + esc(demoData.partner.location) + "</span>";
    } else {
      var company = companyById(state.company);
      context.innerHTML = "<strong>" + esc(company.name) + "</strong><span>Your partnership · Phase " + company.phase + "</span>";
    }
    var label = document.querySelector("[data-switcher-label]");
    label.textContent = state.company === "all" ? "All Partnerships" : companyById(state.company).name + " · Phase " + companyById(state.company).phase;
    var options = [{ id: "all", name: "All Partnerships", detail: "Every company" }].concat(demoData.relationships.map(function (company) {
      return { id: company.id, name: company.name, detail: "Phase " + company.phase + " — " + company.phaseName };
    }));
    document.querySelector("[data-switcher-menu]").innerHTML = options.map(function (option) {
      var selected = option.id === state.company ? "true" : "false";
      return "<button type=\"button\" role=\"option\" data-switch-company=\"" + option.id + "\" aria-selected=\"" + selected + "\"><span>" + esc(option.name) + "</span><small>" + esc(option.detail) + "</small></button>";
    }).join("");
  }

  function closePanel() {
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    panelBody.innerHTML = "";
    if (backdrop && !(sidebar && sidebar.classList.contains("is-open"))) backdrop.hidden = true;
  }

  function openPanel(title, body) {
    panelBody.innerHTML = "<h2>" + esc(title) + "</h2>" + body;
    panel.hidden = false;
    backdrop.hidden = false;
    var close = panel.querySelector("[data-close-panel]");
    if (close) close.focus();
  }

  function show(view, options) {
    options = options || {};
    state.view = view;
    closePanel();
    document.querySelectorAll("[data-view]").forEach(function (section) {
      section.hidden = section.getAttribute("data-view") !== view;
    });
    document.querySelectorAll(".side-nav [data-nav]").forEach(function (button) {
      if (button.getAttribute("data-nav") === view) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    if (sidebar) sidebar.classList.remove("is-open");
    if (backdrop) backdrop.hidden = true;
    renderChrome();
    views[view]();
    if (!options.silent) {
      var heading = document.querySelector("[data-view='" + view + "'] h1");
      if (heading) {
        if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
        heading.focus();
      }
    }
  }

  function setCollapsed(collapsed) {
    document.documentElement.classList.toggle("is-collapsed", collapsed);
    var button = document.querySelector("[data-collapse]");
    button.setAttribute("aria-expanded", collapsed ? "false" : "true");
    button.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
    var icon = button.querySelector(".ph");
    if (icon) {
      icon.classList.toggle("ph-caret-left", !collapsed);
      icon.classList.toggle("ph-caret-right", collapsed);
    }
    try { localStorage.setItem(STORAGE_KEY, collapsed ? "collapsed" : "expanded"); } catch (error) { /* preference only */ }
  }

  function findCampaign(id) {
    var found = null;
    demoData.relationships.forEach(function (company) {
      company.campaigns.forEach(function (campaign) {
        if (campaign.id === id) found = { company: company, campaign: campaign };
      });
    });
    return found;
  }

  function findAction(id) {
    var found = null;
    demoData.relationships.forEach(function (company) {
      company.actions.forEach(function (action) {
        if (action.id === id) found = { company: company, action: action };
      });
    });
    return found;
  }

  document.addEventListener("click", function (event) {
    var option = event.target.closest("[data-switch-company]");
    if (option) {
      state.company = option.getAttribute("data-switch-company");
      document.querySelector("[data-switcher-menu]").hidden = true;
      document.querySelector("[data-switcher-toggle]").setAttribute("aria-expanded", "false");
      renderChrome();
      views[state.view]();
    }
    var toggle = event.target.closest("[data-switcher-toggle]");
    if (toggle) {
      var menu = document.querySelector("[data-switcher-menu]");
      var open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    } else if (!event.target.closest(".switcher")) {
      document.querySelector("[data-switcher-menu]").hidden = true;
      document.querySelector("[data-switcher-toggle]").setAttribute("aria-expanded", "false");
    }
    var nav = event.target.closest("[data-nav]");
    if (nav && nav.getAttribute("data-nav")) show(nav.getAttribute("data-nav"));
    var openCompany = event.target.closest("[data-open-company]");
    if (openCompany) {
      state.company = openCompany.getAttribute("data-open-company");
      show("overview");
    }
    var period = event.target.closest("[data-period]");
    if (period) { state.period = period.getAttribute("data-period"); views[state.view](); }
    var trend = event.target.closest("[data-trend]");
    if (trend) { state.trend = trend.getAttribute("data-trend"); views[state.view](); }
    var copy = event.target.closest("[data-copy]");
    if (copy) {
      var value = copy.getAttribute("data-copy");
      var status = document.querySelector("[data-copy-status]");
      function mark(ok) {
        if (!status) return;
        status.textContent = ok ? "Copied for this demo. Nothing was published." : "Demo only — this browser did not copy the text.";
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(value).then(function () { mark(true); }, function () { mark(false); });
      else mark(false);
    }
    var landing = event.target.closest("[data-landing]");
    if (landing) openPanel("Landing page", "<p class=\"demo-tag\">Prototype only</p><p>No landing page is published for " + esc(companyName(landing.getAttribute("data-landing"))) + ".</p>");
    var materials = event.target.closest("[data-materials]");
    if (materials) openPanel("Marketing materials", "<p class=\"demo-tag\">Prototype only</p><p>No file is downloaded. A company would attach approved material here.</p>");
    var campaignButton = event.target.closest("[data-open-campaign]");
    if (campaignButton) {
      var campaign = findCampaign(campaignButton.getAttribute("data-open-campaign"));
      if (campaign) openPanel(campaign.campaign.name, "<p class=\"demo-tag\">" + esc(campaign.company.name) + "</p><p>Reward: " + esc(campaign.campaign.reward) + "</p><p>Sales " + money(campaign.campaign.sales) + " · " + campaign.campaign.orders + " orders</p><p>Status: " + esc(campaign.campaign.status) + "</p><p>Demo only. The campaign is not live.</p>");
    }
    var productButton = event.target.closest("[data-open-product]");
    if (productButton) {
      var parts = productButton.getAttribute("data-open-product").split("::");
      var owner = companyById(parts[0]);
      var product = owner.products.filter(function (item) { return item.name === parts[1]; })[0];
      openPanel(product.name, "<p class=\"demo-tag\">" + esc(owner.name) + "</p><p>Available from phase " + product.fromPhase + ". You are in phase " + owner.phase + ".</p><p>" + esc(product.performance) + "</p><p>Partner code " + esc(owner.code) + ".</p><p>Demo only.</p>");
    }
    var actionButton = event.target.closest("[data-action]");
    if (actionButton) {
      var action = findAction(actionButton.getAttribute("data-action"));
      if (action) openPanel(action.action.title, "<p>" + statusPill(action.action.status) + "</p><p>" + esc(action.action.requirement) + "</p><p>Possible reward: " + esc(action.action.reward) + "</p><p class=\"callout\">Demo only — nothing was submitted.</p>");
    }
    var apply = event.target.closest("[data-apply]");
    if (apply) openPanel("Apply", "<p class=\"demo-tag\">Prototype only</p><p>No application was sent to " + esc(apply.getAttribute("data-apply")) + ".</p>");
    var programme = event.target.closest("[data-programme]");
    if (programme) openPanel(programme.getAttribute("data-programme"), "<p class=\"demo-tag\">Prototype only</p><p>This programme page is not connected. No application was sent or changed.</p>");
    if (event.target.closest("[data-close-panel]")) closePanel();
    document.querySelectorAll("[data-popover]").forEach(function (box) { box.hidden = true; });
    var pop = event.target.closest("[data-pop]");
    if (pop) {
      var box = document.getElementById(pop.getAttribute("data-pop"));
      if (box) box.hidden = false;
    }
  });

  document.addEventListener("input", function (event) {
    var field = event.target.getAttribute("data-field");
    if (!field || !demoData.partner.hasOwnProperty(field)) return;
    demoData.partner[field] = event.target.value;
  });
  document.addEventListener("change", function (event) {
    var field = event.target.getAttribute("data-field");
    if (!field || !demoData.partner.hasOwnProperty(field)) return;
    demoData.partner[field] = event.target.value;
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
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    closePanel();
    sidebar.classList.remove("is-open");
    backdrop.hidden = true;
    document.querySelector("[data-switcher-menu]").hidden = true;
    document.querySelectorAll("[data-popover]").forEach(function (box) { box.hidden = true; });
  });
  document.addEventListener("submit", function (event) {
    var form = event.target.closest("[data-demo-form]");
    if (!form) return;
    event.preventDefault();
    var note = form.querySelector("[data-demo-note]");
    if (!note) return;
    note.hidden = false;
    note.focus();
  });

  setCollapsed(document.documentElement.classList.contains("is-collapsed"));
  show("overview", { silent: true });
}());
