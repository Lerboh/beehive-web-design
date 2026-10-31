# Builds the Business and Partner pages for all 12 concepts and trims each homepage.
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

CONCEPTS = [
    dict(slug="v2-01-human-network", css="css/v2-01-human-network.css", body="hn", name="Human Network", bleed=False,
         biz="biz-select-products", par="par-customer", shared="shared-campaign-review", biz2="biz-catalogue", par2="par-demo",
         biz_alt="A shop owner selecting plain products from stocked shelves.",
         par_alt="A partner sitting with a customer who is examining a plain bottle.",
         shared_alt="A business owner and a partner comparing plain products and blank cards.",
         biz2_alt="Hands selecting among plain jars, linen and cups.",
         par2_alt="A partner demonstrating a plain jar across a counter."),
    dict(slug="v2-02-split-stories", css="css/v2-02-split-stories.css", body="ss", name="Split Stories", bleed=True,
         biz="biz-campaign-team", par="par-filming", shared="shared-customer-context", biz2="biz-retail-materials", par2="par-photo",
         biz_alt="Three people arranging plain products and campaign materials.",
         par_alt="A partner setting a phone on a tripod to film plain bottles.",
         shared_alt="A partner explaining a product to a customer while a shop owner works behind the counter.",
         biz2_alt="A retailer preparing plain jars and paper sleeves.",
         par2_alt="A partner photographing plain bottles on a table."),
    dict(slug="v2-03-living-hive", css="css/v2-03-living-hive.css", body="lh", name="Living Hive", bleed=False,
         biz="biz-beauty-owner", par="par-community", shared="shared-workshop", biz2="biz-seasonal", par2="par-beauty",
         biz_alt="A shop owner lining up plain bottles on a counter.",
         par_alt="A partner demonstrating a plain jar to a small group.",
         shared_alt="A small demonstration around a work table.",
         biz2_alt="Two people building a seasonal display of plain products.",
         par2_alt="A partner filming a plain bottle on linen."),
    dict(slug="v2-04-premium-editorial", css="css/v2-04-premium-editorial.css", body="pe", name="Premium Editorial", bleed=True,
         biz="biz-founder-rules", par="par-photo", shared="shared-studio-review", biz2="biz-programme-wall", par2="par-content",
         biz_alt="A founder grouping plain product samples on a standing table.",
         par_alt="A partner photographing plain bottles with a small camera.",
         shared_alt="Two people reviewing plain bottles on a stone bench.",
         biz2_alt="Two colleagues arranging blank cards and product samples on a wall.",
         par2_alt="Hands arranging a plain bottle, a blank card and a camera."),
    dict(slug="v3-05-commerce-motion", css="css/v3-05-commerce-motion.css", body="cm", name="Commerce in Motion", bleed=False,
         biz="biz-catalogue", par="par-recommendation", shared="shared-product-line", biz2="biz-inventory", par2="par-retail",
         biz_alt="Hands choosing among several kinds of plain products.",
         par_alt="A partner handing a plain wrapped item to a customer.",
         shared_alt="Two people reviewing a line of plain bottles.",
         biz2_alt="A business owner checking plain stock in a storeroom.",
         par2_alt="A partner showing a plain product on a shop shelf."),
    dict(slug="v3-06-faces-growth", css="css/v3-06-faces-growth.css", body="fg", name="Faces of Growth", bleed=False,
         biz="biz-onboarding", par="par-wellness", shared="shared-brief-table", biz2="biz-wellness-team", par2="par-event",
         biz_alt="A business owner showing plain samples to two colleagues.",
         par_alt="A coach placing a plain bottle beside a client.",
         shared_alt="Two people reviewing samples and blank sheets together.",
         biz2_alt="A small team setting out plain bottles and towels.",
         par2_alt="A partner showing a plain jar at a small market table."),
    dict(slug="v3-07-hive-platform", css="css/v3-07-hive-platform.css", body="hp", name="Hive Platform", bleed=False,
         biz="biz-performance", par="par-beauty", shared="shared-retail-floor", biz2="biz-programme-wall", par2="par-compare",
         biz_alt="A business owner reviewing plain samples beside blank cards.",
         par_alt="A partner filming a plain bottle on linen.",
         shared_alt="A shop owner and a partner arranging plain bags on a counter.",
         biz2_alt="Two colleagues planning with blank cards and samples.",
         par2_alt="A partner comparing two separate groups of plain products."),
    dict(slug="v3-08-community-network", css="css/v3-08-community-network.css", body="cn", name="Community Network", bleed=False,
         biz="biz-local-retail", par="par-event", shared="shared-cafe-collab", biz2="biz-food-owner", par2="par-community",
         biz_alt="A shopkeeper arranging plain goods in a neighbourhood store.",
         par_alt="A partner showing a plain jar at a small outdoor table.",
         shared_alt="A baker and a partner arranging bread and plain jars.",
         biz2_alt="A food-business owner arranging plain jars and bread.",
         par2_alt="A partner demonstrating a jar to a small group."),
    dict(slug="v4-09-kinetic-hive", css="css/v4-09-kinetic-hive.css", body="kh", name="Kinetic Hive", bleed=False,
         biz="biz-ecommerce", par="par-food", shared="shared-launch-prep", biz2="biz-inventory", par2="par-filming",
         biz_alt="A person packing plain products into kraft mailers.",
         par_alt="A partner handing bread to a customer.",
         shared_alt="People preparing a simple display of plain products.",
         biz2_alt="A business owner checking plain stock.",
         par2_alt="A partner filming plain bottles."),
    dict(slug="v4-10-icon-language", css="css/v4-10-icon-language.css", body="il", name="Icon Language", bleed=False,
         biz="biz-food-owner", par="par-brief", shared="shared-sample-selection", biz2="biz-catalogue", par2="par-multi",
         biz_alt="A food-business owner arranging plain jars and bread.",
         par_alt="A partner reviewing plain samples and blank cards at a table.",
         shared_alt="Two people comparing jars and folded fabric.",
         biz2_alt="Hands choosing among plain products.",
         par2_alt="One table with jars, linen, bread and cups."),
    dict(slug="v4-11-cinematic-commerce", css="css/v4-11-cinematic-commerce.css", body="cc", name="Cinematic Commerce", bleed=True,
         biz="biz-fashion-buyer", par="par-fashion", shared="shared-fashion-rack", biz2="biz-home-lifestyle", par2="par-home",
         biz_alt="A buyer selecting plain garments on a studio table.",
         par_alt="A partner showing a plain garment to a customer.",
         shared_alt="Two people looking through a rack of plain garments.",
         biz2_alt="A person laying out cups and linen on a table.",
         par2_alt="A partner demonstrating a cup and linen at a dining table."),
    dict(slug="v4-12-guided-journey", css="css/v4-12-guided-journey.css", body="gj", name="Guided Journey", bleed=False,
         biz="biz-service-desk", par="par-home", shared="shared-service-consult", biz2="biz-onboarding", par2="par-service",
         biz_alt="A service-business owner organising a plain sample and blank folders.",
         par_alt="A partner demonstrating a cup and linen to a guest.",
         shared_alt="Two people reviewing a plain sample at a small table.",
         biz2_alt="A business owner showing samples to colleagues.",
         par2_alt="A partner introducing a plain kit to a client."),
]

