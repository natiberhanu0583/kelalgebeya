// prisma/config.ts  (Prisma v7 configuration file)
import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
});
