#!/bin/sh

if ["$FORWARD_PROTO" == ""]; then
    export FORWARD_PROTO=http
fi

envsubst '$API_URL,$FORWARD_PROTO' < /etc/nginx/nginx.conf.tempate > /etc/nginx/nginx.conf

/usr/sbin/nginx -g 'daemon off;'