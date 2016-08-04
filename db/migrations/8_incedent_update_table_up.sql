create table incedent_update(
	id SERIAL PRIMARY KEY NOT NULL,
	incedent_id int references incedent(id),
	component_id int references components(id),
	description text,
	created_at timestamp,
	modified_at timestamp
)