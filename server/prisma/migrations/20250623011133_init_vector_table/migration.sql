-- Enable pgvector extension
create extension if not exists vector;

-- Create your table
create table "vectorStore" (
  id uuid primary key default gen_random_uuid(),
  chunk text not null,
  metadata jsonb not null,
  embedding vector(384) not null,
  "createdAt" timestamp default now()
);

-- Create ivfflat index for cosine similarity
create index on "vectorStore" using ivfflat (embedding vector_cosine_ops) with (lists = 100);
