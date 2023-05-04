import { defineConfig } from 'vitest/config'
import tscondigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tscondigPaths()],
    test: {
        environmentMatchGlobs: [
            ['src/http/controllers/**', 'prisma']
        ],
    },
})