-- SOSA Supabase Database Schema
-- Run these SQL commands in your Supabase SQL Editor
-- This script is idempotent: safe to run multiple times

drop table if exists contributions cascade;
drop table if exists gallery cascade;
drop table if exists posts cascade;
drop table if exists admin_users cascade;
drop table if exists events cascade;
drop table if exists profiles cascade;

-- 1. Alumni Directory Table (profiles)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  graduation_set text not null,
  profession text,
  city text,
  whatsapp_number text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- 2. Events Table
create table events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  event_date timestamp with time zone not null,
  location text not null,
  banner_url text,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table events enable row level security;

create policy "Events are viewable by everyone." on events
  for select using (true);

-- 3. Admin Users Table
create table admin_users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  role text default 'admin',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table admin_users enable row level security;

create policy "Admins can view admin list" on admin_users
  for select using (auth.uid() in (select id from admin_users));

-- 4. Blog / News Posts Table
create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  category text default 'News',
  author text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table posts enable row level security;

create policy "Posts are viewable by everyone." on posts for select using (true);
create policy "Admins can insert posts." on posts for insert with check (auth.uid() in (select id from admin_users));
create policy "Admins can delete posts." on posts for delete using (auth.uid() in (select id from admin_users));

-- 5. Gallery Table
create table gallery (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  image_url text not null,
  caption text,
  event_year text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table gallery enable row level security;

create policy "Gallery items are viewable by everyone." on gallery for select using (true);
create policy "Admins can insert gallery items." on gallery for insert with check (auth.uid() in (select id from admin_users));
create policy "Admins can delete gallery items." on gallery for delete using (auth.uid() in (select id from admin_users));

-- 6. Contributions Table (admin-only recording)
create table contributions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  amount numeric not null,
  period text not null,
  status text default 'pending',
  receipt_url text,
  verified_by uuid references auth.users on delete set null,
  verified_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table contributions enable row level security;

create policy "Users can view own contributions." on contributions
  for select using (auth.uid() = user_id);

create policy "Admins can insert contributions." on contributions
  for insert with check (auth.uid() in (select id from admin_users));

create policy "Admins can update contributions." on contributions
  for update using (auth.uid() in (select id from admin_users));

create policy "Admins can delete contributions." on contributions
  for delete using (auth.uid() in (select id from admin_users));