NAV_SCRIPT = """
  <script>
    (function () {
      var toggle = document.querySelector("[data-nav-toggle]");
      var nav = document.querySelector("[data-nav]");
      if (!toggle || !nav) return;
      function setOpen(open) { toggle.setAttribute("aria-expanded", open ? "true" : "false"); nav.classList.toggle("is-open", open); }
      toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
      nav.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", function () { setOpen(false); }); });
      document.addEventListener("keydown", function (event) { if (event.key === "Escape") setOpen(false); });
    }());
  </script>
"""


def img(name):
    folder = "business" if name.startswith("biz-") else "partners" if name.startswith("par-") else "shared"
    return f"assets/generated/v5/{folder}/{name}.webp"


def header(c, current):
    slug = c["slug"]
    def item(key, href, label):
        cur = ' aria-current="page"' if key == current else ""
        return f'<a href="{href}"{cur}>{label}</a>'
    links = "\n      ".join([
        item("home", f"{slug}.html", "Home"),
        item("biz", f"{slug}-business.html", "For Businesses"),
        item("par", f"{slug}-partner.html", "For Partners"),
        item("", f"{slug}.html#how-it-works", "How It Works"),
        item("", f"{slug}.html#partner-program", "Partner Program"),
    ])
    started = f"{slug}-business.html#apply" if current == "biz" else f"{slug}-partner.html#apply" if current == "par" else f"{slug}.html#routes"
    return f"""  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="{slug}.html">BeeHive<span>.Partners</span></a>
    <a class="lab" href="design-lab.html">Design lab</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav" data-nav-toggle><span></span><span class="sr">Menu</span></button>
    <nav class="nav" id="nav" data-nav>
      {links}
    </nav>
    <a class="btn btn-gold btn-header" href="{started}">Get Started</a>
  </header>"""


