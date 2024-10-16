FROM node:18.19-alpine as builder


WORKDIR /app/build

COPY . .
# install dependencies
RUN yarn install
# build the app
RUN yarn build
# copy the build files to the nginx server



FROM nginx:1.23.4-alpine as runner

WORKDIR /app

COPY --from=builder /app/build/dist /app/www

COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf

ENV NODE_ENV=production

CMD ["nginx","-g","daemon off;"]
