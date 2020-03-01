FROM java:8-jre
MAINTAINER Jiaxin Sun, Yifan Chen

ADD ./target/seatMe.jar/app/
CMD ["java", "-Xmx200m", "-jar", "/app/seatMe.jar"]

EXPOSE 8080