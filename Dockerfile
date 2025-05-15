# Stage 1: Build frontend
FROM node:18 AS frontend-builder
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build backend
FROM maven:3.9-eclipse-temurin-22 AS backend-builder
WORKDIR /backend
COPY backend/pom.xml ./
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 3: Final container
FROM eclipse-temurin:22

# Установка nginx и supervisor
RUN apt update && apt install -y nginx supervisor

# Рабочая директория
WORKDIR /app

# Копируем backend JAR
COPY --from=backend-builder /backend/target/*.jar app.jar

# Копируем frontend статику
COPY --from=frontend-builder /frontend/build /usr/share/nginx/html

# Копируем конфиг nginx и supervisor
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
