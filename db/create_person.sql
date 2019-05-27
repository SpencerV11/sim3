insert into people (
    username,
    password
) values (
    $1,
    $2
);

select username from people;