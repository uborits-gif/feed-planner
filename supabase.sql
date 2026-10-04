-- Feed Planner · tabla para sincronizar entre dispositivos.
-- Pegar en Supabase → SQL Editor → Run.

create table if not exists feed (
  id          text primary key,
  datos       jsonb not null,
  actualizado timestamptz not null default now()
);

alter table feed enable row level security;

-- Un solo usuario (vos) con la clave anon. Si el proyecto llega a tener
-- más gente, conviene reemplazar esto por políticas con auth.
drop policy if exists "acceso con clave anon" on feed;
create policy "acceso con clave anon" on feed
  for all to anon
  using (true) with check (true);
