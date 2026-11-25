# Portfolio — project index (draft)

Plain static site. No build step, no dependencies. Works on GitHub Pages and from `file://`.

```
index.html              page shell
css/style.css           all styles (system fonts, no animation)
js/app.js               rendering, filters, #hash routes
data/profile.js         header tagline only — edit this to change the wording
data/projects.js        site name, about, contact, and all projects
images/thumbs/          tile images (16:10 jpg)
images/detail/          larger figures on project pages
scripts/screenshot.mjs  optional: headless preview screenshots (Node 22+)
preview/                screenshots of this draft
.nojekyll               tells GitHub Pages to serve files as-is
```

## Change the tagline

Edit **`data/profile.js`**. The page reads `window.PROFILE.tagline` and, if present, `taglineSecondary` (a second line). You can change only that file; you do not need to touch the HTML or the project list.

Default wording:

- Urban data · Data analysis · AI products · Map products · Games · Comics
- 城市數據 · 數據分析 · AI 產品 · 地圖產品 · 遊戲 · 漫畫

## Add a project

Open `data/projects.js`, copy one object in `window.PROJECTS`, edit it. Schema is documented at the top of that file.

- `categories`: any of `Research`, `Product`, `Game`, `Comics`, `Film` (several allowed). Filter counts update automatically.
- `image`: optional tile, e.g. `images/thumbs/my-project.jpg`. Without it the tile is typographic (title on a neutral colour).
- `images`: optional figures on the project page (src / alt / caption). If omitted, the page reuses `image`.
- `embed`: optional video on the detail page. `{ type: "drive", id: "<file id>" }` is a Google Drive iframe (`/file/d/<id>/preview`); the file must be shared “anyone with the link can view” or visitors will see a sign-in wall. `{ type: "bilibili", bvid: "BVxxxxxxxx" }` is a Bilibili player iframe (`player.bilibili.com/player.html?bvid=…&autoplay=0&high_quality=1`), 16:9, same styling as Drive. Do not put a large video file in this folder.
- `links`: `[]` if none. Only real URLs.
- `draft: true` shows a "Draft — to be rewritten" label above Design thinking. Delete it once rewritten.
- Array order = page order.

Site name, about line and contact links: `window.SITE` in `data/projects.js`.

## Routes

- `#/` all projects · `#/f/game` (or research / product / comics / film) filtered · `#/p/<id>` project detail
- `?view=list` opens in list layout (the Grid/List toggle also remembers the choice).

## Preview locally

```
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly also works (data is a .js file, not fetched JSON).

Screenshots (optional): with the server running,
`node scripts/screenshot.mjs http://127.0.0.1:8000/ preview/index-desktop.png 1440 900`
(add a 5th arg `1` for mobile emulation, e.g. `390 844 1`). It launches a throwaway headless Chrome profile.

## Deploy to GitHub Pages (once a repo is chosen)

A repo has not been created yet. When you are ready:

1. Create a repo, e.g. `portfolio` (site at `https://waterywaterman.github.io/portfolio/`) or `WateryWaterman.github.io` (site at the root).
2. Push the contents of this folder to the `main` branch root. Leave large videos out of the repo (they belong on Google Drive).
3. Repo → Settings → Pages → Source: "Deploy from a branch", Branch `main`, folder `/ (root)`.
4. Wait ~1 minute, open the URL. All paths are relative, so either repo name works.

`preview/` and `scripts/` can be left out of the repo if you prefer.
