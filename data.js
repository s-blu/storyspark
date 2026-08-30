/* StorySpark – data.js
 * Content data (prompt entries per category) and UI strings.
 * i18n is structurally in place ("de"/"en" fields), but only "de" is
 * filled in for this first draft. "en" is left as `null` on purpose –
 * see concept.md, section "Offene Punkte".
 */

window.StorySpark = window.StorySpark || {};

(function () {
  // Small helper so every entry has a consistent shape without repeating
  // `{ en: null }` on every line below.
  function entries(deList) {
    return deList.map(function (de, i) {
      return { id: i + 1, de: de, en: null };
    });
  }

  StorySpark.data = {
    // "character": human + animal sub-pools mixed into one drawable list
    character: entries([
      "Eine alte Frau",
      "Ein Kind",
      "Ein Wächter",
      "Zwillinge",
      "Ein Fremder",
      "Ein Straßenmusikant",
      "Ein Postbote",
      "Ein Uhrmacher",
      "Eine Reisende",
      "Ein Nachtwächter",
      "Ein Rabe",
      "Ein Fuchs",
      "Eine Schildkröte",
      "Ein Wal",
      "Eine Eule",
      "Ein Hase",
      "Eine Katze",
      "Ein Fisch",
      "Ein Wolf",
      "Eine Motte",
    ]),

    // "timeOrSense": time + sense-impression sub-pools mixed
    timeOrSense: entries([
      "Kurz vor Sonnenaufgang",
      "Mitten in der Nacht",
      "An einem Sonntagnachmittag",
      "Vor langer Zeit",
      "Der letzte Tag von etwas",
      "Mitten im Winter",
      "Kurz vor Ladenschluss",
      "Am späten Abend",
      "Beim ersten Schnee",
      "Eine vergessene Stunde",
      "Ein Geruch nach Regen",
      "Ein Geräusch aus der Ferne",
      "Etwas Warmes",
      "Ein plötzliches Licht",
      "Ein Geschmack nach Salz",
      "Fernes Lachen",
      "Ein leises Summen",
      "Ein Funkeln",
      "Eine ungewohnte Kälte",
      "Der Klang von Glocken",
    ]),

    object: entries([
      "Ein Schlüssel",
      "Ein offener Brief",
      "Eine stehengebliebene Uhr",
      "Ein Koffer",
      "Ein Spiegel",
      "Eine Kerze",
      "Ein Foto",
      "Ein Ring",
      "Eine Landkarte",
      "Ein Buch",
    ]),

    place: entries([
      "Ein großes Haus",
      "Ein Bahnsteig",
      "Ein Garten hinter einer Mauer",
      "Ein Dachboden",
      "Eine Brücke",
      "Ein Wald",
      "Ein Hafen",
      "Ein leerer Marktplatz",
      "Eine Bibliothek",
      "Ein Keller",
    ]),

    mood: entries([
      "Vertraut",
      "Verlassen",
      "Nahe",
      "Flüchtig",
      "Unerwartet",
      "Still",
      "Gewiss",
      "Unvollständig",
      "Verborgen",
      "Wiederkehrend",
    ]),
  };

  // UI strings. "en" is intentionally left empty ("") rather than filled –
  // app.js falls back to "de" whenever an "en" string is empty.
  StorySpark.strings = {
    de: {
      appName: "Story Spark",
      tagline: "Ein täglicher Impuls fürs kreative Schreiben. Kein Editor, kein Konto – nur der Funke.",
      todayLabel: "Heute",
      nextInPrefix: "Nächster Funke in ca.",
      nextInHoursSuffix: "Std.",
      nextInSoon: "Neuer Funke gleich",
      doneButton: "Geschafft",
      doneButtonActive: "Geschafft ✓",
      dayNavBackLabel: "Vorherigen Tag anzeigen",
      dayNavForwardLabel: "Zu heute zurück",
      langSwitch: "DE / EN",
    },
    en: {
      appName: "Story Spark",
      tagline: "",
      todayLabel: "",
      nextInPrefix: "",
      nextInHoursSuffix: "",
      nextInSoon: "",
      doneButton: "",
      doneButtonActive: "",
      dayNavBackLabel: "",
      dayNavForwardLabel: "",
      langSwitch: "DE / EN",
    },
  };

  // Tunable knobs for the draw logic (see draw.js). Kept here so they're
  // easy to find and adjust without touching the algorithm itself.
  StorySpark.config = {
    dailyLimit: 5,
    mainCategories: ["character", "timeOrSense"],
    extraCategories: ["object", "place", "mood"],
    mainAppearProbability: 0.7,
    extraAppearProbability: 0.4,
    duplicateProbability: 0.12,
  };
})();
