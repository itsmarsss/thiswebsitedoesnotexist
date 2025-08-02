const adjectives = [
    "mysterious",
    "glowing",
    "ancient",
    "digital",
    "cosmic",
    "quantum",
    "vibrant",
    "ethereal",
    "neon",
    "cyberpunk",
    "steampunk",
    "magical",
    "floating",
    "hidden",
    "secret",
    "infinite",
    "temporal",
    "crystal",
    "dream",
    "parallel",
];

const nouns = [
    "portal",
    "garden",
    "library",
    "dimension",
    "workshop",
    "sanctuary",
    "nexus",
    "archive",
    "gallery",
    "laboratory",
    "observatory",
    "cafe",
    "museum",
    "studio",
    "theater",
    "academy",
    "bazaar",
    "temple",
    "oasis",
    "hub",
];

const themes = [
    "cyberpunk",
    "steampunk",
    "vaporwave",
    "retrowave",
    "solarpunk",
    "fantasy",
    "scifi",
    "noir",
    "pastel",
    "minimalist",
    "maximalist",
    "synthwave",
    "cottagecore",
    "dystopian",
    "utopian",
    "abstract",
    "retro",
    "futuristic",
    "vintage",
    "modern",
];

export function generateRandomPath(): string {
    const useTheme = Math.random() > 0.5;

    if (useTheme) {
        const theme = themes[Math.floor(Math.random() * themes.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        return `/${theme}-${noun}`;
    } else {
        const adjective =
            adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        return `/${adjective}-${noun}`;
    }
}
