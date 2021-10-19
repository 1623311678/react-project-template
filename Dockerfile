FROM node:12 as package
WORKDIR /app
RUN echo $DEPLOY_ENV
COPY package*.json ./
RUN npm i

FROM package as builder
ARG DEPLOY_ENV
ENV DEPLOY_ENV=$DEPLOY_ENV
COPY . .
RUN npm run build

FROM google/cloud-sdk
COPY --from=builder /app/build/ /app/
RUN gsutil -m rsync -r /app/dashboard gs://gaea-static-prod/admin/static

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /app/
