// Cheat code data for all three games.
// pc / console fields hold the exact code/phrase for that platform.
// Where a game's cheat system doesn't actually differ between PC and
// console (GTA IV's phone numbers, RDR2's text phrases), pc and console
// intentionally hold the same value rather than a fabricated difference.

export const cheatData = {
  gta5: {
    pcNote: 'Type these on your keyboard during gameplay, or dial them as 1-999 numbers on your in-game phone.',
    consoleNote: 'Enter these as quick D-pad + face-button combos during gameplay (do not pause). PS and Xbox layouts are both shown.',
    cheats: [],
  },
  gta4: {
    pcNote: "Dial these numbers on Niko's in-game phone. Same numbers work on every platform.",
    consoleNote: "Dial these numbers on Niko's in-game phone using the d-pad. Identical to the PC codes.",
    cheats: [],
  },
  rdr2: {
    pcNote: 'Pause > Settings > press Enter to open the Cheats box, then type the phrase exactly (punctuation matters, capitalization does not).',
    consoleNote: 'Pause > Settings > press Triangle (PS) / Y (Xbox) to open the Cheats box, then enter the same phrase.',
    cheats: [],
  },
};
