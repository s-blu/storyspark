/* StorySpark – data.js
 * Content data (prompt entries per category) and UI strings. Single file,
 * no external data dependency.
 *
 * Each category is stored as two parallel de/en arrays (de[i] always
 * matches en[i]) and zipped into { id, de, en } objects below. This
 * matters because the seed in draw.js pulls a language-independent
 * INDEX – de and en must be the same motif at every position, or DE and
 * EN users would see different prompts on the same day.
 *
 * Pool sizes match the collision-avoidance target from
 * storyspark-poolgroesse.md: 100 entries for each main category
 * (character, timeOrSense), 50 for each extra category (object, place,
 * mood).
 */

window.StorySpark = window.StorySpark || {};

(function () {
  function zip(de, en, label) {
    if (de.length !== en.length) {
      throw new Error(
        label + ": de/en Längen weichen ab (" + de.length + " vs " + en.length + ")"
      );
    }
    return de.map(function (deText, i) {
      return { id: i + 1, de: deText, en: en[i] };
    });
  }

  // ---------- character (100) ----------
  const character_de = [
    "Eine alte Frau", "Ein Kind", "Eine Wächterin", "Zwillinge", "Eine Fremde",
    "Ein Straßenmusikant", "Eine Postbotin", "Ein Uhrmacher", "Eine Reisende",
    "Ein Nachtwächter", "Eine Kapitänin", "Ein Erfinder", "Eine Köchin",
    "Ein Zirkusartist", "Eine Bibliothekarin", "Ein Gärtner", "Eine Lehrerin",
    "Ein Fischer", "Eine Schneiderin", "Ein Sammler", "Ein Zugbegleiter",
    "Ein Falkner", "Eine Glockengießerin", "Ein Steinmetz", "Ein Grenzgänger",
    "Ein Laternenanzünder", "Eine Seiltänzerin", "Ein Imker", "Eine Töpferin",
    "Ein Fährmann", "Eine Archivarin", "Ein Kartograf", "Eine Astronomin",
    "Ein Schäfer", "Eine Weberin", "Eine Astronautin", "Eine Krankenschwester",
    "Ein Arzt", "Eine Richterin", "Ein Schmuggler", "Eine Detektivin",
    "Ein Musiklehrer", "Eine Tänzerin", "Ein Bergsteiger", "Eine Forscherin",
    "Ein Eremit", "Eine Königin", "Ein Bettler", "Eine Diplomatin",
    "Ein Waisenjunge", "Eine Großmutter", "Ein Kutscher", "Eine Braut",
    "Ein Bräutigam", "Eine Witwe", "Ein Witwer", "Eine Priesterin",
    "Ein Mönch", "Eine Piratin", "Ein Söldner", "Eine Glücksspielerin",
    "Ein Zauberkünstler", "Eine Wahrsagerin", "Ein Schriftsteller",
    "Eine Journalistin",
    "Ein Rabe", "Ein Fuchs", "Eine Schildkröte", "Ein Wal", "Eine Eule",
    "Ein Hase", "Eine Katze", "Ein Wolf", "Eine Motte", "Ein Maulwurf",
    "Ein Eichhörnchen", "Ein Pinguin", "Ein Esel", "Eine Ziege", "Ein Delfin",
    "Ein Bär", "Ein Papagei", "Ein Frosch", "Ein Reh", "Ein Dachs",
    "Eine Fledermaus", "Ein Luchs", "Eine Qualle", "Ein Seepferdchen",
    "Ein Tintenfisch",
    "Ein Waldgeist", "Eine Nixe", "Ein Kobold", "Ein junger Drache",
    "Ein sprechender Baum", "Eine Wolkenfee", "Ein Steingolem",
    "Ein geflügeltes Pferd", "Ein Schneemensch", "Ein namenloses Zauberwesen",
  ];
  const character_en = [
    "An old woman", "A child", "A guard", "Twins", "A stranger",
    "A street musician", "A postal carrier", "A watchmaker", "A traveler",
    "A night watchman", "A ship's captain", "An inventor", "A cook",
    "A circus performer", "A librarian", "A gardener", "A teacher",
    "A fisherman", "A tailor", "A collector", "A train conductor",
    "A falconer", "A bell founder", "A stonemason", "A border crosser",
    "A lamplighter", "A tightrope walker", "A beekeeper", "A potter",
    "A ferryman", "An archivist", "A cartographer", "An astronomer",
    "A shepherd", "A weaver", "An astronaut", "A nurse",
    "A doctor", "A judge", "A smuggler", "A detective",
    "A music teacher", "A dancer", "A mountain climber", "A researcher",
    "A hermit", "A queen", "A beggar", "A diplomat",
    "An orphan boy", "A grandmother", "A coachman", "A bride",
    "A groom", "A widow", "A widower", "A priestess",
    "A monk", "A pirate", "A mercenary", "A gambler",
    "A magician", "A fortune teller", "A writer",
    "A journalist",
    "A raven", "A fox", "A tortoise", "A whale", "An owl",
    "A hare", "A cat", "A wolf", "A moth", "A mole",
    "A squirrel", "A penguin", "A donkey", "A goat", "A dolphin",
    "A bear", "A parrot", "A frog", "A deer", "A badger",
    "A bat", "A lynx", "A jellyfish", "A seahorse",
    "An octopus",
    "A forest spirit", "A mermaid", "A goblin", "A young dragon",
    "A talking tree", "A cloud fairy", "A stone golem",
    "A winged horse", "A yeti", "A nameless magical being",
  ];
  
  // ---------- timeOrSense (100) ----------
  const timeOrSense_de = [
    "Kurz vor Sonnenaufgang", "Mitten in der Nacht", "An einem Sonntagnachmittag",
    "Vor langer Zeit", "Der letzte Tag von etwas", "Mitten im Winter",
    "Kurz vor Ladenschluss", "Am späten Abend", "Beim ersten Schnee",
    "Eine vergessene Stunde", "Der erste Tag von etwas", "In hundert Jahren",
    "Am Morgen des Festtags", "Zur Erntezeit", "An einem Regentag",
    "In der Mittagspause", "Kurz nach Mitternacht", "Im Morgengrauen",
    "An einem Feiertag", "Zwischen zwei Zügen", "In der Dämmerung",
    "An einem gewöhnlichen Dienstag", "Am Tag der Abreise",
    "In der Stunde vor der Prüfung", "Am Vorabend eines Festes",
    "Im tiefsten Sommer", "An einem Tag ohne Kalender", "Kurz vor der Ernte",
    "Am ersten Schultag", "In der Pause zwischen zwei Gewittern",
    "An einem Tag, der sich wiederholt", "Beim Wechsel der Jahreszeiten",
    "In der letzten Stunde des Jahres",
    "An einem Tag, an dem nichts passieren sollte", "Kurz vor dem Umzug",
    "Am Tag der Rückkehr", "In der Woche vor der Hochzeit",
    "An einem Tag ohne Uhr", "Zwischen Traum und Erwachen",
    "Am Ende einer langen Reise", "Kurz vor der Sperrstunde",
    "An einem stillen Feiertagmorgen", "In der Zeit, in der niemand hinschaut",
    "Am Tag, bevor alles anders wird", "In der Stunde des Sonnenuntergangs",
    "An einem Tag mit doppeltem Regenbogen", "Kurz vor der Flut",
    "In der Nacht der Sommersonnenwende", "An einem Tag, der zu lang wird",
    "Beim letzten Läuten der Glocke",
    "Ein Geruch nach Regen", "Ein Geräusch aus der Ferne", "Etwas Warmes",
    "Ein plötzliches Licht", "Ein Geschmack nach Salz", "Fernes Lachen",
    "Ein leises Summen", "Ein Funkeln", "Eine ungewohnte Kälte",
    "Der Klang von Glocken", "Ein Geruch nach frisch gebackenem Brot",
    "Ein Geräusch, das immer lauter wird", "Ein Licht, das plötzlich angeht",
    "Ein Klang wie Musik unter Wasser", "Musik aus der Ferne",
    "Ein Kribbeln vor Aufregung", "Ein Geräusch, das man nicht zuordnen kann",
    "Ein Geruch nach Meer", "Etwas Weiches unter den Füßen",
    "Ein Funkeln im Augenwinkel", "Ein Geruch nach nassem Laub",
    "Ein Kratzen an der Tür", "Ein Schatten, der sich bewegt",
    "Ein Geschmack nach Zimt", "Ein Geruch nach altem Papier",
    "Ein Ticken, das nicht aufhört", "Ein Windstoß aus dem Nichts",
    "Ein Geräusch wie brechendes Eis", "Ein Geruch nach Rauch",
    "Eine Stimme, die den eigenen Namen ruft", "Ein Schauer über den Rücken",
    "Ein Geschmack nach Honig", "Ein Klopfen, das aus dem Nichts kommt",
    "Ein Duft nach Lavendel", "Ein Geräusch wie flüsterndes Gras",
    "Ein Kribbeln in den Fingerspitzen", "Ein Geruch nach frisch gemähtem Gras",
    "Ein Licht, das flackert und wieder verschwindet", "Ein Geschmack nach Minze",
    "Ein Geräusch wie ferner Donner", "Eine plötzliche Stille",
    "Ein Geruch nach Benzin und Staub", "Eine Wärme, die von nirgendwo kommt",
    "Ein Klang, der an Kindheit erinnert", "Ein Geräusch wie Schritte auf Kies",
    "Ein Geschmack nach Rost", "Ein Duft nach frisch gewaschener Wäsche",
    "Ein Glitzern auf nasser Straße", "Ein Geräusch wie ein tiefer Atemzug",
    "Ein Frösteln ohne erkennbaren Grund",
  ];
  const timeOrSense_en = [
    "Just before sunrise", "In the middle of the night", "On a Sunday afternoon",
    "A long time ago", "The last day of something", "In the middle of winter",
    "Just before closing time", "Late in the evening", "At the first snowfall",
    "A forgotten hour", "The first day of something", "A hundred years from now",
    "On the morning of the festival", "At harvest time", "On a rainy day",
    "During the lunch break", "Just after midnight", "At dawn",
    "On a public holiday", "Between two trains", "At dusk",
    "On an ordinary Tuesday", "On the day of departure",
    "In the hour before the exam", "On the eve of a celebration",
    "In the height of summer", "On a day with no calendar", "Just before the harvest",
    "On the first day of school", "In the lull between two storms",
    "On a day that repeats itself", "As the seasons change",
    "In the last hour of the year",
    "On a day when nothing was supposed to happen", "Just before the move",
    "On the day of the return", "In the week before the wedding",
    "On a day without a clock", "Between dream and waking",
    "At the end of a long journey", "Just before curfew",
    "On a quiet holiday morning", "In the moment no one is watching",
    "On the day before everything changes", "At the hour of sunset",
    "On a day with a double rainbow", "Just before the flood tide",
    "On the night of the summer solstice", "On a day that runs too long",
    "At the last ringing of the bell",
    "A smell of rain", "A sound from far away", "Something warm",
    "A sudden light", "A taste of salt", "Distant laughter",
    "A quiet humming", "A glimmer", "An unfamiliar cold",
    "The sound of bells", "A smell of freshly baked bread",
    "A sound that keeps growing louder", "A light that suddenly switches on",
    "A sound like music underwater", "Music in the distance",
    "A tingle of excitement", "A sound you can't place",
    "A smell of the sea", "Something soft underfoot",
    "A glint at the corner of your eye", "A smell of wet leaves",
    "A scratching at the door", "A shadow that moves",
    "A taste of cinnamon", "A smell of old paper",
    "A ticking that won't stop", "A gust of wind out of nowhere",
    "A sound like cracking ice", "A smell of smoke",
    "A voice calling your name", "A shiver down your spine",
    "A taste of honey", "A knocking that comes from nowhere",
    "A scent of lavender", "A sound like whispering grass",
    "A tingling in your fingertips", "A smell of freshly cut grass",
    "A light that flickers and vanishes again", "A taste of mint",
    "A sound like distant thunder", "A sudden silence",
    "A smell of gasoline and dust", "A warmth that comes from nowhere",
    "A sound that recalls childhood", "A sound like footsteps on gravel",
    "A taste of rust", "A scent of freshly washed laundry",
    "A glitter on a wet street", "A sound like a deep breath",
    "A chill with no obvious cause",
  ];
  
  // ---------- object (50) ----------
  const object_de = [
    "Ein Schlüssel", "Ein offener Brief", "Eine stehengebliebene Uhr",
    "Ein Koffer", "Ein Spiegel", "Eine Kerze", "Ein Foto", "Ein Ring",
    "Eine Landkarte", "Ein Buch", "Ein zerbrochenes Glas",
    "Eine leere Flasche mit Zettel darin", "Ein altes Radio",
    "Ein Kompass, der nicht funktioniert", "Eine Muschel", "Ein Regenschirm",
    "Ein Kartenspiel mit fehlender Karte", "Eine Puppe", "Ein Fernglas",
    "Ein Fahrrad ohne Kette", "Eine Schachtel mit Knöpfen",
    "Ein Zugticket in eine unbekannte Stadt", "Ein Amulett",
    "Eine Taschenlampe mit schwachem Licht", "Ein handgeschriebenes Rezept",
    "Ein Paar alte Schuhe", "Ein Vogelkäfig, leer",
    "Eine Schallplatte ohne Hülle", "Ein Tagebuch mit fehlenden Seiten",
    "Ein Werkzeugkasten", "Ein Feuerzeug", "Eine Truhe mit Vorhängeschloss",
    "Ein Teleskop", "Ein gefaltetes Stück Papier mit einer Telefonnummer",
    "Ein altes Telefon", "Ein Globus", "Ein Blumenstrauß, schon welk",
    "Eine Nähmaschine", "Ein Segelboot in einer Flasche",
    "Eine Taschenuhr an einer zerrissenen Kette",
    "Ein Stapel unbeantworteter Briefe", "Ein Set Aquarellfarben",
    "Ein Schachbrett mit nur wenigen Figuren", "Eine Thermoskanne",
    "Ein Notizbuch voller Zahlen", "Ein Anhänger in Form eines Mondes",
    "Eine alte Schreibmaschine", "Ein Bund vertrockneter Kräuter",
    "Ein Röntgenbild", "Ein Schlüsselbund mit einem Schlüssel zu viel",
  ];
  const object_en = [
    "A key", "An open letter", "A clock that has stopped",
    "A suitcase", "A mirror", "A candle", "A photograph", "A ring",
    "A map", "A book", "A broken glass",
    "An empty bottle with a note inside", "An old radio",
    "A compass that doesn't work", "A seashell", "An umbrella",
    "A deck of cards missing one", "A doll", "A pair of binoculars",
    "A bicycle without a chain", "A box of buttons",
    "A train ticket to an unknown town", "An amulet",
    "A flashlight with a fading beam", "A handwritten recipe",
    "A pair of old shoes", "An empty birdcage",
    "A record with no sleeve", "A diary with missing pages",
    "A toolbox", "A lighter", "A chest with a padlock",
    "A telescope", "A folded piece of paper with a phone number",
    "An old telephone", "A globe", "A bouquet of flowers, already wilted",
    "A sewing machine", "A sailboat in a bottle",
    "A pocket watch on a broken chain",
    "A stack of unanswered letters", "A set of watercolor paints",
    "A chessboard with only a few pieces left", "A thermos flask",
    "A notebook full of numbers", "A pendant shaped like a moon",
    "An old typewriter", "A bundle of dried herbs",
    "An X-ray image", "A keyring with one key too many",
  ];
  
  // ---------- place (50) ----------
  const place_de = [
    "Ein großes Haus", "Ein Bahnsteig", "Ein Garten hinter einer Mauer",
    "Ein Dachboden", "Eine Brücke", "Ein Wald", "Ein Hafen",
    "Ein leerer Marktplatz", "Eine Bibliothek", "Ein Keller",
    "Ein verlassener Leuchtturm", "Eine Dorfbäckerei vor Ladenöffnung",
    "Ein U-Bahnhof kurz vor Betriebsschluss", "Eine Lichtung mitten im Wald",
    "Ein Freibad im Herbst", "Eine Werkstatt voller angefangener Projekte",
    "Ein Krankenhausflur", "Ein Flughafenterminal nachts", "Ein Weinberg",
    "Eine Kapelle am Straßenrand", "Ein Vergnügungspark außerhalb der Saison",
    "Ein Fischmarkt in aller Frühe", "Eine Berghütte",
    "Ein Aufzug, der stecken bleibt", "Ein Museum nach Schließzeit",
    "Ein Zugabteil bei Nacht", "Ein Gewächshaus", "Ein Strand bei Ebbe",
    "Ein Hinterhof mit Wäscheleinen", "Eine Tankstelle an einer einsamen Straße",
    "Ein Klassenzimmer in den Ferien", "Ein Fährdeck", "Ein Weinkeller",
    "Ein Dorf, das bald umgesiedelt wird", "Eine Höhle mit Echo",
    "Ein Rummelplatz beim Aufbau", "Ein Gasthof an der Kreuzung",
    "Ein Trödelladen", "Eine Turnhalle nach Schulschluss", "Ein Hausboot",
    "Ein alter Bahnhof, nicht mehr in Betrieb",
    "Ein Gemüsegarten hinter einem Krankenhaus", "Eine Seilbahnstation",
    "Ein Antiquariat", "Eine Dachterrasse über der Stadt",
    "Ein Weizenfeld kurz vor dem Sturm", "Eine Notaufnahme, gerade ruhig",
    "Ein Zeltlager im Regen", "Ein Kloster mit Blick aufs Tal",
    "Eine Bushaltestelle mitten im Nirgendwo",
  ];
  const place_en = [
    "A large house", "A train platform", "A garden behind a wall",
    "An attic", "A bridge", "A forest", "A harbor",
    "An empty market square", "A library", "A cellar",
    "An abandoned lighthouse", "A village bakery before opening time",
    "A subway station just before closing", "A clearing deep in the forest",
    "An outdoor pool in autumn", "A workshop full of unfinished projects",
    "A hospital corridor", "An airport terminal at night", "A vineyard",
    "A chapel by the roadside", "An amusement park out of season",
    "A fish market at first light", "A mountain cabin",
    "An elevator that gets stuck", "A museum after closing time",
    "A train compartment at night", "A greenhouse", "A beach at low tide",
    "A backyard with washing lines", "A gas station on a lonely road",
    "A classroom during the holidays", "A ferry deck", "A wine cellar",
    "A village soon to be resettled", "A cave with an echo",
    "A fairground being set up", "An inn at the crossroads",
    "A secondhand shop", "A gymnasium after school", "A houseboat",
    "An old station, no longer in use",
    "A vegetable garden behind a hospital", "A cable car station",
    "An antiquarian bookshop", "A rooftop terrace above the city",
    "A wheat field just before the storm", "An emergency room, quiet for once",
    "A campsite in the rain", "A monastery overlooking the valley",
    "A bus stop in the middle of nowhere",
  ];
  
  // ---------- mood (50) ----------
  const mood_de = [
    "Vertraut", "Verlassen", "Nahe", "Flüchtig", "Unerwartet", "Still",
    "Gewiss", "Unvollständig", "Verborgen", "Wiederkehrend", "Übermütig",
    "Wehmütig", "Aufgeregt", "Bedrohlich", "Zärtlich", "Chaotisch",
    "Feierlich", "Nervös", "Hoffnungsvoll", "Beklemmend", "Verspielt",
    "Erschöpft", "Euphorisch", "Zweifelnd", "Geheimnisvoll", "Gelassen",
    "Aufgewühlt", "Sehnsüchtig", "Trotzig", "Erleichtert", "Angespannt",
    "Versöhnlich", "Neugierig", "Melancholisch", "Albern", "Ehrfürchtig",
    "Ungeduldig", "Friedlich", "Rastlos", "Dankbar", "Verwirrt", "Mutig",
    "Schüchtern", "Triumphierend", "Grüblerisch", "Heiter", "Beschämt",
    "Entschlossen", "Verletzlich", "Wach",
  ];
  const mood_en = [
    "Familiar", "Abandoned", "Close", "Fleeting", "Unexpected", "Quiet",
    "Certain", "Incomplete", "Hidden", "Recurring", "Exuberant",
    "Wistful", "Excited", "Menacing", "Tender", "Chaotic",
    "Solemn", "Nervous", "Hopeful", "Oppressive", "Playful",
    "Exhausted", "Euphoric", "Doubtful", "Mysterious", "Calm",
    "Agitated", "Yearning", "Defiant", "Relieved", "Tense",
    "Conciliatory", "Curious", "Melancholic", "Silly", "Awestruck",
    "Impatient", "Peaceful", "Restless", "Grateful", "Confused", "Brave",
    "Shy", "Triumphant", "Brooding", "Cheerful", "Ashamed",
    "Determined", "Vulnerable", "Wide awake",
  ];
  
  const character = zip(character_de, character_en, "character");
  const timeOrSense = zip(timeOrSense_de, timeOrSense_en, "timeOrSense");
  const object = zip(object_de, object_en, "object");
  const place = zip(place_de, place_en, "place");
  const mood = zip(mood_de, mood_en, "mood");

  StorySpark.data = {
    character: character,
    timeOrSense: timeOrSense,
    object: object,
    place: place,
    mood: mood,
  };
  // UI strings. "en" is intentionally left empty ("") rather than filled –
  // app.js falls back to "de" whenever an "en" string is empty.
  StorySpark.strings = {
    de: {
      appName: "Story Spark",
      tagline: "Ein Impuls fürs kreative Schreiben. Für jeden Tag einen, für jeden Besucher gleich. Geh und schreib etwas - eine Kurzgeschichte, eine Szene, einen Vers, was du willst.",
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
  tagline: "A daily spark for creative writing. One per day, the same for everyone. Go write something — a short story, a scene, a verse, whatever you like.",
  todayLabel: "Today",
  nextInPrefix: "Next spark in about",
  nextInHoursSuffix: "hrs.",
  nextInSoon: "New spark coming up",
  doneButton: "Done",
  doneButtonActive: "Done ✓",
  dayNavBackLabel: "Show previous day",
  dayNavForwardLabel: "Back to today",
  langSwitch: "EN / DE",
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
