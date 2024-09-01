DROP TABLE IF EXISTS belong_team, agency, address, service, team, expense, demand, users, role, own_role, notification;

CREATE TABLE address
(
    id           BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    street       VARCHAR(50),
    streetNumber VARCHAR(50),
    locality     VARCHAR(50),
    zipcode      VARCHAR(50),
    lat          DECIMAL(15, 10),
    lng          DECIMAL(15, 10),
    PRIMARY KEY (id)
);

CREATE TABLE role
(
    id    BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    label VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE users
(
    id          BIGINT UNIQUE      NOT NULL AUTO_INCREMENT,
    email       VARCHAR(50) UNIQUE NOT NULL,
    password    VARCHAR(255),
    country     VARCHAR(255),
    phone       VARCHAR(50),
    firstname   VARCHAR(50),
    lastname    VARCHAR(50),
    id_address  BIGINT,
    nationality VARCHAR(50),
    iban        VARCHAR(50),
    bic         VARCHAR(50),
    active      BOOLEAN            NOT NULL DEFAULT TRUE,
    created_at  DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ca          INT,
    tt          INT,
    rtt         INT,
    image_key   VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (id_address) REFERENCES address (id)
);

CREATE TABLE demand
(
    id            BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    start_date    DATE,
    end_date      DATE,
    motivation    VARCHAR(50),
    justification VARCHAR(255)  NULL,
    created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status        VARCHAR(50),
    type          VARCHAR(50),
    number_day    INT,
    file_key      VARCHAR(255),
    id_owner      BIGINT        NOT NULL,
    id_validator  BIGINT        NULL,
    validated_at  DATETIME      NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_owner) REFERENCES users (id),
    FOREIGN KEY (id_validator) REFERENCES users (id)
);

CREATE TABLE expense
(
    id               BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    type             VARCHAR(50),
    amount           FLOAT,
    motivation       VARCHAR(50),
    justification    VARCHAR(50)   NULL,
    created_at       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    facturation_date DATE          NOT NULL,
    status           VARCHAR(50)   NOT NULL DEFAULT 'WAITING',
    id_owner         BIGINT        NOT NULL,
    id_validator     BIGINT        NULL,
    file_key         VARCHAR(255)  NULL,
    validated_at     DATETIME      NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_owner) REFERENCES users (id),
    FOREIGN KEY (id_validator) REFERENCES users (id)
);


CREATE TABLE agency
(
    id         BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    label      VARCHAR(50),
    id_address BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_address) REFERENCES address (id)
);

CREATE TABLE service
(
    id                   BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    label                VARCHAR(50),
    minimum_users        INT,
    id_user_lead_service BIGINT        NOT NULL,
    id_agency            BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_agency) REFERENCES agency (id),
    FOREIGN KEY (id_user_lead_service) REFERENCES users (id)
);

CREATE TABLE team
(
    id                BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    label             VARCHAR(50),
    minimum_users     INT,
    id_user_lead_team BIGINT        NOT NULL,
    id_service        BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user_lead_team) REFERENCES users (id),
    FOREIGN KEY (id_service) REFERENCES service (id)
);

CREATE TABLE belong_team
(
    id_team BIGINT,
    id_user BIGINT,
    PRIMARY KEY (id_team, id_user),
    FOREIGN KEY (id_team) REFERENCES team (id),
    FOREIGN KEY (id_user) REFERENCES users (id)
);

CREATE TABLE own_role
(
    id_user BIGINT,
    id_role BIGINT,
    PRIMARY KEY (id_user, id_role),
    FOREIGN KEY (id_user) REFERENCES users (id),
    FOREIGN KEY (id_role) REFERENCES role (id)
);

CREATE TABLE notification
(
    id          BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    description VARCHAR(255),
    type        VARCHAR(50),
    id_receiver BIGINT        NOT NULL,
    id_sender   BIGINT,
    touched     BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (id_receiver) REFERENCES users (id)
)
