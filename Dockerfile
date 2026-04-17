# Etapa 1: instalar dependencias
FROM node:22.16.0-alpine3.21 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Etapa 2: build de la app
FROM node:22.16.0-alpine3.21 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Etapa 3: imagen final para producción
FROM node:22.16.0-alpine3.21 AS runner
WORKDIR /usr/src/app

# Copiar archivos necesarios
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Re-generar el cliente Prisma en el entorno de producción
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
RUN npx prisma db pull
RUN npx prisma generate


# Correr la app
CMD [  "npm", "run", "start:build:dev" ]
