FROM node:18-alpine

WORKDIR /app

COPY services/gateway/package*.json ./
RUN npm install --production
COPY services/gateway/ ./

EXPOSE 3000
CMD ["node", "src/server.js"]
