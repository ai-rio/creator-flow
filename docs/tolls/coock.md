Directory structure:
└── engageintellect-cook/
├── README.md
├── components.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── .eslintrc.json
├── app/
│ ├── globals.css
│ ├── layout.tsx
│ ├── page.tsx
│ ├── api/
│ │ ├── route.ts
│ │ ├── fetch-github-stars/
│ │ │ └── route.ts
│ │ ├── fetch-project-posts/
│ │ │ └── route.ts
│ │ ├── fetch-umami-events/
│ │ │ └── route.ts
│ │ └── fetch-umami-stats/
│ │ └── route.ts
│ ├── deployments/
│ │ └── page.tsx
│ ├── technologies/
│ │ └── page.tsx
│ └── worldwide-reach/
│ └── page.tsx
├── components/
│ ├── call-to-action.tsx
│ ├── comments.tsx
│ ├── contact-button.tsx
│ ├── email-form.tsx
│ ├── github-stars.tsx
│ ├── globe-and-stars.tsx
│ ├── hero.tsx
│ ├── orbit.tsx
│ ├── project-posts.tsx
│ ├── project-showcase-vertical.tsx
│ ├── project-showcase.tsx
│ ├── stats-chart.tsx
│ ├── technologies.tsx
│ ├── theme-provider.tsx
│ ├── theme-toggle.tsx
│ ├── magicui/
│ │ ├── animated-beam.tsx
│ │ ├── animated-grid-pattern.tsx
│ │ ├── animated-subscribe-button.tsx
│ │ ├── bento-grid.tsx
│ │ ├── blur-in.tsx
│ │ ├── box-reveal.tsx
│ │ ├── fade-in.tsx
│ │ ├── globe.tsx
│ │ ├── icon-cloud.tsx
│ │ ├── marquee.tsx
│ │ ├── meteors.tsx
│ │ ├── number-ticker.tsx
│ │ ├── orbiting-circles.tsx
│ │ ├── particles.tsx
│ │ ├── retro-grid.tsx
│ │ ├── ripple.tsx
│ │ ├── scroll-based-velocity.tsx
│ │ ├── separate-away.tsx
│ │ ├── shimmer-button.tsx
│ │ ├── text-reveal.tsx
│ │ └── word-pull-up.tsx
│ └── ui/
│ ├── button.tsx
│ ├── calendar.tsx
│ ├── card.tsx
│ ├── command.tsx
│ ├── dialog.tsx
│ ├── dropdown-menu.tsx
│ ├── form.tsx
│ ├── input-with-button.tsx
│ ├── input.tsx
│ ├── label.tsx
│ ├── ripper-card.tsx
│ ├── toast.tsx
│ ├── toaster.tsx
│ └── use-toast.ts
├── lib/
│ ├── animations.ts
│ ├── data.ts
│ ├── fetchers.ts
│ ├── useIntersectionObserver.ts
│ └── utils.ts
└── pb/
└── pb_schema.json

Files Content:

================================================
FILE: README.md
================================================

# cook

## Description:

