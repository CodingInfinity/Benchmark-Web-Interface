FROM httpd:2.4-alpine

MAINTAINER Andrew Broekman

COPY ./dist /usr/local/apache2/htdocs
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf

EXPOSE 80
