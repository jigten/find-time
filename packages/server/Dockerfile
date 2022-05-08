FROM node:16.14.2-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
RUN npx prisma generate
CMD ["yarn", "prod"]
