FROM centos/httpd-24-centos7
#RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf
COPY dist/angie/ /usr/local/apache2/htdocs
#EXPOSE 8080
