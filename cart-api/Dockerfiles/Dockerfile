FROM node:12-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

WORKDIR /app

COPY . .
RUN npm run build

FROM node:12-alpine AS application

COPY --from=base /app/package*.json ./
RUN npm install --only=production
RUN npm install pm2 -g
COPY --from=base /app/dist ./dist

ENV PORT=8080
EXPOSE 8080

CMD ["pm2-runtime", "dist/main.js"]
