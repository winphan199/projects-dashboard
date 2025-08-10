-- 1. CREATE THE TABLE
CREATE TABLE IF NOT EXISTS public.accounts (
  id uuid NOT NULL PRIMARY KEY,
  name text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone, -- Let the trigger handle the default
  email text UNIQUE,
  picture_url text
);

-- 2. SETUP RLS AND PERMISSIONS
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

-- Link the table to auth.users for data integrity.
ALTER TABLE public.accounts ADD CONSTRAINT "accounts_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.accounts TO authenticated;
GRANT ALL ON TABLE public.accounts TO service_role;

-----------------------------------------------------------------------------------------------

-- 3. CREATE RLS POLICIES
-- Simplified and consolidated policies.

CREATE POLICY "Users can view their own account"
ON public.accounts FOR SELECT
TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert their own account"
ON public.accounts FOR INSERT
TO authenticated WITH CHECK (auth.uid() = id);

-- A single, secure UPDATE policy.
CREATE POLICY "Users can update their own account"
ON public.accounts FOR UPDATE
TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own account"
ON public.accounts FOR DELETE
TO authenticated USING (auth.uid() = id);

-----------------------------------------------------------------------------------------------

-- 4. CREATE FUNCTIONS AND TRIGGERS

-- A. Automatically create an account when a new user signs up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.accounts (id, email, name, picture_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'name',
    'https://avatar.iran.liara.run/public/' || new.id
  );
  RETURN new;
END;
$$;

-- B. Automatically update the 'updated_at' timestamp on modification.
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$;

-----------------------------------------------------------------------------------------------

-- 5. ATTACH TRIGGERS TO THE TABLE

-- Attaching the trigger for new user creation (THIS WAS MISSING).
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Attaching the trigger for the updated_at column.
CREATE TRIGGER on_account_updated
  BEFORE UPDATE ON public.accounts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();