FROM node:18 AS builder
WORKDIR /app
COPY nebulo/package*.json .
RUN npm install
COPY nebulo/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY local/nginx.prod.conf /etc/nginx/nginx.conf
