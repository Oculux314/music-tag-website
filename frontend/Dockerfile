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
COPY frontend frontend

ARG VITE_BACKEND_URL=http://localhost:4000
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN yarn build:shared && yarn workspace @music-tag/frontend build

FROM nginx:1.29-alpine AS runner

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
