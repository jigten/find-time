FROM node:16.14.2-alpine as client
WORKDIR /var/www/client
COPY ./packages/client .
RUN yarn
RUN yarn build

FROM nginx
COPY --from=client /var/www/client/build /var/www/ft
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
