
# Dinedash - Order food from comfort of your home

A web app to order food from the comfort of your home (Devcomm JC Task).


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_SUPABASE_URL`

`NEXT_PUBLIC_SUPABASE_ANON_KEY`


## Run Locally

Clone the project

```bash
  git clone https://github.com/ayshthkr/dinedash.git
```

Go to the project directory

```bash
  cd dinedash
```

Install dependencies

```bash
  bun install
```

Start the server

```bash
  bun run dev
```


## Screenshots

![App Tutorial Video](https://raw.githubusercontent.com/ayshthkr/dinedash/main/public/video.gif)


## Database Setup

You can use any postgres database using the script provided below
(Don't forget to create a public storage bucket from dashboard (last line won't work unless))

```sql
-- Create a table for public profiles
create table
  profiles (
    id uuid references auth.users on delete cascade not null primary key,
    updated_at timestamp with time zone,
    username text unique,
    email text unique constraint username_length check (char_length(username) >= 3)
  );

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles for
select
  using (true);

create policy "Users can insert their own profile." on profiles for insert
with
  check (
    (
      select
        auth.uid ()
    ) = id
  );

create policy "Users can update own profile." on profiles
for update
  using (
    (
      select
        auth.uid ()
    ) = id
  );

-- This trigger automatically creates a profile entry when a
-- new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user () returns trigger as $$
begin
  -- insert into public.profiles (id, full_name, avatar_url)
  insert into public.profiles (id, username, email)
  values (new.id, SPLIT_PART(new.email, '@', '1'), new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user ();


CREATE TABLE
  public.dishes (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text not null,
    description text,
    category text not null,
    price NUMERIC not null,
    prepTime NUMERIC not null,
    isVeg bool,
    imgUrl text not null,
    comments jsonb[] default '{}'::jsonb[],
    slug text unique
  );

alter table public.dishes enable row level security;

create policy "Enable read access for all users"
on public.dishes
as PERMISSIVE
for SELECT
to public
using (
  true
);

CREATE TABLE
    public.tickets (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name text not null,
        email text not null,
        message text not null,
        completed bool default false,
        created_at timestampz default now()
    );

alter table public.tickets enable row level security;

create policy "Enable read access for all users"
on public.tickets
as PERMISSIVE
for SELECT
to public
using (
  true
);

create policy "Enable insert for all users"
on public.tickets
as PERMISSIVE
for INSERT
to public
with check (
    true
);

CREATE POLICY "allow uploads" ON storage.objects
FOR INSERT TO public WITH CHECK (bucket_id = 'dishes');


```

## Tech Stack

[NextJS V14](https://nextjs.org/), [Supabase](https://supabase.com/), [ShadCN UI](https://ui.shadcn.com/)


## Deployment

To deploy this project

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fayshthkr%2Fdinedash&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY)


## Authors

- [@ayshthkr](https://www.github.com/ayshthkr)

