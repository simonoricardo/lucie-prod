# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.16.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app

ENV NODE_ENV="production"

FROM base as build

RUN corepack enable
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY --link . .

RUN pnpm add @strapi/typescript-utils
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM base

COPY --from=build /app /app

RUN corepack enable
EXPOSE 3000
CMD [ "pnpm", "run", "start" ]
