import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { error } = await supabase.rpc("exec_sql", {
  query: `
    CREATE TABLE IF NOT EXISTS public.guests (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      item TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );

    ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'guests' AND policyname = 'Allow public read') THEN
        CREATE POLICY "Allow public read" ON public.guests FOR SELECT USING (true);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'guests' AND policyname = 'Allow public insert') THEN
        CREATE POLICY "Allow public insert" ON public.guests FOR INSERT WITH CHECK (true);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'guests' AND policyname = 'Allow public delete') THEN
        CREATE POLICY "Allow public delete" ON public.guests FOR DELETE USING (true);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'guests' AND policyname = 'Allow public update') THEN
        CREATE POLICY "Allow public update" ON public.guests FOR UPDATE USING (true);
      END IF;
    END $$;
  `,
});

if (error) {
  console.error("Migration failed:", error.message);
  process.exit(1);
} else {
  console.log("Migration succeeded: guests table created with RLS policies.");
}
