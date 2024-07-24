FROM node:22 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN echo "Running npm run build"
RUN npm run build
RUN echo "Build completed"

FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