An ultra-modern, bento-box styled portfolio landing page for developers, designers, and other creatives.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fengageintellect%2Fcook.git)
[![Cook Portfolio Preview](/public/images/thumbnail.png)](https://cook.engage-dev.com)

**NOTE:** If you would like to contribute, please check out the issues tab for a list of tasks that need to be completed.

## Current Lighthouse Scores:

If you would like to help improve the performance, accessibility, best practices, and SEO of this project, please check out the issues tab for a list of tasks that need to be completed.

| Metric         | Score                                        |
| -------------- | -------------------------------------------- |
| Performance    | 98% <-- help improve this by submitting a PR |
| Accessibility  | 100%                                         |
| Best Practices | 100%                                         |
| SEO            | 100%                                         |

## Technologies:

| Name                                                                       | Description                                                                           |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [next.js](https://nextjs.org/)                                             | React framework                                                                       |
| [magic-ui](https://magicui.design)                                         | A modern, minimalistic UI library                                                     |
| [shadcn/ui](https://ui.shadcn.com/)                                        | A modern, minimalistic UI library                                                     |
| [tailwind css](https://tailwindcss.com)                                    | A utility-first CSS framework                                                         |
| [zod](https://zod.dev)                                                     | TypeScript-first schema declaration and validation                                    |
| [pocketbase](https://pocketbase.io)                                        | A modern, minimalistic database                                                       |
| [react-hook-form](https://www.react-hook-form.com/)                        | Performant, flexible and extensible forms with easy-to-use validation                 |
| [github public api](https://docs.github.com/en/rest?apiVersion=2022-11-28) | A REST API for accessing public Github repo, star, and user image data                |
| [vercel](https://vercel.com)                                               | Deploy web projects with ease                                                         |
| [umami analytics](https://umami.is/)                                       | A simple, fast, and privacy-focused website analytics alternative to Google Analytics |

## Getting Started

### Pocketbase Setup

First, we need to install Pocketbase. You can download the latest release from the [Pocketbase GitHub releases page](https://github.com/pocketbase/pocketbase/releases)

```bash
wget https://github.com/pocketbase/pocketbase/releases/download/v0.8.0/pocketbase_0.8.0_linux_amd64.zip
unzip pocketbase_0.8.0_linux_amd64.zip
```

```bash
chmod +x pocketbase
```

```bash
./pocketbase serve
```

Go to [http://localhost:8080](http://localhost:8080) to see the Pocketbase dashboard. From there, you can import the schema from the `/pb/pb_schema.json` file in the root of this repository by using the "import collections" tab in the settings menu.

### Client Setup

```bash
git clone https://github.com/engageintellect/cook.git
cd cook
```

Now, let's set our environment variables. Copy `/.env.example` to either `.env` (for prod) or `.env.local` (for dev) in the root of the project and add replace the values with your own.:

Finally, we can install the dependencies and start the development server:

### Run the development server:

```bash
pnpm i && pnpm run dev
```

### Umami Analytics Setup (Optional)

If you would like to use Umami Analytics, you can sign up for a free account at [umami.is](https://umami.is/). Once you have signed up, you can add your Umami Analytics tracking code to the `app/layout.tsx` file.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

================================================
FILE: components.json
================================================
{
"$schema": "https://ui.shadcn.com/schema.json",
"style": "default",
"rsc": true,
"tsx": true,
"tailwind": {
"config": "tailwind.config.ts",
"css": "app/globals.css",
"baseColor": "neutral",
"cssVariables": true,
"prefix": ""
},
"aliases": {
"components": "@/components",
"utils": "@/lib/utils"
}
}

================================================
FILE: next.config.mjs
================================================
/\*_ @type {import('next').NextConfig} _/
const nextConfig = {
images: {
remotePatterns: [
{
protocol: 'https',
hostname: 'github.com',
},

    ],

},
};

export default nextConfig;

================================================
FILE: package.json
================================================
{
"name": "magic-ui",
"version": "0.5.1",
"private": true,
"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint"
},
"dependencies": {
"@hookform/resolvers": "^3.6.0",
"@motionone/utils": "^10.18.0",
"@radix-ui/react-dialog": "^1.0.5",
"@radix-ui/react-dropdown-menu": "^2.0.6",
"@radix-ui/react-icons": "^1.3.0",
"@radix-ui/react-label": "^2.0.2",
"@radix-ui/react-slot": "^1.0.2",
"@radix-ui/react-toast": "^1.1.5",
"@umami/api-client": "^0.69.0",
"class-variance-authority": "^0.7.0",
"clsx": "^2.1.1",
"cmdk": "^1.0.0",
"date-fns": "^3.6.0",
"framer-motion": "^11.2.10",
"gsap": "^3.12.5",
"lucide-react": "^0.383.0",
"next": "14.2.3",
"next-themes": "^0.3.0",
"pocketbase": "^0.21.3",
"react": "^18",
"react-day-picker": "^8.10.1",
"react-dom": "^18",
"react-hook-form": "^7.51.5",
"react-icon-cloud": "^4.1.4",
"react-icons": "^5.2.1",
"recharts": "^2.12.7",
"tailwind-merge": "^2.3.0",
"tailwindcss-animate": "^1.0.7",
"zod": "^3.23.8"
},
"devDependencies": {
"@types/node": "^20",
"@types/react": "^18",
"@types/react-dom": "^18",
"cobe": "^0.6.3",
"eslint": "^8",
"eslint-config-next": "14.2.3",
"postcss": "^8",
"react-spring": "^9.7.3",
"tailwindcss": "^3.4.1",
"typescript": "^5"
}
}

================================================
FILE: postcss.config.mjs
================================================
/\*_ @type {import('postcss-load-config').Config} _/
const config = {
plugins: {
tailwindcss: {},
},
};

export default config;

================================================
FILE: tailwind.config.ts
================================================
import type { Config } from "tailwindcss"

const config = {
darkMode: ["class"],
content: [
'./pages/**/*.{ts,tsx}',
'./components/**/*.{ts,tsx}',
'./app/**/*.{ts,tsx}',
'./src/**/*.{ts,tsx}',
],
prefix: "",
theme: {
container: {
center: true,
padding: "2rem",
screens: {
"2xl": "1400px",
},
},
extend: {
colors: {
border: "hsl(var(--border))",
input: "hsl(var(--input))",
ring: "hsl(var(--ring))",
background: "hsl(var(--background))",
foreground: "hsl(var(--foreground))",
primary: {
DEFAULT: "hsl(var(--primary))",
foreground: "hsl(var(--primary-foreground))",
},
secondary: {
DEFAULT: "hsl(var(--secondary))",
foreground: "hsl(var(--secondary-foreground))",
},
destructive: {
DEFAULT: "hsl(var(--destructive))",
foreground: "hsl(var(--destructive-foreground))",
},
muted: {
DEFAULT: "hsl(var(--muted))",
foreground: "hsl(var(--muted-foreground))",
},
accent: {
DEFAULT: "hsl(var(--accent))",
foreground: "hsl(var(--accent-foreground))",
},
popover: {
DEFAULT: "hsl(var(--popover))",
foreground: "hsl(var(--popover-foreground))",
},
card: {
DEFAULT: "hsl(var(--card))",
foreground: "hsl(var(--card-foreground))",
},
},
borderRadius: {
lg: "var(--radius)",
md: "calc(var(--radius) - 2px)",
sm: "calc(var(--radius) - 4px)",
},
keyframes: {
"accordion-down": {
from: { height: "0" },
to: { height: "var(--radix-accordion-content-height)" },
},
"accordion-up": {
from: { height: "var(--radix-accordion-content-height)" },
to: { height: "0" },
},

        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        slide: {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },

        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },

        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: '1' },
          "70%": { opacity: '1' },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: '0',
          },
        },

        orbit: {
          "0%": {
              transform: "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
              transform: "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },

        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },

        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        slide: "slide var(--speed) ease-in-out infinite alternate",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        meteor: "meteor 5s linear infinite",
        orbit: "orbit calc(var(--duration)*1s) linear infinite",
        grid: "grid 15s linear infinite",
        ripple: "ripple 3400ms ease infinite",





      },
    },

},
plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

================================================
FILE: tsconfig.json
================================================
{
"compilerOptions": {
"lib": ["dom", "dom.iterable", "esnext"],
"allowJs": true,
"skipLibCheck": true,
"strict": true,
"noEmit": true,
"esModuleInterop": true,
"module": "esnext",
"moduleResolution": "bundler",
"resolveJsonModule": true,
"isolatedModules": true,
"jsx": "preserve",
"incremental": true,
"plugins": [
{
"name": "next"
}
],
"paths": {
"@/_": ["./_"]
}
},
"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
"exclude": ["node_modules"]
}

================================================
FILE: .env.example
================================================
NEXT_PUBLIC_BASE_URL=YOUR_BASE_URL
GITHUB_USERNAME=YOUR_USERNAME
GITHUB_URL=https://github.com/{YOUR_USERNAME}
REPO_NAME=YOUR_REPO_NAME
AVATAR_URL=https://github.com/{YOUR_USERNAME}.png
NEXT_PUBLIC_PORTFOLIO_URL={YOUR_PORTFOLIO_URL}
NEXT_PUBLIC_AVAILABLE_FOR_FREELANCE=true
NEXT_PUBLIC_DISCORD=https://discord.gg/{YOUR_DISCORD_ID}

================================================
FILE: .eslintrc.json
================================================
{
"extends": "next/core-web-vitals"
}

================================================
FILE: app/globals.css
================================================
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
:root {

      scroll-behavior: smooth;
      --background: 0 0% 100%;
      --foreground: 0 0% 3.9%;

      --card: 0 0% 100%;
      --card-foreground: 0 0% 3.9%;

      --popover: 0 0% 100%;
      --popover-foreground: 0 0% 3.9%;

      --primary: 0 0% 9%;
      --primary-foreground: 0 0% 98%;

      --secondary: 0 0% 96.1%;
      --secondary-foreground: 0 0% 9%;

      --muted: 0 0% 96.1%;
      --muted-foreground: 0 0% 45.1%;

      --accent: 0 0% 96.1%;
      --accent-foreground: 0 0% 9%;

      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 0 0% 98%;

      --border: 0 0% 89.8%;
      --input: 0 0% 89.8%;
      --ring: 0 0% 3.9%;

      --radius: 0.5rem;

      --chart-1: 12 76% 61%;
      --chart-2: 173 58% 39%;
      --chart-3: 197 37% 24%;
      --chart-4: 43 74% 66%;
      --chart-5: 27 87% 67%;
    }

    .dark {
      --background: 0 0% 10%;
      --foreground: 0 0% 98%;

      --card: 0 0% 3.9%;
      --card-foreground: 0 0% 98%;

      --popover: 0 0% 10%;
      --popover-foreground: 0 0% 98%;

      --primary: 0 0% 98%;
      --primary-foreground: 0 0% 9%;

      --secondary: 0 0% 14.9%;
      --secondary-foreground: 0 0% 98%;

      --muted: 0 0% 14.9%;
      --muted-foreground: 0 0% 63.9%;

      --accent: 0 0% 14.9%;
      --accent-foreground: 0 0% 98%;

      --destructive: 0 62.8% 30.6%;
      --destructive-foreground: 0 0% 98%;

      --border: 0 0% 14.9%;
      --input: 0 0% 14.9%;
      --ring: 0 0% 83.1%;

      --chart-1: 220 70% 50%;
      --chart-2: 160 60% 45%;
      --chart-3: 30 80% 55%;
      --chart-4: 280 65% 60%;
      --chart-5: 340 75% 55%;
    }

}

@layer base { \* {
@apply border-border;
}
body {
@apply bg-background text-foreground;
}
}

================================================
FILE: app/layout.tsx
================================================
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
title: "engage-cook",
description: "built using next.js, magic-ui, and tailwindcss",
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html lang="en">
<head>
<script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="e2279467-b5f6-4e9d-8b62-869876b433f9"
        ></script>
</head>
<body className={inter.className}>
<ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
{children}
</ThemeProvider>
<Toaster />
</body>
</html>
);
}

================================================
FILE: app/page.tsx
================================================
import { Bento } from "@/components/bento";

export default function Home() {
return (
<>
<div className="w-full flex items-center justify-center max-w-5xl mx-auto">
<div className="flex flex-col items-center overflow-hidden">
<div className="w-full py-2  px-2 lg:py-10 lg:px-4">
<Bento />
</div>
</div>
</div>
</>
);
}

================================================
FILE: app/api/route.ts
================================================
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
return new Response(
JSON.stringify({
msg: 'hello world',
app: 'cook',
version: '0.5.0',
}),
{
status: 200,
}
)
}

================================================
FILE: app/api/fetch-github-stars/route.ts
================================================
export const dynamic = 'force-dynamic'; // defaults to auto

interface Repo {
stargazers_count: number;
name: string;
}

export async function GET(request: Request): Promise<Response> {
const username = "engageintellect";
const token = process.env.GITHUB_TOKEN; // Ensure you set this in your environment variables
const baseUrl = `https://api.github.com/users/${username}/repos`;
const headers = {
"Accept": "application/vnd.github.v3+json",
"Authorization": `token ${token}`
};

try {
if (!token) {
console.error('GitHub token is missing');
return new Response(JSON.stringify({ error: 'GitHub token is missing' }), { status: 500 });
}

    let totalStars = 0;
    let nextUrl: string | null = baseUrl;
    let page = 1; // Start from the first page

    while (nextUrl) {
      const response: Response = await fetch(`${nextUrl}?page=${page}&timestamp=${Date.now()}`, { headers }); // Cache busting
      if (!response.ok) {
        console.error(`Failed to fetch URL: ${nextUrl}, Status: ${response.status}`);
        return new Response(JSON.stringify({ error: `Failed to fetch repositories, Status: ${response.status}` }), { status: response.status });
      }

      const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
      const rateLimitReset = response.headers.get('x-ratelimit-reset');
      if (rateLimitRemaining !== null && parseInt(rateLimitRemaining) === 0) {
        const resetTime = new Date(parseInt(rateLimitReset!) * 1000);
        console.error(`Rate limit exceeded. Try again after ${resetTime}`);
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429 });
      }

      const repos: Repo[] = await response.json();
      repos.forEach(repo => {
        totalStars += repo.stargazers_count;
      });

      // Check for pagination
      const linkHeader: string | null = response.headers.get('link');
      if (linkHeader) {
        const nextLink = linkHeader.split(',').find(s => s.includes('rel="next"'));
        if (nextLink) {
          const match = nextLink.match(/<([^>]+)>/);
          nextUrl = match ? match[1] : null;
          page += 1; // Increment the page number
        } else {
          nextUrl = null;
        }
      } else {
        nextUrl = null;
      }
    }

    return new Response(JSON.stringify({ totalStars }), { status: 200 });

} catch (error) {
console.error('Error fetching repositories:', error);
return new Response(JSON.stringify({ error: 'Failed to fetch repositories' }), { status: 500 });
}
}

================================================
FILE: app/api/fetch-project-posts/route.ts
================================================
export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(request: Request) {
const url = `https://bento.engage-dev.com/api/v1/fetchProjectsFeed.json`;
const headers = { "Accept": "application/json" };

try {
let postsData:any = [];
let nextUrl = url;
let pageCount = 0;

    while (nextUrl) {
      const response = await fetch(nextUrl, { headers });
      if (!response.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch projects feed' }), { status: response.status });
      }

      const posts = await response.json();
      postsData = postsData.concat(posts);

      // Logging for debugging
      console.log(`Fetched ${posts.length} posts on page ${pageCount + 1}`);

      // Check for pagination
      const linkHeader = response.headers.get('link');
      if (linkHeader) {
        const nextLink = linkHeader.split(',').find(s => s.includes('rel="next"'));
        nextUrl = nextLink ? nextLink.split(';')[0].replace('<', '').replace('>', '').trim() : "";
      } else {
        nextUrl = "";
      }

      pageCount++;
    }

    console.log(`Total posts: ${postsData.length}`);
    return new Response(JSON.stringify({ postsData }), { status: 200 });

} catch (error) {
console.error('Error fetching projects feed:', error);
return new Response(JSON.stringify({ error: 'Failed to fetch projects feed' }), { status: 500 });
}
}

================================================
FILE: app/api/fetch-umami-events/route.ts
================================================
import { getClient } from '@umami/api-client';

export const dynamic = 'force-dynamic'; // defaults to auto

const client = getClient();

export async function GET(request: Request) {
try {
// The website ID
const websiteId = 'e2279467-b5f6-4e9d-8b62-869876b433f9';

    // Get the current time and one year ago in milliseconds
    const now = Date.now();
    const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000; // 1 year ago

    // Prepare the data object for getWebsitePageviews
    const pageviewsData = {
      startAt: oneYearAgo,
      endAt: now,
      unit: 'day', // Change to 'day' for daily data over the year
      timezone: 'America/Los_Angeles',
      region: 'US',
    };

    console.log('Fetching pageviews with data:', pageviewsData);

    const response = await client.getWebsitePageviews(websiteId, pageviewsData);
    const { ok, data, status, error } = response; // Adjusted to destructure from response

    if (!ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch website pageviews' }), { status: status });
    }

    console.log('Pageviews data:', data);

    return new Response(JSON.stringify(data), { status: 200 });

} catch (error) {
console.error('Error fetching website pageviews:', error);
return new Response(JSON.stringify({ error: 'Failed to fetch website pageviews' }), { status: 500 });
}
}

================================================
FILE: app/api/fetch-umami-stats/route.ts
================================================
import { getClient } from '@umami/api-client';

export const dynamic = 'force-dynamic'; // defaults to auto

const client = getClient();

export async function GET(request: Request) {
try {
// The website ID
const websiteId = 'e2279467-b5f6-4e9d-8b62-869876b433f9';

    // Get the current time and the Unix epoch time in milliseconds
    const now = Date.now();
    const oneDayInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const startAt = now - oneDayInMilliseconds; // 24 hours ago

    // Prepare the data object for getWebsiteMetrics
    const metricsData = {
      startAt: startAt,
      endAt: now,
      type: 'url' // Example type, change as needed
    };

    const { ok, data, status, error } = await client.getWebsiteStats(websiteId, metricsData);

    if (!ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch website metrics' }), { status: status });
    }

    return new Response(JSON.stringify(data), { status: 200 });

} catch (error) {
console.error('Error fetching website metrics:', error);
return new Response(JSON.stringify({ error: 'Failed to fetch website metrics' }), { status: 500 });
}
}

================================================
FILE: app/deployments/page.tsx
================================================
import { FadeIn } from "@/components/magicui/fade-in";
import BlurIn from "@/components/magicui/blur-in";
import Globe from "@/components/magicui/globe";

export default async function DeploymentsPage() {
return (
<div className="mt-10 w-full max-w-2xl mx-auto px-6">
<BlurIn duration={0.5}>
<FadeIn direction="up">
<div className="flex flex-col items-start">
<div className="text-4xl font-bold text-center">Deployments</div>
<div className="font-thin">
Click on a deployment to see the project.
</div>
</div>
</FadeIn>
</BlurIn>

      <BlurIn duration={0.5}>
        <FadeIn direction="down">
          <section className="mt-10">
            <div className="text-2xl font-bold">Cloud</div>

            <div>
              Cloud deployments are the most common way to deploy a project.
              They are easy to set up and maintain, and are generally more
              secure than other deployment methods. Cloud deployments are also
              scalable, meaning that you can easily add more resources to your
              project as it grows. Some popular cloud deployment platforms
              include AWS, Google Cloud, and Azure.
            </div>
          </section>

          <section className="mt-5">
            <div className="text-2xl font-bold">Edge</div>

            <div>
              Lorem sint est ipsum excepteur in Lorem occaecat labore
              exercitation laboris minim ea. Proident eu consectetur commodo
              laborum elit voluptate et adipisicing incididunt amet laboris do.
              Pariatur consectetur dolor aliqua labore. Sunt et exercitation
              fugiat ullamco non mollit dolor ullamco.
            </div>
          </section>

          <section className="mt-5">
            <div className="text-2xl font-bold">On-Prem</div>

            <div>
              Lorem sint est ipsum excepteur in Lorem occaecat labore
              exercitation laboris minim ea. Proident eu consectetur commodo
              laborum elit voluptate et adipisicing incididunt amet laboris do.
              Pariatur consectetur dolor aliqua labore. Sunt et exercitation
              fugiat ullamco non mollit dolor ullamco.
            </div>
          </section>
        </FadeIn>
      </BlurIn>
    </div>

);
}

================================================
FILE: app/technologies/page.tsx
================================================
"use client";

import { motion } from "framer-motion";
import Technologies from "@/components/technologies";

export default function Tech() {
return (
<div className="flex justify-center w-full max-w-2xl mx-auto p-6">
<div>
<div className="flex flex-col items-center mt-10">
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }} >
<div className="text-4xl font-bold text-center">Technologies</div>
<p className="font-thin">
Click on an icon to see projects using that technology.
</p>
</motion.div>
</div>
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1.5 }} >
<Technologies liveLinks={true} />
</motion.div>
</div>
</div>
);
}

================================================
FILE: app/worldwide-reach/page.tsx
================================================
import { FadeIn } from "@/components/magicui/fade-in";
import BlurIn from "@/components/magicui/blur-in";

export default async function WorldwideReach() {
return (
<div className="mt-10 w-full max-w-2xl mx-auto px-6">
<BlurIn duration={0.5}>
<FadeIn direction="up">
<div className="flex flex-col items-start">
<div className="text-4xl font-bold text-center">
Worldwide Reach
</div>
<div className="font-thin">
Click on a deployment to see the project.
</div>
</div>
</FadeIn>
</BlurIn>

      <BlurIn duration={0.5}>
        <FadeIn direction="down">
          <section className="mt-10">
            <div className="text-2xl font-bold">Cloud</div>

            <div>
              Cloud deployments are the most common way to deploy a project.
              include AWS, Google Cloud, and Azure.
            </div>

            <ul className="list-disc ml-10 mt-2">
              <li>Vercel</li>
              <li>AWS</li>
              <li>Azure</li>
              <li>Docker</li>
              <li>Linode</li>
              <li>Digital Ocean</li>
            </ul>
          </section>

          <section className="mt-5">
            <div className="text-2xl font-bold">Edge</div>

            <div>
              Edge deployments leverage distributed computing to bring data and
              services closer to users, reducing latency and improving response
              times. This approach is particularly beneficial for real-time
              applications and services that require rapid data processing and
              delivery. By minimizing the distance data travels, edge
              deployments enhance user experience and can also reduce bandwidth
              costs.
            </div>
          </section>

          <section className="mt-5">
            <div className="text-2xl font-bold">On-Prem</div>

            <div>
              On-premises deployments are hosted locally on a company&apos;s own
              servers and infrastructure. This approach provides organizations
              with greater control over their data and applications, enabling
              them to meet specific security and compliance requirements. While
              on-premises deployments offer enhanced security and privacy, they
              require significant resources to maintain and manage, making them
              less flexible and scalable than cloud or edge deployments.
            </div>
          </section>
        </FadeIn>
      </BlurIn>
    </div>

);
}

================================================
FILE: components/call-to-action.tsx
================================================
import BoxReveal from "@/components/magicui/box-reveal";

import { Button } from "@/components/ui/button";

export async function CallToAction() {
return (
<div className="h-full w-full max-w-[32rem] items-center justify-center overflow-hidden pt-8 px-6">
<BoxReveal boxColor={"#5046e6"} duration={0.5}>
<p className="text-[3.5rem] font-semibold">
Magic UI<span className="text-[#5046e6]">.</span>
</p>
</BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
          UI library for{" "}
          <span className="text-[#5046e6]">Design Engineers</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-[1.5rem]">
          <p>
            -&gt; 20+ free and open-source animated components built with
            <span className="font-semibold text-[#5046e6]"> React</span>,
            <span className="font-semibold text-[#5046e6]"> Typescript</span>,
            <span className="font-semibold text-[#5046e6]"> Tailwind CSS</span>,
            and
            <span className="font-semibold text-[#5046e6]"> Framer Motion</span>
            . <br />
            -&gt; 100% open-source, and customizable. <br />
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <Button className="mt-[1.6rem] bg-[#5046e6]">Explore</Button>
      </BoxReveal>
    </div>

);
}

================================================
FILE: components/comments.tsx
================================================
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";

const reviews = [
{
name: "Jack",
username: "@jack",
body: "I've never seen anything like this before. It's amazing. I love it.",
img: "https://avatar.vercel.sh/jack",
},
{
name: "Jill",
username: "@jill",
body: "I don't know what to say. I'm speechless. This is amazing.",
img: "https://avatar.vercel.sh/jill",
},
{
name: "John",
username: "@john",
body: "I'm at a loss for words. This is amazing. I love it.",
img: "https://avatar.vercel.sh/john",
},
{
name: "Jane",
username: "@jane",
body: "I'm at a loss for words. This is amazing. I love it.",
img: "https://avatar.vercel.sh/jane",
},
{
name: "Jenny",
username: "@jenny",
body: "I'm at a loss for words. This is amazing. I love it.",
img: "https://avatar.vercel.sh/jenny",
},
{
name: "James",
username: "@james",
body: "I'm at a loss for words. This is amazing. I love it.",
img: "https://avatar.vercel.sh/james",
},
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
img,
name,
username,
body,
}: {
img: string;
name: string;
username: string;
body: string;
}) => {
return (
<figure
className={cn(
"relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
// light styles
"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
// dark styles
"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
)} >
<div className="flex flex-row items-center gap-2">
<img className="rounded-full" width="32" height="32" alt="" src={img} />
<div className="flex flex-col">
<figcaption className="text-sm font-medium dark:text-white">
{name}
</figcaption>
<p className="text-xs font-medium dark:text-white/40">{username}</p>
</div>
</div>
<blockquote className="mt-2 text-sm">{body}</blockquote>
</figure>
);
};

