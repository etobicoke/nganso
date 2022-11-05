import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://etobicoke.github.io',
    markdown: {
        // Can be 'shiki' (default), 'prism' or false to disable highlighting
        syntaxHighlight: 'prism',
    },
});
