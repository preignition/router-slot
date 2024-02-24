import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        // environment: 'happy-dom',
        // globals: true,
        // // include: ['src/test/router.test.ts','src/test/history.test.ts', 'src/test/anchor.test.ts' ],
        // include: [ 'src/test/router-slot.test.ts' ],
        // include: ['src/test/router.test.ts','src/test/history.test.ts' ],
        browser: {
            enabled: true,
            name: 'chrome',
        },
    },
});
//# sourceMappingURL=vite.config.js.map