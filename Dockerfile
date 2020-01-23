#FROM centos/httpd-24-centos7
#RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf
#COPY dist/angie/ /opt/rh/httpd24/root/var/www/html/
#EXPOSE 8080
FROM alpine:3.11.3
WORKDIR /node
#RUN apk add --no-cache curl
#RUN curl -o node.tar.xz https://nodejs.org/dist/v10.16.3/node-v10.16.3-linux-x64.tar.xz
#RUN tar --strip-components 1 -xvf node.tar.xz -C /usr/local
RUN apk add --update nodejs nodejs-npm

WORKDIR /app
COPY src ./src
COPY *.json ./
COPY *.ts ./
COPY *.js ./
COPY yarn.lock .
COPY .npmrc .
RUN npm install -g yarn
RUN yarn && yarn build:ssr

# Bygg imagen som ska köras
FROM alpine:3.11.3
WORKDIR /usr/local

# copies Node from build image
COPY --from=0 /usr/local/bin bin/
COPY --from=0 /usr/local/include include/

#copies the built webapp from build image
RUN groupadd Utvecklare && \
    useradd -g Utvecklare -s /bin/bash node && \
    mkdir -p /app/dist -p /app/logs && \
    chown -R node:Utvecklare /app
WORKDIR /app/dist
COPY --from=0 /app/dist .
WORKDIR /app

EXPOSE 4000
USER node
CMD ["node", "dist/server"]