def footer(c):
    slug = c["slug"]
    return f"""  <footer class="site-footer">
    <div class="wrap">
      <div><a class="brand" href="{slug}.html">BeeHive<span>.Partners</span></a><p>The platform for structured partnerships between businesses and the people who help their brands grow.</p></div>
      <div><h2 class="eyebrow">Platform</h2><p><a href="{slug}-business.html">For Businesses</a></p><p><a href="{slug}-partner.html">For Partners</a></p><p><a href="{slug}.html#how-it-works">How It Works</a></p><p><a href="{slug}.html#partner-program">Partner Program</a></p></div>
      <div><h2 class="eyebrow">Company</h2><p>About <span>Coming later</span></p><p>Contact <span>Coming later</span></p></div>
    </div>
  </footer>"""


def shell(c, kind, title, body):
    klass = c["body"] + (" v5-biz" if kind == "biz" else " v5-par v5-parpage")
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} — {c["name"]} — BeeHive.Partners</title>
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="vendor/phosphor/regular/style.css">
  <link rel="stylesheet" href="css/v2-base.css">
  <link rel="stylesheet" href="css/v2-hex.css">
  <link rel="stylesheet" href="{c["css"]}">
  <link rel="stylesheet" href="css/v5-journey.css">
</head>
<body class="{klass}">
{header(c, kind)}
  <main id="main">
{body}
  </main>
{footer(c)}
{NAV_SCRIPT}
  <script src="js/v5-forms.js"></script>
