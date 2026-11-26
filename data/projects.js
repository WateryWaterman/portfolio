/*
 * ALL project content lives in this file. Add a project = add one object to
 * window.PROJECTS. Page order = by `tier` (from the CV's % T comments), lowest
 * first; within a tier, array order. No tier = shown last.
 *
 * The header tagline is NOT here — edit data/profile.js instead.
 *
 * Project entry schema:
 *   id          string   unique, URL-safe (used in #/p/<id>)
 *   title       string
 *   year        string   e.g. "2026" or "2025–2026"; "" if unknown (tile shows "—")
 *   period      string   optional, finer dates shown in the detail view
 *   categories  string[] any of "Research", "Product", "Game", "Comics", "Film" (multiple OK)
 *   role        string   e.g. "Team course project", "Solo project"
 *   summary     string   one line
 *   links       {label, url}[]   live / repo / paper / video; [] if none
 *   tags        string[] tools, methods
 *   thinking    string   "Design thinking": why / how it was built. Blank line = new paragraph.
 *   points      string[] optional key facts (from the CV)
 *   image       string   optional, e.g. "images/thumbs/foo.jpg" (16:10). No image = typographic tile.
 *   images      {src, alt, caption?}[]  optional figures on the detail page (falls back to `image`)
 *   embed       {type:"drive", id} or {type:"bilibili", bvid} or {type:"pico8", pid}  optional video / playable cart on the detail page
 *   draft       boolean  optional; true = thinking text is an assistant draft, rewrite it.
 *   tier        number   hidden sort key: CV tier (1, 1.5, 2...). Not displayed.
 *   hideInAll   boolean  optional; true = not on the All view, only under its own category.
 */

