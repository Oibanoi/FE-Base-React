FROM node:16 as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . ./
RUN yarn build

# Docker image for Webapp
FROM nginx:1.15.5-alpine as webapp
LABEL maintainer="Teko development"

WORKDIR /app
COPY etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY etc/*.js /app/etc/
COPY etc/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
COPY --from=builder /app/build /app/www

ENTRYPOINT [ "entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]
