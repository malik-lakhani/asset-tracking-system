create table categories(
  id SERIAL PRIMARY KEY NOT NULL,
  category varchar(32) NOT NULL,
  description varchar(256),
  deleted_at timestamp,
  created_at timestamp not null default now(),
  modified_at timestamp
)
