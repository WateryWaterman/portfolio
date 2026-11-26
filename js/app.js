/* Project index. Routes: #/ (all), #/f/<category>, #/p/<project-id>. No build step. */
(function () {
  "use strict";
  var SITE = window.SITE || {};
  var PROFILE = window.PROFILE || {};
  var PROJECTS = window.PROJECTS || [];
  var CATEGORIES = ["All", "Research", "Product", "Game", "Comics", "Film"];
  var $ = function (id) { return document.getElementById(id); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function paras(text) {
    return String(text || "").split(/\n\s*\n/).map(function (p) { return "<p>" + esc(p.trim()) + "</p>"; }).join("");
  }
  // Order by hidden CV tier (lower first); stable within a tier. No tier = last.
  PROJECTS = PROJECTS.map(function (p, i) { return [p, i]; }).sort(function (a, b) {
    var ta = a[0].tier == null ? 99 : a[0].tier, tb = b[0].tier == null ? 99 : b[0].tier;
    return ta - tb || a[1] - b[1];
  }).map(function (x) { return x[0]; });
  function inCat(p, cat) { return cat === "All" ? !p.hideInAll : (p.categories || []).indexOf(cat) !== -1; }
  function linkAttrs(url) { return /^(https?:)?\/\//.test(url) ? ' target="_blank" rel="noopener"' : ""; }

  $("site-name").textContent = SITE.name || "";
  $("footer-name").textContent = SITE.name || "";
  (function setTagline() {
    var a = PROFILE.tagline || SITE.tagline || "";
    var b = PROFILE.taglineSecondary || "";
    $("tagline").innerHTML = esc(a) + (b ? '<span class="tagline-2">' + esc(b) + "</span>" : "");
  })();
  $("about").textContent = SITE.about || "";
  $("count").textContent = PROJECTS.length + " projects";
  $("contact").innerHTML = (SITE.contact || []).map(function (c) {
    return '<a href="' + esc(c.url) + '"' + linkAttrs(c.url) + ">" + esc(c.label) + "</a>";
  }).join("");

  $("filters").innerHTML = CATEGORIES.map(function (c) {
    var n = PROJECTS.filter(function (p) { return inCat(p, c); }).length;
    return '<button type="button" data-cat="' + c + '" aria-pressed="false">' + c + '<span class="n">' + n + "</span></button>";
  }).join("");
  $("filters").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (b) location.hash = b.dataset.cat === "All" ? "#/" : "#/f/" + b.dataset.cat.toLowerCase();
  });

  var layout = "grid";
  try { layout = localStorage.getItem("layout") || "grid"; } catch (e) {}
  var qv = /[?&]view=(grid|list)/.exec(location.search);
  if (qv) layout = qv[1];
  function setLayout(l) {
    layout = l;
    $("grid").classList.toggle("list", l === "list");
    document.querySelectorAll(".views button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.layout === l)); });
    try { localStorage.setItem("layout", l); } catch (e) {}
  }
  document.querySelector(".views").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (b) setLayout(b.dataset.layout);
  });
  setLayout(layout);

  function tile(p) {
    var cats = p.categories || [];
    var thumb = p.image
      ? '<img src="' + esc(p.image) + '" alt="" loading="lazy">'
      : '<span class="type">' + esc(p.title) + "</span>";
    return '<li class="tile" data-cat="' + esc(cats[0] || "") + '"><a href="#/p/' + esc(p.id) + '">' +
      '<div class="thumb">' + thumb + "</div>" +
      '<div class="meta"><span class="t">' + esc(p.title) + '</span><span class="y">' + esc(p.year || "—") + "</span></div>" +
      '<span class="sum">' + esc(p.summary) + "</span>" +
      '<span class="cats">' + esc(cats.join(" · ")) + "</span></a></li>";
  }

  function showIndex(cat) {
    $("detail-view").hidden = true;
    $("index-view").hidden = false;
    document.querySelectorAll("#filters button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.cat === cat)); });
    var list = PROJECTS.filter(function (p) { return inCat(p, cat); });
    $("grid").innerHTML = list.map(tile).join("");
    $("empty").hidden = list.length > 0;
    $("empty").textContent = "No " + cat.toLowerCase() + " projects listed yet.";
    document.title = (SITE.name || "") + " — " + (cat === "All" ? "Projects" : cat);
  }

  function fig(im, fallbackTitle) {
    var src = typeof im === "string" ? im : im.src;
    var alt = (im && im.alt) || fallbackTitle || "";
    var cap = im && im.caption ? "<figcaption>" + esc(im.caption) + "</figcaption>" : "";
    return '<figure><img src="' + esc(src) + '" alt="' + esc(alt) + '">' + cap + "</figure>";
  }
  function gallery(p) {
    // An explicit empty images array means "no gallery" (e.g. a playable embed replaces it).
    var imgs = Array.isArray(p.images) ? p.images : (p.image ? [{ src: p.image, alt: p.title }] : []);
    if (!imgs.length) return "";
    return '<div class="gallery">' + imgs.map(function (im) { return fig(im, p.title); }).join("") + "</div>";
  }
  function videoBlock(p) {
    var e = p.embed;
    if (!e) return "";
    if (e.type === "drive" && e.id) {
      var src = "https://drive.google.com/file/d/" + encodeURIComponent(e.id) + "/preview";
      var open = "https://drive.google.com/file/d/" + encodeURIComponent(e.id) + "/view";
      return '<div class="video">' +
        '<iframe src="' + esc(src) + '" allow="autoplay" allowfullscreen title="' + esc(p.title) + ' video"></iframe>' +
        '<p class="video-note"><a href="' + esc(open) + '" target="_blank" rel="noopener">Open on Google Drive ↗</a></p>' +
        "</div>";
    }
    if (e.type === "bilibili" && e.bvid) {
      var src = "https://player.bilibili.com/player.html?bvid=" + encodeURIComponent(e.bvid) + "&autoplay=0&high_quality=1";
      var open = "https://www.bilibili.com/video/" + encodeURIComponent(e.bvid) + "/";
      return '<div class="video">' +
        '<iframe src="' + esc(src) + '" allow="autoplay" allowfullscreen title="' + esc(p.title) + ' video"></iframe>' +
        '<p class="video-note"><a href="' + esc(open) + '" target="_blank" rel="noopener">Open on Bilibili ↗</a></p>' +
        "</div>";
    }
    if (e.type === "pico8" && e.pid) {
      var src = "https://www.lexaloffle.com/bbs/widget.php?pid=" + encodeURIComponent(e.pid);
      var open = e.url || (e.tid ? "https://www.lexaloffle.com/bbs/?tid=" + encodeURIComponent(e.tid) : src);
      return '<div class="video pico8">' +
        '<iframe src="' + esc(src) + '" allow="autoplay; gamepad; fullscreen" allowfullscreen title="' + esc(p.title) + ' — play in browser"></iframe>' +
        '<p class="video-note"><a href="' + esc(open) + '" target="_blank" rel="noopener">Open on PICO-8 BBS ↗</a></p>' +
        "</div>";
    }
    return "";
  }

  function showDetail(p) {
    var i = PROJECTS.indexOf(p);
    var prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
    var next = PROJECTS[(i + 1) % PROJECTS.length];
    var links = (p.links || []).length
      ? '<span class="links">' + p.links.map(function (l) { return '<a href="' + esc(l.url) + '"' + linkAttrs(l.url) + ">" + esc(l.label) + " ↗</a>"; }).join("") + "</span>"
      : "—";
    var row = function (k, v) { return v ? "<dt>" + k + "</dt><dd>" + v + "</dd>" : ""; };
    var html =
      '<a class="back" href="#/">← All projects</a>' +
      "<h1>" + esc(p.title) + "</h1>" +
      '<p class="lead">' + esc(p.summary) + "</p>" +
      '<dl class="facts">' +
        row("Year", esc(p.period || p.year || "—")) +
        row("Role", esc(p.role || "—")) +
        row("Category", esc((p.categories || []).join(", ") || "—")) +
        row("Links", links) +
        row("Tags", (p.tags || []).length ? '<ul class="tags">' + p.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
      "</dl>" +
      videoBlock(p) +
      (p.thinking || p.draft ? "<h2>Design thinking</h2>" : "") +
      (p.draft ? '<span class="draft">Draft — to be rewritten</span>' : "") +
      (p.thinking ? paras(p.thinking) : (p.draft ? "<p>Notes coming.</p>" : "")) +
      ((p.points || []).length ? "<h2>Key facts</h2><ul>" + p.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") +
      gallery(p) +
      '<nav class="pager"><a href="#/p/' + esc(prev.id) + '">← ' + esc(prev.title) + '</a><a href="#/p/' + esc(next.id) + '">' + esc(next.title) + " →</a></nav>";
    $("detail-view").innerHTML = html;
    $("index-view").hidden = true;
    $("detail-view").hidden = false;
    document.title = p.title + " — " + (SITE.name || "");
    window.scrollTo(0, 0);
  }

  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/");
    if (parts[0] === "p") {
      var p = PROJECTS.filter(function (x) { return x.id === parts[1]; })[0];
      if (p) return showDetail(p);
    }
    var cat = "All";
    if (parts[0] === "f" && parts[1]) {
      cat = CATEGORIES.filter(function (c) { return c.toLowerCase() === parts[1].toLowerCase(); })[0] || "All";
    }
    showIndex(cat);
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !$("detail-view").hidden) location.hash = "#/";
  });
  window.addEventListener("hashchange", route);
  route();
})();
