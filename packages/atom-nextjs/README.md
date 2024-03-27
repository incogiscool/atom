# Atom NextJS SDK

This package is created for Atom CMS. This SDK currently supports NextJS 13 App Router, and TailwindCSS. All files are built using NextJS server components for API key protection and ratelimiting.

**Currently, Atom does not support websites with dark mode.**

A video version of this tutorial is available [here]()

## Get Started

Install the following NPM package

```
npm i atom-nextjs@latest
```

## Set up your routes

For this example, we will be using `/blog` as our primary route for the posts.

### Blog page

Inside of your `app/blog/page.tsx` directory, import the package, and render the page.

```tsx
// app/blog/page.tsx

import { AtomPage } from 'atom-nextjs';

export const metadata = {
  title: 'Blog',
};

export default function Blog() {
  return (
    <AtomPage baseRoute="/blog" projectKey={process.env.ATOM_PROJECT_KEY!} />
  );
}
```

**Optional**: You can also import your own container or styling div to wrap the component.

```tsx
// app/blog/page.tsx

import { AtomPage } from 'atom-nextjs';
import { MyAppContainer } from '@/...';

export const metadata = {
  title: 'Blog',
};

export default function Blog() {
  return (
    <MyAppContainer>
      <AtomPage baseRoute="/blog" projectKey={process.env.ATOM_PROJECT_KEY!} />
    </MyAppContainer>
  );
}
```

### Post page

Inside of your `app/blog/[id]/page.tsx` directory, import the package, generate the metadata, and render the page.

```tsx
// app/blog/[id]/page.tsx

import { Atom, generatePostMetadata } from 'atom-nextjs';

export type BlogParams = { params: { id: string } };

export const generateMetadata = async ({ params }: BlogParams) => {
  const metadata = await generatePostMetadata(
    process.env.ATOM_PROJECT_KEY!,
    params.id
  );

  return metadata;
};

export default async function BlogPage({ params }: BlogParams) {
  return <Atom projectKey={process.env.ATOM_PROJECT_KEY!} postId={params.id} />;
}
```

**Optional**: You can also import your own container or styling div to wrap the component.

```tsx
// app/blog/[id]/page.tsx

import { Atom, generatePostMetadata } from 'atom-nextjs';
import { MyAppContainer } from '@/...';

export type BlogParams = { params: { id: string } };

export const generateMetadata = async ({ params }: BlogParams) => {
  const metadata = await generatePostMetadata(
    process.env.ATOM_PROJECT_KEY!,
    params.id
  );

  return metadata;
};

export default async function BlogPage({ params }: BlogParams) {
  return (
    <MyAppContainer>
      <Atom projectKey={process.env.ATOM_PROJECT_KEY!} postId={params.id} />
    </MyAppContainer>
  );
}
```

## Configure TailwindCSS file

To configure your Tailwind CSS file, add the following code:

```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [...'./node_modules/atom-nextjs/src/components/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [...require('@tailwindcss/typography')],
};
```
