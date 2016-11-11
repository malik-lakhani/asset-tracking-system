create table machines(
	id SERIAL PRIMARY KEY NOT NULL,
	name varchar(256) NOT NULL,
	deleted_at timestamp,
	created_at timestamp not null default now(),
	modified_at timestamp
)