FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /app/index.html /usr/share/nginx/html
COPY --from=build-stage /app/style.css /usr/share/nginx/html
COPY --from=build-stage /app/dist /usr/share/nginx/html/dist

EXPOSE 80