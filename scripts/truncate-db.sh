#!/bin/sh

function dotenv()
{
  grep .env -P -e "(?<=$1=).+" -o
}

# Get environment variables
username=$(dotenv "DATABASE_USERNAME")
password=$(dotenv "DATABASE_PASSWORD")
host=$(dotenv "DATABASE_HOST")
port=$(dotenv "DATABASE_PORT")
db_name=$(dotenv "DATABASE_NAME")

# Create connection string
connection_str="postgres://${username}:${password}@${host}:${port}/${db_name}"
connection_str=${connection_str//$'\r'}

truncate_all="DO \$\$ DECLARE
    table_name text;
BEGIN
    FOR table_name IN (SELECT tablename FROM pg_tables WHERE schemaname='public') LOOP
        EXECUTE 'TRUNCATE TABLE ' || table_name || ' CASCADE;';
    END LOOP;
END \$\$;"

psql $connection_str -c "$truncate_all"


