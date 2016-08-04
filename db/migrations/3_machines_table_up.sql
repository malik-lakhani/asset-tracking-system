create table machines(
	id SERIAL PRIMARY KEY NOT NULL,
	name varchar(256) NOT NULL,
	created_at timestamp,
	modified_at timestamp,
	deleted_at timestamp NOT NULL
)