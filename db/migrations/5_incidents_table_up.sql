create table incidents(
	id SERIAL PRIMARY KEY NOT NULL,
	component_id int references components(id),
	title text,
	description text,
	status varchar(16) NOT NULL,
	resolved_at timestamp,
	created_at timestamp,
	modified_at timestamp
)