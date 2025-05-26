FROM node:18 AS frontend-builder
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM maven:3.9-eclipse-temurin-22 AS backend-builder
WORKDIR /backend
COPY backend/pom.xml ./
COPY backend/src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:22

RUN apt update && apt install -y nginx

WORKDIR /app

COPY --from=backend-builder /backend/target/*.jar app.jar

COPY --from=frontend-builder /frontend/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 8080

CMD sh -c "java -jar /app/app.jar & nginx -g 'daemon off;'"