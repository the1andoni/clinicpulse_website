const packageContainer = document.querySelector("#packages");

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function money(amount, currency) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency }).format(amount / 100);
}

function renderPackage(plan) {
  const card = element("article", "package-card");
  card.append(element("span", "card-index", "CLINICPULSE / LIZENZMODELL"));
  card.append(element("h3", "", plan.name));
  const period = plan.billing_interval === "year" ? "Jahr" : "Monat";
  const count = plan.billing_interval_count;
  const price = element("div", "package-price");
  price.append(element("strong", "", money(plan.price_amount_cents, plan.currency)));
  price.append(element("span", "", count === 1 ? ` / ${period}` : ` / ${count} ${period === "Jahr" ? "Jahre" : "Monate"}`));
  card.append(price);
  card.append(element("p", "package-limits", `Bis zu ${plan.max_users.toLocaleString("de-DE")} Nutzer · ${plan.max_installations.toLocaleString("de-DE")} ${plan.max_installations === 1 ? "Installation" : "Installationen"}`));
  if (plan.lifetime_price_cents > 0) card.append(element("p", "lifetime", `Einmalkauf: ${money(plan.lifetime_price_cents, plan.currency)}`));
  card.append(element("p", "renewal", plan.auto_renew ? "Automatische Verlängerung vorgesehen" : "Keine automatische Verlängerung vorgesehen"));
  card.append(element("div", "package-divider"));
  card.append(element("p", "feature-label", "ENTHALTENE FUNKTIONEN"));
  const list = element("ul", "package-features");
  for (const feature of plan.features) {
    const item = element("li");
    const text = element("div");
    text.append(element("strong", "", feature.label));
    if (feature.description) text.append(element("span", "", feature.description));
    item.append(element("span", "check", "✓"), text);
    list.append(item);
  }
  card.append(list);
  const link = element("a", "button button-outline", "Paket anfragen ↗");
  link.href = "#kontakt";
  link.addEventListener("click", () => {
    const message = document.querySelector("#contact-form textarea");
    if (!message.value.trim()) message.value = `Ich interessiere mich für das Paket ${plan.name}.\n\n`;
  });
  card.append(link);
  return card;
}

async function loadPackages() {
  try {
    const response = await fetch("packages.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.packages)) throw new Error("Ungültiges Paketformat");
    const cards = data.packages.map(renderPackage);
    packageContainer.replaceChildren(...(cards.length ? cards : [element("p", "package-status", "Aktuell sind noch keine Pakete veröffentlicht. Kontaktiere uns gerne für weitere Informationen.")]));
  } catch (error) {
    console.error("Paketkatalog konnte nicht geladen werden:", error);
    packageContainer.replaceChildren(element("p", "package-status", "Die Pakete konnten gerade nicht geladen werden. Bitte versuche es später erneut oder kontaktiere uns."));
  }
}

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const body = `Name: ${form.get("name")}\nE-Mail: ${form.get("email")}\nOrganisation: ${form.get("organization") || "–"}\n\n${form.get("message")}`;
  window.location.href = `mailto:info@cyberspaceconsulting.de?subject=${encodeURIComponent("Anfrage zu ClinicPulse")}&body=${encodeURIComponent(body)}`;
});

loadPackages();
