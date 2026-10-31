FROM node:22-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
COPY .yarnrc.yml ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
COPY shared/package.json shared/package.json
RUN corepack enable && yarn install --immutable

COPY tsconfig.json tsconfig.base.json ./
COPY shared shared
COPY backend backend

RUN yarn build:shared && yarn workspace @music-tag/backend build

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package.json yarn.lock ./
COPY .yarnrc.yml ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
COPY shared/package.json shared/package.json
RUN corepack enable && yarn workspaces focus @music-tag/backend --production

COPY --from=build /app/backend/dist backend/dist
COPY --from=build /app/shared/dist shared/dist
COPY shared/package.json shared/package.json

EXPOSE 4000
CMD ["yarn", "workspace", "@music-tag/backend", "start"]
