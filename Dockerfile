FROM centos/httpd-24-centos7
#RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf
COPY dist/angie/ /opt/rh/httpd24/root/var/www/html/
EXPOSE 80
