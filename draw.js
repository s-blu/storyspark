/* StorySpark – draw.js
 * Deterministic, seedable "random" draw of today's prompts.
 * Same date -> same result, everywhere, forever. No server, no storage.
 *
 * Algorithm: xmur3 (string -> 32-bit hash) feeds mulberry32 (seedable
 * PRNG). Both are small, well-known, dependency-free implementations –
 * this is not a cryptographic use case, just "good enough" determinism.
 */

window.StorySpark = window.StorySpark || {};

(function () {
  function xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return h >>> 0;
    };
  }

  function mulberry32(seed) {
    let a = seed;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Returns a random()-like function seeded deterministically from a string.
  function rngFor(seedString) {
    return mulberry32(xmur3(seedString)());
  }

  function formatUtcDate(date) {
    return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
  }

  /**
   * Computes today's draws for a given date.
   * @param {Date} date - any Date; only the UTC calendar day is used.
   * @param {object} data - StorySpark.data (category -> entries[])
   * @param {object} config - StorySpark.config
   * @returns {Array<{categoryId: string, entry: object, isDuplicate: boolean}>}
   */
  function getDailyDraws(date, data, config) {
    const dateStr = formatUtcDate(date);
    const orderedCategoryIds = config.mainCategories.concat(config.extraCategories);

    // 1. First draw: does each category appear at all today?
    const appeared = [];
    config.mainCategories.forEach(function (categoryId) {
      const rng = rngFor(dateStr + "|" + categoryId + "|appear");
      if (rng() < config.mainAppearProbability) appeared.push(categoryId);
    });

    // Guarantee at least one main category per day.
    const appearedMainCount = appeared.filter(function (id) {
      return config.mainCategories.indexOf(id) !== -1;
    }).length;
    if (appearedMainCount === 0) {
      const rngForce = rngFor(dateStr + "|forceMain");
      const chosen = config.mainCategories[Math.floor(rngForce() * config.mainCategories.length)];
      appeared.push(chosen);
    }

    config.extraCategories.forEach(function (categoryId) {
      const rng = rngFor(dateStr + "|" + categoryId + "|appear");
      if (rng() < config.extraAppearProbability) appeared.push(categoryId);
    });

    // Keep a fixed, documented order: character, timeOrSense, object, place, mood.
    const appearedOrdered = orderedCategoryIds.filter(function (id) {
      return appeared.indexOf(id) !== -1;
    });

    // 2. Draw one entry per appeared category.
    const draws = appearedOrdered.map(function (categoryId) {
      const pool = data[categoryId];
      const rng = rngFor(dateStr + "|" + categoryId + "|card");
      const index = Math.floor(rng() * pool.length);
      return { categoryId: categoryId, entry: pool[index], isDuplicate: false };
    });

    // 3. Duplicate pass, in the same fixed order, capped at dailyLimit.
    appearedOrdered.forEach(function (categoryId) {
      if (draws.length >= config.dailyLimit) return;
      const rngDup = rngFor(dateStr + "|" + categoryId + "|dup");
      if (rngDup() >= config.duplicateProbability) return;

      const pool = data[categoryId];
      if (pool.length < 2) return; // no other entry to draw

      const firstIndex = pool.indexOf(
        draws.find(function (d) {
          return d.categoryId === categoryId && !d.isDuplicate;
        }).entry
      );

      const rngDupCard = rngFor(dateStr + "|" + categoryId + "|dupCard");
      let index = Math.floor(rngDupCard() * (pool.length - 1));
      if (index >= firstIndex) index += 1; // skip the already-drawn entry

      draws.push({ categoryId: categoryId, entry: pool[index], isDuplicate: true });
    });

    return draws;
  }

  StorySpark.draw = {
    xmur3: xmur3,
    mulberry32: mulberry32,
    rngFor: rngFor,
    formatUtcDate: formatUtcDate,
    getDailyDraws: getDailyDraws,
  };
})();
