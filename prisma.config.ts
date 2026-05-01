import path from 'path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: "postgresql://postgres:postgres@localhost:5432/sensante?schema=public",
  },
})