export default function MarqueeDemo() {
return (
<div className="relative">
<Marquee pauseOnHover className="[--duration:20s]">
{firstRow.map((review) => (
<ReviewCard key={review.username} {...review} />
))}
</Marquee>
<Marquee reverse pauseOnHover className="[--duration:20s]">
{secondRow.map((review) => (
<ReviewCard key={review.username} {...review} />
))}
</Marquee>
<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
</div>
);
}

================================================
FILE: components/contact-button.tsx
================================================
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

export function SubscribeButton() {
return (
<AnimatedSubscribeButton
brand="#ffbd7a"
subscribeStatus={true}
buttonTextColor="#000009"
initialText={
<span className="group inline-flex items-center">
Subscribe{" "}
<ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
</span>
}
changeText={
<span className="group inline-flex items-center">
<CheckIcon className="mr-2 h-4 w-4" />
Subscribed{" "}
</span>
}
/>
);
}

================================================
FILE: components/email-form.tsx
================================================
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
Form,
FormControl,
FormField,
FormItem,
FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import PocketBase from "pocketbase";
import { SendHorizonal, LoaderCircle } from "lucide-react";

import { useState } from "react";

// Initialize PocketBase client
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

// Define the form schema with email validation
const FormSchema = z.object({
email: z
.string()
.email({ message: "Please enter a valid email address." })
.transform((email) => email.toLowerCase()),
});

export function EmailForm() {
const [isLoading, setIsLoading] = useState(false);
const form = useForm<z.infer<typeof FormSchema>>({
resolver: zodResolver(FormSchema),
defaultValues: {
email: "",
},
});

async function onSubmit(data: z.infer<typeof FormSchema>) {
setIsLoading(true); // Set loading state to true
try {
// wait for half a second to show loading animation
await new Promise((resolve) => setTimeout(resolve, 500));
const record = await pb.collection("cook_form_submissions").create(data);
toast({
variant: "success",
title: "Email submitted successfully!",
description: (
<>
<pre className="my-2 w-full rounded-md bg-background p-4">
<code className="text-neutral-500 dark:text-neutral-300">
{record.email}
</code>
</pre>
<p className="font-semibold text-lg">
We&apos;ll be in touch soon.
</p>
</>
),
});
form.reset(); // Reset form on successful submission
} catch (error) {
console.error("Error creating record:", error);
toast({
variant: "destructive",
title: "Failed to submit email. It may already exist.",
description: "Please try again.",
});
} finally {
setIsLoading(false); // Set loading state to false after the request is complete
}
}

return (
<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
<div className="flex items-center gap-2 w-full">
<FormField
control={form.control}
name="email"
render={({ field }) => (
<FormItem className="w-full relative">
<FormControl className="w-full">
<Input
className="w-full border-neutral-500 text-base" // Ensure font size is at least 16px
placeholder="email@domain.com"
{...field}
/>
</FormControl>
<div className="absolute -bottom-6 z-[-1]">
<FormMessage />
</div>
</FormItem>
)}
/>

          <Button
            type="submit"
            variant="default"
            className="flex items-center gap-2 w-fit text-base group/Button"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div>Send</div>
                <LoaderCircle className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div>Send</div>
                <SendHorizonal className="h-5 w-5 md:group-hover/Button:translate-x-[2px] transition-all duration-300" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>

);
}

================================================
FILE: components/github-stars.tsx
================================================
// GitHubStars.tsx

"use client";

import { useState, useEffect } from "react";
import { fetchStars } from "@/lib/fetchers";
import NumberTicker from "@/components/magicui/number-ticker";
import { formatLargeNumber } from "@/lib/utils";

const GitHubStars = () => {
const [stars, setStars] = useState<number | null>(null);

useEffect(() => {
const getStars = async () => {
const totalStars = await fetchStars();
setStars(totalStars);
};

    getStars();

}, []);

if (stars === null) {
return <div>0</div>;
}

return <NumberTicker value={stars} />;
};

export default GitHubStars;

================================================
FILE: components/globe-and-stars.tsx
================================================
"use client";

import Particles from "@/components/magicui/particles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Globe from "@/components/magicui/globe";

export default function GlobeAndStars() {
const { theme } = useTheme();
const [color, setColor] = useState("#ffffff");

useEffect(() => {
setColor(theme === "dark" ? "#ffffff" : "#808080");
}, [theme]);

return (
<div className="">
<Particles className="" quantity={150} ease={80} color={color} refresh />
<Globe />
</div>
);
}

================================================
FILE: components/hero.tsx
================================================
"use client";

import MeteorShower from "@/components/magicui/meteors";
import WordPullUp from "@/components/magicui/word-pull-up";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/magicui/fade-in";
import { Mail, Github } from "lucide-react";
import BlurIn from "@/components/magicui/blur-in";

export default function Hero() {
return (
<div className="relative flex h-full w-full mx-auto items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
<div className="flex flex-col items-start justify-center h-full overflow-hidden p-6 z-50">
<WordPullUp words="Let's Cook" />

        <div className="text-lg text-neutral-500 dark:text-neutral-400 lg:px-1 w-full ">
          <BlurIn className="w-3/4 sm:w-2/3">
            I craft sleek, full-stack experiences that users love and developers
            enjoy expanding.
          </BlurIn>

          <FadeIn direction="down" className="my-class">
            <div className="flex items-center gap-2 w-full lg:w-2/3 mt-6">
              <a
                href={process.env.GITHUB_URL}
                target="_blank"
                className="flex-1"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="flex items-center gap-2 w-full group/Github"
                >
                  <div>GitHub</div>
                  <Github className="h-5 w-5 lg:group-hover/Github:translate-x-1 transition-all duration-300" />
                </Button>
              </a>

              <a
                href="mailto:engage_intellect@protonmail.com"
                target="_blank"
                className="flex-1"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="flex items-center gap-2 w-full group/Mail"
                >
                  <div>Email Me</div>
                  <Mail className="h-5 w-5 lg:group-hover/Mail:translate-x-1 transition-all duration-300" />
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
      <MeteorShower />
    </div>

);
}

================================================
FILE: components/orbit.tsx
================================================
import OrbitingCircles from "@/components/magicui/orbiting-circles";
import { motion } from "framer-motion";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { SiVercel } from "react-icons/si";
import { AiOutlineDocker } from "react-icons/ai";
import { SiUbuntu } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { SiNginx } from "react-icons/si";
import { SiSvelte } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiFastapi } from "react-icons/si";
import { SiPocketbase } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiOpenai } from "react-icons/si";
import { FaLaptop } from "react-icons/fa";

