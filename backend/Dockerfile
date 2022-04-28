FROM openjdk:17
EXPOSE 8443
ADD target/elasticsearch-logs-backend.jar elasticsearch-logs-backend.jar
ENTRYPOINT ["java","-jar","--enable-preview","elasticsearch-logs-backend.jar"]