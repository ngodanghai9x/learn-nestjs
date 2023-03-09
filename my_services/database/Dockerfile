FROM mysql:8.0.32

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=test

COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

EXPOSE 3306