window.SITE = {
  name: "Shen Fanshen",
  about: "MSc Urban Analytics, The University of Hong Kong (2025–2026). BEng Urban and Rural Planning, Zhejiang University (2019–2024; Outstanding Undergraduate Thesis 2024). Map Data Product Manager Intern at DiDi (2026); Research Assistant, HKU Faculty of Architecture (2026–).",
  contact: [
    { label: "Email", url: "mailto:splitfancy05@gmail.com" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/fan-shen-828237384" },
    { label: "GitHub", url: "https://github.com/WateryWaterman" }
  ]
};

window.PROJECTS = [
  {
    id: "hiddengems",
    tier: 1,
    title: "HiddenGems",
    year: "2026",
    period: "Feb 2026 – Apr 2026",
    categories: ["Product"],
    role: "Team course project",
    summary: "Personalised tourist-attraction recommender for lesser-known spots in Hong Kong, on a map.",
    links: [{ label: "Live", url: "https://hiddengem.space/" }],
    tags: ["Web app", "Survey", "Scraping", "DeepSeek-V3 API", "Google API", "Python", "Maps"],
    thinking: "The course asked for a tool that solves a real urban problem. Media and official recommendations don't fit each traveller's taste; map apps and plain AI recommendations aren't transparent or community-based enough. So: an app that helps travellers find personalised, diverse \"hidden\" spots.\n\nA survey of social-media-using travellers set the MVP: 90% wanted accessible lesser-known attractions, only 10% had visited one, mainly for lack of information. Survey plus literature gave 7 preference dimensions. Before letting an LLM score every attraction, we checked it against 500+ benchmark scores (equivalent R = 0.6).",
    points: [
      "2,588 Hong Kong attractions scraped from Trip.com and Tripadvisor, deduplicated, enriched via Google API.",
      "Reviews scored on 7 dimensions with DeepSeek-V3; 500+ benchmark scores with confidence levels.",
      "Map-based web app, AI-assisted Python/HTML, deployed via GitHub with a custom domain. Course grade: A."
    ],
    image: "images/thumbs/hiddengems.jpg",
    images: [
      { src: "images/detail/hiddengems-map.jpg", alt: "HiddenGems map of Hong Kong attractions with a ranked list of matches", caption: "Discovery view: map and ranked matches." },
      { src: "images/detail/hiddengems-profiles.jpg", alt: "HiddenGems opening screen with traveller profile presets", caption: "Opening screen: choose a traveller profile, then go to discovery." }
    ]
  },
  {
    id: "epub-translator",
    tier: 1.5,
    title: "EPUB Translator",
    year: "2026",
    period: "May 2026 (48 hours)",
    categories: ["Product"],
    role: "Solo, 48-hour AI product-building challenge",
    summary: "LLM-based EPUB translator for 19 languages that keeps the original layout.",
    links: [{ label: "Live", url: "https://epubtranslator.space" }],
    tags: ["LLM", "Python", "OpenCode", "DeepSeek", "Perplexity", "Railway", "Resend API"],
    thinking: "Brief: design a product for a real need in 48 hours. I was reading foreign-language psychology books, and classmates also read foreign books. Sentence-by-sentence translation breaks the reading flow; existing tools are paid or full of ads. MVP: translate EPUB with an LLM API and keep as much layout as possible, so it stays readable.\n\nAfter launch it drew steady use (about three books a day), which made running it on my own API keys costly. I tested alternative translation routes and set up a scheduled check that the model endpoint still responds.",
    points: [
      "Python backend with OpenCode + DeepSeek; frontend and technical planning with Perplexity.",
      "Deployed on Railway; translated books delivered by e-mail via Resend API.",
      "Core translation code open-sourced on GitHub."
    ],
    image: "images/thumbs/epub-translator.jpg",
    images: [
      { src: "images/detail/epub-translator.jpg", alt: "EPUB Translator homepage with upload panel and three-step instructions", caption: "Live site: upload an EPUB, pick a language, keep the original layout." }
    ]
  },
  {
    id: "street-view-emotion",
    tier: 1.5,
    title: "Street-view Imagery and Perceived Emotion in Hong Kong",
    year: "2026",
    period: "Jan 2026 – Mar 2026",
    categories: ["Research"],
    role: "Team project",
    summary: "How built-environment features relate to perceived emotion, from 3,000+ street-view images.",
    links: [{ label: "Video", url: "https://drive.google.com/file/d/1t3qCVr7hZLoOosIO9bogguiIWNgtwSWP/view" }],
    tags: ["Street-view imagery", "ResNet-18", "SegFormer-B5", "OLS", "Random Forest", "SHAP"],
    thinking: "Experience in high-density cities is hard to quantify. We built a \"built-environment features – perceived emotion\" model to see how spatial design affects emotion: 4 typical districts × 6 emotion indicators × 10 built-environment indicators.\n\nOLS as the baseline, Random Forest + SHAP to explain it; predictors explained 60% of the \"beautiful\" dimension, which fed policy recommendations.",
    points: [
      "1,000+ sample points, 3,000+ street-view images via API; 85% kept after cleaning.",
      "ResNet-18 emotion classifier (25 epochs, train/test loss stable at 0.22).",
      "Benchmarked 5 pretrained segmentation models; chose SegFormer-B5 (Cityscapes), 84% mIoU."
    ],
    image: "images/thumbs/street-view-emotion.jpg",
    images: [
      { src: "images/detail/street-view-emotion-districts.jpg", alt: "Presentation slide titled Four Districts, Four Emotional Personalities, with street photographs labelled Central (Most Oppressive), Sham Shui Po (Most Lively), Tseung Kwan O (Most Planned) and Sha Tin (Most Liveable), short notes under each, and a footer that the models explain up to 47% of the variance in perceived beauty", caption: "From the project video: four Hong Kong districts, each with a street-view photograph and the emotional character the team assigned." },
      { src: "images/detail/street-view-emotion-metrics.jpg", alt: "Presentation slide titled Visual Metric Results — District Profiles, with a radar chart of visual-environment metrics for Central, Sham Shui Po, Tseung Kwan O and Sha Tin, plus a summary card for each district. A narration subtitle at the bottom reads: Sham Shui Po comes out on top for both human and vehicle presence", caption: "From the project video: district-level visual metrics (green-view index, sky-view factor, building ratio, and others) compared on a radar chart. A narration subtitle is visible at the bottom." }
    ],
    embed: { type: "drive", id: "1t3qCVr7hZLoOosIO9bogguiIWNgtwSWP" }
  },
  {
    id: "shenzhen-shopping",
    tier: 1.5,
    title: "Moving the Shopping Boundaries in Shenzhen",
    year: "2025–2026",
    period: "Nov 2025 – Jan 2026",
    categories: ["Research"],
    role: "Team course project; led the data-processing strategy",
    summary: "Cross-border mobility analysis: how the Huanggang Port redevelopment may shift Hong Kong shoppers' destinations.",
    links: [{ label: "StoryMap", url: "https://junnaifj.github.io/shenzhen-shopping-storymap2/" }],
    tags: ["Trajectory data", "Huff gravity model", "Scenario simulation", "GIS"],
    thinking: "The question was where Hong Kong shoppers go in Shenzhen and how a port redevelopment could move that. Raw trajectories of 20,000 travellers had to become trips first: activity centres gave origins, destinations and crossings; explicit rules defined retail grids, checkpoint cells and shopping trips. Those processed flows then fed the team's Huff model and 4 port-efficiency scenarios.",
    points: [
      "Trajectory data of 20,000 Hong Kong–Shenzhen cross-border travellers.",
      "Retail grid = retail AOI > 5% of cell area; shopping trip = same-day, > 1.5 h in retail areas; retail areas = 46.6% of all trips.",
      "Huff gravity model, 49.6% variance explained; 4 port-efficiency scenarios. Grade: A+."
    ],
    image: "images/thumbs/shenzhen-shopping.jpg",
    images: [
      { src: "images/detail/shenzhen-shopping.jpg", alt: "StoryMap cover: Moving the shopping boundaries in Shenzhen", caption: "Published StoryMap cover." },
      { src: "images/detail/shenzhen-flowchart.jpg", alt: "Flowchart of current-pattern analysis, scenario simulation with a gravity model, and recommendations", caption: "From raw trajectories to shopping trips, the Huff model, and four port-efficiency scenarios." },
      { src: "images/detail/shenzhen-formula.jpg", alt: "Utility and multinomial logit formulas, with a diagram from 18 Hong Kong districts through 6 checkpoints to 264 Shenzhen shopping cells", caption: "Destination utility and the multinomial logit used to estimate shopper choice probabilities." }
    ],
    draft: true
  },
  {
    id: "transport-equity-storymap",
    tier: 2,
    title: "Public Transport Accessibility and Equity in Hong Kong",
    year: "2025",
    period: "Dec 2025",
    categories: ["Research"],
    role: "Individual course project",
    summary: "Grid-level public-transport accessibility and its equity, published as an ArcGIS StoryMap.",
    links: [{ label: "StoryMap", url: "https://arcg.is/1e18q00" }],
    tags: ["ArcGIS StoryMaps", "Network analysis", "OD matrix", "Amap Web API", "OpenStreetMap", "Gini / Lorenz"],
    thinking: "Fine scale first. 1 km grids, keeping only 266 urban cells (building-footprint density > 10%). Accessibility = what you can reach: OpenStreetMap POIs (education, medical, recreation, shopping) within 45 minutes and HK$20. Equity = who gets it: Lorenz curves and Gini coefficients weighted by population and median household income. Published as a StoryMap so the findings can be explored.",
    points: [
      "8-minute walking catchments of bus stops on a pedestrian network.",
      "Grid-to-grid OD matrix; travel time and fare via Amap Web API.",
      "Medical and shopping facilities most concentrated, slightly skewed toward higher-income areas."
    ],
    image: "images/thumbs/transport-equity.jpg",
    images: [
      { src: "images/detail/transport-equity.jpg", alt: "Choropleth map of public-transport accessibility across Hong Kong", caption: "Grid-level accessibility map from the project (the live StoryMap is the place to explore it)." }
    ],
    draft: true
  },
  {
    id: "ifc-fire-door",
    tier: 2,
    title: "IFC Fire-door Compliance Checker",
    year: "2026",
    period: "Sep 2026",
    categories: ["Research", "Product"],
    role: "Research Assistant prototype, HKU",
    summary: "Web tool that loads IFC models and checks exit-door widths against Hong Kong fire-safety rules.",
    links: [
      { label: "Demo", url: "https://fsb-door-check-production.up.railway.app/" },
      { label: "Video", url: "https://www.bilibili.com/video/BV1QcKs6gEkB/" }
    ],
    tags: ["BIM", "IFC", "web-ifc", "Three.js", "AI-assisted coding"],
    thinking: "Goal: explore automating fire-safety review on BIM. Exit-door clear widths are checked against Table B2 of Hong Kong's Code of Practice for Fire Safety in Buildings, using each linked space's use class and occupant capacity.\n\nKey difficulty: IFC models follow no unified convention. Doors often lack fire-door flags, linked spaces, use classes or capacities. So the tool adds reviewer overrides, an editable regulation-threshold table, per-door \"mark as checked\" and JSON export.\n\nOpen question: doors with no linked space still can't be assessed. How complete must a model be, and what must be checked first, before rule-based compliance checking is meaningful?",
    points: [
      "Surveyed open-source IFC projects and commercial construction-management products.",
      "3D viewer colour-codes doors as pass / fail / not processable.",
      "Tested on a multi-storey clinic model with 200+ doors."
    ],
    image: "images/thumbs/ifc-fire-door.jpg",
    images: [
      { src: "images/detail/ifc-fire-door.jpg", alt: "FSB Door Check interface with the Hong Kong Table B2 width-by-capacity rules in the sidebar", caption: "Live tool: the 3D viewer is on the left once an IFC file is loaded; the sidebar holds Table B2 and overrides." }
    ]
  },
  {
    id: "strategy-card-game",
    tier: 2,
    title: "Strategy Card Game Demo",
    year: "2026",
    period: "Apr 2026",
    categories: ["Game"],
    role: "Team project, AI course",
    summary: "32-card strategy game on the police–triad–tycoon balance of classic Hong Kong films. Player vs AI.",
    links: [{ label: "Play (itch.io)", url: "https://heelgo.itch.io/6009game" }],
    tags: ["Godot", "Trae", "Godot MCP", "Jimeng AI", "Card design"],
    thinking: "The brief: build a game with any tools. Card games have grown fast, fit any setting, and can be prototyped quickly on paper. So we borrowed the three-way power balance of old Hong Kong films and let AI help build the demo.\n\nCore mechanic: an open/hidden hand. 16 base identity cards with rank suppression and \"weakest beats strongest\"; 16 special/event cards add random events and turnarounds. Card and table art from Jimeng AI; once the base framework was set, game logic was written in Godot through Trae + Godot MCP.",
    points: [
      "Player-vs-AI 1v1 logic and card-resolution priority implemented.",
      "Ranked 2nd best group in the AI course."
    ],
    image: "images/thumbs/strategy-card-game.jpg",
    images: [
      { src: "images/detail/strategy-card-game.jpg", alt: "Strategy card game in play: identity cards in hand, battle area in the centre, AI opponent at the top", caption: "Player vs AI, mid-round, on the itch.io build." }
    ]
  },
  {
    id: "shmup-pico8",
    tier: 2,
    title: "SHMUP Demo (PICO-8)",
    year: "2025",
    period: "Sep 2025 – Nov 2025",
    categories: ["Game"],
    role: "Solo project",
    summary: "Hand-coded shoot-'em-up in Lua with original sprites and 8-bit soundtrack.",
    links: [{ label: "Play (PICO-8 BBS)", url: "https://www.lexaloffle.com/bbs/?tid=155662" }],
    tags: ["PICO-8", "Lua", "Pixel art", "Chiptune"],
    thinking: "PICO-8 bundles code, sprites, map tiles and 8-bit music in one virtual console, with detailed tutorials and an active community. A good entry point for a complete game: follow a tutorial, then add fun mechanics.\n\nCode is hand-written; most effects are math functions. No formal composition training, so the soundtrack came from basic chord knowledge and how tracks are layered. Published on the official BBS; bugs fixed from comments.",
    points: [],
    image: "images/thumbs/shmup-pico8.jpg",
    images: [],
    embed: { type: "pico8", pid: "myregularshmup", tid: "155662" }
  },
  {
    id: "pingfan-laodeng",
    tier: 1.5,
    title: "Comic IP “Pingfan Laodeng”",
    year: "2025–",
    period: "Feb 2025 – Present",
    categories: ["Comics"],
    role: "Creator & operator (Xiaohongshu, WeChat stickers)",
    summary: "Self-deprecating comic and WeChat sticker IP for the 25–30 age group.",
    links: [{ label: "Xiaohongshu", url: "https://xhslink.com/m/6VI7SKAoOYe" }],
    tags: ["Comics", "WeChat stickers", "Xiaohongshu", "Content strategy"],
    thinking: "Positioning: \"young in years, old at heart\" self-mockery, from what 25–30-year-olds want to express.\n\nI took apart 10+ viral comic notes and found \"emotional release + self-projection\" drove engagement. Testing tones (venting, healing, anger, excitement) led to one rule: a single strong emotional resonance. Then a monitoring loop: cover/title resonance → emotional intensity → engagement.",
    points: [
      "Stickers: 2,800+ downloads, 80k+ sends, ~10% promotion conversion.",
      "One note: 1.06M views, 22k likes, 1,000+ comments (vs ~1,000 views before).",
      "Steady notes at 30k+ views, 1,500+ likes; 800+ followers, 27k+ interactions."
    ],
    image: "images/thumbs/pingfan-laodeng.jpg",
    images: [
      { src: "images/detail/pingfan-laodeng-comic.jpg", alt: "Xiaohongshu note of a two-panel comic. An old man tells a middle-aged man to wash the dishes and he answers OK; then the middle-aged man tells his wife to wash the dishes and she answers OK. The note shows 23.1k likes, 2,574 stars and 990 comments", caption: "From the Xiaohongshu note on how a Laodeng came to be (23.1k likes)." },
      { src: "images/detail/pingfan-laodeng-stickers.jpg", alt: "WeChat sticker pack 平凡老登, 16 stickers, 3.1k downloads and 100.9k shares", caption: "WeChat sticker pack: 16 stickers, 3.1k downloads and 100.9k shares." }
    ]
  },
  {
    id: "silicon-diary",
    tier: 3,
    title: "Silicon Diary",
    year: "2026",
    period: "Apr 2026",
    categories: ["Product"],
    role: "Product concept & concept video",
    summary: "AI voice-diary concept: talk your diary, get instant and periodic feedback.",
    links: [{ label: "Concept video", url: "https://www.bilibili.com/video/BV1H4DFBaEQU/" }],
    tags: ["Product planning", "Competitor analysis", "MVP", "Premiere Pro", "AI video"],
    thinking: "Pain point: when writing a diary, thoughts and feelings fade faster than you can write. Voice recording fixes speed but is low-density and hard to review; typical AI summaries ignore emotion and personal growth. The concept: AI understands diary recordings and replies with instant and periodic feedback.\n\nCurrent thinking: validate the MVP with an emotionally resonant fake-app campaign first, then minimal recording + instant and weekly feedback, measuring two-week retention. \"Growth and feedback\" is a stronger selling point than plain recording.",
    points: [
      "User segments, diary and habit-tracking competitor analysis, MVP-to-full roadmap.",
      "Concept video: live footage + AI tools, edited in Premiere Pro."
    ],
    image: "images/thumbs/silicon-diary.jpg",
    images: [
      { src: "images/detail/silicon-diary-features.jpg", alt: "Concept-video frame showing Silicon Diary screens: a voice recording timer, an emotion analysis with an emotion radar chart, an emotion trend line with weekly events, and slow-social matching cards", caption: "From the concept video: voice recording, emotion analysis, growth visualisation and slow social matching." },
      { src: "images/detail/silicon-diary-bottles.jpg", alt: "Concept-video frame showing the Slow Social drift-bottle screen with anonymous posts, emotion labels and match rates", caption: "From the concept video: the Slow Social drift-bottle screen, matching anonymous diary entries by emotion." }
    ],
    embed: { type: "bilibili", bvid: "BV1H4DFBaEQU" }
  },
  {
    id: "art-flow",
    tier: 3,
    title: "Art-Flow",
    year: "2026",
    categories: ["Product"],
    role: "Vibe Coding development",
    summary: "A fullscreen screensaver of design works, with a weekly catalog refresh.",
    links: [
      { label: "Live", url: "https://waterywaterman.github.io/Art-Flow/" },
      { label: "GitHub", url: "https://github.com/WateryWaterman/Art-Flow" }
    ],
    tags: ["Screensaver", "GitHub Pages", "Museum collections"],
    thinking: "Open the page, press F11, and the browser becomes a fullscreen standby board: one design work at a time, filling the screen, advancing on its own. Hover an edge for controls; favourite a work so it stays after the weekly push changes.\n\nThe current catalog is replaced each week. I set this up so AI can carry out that weekly image update, pulling from museum sources. Favourites are stored as ids in the browser; the pictures themselves are hotlinked, not kept in the repo. It is a static GitHub Pages site — no account, no backend.",
    points: [
      "Auto-advance, slow pan, and a 3×3 mosaic option for works that would otherwise be upscaled.",
      "Weekly catalog of roughly 32–36 works; architecture and furniture caps keep the mix in check."
    ],
    image: "images/thumbs/art-flow.jpg",
    images: [
      { src: "images/detail/art-flow.jpg", alt: "Art-Flow screensaver showing a nine-tile colour mosaic of a design object", caption: "Live board, mosaic view." },
      { src: "images/detail/art-flow-chair.jpg", alt: "Art-Flow mosaic of a cantilever chair in nine palettes", caption: "Another weekly work, same mosaic treatment." }
    ]
  },
  {
    id: "draftmark",
    tier: 3,
    title: "Draftmark",
    year: "2026",
    categories: ["Product"],
    role: "Vibe Coding development",
    summary: "A Bluebeam-like, local-first drawing review tool: mark up drawings in the browser and share a room, without turning reviews into drawing entities.",
    links: [
      { label: "Live", url: "https://draftmark-production.up.railway.app/" },
      { label: "GitHub", url: "https://github.com/WateryWaterman/Draftmark" }
    ],
    tags: ["Drawing review", "Yjs", "WebSocket", "HTML/CSS/JS", "Node", "Railway"],
    thinking: "The public repo describes it as what you might need after editing a drawing on Draftline — a Bluebeam-like review layer, not another CAD tool. The frontend is plain HTML, CSS and JavaScript. Reviews stay comments; they never become drawing entities. JSON remains the editable document of record.\n\nShared Yjs rooms, persisted by a small Node HTTP/WebSocket server, let more than one person review the same drawing. The live app is a single Railway service (static frontend plus sync). There is no login: anyone who can reach the app can open its shared document library.",
    points: [
      "Markup tools include cloud, length, callout, highlight and stamps; reviews stay attached to the drawing without rewriting it.",
      "A sample project on the live site shows a floor-plan review with several concurrent marks."
    ],
    image: "images/thumbs/draftmark.jpg",
    images: [
      { src: "images/detail/draftmark.jpg", alt: "Draftmark reviewing a courtyard studio ground-floor plan, with cloud and dimension markups and a comments list", caption: "Live app, sample project: Courtyard Studio, ground floor." }
    ]
  },
  {
    id: "black-sheep",
    tier: 3,
    hideInAll: true,
    title: "Black Sheep (《黑羊》)",
    year: "2023",
    categories: ["Film"],
    role: "Screenwriter",
    summary: "A live-action short film; screenwriting work, with the filmed version embedded below.",
    links: [
      { label: "Film (Google Drive)", url: "https://drive.google.com/file/d/1MLvlxjx4hW9mn06y-_9KKHH_-a4cnk4r/view" },
      { label: "Project folder", url: "https://drive.google.com/drive/folders/1_EVR3jkv2iM7SvTE5e_J8vdsBsHdslaJ?usp=sharing" }
    ],
    tags: ["Screenwriting", "Short film"],
    thinking: "A live-action short I wrote. The filmed version is embedded on this page (also linked on Google Drive). I am not expanding on plot here.",
    points: [],
    image: "images/thumbs/black-sheep.jpg",
    images: [
      { src: "images/detail/black-sheep.jpg", alt: "Still from Black Sheep: two people talking outdoors", caption: "Still from the film." },
      { src: "images/detail/black-sheep-court.jpg", alt: "Still from Black Sheep: two people watching a basketball court at dusk", caption: "Another still." }
    ],
    embed: { type: "drive", id: "1MLvlxjx4hW9mn06y-_9KKHH_-a4cnk4r" }
  }
];
