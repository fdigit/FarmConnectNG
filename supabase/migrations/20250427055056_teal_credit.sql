/*
  # Create products table and policies

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `farmer_id` (uuid, references profiles)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `unit` (text)
      - `quantity` (integer)
      - `category` (text)
      - `images` (text array)
      - `available` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `products` table
    - Add policies for:
      - Public can view all products
      - Farmers can manage their own products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  unit text NOT NULL,
  quantity integer NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  category text NOT NULL,
  images text[] DEFAULT ARRAY[]::text[],
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view all products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Farmers can manage their own products"
  ON products
  FOR ALL
  TO authenticated
  USING (auth.uid() = farmer_id)
  WITH CHECK (auth.uid() = farmer_id);