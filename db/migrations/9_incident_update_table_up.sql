create table incident_update (
	id SERIAL PRIMARY KEY NOT NULL,
	incident_id int references incidents(id),
	component_id int references components(id),
  updated_by varchar(32),
	description text,
  resolved_by varchar(32),
	created_at timestamp not null default now(),
	modified_at timestamp
)
