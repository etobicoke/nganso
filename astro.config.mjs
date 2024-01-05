import { defineConfig } from 'astro/config';
import path from 'path';

// https://astro.build/config
export default defineConfig({
    site: 'https://etobicoke.github.io',
    markdown: {
        // Can be 'shiki' (default), 'prism' or false to disable highlighting
        syntaxHighlight: 'prism'
    },
    vite: {
        resolve: {
            alias: {
                // Define your aliases here
                '@components': path.resolve('./src/components'),
                '@styles': path.resolve('./src/styles'),
                // You can add more aliases as needed
            },
        },
    },
});
