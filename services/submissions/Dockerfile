FROM node:18-alpine

WORKDIR /app

COPY packages/shared /app/packages/shared

COPY services/submissions/package*.json ./
RUN npm install --production
COPY services/submissions/ ./

EXPOSE 3003
CMD ["node", "src/server.js"]