export default function Orbit() {
return (
<div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
{/_ <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"> _/}
{/_ Circles _/}
{/_ </span> _/}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
      >
        {/* Center Circles */}
        <OrbitingCircles
          className="h-[20px] w-[20px] border-none bg-transparent"
          duration={3}
          delay={10}
          radius={10}
        >
          <Icons.gitHub />
        </OrbitingCircles>

        {/* Inner Circles */}
        <OrbitingCircles
          className="h-[20px] w-[20px] border-none bg-transparent"
          duration={20}
          radius={50}
          delay={66}
        >
          <Icons.python />
        </OrbitingCircles>

        <OrbitingCircles
          className="h-[20px] w-[20px] border-none bg-transparent"
          duration={20}
          radius={50}
          delay={132}
        >
          <Icons.svelte />
        </OrbitingCircles>

        <OrbitingCircles
          className="h-[20px] w-[20px] border-none bg-transparent"
          duration={20}
          radius={50}
          delay={198}
        >
          <Icons.typescript />
        </OrbitingCircles>

        {/* Outer Circles (reverse) */}
        <OrbitingCircles
          className="h-[30px] w-[40px] border-none bg-transparent"
          reverse
          radius={100}
          delay={20}
          duration={20}
        >
          <Icons.vercel />
        </OrbitingCircles>

        <OrbitingCircles
          className="h-[30px] w-[40px] border-none bg-transparent"
          reverse
          radius={100}
          delay={25}
          duration={20}
        >
          <Icons.ubuntu />
        </OrbitingCircles>

        <OrbitingCircles
          className="h-[30px] w-[40px] border-none bg-transparent"
          reverse
          radius={100}
          delay={30}
          duration={20}
        >
          <Icons.docker />
        </OrbitingCircles>
        <OrbitingCircles
          className="h-[30px] w-[40px] border-none bg-transparent"
          reverse
          radius={100}
          delay={35}
          duration={20}
        >
          <Icons.nginx />
        </OrbitingCircles>

        {/* Most Outer Circles (reverse) */}
        <OrbitingCircles
          className="h-[40px] w-[40px] border-none bg-transparent"
          radius={150}
          duration={40}
          delay={0}
        >
          <Icons.fastapi />
        </OrbitingCircles>

        <OrbitingCircles
          className="h-[40px] w-[40px] border-none bg-transparent"
          radius={150}
          duration={40}
          delay={50}
        >
          <Icons.openai />
        </OrbitingCircles>

        <OrbitingCircles
          className="h-[40px] w-[40px] border-none bg-transparent"
          radius={150}
          duration={40}
          delay={100}
        >
          <Icons.pocketbase />
        </OrbitingCircles>

        <OrbitingCircles
          className="h-[40px] w-[40px] border-none bg-transparent"
          radius={150}
          duration={40}
          delay={150}
        >
          <Icons.laptop />
        </OrbitingCircles>
      </motion.div>
    </div>

);
}

const Icons = {
gitHub: (props: IconProps) => <FaGithub className="w-full h-full" />,
docker: (props: IconProps) => <AiOutlineDocker className="w-full h-full" />,
ubuntu: (props: IconProps) => <SiUbuntu className="w-full h-full" />,
vercel: (props: IconProps) => <SiVercel className="w-full h-full" />,
nginx: (props: IconProps) => <SiNginx className="w-full h-full" />,
react: (props: IconProps) => <SiReact className="w-full h-full" />,
nextjs: (props: IconProps) => <SiNextdotjs className="w-full h-full" />,
pocketbase: (props: IconProps) => <SiPocketbase className="w-full h-full" />,
python: (props: IconProps) => <SiPython className="w-full h-full" />,
svelte: (props: IconProps) => <SiSvelte className="w-full h-full" />,
typescript: (props: IconProps) => <SiTypescript className="w-full h-full" />,
javascript: (props: IconProps) => <SiJavascript className="w-full h-full" />,
fastapi: (props: IconProps) => <SiFastapi className="w-full h-full" />,
openai: (props: IconProps) => <SiOpenai className="w-full h-full" />,
laptop: (props: IconProps) => <FaLaptop className="w-full h-full" />,
};

================================================
FILE: components/project-posts.tsx
================================================
// ProjectPosts.tsx

"use client";

import { useState, useEffect } from "react";
import { fetchProjects } from "@/lib/fetchers";
import ProjectShowcaseVertical from "@/components/project-showcase-vertical";
import { defaultDomains } from "@/lib/data";

const ProjectPosts = () => {
const [posts, setPosts] = useState<any | null>(null);
const [files, setFiles] = useState(defaultDomains);

useEffect(() => {
const getPosts = async () => {
const postsData = await fetchProjects();
if (postsData) {
const formattedPosts = postsData.postsData.map((post: any) => ({
name: post.data.title,
body: post.data.description,
slug: post.slug,
image: post.data.image,
}));
setFiles(formattedPosts.slice(0, 10));
}
setPosts(postsData);
};

    getPosts();

}, []);

return <ProjectShowcaseVertical projects={files} />;
};

export default ProjectPosts;

================================================
FILE: components/project-showcase-vertical.tsx
================================================
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";

interface Project {
name: string;
body: string;
slug: string;
image: string;
}

interface ProjectShowcaseVerticalProps {
projects: Project[];
}

const ReviewCard = ({
name,
body,
slug,
image,
}: {
name: string;
body: string;
slug: string;
image: string;
}) => {
return (
<figure
className={cn(
"relative h-40 w-full cursor-pointer overflow-hidden rounded-xl border p-4 shadow",
// light styles
"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
// dark styles
"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
)} >
<a href={`https://bento.engage-dev.com/projects/${slug}`}>
<div className="flex flex-row items-center gap-2">
<div className="flex flex-col">
<div className="flex items-start gap-2">
<img
src={`https://bento.engage-dev.com${image}`}
alt={name}
className="w-8 h-8 rounded-lg object-cover shadow"
/>
<figcaption className="text-lg font-medium dark:text-white">
{name}
</figcaption>
</div>
</div>
</div>
<blockquote className="mt-2 text-sm line-clamp-4 dark:text-white font-thin">
{body}
</blockquote>
</a>
</figure>
);
};

const ProjectShowcaseVertical = ({
projects,
}: ProjectShowcaseVerticalProps) => {
const firstRow = projects.slice(0, 5); // Get first 5 projects
const secondRow = projects.slice(5, 10); // Get next 5 projects

return (
<div className="relative flex h-full w-full flex-row items-center justify-center overflow-hidden rounded-lg border bg-background sm:px-2 md:shadow-xl">
<Marquee pauseOnHover vertical className="[--duration:60s] w-full">
{firstRow.map((project) => (
<ReviewCard key={project.slug} {...project} />
))}
</Marquee>
<Marquee
        reverse
        pauseOnHover
        vertical
        className="[--duration:60s] w-full"
      >
{secondRow.map((project) => (
<ReviewCard key={project.slug} {...project} />
))}
</Marquee>
<div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
</div>
);
};

export default ProjectShowcaseVertical;

================================================
FILE: components/project-showcase.tsx
================================================
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";

interface Project {
name: string;
body: string;
slug: string;
}

interface ProjectShowcaseProps {
projects: Project[];
}

const ReviewCard = ({
name,
body,
slug,
}: {
name: string;
body: string;
slug: string;
}) => {
return (
<figure
className={cn(
"relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
// light styles
"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
// dark styles
"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
)} >
<a href={`${process.env.NEXT_LOCAL_PORTFOLIO_URL}/projects/${slug}`}>
<div className="flex flex-row items-center gap-2">
<div className="flex flex-col">
<figcaption className="text-sm font-medium dark:text-white">
{name}
</figcaption>
</div>
</div>
<blockquote className="mt-2 text-sm line-clamp-2 dark:text-white font-thin">
{body}
</blockquote>
</a>
</figure>
);
};

const ProjectShowcase = ({ projects }: ProjectShowcaseProps) => {
const firstRow = projects.slice(0, projects.length / 2);
const secondRow = projects.slice(projects.length / 2);

return (
<div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background py-20 md:shadow-xl">
<Marquee pauseOnHover className="[--duration:20s]">
{firstRow.map((project) => (
<ReviewCard key={project.slug} {...project} />
))}
</Marquee>
<Marquee reverse pauseOnHover className="[--duration:20s]">
{secondRow.map((project) => (
<ReviewCard key={project.slug} {...project} />
))}
</Marquee>
<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
</div>
);
};

export default ProjectShowcase;

================================================
FILE: components/stats-chart.tsx
================================================
"use client";

import \* as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import NumberTicker from "@/components/magicui/number-ticker";

import { Card, CardContent } from "@/components/ui/card";
import {
ChartConfig,
ChartContainer,
ChartTooltip,
ChartTooltipContent,
} from "@/components/ui/chart";

const fetchStats = async (): Promise<StatsData> => {
const baseUrl =
typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BASE_URL;
const res = await fetch(`${baseUrl}/api/fetch-umami-stats`);
const data = await res.json();
console.log("data is:", data);

// Calculate average visit duration in seconds
const averageVisitDurationSeconds = data.totaltime.value / data.visits.value;

// Convert average visit duration to minutes
const averageVisitDurationMinutes = averageVisitDurationSeconds / 60;

// Store the average visit duration in minutes
data.totaltime.value = averageVisitDurationMinutes;
data.totaltime.prev = data.totaltime.prev / 60; // Assuming prev is also in seconds

return data;
};

type StatsData = {
pageviews: { value: number; prev: number };
visitors: { value: number; prev: number };
visits: { value: number; prev: number };
bounces: { value: number; prev: number };
totaltime: { value: number; prev: number }; // now in minutes
};

type UmamiStatsProps = {
stats: StatsData;
};

const UmamiStats: React.FC<UmamiStatsProps> = ({ stats }) => {
return stats.pageviews.value;
};

const chartConfig = {
visitor_stats: {
label: "Visitors",
},
pageviews: {
label: "Page Views",
color: "hsl(var(--chart-1))",
},
visitors: {
label: "Users",
color: "hsl(var(--chart-2))",
},
visits: {
label: "Visits",
color: "hsl(var(--chart-3))",
},
bounces: {
label: "Bounces",
color: "hsl(var(--chart-4))",
},
totaltime: {
label: "Avarege Time",
color: "hsl(var(--chart-5))",
},
} satisfies ChartConfig;

export default function StatsChart() {
const [stats, setStats] = useState<StatsData | null>(null);

useEffect(() => {
const getStats = async () => {
const stats = await fetchStats();
setStats(stats);
};

    getStats();

}, []);

const chartData = React.useMemo(() => {
if (!stats) return [];
return [
{
type: "pageviews",
visitors: stats.pageviews.value,
fill: "var(--color-pageviews)",
},
{
type: "visitors",
visitors: stats.visitors.value,
fill: "var(--color-visitors)",
},
{
type: "visits",
visitors: stats.visits.value,
fill: "var(--color-visits)",
},
{
type: "bounces",
visitors: stats.bounces.value,
fill: "var(--color-bounces)",
},
{
type: "totaltime",
visitors: stats.totaltime.value,
fill: "var(--color-totaltime)",
},
];
}, [stats]);

if (!stats) {
return <div className="flex items-center justify-center h-full"></div>;
}

return (
<ChartContainer config={chartConfig} className="">
<PieChart>
<ChartTooltip
cursor={false}
content={<ChartTooltipContent hideLabel />}
/>
<Pie
          data={chartData}
          dataKey="visitors"
          nameKey="type"
          innerRadius={70}
          strokeWidth={5}
        >
<Label
content={({ viewBox }) => {
if (viewBox && "cx" in viewBox && "cy" in viewBox) {
return (
<text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
<tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-5xl font-bold"
                    >
{chartData[0].visitors}
</tspan>
<tspan
x={viewBox.cx}
y={(viewBox.cy || 0) + 24}
className="fill-muted-foreground " >
Visits
</tspan>
</text>
);
}
}}
/>
</Pie>
</PieChart>
</ChartContainer>
);
}

================================================
FILE: components/technologies.tsx
================================================
import React from "react";
import IconCloud from "@/components/magicui/icon-cloud";

const slugs = [
"amazonaws",
"apache",
"apple",
"archlinux",
"astro",
"azuredevops",
"bitcoin",
"digitalocean",
"django",
"docker",
"drizzle",
"ethereum",
"firebase",
"freebsd",
"git",
"github",
"gitlab",
"graphql",
"huggingface",
"jira",
"javascript",
"kalilinux",
"linux",
"linode",
"mongodb",
"mysql",
"nextdotjs",
"nginx",
"nodedotjs",
"numpy",
"openai",
"pandas",
"pocketbase",
"postgresql",
"prisma",
"python",
"pytorch",
"react",
"redis",
"solana",
"square",
"stripe",
"svelte",
"sveltekit",
"tailwindcss",
"tensorflow",
"typescript",
"ubuntu",
"vercel",
"zod",
];

interface TechnologiesProps {
liveLinks?: boolean;
}

export default function Technologies({ liveLinks = false }: TechnologiesProps) {
return (
<div className="">
<IconCloud iconSlugs={slugs} liveLinks={liveLinks} />
</div>
);
}

================================================
FILE: components/theme-provider.tsx
================================================
"use client";

import \* as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

================================================
FILE: components/theme-toggle.tsx
================================================
"use client";

import \* as React from "react";
import { Moon, Sun, Contrast } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggle() {
const { setTheme } = useTheme();

return (
<DropdownMenu>
<DropdownMenuTrigger asChild>
<Button variant="none" size="icon">
<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
<span className="sr-only">Toggle theme</span>
</Button>
</DropdownMenuTrigger>
<DropdownMenuContent align="end">
<DropdownMenuItem onClick={() => setTheme("light")}>
<Sun className="h-4 w-4 mr-2" />
Light
</DropdownMenuItem>
<DropdownMenuItem onClick={() => setTheme("dark")}>
<Moon className="h-4 w-4 mr-2" />
Dark
</DropdownMenuItem>
<DropdownMenuItem onClick={() => setTheme("system")}>
<Contrast className="h-4 w-4 mr-2" />
System
</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
);
}

================================================
FILE: components/magicui/animated-beam.tsx
================================================
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { RefObject, useEffect, useId, useState } from "react";

export interface AnimatedBeamProps {
className?: string;
containerRef: RefObject<HTMLElement>; // Container ref
fromRef: RefObject<HTMLElement>;
toRef: RefObject<HTMLElement>;
curvature?: number;
reverse?: boolean;
pathColor?: string;
pathWidth?: number;
pathOpacity?: number;
gradientStartColor?: string;
gradientStopColor?: string;
delay?: number;
duration?: number;
startXOffset?: number;
startYOffset?: number;
endXOffset?: number;
endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
className,
containerRef,
fromRef,
toRef,
curvature = 0,
reverse = false, // Include the reverse prop
duration = Math.random() \* 3 + 4,
delay = 0,
pathColor = "gray",
pathWidth = 2,
pathOpacity = 0.2,
gradientStartColor = "#ffaa40",
gradientStopColor = "#9c40ff",
startXOffset = 0,
startYOffset = 0,
endXOffset = 0,
endYOffset = 0,
}) => {
const id = useId();
const [pathD, setPathD] = useState("");
const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

// Calculate the gradient coordinates based on the reverse prop
const gradientCoordinates = reverse
? {
x1: ["90%", "-10%"],
x2: ["100%", "0%"],
y1: ["0%", "0%"],
y2: ["0%", "0%"],
}
: {
x1: ["10%", "110%"],
x2: ["0%", "100%"],
y1: ["0%", "0%"],
y2: ["0%", "0%"],
};

useEffect(() => {
const updatePath = () => {
if (containerRef.current && fromRef.current && toRef.current) {
const containerRect = containerRef.current.getBoundingClientRect();
const rectA = fromRef.current.getBoundingClientRect();
const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${
          (startX + endX) / 2
        },${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      // For all entries, recalculate the path
      for (let entry of entries) {
        updatePath();
      }
    });

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Call the updatePath initially to set the initial path
    updatePath();

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };

}, [
containerRef,
fromRef,
toRef,
curvature,
startXOffset,
startYOffset,
endXOffset,
endYOffset,
]);

return (
<svg
fill="none"
width={svgDimensions.width}
height={svgDimensions.height}
xmlns="http://www.w3.org/2000/svg"
className={cn(
"pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
className
)}
viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`} >
<path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
<path
d={pathD}
strokeWidth={pathWidth}
stroke={`url(#${id})`}
strokeOpacity="1"
strokeLinecap="round"
/>
<defs>
<motion.linearGradient
className="transform-gpu"
id={id}
gradientUnits={"userSpaceOnUse"}
initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
            repeat: Infinity,
            repeatDelay: 0,
          }} >
<stop stopColor={gradientStartColor} stopOpacity="0"></stop>
<stop stopColor={gradientStartColor}></stop>
<stop offset="32.5%" stopColor={gradientStopColor}></stop>
<stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
</motion.linearGradient>
</defs>
</svg>
);
};

================================================
FILE: components/magicui/animated-grid-pattern.tsx
================================================
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

interface GridPatternProps {
width?: number;
height?: number;
x?: number;
y?: number;
strokeDasharray?: any;
numSquares?: number;
className?: string;
maxOpacity?: number;
duration?: number;
repeatDelay?: number;
}

export function GridPattern({
width = 40,
height = 40,
x = -1,
y = -1,
strokeDasharray = 0,
numSquares = 50,
className,
maxOpacity = 0.5,
duration = 4,
repeatDelay = 0.5,
...props
}: GridPatternProps) {
const id = useId();
const containerRef = useRef(null);
const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
const [squares, setSquares] = useState(() => generateSquares(numSquares));

function getPos() {
return [
Math.floor((Math.random() * dimensions.width) / width),
Math.floor((Math.random() * dimensions.height) / height),
];
}

// Adjust the generateSquares function to return objects with an id, x, and y
function generateSquares(count: number) {
return Array.from({ length: count }, (\_, i) => ({
id: i,
pos: getPos(),
}));
}

// Function to update a single square's position
const updateSquarePosition = (id: number) => {
setSquares((currentSquares) =>
currentSquares.map((sq) =>
sq.id === id
? {
...sq,
pos: getPos(),
}
: sq
)
);
};

// Update squares to animate in
useEffect(() => {
if (dimensions.width && dimensions.height) {
setSquares(generateSquares(numSquares));
}
}, [dimensions, numSquares]);

// Resize observer to update container dimensions
useEffect(() => {
const resizeObserver = new ResizeObserver((entries) => {
for (let entry of entries) {
setDimensions({
width: entry.contentRect.width,
height: entry.contentRect.height,
});
}
});

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };

}, [containerRef]);

