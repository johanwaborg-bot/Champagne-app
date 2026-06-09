import { useState, useEffect, useRef } from "react";

// ════════════════════════════════════════════════════════════════════════
//  CHAMPAGNE KNOWLEDGE BASE
// ════════════════════════════════════════════════════════════════════════

const GRAPES = [
  { name: "Chardonnay", color: "white", share: "~30%", summary: "The noble white grape — finesse, citrus, white flowers, chalky minerality. The sole grape of Blanc de Blancs.", profile: "Elegance, acidity, ageing potential. Green apple and lemon youthfully; brioche, hazelnut and honey with age.", homeland: "Côte des Blancs, Côte de Sézanne, Villers-Marmery.", role: "Backbone of long-lived prestige cuvées; vertical tension and 'nerve'." },
  { name: "Pinot Noir", color: "black", share: "~38%", summary: "The dominant black grape — body, structure, red-fruit depth and power. Vinified white for most Champagne.", profile: "Backbone and breadth; red berries, blood orange, then undergrowth and spice with age.", homeland: "Montagne de Reims (Aÿ, Verzenay, Ambonnay, Bouzy) and the Aube.", role: "Structural spine; heart of most Blanc de Noirs and rosé." },
  { name: "Pinot Meunier", color: "black", share: "~32%", summary: "The supple, fruity workhorse of the Vallée de la Marne — roundness, approachability, early charm.", profile: "Soft, fruit-forward; yellow orchard fruit and florals. Matures faster than Pinot Noir.", homeland: "Vallée de la Marne — frost-prone, clay-rich sites.", role: "Adds fruit and flesh; increasingly bottled varietally by growers." },
  { name: "Pinot Blanc", color: "white", share: "<0.3%", summary: "A rare white mutation of Pinot — soft, floral, low-acid. Permitted but seldom planted.", profile: "Gentle, broad, floral; white peach and almond. Adds roundness without Chardonnay's tension.", homeland: "Scattered old parcels, notably the Aube and Montgueux.", role: "A curiosity; championed by Cédric Bouchard and Tarlant." },
  { name: "Arbane", color: "white", share: "<0.1%", summary: "An ancient, near-vanished Aube variety surviving in heritage 'forgotten grape' cuvées.", profile: "Highly aromatic, late-ripening, intense florals, high acidity. Distinctive and polarising.", homeland: "A handful of rows in the Côte des Bar.", role: "Featured in Laherte Frères 'Les 7' and Aubry heritage blends." },
  { name: "Petit Meslier", color: "white", share: "<0.1%", summary: "A rare old variety prized for piercing acidity and aromatic lift — a Gouais × Savagnin cross.", profile: "Searing acidity, green apple, citrus zest, herbs. Of interest in a warming climate.", homeland: "Tiny parcels in the Aube.", role: "Used in 'forgotten grape' cuvées; climate-resilient." },
  { name: "Pinot Gris", color: "grey", share: "<0.1%", summary: "Locally 'Fromenteau'. A rare grey-skinned Pinot mutation — rich, low-acid, honeyed.", profile: "Broad, spicy, honeyed; stone fruit and a waxy texture. Adds weight.", homeland: "Historic Aube parcels; vanishingly rare.", role: "A heritage component celebrating the old seven." },
];

const REGIONS = [
  { name: "Montagne de Reims", grape: "Pinot Noir country", detail: "Pinot Noir dominates — structured, powerful base wines with red-fruit depth. Verzenay and Mailly (north slope) are taut and saline; Ambonnay and Bouzy (south slope) ripe and powerful; Villers-Marmery a Chardonnay island.", soil: "Chalk subsoil with sand and clay.", villages: "Verzenay, Verzy, Mailly, Ambonnay, Bouzy" },
  { name: "Vallée de la Marne", grape: "Pinot Meunier country", detail: "Clay-rich, frost-prone valley floors suit late-budding Meunier. Fruit-forward and approachable. Aÿ, however, is a first-rank Pinot Noir Grand Cru.", soil: "Clay, marl and limestone; cooler than the chalk slopes.", villages: "Aÿ, Mareuil-sur-Aÿ, Hautvillers, Damery, Cumières" },
  { name: "Côte des Blancs", grape: "Chardonnay country", detail: "Almost entirely Chardonnay. The purest chalk gives crystalline tension, citrus, white flowers and saline length. Cramant, Avize, Oger and Le Mesnil-sur-Oger are the great Grand Crus.", soil: "Deep, pure Belemnite chalk.", villages: "Cramant, Avize, Oger, Le Mesnil-sur-Oger, Chouilly, Oiry" },
  { name: "Côte de Sézanne", grape: "Chardonnay (softer)", detail: "Less chalk and a warmer aspect give riper, more exotic Chardonnay — tropical fruit and honey rather than steely citrus. Good value.", soil: "Clay and silt over limestone.", villages: "Sézanne, Vindey, Barbonne-Fayel" },
  { name: "Côte des Bar (Aube)", grape: "Pinot Noir country", detail: "Now one of Champagne's most dynamic areas. Kimmeridgian limestone (shared with Chablis) and warmth give generous, vinous Pinot Noir. Home to Cédric Bouchard, Vouette et Sorbée, Drappier.", soil: "Kimmeridgian marl — limestone and clay with fossilised oysters.", villages: "Les Riceys, Urville, Celles-sur-Ource, Buxeuil" },
];

const GRAND_CRUS = [
  { village: "Ambonnay", region: "Montagne de Reims", grape: "Pinot Noir", note: "Ripe, powerful, spicy black fruit; benchmark Pinot." },
  { village: "Aÿ", region: "Vallée de la Marne", grape: "Pinot Noir", note: "Complete, structured, age-worthy; historic heart." },
  { village: "Avize", region: "Côte des Blancs", grape: "Chardonnay", note: "Pure, taut, mineral; great Blanc de Blancs." },
  { village: "Beaumont-sur-Vesle", region: "Montagne de Reims", grape: "Pinot Noir", note: "Small; delicate, finessed Pinot." },
  { village: "Bouzy", region: "Montagne de Reims", grape: "Pinot Noir", note: "Rich, ripe, generous; famed for still red too." },
  { village: "Chouilly", region: "Côte des Blancs", grape: "Chardonnay", note: "Broad, fruity; northern Côte des Blancs." },
  { village: "Cramant", region: "Côte des Blancs", grape: "Chardonnay", note: "Floral, creamy, ethereal; silken." },
  { village: "Louvois", region: "Montagne de Reims", grape: "Pinot Noir", note: "Firm, structured; under-the-radar quality." },
  { village: "Mailly", region: "Montagne de Reims", grape: "Pinot Noir", note: "North-facing, taut, saline, slow-developing." },
  { village: "Le Mesnil-sur-Oger", region: "Côte des Blancs", grape: "Chardonnay", note: "The grandest — steely, saline, immortal (Salon, Clos du Mesnil)." },
  { village: "Oger", region: "Côte des Blancs", grape: "Chardonnay", note: "Floral, ripe, rounder than Le Mesnil." },
  { village: "Oiry", region: "Côte des Blancs", grape: "Chardonnay", note: "Lesser-known; clean, fresh." },
  { village: "Puisieulx", region: "Montagne de Reims", grape: "Pinot Noir", note: "Tiny; mixed planting, rarely seen solo." },
  { village: "Sillery", region: "Montagne de Reims", grape: "Pinot Noir", note: "Historic; elegant, lighter-framed." },
  { village: "Tours-sur-Marne", region: "Vallée de la Marne", grape: "Pinot Noir", note: "Ripe and round; only GC in this stretch." },
  { village: "Verzenay", region: "Montagne de Reims", grape: "Pinot Noir", note: "North slope; powerful yet taut, saline, mineral." },
  { village: "Verzy", region: "Montagne de Reims", grape: "Pinot Noir", note: "High-altitude; fresh, firm, slow to evolve." },
];

