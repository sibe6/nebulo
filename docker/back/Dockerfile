FROM node:18 AS express
WORKDIR /app
COPY nebulo-backend/package*.json .
RUN npm install
COPY nebulo-backend/ .

CMD ["npm", "start"]