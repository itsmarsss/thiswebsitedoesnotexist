import { attitudes } from "./attitudes";

const getRandomAttitude = () => {
    const totalWeight = attitudes.reduce(
        (sum, attitude) => sum + attitude.weight,
        0
    );
    let random = Math.random() * totalWeight;

    for (const attitude of attitudes) {
        random -= attitude.weight;
        if (random <= 0) {
            return attitude;
        }
    }

    return attitudes[0]; // Fallback to first attitude (Normal)
};

export const generatePagePrompt = (fullPath: string) => {
    const attitude = getRandomAttitude();

    return `Generate a simple static HTML page for the route ${fullPath}, ${attitude.style}

The page must be highly engaging—encourage visitors to stay as long as possible—without any back-end or dead controls. If a well-known site is mentioned, try your best to recreate it to the best of your ability while maintaining the chosen attitude.

Do not include:
- Comments
- External stylesheets or scripts
- Unscrollable content
- Buttons that won't work
- Code blocks

Instead, embed concise, "gimmicky" front-end features directly in the HTML. Reply without code blocks, start with <html> and end with </html>.

Current Attitude: ${attitude.name}`;
};
