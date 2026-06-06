FROM node:18-alpine

WORKDIR /app

COPY packages/shared /app/packages/shared

COPY services/execution/package*.json ./
RUN npm install --production
COPY services/execution/ ./

EXPOSE 3004
CMD ["node", "src/server.js"]
