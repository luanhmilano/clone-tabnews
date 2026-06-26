import database from "infra/database.js";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbVersionResponse = await database.query("SELECT version();");
  const dbVersion = dbVersionResponse.rows[0].version;

  const dbMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = Number.parseInt(
    dbMaxConnections.rows[0].max_connections,
  );

  const dbName = process.env.POSTGRES_DB;
  const dbOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName],
  });
  const openedConnections = dbOpenedConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    version: dbVersion,
    max_connections: maxConnections,
    opened_connections: openedConnections,
  });
}
