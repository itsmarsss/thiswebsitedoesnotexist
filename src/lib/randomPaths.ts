const adjectives = [
    "delulu",
    "rizzed-up",
    "based",
    "cheugy",
    "sus",
    "gyatt-powered",
    "slayful",
    "feral",
    "capybara-certified",
    "goofy-ahh",
    "sigmafied",
    "yeet-ready",
    "grimace-shaked",
    "vibe-checked",
    "unserious",
    "skibidi",
    "bruhmoment",
    "npc-core",
    "doomscrolling",
    "meme-lord",
];

const nouns = [
    "vibe-shack",
    "brainrot-zone",
    "side-quest",
    "meme-vault",
    "core-memory",
    "grindset-hub",
    "shenanigan-bunker",
    "doom-den",
    "goon-cave",
    "stan-council",
    "fan-cam",
    "capybara-lounge",
    "rat-kingdom",
    "froggy-summit",
    "hydration-station",
    "riz-dojo",
    "silly-goose-club",
    "blorbo-court",
    "chaos-chamber",
    "yap-parliament",
];

const themes = [
    "skibidi-toilet",
    "corecore",
    "fan-cam",
    "girl-dinner",
    "doomscroll",
    "frogcore",
    "cursed",
    "capybara-core",
    "deluluverse",
    "hydration-nation",
    "meme-apocalypse",
    "blorboverse",
    "ratwave",
    "sigmawave",
    "slaypunk",
    "yapwave",
    "chaoscore",
    "brainrot",
    "feralwave",
    "gyattwave",
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

export const examplePaths = (() => {
    const paths = new Set<string>();

    while (paths.size < 5) {
        paths.add(generateRandomPath());
    }

    return Array.from(paths);
})();
