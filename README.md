# Supabase + Next.js + Tailwind + Flowbite

This template uses [Supabase](https://supabase.com/docs), [Next.js](https://nextjs.org/docs), and [Flowbite](https://flowbite.com/docs). Refer to their respective documentation for more information on how to use them effectively.

This project is not intended to serve as documentation for Supabase or Next.js, except for providing some basic commands to get you started. For comprehensive guidance, please consult the official documentation.

**Important: Docker is required to run Supabase locally, and it requires at least 7GB of memory.**

## First Steps

1. **Create a New Project in Supabase**

2. **Configure Authentication**

   - Create new projects in Google and Facebook developer platforms to retrieve the authentication keys.
   - Link these keys to the Supabase Auth UI.

3. **Environment Configuration**

   - Copy `.env.local-example` to a new file named `.env.local` and replace the placeholder variables with your own values.

4. **Install Dependencies**
   - Run `npm install --include=optional` to install all necessary dependencies.

## Run Supabase Locally

For a quick setup, we use `npx`.

1. **Start Supabase**

   - Run `npx supabase start` (Docker must be running locally with at least 7GB of RAM available).
   - After this step, you'll see output containing your local Supabase credentials. Use `npx supabase status` to retrieve these credentials again if needed.

2. **Connect Supabase to a Local Database**

   - Login with `npx supabase login`.
   - Link your project with `npx supabase link --project-ref <reference-id>` (Find the reference ID in the Supabase Dashboard of your project).

3. **Migrations**

   - For database migration guidance, refer to the [Supabase Database Migration Guide](https://supalaunch.com/blog/nextjs-supabase-database-migration-guide).

   - Create a new migration: `npx supabase migration new create_new_migration_name` and edit the migration file as needed.

   - Apply migrations remotely (this also runs seeds):

     - `npx supabase db reset --linked`

   - Apply migrations locally (this also runs seeds):
     - `npx supabase db reset --local`

## New DB Migration and Push Changes from Local to Supabase

Before starting, it is recommended to pull the latest changes from Supabase.

1. **Pull Changes**

   - Use `npx supabase db pull` to synchronize changes to your local environment (creates a new migration with changes if they exist).

2. **Create and Apply a New Migration**

   - Create a new migration: `npx supabase migration new create_new_migration_name` and edit the migration file in `./supabase/migrations/`.

3. **Apply Migrations Locally**

   - Run `npx supabase db reset --local`.

4. **Apply Migrations on Supabase**

   - Run `npx supabase db reset --linked`.

   - If neither `--local` nor `--linked` is specified, `--local` will be used by default.

## New DB Migration and Pull Changes from Supabase to Local

1. **Create a New Database in Supabase**

2. **Pull Changes**

   - Use `npx supabase db pull` to synchronize changes to your local environment (creates a new migration with changes).

3. **Apply Migrations Locally**
   - Run `npx supabase db reset --local`.

## FAQ

- **'Not Healthy Checks' Issue**

  - If you encounter problems with 'not healthy checks' when running `npx supabase start`, try disabling them: `npx supabase start --ignore-health-check`.

- **Node.js Version**

  - Ensure you are using Node.js version 20.

- **Creating Triggers in Supabase**

  - Triggers can no longer be created on private tables via the Supabase UI. To resolve this, go to the "SQL Editor" and use the following command, for example:

    ```sql
    CREATE TRIGGER on_auth_insert_users
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION insert_user_in_public_table_for_new_user();
    ```

    - Then click **RUN** in the bottom-right corner (or press **Ctrl + Enter**) to create the trigger successfully.

- **Viewing PostgreSQL Logs**
  - To view logs related to PostgreSQL, navigate to **Logs > Postgres**.
