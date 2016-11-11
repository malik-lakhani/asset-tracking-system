create table incidents(
	id SERIAL PRIMARY KEY NOT NULL,
	component_id int references components(id),
	recorder varchar(32) NOT NULL,
	title text,
	description text,
	status varchar(16) NOT NULL,
	resolved_at timestamp,
	created_at timestamp not null default now(),
	modified_at timestamp
)