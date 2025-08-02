# This Website Does Not Exist

A dynamic website generator that creates unique, interactive HTML pages on-demand using AI. Each URL path generates a completely different experience, making every visit unique.

## Features

-   **Dynamic Content Generation**: Every URL path generates a unique webpage using AI
-   **Client-Side Only**: All generated pages are pure HTML/CSS/JS with no backend dependencies
-   **Modern UI**:
    -   Sleek glass-effect toolbar
    -   Smooth animations and transitions
    -   Responsive design
    -   Dark mode by default

### Toolbar Features

-   **Hard Reload**: Generate completely new content
-   **Soft Reload**: Refresh current content without API call
-   **Random**: Visit a randomly generated path
-   **Download HTML**: Save the current page
-   **Share on Twitter**: Share your discoveries
-   **History**: Track your visited paths
-   **Social Links**: Quick access to developer profiles

## Tech Stack

-   **Framework**: Next.js 14 with App Router
-   **Styling**: Tailwind CSS
-   **Animations**: Framer Motion
-   **AI**: Gemini 2.5 Flash Lite

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/itsmarsss/thiswebsitedoesnotexist.git
cd thiswebsitedoesnotexist
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with your API key:

```
GEMINI_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. When a user visits any path (e.g., `/cool/page`), the app captures the full path
2. The path is sent to Gemini AI with a carefully crafted prompt
3. Gemini generates contextually relevant HTML based on the path
4. The HTML is rendered directly in the browser with no backend processing
5. A persistent toolbar provides navigation and utility functions

## Customization

### Prompt Modification

The generation prompt can be found in `src/lib/prompts.ts`. Modify it to change the style or behavior of generated pages.

### Toolbar Customization

The toolbar component (`src/components/HoverToolbar.tsx`) can be modified to add or remove features.

## Deployment

The project is ready for deployment on platforms like Vercel:

```bash
npm run build
```

Just ensure your environment variables are properly set in your deployment platform.

## Cost Estimation

Using Gemini 2.5 Flash Lite:

-   ~50K characters per generation
-   $0.000125 per 1K characters
-   Approximately $0.00625 per page generation

## Contributing

Feel free to open issues or submit pull requests. All contributions are welcome!

## License

MIT License - feel free to use this project however you'd like!
