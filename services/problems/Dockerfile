FROM node:18-alpine

WORKDIR /app

COPY packages/shared /app/packages/shared

COPY services/problems/package*.json ./
RUN npm install --production
COPY services/problems/ ./

EXPOSE 3002
CMD ["node", "src/server.js"]
