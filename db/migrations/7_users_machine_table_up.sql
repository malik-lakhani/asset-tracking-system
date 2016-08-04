create table users_machine(
	id SERIAL PRIMARY KEY NOT NULL,
	use_id int references users(id),
	machine_id int references machines(id),
	deleted_at timestamp,
	created_at timestamp,
	modified_at timestamp
)