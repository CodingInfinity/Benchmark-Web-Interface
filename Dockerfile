FROM httpd:2.4-alpine

MAINTAINER Andrew Broekman

COPY ./dist /usr/local/apache2/htdocs

EXPOSE 80