</body>
</html>
"""


def hero(c, kind):
    if kind == "biz":
        kicker, h1, lead, cta = (
            "For businesses",
            "Build a partner programme around your business.",
            "BeeHive gives your business one structured programme for bringing partners in, deciding what they may promote, and developing the relationship over four phases.",
            "Yes, I want BeeHive for my business",
        )
        photo, alt = c["biz"], c["biz_alt"]
    else:
        kicker, h1, lead, cta = (
            "For partners",
            "Grow with businesses you believe in.",
            "Join BeeHive with one identity. Each business you work with stays a separate partnership, with its own phase, rules and rewards.",
            "Yes, I want to become a partner",
        )
        photo, alt = c["par"], c["par_alt"]
    if c["bleed"]:
        return f"""    <section class="v5-hero v5-hero--bleed v5-hero--{kind}" aria-labelledby="hero-title">
      <img src="{img(photo)}" alt="{alt}" width="1280" height="720">
      <div class="v5-veil" aria-hidden="true"></div>
      <div class="wrap">
        <p class="v5-kicker">{kicker}</p>
        <h1 id="hero-title">{h1}</h1>
        <p class="lead">{lead}</p>
        <div class="actions">
          <a class="btn btn-gold" href="#apply">{cta}</a>
          <a class="btn btn-line-light" href="#how">See how it works</a>
        </div>
      </div>
    </section>"""
    return f"""    <section class="v5-hero v5-hero--{kind}" aria-labelledby="hero-title">
      <div class="wrap v5-hero__grid">
        <div>
          <p class="v5-kicker">{kicker}</p>
          <h1 id="hero-title">{h1}</h1>
          <p class="lead">{lead}</p>
          <div class="actions">
            <a class="btn btn-gold" href="#apply">{cta}</a>
            <a class="btn btn-line" href="#how">See how it works</a>
          </div>
        </div>
        <img src="{img(photo)}" alt="{alt}" width="1280" height="720">
      </div>
    </section>"""


def business_body(c):
    return f"""{hero(c, "biz")}
    <section class="v5-block" id="how" aria-labelledby="problem-title">
      <div class="wrap v5-split">
        <img src="{img(c["biz2"])}" alt="{c["biz2_alt"]}" width="1280" height="720" loading="lazy">
        <div>
          <p class="v5-kicker">The problem</p>
          <h2 id="problem-title">Partnerships get scattered.</h2>
          <p>Affiliate codes, ambassadors, creators, referrals, campaigns and rewards often live in different spreadsheets and message threads. BeeHive is a partner-programme platform. Its value is structure: one programme for your business, with clear rules for who joins and what they may do.</p>
        </div>
      </div>
    </section>
    <section class="v5-block" aria-labelledby="control-title">
      <div class="wrap">
        <p class="v5-kicker">What you control</p>
        <h2 id="control-title">The business sets the terms.</h2>
        <ul class="v5-grid icons">
          <li><i class="ph ph-squares-four" aria-hidden="true"></i><div><h3>Programme rules</h3><p>Eligibility, conditions and what “progress” means for your business.</p></div></li>
          <li><i class="ph ph-users-three" aria-hidden="true"></i><div><h3>Who can join</h3><p>You decide which partners belong in this programme.</p></div></li>
          <li><i class="ph ph-package" aria-hidden="true"></i><div><h3>The offer</h3><p>Which products or services partners are allowed to promote.</p></div></li>
          <li><i class="ph ph-megaphone" aria-hidden="true"></i><div><h3>Campaigns</h3><p>Seasonal work, launches and content assignments you choose to run.</p></div></li>
          <li><i class="ph ph-coins" aria-hidden="true"></i><div><h3>Rewards</h3><p>Commission, benefits and recognition stay yours to define.</p></div></li>
          <li><i class="ph ph-gear" aria-hidden="true"></i><div><h3>Requirements</h3><p>Content standards and business-specific conditions.</p></div></li>
        </ul>
      </div>
    </section>
    <section class="v5-block" id="partner-program" aria-labelledby="phase-title">
      <div class="wrap">
        <p class="v5-kicker">Four phases</p>
        <h2 id="phase-title">A framework you configure.</h2>
        <p>The four phases are fixed as a structure. They are not BeeHive subscriptions, and BeeHive does not set your sales thresholds. You decide what each phase asks for and what it offers.</p>
        <ol class="v5-phases">
          <li><h3>01 · Onboard and evaluate</h3><p>A partner enters your programme and you see whether the relationship should continue.</p></li>
          <li><h3>02 · Activate and motivate</h3><p>Partners take part, promote within your rules, and start building the relationship.</p></li>
          <li><h3>03 · Deepen the commercial relationship</h3><p>Broader opportunities open when you decide the partnership is ready.</p></li>
          <li><h3>04 · A professional partnership</h3><p>A more structured commercial collaboration, still on your terms.</p></li>
        </ol>
      </div>
    </section>
    <section class="v5-block" aria-labelledby="pool-title">
      <div class="wrap">
        <p class="v5-kicker">Your partner pool</p>
        <h2 id="pool-title">One business. Its own programme.</h2>
        <p>Your partners, phases, rewards and progress belong to your programme. A partner may also work with another business. That relationship stays separate. It does not merge into yours.</p>
        <p><span class="v5-status">Current development example</span></p>
        <p>MUSKLE is the first business environment being used to develop and test the BeeHive partner model in practice. It is not the owner of the platform.</p>
      </div>
    </section>
    <section class="v5-block" aria-labelledby="camp-title">
      <div class="wrap">
        <p class="v5-status">Planned capability</p>
        <h2 id="camp-title">Campaigns the business organises.</h2>
        <p>BeeHive is being designed so a business can offer specific work inside its programme: a product, a season, a launch, or a content assignment. Partners only promote what that business has approved.</p>
        <ul class="v5-grid icons">
          <li><i class="ph ph-package" aria-hidden="true"></i><div><h3>Products and services</h3><p>The offer partners are allowed to talk about.</p></div></li>
          <li><i class="ph ph-megaphone" aria-hidden="true"></i><div><h3>A defined campaign</h3><p>A launch, a season, or a promotion with a clear brief.</p></div></li>
          <li><i class="ph ph-storefront" aria-hidden="true"></i><div><h3>Your conditions</h3><p>Timing, materials and what “done” means stay with you.</p></div></li>
        </ul>
      </div>
    </section>
    <section class="v5-block" aria-labelledby="data-title">
      <div class="wrap">
        <p class="v5-status">Concept UI</p>
        <h2 id="data-title">What a business would see.</h2>
        <p>This table is a design concept, not a live dashboard. It shows the kinds of information the programme is being shaped around.</p>
        <table class="v5-table">
          <thead><tr><th>Area</th><th>What it is for</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Partners</td><td>People in this business programme</td><td>In development</td></tr>
            <tr><td>Activity</td><td>Promotion and participation you define</td><td>In development</td></tr>
            <tr><td>Progress</td><td>Phase inside your rules</td><td>In development</td></tr>
            <tr><td>Campaigns</td><td>Work you assign</td><td>Planned capability</td></tr>
            <tr><td>Tracking</td><td>Codes and commercial follow-through</td><td>In development</td></tr>
            <tr><td>Rewards</td><td>What you have chosen to offer</td><td>In development</td></tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="v5-block" aria-labelledby="onboard-title">
      <div class="wrap">
        <p class="v5-kicker">Setup</p>
        <h2 id="onboard-title">How a business comes on.</h2>
        <ol class="v5-steps">
          <li><span class="v5-num">01</span><div><h3>The business joins BeeHive</h3><p>You start a programme for your company, not a shared account with your partners.</p></div></li>
          <li><span class="v5-num">02</span><div><h3>The programme is configured</h3><p>Phases stay. You decide what each one requires and offers.</p></div></li>
          <li><span class="v5-num">03</span><div><h3>The offer and the rules are defined</h3><p>Products, services, content requirements and rewards.</p></div></li>
          <li><span class="v5-num">04</span><div><h3>Partners can join</h3><p>Joining BeeHive does not by itself put someone into your programme.</p></div></li>
          <li><span class="v5-num">05</span><div><h3>You manage the relationships</h3><p>Progress, campaigns and rewards stay inside your programme.</p></div></li>
        </ol>
      </div>
    </section>
    <section class="v5-block" aria-labelledby="price-title">
      <div class="wrap">
        <h2 id="price-title">Setup, then an ongoing plan.</h2>
        <p>BeeHive’s commercial model for businesses is a one-time setup plus an ongoing platform plan.</p>
        <div class="v5-price">
          <article><h3>One-time setup</h3><p>Programme configuration and onboarding.</p><strong>To be defined</strong></article>
          <article><h3>Ongoing platform plan</h3><p>Continued access to the BeeHive programme.</p><strong>To be defined</strong></article>
        </div>
        <p>Final pricing and plan structure are still being defined.</p>
      </div>
    </section>
    <section class="v5-block" aria-labelledby="faq-title">
      <div class="wrap">
        <h2 id="faq-title">Questions from businesses</h2>
        <div class="v5-faq">
          <details><summary>What is BeeHive?</summary><p>BeeHive connects a business with partners who help that business grow. The business runs a programme. The partner keeps one identity and can join more than one business, separately.</p></details>
          <details><summary>Can we decide our own rewards?</summary><p>Yes. Commission, benefits and other rewards are set by the business, not by a BeeHive price list.</p></details>
          <details><summary>Can we choose how partners progress?</summary><p>Yes. The four-phase framework is fixed. The criteria and benefits inside it are yours.</p></details>
          <details><summary>Are the four phases fixed?</summary><p>The sequence is the BeeHive framework: onboard, activate, deepen, then a professional partnership. BeeHive does not invent a sales threshold for you.</p></details>
          <details><summary>Can partners work with other businesses?</summary><p>Yes. Phase, progress, terms and rewards stay separate for each business.</p></details>
          <details><summary>Does our programme stay separate?</summary><p>Yes. Another company’s partner relationship is not part of your programme.</p></details>
          <details><summary>Can we decide which products partners promote?</summary><p>Yes. Partners promote the products and services you approve for your programme.</p></details>
          <details><summary>How does setup work?</summary><p>The business joins, the programme is configured, the offer and rules are defined, then partners can be accepted into that programme. The working product is still in development.</p></details>
          <details><summary>Are prices final?</summary><p>No. Setup and the ongoing plan are still to be defined.</p></details>
        </div>
      </div>
    </section>
    <section class="v5-block" id="apply" aria-labelledby="apply-title">
      <div class="wrap">
        <h2 id="apply-title">Yes, I want BeeHive for my business</h2>
        <p class="v5-proto">Design prototype — submission is not connected yet.</p>
        <form class="v5-form" data-prototype-form action="#" method="post">
          <div class="two">
            <label>Company name<input name="company" required autocomplete="organization"></label>
            <label>Contact name<input name="contact" required autocomplete="name"></label>
            <label>Business email<input name="email" type="email" required autocomplete="email"></label>
            <label>Website<input name="website" type="url" autocomplete="url"></label>
            <label>Country<input name="country" required autocomplete="country-name"></label>
            <label>Business category<input name="category" required></label>
            <label>E-commerce platform or system<input name="platform"></label>
            <fieldset class="v5-field"><legend>Current partner or affiliate programme?</legend>
              <div class="v5-choice">
                <label><input type="radio" name="existing" value="yes" required>Yes</label>
                <label><input type="radio" name="existing" value="no">No</label>
              </div>
            </fieldset>
          </div>
          <label>Approximate number of current partners, if you have them<input name="partners" inputmode="numeric"></label>
          <label>What would you like BeeHive to help you manage?<textarea name="manage" required></textarea></label>
          <p class="v5-proto" data-prototype-note tabindex="-1" hidden>Prototype only — no data submitted.</p>
          <button class="btn btn-gold" type="submit">Request BeeHive setup</button>
        </form>
      </div>
    </section>"""


def partner_body(c):
    return f"""{hero(c, "par")}
    <section class="v5-block" id="how" aria-labelledby="value-title">
      <div class="wrap v5-split">
        <img src="{img(c["par2"])}" alt="{c["par2_alt"]}" width="1280" height="720" loading="lazy">
        <div>
          <p class="v5-kicker">The role</p>
          <h2 id="value-title">You join a programme. You do not become the business.</h2>
          <p>A BeeHive partner promotes products and services a business has approved, takes part in that business’s work, and can grow inside the rules that business set. You can do this with more than one business. Each relationship keeps its own phase, progress and rewards.</p>
        </div>
      </div>
    </section>
    <section class="v5-block" aria-labelledby="id-title">
      <div class="wrap">
        <p class="v5-kicker">One identity</p>
        <h2 id="id-title">One BeeHive identity. Separate partnerships.</h2>
        <div class="v5-id">
          <article><strong>Your BeeHive identity</strong><p>One profile. It is not owned by a single company.</p></article>
          <article><strong>MUSKLE</strong><p>Current development example. Its phase, rules and rewards would belong only to that programme.</p></article>
          <article><strong>Company B</strong><p>A placeholder for a second business. Nothing carries over from the first programme.</p></article>
          <article><strong>Company C</strong><p>Another separate relationship, with its own opportunities.</p></article>
        </div>
      </div>
    </section>
    <section class="v5-block" id="partner-program" aria-labelledby="phase-title">
      <div class="wrap">
        <p class="v5-kicker">Four phases</p>
        <h2 id="phase-title">Growth inside a business’s rules.</h2>
        <p>Phases are not a promise of income. The business decides what each phase requires. BeeHive does not publish a sales threshold.</p>
        <ol class="v5-phases">
          <li><h3>01 · Start</h3><p>Join and learn how that business wants the relationship to work.</p></li>
          <li><h3>02 · Active</h3><p>Participate, promote and start building results inside the rules that business set.</p></li>
          <li><h3>03 · Grow</h3><p>Broader opportunities open when the business says the partnership is ready.</p></li>
          <li><h3>04 · Professional</h3><p>A deeper commercial relationship, still specific to that business.</p></li>
        </ol>
      </div>
    </section>
    <section class="v5-block" aria-labelledby="do-title">
      <div class="wrap">
        <h2 id="do-title">The kind of work a partnership can include.</h2>
        <p>These are the activities BeeHive is being shaped around. A business chooses which of them apply. They are not all available as finished tools today.</p>
        <ul class="v5-grid icons">
          <li><i class="ph ph-link" aria-hidden="true"></i><div><h3>Share a referral</h3><p>A code or link the business provides.</p></div></li>
          <li><i class="ph ph-package" aria-hidden="true"></i><div><h3>Promote approved products</h3><p>Only what that business has allowed.</p></div></li>
          <li><i class="ph ph-video-camera" aria-hidden="true"></i><div><h3>Create content</h3><p>Film, photograph or explain the offer.</p></div></li>
          <li><i class="ph ph-megaphone" aria-hidden="true"></i><div><h3>Join a campaign</h3><p>A launch, a season, or a brief from the business.</p></div></li>
          <li><i class="ph ph-users" aria-hidden="true"></i><div><h3>Meet customers</h3><p>Recommend the product in a real conversation.</p></div></li>
          <li><i class="ph ph-handshake" aria-hidden="true"></i><div><h3>Stay with the relationship</h3><p>Events and longer commercial collaboration, when the business offers them.</p></div></li>
        </ul>
      </div>
    </section>
    <section class="v5-block" aria-labelledby="tools-title">
      <div class="wrap">
        <h2 id="tools-title">Tools, and how far they are.</h2>
        <table class="v5-table">
          <thead><tr><th>Area</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>One partner identity across businesses</td><td>In development</td></tr>
            <tr><td>Partner view of a programme</td><td>In development</td></tr>
            <tr><td>Links and codes</td><td>In development</td></tr>
            <tr><td>Progress and rewards</td><td>In development</td></tr>
            <tr><td>Campaign briefs</td><td>Planned capability</td></tr>
            <tr><td>Content resources from the business</td><td>Planned capability</td></tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="v5-block" aria-labelledby="pages-title">
      <div class="wrap">
        <p class="v5-status">Planned capability</p>
        <h2 id="pages-title">Personal product pages</h2>
        <p>Partners may eventually be able to create their own pages from products, content and rules a business has already approved. That capability does not exist today. A partner would not invent an offer the business has not allowed.</p>
      </div>
    </section>
    <section class="v5-block" aria-labelledby="faq-title">
      <div class="wrap">
        <h2 id="faq-title">Questions from partners</h2>
        <div class="v5-faq">
          <details><summary>What is a BeeHive partner?</summary><p>A person with one BeeHive identity who can join the programmes of participating businesses.</p></details>
          <details><summary>Can I work with more than one business?</summary><p>Yes. Each business keeps its own phase, rules, opportunities and rewards.</p></details>
          <details><summary>Is my phase the same everywhere?</summary><p>No. Phase belongs to the relationship with that business.</p></details>
          <details><summary>Who decides my rewards?</summary><p>The business. BeeHive does not set a universal commission.</p></details>
          <details><summary>Do I have to buy the products?</summary><p>BeeHive does not require that. A business may set its own conditions for its programme.</p></details>
          <details><summary>Do I manage shipping?</summary><p>BeeHive is not the shop. Promoting a product does not make you responsible for that business’s orders or shipping.</p></details>
          <details><summary>Can I choose what to promote?</summary><p>You promote what that business has approved. You do not add your own products to its programme.</p></details>
          <details><summary>How do I progress?</summary><p>By the criteria that business configured. There is no BeeHive sales threshold.</p></details>
          <details><summary>Can I leave a business programme?</summary><p>Ending one programme is designed to leave your BeeHive identity, and your other partnerships, in place.</p></details>
          <details><summary>What happens to my profile?</summary><p>The identity stays yours. Partnerships stay separate from each other.</p></details>
        </div>
      </div>
    </section>
    <section class="v5-block" id="apply" aria-labelledby="apply-title">
      <div class="wrap">
        <h2 id="apply-title">Yes, I want to become a partner</h2>
        <p class="v5-proto">Design prototype — submission is not connected yet.</p>
        <form class="v5-form" data-prototype-form action="#" method="post">
          <div class="two">
            <label>First name<input name="first" required autocomplete="given-name"></label>
            <label>Last name<input name="last" required autocomplete="family-name"></label>
            <label>Email<input name="email" type="email" required autocomplete="email"></label>
            <label>Country<input name="country" required autocomplete="country-name"></label>
          </div>
          <fieldset class="v5-field"><legend>Main area</legend>
            <div class="v5-choice">
              <label><input type="radio" name="area" value="sport" required>Sport / wellness</label>
              <label><input type="radio" name="area" value="beauty">Beauty</label>
              <label><input type="radio" name="area" value="fashion">Fashion</label>
              <label><input type="radio" name="area" value="food">Food</label>
              <label><input type="radio" name="area" value="lifestyle">Lifestyle</label>
              <label><input type="radio" name="area" value="other">Other</label>
            </div>
          </fieldset>
          <fieldset class="v5-field"><legend>How do you currently reach people?</legend>
            <div class="v5-choice">
              <label><input type="radio" name="reach" value="social" required>Social media</label>
              <label><input type="radio" name="reach" value="customers">Personal customers</label>
              <label><input type="radio" name="reach" value="community">Community</label>
              <label><input type="radio" name="reach" value="coaching">Coaching</label>
              <label><input type="radio" name="reach" value="content">Content creation</label>
              <label><input type="radio" name="reach" value="other">Other</label>
            </div>
          </fieldset>
          <label>Social profile or website, if you have one<input name="profile" type="url" autocomplete="url"></label>
          <label>Why do you want to join BeeHive?<textarea name="why" required></textarea></label>
          <label class="v5-check"><input type="checkbox" name="understand" required>I understand that joining BeeHive does not automatically mean acceptance into every business programme.</label>
          <p class="v5-proto" data-prototype-note tabindex="-1" hidden>Prototype only — no data submitted.</p>
          <button class="btn btn-gold" type="submit">Apply to become a partner</button>
        </form>
      </div>
    </section>"""


def remove_sections(html):
    drop_ids = {"for-businesses", "for-partners", "get-started"}
    drop_labels = {"plans-title", "price-title", "biz2-title", "par2-title"}
    out = []
    i = 0
    while True:
        start = html.find("<section", i)
        if start == -1:
            out.append(html[i:])
            break
        out.append(html[i:start])
        end_tag = html.find(">", start)
        open_tag = html[start:end_tag + 1]
        depth = 1
        j = end_tag + 1
        while depth and j < len(html):
            nxt_open = html.find("<section", j)
            nxt_close = html.find("</section>", j)
            if nxt_close == -1:
                break
            if nxt_open != -1 and nxt_open < nxt_close:
                depth += 1
                j = nxt_open + 8
            else:
                depth -= 1
                j = nxt_close + len("</section>")
        block = html[start:j]
        attrs = open_tag
        sid = re.search(r'id="([^"]+)"', attrs)
        lab = re.search(r'aria-labelledby="([^"]+)"', attrs)
        sid = sid.group(1) if sid else ""
        lab = lab.group(1) if lab else ""
        if sid in drop_ids or lab in drop_labels:
            i = j
            continue
        out.append(block)
        i = j
    return "".join(out)


def routes(c):
    slug = c["slug"]
    return f"""
    <section class="v5-link" aria-labelledby="link-title">
      <div class="wrap v5-link__grid">
        <img src="{img(c["shared"])}" alt="{c["shared_alt"]}" width="1280" height="720" loading="lazy">
        <div>
          <p class="v5-kicker">One hive</p>
          <h2 id="link-title">BeeHive connects a business with the partners who help it grow.</h2>
          <p>The business keeps its own programme. The partner keeps one identity, and a separate relationship with each business.</p>
        </div>
      </div>
    </section>
    <section class="v5-routes" id="routes" aria-labelledby="routes-title">
      <div class="wrap">
        <h2 id="routes-title">Choose your side.</h2>
        <div class="v5-routes__grid">
          <article class="v5-routes__biz">
            <p class="eyebrow">For businesses</p>
            <h3>Build your partner programme.</h3>
            <p>A structured place to bring partners in and develop the relationship.</p>
            <a class="btn btn-gold" href="{slug}-business.html">Explore for Businesses</a>
          </article>
          <article class="v5-routes__par">
            <p class="eyebrow">For partners</p>
            <h3>Build relationships and grow.</h3>
            <p>One identity. A separate partnership with each business you join.</p>
            <a class="btn btn-solid" href="{slug}-partner.html">Explore for Partners</a>
          </article>
        </div>
      </div>
    </section>
