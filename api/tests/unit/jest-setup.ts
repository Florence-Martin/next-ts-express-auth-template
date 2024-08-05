import { createConnection, getConnection } from "typeorm";

beforeAll(async () => {
  await createConnection({
    type: "sqlite", // Utilisez SQLite pour les tests, car il ne nécessite pas de serveur
    database: ":memory:", // Utilisation d'une base de données en mémoire
    dropSchema: true, // Supprimer le schéma entre les tests
    entities: ["src/entity/*.ts"], // Assurez-vous que le chemin est correct
    synchronize: true, // Synchroniser les schémas
    logging: false,
  });
});

afterAll(async () => {
  const connection = getConnection();
  await connection.close();
});
