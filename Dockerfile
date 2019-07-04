FROM httpd:2.4
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
COPY dist/angie/ /usr/local/apache2/htdocs
EXPOSE 80
