![Postrify](/docs/design/postrify_logo_dark_nobg.png)

A microblogging social network built with Angular, Spring Boot (Java), Kafka, J2EE and PostgreSQL.

### Architecture

The frontend is a SPA built with Angular and deployed in Vercel (https://postrify.vercel.app/). The backend is a REST API built with Spring Boot (using Java) and deployed in Fly.io (https://postrify-backend.fly.dev/). The frontend and backend communicate through HTTPS requests. The backend is connected to a PostgreSQL database hosted in Supabase.

![Architecture](docs/architecture/architecture.png)

For development environment, the frontend is served by a local server running in port 4200. The backend is served by another local server running in port 8080. The frontend and backend communicate through HTTP requests. The backend is connected to a PostgreSQL database running locally in port 5432.

### Frontend

```bash
cd postrify-frontend
```

#### Development server

```bash
ng serve
```

#### Build production

```bash
ng build --configuration production
```

#### Linter

```bash
ng lint
```

#### Unit tests

```bash
npm test -- --no-watch --no-progress --browsers=ChromeHeadless
```

#### Format code

```bash
npm run format
```

### Backend

```bash
cd postrify-backend
```

Spring Boot backend uses MVC architecture.

#### Run backend

```bash
./mvnw spring-boot:run
```
Or:
```bash
./mvnw clean package
java -jar target/postrify-0.0.1-SNAPSHOT.jar
```

#### Run tests

```bash
./mvnw test
```

#### Linter

```bash
./mvnw checkstyle:check
```

#### Format code

```bash
./mvnw spotless:apply
```