"""


def patch_home(c):
    path = ROOT / f"{c['slug']}.html"
    html = path.read_text(encoding="utf-8")
    if "v5-journey.css" not in html:
        html = html.replace("</head>", '  <link rel="stylesheet" href="css/v5-journey.css">\n</head>')
    html = html.replace('href="#top"', f'href="{c["slug"]}.html"', 1)
    nav_only = re.search(r'<nav class="nav" id="nav" data-nav>.*?</nav>', header(c, "home"), re.S).group(0)
    html = re.sub(r'<nav class="nav" id="nav" data-nav>.*?</nav>', nav_only, html, count=1, flags=re.S)
    html = html.replace('href="#for-businesses"', f'href="{c["slug"]}-business.html"')
    html = html.replace('href="#for-partners"', f'href="{c["slug"]}-partner.html"')
    html = html.replace('href="#get-started"', 'href="#routes"')
    html = remove_sections(html)
    # Insert routes before footer if missing
    if 'id="routes"' not in html:
        html = html.replace("<footer", routes(c) + "\n  <footer", 1)
        if "<footer" not in html.split('id="routes"')[0]:
            pass
    # If footer class was site-footer and replace already happened via first footer
    if 'id="routes"' not in html:
        html = html.replace("</main>", routes(c) + "\n  </main>", 1)
    path.write_text(html, encoding="utf-8")


def update_lab():
    path = ROOT / "design-lab.html"
    html = path.read_text(encoding="utf-8")
    html = html.replace("Twelve visual directions for review", "12 complete BeeHive design systems")
    note = "Each concept includes a platform homepage, a Business journey and a Partner journey."
    if note not in html:
        html = html.replace(
            '<p class="lab-sub">12 complete BeeHive design systems</p>',
            '<p class="lab-sub">12 complete BeeHive design systems</p>\n    <p class="lab-note">' + note + "</p>",
        )
    def links(m):
        href = m.group(1)
        slug = href[:-5] if href.endswith(".html") else href
        return (
            f'<p class="lab-links">'
            f'<a class="lab-open" href="{slug}.html">Open Home</a> '
            f'<a class="lab-open" href="{slug}-business.html">Open Business</a> '
            f'<a class="lab-open" href="{slug}-partner.html">Open Partner</a>'
            f'</p>'
        )
    html = re.sub(r'<p><a class="lab-open" href="([^"]+)">Open concept</a></p>', links, html)
    path.write_text(html, encoding="utf-8")
    css = ROOT / "css" / "design-lab.css"
    extra = """
.lab-links { display: flex; flex-wrap: wrap; gap: 8px; }
.lab-links .lab-open { min-height: 44px; }
"""
    text = css.read_text(encoding="utf-8")
    if ".lab-links" not in text:
        css.write_text(text + extra, encoding="utf-8")


def main():
    for c in CONCEPTS:
        (ROOT / f"{c['slug']}-business.html").write_text(
            shell(c, "biz", "For Businesses", business_body(c)), encoding="utf-8")
        (ROOT / f"{c['slug']}-partner.html").write_text(
            shell(c, "par", "For Partners", partner_body(c)), encoding="utf-8")
        patch_home(c)
        print("built", c["slug"])
    update_lab()
    print("lab updated")


if __name__ == "__main__":
    main()
