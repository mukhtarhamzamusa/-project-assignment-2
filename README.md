Weekly Project 2 — Full-stack user signup

Quick start (Windows / cmd.exe):

1. Install dependencies:

```
npm install
```

2. Create a database and run the migration (example using psql):

```
REM create DB (run as a user with privileges)
psql -U postgres -c "CREATE DATABASE weekly_project_2;"

REM run the table migration
psql -U <your_pg_user> -d <your_database> -h <host> -f sql\init.sql
```

3. Create a `.env` file from `.env.example` and fill in credentials.

4. Start the server:

```
npm start
```

5. Open http://localhost:3000 in your browser and submit the form.

Endpoints:
- `POST /api/users` — accepts JSON `{name,email,department}` and stores a user.
- `GET /api/users` — returns recent users.

Notes:
- Ensure your PostgreSQL user has permission to create tables and insert rows.
- If using Docker/Postgres, set the `.env` accordingly and run the migration against that DB.
"# assignment-2" 
