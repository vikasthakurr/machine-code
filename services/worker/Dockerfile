FROM node:18-alpine

WORKDIR /app

COPY services/worker/package*.json ./
RUN npm install --production
COPY services/worker/ ./

CMD ["node", "src/server.js"]
