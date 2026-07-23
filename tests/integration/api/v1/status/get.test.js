test("/api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});

test("/api/v1/status should return updatedAt", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json(); // parsing para JSON do response
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
});

test("/api/v1/status should return DB version", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.dependencies.database.version).toEqual("16.0");
});

test("/api/v1/status should return DB max connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.max_connections).toEqual(100);
});

test("/api/v1/status should return DB opened connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.opened_connections).toEqual(1);
});