const PREMIER_CRUS = [
  { village: "Avenay-Val-d'Or", region: "Vallée de la Marne" }, { village: "Bergères-les-Vertus", region: "Côte des Blancs" },
  { village: "Bezannes", region: "Montagne de Reims" }, { village: "Billy-le-Grand", region: "Montagne de Reims" },
  { village: "Bisseuil", region: "Vallée de la Marne" }, { village: "Chamery", region: "Montagne de Reims" },
  { village: "Champillon", region: "Vallée de la Marne" }, { village: "Chigny-les-Roses", region: "Montagne de Reims" },
  { village: "Cormontreuil", region: "Montagne de Reims" }, { village: "Coulommes-la-Montagne", region: "Montagne de Reims" },
  { village: "Cuis", region: "Côte des Blancs" }, { village: "Cumières", region: "Vallée de la Marne" },
  { village: "Dizy", region: "Vallée de la Marne" }, { village: "Écueil", region: "Montagne de Reims" },
  { village: "Étréchy", region: "Côte des Blancs" }, { village: "Grauves", region: "Côte des Blancs" },
  { village: "Hautvillers", region: "Vallée de la Marne" }, { village: "Jouy-lès-Reims", region: "Montagne de Reims" },
  { village: "Les Mesneux", region: "Montagne de Reims" }, { village: "Ludes", region: "Montagne de Reims" },
  { village: "Mareuil-sur-Aÿ", region: "Vallée de la Marne" }, { village: "Montbré", region: "Montagne de Reims" },
  { village: "Mutigny", region: "Vallée de la Marne" }, { village: "Pargny-lès-Reims", region: "Montagne de Reims" },
  { village: "Pierry", region: "Vallée de la Marne" }, { village: "Rilly-la-Montagne", region: "Montagne de Reims" },
  { village: "Sacy", region: "Montagne de Reims" }, { village: "Sermiers", region: "Montagne de Reims" },
  { village: "Taissy", region: "Montagne de Reims" }, { village: "Tauxières-Mutry", region: "Montagne de Reims" },
  { village: "Trépail", region: "Montagne de Reims" }, { village: "Trois-Puits", region: "Montagne de Reims" },
  { village: "Vaudemange", region: "Montagne de Reims" }, { village: "Vertus", region: "Côte des Blancs" },
  { village: "Villedommange", region: "Montagne de Reims" }, { village: "Villeneuve-Renneville", region: "Côte des Blancs" },
  { village: "Villers-Allerand", region: "Montagne de Reims" }, { village: "Villers-Marmery", region: "Montagne de Reims" },
  { village: "Voipreux", region: "Côte des Blancs" }, { village: "Vrigny", region: "Montagne de Reims" },
];

const VINTAGES = [
  { year: 2018, rating: 4, status: "Excellent", note: "Warm, ripe, generous with surprising freshness; high-quality.", drink: "From 2026" },
  { year: 2016, rating: 3, status: "Good", note: "Tricky season saved by fine late summer; classic, fresh.", drink: "From 2025" },
  { year: 2015, rating: 4, status: "Very good", note: "Ripe, structured, powerful Pinot-driven year.", drink: "Now–2035" },
  { year: 2014, rating: 4, status: "Very good", note: "Chardonnay-favoured, fresh and precise; elegant.", drink: "Now–2034" },
  { year: 2013, rating: 4, status: "Very good", note: "Late, cool, classic; high acidity, great ageing.", drink: "Now–2038" },
  { year: 2012, rating: 5, status: "Outstanding", note: "Low yields, near-perfect ripeness; a modern great.", drink: "Now–2040+" },
  { year: 2008, rating: 5, status: "Legendary", note: "Cool, slow, electric acidity; benchmark for ageing.", drink: "Now–2045+" },
  { year: 2004, rating: 4, status: "Very good", note: "Generous yields, elegant balance; ageing gracefully.", drink: "Now–2030" },
  { year: 2002, rating: 5, status: "Outstanding", note: "Ripe yet structured, broadly declared; a great modern vintage.", drink: "Now–2032" },
  { year: 1996, rating: 5, status: "Legendary", note: "High ripeness and searing acidity; iconic, variable ageing.", drink: "Now, variable" },
  { year: 1990, rating: 5, status: "Legendary", note: "Warm, ripe, structured; one of the all-time greats.", drink: "Mature/declining" },
];

const DOSAGE_LEVELS = [
  { label: "Brut Nature", range: "0–3 g/L" }, { label: "Extra Brut", range: "0–6 g/L" },
  { label: "Brut", range: "0–12 g/L" }, { label: "Extra Dry", range: "12–17 g/L" },
  { label: "Sec", range: "17–32 g/L" }, { label: "Demi-Sec", range: "32–50 g/L" }, { label: "Doux", range: "50+ g/L" },
];

const MALO_OPTIONS = ["Unknown", "None (blocked)", "Partial", "Full"];
const OAK_OPTIONS = ["Unknown", "None (steel/tank)", "Partial", "Full", "Large foudre"];
const WINE_TYPES = ["Non-Vintage", "Vintage", "Prestige Cuvée", "Blanc de Blancs", "Blanc de Noirs", "Rosé", "Récemment Dégorgé", "Coteaux Champenois"];

const WSET = [
  { id: "appearance", label: "Appearance", roman: "I", prompts: ["Intensity: pale / medium / deep", "Colour: lemon-green → gold → amber / pink", "Mousse & bead: vigour, size, persistence", "Clarity"], placeholder: "Pale lemon with green tints. Fine, persistent bead; vigorous, creamy mousse. Bright and clear.", rows: 2 },
  { id: "nose", label: "Nose", roman: "II", prompts: ["Condition: clean / faulty", "Intensity: light → pronounced", "Development: youthful / developing / fully developed", "Primary (fruit, floral)", "Secondary (autolysis: brioche, yeast)", "Tertiary (oxidative: nuts, honey)"], placeholder: "Clean. Pronounced. Developing. Citrus, green apple and white flowers; secondary brioche and toasted almond; emerging honey and struck-flint reduction.", rows: 4 },
  { id: "palate", label: "Palate", roman: "III", prompts: ["Sweetness (dosage perception)", "Acidity: low → high", "Body: light → full", "Mousse texture: aggressive / creamy / silky", "Flavour intensity & characteristics", "Balance & complexity", "Finish: short → long"], placeholder: "Bone-dry (brut nature). High, racy acidity. Medium body. Very fine, caressing mousse. Concentrated citrus pith, oyster-shell salinity, brioche. Long, mineral finish.", rows: 4 },
  { id: "conclusions", label: "Conclusions", roman: "IV", prompts: ["Quality: faulty → outstanding", "Readiness / ageing potential", "Origin & grape (blind hypothesis)", "Production (vintage? oak? dosage?)", "Food pairing"], placeholder: "Outstanding. Drinking well now, will improve 5–10 yrs. Likely mature Blanc de Blancs, Côte des Blancs Grand Cru. Low dosage, partial oak. Pair with langoustine.", rows: 3 },
];

const CRITERIA = [
  { id: "appearance", label: "Appearance", max: 10 },
  { id: "nose", label: "Nose / Bouquet", max: 25 },
  { id: "palate", label: "Palate", max: 30 },
  { id: "mousse", label: "Mousse & Texture", max: 15 },
  { id: "finish", label: "Finish & Length", max: 10 },
  { id: "complexity", label: "Complexity / Typicity", max: 10 },
];
const MAX_SCORE = 100;

const AROMA = {
  "Citrus & Orchard": ["Lemon", "Grapefruit", "Green apple", "Quince", "Pear", "White peach"],
  "Autolytic": ["Brioche", "Toast", "Biscuit", "Croissant", "Yeast", "Pastry"],
  "Nutty & Oxidative": ["Almond", "Hazelnut", "Walnut", "Honey", "Caramel", "Dried apricot"],
  "Mineral & Reductive": ["Chalk", "Flint", "Oyster shell", "Smoke", "Saline", "Wet stone"],
  "Floral & Other": ["White flowers", "Acacia", "Ginger", "Vanilla", "Red berries", "Blood orange"],
};
const ALL_AROMAS = Object.values(AROMA).reduce((a, b) => a.concat(b), []);


// ── PALETTE ──
const BG = "#f4ecd8", PAPER = "#fbf6e9", INK = "#3a2f1a", INK_SOFT = "#6b5d42";
const GOLD = "#a8842c", GOLD_DEEP = "#7d6320", LINE = "#d8c9a0", LINE_SOFT = "#e6dabb";
const SHADOW = "rgba(120,95,40,0.12)";
const serif = "'Cormorant Garamond', Georgia, serif";

const label = { fontFamily: serif, fontSize: 11, letterSpacing: 3, color: GOLD_DEEP, textTransform: "uppercase", display: "block", marginBottom: 8, fontWeight: 600 };
const inputBase = { width: "100%", background: "rgba(255,255,255,0.45)", border: `1px solid ${LINE}`, color: INK, fontFamily: serif, fontSize: 16, padding: "8px 10px", outline: "none", boxSizing: "border-box", borderRadius: 2 };

const scoreTotal = (w) => CRITERIA.reduce((s, c) => s + (w.scores[c.id] || 0), 0);

