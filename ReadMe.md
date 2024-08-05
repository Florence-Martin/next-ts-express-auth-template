## Résumé de la Configuration et des Tests d’une Application Node.js avec TypeScript, TypeORM, et Jest

#### 1. Création et Configuration du Projet

Initialisation du Projet

- Création d’un projet Node.js avec TypeScript.
- Installation des dépendances : typescript, ts-node, typeorm, express, jest, ts-jest, reflect-metadata, etc.

Configuration de TypeScript (tsconfig.json)

- Définition des options du compilateur :
  • target: "ES6"
  • module: "commonjs"
  • strict: true
  • esModuleInterop: true
  • experimentalDecorators: true
  • emitDecoratorMetadata: true

#### 2. Définition des Entités avec TypeORM

Création d’une **Entité User**

Utilisation des décorateurs TypeORM pour définir les colonnes et la clé primaire, et intégration des validateurs class-validator.

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  provider!: string;
}
```

#### 3. Configuration de Jest pour les Tests

Installation et Configuration de **Jest**

- Installation de **jest** et **ts-jest**.
- Création d’un fichier **jest.config.js** :

```js
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: "<rootDir>/",
  }),
  setupFilesAfterEnv: ["<rootDir>/tests/unit/jest-setup.ts"],
};
```

#### 4. Initialisation de la Connexion à la Base de Données pour les Tests

Fichier **jest-setup.ts**

Initialisation de la connexion TypeORM à une base de données de test.

```ts
import { createConnection, getConnection } from "typeorm";

beforeAll(async () => {
  await createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: ["src/entity/*.ts"],
    synchronize: true,
    logging: false,
  });
});

afterAll(async () => {
  const connection = getConnection();
  await connection.close();
});
```

#### 5. Réalisation des Tests Unitaires

Écriture des Tests

Création d’un fichier de test **user.test.ts** :

```ts
import { getRepository } from "typeorm";
import { User } from "../../src/entity/User";

describe("User Entity", () => {
  it("should create a new user", async () => {
    const userRepository = getRepository(User);

    const newUser = userRepository.create({
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword123",
      provider: "google",
    });

    await userRepository.save(newUser);

    const savedUser = await userRepository.findOne({
      where: { email: "test@example.com" },
    });
    expect(savedUser).toBeDefined();
    expect(savedUser?.name).toBe("Test User");
  });
});
```

#### 6. Exécution des Tests

- Utilisation de la commande **npm test** ou **npx jest** pour exécuter les tests.
- Gestion des erreurs possibles comme ConnectionNotFoundError.

**Points Clés**

- Isolation des Tests : Utilisation de **SQLite** en mémoire pour garantir que les tests sont isolés.
- Structure de Projet : Organisation claire pour faciliter la maintenance.
- Utilisation de TypeScript et Jest : Configuration pour le support TypeScript, assurant la gestion correcte des chemins de module et des configurations spécifiques.
