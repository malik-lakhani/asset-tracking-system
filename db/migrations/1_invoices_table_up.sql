create table invoices(
	id SERIAL PRIMARY KEY NOT NULL,
	invoice_number varchar(32) NOT NULL,
	invoicer_name varchar(256) NOT NULL,
	invoicer_add varchar(1024),
	invoicer_contact varchar(32),
	description varchar(256),
	invoice_date date NOT NULL,
	created_at timestamp not null default now(),
	modified_at timestamp
)