return (
<svg
ref={containerRef}
aria-hidden="true"
className={cn(
"pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
className
)}
{...props} >
<defs>
<pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
<path
d={`M.5 ${height}V.5H${width}`}
fill="none"
strokeDasharray={strokeDasharray}
/>
</pattern>
</defs>
<rect width="100%" height="100%" fill={`url(#${id})`} />
<svg x={x} y={y} className="overflow-visible">
{squares.map(({ pos: [x, y], id }, index) => (
<motion.rect
initial={{ opacity: 0 }}
animate={{ opacity: maxOpacity }}
transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse",
            }}
onAnimationComplete={() => updateSquarePosition(id)}
key={`${x}-${y}-${index}`}
width={width - 1}
height={height - 1}
x={x _ width + 1}
y={y _ height + 1}
fill="currentColor"
strokeWidth="0"
/>
))}
</svg>
</svg>
);
}

export default GridPattern;

================================================
FILE: components/magicui/animated-subscribe-button.tsx
================================================
"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface AnimatedSubscribeButtonProps {
brand: string;
subscribeStatus: boolean;
buttonTextColor?: string;
initialText: React.ReactElement | string;
changeText: React.ReactElement | string;
}

export const AnimatedSubscribeButton: React.FC<
AnimatedSubscribeButtonProps

> = ({ brand, subscribeStatus, buttonTextColor, changeText, initialText }) => {
> const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus);

return (
<AnimatePresence mode="wait">
{isSubscribed ? (
<motion.button
className="relative flex w-[200px] items-center justify-center bg-white p-[10px]"
onClick={() => setIsSubscribed(false)}
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }} >
<motion.span
key="action"
className="relative block h-full w-full font-semibold"
initial={{ y: -50 }}
animate={{ y: 0 }}
style={{ color: brand }} >
{changeText}
</motion.span>
</motion.button>
) : (
<motion.button
className="relative flex w-[200px] cursor-pointer items-center justify-center rounded-md border-none p-[10px]"
style={{ backgroundColor: brand, color: buttonTextColor }}
onClick={() => setIsSubscribed(true)}
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }} >
<motion.span
key="reaction"
className="relative block font-semibold"
initial={{ x: 0 }}
exit={{ x: 50, transition: { duration: 0.1 } }} >
{initialText}
</motion.span>
</motion.button>
)}
</AnimatePresence>
);
};

================================================
FILE: components/magicui/bento-grid.tsx
================================================
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import BlurIn from "@/components/magicui/blur-in";

const BentoGrid = ({
children,
className,
}: {
children: ReactNode;
className?: string;
}) => {
return (
<div
className={cn(
"grid w-full auto-rows-[22rem] grid-cols-3 gap-2 lg:gap-4",
className
)} >
{children}
</div>
);
};

const BentoCard = ({
name,
className,
background,
Icon,
description,
href,
cta,
}: {
name?: string;
className?: string;
background?: ReactNode;
Icon?: any;
description?: string;
href?: string;
cta?: string;
}) => (
<BlurIn
duration={0.1}
key={name}
className={cn(
"group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
// light styles
"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
// dark styles
"dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)]",
className
)}

>

    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <div className="flex flex-col gap-2">
        <div>
          {Icon !== "" ? (
            <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
          ) : (
            ""
          )}
        </div>

        <div className="text-3xl font-semibold text-neutral-700 dark:text-neutral-300">
          {name}
        </div>
      </div>
      <p className="w-full text-neutral-500 dark:text-neutral-400 dark:drop-shadow">
        {description}
      </p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
      {href !== "" ? (
        <Button
          variant="ghost"
          asChild
          size="sm"
          className="pointer-events-auto group/Arrow"
        >
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ml-2 h-4 w-4 lg:group-hover/Arrow:translate-x-1 transition-transform duration-300" />
          </a>
        </Button>
      ) : (
        ""
      )}
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />

  </BlurIn>
);

export { BentoCard, BentoGrid };

================================================
FILE: components/magicui/blur-in.tsx
================================================
"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BlurIntProps {
children: ReactNode;
className?: string;
variant?: {
hidden: { filter: string; opacity: number };
visible: { filter: string; opacity: number };
};
duration?: number;
}

const BlurIn = ({
children,
className,
variant,
duration = 0.33,
}: BlurIntProps) => {
const defaultVariants = {
hidden: { filter: "blur(10px)", opacity: 0 },
visible: { filter: "blur(0px)", opacity: 1 },
};
const combinedVariants = variant || defaultVariants;

return (
<motion.h1
initial="hidden"
animate="visible"
transition={{ duration }}
variants={combinedVariants}
className={cn(className, "")} >
{children}
</motion.h1>
);
};

export default BlurIn;

================================================
FILE: components/magicui/box-reveal.tsx
================================================
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface BoxRevealProps {
children: JSX.Element;
width?: "fit-content" | "100%";
boxColor?: string;
duration?: number;
}

export const BoxReveal = ({
children,
width = "fit-content",
boxColor,
duration,
}: BoxRevealProps) => {
const mainControls = useAnimation();
const slideControls = useAnimation();

const ref = useRef(null);
const isInView = useInView(ref, { once: true });

useEffect(() => {
if (isInView) {
slideControls.start("visible");
mainControls.start("visible");
} else {
slideControls.start("hidden");
mainControls.start("hidden");
}
}, [isInView, mainControls, slideControls]);

return (
<div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
<motion.div
variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
initial="hidden"
animate={mainControls}
transition={{ duration: duration ? duration : 0.5, delay: 0.25 }} >
{children}
</motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: duration ? duration : 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor ? boxColor : "#5046e6",
        }}
      />
    </div>

);
};

export default BoxReveal;

================================================
FILE: components/magicui/fade-in.tsx
================================================
"use client";

import { motion, Variants } from "framer-motion";
import { useMemo, ReactNode } from "react";

type FadeTextProps = {
className?: string;
direction?: "up" | "down" | "left" | "right";
framerProps?: Variants;
children: ReactNode;
};

export function FadeIn({
direction = "up",
className,
framerProps = {
hidden: { opacity: 0 },
show: { opacity: 1, transition: { type: "spring" } },
},
children,
}: FadeTextProps) {
const directionOffset = useMemo(() => {
const map = { up: 20, down: -20, left: -20, right: 20 };
return map[direction];
}, [direction]);

const axis = direction === "up" || direction === "down" ? "y" : "x";

const FADE_ANIMATION_VARIANTS = useMemo(() => {
const { hidden, show, ...rest } = framerProps as {
[name: string]: { [name: string]: number; opacity: number };
};

    return {
      ...rest,
      hidden: {
        ...(hidden ?? {}),
        opacity: hidden?.opacity ?? 0,
        [axis]: hidden?.[axis] ?? directionOffset,
      },
      show: {
        ...(show ?? {}),
        opacity: show?.opacity ?? 1,
        [axis]: show?.[axis] ?? 0,
      },
    };

}, [directionOffset, axis, framerProps]);

return (
<motion.div
initial="hidden"
animate="show"
viewport={{ once: true }}
variants={FADE_ANIMATION_VARIANTS} >
<motion.span className={className}>{children}</motion.span>
</motion.div>
);
}

================================================
FILE: components/magicui/globe.tsx
================================================
"use client";

import { cn } from "@/lib/utils";
import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef } from "react";
import { useSpring } from "react-spring";

const GLOBE_CONFIG: COBEOptions = {
width: 800,
height: 800,
onRender: () => {},
devicePixelRatio: 2,
phi: 0,
theta: 0.41,
dark: 0,
diffuse: 0.4,
mapSamples: 64000,
mapBrightness: 1.2,
baseColor: [1, 1, 1],
markerColor: [251 / 255, 100 / 255, 21 / 255],
glowColor: [0, 0, 0],
markers: [
{ location: [14.5995, 120.9842], size: 0.03 }, // Manila
{ location: [19.076, 72.8777], size: 0.1 }, // Mumbai
{ location: [23.8103, 90.4125], size: 0.05 }, // Dhaka
{ location: [30.0444, 31.2357], size: 0.07 }, // Cairo
{ location: [39.9042, 116.4074], size: 0.08 }, // Beijing
{ location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo
{ location: [19.4326, -99.1332], size: 0.1 }, // Mexico City
{ location: [40.7128, -74.006], size: 0.1 }, // New York City
{ location: [34.6937, 135.5022], size: 0.05 }, // Osaka
{ location: [41.0082, 28.9784], size: 0.06 }, // Istanbul
{ location: [34.0522, -118.2437], size: 0.08 }, // Los Angeles
{ location: [30.2672, -97.7431], size: 0.06 }, // Austin, Texas
{ location: [37.7749, -122.4194], size: 0.07 }, // San Francisco
{ location: [21.3069, -157.8583], size: 0.05 }, // Honolulu, Hawaii
{ location: [35.6895, 139.6917], size: 0.08 }, // Tokyo
{ location: [48.8566, 2.3522], size: 0.07 }, // Paris
{ location: [59.3293, 18.0686], size: 0.05 }, // Stockholm, Sweden
{ location: [46.2044, 6.1432], size: 0.05 }, // Geneva, Switzerland
{ location: [22.3193, 114.1694], size: 0.07 }, // Hong Kong
{ location: [41.9028, 12.4964], size: 0.06 }, // Rome
{ location: [25.7617, -80.1918], size: 0.07 }, // Miami, Florida
{ location: [43.6532, -79.3832], size: 0.07 }, // Toronto, Canada
{ location: [49.2827, -123.1207], size: 0.07 }, // Vancouver, Canada
{ location: [61.2181, -149.9003], size: 0.05 }, // Anchorage, Alaska
{ location: [52.52, 13.405], size: 0.06 }, // Berlin
{ location: [-33.8688, 151.2093], size: 0.07 }, // Sydney
{ location: [40.4173, -82.9071], size: 0.05 }, // Ohio
{ location: [38.5976, -80.4549], size: 0.05 }, // West Virginia
{ location: [38.9072, -77.0369], size: 0.07 }, // Washington, D.C.
{ location: [42.3601, -71.0589], size: 0.06 }, // Boston, Massachusetts
{ location: [39.7392, -104.9903], size: 0.06 }, // Denver, Colorado
{ location: [47.6062, -122.3321], size: 0.06 }, // Seattle
{ location: [37.5665, 126.978], size: 0.07 }, // Seoul, South Korea
{ location: [26.8206, 30.8025], size: 0.07 }, // Egypt
{ location: [25.276987, 55.296249], size: 0.07 }, // Dubai
{ location: [51.5074, -0.1278], size: 0.07 }, // London
{ location: [1.3521, 103.8198], size: 0.07 }, // Singapore
{ location: [64.9631, -19.0208], size: 0.05 }, // Iceland
{ location: [41.8781, -87.6298], size: 0.07 }, // Chicago
{ location: [40.4168, -3.7038], size: 0.07 }, // Madrid
{ location: [55.7558, 37.6173], size: 0.07 }, // Moscow, Russia
{ location: [35.6762, 139.6503], size: 0.07 }, // Tokyo, Japan
{ location: [-34.6037, -58.3816], size: 0.07 }, // Buenos Aires, Argentina
{ location: [37.9838, 23.7275], size: 0.06 }, // Athens, Greece
{ location: [28.6139, 77.209], size: 0.07 }, // New Delhi, India
{ location: [45.4642, 9.19], size: 0.07 }, // Milan, Italy
{ location: [50.1109, 8.6821], size: 0.07 }, // Frankfurt, Germany
{ location: [35.8617, 104.1954], size: 0.07 }, // China
{ location: [31.2304, 121.4737], size: 0.08 }, // Shanghai, China
{ location: [48.2082, 16.3738], size: 0.06 }, // Vienna, Austria
{ location: [50.8503, 4.3517], size: 0.06 }, // Brussels, Belgium
{ location: [45.4215, -75.6972], size: 0.07 }, // Ottawa, Canada
{ location: [55.8642, -4.2518], size: 0.06 }, // Glasgow, Scotland
{ location: [31.7683, 35.2137], size: 0.07 }, // Jerusalem, Israel
{ location: [-22.9068, -43.1729], size: 0.07 }, // Rio de Janeiro, Brazil
{ location: [35.6895, 139.6917], size: 0.08 }, // Tokyo, Japan
{ location: [25.0343, -77.3963], size: 0.06 }, // Nassau, Bahamas
{ location: [22.3964, 114.1095], size: 0.07 }, // Hong Kong
{ location: [3.139, 101.6869], size: 0.07 }, // Kuala Lumpur, Malaysia
{ location: [-1.2921, 36.8219], size: 0.06 }, // Nairobi, Kenya
{ location: [39.9042, 116.4074], size: 0.08 }, // Beijing, China
{ location: [32.7767, -96.797], size: 0.06 }, // Dallas, Texas
{ location: [39.9042, 116.4074], size: 0.08 }, // Beijing, China
{ location: [-37.8136, 144.9631], size: 0.07 }, // Melbourne, Australia
{ location: [43.7696, 11.2558], size: 0.06 }, // Florence, Italy
{ location: [41.9028, 12.4964], size: 0.07 }, // Rome, Italy
],
};

export default function Globe({
className,
config = GLOBE_CONFIG,
}: {
className?: string;
config?: COBEOptions;
}) {
let phi = 0;
let width = 0;
const canvasRef = useRef<HTMLCanvasElement>(null);
const pointerInteracting = useRef(null);
const pointerInteractionMovement = useRef(0);
const [{ r }, api] = useSpring(() => ({
r: 0,
config: {
mass: 1,
tension: 280,
friction: 40,
precision: 0.001,
},
}));

const updatePointerInteraction = (value: any) => {
pointerInteracting.current = value;
canvasRef.current!.style.cursor = value ? "grabbing" : "grab";
};

const updateMovement = (clientX: any) => {
if (pointerInteracting.current !== null) {
const delta = clientX - pointerInteracting.current;
pointerInteractionMovement.current = delta;
api.start({ r: delta / 200 });
}
};

const onRender = useCallback(
(state: Record<string, any>) => {
if (!pointerInteracting.current) phi += 0.0025;
state.phi = phi + r.get();
state.width = width _ 2;
state.height = width _ 2;
},
[pointerInteracting, phi, r]
);

const onResize = () => {
if (canvasRef.current) {
width = canvasRef.current.offsetWidth;
}
};

useEffect(() => {
window.addEventListener("resize", onResize);
onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"));
    return () => globe.destroy();

}, []);

return (
<div
className={cn(
"absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
className
)} >
<canvas
className={cn(
"h-full w-full opacity-0 transition-opacity duration-500"
)}
ref={canvasRef}
onPointerDown={(e) =>
updatePointerInteraction(
e.clientX - pointerInteractionMovement.current
)
}
onPointerUp={() => updatePointerInteraction(null)}
onPointerOut={() => updatePointerInteraction(null)}
onMouseMove={(e) => updateMovement(e.clientX)}
onTouchMove={(e) =>
e.touches[0] && updateMovement(e.touches[0].clientX)
}
/>
</div>
);
}

================================================
FILE: components/magicui/icon-cloud.tsx
================================================
"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
Cloud,
fetchSimpleIcons,
ICloud,
renderSimpleIcon,
SimpleIcon,
} from "react-icon-cloud";

