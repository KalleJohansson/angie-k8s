FROM httpd:2.4
COPY dist/angie/ /usr/local/apache2/htdocs
EXPOSE 80
