FROM nginx:1.13.8-alpine

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
COPY nginx.conf.template /etc/nginx/nginx.conf.tempate
COPY dist /usr/share/nginx/html
COPY entry-point.sh /run/entry-point.sh
RUN apk add --update --no-cache gettext && \
    chmod +x /run/entry-point.sh


ENTRYPOINT /run/entry-point.sh