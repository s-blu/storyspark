/* StorySpark – app.js
 * Rendering, local state (localStorage), countdown, i18n switching,
 * day-by-day navigation through the last 10 days. No framework, no
 * build step, no backend.
 */

(function () {
  // Set to true to preview the layout with worst-case content: very long
  // strings and the maximum possible number of lines (5). Useful for
  // checking wrapping/overflow without waiting for a day that naturally
  // produces this. No UI switch on purpose – just flip this and reload.
  const debugMode = false;

  const DEBUG_DRAWS = [
    {
      categoryId: "character",
      entry: {
        de: "Eine ungewöhnlich weitschweifige und umständlich benannte Gestalt mit sehr langem Titel",
        en: "An unusually long-winded character name kept only to test the layout",
      },
      isDuplicate: false,
    },
    {
      categoryId: "timeOrSense",
      entry: {
        de: "Irgendwann zwischen dem allerletzten Licht des Tages und dem ersten Zeichen der hereinbrechenden Nacht",
        en: "Somewhere between the last light of day and the first sign of falling night",
      },
      isDuplicate: false,
    },
    {
      categoryId: "object",
      entry: {
        de: "Ein außergewöhnlich kompliziert gearbeiteter Gegenstand unbekannter Herkunft und Funktion",
        en: "An unusually intricate object of unknown origin and purpose",
      },
      isDuplicate: true,
    },
    {
      categoryId: "place",
      entry: {
        de: "Ein weitläufiger, kaum überschaubarer Ort irgendwo zwischen Stadt und Wildnis",
        en: "A vast, barely surveyable place somewhere between city and wilderness",
      },
      isDuplicate: false,
    },
    {
      categoryId: "mood",
      entry: {
        de: "Unwiederbringlich-vergänglich-schwer-in-Worte-zu-fassen",
        en: "Irretrievably-fleeting-hard-to-put-into-words",
      },
      isDuplicate: false,
    },
  ];

  const STORAGE_KEYS = {
    completedDays: "storySpark:completedDays",
    locale: "storySpark:locale",
  };

  const MAX_OFFSET = 10; // how many days back the nav arrow can go

  // How many past days (offsets 1..DEBUG_GALLERY_LOOKBACK) to draw dummy
  // "done" days from when debugMode is on, and how many of those to mark
  // as completed. Deliberately > MAX_OFFSET so the gallery preview also
  // exercises days outside the normal 10-day archive, and > 30 so the
  // scrollable gallery list itself gets a real workout.
  const DEBUG_GALLERY_LOOKBACK = 60;
  const DEBUG_GALLERY_COUNT = 34;

  // Builds a fake completedDays map for debugMode previews. Dates are real
  // past UTC dates and prompts are computed through the normal seeded draw
  // (StorySpark.draw.getDailyDraws), so the gallery preview shows genuine,
  // varied prompt content – never the fixed DEBUG_DRAWS placeholder lines,
  // which only stand in for *today's* prompt panel.
  function buildDebugCompletedDays() {
    const rng = StorySpark.draw.rngFor("debug-gallery-preview");
    const offsets = [];
    for (let i = 1; i <= DEBUG_GALLERY_LOOKBACK; i++) offsets.push(i);
    for (let i = offsets.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = offsets[i];
      offsets[i] = offsets[j];
      offsets[j] = tmp;
    }
    const days = {};
    offsets.slice(0, DEBUG_GALLERY_COUNT).forEach(function (offset) {
      days[StorySpark.draw.formatUtcDate(dateForOffset(offset))] = true;
    });
    return days;
  }

  let locale = loadLocale();
  let viewedOffset = 0; // 0 = today, 1..MAX_OFFSET = days back
  let galleryMode = false; // true = showing the "memories" overview past the archive end

  // Set immediately (before DOMContentLoaded) so the <html lang> attribute
  // is correct from the first paint, not just after render() runs.
  document.documentElement.lang = locale;

  // ---------- storage helpers ----------

  function loadCompletedDays() {
    if (debugMode) return buildDebugCompletedDays();
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.completedDays);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveCompletedDays(completedDays) {
    if (debugMode) return; // don't let preview toggling touch real user data
    try {
      localStorage.setItem(STORAGE_KEYS.completedDays, JSON.stringify(completedDays));
    } catch (e) {
      /* localStorage unavailable (private mode, quota, ...) – fail silently */
    }
  }

  function loadLocale() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.locale);
      if (stored === "de" || stored === "en") return stored;
    } catch (e) {
      /* ignore */
    }
    return (navigator.language || "de").toLowerCase().indexOf("de") === 0 ? "de" : "en";
  }

  function saveLocale(value) {
    try {
      localStorage.setItem(STORAGE_KEYS.locale, value);
    } catch (e) {
      /* ignore */
    }
  }

  // ---------- i18n ----------

  function t(key) {
    const strings = StorySpark.strings;
    const value = strings[locale] && strings[locale][key];
    if (value) return value;
    return strings.de[key] || key; // fall back to German, then the key itself
  }

  function intlLocale() {
    return locale === "de" ? "de-DE" : "en-US";
  }

  // ---------- date helpers ----------

  function todayUtcDate() {
    return new Date();
  }

  function todayUtcString() {
    return StorySpark.draw.formatUtcDate(todayUtcDate());
  }

  function dateForOffset(offset) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - offset);
    return d;
  }

  function hoursUntilNextUtcMidnight() {
    const now = new Date();
    const nextMidnight = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0, 0, 0
    );
    const diffMs = nextMidnight - now.getTime();
    return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60)));
  }

  function formatDateLabel(date) {
    return new Intl.DateTimeFormat(intlLocale(), {
      timeZone: "UTC",
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(date);
  }

  // ---------- rendering ----------

  function renderStatic() {
    document.documentElement.lang = locale;
    document.getElementById("app-name").textContent = t("appName");
    document.getElementById("tagline").textContent = t("tagline");
    document.getElementById("lang-switch").textContent = t("langSwitch");
    document.title = t("appName");
  }

  function renderPrompts(draws) {
    const list = document.getElementById("prompt-list");
    list.innerHTML = "";
    draws.forEach(function (draw) {
      const li = document.createElement("li");
      li.className = "prompt-line";
      const text = draw.entry[locale] || draw.entry.de;
      li.textContent = text;
      list.appendChild(li);
    });
  }

  function renderDateAndCountdown(date, isToday) {
    const dateLabelEl = document.getElementById("date-label");
    const countdownEl = document.getElementById("countdown");

    if (isToday) {
      dateLabelEl.textContent = t("todayLabel") + " · " + formatDateLabel(date);
    } else {
      dateLabelEl.textContent = formatDateLabel(date);
    }
      const hours = hoursUntilNextUtcMidnight();
      countdownEl.textContent = hours <= 1
        ? t("nextInSoon")
        : t("nextInPrefix") + " " + hours + " " + t("nextInHoursSuffix");
      countdownEl.hidden = false;
  }

  function renderFab(dateStr, isToday, completedDays) {
    const button = document.getElementById("done-button");
    const isDone = !!completedDays[dateStr];
    button.classList.toggle("is-done", isDone);
    button.disabled = !isToday;
    button.setAttribute("aria-pressed", isDone ? "true" : "false");
    button.setAttribute("title", isDone ? t("doneButtonActive") : t("doneButton"));
    button.setAttribute("aria-label", isDone ? t("doneButtonActive") : t("doneButton"));
  }

  function renderNavButtons() {
    const backBtn = document.getElementById("nav-back");
    const forwardBtn = document.getElementById("nav-forward");

    forwardBtn.hidden = viewedOffset === 0 && !galleryMode;
    backBtn.hidden = galleryMode; // the gallery is the last page – no further back

    const atArchiveEnd = !galleryMode && viewedOffset >= MAX_OFFSET;
    backBtn.setAttribute(
      "aria-label",
      atArchiveEnd ? t("dayNavToGalleryLabel") : t("dayNavBackLabel")
    );
    forwardBtn.setAttribute(
      "aria-label",
      galleryMode ? t("dayNavFromGalleryLabel") : t("dayNavForwardLabel")
    );
  }

  // ---------- gallery ("memories") ----------

  function renderGallery(completedDays) {
    const listEl = document.getElementById("gallery-list");
    const emptyEl = document.getElementById("gallery-empty");
    document.getElementById("gallery-title").textContent = t("galleryTitle");

    const dateStrs = Object.keys(completedDays)
      .filter(function (d) { return completedDays[d]; })
      .sort()
      .reverse(); // newest first

    listEl.innerHTML = "";

    if (dateStrs.length === 0) {
      emptyEl.textContent = t("galleryEmpty");
      emptyEl.hidden = false;
      listEl.hidden = true;
      return;
    }

    emptyEl.hidden = true;
    listEl.hidden = false;

    dateStrs.forEach(function (dateStr) {
      const date = new Date(dateStr + "T00:00:00Z");
      const draws = StorySpark.draw.getDailyDraws(date, StorySpark.data, StorySpark.config);
      const promptText = draws
        .map(function (d) { return d.entry[locale] || d.entry.de; })
        .join(" · ");

      const li = document.createElement("li");
      li.className = "gallery-item";

      const dateEl = document.createElement("p");
      dateEl.className = "gallery-item-date";
      dateEl.textContent = formatDateLabel(date);

      const promptEl = document.createElement("p");
      promptEl.className = "gallery-item-prompt";
      promptEl.textContent = promptText;

      li.appendChild(dateEl);
      li.appendChild(promptEl);
      listEl.appendChild(li);
    });
  }

  // ---------- spark particle effect ----------

function spawnSparkParticles(button) {
  const rect = button.getBoundingClientRect();
  const container = document.getElementById("particle-layer");
  const particleCount = 22;
  // Grünabstufungen inkl. ein paar heller "Glint"-Funken – bleibt der eine
  // Farbmoment der Seite, wirkt aber lebendiger als Einheitsgrün.
  const colors = ["#2f7d4f", "#3f9463", "#1f5c3a", "#8fd1ab", "#eaf7ef"];

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("span");
    p.className = "spark-particle";

    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
    const distance = 46 + Math.random() * 62; // größerer Radius als vorher
    const size = 3 + Math.random() * 5;
    const duration = 950 + Math.random() * 550; // ~0.95–1.5s
    const delay = Math.random() * 90;
    const color = colors[Math.floor(Math.random() * colors.length)];

    p.style.setProperty("--dx", Math.cos(angle) * distance + "px");
    p.style.setProperty("--dy", Math.sin(angle) * distance + "px");
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.background = color;
    p.style.boxShadow = "0 0 " + (size + 3) + "px " + color;
    p.style.animationDuration = duration + "ms";
    p.style.animationDelay = delay + "ms";
    p.style.left = rect.left + rect.width / 2 + "px";
    p.style.top = rect.top + rect.height / 2 + "px";

    container.appendChild(p);
    p.addEventListener("animationend", function () {
      p.remove();
    });
  }
}

  // ---------- main ----------

  function render() {
    const completedDays = loadCompletedDays();

    renderStatic();
    document.getElementById("prompt-panel").hidden = galleryMode;
    document.getElementById("gallery-panel").hidden = !galleryMode;
    document.getElementById("countdown").hidden = galleryMode;

    if (galleryMode) {
      renderGallery(completedDays);
      renderFab("", false, completedDays); // no day is "current" in the gallery -> disabled
      renderNavButtons();
      return;
    }

    const date = dateForOffset(viewedOffset);
    const dateStr = StorySpark.draw.formatUtcDate(date);
    const isToday = viewedOffset === 0;
    const draws = debugMode
      ? DEBUG_DRAWS
      : StorySpark.draw.getDailyDraws(date, StorySpark.data, StorySpark.config);

    renderPrompts(draws);
    renderDateAndCountdown(date, isToday);
    renderFab(dateStr, isToday, completedDays);
    renderNavButtons();
  }

  function init() {
    document.getElementById("done-button").addEventListener("click", function (e) {
      if (viewedOffset !== 0) return; // only today can be toggled
      const completedDays = loadCompletedDays();
      const today = todayUtcString();
      const wasDone = !!completedDays[today];

      if (wasDone) {
        delete completedDays[today];
      } else {
        completedDays[today] = true;
        spawnSparkParticles(e.currentTarget);
      }
      saveCompletedDays(completedDays);
      renderFab(today, true, completedDays);
    });

    document.getElementById("lang-switch").addEventListener("click", function () {
      locale = locale === "de" ? "en" : "de";
      saveLocale(locale);
      render();
    });

    document.getElementById("nav-back").addEventListener("click", function () {
      if (galleryMode) return; // no further back than the gallery
      if (viewedOffset >= MAX_OFFSET) {
        galleryMode = true; // step from the oldest archive day into the gallery
      } else {
        viewedOffset += 1;
      }
      render();
    });

    document.getElementById("nav-forward").addEventListener("click", function () {
      if (galleryMode) {
        galleryMode = false;
        viewedOffset = MAX_OFFSET; // step back out to the oldest archive day
      } else {
        viewedOffset = Math.max(0, viewedOffset - 1);
      }
      render();
    });

    // Re-check the countdown (and whether the day rolled over) when the tab
    // regains focus while looking at today – deliberately not a ticking
    // interval, see concept.md.
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible" && viewedOffset === 0 && !galleryMode) render();
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
