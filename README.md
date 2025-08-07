# This Website Does Not Exist

A dynamic website generator that creates unique, interactive HTML pages on-demand using AI. Each URL path generates a completely different experience, making every visit unique.

## Features

-   **Dynamic Content Generation**: Every URL path generates a unique webpage using AI
-   **Client-Side Only**: All generated pages are pure HTML/CSS/JS with no backend dependencies
-   **Analytics Dashboard**: Track and analyze popular page requests
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
-   **Database**: MongoDB (for analytics)

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

3. Create a `.env.local` file with your API keys:

```env
# Required for AI generation
GEMINI_API_KEY=your_api_key_here

# Required for analytics (MongoDB)
MONGODB_URI=your_mongodb_uri_here
```

For MongoDB setup:

-   Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas/database)
-   Get your connection string from the cluster
-   Replace `your_mongodb_uri_here` with your connection string
-   The database and collections will be created automatically

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Analytics Dashboard

Visit `/searchboard` to view analytics about the most popular generated pages. The dashboard shows:

-   Most requested paths
-   Number of times each path was requested
-   Last request timestamp for each path

Analytics are automatically collected whenever a page is generated.

### Manual Data Import

To manually import analytics data:

1. Prepare your data in the `scripts/import-stats.ts` file following the existing format
2. Compile and run the import script:

```bash
# Compile the TypeScript file
npx tsc scripts/import-stats.ts --esModuleInterop true --module commonjs

# Run the compiled script
node scripts/import-stats.js
```

This will upsert the data into your MongoDB database, updating existing entries and adding new ones.

## How It Works

1. When a user visits any path (e.g., `/cool/page`), the app captures the full path
2. The path is sent to Gemini AI with a carefully crafted prompt
3. Gemini generates contextually relevant HTML based on the path
4. The HTML is rendered directly in the browser with no backend processing
5. A persistent toolbar provides navigation and utility functions
6. Each page request is tracked in MongoDB for analytics

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

Just ensure your environment variables (GEMINI_API_KEY and MONGODB_URI) are properly set in your deployment platform.

## Cost Estimation

Using Gemini 2.5 Flash Lite:

-   ~50K characters per generation
-   $0.000125 per 1K characters
-   Approximately $0.00625 per page generation

MongoDB Atlas free tier is sufficient for most use cases and includes:

-   512MB storage
-   Shared RAM
-   Up to 100 operations per second

## Contributing

Feel free to open issues or submit pull requests. All contributions are welcome!

## License

MIT License - feel free to use this project however you'd like!
