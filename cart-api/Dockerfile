FROM node:14-alpine as builder
WORKDIR /app
ENV NODE_ENV=production
COPY ["./package.json", "./package-lock.json", "/app/"]
RUN npm ci && npm cache clean --force
COPY "./" "/app/"

## compile typescript
RUN npm run build

## remove packages of devDependencies
RUN npm prune --production


FROM node:14-alpine as runtime

WORKDIR /app
ENV NODE_ENV=production
## Copy the necessary files form builder
COPY --from=builder "/app/dist/" "/app/dist/"
COPY --from=builder "/app/node_modules/" "/app/node_modules/"
COPY --from=builder "/app/package.json" "/app/package.json"

CMD ["npm", "run", "start:prod"]
