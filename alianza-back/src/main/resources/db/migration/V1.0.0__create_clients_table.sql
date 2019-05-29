-- Table Definition ----------------------------------------------

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    shared_key character varying(255),
    business_id character varying(255),
    email character varying(255),
    phone bigint ,
    created_at timestamp(0) without time zone DEFAULT now() ,
);

-- Index -------------------------------------------------------

CREATE INDEX clients_shared_key_indec ON clients(shared_key);

-- INit Data

INSERT into clients (shared_key, business_id, email, phone) VALUES ('danyjavierb','dany bautista','danyjavierb@gmail.com',3134097921 );
INSERT into clients (shared_key, business_id, email, phone) VALUES ('javier','javier montana','javiermontana@gmail.com',3112119737 );