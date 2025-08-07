create table if not exists example_table (
    id serial primary key,
    name text not null,
    created_at timestamp with time zone default now()
);

insert into example_table (name) values ('Sample Name');