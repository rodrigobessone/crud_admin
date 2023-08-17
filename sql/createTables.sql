-- Tabela de Usuários
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(120) NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false
);

-- Tabela de Cursos
CREATE TABLE "courses" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL
);

-- Tabela de Relacionamento entre Usuários e Cursos
CREATE TABLE "userCourses" (
    "id" SERIAL PRIMARY KEY,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" INT NOT NULL,
    "courseId" INT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE
);