const createWine = (id) => ({
  id, producer: "", cuvee: "", vintage: "", type: "Non-Vintage", revealed: false,
  disgorgement: "", dosage: "", dosageLabel: "", blend: "", oak: "Unknown", malo: "Unknown",
  village: "", bottlePhoto: null,
  scores: Object.fromEntries(CRITERIA.map(c => [c.id, 0])),
  aromas: [], wsetNotes: { appearance: "", nose: "", palate: "", conclusions: "" },
  producerInfo: null,
});

// ── API ──
// In the claude.ai artifact preview the platform authenticates this call,
// so no API key is sent here. For a standalone deployment, route the same
// request through a small serverless proxy that adds your key server-side
// (keeps the key off the client). See deployment notes.
async function callClaude({ system, messages, max_tokens = 1500 }) {
  // Calls our own serverless function (/api/claude), which adds the API key
  // server-side. The key is never sent to or stored in the browser.
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens, system, messages }),
  });
  if (!res.ok) throw new Error(`${res.status}: ${(await res.text()).slice(0, 160)}`);
  const data = await res.json();
  return data.content?.find(b => b.type === "text")?.text || "";
}
const parseJSON = (t) => JSON.parse(t.replace(/```json|```/g, "").trim());

// ── SHARED UI ──
function Divider({ m = "24px 0" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", margin: m }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${LINE})` }} />
      <div style={{ margin: "0 12px", color: GOLD, fontSize: 11 }}>✦</div>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${LINE}, transparent)` }} />
    </div>
  );
}
function Btn({ children, onClick, primary, disabled, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "13px 22px", cursor: disabled ? "default" : "pointer", fontFamily: serif, fontSize: 13,
      letterSpacing: 3, textTransform: "uppercase", borderRadius: 2,
      border: primary ? "none" : `1px solid ${LINE}`,
      background: primary ? `linear-gradient(135deg, ${GOLD_DEEP}, ${GOLD})` : "transparent",
      color: primary ? PAPER : (disabled ? "#c9bb8a" : GOLD_DEEP),
      boxShadow: primary ? "0 3px 14px rgba(168,132,44,0.25)" : "none", transition: "all 0.2s", ...style,
    }}>{children}</button>
  );
}
function Field({ k, v }) {
  return (
    <div>
      <div style={{ fontFamily: serif, fontSize: 11, letterSpacing: 2, color: GOLD_DEEP, textTransform: "uppercase", marginBottom: 2 }}>{k}</div>
      <div style={{ fontFamily: serif, fontSize: 15, color: INK, lineHeight: 1.6 }}>{v}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  KNOWLEDGE LIBRARY
// ════════════════════════════════════════════════════════════════════════

const GC_SET = new Set(GRAND_CRUS.map(c => c.village));
const PC_SET = new Set(PREMIER_CRUS.map(c => c.village));

// Renders a comma-separated villages string, marking Grand Crus (bold) and
// Premier Crus (italic), each a link that jumps to the matching cru tab.
function VillageLinks({ villages, onJump }) {
  const list = villages.split(",").map(v => v.trim()).filter(Boolean);
  return (
    <span>
      {list.map((v, i) => {
        const gc = GC_SET.has(v), pc = !gc && PC_SET.has(v);
        const sep = i < list.length - 1 ? ", " : "";
        if (gc || pc) {
          return (
            <span key={v}>
              <button onClick={() => onJump(gc ? "grandcru" : "premiercru")} style={{
                background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: serif, fontSize: 14,
                color: gc ? GOLD_DEEP : INK, fontWeight: gc ? 700 : 400, fontStyle: pc ? "italic" : "normal",
                borderBottom: `1px dotted ${gc ? GOLD : LINE}`,
              }}>{v}</button>{sep}
            </span>
          );
        }
        return <span key={v} style={{ fontFamily: serif, fontSize: 14, color: INK_SOFT }}>{v}{sep}</span>;
      })}
    </span>
  );
}

function Library({ onClose }) {
  const [tab, setTab] = useState("grapes");
  const [deep, setDeep] = useState(null);

  const deepDive = async (village, region) => {
    setDeep({ name: village, loading: true, info: null });
    try {
      const text = await callClaude({
        max_tokens: 900,
        system: `You are a Champagne terroir expert. Given a village, respond ONLY with JSON (no markdown): {"classification":"...","aspect":"slope aspect/altitude","soil":"soil & terroir in one sentence","character":"2-3 sentences on wine character and distinctiveness","houses":"notable houses, growers or famous parcels"}`,
        messages: [{ role: "user", content: `${village}, ${region}, Champagne` }],
      });
      setDeep({ name: village, loading: false, info: parseJSON(text) });
    } catch (e) {
      setDeep({ name: village, loading: false, info: { character: "Could not load. " + e.message } });
    }
  };

  const tabs = [["grapes","Grapes"],["regions","Regions"],["grandcru","Grand Crus"],["premiercru","Premier Crus"],["vintages","Vintages"],["reference","Reference"]];

  return (
    <div style={{ position: "fixed", inset: 0, background: BG, zIndex: 100, overflowY: "auto" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 20px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: serif, fontSize: 26, color: INK, fontWeight: 600 }}>The Champagne Library</div>
          <button onClick={onClose} style={{ background: "none", border: `1px solid ${LINE}`, borderRadius: 2, color: GOLD_DEEP, fontFamily: serif, fontSize: 13, letterSpacing: 2, padding: "6px 14px", cursor: "pointer" }}>CLOSE ✕</button>
        </div>
        <Divider m="14px 0 18px" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
          {tabs.map(([id, lbl]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: "7px 14px", fontFamily: serif, fontSize: 13, letterSpacing: 1, cursor: "pointer", borderRadius: 2, border: `1px solid ${tab === id ? GOLD : LINE}`, background: tab === id ? GOLD : "transparent", color: tab === id ? PAPER : INK_SOFT }}>{lbl}</button>
          ))}
        </div>

        {tab === "grapes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontFamily: serif, fontSize: 15, color: INK_SOFT, fontStyle: "italic", margin: 0, lineHeight: 1.7 }}>Seven grapes are permitted. Three dominate; four are near-extinct heritage varieties preserved in rare cuvées.</p>
            {GRAPES.map(g => (
              <div key={g.name} style={{ background: PAPER, border: `1px solid ${LINE_SOFT}`, borderRadius: 3, padding: "16px 18px", boxShadow: `0 2px 8px ${SHADOW}` }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: serif, fontSize: 21, color: INK, fontWeight: 600 }}>{g.name}</span>
                  <span style={{ fontFamily: serif, fontSize: 12, color: GOLD_DEEP, letterSpacing: 1 }}>{g.share} · {g.color}</span>
                </div>
                <p style={{ fontFamily: serif, fontSize: 15, color: INK, lineHeight: 1.7, margin: "0 0 10px" }}>{g.summary}</p>
                {[["Profile", g.profile], ["Homeland", g.homeland], ["Role", g.role]].map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 4 }}><span style={{ fontFamily: serif, fontSize: 11, letterSpacing: 2, color: GOLD_DEEP, textTransform: "uppercase" }}>{k} · </span><span style={{ fontFamily: serif, fontSize: 14, color: INK_SOFT }}>{v}</span></div>
                ))}
              </div>
            ))}
          </div>
        )}

        {tab === "regions" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontFamily: serif, fontSize: 13, color: INK_SOFT, fontStyle: "italic", margin: 0, lineHeight: 1.7 }}>
              In the village lists, <strong style={{ color: GOLD_DEEP, fontStyle: "normal" }}>bold</strong> marks a Grand Cru and <em>italic</em> a Premier Cru — tap either to open the matching cru list.
            </p>
            {REGIONS.map(r => (
              <div key={r.name} style={{ background: PAPER, border: `1px solid ${LINE_SOFT}`, borderRadius: 3, padding: "16px 18px", boxShadow: `0 2px 8px ${SHADOW}` }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: serif, fontSize: 20, color: INK, fontWeight: 600 }}>{r.name}</span>
                  <span style={{ fontFamily: serif, fontSize: 12, color: GOLD_DEEP, fontStyle: "italic" }}>{r.grape}</span>
                </div>
                <p style={{ fontFamily: serif, fontSize: 15, color: INK, lineHeight: 1.7, margin: "0 0 8px" }}>{r.detail}</p>
                <div><span style={{ fontFamily: serif, fontSize: 11, letterSpacing: 2, color: GOLD_DEEP, textTransform: "uppercase" }}>Soil · </span><span style={{ fontFamily: serif, fontSize: 14, color: INK_SOFT }}>{r.soil}</span></div>
                <div><span style={{ fontFamily: serif, fontSize: 11, letterSpacing: 2, color: GOLD_DEEP, textTransform: "uppercase" }}>Villages · </span><VillageLinks villages={r.villages} onJump={setTab} /></div>
              </div>
            ))}
          </div>
        )}

        {tab === "grandcru" && (
          <div>
            <p style={{ fontFamily: serif, fontSize: 15, color: INK_SOFT, fontStyle: "italic", margin: "0 0 14px", lineHeight: 1.7 }}>17 villages hold Grand Cru status (100% on the échelle des crus). Tap any for an AI terroir deep-dive.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {GRAND_CRUS.map(c => (
                <button key={c.village} onClick={() => deepDive(c.village, c.region)} style={{ textAlign: "left", background: PAPER, border: `1px solid ${LINE_SOFT}`, borderRadius: 3, padding: "12px 16px", cursor: "pointer", boxShadow: `0 1px 5px ${SHADOW}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontFamily: serif, fontSize: 17, color: INK, fontWeight: 600 }}>{c.village}</span>
                    <span style={{ fontFamily: serif, fontSize: 12, color: GOLD_DEEP }}>{c.grape}</span>
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 13, color: INK_SOFT, marginTop: 2 }}>{c.region} — {c.note}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "premiercru" && (
          <div>
            <p style={{ fontFamily: serif, fontSize: 15, color: INK_SOFT, fontStyle: "italic", margin: "0 0 14px", lineHeight: 1.7 }}>42 villages hold Premier Cru status (90–99% on the échelle). Tap any for a deep-dive.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {PREMIER_CRUS.map(c => (
                <button key={c.village} onClick={() => deepDive(c.village, c.region)} style={{ textAlign: "left", background: PAPER, border: `1px solid ${LINE_SOFT}`, borderRadius: 3, padding: "10px 12px", cursor: "pointer" }}>
                  <div style={{ fontFamily: serif, fontSize: 15, color: INK, fontWeight: 600 }}>{c.village}</div>
                  <div style={{ fontFamily: serif, fontSize: 11, color: INK_SOFT }}>{c.region}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "vintages" && (
          <div>
            <p style={{ fontFamily: serif, fontSize: 15, color: INK_SOFT, fontStyle: "italic", margin: "0 0 14px", lineHeight: 1.7 }}>Champagne is vintage-dated only in declared years. A connoisseur's guide to recent and classic vintages.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {VINTAGES.map(v => (
                <div key={v.year} style={{ background: PAPER, border: `1px solid ${LINE_SOFT}`, borderRadius: 3, padding: "12px 16px", display: "flex", gap: 14 }}>
                  <div style={{ fontFamily: serif, fontSize: 24, color: INK, fontWeight: 600, minWidth: 56 }}>{v.year}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontFamily: serif, fontSize: 14, color: GOLD_DEEP, letterSpacing: 1, textTransform: "uppercase" }}>{v.status}</span>
                      <span style={{ color: GOLD, fontSize: 13 }}>{"★".repeat(v.rating)}{"☆".repeat(5 - v.rating)}</span>
                    </div>
                    <p style={{ fontFamily: serif, fontSize: 14, color: INK, lineHeight: 1.6, margin: "4px 0 2px" }}>{v.note}</p>
                    <div style={{ fontFamily: serif, fontSize: 12, color: INK_SOFT, fontStyle: "italic" }}>Drink: {v.drink}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "reference" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <div style={{ fontFamily: serif, fontSize: 18, color: INK, fontWeight: 600, marginBottom: 8 }}>Dosage Scale</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {DOSAGE_LEVELS.map(d => (
                  <div key={d.label} style={{ display: "flex", justifyContent: "space-between", background: PAPER, border: `1px solid ${LINE_SOFT}`, borderRadius: 2, padding: "8px 14px" }}>
                    <span style={{ fontFamily: serif, fontSize: 15, color: INK }}>{d.label}</span>
                    <span style={{ fontFamily: serif, fontSize: 14, color: GOLD_DEEP }}>{d.range}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: serif, fontSize: 18, color: INK, fontWeight: 600, marginBottom: 8 }}>How Professionals Taste</div>
              <p style={{ fontFamily: serif, fontSize: 15, color: INK_SOFT, lineHeight: 1.8, margin: 0 }}>The WSET Level 4 Systematic Approach assesses each wine across Appearance, Nose, Palate and Conclusions — recording intensity, development and structural markers (acidity, body, mousse, finish) before judging quality and ageing potential. For sparkling wine, special attention is paid to the mousse — bead size, vigour and persistence — and to autolytic character from time on lees. Note disgorgement date, dosage, base-wine vinification (oak, malolactic) and grape blend wherever known: these explain what is in the glass.</p>
            </div>
          </div>
        )}
      </div>

      {deep && (
        <div onClick={() => setDeep(null)} style={{ position: "fixed", inset: 0, background: "rgba(58,47,26,0.4)", zIndex: 110, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: PAPER, border: `1px solid ${GOLD}`, borderRadius: 4, maxWidth: 460, width: "100%", padding: "22px 24px", boxShadow: "0 12px 40px rgba(58,47,26,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: serif, fontSize: 24, color: INK, fontWeight: 600 }}>{deep.name}</span>
              <button onClick={() => setDeep(null)} style={{ background: "none", border: "none", color: GOLD_DEEP, fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <Divider m="8px 0 14px" />
            {deep.loading ? (
              <div style={{ textAlign: "center", padding: "24px 0", fontFamily: serif, color: INK_SOFT, letterSpacing: 2 }}>Consulting the terroir…</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {deep.info.classification && <Field k="Classification" v={deep.info.classification} />}
                {deep.info.aspect && <Field k="Aspect" v={deep.info.aspect} />}
                {deep.info.soil && <Field k="Soil" v={deep.info.soil} />}
                {deep.info.character && <Field k="Character" v={deep.info.character} />}
                {deep.info.houses && <Field k="Notable Houses" v={deep.info.houses} />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  IMAGE CAPTURE HELPER
// ════════════════════════════════════════════════════════════════════════

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = e => resolve(e.target.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
function dataURLparts(dataURL) {
  const base64 = dataURL.split(",")[1];
  const m = dataURL.match(/data:(image\/\w+);/);
  return { base64, mediaType: m ? m[1] : "image/jpeg" };
}

// ════════════════════════════════════════════════════════════════════════
//  SETUP SCREEN
// ════════════════════════════════════════════════════════════════════════

function SetupScreen({ onStart, onLibrary }) {
  const [s, setS] = useState({ name: "", location: "", date: new Date().toISOString().slice(0, 10), count: 4, blind: true });
  const set = (k, v) => setS(p => ({ ...p, [k]: v }));

  return (
    <div style={{ maxWidth: 540, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontFamily: serif, fontSize: 11, letterSpacing: 8, color: GOLD_DEEP, marginBottom: 12 }}>THE CONNOISSEUR'S</div>
        <h1 style={{ fontFamily: serif, fontSize: 52, fontWeight: 600, color: INK, margin: 0, lineHeight: 1, letterSpacing: -1 }}>Champagne<br /><em style={{ fontWeight: 400, color: GOLD_DEEP }}>Tasting Journal</em></h1>
      </div>
      <Divider m="22px 0 28px" />

      {/* Library access */}
      <button onClick={onLibrary} style={{ width: "100%", padding: "14px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 3, cursor: "pointer", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: `0 2px 8px ${SHADOW}` }}>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: serif, fontSize: 17, color: INK, fontWeight: 600 }}>The Champagne Library</div>
          <div style={{ fontFamily: serif, fontSize: 13, color: INK_SOFT }}>Grapes · Regions · Crus · Vintages · Reference</div>
        </div>
        <span style={{ color: GOLD, fontSize: 20 }}>→</span>
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {[["Session Name", "name", "e.g. Blanc de Blancs Grand Cru Flight"], ["Location", "location", "e.g. Stockholm"]].map(([lbl, key, ph]) => (
          <div key={key}><label style={label}>{lbl}</label><input value={s[key]} onChange={e => set(key, e.target.value)} placeholder={ph} style={inputBase} /></div>
        ))}
        <div><label style={label}>Date</label><input type="date" value={s.date} onChange={e => set("date", e.target.value)} style={inputBase} /></div>

        <div>
          <label style={label}>Number of Champagnes</label>
          <div style={{ display: "flex", gap: 8 }}>
            {[2, 4, 6, 8, 10, 12].map(n => (
              <button key={n} onClick={() => set("count", n)} style={{ flex: 1, padding: "10px 0", borderRadius: 2, background: s.count === n ? GOLD : "transparent", border: `1px solid ${s.count === n ? GOLD : LINE}`, color: s.count === n ? PAPER : INK_SOFT, fontFamily: serif, fontSize: 16, cursor: "pointer" }}>{n}</button>
            ))}
          </div>
        </div>

        <div>
          <label style={label}>Tasting Format</label>
          <div style={{ display: "flex", gap: 10 }}>
            {[["Blind", true], ["Open", false]].map(([lbl, val]) => (
              <button key={lbl} onClick={() => set("blind", val)} style={{ flex: 1, padding: "12px 0", borderRadius: 2, background: s.blind === val ? GOLD : "transparent", border: `1px solid ${s.blind === val ? GOLD : LINE}`, color: s.blind === val ? PAPER : INK_SOFT, fontFamily: serif, fontSize: 15, letterSpacing: 1, cursor: "pointer" }}>{lbl}</button>
            ))}
          </div>
          <div style={{ fontFamily: serif, fontSize: 13, color: INK_SOFT, marginTop: 8, fontStyle: "italic" }}>
            {s.blind ? "Bottles concealed. Identity revealed after scoring — a true blind flight." : "Labels visible throughout. Producer info available as you taste."}
          </div>
        </div>
      </div>

      <Divider m="28px 0" />
      <Btn primary onClick={() => onStart(s)} style={{ width: "100%" }}>Begin the Flight</Btn>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  WSET NOTES + NOTE SCANNER
// ════════════════════════════════════════════════════════════════════════

function WsetNotes({ notes, onChange, onScan }) {
  const [active, setActive] = useState("appearance");
  const [scan, setScan] = useState("idle"); // idle | preview | scanning | done | error
  const [img, setImg] = useState(null);
  const [err, setErr] = useState("");
  const fileRef = useRef(null);
  const sec = WSET.find(w => w.id === active);
  const filled = WSET.filter(w => notes[w.id]?.trim()).length;

  const pick = async (file) => {
    if (!file) return;
    setImg(await fileToDataURL(file));
    setScan("preview"); setErr("");
  };
  const reset = () => { setScan("idle"); setImg(null); setErr(""); if (fileRef.current) fileRef.current.value = ""; };

  const runScan = async () => {
    if (!img) return;
    setScan("scanning"); setErr("");
    const { base64, mediaType } = dataURLparts(img);
    try {
      const text = await callClaude({
        max_tokens: 2000,
        system: `You read a handwritten Champagne tasting note from a photo and extract everything you can. Respond ONLY with JSON (no markdown, no commentary):
{
  "identity": {"producer":"","cuvee":"","vintage":"","village":"","blend":"","type":""},
  "technical": {"dosage":"","disgorgement":"","oak":"","malo":""},
  "aromas": [],
  "notes": {"appearance":"","nose":"","palate":"","conclusions":""},
  "overflow":""
}
Rules:
- Use "" (or [] for aromas) for anything not present. Never invent.
- "type" must be EXACTLY one of: ${WINE_TYPES.join(" | ")} — else "".
- "oak" must be EXACTLY one of: ${OAK_OPTIONS.join(" | ")} — else "".
- "malo" must be EXACTLY one of: ${MALO_OPTIONS.join(" | ")} — else "".
- "dosage" is just the number in g/L if written (e.g. "4").
- "aromas": include any that EXACTLY match one of: ${ALL_AROMAS.join(", ")}. Omit others.
- "notes": organise the descriptive prose into WSET L4 sections, preserving the taster's words; fix obvious spelling silently.
- "overflow": any remaining text that doesn't fit a section.`,
        messages: [{ role: "user", content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
          { type: "text", text: "Transcribe and extract this handwritten champagne tasting note." },
        ]}],
      });
      const parsed = parseJSON(text);
      onScan(parsed);
      setScan("done");
      setTimeout(reset, 1600);
    } catch (e) { setErr(e.message); setScan("error"); }
  };

  if (scan !== "idle") {
    return (
      <div style={{ marginBottom: 24 }}>
        <label style={label}>Scan Handwritten Notes</label>
        <div style={{ position: "relative", border: `1px solid ${LINE}`, borderRadius: 3, marginBottom: 12, overflow: "hidden", background: "#fff" }}>
          <img src={img} alt="notes" style={{ width: "100%", maxHeight: 340, objectFit: "contain", display: "block", opacity: scan === "scanning" ? 0.4 : 1 }} />
          {scan === "scanning" && <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}><Dots /><div style={{ fontFamily: serif, fontSize: 13, color: GOLD_DEEP, letterSpacing: 3 }}>READING NOTES…</div></div>}
          {scan === "done" && <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(251,246,233,0.85)" }}><div style={{ fontSize: 34, color: GOLD }}>✓</div><div style={{ fontFamily: serif, fontSize: 13, color: GOLD_DEEP, letterSpacing: 3 }}>NOTE TRANSCRIBED</div></div>}
        </div>
        {scan === "error" && <div style={{ fontFamily: serif, fontSize: 13, color: "#9a4a2a", marginBottom: 12, padding: "8px 12px", border: "1px solid #d8a87a", borderRadius: 2 }}>Couldn't read it: {err}</div>}
        {(scan === "preview" || scan === "error") && (
          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={reset} style={{ flex: 1, padding: "11px 0" }}>Cancel</Btn>
            <Btn onClick={() => fileRef.current.click()} style={{ flex: 1, padding: "11px 0" }}>Retake</Btn>
            <Btn primary onClick={runScan} style={{ flex: 2, padding: "11px 0" }}>Read Notes →</Btn>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={e => pick(e.target.files[0])} style={{ display: "none" }} />
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <label style={{ ...label, marginBottom: 0 }}>Tasting Note · WSET L4</label>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: serif, fontSize: 12, color: filled === 4 ? GOLD : INK_SOFT }}>{filled}/4</span>
          <button onClick={() => fileRef.current.click()} style={{ background: "transparent", border: `1px solid ${LINE}`, borderRadius: 2, color: GOLD_DEEP, padding: "5px 11px", cursor: "pointer", fontFamily: serif, fontSize: 12, letterSpacing: 1.5, display: "flex", alignItems: "center", gap: 5 }}>📷 SCAN</button>
        </div>
      </div>

      <div style={{ display: "flex", border: `1px solid ${LINE}`, borderBottom: "none", borderRadius: "3px 3px 0 0", overflow: "hidden" }}>
        {WSET.map((w, i) => {
          const on = w.id === active, has = !!notes[w.id]?.trim();
          return (
            <button key={w.id} onClick={() => setActive(w.id)} style={{ flex: 1, padding: "9px 4px", border: "none", borderRight: i < 3 ? `1px solid ${LINE}` : "none", background: on ? PAPER : "transparent", cursor: "pointer", position: "relative" }}>
              <div style={{ fontFamily: serif, fontSize: 10, letterSpacing: 2, color: on ? GOLD : INK_SOFT, textTransform: "uppercase" }}>{w.roman}</div>
              <div style={{ fontFamily: serif, fontSize: 12, color: on ? INK : (has ? GOLD_DEEP : INK_SOFT), fontWeight: on ? 600 : 400 }}>{w.label}</div>
              {has && !on && <div style={{ position: "absolute", top: 5, right: 6, width: 4, height: 4, borderRadius: "50%", background: GOLD }} />}
            </button>
          );
        })}
      </div>

      <div style={{ border: `1px solid ${LINE}`, borderTop: "none", borderRadius: "0 0 3px 3px", padding: "14px", background: PAPER }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 7px", marginBottom: 12 }}>
          {sec.prompts.map((p, i) => <span key={i} style={{ fontFamily: serif, fontSize: 11.5, color: INK_SOFT, padding: "2px 8px", border: `1px solid ${LINE_SOFT}`, borderRadius: 2, background: "rgba(255,255,255,0.5)" }}>{p}</span>)}
        </div>
        <textarea value={notes[active] || ""} onChange={e => onChange({ ...notes, [active]: e.target.value })} placeholder={sec.placeholder} rows={sec.rows}
          style={{ width: "100%", background: "transparent", border: "none", borderTop: `1px solid ${LINE_SOFT}`, color: INK, fontFamily: serif, fontSize: 15, padding: "10px 0 0", outline: "none", resize: "none", boxSizing: "border-box", lineHeight: 1.8 }} />
      </div>
    </div>
  );
}

function Dots() {
  return <div style={{ display: "flex", gap: 7 }}>{[0,1,2,3].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD, animation: `pulse 1.3s ${i*0.2}s infinite` }} />)}</div>;
}

// ── BOTTLE PHOTO ──
function BottlePhoto({ photo, onChange }) {
  const ref = useRef(null);
  const pick = async (file) => { if (file) onChange(await fileToDataURL(file)); };
  return (
    <div style={{ marginBottom: 20 }}>
      <input ref={ref} type="file" accept="image/*" capture="environment" onChange={e => pick(e.target.files[0])} style={{ display: "none" }} />
      {photo ? (
        <div style={{ position: "relative", border: `1px solid ${LINE}`, borderRadius: 3, overflow: "hidden", background: "#fff", textAlign: "center" }}>
          <img src={photo} alt="bottle" style={{ maxHeight: 220, maxWidth: "100%", objectFit: "contain", display: "block", margin: "0 auto" }} />
          <button onClick={() => onChange(null)} style={{ position: "absolute", top: 8, right: 8, background: "rgba(58,47,26,0.7)", border: "none", borderRadius: "50%", width: 26, height: 26, color: PAPER, cursor: "pointer", fontSize: 13 }}>✕</button>
        </div>
      ) : (
        <button onClick={() => ref.current.click()} style={{ width: "100%", padding: "16px", border: `1.5px dashed ${LINE}`, borderRadius: 3, background: "rgba(255,255,255,0.3)", cursor: "pointer", fontFamily: serif, fontSize: 14, color: GOLD_DEEP, letterSpacing: 1 }}>
          📷 &nbsp;Add Bottle Photo
        </button>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  SCORE SLIDER + AROMA WHEEL
// ════════════════════════════════════════════════════════════════════════

function ScoreSlider({ criterion, value, onChange }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
        <span style={{ fontFamily: serif, fontSize: 15, color: INK }}>{criterion.label}</span>
        <span style={{ fontFamily: serif, fontSize: 18, color: GOLD_DEEP }}>{value}<span style={{ fontSize: 12, color: INK_SOFT }}>/{criterion.max}</span></span>
      </div>
      <div style={{ position: "relative", height: 4, background: LINE_SOFT, borderRadius: 2 }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(value / criterion.max) * 100}%`, background: `linear-gradient(90deg, ${GOLD_DEEP}, ${GOLD})`, borderRadius: 2 }} />
        <input type="range" min={0} max={criterion.max} value={value} onChange={e => onChange(Number(e.target.value))} style={{ position: "absolute", top: -8, left: 0, width: "100%", height: 20, opacity: 0, cursor: "pointer", margin: 0 }} />
        <div style={{ position: "absolute", top: -4, left: `${(value / criterion.max) * 100}%`, transform: "translateX(-50%)", width: 12, height: 12, borderRadius: "50%", background: GOLD, border: `2px solid ${PAPER}`, boxShadow: "0 1px 5px rgba(120,95,40,0.4)", pointerEvents: "none" }} />
      </div>
    </div>
  );
}

function AromaWheel({ selected, onToggle }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {Object.entries(AROMA).map(([group, tags]) => (
        <div key={group}>
          <div style={{ fontFamily: serif, fontSize: 11, letterSpacing: 1.5, color: GOLD_DEEP, marginBottom: 5 }}>{group}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {tags.map(t => {
              const on = selected.includes(t);
              return <button key={t} onClick={() => onToggle(t)} style={{ padding: "3px 11px", borderRadius: 2, background: on ? GOLD : "transparent", border: `1px solid ${on ? GOLD : LINE}`, color: on ? PAPER : INK_SOFT, fontFamily: serif, fontSize: 13, cursor: "pointer" }}>{t}</button>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  PRODUCER CARD (AI)
// ════════════════════════════════════════════════════════════════════════

function ProducerCard({ producer, info, onFetch, loading }) {
  const [open, setOpen] = useState(false);
  if (!producer) return null;
  return (
    <div style={{ border: `1px solid ${LINE}`, borderRadius: 3, marginBottom: 20, overflow: "hidden", background: PAPER }}>
      <button onClick={() => { setOpen(o => !o); if (!open && !info && !loading) onFetch(); }} style={{ width: "100%", padding: "11px 14px", background: "transparent", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: serif, fontSize: 12, letterSpacing: 2, color: GOLD_DEEP, textTransform: "uppercase" }}>House Background</span>
        <span style={{ color: GOLD, fontSize: 15, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>⌄</span>
      </button>
      {open && (
        <div style={{ borderTop: `1px solid ${LINE_SOFT}`, padding: "14px" }}>
          {loading && <div style={{ textAlign: "center", padding: "12px 0", fontFamily: serif, color: INK_SOFT, letterSpacing: 2 }}>Consulting the cellar…</div>}
          {!loading && info && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <span style={{ fontFamily: serif, fontSize: 18, color: INK, fontWeight: 600 }}>{info.fullName || producer}</span>
                <span style={{ fontFamily: serif, fontSize: 12, color: GOLD_DEEP }}>Est. {info.founded || "—"}</span>
              </div>
              {info.tags && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>{info.tags.map(t => <span key={t} style={{ fontFamily: serif, fontSize: 11, color: INK_SOFT, padding: "2px 8px", border: `1px solid ${LINE_SOFT}`, borderRadius: 2 }}>{t}</span>)}</div>}
              <p style={{ fontFamily: serif, fontSize: 14.5, color: INK, lineHeight: 1.7, margin: "0 0 10px" }}>{info.bio}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 14px" }}>
                {[["Village", info.village], ["Style", info.style], ["Grapes", info.grapes], ["Production", info.production]].filter(r => r[1]).map(([k, v]) => (
                  <div key={k}><span style={{ fontFamily: serif, fontSize: 10, letterSpacing: 1.5, color: GOLD_DEEP, textTransform: "uppercase" }}>{k} </span><span style={{ fontFamily: serif, fontSize: 13.5, color: INK_SOFT }}>{v}</span></div>
                ))}
              </div>
            </div>
          )}
          {!loading && !info && <div style={{ textAlign: "center" }}><Btn onClick={onFetch} style={{ padding: "8px 18px" }}>Load House Info</Btn></div>}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  TASTING CARD
// ════════════════════════════════════════════════════════════════════════

function TastingCard({ wine, n, total, blind, onUpdate, onNext, onPrev, onReveal, isLast }) {
  const tot = scoreTotal(wine);
  const pct = Math.round((tot / MAX_SCORE) * 100);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const up = (patch) => onUpdate({ ...wine, ...patch });

  // Apply a scanned tasting-note photo: merge prose into WSET notes and fill
  // any EMPTY structured fields (never overwrites what's already entered).
  // Everything is applied in a single update so nothing is clobbered.
  const applyScan = (p) => {
    const patch = {};
    const id = p.identity || {}, tech = p.technical || {}, sn = p.notes || {};

    // WSET notes — append scanned prose to any existing text
    const mergedNotes = { ...wine.wsetNotes };
    for (const k of ["appearance", "nose", "palate", "conclusions"]) {
      const ex = (wine.wsetNotes[k] || "").trim(), inc = (sn[k] || "").trim();
      mergedNotes[k] = ex && inc ? ex + "\n" + inc : (inc || ex);
    }
    if ((p.overflow || "").trim()) mergedNotes.conclusions = (mergedNotes.conclusions ? mergedNotes.conclusions + "\n" : "") + p.overflow.trim();
    patch.wsetNotes = mergedNotes;

    // Identity text fields — fill only if currently empty
    for (const f of ["producer", "cuvee", "vintage", "village", "blend"]) {
      const v = (id[f] || "").trim();
      if (v && !String(wine[f] || "").trim()) patch[f] = v;
    }
    if (id.producer && !String(wine.producer || "").trim()) patch.producerInfo = null;
    if (id.type && WINE_TYPES.includes(id.type) && wine.type === "Non-Vintage") patch.type = id.type;

    // Technical fields
    const dos = String(tech.dosage || "").trim();
    if (dos && !String(wine.dosage || "").trim()) patch.dosage = dos;
    const dis = String(tech.disgorgement || "").trim();
    if (dis && !String(wine.disgorgement || "").trim()) patch.disgorgement = dis;
    if (tech.oak && OAK_OPTIONS.includes(tech.oak) && wine.oak === "Unknown") patch.oak = tech.oak;
    if (tech.malo && MALO_OPTIONS.includes(tech.malo) && wine.malo === "Unknown") patch.malo = tech.malo;

    // Aromas — union with existing, only valid tags
    if (Array.isArray(p.aromas) && p.aromas.length) {
      const valid = p.aromas.filter(a => ALL_AROMAS.includes(a));
      if (valid.length) {
        const set = new Set(wine.aromas || []);
        valid.forEach(a => set.add(a));
        patch.aromas = Array.from(set);
      }
    }

    up(patch);
  };

  const fetchInfo = async () => {
    if (!wine.producer || loadingInfo) return;
    setLoadingInfo(true);
    try {
      const text = await callClaude({
        max_tokens: 1000,
        system: `You are a Champagne expert. Given a house/producer name respond ONLY with JSON (no markdown): {"fullName":"...","founded":"year","village":"village, region","style":"short style descriptor","grapes":"typical grape focus","production":"grower/négociant/co-op + rough size","bio":"2-3 sentence connoisseur summary","tags":["3-4 descriptor tags"]}. If unknown: {"error":"Unknown"}.`,
        messages: [{ role: "user", content: wine.producer }],
      });
      const info = parseJSON(text);
      up({ producerInfo: info.error ? { bio: "No information found.", fullName: wine.producer } : info });
    } catch (e) { up({ producerInfo: { bio: "Could not load: " + e.message, fullName: wine.producer } }); }
    setLoadingInfo(false);
  };

  const showIdentity = !blind || wine.revealed;

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", padding: "24px 20px" }}>
      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <button onClick={onPrev} disabled={n === 1} style={{ background: "none", border: "none", color: n === 1 ? LINE : GOLD_DEEP, cursor: n === 1 ? "default" : "pointer", fontSize: 22, padding: "4px 8px" }}>←</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: serif, fontSize: 10, letterSpacing: 5, color: INK_SOFT }}>WINE</div>
          <div style={{ fontFamily: serif, fontSize: 34, color: GOLD_DEEP, lineHeight: 1, fontWeight: 600 }}>{n}<span style={{ fontSize: 16, color: LINE }}> / {total}</span></div>
        </div>
        <button onClick={onNext} style={{ background: "none", border: "none", color: GOLD_DEEP, cursor: "pointer", fontSize: 22, padding: "4px 8px" }}>→</button>
      </div>

      {/* Identity */}
      <div style={{ border: `1px solid ${LINE}`, borderRadius: 3, padding: "16px", marginBottom: 18, background: PAPER, boxShadow: `0 2px 8px ${SHADOW}` }}>
        {showIdentity ? (
          <>
            {showIdentity && <BottlePhoto photo={wine.bottlePhoto} onChange={p => up({ bottlePhoto: p })} />}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 14px" }}>
              <div style={{ gridColumn: "span 2" }}><label style={label}>Producer / House</label><input value={wine.producer} onChange={e => up({ producer: e.target.value, producerInfo: null })} placeholder="e.g. Pierre Péters" style={inputBase} /></div>
              <div style={{ gridColumn: "span 2" }}><label style={label}>Cuvée</label><input value={wine.cuvee} onChange={e => up({ cuvee: e.target.value })} placeholder="e.g. Les Chétillons" style={inputBase} /></div>
              <div><label style={label}>Vintage</label><input value={wine.vintage} onChange={e => up({ vintage: e.target.value })} placeholder="NV / 2013" style={inputBase} /></div>
              <div><label style={label}>Type</label>
                <select value={wine.type} onChange={e => up({ type: e.target.value })} style={{ ...inputBase, fontSize: 14 }}>{WINE_TYPES.map(t => <option key={t}>{t}</option>)}</select>
              </div>
              <div><label style={label}>Village / Cru</label><input value={wine.village} onChange={e => up({ village: e.target.value })} placeholder="e.g. Le Mesnil GC" style={inputBase} /></div>
              <div><label style={label}>Grape Blend</label><input value={wine.blend} onChange={e => up({ blend: e.target.value })} placeholder="e.g. 100% Chardonnay" style={inputBase} /></div>
            </div>

            <Divider m="16px 0" />
            <div style={{ fontFamily: serif, fontSize: 11, letterSpacing: 2, color: GOLD_DEEP, textTransform: "uppercase", marginBottom: 10 }}>Technical Detail</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 14px" }}>
              <div><label style={label}>Disgorgement</label><input value={wine.disgorgement} onChange={e => up({ disgorgement: e.target.value })} placeholder="e.g. 03/2022" style={inputBase} /></div>
              <div><label style={label}>Dosage (g/L)</label><input value={wine.dosage} onChange={e => up({ dosage: e.target.value })} placeholder="e.g. 4" style={inputBase} /></div>
              <div><label style={label}>Oak</label><select value={wine.oak} onChange={e => up({ oak: e.target.value })} style={{ ...inputBase, fontSize: 14 }}>{OAK_OPTIONS.map(o => <option key={o}>{o}</option>)}</select></div>
              <div><label style={label}>Malolactic</label><select value={wine.malo} onChange={e => up({ malo: e.target.value })} style={{ ...inputBase, fontSize: 14 }}>{MALO_OPTIONS.map(o => <option key={o}>{o}</option>)}</select></div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontFamily: serif, fontSize: 13, letterSpacing: 5, color: INK_SOFT, marginBottom: 6 }}>BLIND TASTING</div>
            <div style={{ fontFamily: serif, fontSize: 15, color: INK_SOFT, fontStyle: "italic", marginBottom: 16 }}>Assess the wine before revealing its identity.</div>
            <Btn onClick={onReveal}>Reveal Identity</Btn>
          </div>
        )}
      </div>

      {/* Producer card */}
      {showIdentity && wine.producer && <ProducerCard producer={wine.producer} info={wine.producerInfo} onFetch={fetchInfo} loading={loadingInfo} />}

      {/* Score */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <label style={{ ...label, marginBottom: 0 }}>Score</label>
        <div style={{ fontFamily: serif, fontSize: 30, color: GOLD_DEEP, fontWeight: 600 }}>{tot}<span style={{ fontSize: 14, color: INK_SOFT }}>/100</span></div>
      </div>
      <div style={{ marginBottom: 22 }}>{CRITERIA.map(c => <ScoreSlider key={c.id} criterion={c} value={wine.scores[c.id]} onChange={v => up({ scores: { ...wine.scores, [c.id]: v } })} />)}</div>

      <Divider />

      {/* Aroma */}
      <div style={{ marginBottom: 22 }}>
        <label style={label}>Aromatic Profile</label>
        <AromaWheel selected={wine.aromas} onToggle={t => up({ aromas: wine.aromas.includes(t) ? wine.aromas.filter(x => x !== t) : [...wine.aromas, t] })} />
      </div>

      {/* WSET notes */}
      <WsetNotes notes={wine.wsetNotes} onChange={wsetNotes => up({ wsetNotes })} onScan={applyScan} />

      <Btn primary={isLast} onClick={onNext} style={{ width: "100%" }}>{isLast ? "Complete Flight →" : "Next Wine →"}</Btn>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  FLIGHT SUMMARY (RESULTS)
// ════════════════════════════════════════════════════════════════════════

function SummaryScreen({ session, wines, onBack, onRestart }) {
  const sorted = [...wines].map((w, i) => ({ ...w, originalIndex: i })).sort((a, b) => scoreTotal(b) - scoreTotal(a));
  const [aiSummary, setAiSummary] = useState(null); // { flight, wines: {id: text} }
  const [loading, setLoading] = useState(false);

  const medal = i => ["🥇", "🥈", "🥉"][i] || `${i + 1}`;
  const medalColor = i => [GOLD, "#9a9a8a", "#b08a5a"][i] || LINE;

  const generateSummary = async () => {
    setLoading(true);
    const wineData = wines.map((w, i) => ({
      n: i + 1,
      producer: w.producer || "Unknown",
      cuvee: w.cuvee, vintage: w.vintage, type: w.type, village: w.village,
      blend: w.blend, dosage: w.dosage, disgorgement: w.disgorgement, oak: w.oak, malo: w.malo,
      score: scoreTotal(w),
      aromas: w.aromas,
      notes: w.wsetNotes,
    }));
    try {
      const text = await callClaude({
        max_tokens: 2500,
        system: `You are a Master Sommelier writing an elegant post-tasting summary for a connoisseur's flight of Champagnes. Respond ONLY with JSON (no markdown): {"flight":"2-3 sentence overview of the flight as a whole — themes, standouts, contrasts","wines":[{"n":1,"impression":"2-3 sentence refined summary of this wine's character and showing","highlight":"one short phrase capturing its signature moment or defining trait"}]}. Base everything on the provided data and notes. Be specific and evocative but grounded.`,
        messages: [{ role: "user", content: JSON.stringify({ session: session.name, wines: wineData }) }],
      });
      setAiSummary(parseJSON(text));
    } catch (e) {
      setAiSummary({ flight: "Could not generate summary: " + e.message, wines: [] });
    }
    setLoading(false);
  };

  const wineImpression = (w) => aiSummary?.wines?.find(x => x.n === w.originalIndex + 1);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <div style={{ fontFamily: serif, fontSize: 11, letterSpacing: 6, color: GOLD_DEEP }}>THE FLIGHT</div>
        <h2 style={{ fontFamily: serif, fontSize: 36, fontWeight: 600, color: INK, margin: "6px 0 4px" }}>{session.name || "Tasting Summary"}</h2>
        <div style={{ fontFamily: serif, fontSize: 13, color: INK_SOFT }}>{session.location && `${session.location} · `}{session.date} · {wines.length} wines · {session.blind ? "Blind" : "Open"}</div>
      </div>
      <Divider />

      {/* AI flight overview */}
      {!aiSummary && !loading && (
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Btn primary onClick={generateSummary} style={{ width: "100%" }}>✦ Generate Flight Summary</Btn>
          <div style={{ fontFamily: serif, fontSize: 13, color: INK_SOFT, marginTop: 8, fontStyle: "italic" }}>A sommelier's overview and per-wine impressions</div>
        </div>
      )}
      {loading && <div style={{ textAlign: "center", padding: "24px 0", marginBottom: 16 }}><div style={{ display: "inline-flex" }}><Dots /></div><div style={{ fontFamily: serif, fontSize: 14, color: INK_SOFT, letterSpacing: 2, marginTop: 10 }}>Composing the summary…</div></div>}
      {aiSummary?.flight && (
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderLeft: `3px solid ${GOLD}`, borderRadius: 3, padding: "16px 18px", marginBottom: 26, boxShadow: `0 2px 8px ${SHADOW}` }}>
          <div style={{ fontFamily: serif, fontSize: 11, letterSpacing: 2, color: GOLD_DEEP, textTransform: "uppercase", marginBottom: 6 }}>The Flight in Summary</div>
          <p style={{ fontFamily: serif, fontSize: 16, color: INK, lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>{aiSummary.flight}</p>
        </div>
      )}

      {/* Ranked wines with full detail */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {sorted.map((w, i) => {
          const imp = wineImpression(w);
          const filled = WSET.filter(s => w.wsetNotes[s.id]?.trim());
          return (
            <div key={w.id} style={{ background: PAPER, border: `1px solid ${i === 0 ? GOLD : LINE}`, borderRadius: 4, overflow: "hidden", boxShadow: `0 3px 12px ${SHADOW}` }}>
              {/* Header band */}
              <div style={{ display: "flex", gap: 14, padding: "14px 16px", background: i === 0 ? "rgba(168,132,44,0.07)" : "transparent", borderBottom: `1px solid ${LINE_SOFT}` }}>
                {w.bottlePhoto && <img src={w.bottlePhoto} alt="" style={{ width: 44, height: 60, objectFit: "cover", borderRadius: 2, border: `1px solid ${LINE}` }} />}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 17, color: medalColor(i) }}>{medal(i)}</span>
                    <span style={{ fontFamily: serif, fontSize: 18, color: INK, fontWeight: 600 }}>{w.producer || "Unknown"}{w.cuvee ? ` · ${w.cuvee}` : ""}</span>
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 13, color: INK_SOFT, marginTop: 2 }}>
                    {[w.type, w.vintage, w.village].filter(Boolean).join(" · ")}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: serif, fontSize: 26, color: medalColor(i), fontWeight: 600 }}>{scoreTotal(w)}</div>
                  <div style={{ fontFamily: serif, fontSize: 11, color: INK_SOFT }}>/ 100</div>
                </div>
              </div>

              <div style={{ padding: "14px 16px" }}>
                {/* AI impression */}
                {imp && (
                  <div style={{ marginBottom: 12 }}>
                    {imp.highlight && <div style={{ fontFamily: serif, fontSize: 13, color: GOLD_DEEP, fontStyle: "italic", marginBottom: 5 }}>“{imp.highlight}”</div>}
                    <p style={{ fontFamily: serif, fontSize: 14.5, color: INK, lineHeight: 1.7, margin: 0 }}>{imp.impression}</p>
                  </div>
                )}

                {/* Technical line */}
                {(w.blend || w.dosage || w.disgorgement || w.oak !== "Unknown" || w.malo !== "Unknown") && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px", marginBottom: 10, padding: "8px 0", borderTop: `1px solid ${LINE_SOFT}`, borderBottom: `1px solid ${LINE_SOFT}` }}>
                    {[["Blend", w.blend], ["Dosage", w.dosage && `${w.dosage} g/L`], ["Disg.", w.disgorgement], ["Oak", w.oak !== "Unknown" && w.oak], ["Malo", w.malo !== "Unknown" && w.malo]].filter(r => r[1]).map(([k, v]) => (
                      <span key={k} style={{ fontFamily: serif, fontSize: 12.5, color: INK_SOFT }}><span style={{ color: GOLD_DEEP }}>{k}:</span> {v}</span>
                    ))}
                  </div>
                )}

                {/* Aromas */}
                {w.aromas.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: filled.length ? 10 : 0 }}>
                    {w.aromas.map(a => <span key={a} style={{ fontFamily: serif, fontSize: 12, color: INK_SOFT, padding: "1px 8px", border: `1px solid ${LINE_SOFT}`, borderRadius: 2 }}>{a}</span>)}
                  </div>
                )}

                {/* WSET notes */}
                {filled.length > 0 && (
                  <details style={{ marginTop: 4 }}>
                    <summary style={{ fontFamily: serif, fontSize: 12, letterSpacing: 1.5, color: GOLD_DEEP, textTransform: "uppercase", cursor: "pointer" }}>Full Tasting Note</summary>
                    <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                      {filled.map(s => (
                        <div key={s.id}>
                          <div style={{ fontFamily: serif, fontSize: 10, letterSpacing: 2, color: GOLD_DEEP, textTransform: "uppercase", marginBottom: 2 }}>{s.roman} · {s.label}</div>
                          <p style={{ fontFamily: serif, fontSize: 14, color: INK, lineHeight: 1.65, margin: 0 }}>{w.wsetNotes[s.id]}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Divider />
      <div style={{ display: "flex", gap: 12 }}>
        <Btn onClick={onBack} style={{ flex: 1 }}>← Back to Tasting</Btn>
        <Btn onClick={onRestart} style={{ flex: 1 }}>New Flight</Btn>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  ROOT
// ════════════════════════════════════════════════════════════════════════

export default function App() {
  const [screen, setScreen] = useState("setup");
  const [library, setLibrary] = useState(false);
  const [session, setSession] = useState(null);
  const [wines, setWines] = useState([]);
  const [current, setCurrent] = useState(0);

  const start = (s) => {
    setSession(s);
    setWines(Array.from({ length: s.count }, (_, i) => createWine(i)));
    setCurrent(0);
    setScreen("tasting");
  };
  const updateWine = (w) => setWines(prev => prev.map(x => x.id === w.id ? w : x));

  return (
    <div style={{ minHeight: "100vh", background: BG, backgroundImage: "radial-gradient(circle at 20% 10%, rgba(255,250,235,0.6), transparent 40%), radial-gradient(circle at 85% 90%, rgba(220,201,160,0.25), transparent 45%)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: sepia(1) saturate(2) hue-rotate(5deg); opacity: 0.55; cursor: pointer; }
        textarea::placeholder, input::placeholder { color: #b8a87a; }
        select { -webkit-appearance: none; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23a8842c'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 26px !important; }
        ::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #efe4c8; } ::-webkit-scrollbar-thumb { background: #d8c9a0; border-radius: 4px; }
        @keyframes pulse { 0%,100% { opacity: 0.25; transform: scale(0.8);} 50% { opacity: 1; transform: scale(1);} }
        details summary::-webkit-details-marker { display: none; }
        details summary { list-style: none; }
      `}</style>

      <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

      {library && <Library onClose={() => setLibrary(false)} />}

      {/* Persistent library button on tasting/summary */}
      {(screen === "tasting" || screen === "summary") && !library && (
        <button onClick={() => setLibrary(true)} style={{ position: "fixed", bottom: 20, right: 20, zIndex: 50, width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD_DEEP}, ${GOLD})`, border: "none", color: PAPER, fontSize: 22, cursor: "pointer", boxShadow: "0 4px 16px rgba(120,95,40,0.4)" }} title="Champagne Library">📖</button>
      )}

      {screen === "setup" && <SetupScreen onStart={start} onLibrary={() => setLibrary(true)} />}

      {screen === "tasting" && wines.length > 0 && (
        <TastingCard
          wine={wines[current]} n={current + 1} total={wines.length} blind={session.blind}
          onUpdate={updateWine}
          onReveal={() => updateWine({ ...wines[current], revealed: true })}
          onNext={() => { if (current < wines.length - 1) setCurrent(c => c + 1); else setScreen("summary"); }}
          onPrev={() => setCurrent(c => Math.max(0, c - 1))}
          isLast={current === wines.length - 1}
        />
      )}

      {screen === "summary" && (
        <SummaryScreen session={session} wines={wines} onBack={() => setScreen("tasting")} onRestart={() => { setScreen("setup"); setWines([]); setSession(null); }} />
      )}

      <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${LINE}, transparent)` }} />
    </div>
  );
}