import { sanitizeSlug } from "@/lib/utils";

export const cloudProps: Omit<ICloud, "children"> = {
containerProps: {
style: {
display: "flex",
justifyContent: "center",
alignItems: "center",
width: "100%",
paddingTop: 40,
},
},
options: {
reverse: true,
depth: 1,
wheelZoom: false,
imageScale: 2,
activeCursor: "pointer",
tooltip: "native",
initial: [0.05, -0.05],
clickToFront: 700,
tooltipDelay: 0,
outlineColour: "#0000",
maxSpeed: 0.02,
minSpeed: 0.01,
},
};

export const renderCustomIcon = (
icon: SimpleIcon,
theme: string,
liveLinks: boolean
) => {
const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
const minContrastRatio = theme === "dark" ? 2 : 1.2;

return renderSimpleIcon({
icon,
bgHex,
fallbackHex,
minContrastRatio,
size: 42,
aProps: liveLinks
? {
href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/${sanitizeSlug(
            icon.slug
          )}`,
target: "",
rel: "noopener noreferrer",
}
: {
href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/${sanitizeSlug(
            icon.slug
          )}`,
target: undefined,
rel: undefined,
onClick: (e: any) => e.preventDefault(),
style: { cursor: "pointer" },
},
});
};

export type DynamicCloudProps = {
iconSlugs: string[];
liveLinks?: boolean;
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({
iconSlugs,
liveLinks = true,
}: DynamicCloudProps) {
const [data, setData] = useState<IconData | null>(null);
const { theme } = useTheme();

useEffect(() => {
fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
}, [iconSlugs]);

const renderedIcons = useMemo(() => {
if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "light", liveLinks)
    );

}, [data, theme, liveLinks]);

return (
// @ts-ignore
<Cloud {...cloudProps}>
<>{renderedIcons}</>
</Cloud>
);
}

================================================
FILE: components/magicui/marquee.tsx
================================================
import { cn } from "@/lib/utils";

interface MarqueeProps {
className?: string;
reverse?: boolean;
pauseOnHover?: boolean;
children?: React.ReactNode;
vertical?: boolean;
repeat?: number;
[key: string]: any;
}

export default function Marquee({
className,
reverse,
pauseOnHover = false,
children,
vertical = false,
repeat = 4,
...props
}: MarqueeProps) {
return (
<div
{...props}
className={cn(
"group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
{
"flex-row": !vertical,
"flex-col": vertical,
},
className
)} >
{Array(repeat)
.fill(0)
.map((\_, i) => (
<div
key={i}
className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
"animate-marquee flex-row": !vertical,
"animate-marquee-vertical flex-col": vertical,
"group-hover:[animation-play-state:paused]": pauseOnHover,
"[animation-direction:reverse]": reverse,
})} >
{children}
</div>
))}
</div>
);
}

================================================
FILE: components/magicui/meteors.tsx
================================================
"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

interface MeteorsProps {
number?: number;
}
export const Meteors = ({ number = 20 }: MeteorsProps) => {
const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
[]
);

useEffect(() => {
const styles = [...new Array(number)].map(() => ({
top: -5,
left: Math.floor(Math.random() _ window.innerWidth) + "px",
animationDelay: Math.random() _ 1 + 0.2 + "s",
animationDuration: Math.floor(Math.random() \* 8 + 2) + "s",
}));
setMeteorStyles(styles);
}, [number]);

return (
<>
{[...meteorStyles].map((style, idx) => (
// Meteor Head
<span
key={idx}
className={clsx(
"pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
)}
style={style} >
{/_ Meteor Tail _/}
<div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
</span>
))}
</>
);
};

export default Meteors;

================================================
FILE: components/magicui/number-ticker.tsx
================================================
"use client";

import { cn } from "@/lib/utils";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function NumberTicker({
value,
direction = "up",
delay = 0,
className,
}: {
value: any;
direction?: "up" | "down";
className?: string;
delay?: number; // delay in s
}) {
const ref = useRef<HTMLSpanElement>(null);
const motionValue = useMotionValue(direction === "down" ? value : 0);
const springValue = useSpring(motionValue, {
damping: 60,
stiffness: 100,
});
const isInView = useInView(ref, { once: true, margin: "0px" });

useEffect(() => {
isInView &&
setTimeout(() => {
motionValue.set(direction === "down" ? 0 : value);
}, delay \* 1000);
}, [motionValue, isInView, delay, value, direction]);

useEffect(
() =>
springValue.on("change", (latest) => {
if (ref.current) {
ref.current.textContent = Intl.NumberFormat("en-US").format(
latest.toFixed(0)
);
}
}),
[springValue]
);

return (
<span className={cn("tabular-nums text-justify", className)} ref={ref} />
);
}

================================================
FILE: components/magicui/orbiting-circles.tsx
================================================
import { cn } from "@/lib/utils";

export default function OrbitingCircles({
className,
children,
reverse,
duration = 20,
delay = 10,
radius = 50,
path = true,
}: {
className?: string;
children?: React.ReactNode;
reverse?: boolean;
duration?: number;
delay?: number;
radius?: number;
path?: boolean;
}) {
return (
<>
{path && (
<svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
<circle
className="stroke-black/10 stroke-1 dark:stroke-white/10"
cx="50%"
cy="50%"
r={radius}
fill="none"
strokeDasharray={"4 4"}
/>
</svg>
)}

      <div
        style={
          {
            "--duration": duration,
            "--radius": radius,
            "--delay": -delay,
          } as React.CSSProperties
        }
        className={cn(
          "absolute flex h-full w-full transform-gpu animate-orbit items-center justify-center rounded-full border bg-none [animation-delay:calc(var(--delay)*1000ms)] dark:bg-none",
          { "[animation-direction:reverse]": reverse },
          className
        )}
      >
        {children}
      </div>
    </>

);
}

================================================
FILE: components/magicui/particles.tsx
================================================
"use client";

import React, { useEffect, useRef, useState } from "react";

interface MousePosition {
x: number;
y: number;
}

function MousePosition(): MousePosition {
const [mousePosition, setMousePosition] = useState<MousePosition>({
x: 0,
y: 0,
});

useEffect(() => {
const handleMouseMove = (event: MouseEvent) => {
setMousePosition({ x: event.clientX, y: event.clientY });
};

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };

}, []);

return mousePosition;
}

interface ParticlesProps {
className?: string;
quantity?: number;
staticity?: number;
ease?: number;
size?: number;
refresh?: boolean;
color?: string;
vx?: number;
vy?: number;
}
function hexToRgb(hex: string): number[] {
hex = hex.replace("#", "");
const hexInt = parseInt(hex, 16);
const red = (hexInt >> 16) & 255;
const green = (hexInt >> 8) & 255;
const blue = hexInt & 255;
return [red, green, blue];
}

const Particles: React.FC<ParticlesProps> = ({
className = "",
quantity = 100,
staticity = 50,
ease = 50,
size = 0.4,
refresh = false,
color = "#ffffff",
vx = 0,
vy = 0,
}) => {
const canvasRef = useRef<HTMLCanvasElement>(null);
const canvasContainerRef = useRef<HTMLDivElement>(null);
const context = useRef<CanvasRenderingContext2D | null>(null);
const circles = useRef<any[]>([]);
const mousePosition = MousePosition();
const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

useEffect(() => {
if (canvasRef.current) {
context.current = canvasRef.current.getContext("2d");
}
initCanvas();
animate();
window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };

}, [color]);

useEffect(() => {
onMouseMove();
}, [mousePosition.x, mousePosition.y]);

useEffect(() => {
initCanvas();
}, [refresh]);

const initCanvas = () => {
resizeCanvas();
drawParticles();
};

const onMouseMove = () => {
if (canvasRef.current) {
const rect = canvasRef.current.getBoundingClientRect();
const { w, h } = canvasSize.current;
const x = mousePosition.x - rect.left - w / 2;
const y = mousePosition.y - rect.top - h / 2;
const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
if (inside) {
mouse.current.x = x;
mouse.current.y = y;
}
}
};

type Circle = {
x: number;
y: number;
translateX: number;
translateY: number;
size: number;
alpha: number;
targetAlpha: number;
dx: number;
dy: number;
magnetism: number;
};

const resizeCanvas = () => {
if (canvasContainerRef.current && canvasRef.current && context.current) {
circles.current.length = 0;
canvasSize.current.w = canvasContainerRef.current.offsetWidth;
canvasSize.current.h = canvasContainerRef.current.offsetHeight;
canvasRef.current.width = canvasSize.current.w _ dpr;
canvasRef.current.height = canvasSize.current.h _ dpr;
canvasRef.current.style.width = `${canvasSize.current.w}px`;
canvasRef.current.style.height = `${canvasSize.current.h}px`;
context.current.scale(dpr, dpr);
}
};

const circleParams = (): Circle => {
const x = Math.floor(Math.random() _ canvasSize.current.w);
const y = Math.floor(Math.random() _ canvasSize.current.h);
const translateX = 0;
const translateY = 0;
const pSize = Math.floor(Math.random() _ 2) + size;
const alpha = 0;
const targetAlpha = parseFloat((Math.random() _ 0.6 + 0.1).toFixed(1));
const dx = (Math.random() - 0.5) _ 0.1;
const dy = (Math.random() - 0.5) _ 0.1;
const magnetism = 0.1 + Math.random() \* 4;
return {
x,
y,
translateX,
translateY,
size: pSize,
alpha,
targetAlpha,
dx,
dy,
magnetism,
};
};

const rgb = hexToRgb(color);

const drawCircle = (circle: Circle, update = false) => {
if (context.current) {
const { x, y, translateX, translateY, size, alpha } = circle;
context.current.translate(translateX, translateY);
context.current.beginPath();
context.current.arc(x, y, size, 0, 2 \* Math.PI);
context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
context.current.fill();
context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }

};

const clearContext = () => {
if (context.current) {
context.current.clearRect(
0,
0,
canvasSize.current.w,
canvasSize.current.h,
);
}
};

const drawParticles = () => {
clearContext();
const particleCount = quantity;
for (let i = 0; i < particleCount; i++) {
const circle = circleParams();
drawCircle(circle);
}
};

const remapValue = (
value: number,
start1: number,
end1: number,
start2: number,
end2: number,
): number => {
const remapped =
((value - start1) \* (end2 - start2)) / (end1 - start1) + start2;
return remapped > 0 ? remapped : 0;
};

const animate = () => {
clearContext();
circles.current.forEach((circle: Circle, i: number) => {
// Handle the alpha value
const edge = [
circle.x + circle.translateX - circle.size, // distance from left edge
canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
circle.y + circle.translateY - circle.size, // distance from top edge
canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
];
const closestEdge = edge.reduce((a, b) => Math.min(a, b));
const remapClosestEdge = parseFloat(
remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
);
if (remapClosestEdge > 1) {
circle.alpha += 0.02;
if (circle.alpha > circle.targetAlpha) {
circle.alpha = circle.targetAlpha;
}
} else {
circle.alpha = circle.targetAlpha \* remapClosestEdge;
}
circle.x += circle.dx + vx;
circle.y += circle.dy + vy;
circle.translateX +=
(mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
ease;
circle.translateY +=
(mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
ease;

      drawCircle(circle, true);

      // circle gets out of the canvas
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        // remove the circle from the array
        circles.current.splice(i, 1);
        // create a new circle
        const newCircle = circleParams();
        drawCircle(newCircle);
        // update the circle position
      }
    });
    window.requestAnimationFrame(animate);

};

return (
<div className={className} ref={canvasContainerRef} aria-hidden="true">
<canvas ref={canvasRef} className="h-full w-full" />
</div>
);
};

export default Particles;

================================================
FILE: components/magicui/retro-grid.tsx
================================================
import { cn } from "@/lib/utils";

