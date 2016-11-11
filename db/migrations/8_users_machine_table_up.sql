create table users_machine(
	id SERIAL PRIMARY KEY NOT NULL,
	user_id int references users(id),
	machine_id int references machines(id),
	deleted_at timestamp,
	created_at timestamp not null default now(),
	modified_at timestamp
)
