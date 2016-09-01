create table machine_components(
	id SERIAL PRIMARY KEY NOT NULL,
	machine_id int references machines(id),
	component_id int references components(id),
	deleted_at timestamp,
	created_at timestamp not null default now(),
	modified_at timestamp
)