export default function RetroGrid({ className }: { className?: string }) {
return (
<div
className={cn(
"pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px]",
className
)} >
{/_ Grid _/}
<div className="absolute inset-0 [transform:rotateX(75deg)]">
<div
className={cn(
"animate-grid",

            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",

            // Light Styles
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",

            // Dark styles
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]"
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-90% dark:from-background" />
    </div>

);
}

================================================
FILE: components/magicui/ripple.tsx
================================================
import React, { CSSProperties } from "react";

interface RippleProps {
mainCircleSize?: number;
mainCircleOpacity?: number;
numCircles?: number;
}

const Ripple = React.memo(function Ripple({
mainCircleSize = 210,
mainCircleOpacity = 0.24,
numCircles = 8,
}: RippleProps) {
return (
<div className="absolute inset-0 flex items-center justify-center bg-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]">
{Array.from({ length: numCircles }, (\_, i) => {
const size = mainCircleSize + i _ 70;
const opacity = mainCircleOpacity - i _ 0.03;
const animationDelay = `${i * 0.06}s`;
const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
const borderOpacity = 5 + i \* 5;

        return (
          <div
            key={i}
            className={`absolute animate-ripple rounded-full bg-foreground/25 shadow-xl border top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 [--i:${i}]`}
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                animationDelay: animationDelay,
                borderStyle: borderStyle,
                borderWidth: "1px",
                borderColor: `rgba(var(--foreground-rgb), ${borderOpacity / 100})`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>

);
});

Ripple.displayName = "Ripple";

export default Ripple;

================================================
FILE: components/magicui/scroll-based-velocity.tsx
================================================
"use client";

import { cn } from "@/lib/utils";
import { wrap } from "@motionone/utils";
import {
motion,
useAnimationFrame,
useMotionValue,
useScroll,
useSpring,
useTransform,
useVelocity,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface VelocityScrollProps {
text: string;
default_velocity?: number;
className?: string;
}

interface ParallaxProps {
children: string;
baseVelocity: number;
className?: string;
}

export function VelocityScroll({
text,
default_velocity = 5,
className,
}: VelocityScrollProps) {
function ParallaxText({
children,
baseVelocity = 100,
className,
}: ParallaxProps) {
const baseX = useMotionValue(0);
const { scrollY } = useScroll();
const scrollVelocity = useVelocity(scrollY);
const smoothVelocity = useSpring(scrollVelocity, {
damping: 50,
stiffness: 400,
});

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false,
    });

    const [repetitions, setRepetitions] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const calculateRepetitions = () => {
        if (containerRef.current && textRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const textWidth = textRef.current.offsetWidth;
          const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
          setRepetitions(newRepetitions);
        }
      };

      calculateRepetitions();

      window.addEventListener("resize", calculateRepetitions);
      return () => window.removeEventListener("resize", calculateRepetitions);
    }, [children]);

    const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

    const directionFactor = React.useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });

    return (
      <div
        className="w-full overflow-hidden whitespace-nowrap"
        ref={containerRef}
      >
        <motion.div className={cn("inline-block", className)} style={{ x }}>
          {Array.from({ length: repetitions }).map((_, i) => (
            <span key={i} ref={i === 0 ? textRef : null}>
              {children}{" "}
            </span>
          ))}
        </motion.div>
      </div>
    );

}

return (
<section className="relative w-full">
<ParallaxText baseVelocity={default_velocity} className={className}>
{text}
</ParallaxText>
<ParallaxText baseVelocity={-default_velocity} className={className}>
{text}
</ParallaxText>
</section>
);
}

================================================
FILE: components/magicui/separate-away.tsx
================================================
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SeparateAwayProps {
upper_text: string;
lower_text: string;
duration?: number;
hidden_opacity?: number;
visible_opacity?: number;
className?: string;
}

export function SeparateAway({
upper_text,
lower_text,
duration = 1.5,
hidden_opacity = 0,
visible_opacity = 1,
className,
}: SeparateAwayProps) {
const separate = {
hidden: { opacity: hidden_opacity, y: 0 },
visible: (custom: number) => ({
opacity: visible_opacity,
y: custom \* 5,
transition: { duration: duration },
}),
};

return (
<div>
<motion.h1
custom={-1}
variants={separate}
initial="hidden"
animate="visible"
className={cn(className)} >
{upper_text}
</motion.h1>
<motion.h1
custom={1}
variants={separate}
initial="hidden"
animate="visible"
className={cn(className)} >
{lower_text}
</motion.h1>
</div>
);
}

================================================
FILE: components/magicui/shimmer-button.tsx
================================================
import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

export interface ShimmerButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement> {
shimmerColor?: string;
shimmerSize?: string;
borderRadius?: string;
shimmerDuration?: string;
background?: string;
className?: string;
children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
(
{
shimmerColor = "#ffffff",
shimmerSize = "0.05em",
shimmerDuration = "3s",
borderRadius = "100px",
background = "rgba(0, 0, 0, 1)",
className,
children,
...props
},
ref
) => {
return (
<button
style={
{
"--spread": "90deg",
"--shimmer-color": shimmerColor,
"--radius": borderRadius,
"--speed": shimmerDuration,
"--cut": shimmerSize,
"--bg": background,
} as CSSProperties
}
className={cn(
"group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-black",
"transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px]",
className
)}
ref={ref}
{...props} >
{/_ spark container _/}
<div
className={cn(
"-z-30 blur-[2px]",
"absolute inset-0 overflow-visible [container-type:size]"
)} >
{/_ spark _/}
<div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
{/_ spark before _/}
<div className="animate-spin-around absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
</div>
</div>
{children}

        {/* Highlight */}
        <div
          className={cn(
            "insert-0 absolute h-full w-full",

            "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",

            // transition
            "transform-gpu transition-all duration-300 ease-in-out",

            // on hover
            "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",

            // on click
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"
          )}
        />
      </button>
    );

}
);

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;

================================================
FILE: components/magicui/text-reveal.tsx
================================================
"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useRef } from "react";

interface TextRevealByWordProps {
text: string;
className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
text,
className,
}) => {
const targetRef = useRef<HTMLDivElement | null>(null);

const { scrollYProgress } = useScroll({
target: targetRef,
});
const words = text.split(" ");

return (
<div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
<div
className={
"sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
} >
<p
ref={targetRef}
className={
"flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
} >
{words.map((word, i) => {
const start = i / words.length;
const end = start + 1 / words.length;
return (
<Word key={i} progress={scrollYProgress} range={[start, end]}>
{word}
</Word>
);
})}
</p>
</div>
</div>
);
};

interface WordProps {
children: ReactNode;
progress: any;
range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
const opacity = useTransform(progress, range, [0, 1]);
return (
<span className="xl:lg-3 relative mx-1 lg:mx-2.5">
<span className={"absolute opacity-30"}>{children}</span>
<motion.span
style={{ opacity: opacity }}
className={"text-black dark:text-white"} >
{children}
</motion.span>
</span>
);
};

export default TextRevealByWord;

================================================
FILE: components/magicui/word-pull-up.tsx
================================================
"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "../../lib/utils";

interface WordPullUpProps {
words: string;
delayMultiple?: number;
wrapperFramerProps?: Variants;
framerProps?: Variants;
className?: string;
}

export default function WordPullUp({
words,
wrapperFramerProps = {
hidden: { opacity: 0 },
show: {
opacity: 1,
transition: {
staggerChildren: 0.2,
},
},
},
framerProps = {
hidden: { y: 20, opacity: 0 },
show: { y: 0, opacity: 1 },
},
className,
}: WordPullUpProps) {
return (
<motion.h1
variants={wrapperFramerProps}
initial="hidden"
animate="show"
className={cn(
"font-display text-center text-6xl md:text-7xl lg:text-8xl font-bold leading-[5rem] tracking-tighter drop-shadow-sm",
className
)} >
{words.split(" ").map((word, i) => (
<motion.span
key={i}
variants={framerProps}
style={{ display: "inline-block", paddingRight: "1rem" }} >
{word === "" ? <span>&nbsp;</span> : word}
</motion.span>
))}
</motion.h1>
);
}

================================================
FILE: components/ui/button.tsx
================================================
import \* as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
{
variants: {
variant: {
default: "bg-primary text-primary-foreground hover:bg-primary/90",
destructive:
"bg-destructive text-destructive-foreground hover:bg-destructive/90",
outline:
"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
secondary:
"bg-secondary text-secondary-foreground hover:bg-secondary/80",
ghost: "hover:bg-accent hover:text-accent-foreground",
link: "text-primary underline-offset-4 hover:underline",
none: "text-primary",
},
size: {
default: "h-10 px-4 py-2",
sm: "h-9 rounded-md px-3",
lg: "h-11 rounded-md px-8",
icon: "h-10 w-10",
},
},
defaultVariants: {
variant: "default",
size: "default",
},
}
);

export interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeof buttonVariants> {
asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
({ className, variant, size, asChild = false, ...props }, ref) => {
const Comp = asChild ? Slot : "button";
return (
<Comp
className={cn(buttonVariants({ variant, size, className }))}
ref={ref}
{...props}
/>
);
}
);
Button.displayName = "Button";

export { Button, buttonVariants };

================================================
FILE: components/ui/calendar.tsx
================================================
"use client"

import \* as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
className,
classNames,
showOutsideDays = true,
...props
}: CalendarProps) {
return (
<DayPicker
showOutsideDays={showOutsideDays}
className={cn("p-3", className)}
classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
{...props}
/>
)
}
Calendar.displayName = "Calendar"

export { Calendar }

================================================
FILE: components/ui/card.tsx
================================================
import \* as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement>

