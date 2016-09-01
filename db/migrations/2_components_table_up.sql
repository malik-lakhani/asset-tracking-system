create table components(
	id SERIAL PRIMARY KEY NOT NULL,
	invoice_id int references invoices(id),
	name varchar(256) NOT NULL,
	warranty_till date NOT NULL,
	description varchar(256),
	active boolean,
	deleted_at timestamp,
	created_at timestamp not null default now(),
	modified_at timestamp
)