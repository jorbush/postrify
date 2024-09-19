![Postrify](/docs/design/postrify_logo_dark_nobg.png)

A microblogging social network built with Angular, Spring Boot (Java), Kafka, J2EE and PostgreSQL.

Spring Boot backend uses MVC architecture.

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
