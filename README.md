# Documentation RAG Agent - Browser Extension

Transform any technical documentation or internal wiki into a secure, local-first RAG agent accessible directly in your IDE.

## Overview

Our browser extension solves the productivity drain caused by constant context-switching between applications and external documentation. By instantly crawling any website and converting it into a queryable knowledge base, developers and knowledge workers get accurate, context-aware answers without leaving their workflow.

## Key Features

- **Instant Website Crawling**: Convert any documentation site into a searchable knowledge base in seconds
- **Local-First Architecture**: All data processing happens locally for maximum security and privacy
- **IDE Integration**: Seamlessly integrate with AI-powered IDEs like Cursor
- **Built-in Chat Interface**: Query your documentation through an intuitive chat experience
- **RAG-Powered Responses**: Get precise answers based on your specific documentation, not generic LLM knowledge
- **Always Current**: Re-crawl documentation to keep your knowledge base up-to-date

## Use Cases

- Access technical documentation without leaving your IDE
- Query internal wikis and knowledge bases privately
- Integrate company-specific information into your AI coding assistant
- Maintain up-to-date knowledge of framework documentation
- Search across multiple documentation sources simultaneously

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
