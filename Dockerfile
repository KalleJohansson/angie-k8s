FROM centos/httpd-24-centos7
#RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf
COPY dist/angie/ /wwwdata/html
#EXPOSE 8080
