# Genshin Character Site

A site project to demonstrate Genshin Impact character list, table, and character details using [Next.js](https://nextjs.org), using unofficial Genshin-db API [genshin-db-api.vercel.app](genshin-db-api.vercel.app) as API source data.

For reference, you can visit [theBowja/genshin-db-api](https://github.com/theBowja/genshin-db-api) for more detail, or use [genshin-db](https://www.npmjs.com/package/genshin-db) package on your Node.js project for practical usages with built-in functions.

This project built using [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

This application displays a list of Genshin Impact characters fetched from a public API and presents them in two ways:

### Character Card List

- A responsive, paginated grid of character cards.
- Filtering options are available for region, element, and weapon type.
- A search bar allows for filtering characters by name.

### Character Table

- A pivot table that groups characters by different attributes.
- You can choose which attributes (Elements, Weapons, Regions) to use for rows and columns.
- This provides a quick and easy way to see all characters that match a specific combination, for example, all "Pyro" characters who use a "Sword".

Here is the example of the character table, shortlisted & names only, for reference:

| Elements \ Weapons | Sword | Claymore | Polearm |
| :--- | :--- | :--- | :--- |
| **Anemo** | Jean, Kaedehara Kazuha | Sayu | Xiao |
| **Cryo** | Kaeya, Kamisato Ayaka | Chongyun, Eula | Rosaria, Shenhe |
| **Pyro** | Bennett | Diluc, Xinyan | Hu Tao, Xiangling |

*(The actual table in the app shows character icons for a quick visual reference.)*

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
