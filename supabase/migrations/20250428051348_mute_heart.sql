/*
  # Fix auth and profiles table relationship

  1. Changes
    - Create auth.users table if it doesn't exist
    - Fix foreign key relationship between profiles and auth.users

  2. Security
    - Enable RLS on auth.users table if not already enabled
    - Add policy for authenticated users to read their own data if not exists
*/

-- Create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_tables
    WHERE schemaname = 'auth'
    AND tablename = 'users'
    AND rowsecurity = true
  ) THEN
    ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Add RLS policy if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'auth'
    AND tablename = 'users'
    AND policyname = 'Users can read own data'
  ) THEN
    CREATE POLICY "Users can read own data"
      ON auth.users
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;

-- Ensure the profiles table foreign key references the correct table
DO $$ 
BEGIN
  -- Drop the existing foreign key if it exists
  IF EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_id_fkey'
  ) THEN
    ALTER TABLE public.profiles DROP CONSTRAINT profiles_id_fkey;
  END IF;
  
  -- Add the correct foreign key constraint
  ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_id_fkey 
    FOREIGN KEY (id) 
    REFERENCES auth.users(id) 
    ON DELETE CASCADE;
END $$;