> (({ className, ...props }, ref) => (

  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement>

> (({ className, ...props }, ref) => (

  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
HTMLParagraphElement,
React.HTMLAttributes<HTMLHeadingElement>

> (({ className, ...props }, ref) => (

  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
HTMLParagraphElement,
React.HTMLAttributes<HTMLParagraphElement>

> (({ className, ...props }, ref) => (

  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement>

> (({ className, ...props }, ref) => (

  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement>

> (({ className, ...props }, ref) => (

  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

================================================
FILE: components/ui/command.tsx
================================================
"use client"

import \* as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
React.ElementRef<typeof CommandPrimitive>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive>

> (({ className, ...props }, ref) => (
> <CommandPrimitive

    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}

/>
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
return (
<Dialog {...props}>
<DialogContent className="overflow-hidden p-0 shadow-lg">
<Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
{children}
</Command>
</DialogContent>
</Dialog>
)
}

const CommandInput = React.forwardRef<
React.ElementRef<typeof CommandPrimitive.Input>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>

> (({ className, ...props }, ref) => (

  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
React.ElementRef<typeof CommandPrimitive.List>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>

> (({ className, ...props }, ref) => (
> <CommandPrimitive.List

    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}

/>
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
React.ElementRef<typeof CommandPrimitive.Empty>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>

> ((props, ref) => (
> <CommandPrimitive.Empty

    ref={ref}
    className="py-6 text-center text-sm"
    {...props}

/>
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
React.ElementRef<typeof CommandPrimitive.Group>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>

> (({ className, ...props }, ref) => (
> <CommandPrimitive.Group

    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}

/>
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
React.ElementRef<typeof CommandPrimitive.Separator>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>

> (({ className, ...props }, ref) => (
> <CommandPrimitive.Separator

    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}

/>
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
React.ElementRef<typeof CommandPrimitive.Item>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>

> (({ className, ...props }, ref) => (
> <CommandPrimitive.Item

    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className
    )}
    {...props}

/>
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
className,
...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
return (
<span
className={cn(
"ml-auto text-xs tracking-widest text-muted-foreground",
className
)}
{...props}
/>
)
}
CommandShortcut.displayName = "CommandShortcut"

export {
Command,
CommandDialog,
CommandInput,
CommandList,
CommandEmpty,
CommandGroup,
CommandItem,
CommandShortcut,
CommandSeparator,
}

================================================
FILE: components/ui/dialog.tsx
================================================
"use client"

import _ as React from "react"
import _ as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
React.ElementRef<typeof DialogPrimitive.Overlay>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>

> (({ className, ...props }, ref) => (
> <DialogPrimitive.Overlay

    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}

/>
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
React.ElementRef<typeof DialogPrimitive.Content>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>

> (({ className, children, ...props }, ref) => (
> <DialogPortal>

    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>

  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
className,
...props
}: React.HTMLAttributes<HTMLDivElement>) => (

  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
className,
...props
}: React.HTMLAttributes<HTMLDivElement>) => (

  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
React.ElementRef<typeof DialogPrimitive.Title>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>

> (({ className, ...props }, ref) => (
> <DialogPrimitive.Title

    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}

/>
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
React.ElementRef<typeof DialogPrimitive.Description>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>

> (({ className, ...props }, ref) => (
> <DialogPrimitive.Description

    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}

/>
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
Dialog,
DialogPortal,
DialogOverlay,
DialogClose,
DialogTrigger,
DialogContent,
DialogHeader,
DialogFooter,
DialogTitle,
DialogDescription,
}

================================================
FILE: components/ui/dropdown-menu.tsx
================================================
"use client"

import _ as React from "react"
import _ as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
inset?: boolean
}

> (({ className, inset, children, ...props }, ref) => (
> <DropdownMenuPrimitive.SubTrigger

    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}

>

    {children}
    <ChevronRight className="ml-auto h-4 w-4" />

</DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>

> (({ className, ...props }, ref) => (
> <DropdownMenuPrimitive.SubContent

    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}

/>
))
DropdownMenuSubContent.displayName =
DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
React.ElementRef<typeof DropdownMenuPrimitive.Content>,
React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>

> (({ className, sideOffset = 4, ...props }, ref) => (
> <DropdownMenuPrimitive.Portal>

    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />

</DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
React.ElementRef<typeof DropdownMenuPrimitive.Item>,
React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
inset?: boolean
}

> (({ className, inset, ...props }, ref) => (
> <DropdownMenuPrimitive.Item

    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}

/>
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>

> (({ className, children, checked, ...props }, ref) => (
> <DropdownMenuPrimitive.CheckboxItem

    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}

>

    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}

</DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>

> (({ className, children, ...props }, ref) => (
> <DropdownMenuPrimitive.RadioItem

    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}

>

    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}

</DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
React.ElementRef<typeof DropdownMenuPrimitive.Label>,
React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
inset?: boolean
}

> (({ className, inset, ...props }, ref) => (
> <DropdownMenuPrimitive.Label

    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}

/>
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>

> (({ className, ...props }, ref) => (
> <DropdownMenuPrimitive.Separator

    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}

/>
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
className,
...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
return (
<span
className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
{...props}
/>
)
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
DropdownMenu,
DropdownMenuTrigger,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuCheckboxItem,
DropdownMenuRadioItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuShortcut,
DropdownMenuGroup,
DropdownMenuPortal,
DropdownMenuSub,
DropdownMenuSubContent,
DropdownMenuSubTrigger,
DropdownMenuRadioGroup,
}

================================================
FILE: components/ui/form.tsx
================================================
import _ as React from "react";
import _ as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
Controller,
ControllerProps,
FieldPath,
FieldValues,
FormProvider,
useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import BlurIn from "@/components/magicui/blur-in";
import { FadeIn } from "@/components/magicui/fade-in";

const Form = FormProvider;

type FormFieldContextValue<
TFieldValues extends FieldValues = FieldValues,
TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>

> = {
> name: TName;
> };

const FormFieldContext = React.createContext<FormFieldContextValue>(
{} as FormFieldContextValue
);

const FormField = <
TFieldValues extends FieldValues = FieldValues,
TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>

> ({
> ...props
> }: ControllerProps<TFieldValues, TName>) => {
> return (

    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>

);
};

const useFormField = () => {
const fieldContext = React.useContext(FormFieldContext);
const itemContext = React.useContext(FormItemContext);
const { getFieldState, formState } = useFormContext();

const fieldState = getFieldState(fieldContext.name, formState);

if (!fieldContext) {
throw new Error("useFormField should be used within <FormField>");
}

const { id } = itemContext;

return {
id,
name: fieldContext.name,
formItemId: `${id}-form-item`,
formDescriptionId: `${id}-form-item-description`,
formMessageId: `${id}-form-item-message`,
...fieldState,
};
};

type FormItemContextValue = {
id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
{} as FormItemContextValue
);

const FormItem = React.forwardRef<
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement>

> (({ className, ...props }, ref) => {
> const id = React.useId();

return (
<FormItemContext.Provider value={{ id }}>
<div ref={ref} className={cn("space-y-2", className)} {...props} />
</FormItemContext.Provider>
);
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
React.ElementRef<typeof LabelPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>

> (({ className, ...props }, ref) => {
> const { error, formItemId } = useFormField();

return (
<Label
ref={ref}
className={cn(error && "text-destructive", className)}
htmlFor={formItemId}
{...props}
/>
);
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
React.ElementRef<typeof Slot>,
React.ComponentPropsWithoutRef<typeof Slot>

> (({ ...props }, ref) => {
> const { error, formItemId, formDescriptionId, formMessageId } =

    useFormField();

return (
<Slot
ref={ref}
id={formItemId}
aria-describedby={
!error
? `${formDescriptionId}`
: `${formDescriptionId} ${formMessageId}`
}
aria-invalid={!!error}
{...props}
/>
);
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
HTMLParagraphElement,
React.HTMLAttributes<HTMLParagraphElement>

> (({ className, ...props }, ref) => {
> const { formDescriptionId } = useFormField();

return (
<p
ref={ref}
id={formDescriptionId}
className={cn("text-sm text-muted-foreground", className)}
{...props}
/>
);
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
HTMLParagraphElement,
React.HTMLAttributes<HTMLParagraphElement>

> (({ className, children, ...props }, ref) => {
> const { error, formMessageId } = useFormField();
> const body = error ? String(error?.message) : children;

if (!body) {
return null;
}

return (
<FadeIn direction="down" className="h-full">
<p
ref={ref}
id={formMessageId}
className={cn("text-sm font-medium text-destructive", className)}
{...props} >
{body}
</p>
</FadeIn>
);
});
FormMessage.displayName = "FormMessage";

export {
useFormField,
Form,
FormItem,
FormLabel,
FormControl,
FormDescription,
FormMessage,
FormField,
};

================================================
FILE: components/ui/input-with-button.tsx
================================================
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PocketBase from "pocketbase";

// Initialize PocketBase client
const pb = new PocketBase("https://engage-dev.com/pb");

export function InputWithButton() {
const [email, setEmail] = useState("");

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setEmail(e.target.value);
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
try {
const data = { email };
const record = await pb.collection("cook_form_submissions").create(data);
console.log("Record created:", record);
// Optionally, reset the form
setEmail("");
alert("Email submitted successfully!");
} catch (error) {
console.error("Error creating record:", error);
alert("Failed to submit email. Please try again.");
}
};

return (
<form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2"
    >
<Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleInputChange}
        className="border-neutral-500"
      />
<Button type="submit">Send</Button>
</form>
);
}

================================================
FILE: components/ui/input.tsx
================================================
import \* as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
({ className, type, ...props }, ref) => {
return (
<input
type={type}
className={cn(
"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
className
)}
ref={ref}
{...props}
/>
);
}
);
Input.displayName = "Input";

export { Input };

================================================
FILE: components/ui/label.tsx
================================================
"use client"

import _ as React from "react"
import _ as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
React.ElementRef<typeof LabelPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
VariantProps<typeof labelVariants>

> (({ className, ...props }, ref) => (
> <LabelPrimitive.Root

    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}

/>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

================================================
FILE: components/ui/ripper-card.tsx
================================================
import Ripple from "@/components/magicui/ripple";

export function RippleCard() {
return (
<div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
<p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-card-foreground p-5">
bring your ideas to life.
</p>
<Ripple />
</div>
);
}

================================================
FILE: components/ui/toast.tsx
================================================
"use client";

import _ as React from "react";
import _ as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
React.ElementRef<typeof ToastPrimitives.Viewport>,
React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>

> (({ className, ...props }, ref) => (
> <ToastPrimitives.Viewport

    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}

/>
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
"group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
{
variants: {
variant: {
default: "border bg-background text-foreground",
success: "group border-emerald-500 bg-emerald-500 text-white",
destructive:
"destructive group border-destructive bg-destructive text-destructive-foreground",
},
},
defaultVariants: {
variant: "default",
},
}
);

const Toast = React.forwardRef<
React.ElementRef<typeof ToastPrimitives.Root>,
React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
VariantProps<typeof toastVariants>

> (({ className, variant, ...props }, ref) => {
> return (

    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />

);
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
React.ElementRef<typeof ToastPrimitives.Action>,
React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>

> (({ className, ...props }, ref) => (
> <ToastPrimitives.Action

    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}

/>
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
React.ElementRef<typeof ToastPrimitives.Close>,
React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>

> (({ className, ...props }, ref) => (
> <ToastPrimitives.Close

    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}

>

    <X className="h-4 w-4" />

</ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
React.ElementRef<typeof ToastPrimitives.Title>,
React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>

> (({ className, ...props }, ref) => (
> <ToastPrimitives.Title

    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}

/>
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
React.ElementRef<typeof ToastPrimitives.Description>,
React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>

> (({ className, ...props }, ref) => (
> <ToastPrimitives.Description

    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}

/>
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
type ToastProps,
type ToastActionElement,
ToastProvider,
ToastViewport,
Toast,
ToastTitle,
ToastDescription,
ToastClose,
ToastAction,
};

================================================
FILE: components/ui/toaster.tsx
================================================
"use client";

import {
Toast,
ToastClose,
ToastDescription,
ToastProvider,
ToastTitle,
ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
const { toasts } = useToast();

return (
<ToastProvider>
{toasts.map(function ({ id, title, description, action, ...props }) {
return (
<Toast key={id} {...props}>
<div className="grid gap-1 w-full">
{title && <ToastTitle>{title}</ToastTitle>}
{description && (
<ToastDescription>{description}</ToastDescription>
)}
</div>
{action}
<ToastClose />
</Toast>
);
})}
<ToastViewport />
</ToastProvider>
);
}

================================================
FILE: components/ui/use-toast.ts
================================================
"use client"

// Inspired by react-hot-toast library
import \* as React from "react"

import type {
ToastActionElement,
ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
id: string
title?: React.ReactNode
description?: React.ReactNode
action?: ToastActionElement
}

const actionTypes = {
ADD_TOAST: "ADD_TOAST",
UPDATE_TOAST: "UPDATE_TOAST",
DISMISS_TOAST: "DISMISS_TOAST",
REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
count = (count + 1) % Number.MAX_SAFE_INTEGER
return count.toString()
}

type ActionType = typeof actionTypes

type Action =
| {
type: ActionType["ADD_TOAST"]
toast: ToasterToast
}
| {
type: ActionType["UPDATE_TOAST"]
toast: Partial<ToasterToast>
}
| {
type: ActionType["DISMISS_TOAST"]
toastId?: ToasterToast["id"]
}
| {
type: ActionType["REMOVE_TOAST"]
toastId?: ToasterToast["id"]
}

interface State {
toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
if (toastTimeouts.has(toastId)) {
return
}

const timeout = setTimeout(() => {
toastTimeouts.delete(toastId)
dispatch({
type: "REMOVE_TOAST",
toastId: toastId,
})
}, TOAST_REMOVE_DELAY)

toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
switch (action.type) {
case "ADD_TOAST":
return {
...state,
toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
}

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }

}
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
memoryState = reducer(memoryState, action)
listeners.forEach((listener) => {
listener(memoryState)
})
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
const id = genId()

const update = (props: ToasterToast) =>
dispatch({
type: "UPDATE_TOAST",
toast: { ...props, id },
})
const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

dispatch({
type: "ADD_TOAST",
toast: {
...props,
id,
open: true,
onOpenChange: (open) => {
if (!open) dismiss()
},
},
})

return {
id: id,
dismiss,
update,
}
}

function useToast() {
const [state, setState] = React.useState<State>(memoryState)

React.useEffect(() => {
listeners.push(setState)
return () => {
const index = listeners.indexOf(setState)
if (index > -1) {
listeners.splice(index, 1)
}
}
}, [state])

return {
...state,
toast,
dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
}
}

export { useToast, toast }

================================================
FILE: lib/animations.ts
================================================
import { gsap } from 'gsap';

export const animateMainStagger = () => {
gsap.from('.animate-item', {
opacity: 0,
y: 20,
duration: 1,
delay: 0.1,
stagger: 0.1,
ease: 'power4.out'
});
};

================================================
FILE: lib/data.ts
================================================

export const defaultDomains = [
{
name: "Crypto",
body: "Interface with blockchains, create smart contracts, track market data, manage digital assets.",
slug: "crypto",
image: "crypto",
},
{
name: "Commerce",
body: "Sell your product or service online.",
slug: "commerce",
image: "crypto",
},
{
name: "Web",
body: "Create beautiful, responsive, and performant websites.",
slug: "web",
image: "crypto",
},
{
name: "IOT",
body: "Interface with things around you.",
slug: "iot",
image: "crypto",
},
{
name: "AI",
body: "Create intelligent, context-aware applications that understand your unique data.",
slug: "ai",
image: "crypto",
},
{
name: "API",
body: "Create APIs that power your applications.",
slug: "api",
image: "crypto",
},
];

================================================
FILE: lib/fetchers.ts
================================================
// fetchFunctions.ts

export const fetchStars = async (): Promise<number> => {
const baseUrl =
typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BASE_URL;
const res = await fetch(`${baseUrl}/api/fetch-github-stars`);
const data = await res.json();
return Number(data?.totalStars);
};

export const fetchProjects = async () => {
const baseUrl =
typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BASE_URL;
const res = await fetch(`${baseUrl}/api/fetch-project-posts`);
const data = await res.json();
return data;
};

================================================
FILE: lib/useIntersectionObserver.ts
================================================
import { useEffect, useState, useRef, MutableRefObject } from 'react';

export const useIntersectionObserver = (): {
ref: MutableRefObject<HTMLDivElement | null>;
isIntersecting: boolean;
} => {
const [isIntersecting, setIsIntersecting] = useState(false);
const ref = useRef<HTMLDivElement | null>(null);

useEffect(() => {
if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('IntersectionObserver entry:', entry);
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };

}, [ref]);

return { ref, isIntersecting };
};

================================================
FILE: lib/utils.ts
================================================
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs))
}

export function formatTagString(tag: string) {
return tag.replaceAll(" ", "-").toLowerCase()
}

export function sanitizeSlug(slug: string): string {
const replacements: { [key: string]: string } = {
nodedotjs: "nodejs",
nextdotjs: "nextjs",
// Add more replacements as needed
};

return replacements[slug] || slug;
}

export function formatLargeNumber(num: number): string {
if (num >= 1_000_000) {
return (num / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'm';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2).replace(/\.?0+$/, '') + 'k';
}
return num.toString();
}

================================================
FILE: pb/pb_schema.json
================================================
[
{
"id": "jwvcpkb2f322agd",
"name": "cook_form_submissions",
"type": "base",
"system": false,
"schema": [
{
"id": "axzcm6o8",
"name": "email",
"type": "email",
"system": false,
"required": true,
"unique": true,
"options": {
"exceptDomains": null,
"onlyDomains": null
}
}
],
"listRule": null,
"viewRule": null,
"createRule": "",
"updateRule": null,
"deleteRule": null,
"options": {}
}
]
