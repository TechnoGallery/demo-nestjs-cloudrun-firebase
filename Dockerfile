ARG WORKDIR=/app

# Create a stage for installing production dependecies.
FROM node:20-alpine as base

ARG WORKDIR
WORKDIR ${WORKDIR}

RUN corepack enable
RUN corepack prepare pnpm@latest-8 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Create a stage for building the application.
FROM base as build

ARG WORKDIR
WORKDIR ${WORKDIR}

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# Create a new stage to run the application with minimal runtime dependencies
FROM base as final

ARG WORKDIR
WORKDIR ${WORKDIR}

COPY --from=build ${WORKDIR}/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start:prod"]
