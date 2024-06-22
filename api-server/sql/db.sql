DROP TABLE IF EXISTS belong_team_service, belong_service, belong_team, equipment, location_contract, agency, insurance_contract, insurance_company, address, service, team, document, logs, expense, absence, demand, localisation, users;

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

CREATE TABLE users
(
    id          BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    email       VARCHAR(50),
    password    VARCHAR(255),
    country     VARCHAR(255),
    phone       VARCHAR(50),
    firstname   VARCHAR(50),
    lastname    VARCHAR(50),
    id_address  BIGINT,
    nationality VARCHAR(50),
    role        VARCHAR(50),
    iban        VARCHAR(50),
    bic         VARCHAR(50),
    active      BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (id_address) REFERENCES address (id)
);

CREATE TABLE demand
(
    id                      BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    startDate               DATE,
    endDate                 DATE,
    motivation              VARCHAR(50),
    createdAt               DATE,
    status                  VARCHAR(50),
    type                    VARCHAR(50),
    id_user_create_demand   BIGINT        NOT NULL,
    id_user_validate_demand BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user_create_demand) REFERENCES users (id),
    FOREIGN KEY (id_user_validate_demand) REFERENCES users (id)
);

CREATE TABLE absence
(
    id                       BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    type                     VARCHAR(50),
    startDate                DATE,
    endDate                  DATE,
    motivation               VARCHAR(50),
    createdAt                DATE,
    status                   VARCHAR(50),
    id_user_create_absence   BIGINT        NOT NULL,
    id_user_validate_absence BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user_create_absence) REFERENCES users (id),
    FOREIGN KEY (id_user_validate_absence) REFERENCES users (id)
);

CREATE TABLE expense
(
    id                       BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    type                     VARCHAR(50),
    amount                   INT,
    motivation               VARCHAR(50),
    createdAt                DATE,
    status                   VARCHAR(50),
    id_user_create_expense   BIGINT        NOT NULL,
    id_user_validate_expense BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user_create_expense) REFERENCES users (id),
    FOREIGN KEY (id_user_validate_expense) REFERENCES users (id)
);

CREATE TABLE logs
(
    id                 BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    dates              DATE,
    status             INT,
    path               VARCHAR(50),
    event              VARCHAR(50),
    ipAddress          VARCHAR(50),
    methods            VARCHAR(50),
    id_user_create_log BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user_create_log) REFERENCES users (id)
);

CREATE TABLE document
(
    id                          BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    fileName                    VARCHAR(50),
    contentType                 VARCHAR(50),
    size                        VARCHAR(50),
    uploadDate                  DATE,
    fileKey                     VARCHAR(255),
    expirationDate              DATE,
    url                         VARCHAR(50),
    id_user_contain_document    BIGINT        NOT NULL,
    id_expense_contain_document BIGINT        NOT NULL,
    id_absence_contain_document BIGINT        NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (id_user_contain_document),
    FOREIGN KEY (id_user_contain_document) REFERENCES users (id),
    FOREIGN KEY (id_expense_contain_document) REFERENCES expense (id),
    FOREIGN KEY (id_absence_contain_document) REFERENCES absence (id)
);

CREATE TABLE team
(
    id                BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    name              VARCHAR(50),
    minimumUsers      INT,
    id_user_lead_team BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user_lead_team) REFERENCES users (id)
);

CREATE TABLE service
(
    id                   BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    name                 VARCHAR(50),
    teams                VARCHAR(50),
    id_user_lead_service BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user_lead_service) REFERENCES users (id)
);

CREATE TABLE insurance_company
(
    id                               BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    name                             VARCHAR(50),
    id_address_own_insurance_company BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_address_own_insurance_company) REFERENCES address (id)
);

CREATE TABLE insurance_contract
(
    id                                          BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    startDate                                   DATE,
    endDate                                     DATE,
    id_insurance_company_own_insurance_contract BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_insurance_company_own_insurance_contract) REFERENCES insurance_company (id)
);

CREATE TABLE agency
(
    id                               BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    name                             VARCHAR(50),
    organisation                     VARCHAR(50),
    id_insurance_contract_own_agency BIGINT        NOT NULL,
    id_address_own_agency            BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_insurance_contract_own_agency) REFERENCES insurance_contract (id),
    FOREIGN KEY (id_address_own_agency) REFERENCES address (id)
);

CREATE TABLE location_contract
(
    id                              BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    startDate                       DATE,
    endDate                         DATE,
    id_agency_own_location_contract BIGINT        NOT NULL,
    id_user_own_location_contract   BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_agency_own_location_contract) REFERENCES agency (id),
    FOREIGN KEY (id_user_own_location_contract) REFERENCES users (id)
);

CREATE TABLE equipment
(
    id                                     BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
    name                                   VARCHAR(50),
    serialNumber                           INT,
    purchaseDate                           DATE,
    type                                   VARCHAR(50),
    locationContract                       VARCHAR(50),
    id_location_contract_contain_equipment BIGINT,
    id_insurance_contract_insure_equipment BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_location_contract_contain_equipment) REFERENCES location_contract (id),
    FOREIGN KEY (id_insurance_contract_insure_equipment) REFERENCES insurance_contract (id)
);

CREATE TABLE belong_team
(
    id_team BIGINT,
    id_user BIGINT,
    PRIMARY KEY (id_team, id_user),
    FOREIGN KEY (id_team) REFERENCES team (id),
    FOREIGN KEY (id_user) REFERENCES users (id)
);

CREATE TABLE belong_service
(
    id_service BIGINT,
    id_user    BIGINT,
    PRIMARY KEY (id_service, id_user),
    FOREIGN KEY (id_service) REFERENCES service (id),
    FOREIGN KEY (id_user) REFERENCES users (id)
);

CREATE TABLE belong_team_service
(
    id_team    BIGINT,
    id_service BIGINT,
    PRIMARY KEY (id_team, id_service),
    FOREIGN KEY (id_team) REFERENCES team (id),
    FOREIGN KEY (id_service) REFERENCES service (id)
);

INSERT INTO address(street, streetNumber, locality, zipcode, lat, lng)
VALUES ("Rue des Loges", "65", "Montigny-lès-Metz", "57950", 49.099960, 6.158020),
       ("Rue des Roses", "65", "Montigny-lès-Metz", "57950", 49.114390, 6.229430);

INSERT INTO users(firstname, lastname, email, password, id_address, nationality, role, iban, country, phone, bic)
VALUES ("Super", "Admin", "admin@admin.com", "$2b$10$e5Kv7sv9QlCdFGQBYTPBguSx3.Ogqbgq8DSy4JcAo5Y3ubYhdSQo6",
        1, "admin nationaly", "ROLE_ADMIN", "admin iban", "France", "45678908097", "bic admin"),
       ("Simple", "User", "simple@user.com", "$2b$10$e5Kv7sv9QlCdFGQBYTPBguSx3.Ogqbgq8DSy4JcAo5Y3ubYhdSQo6",
        2, "user nationaly", "ROLE_USER", "user iban", "France", "45678908097", "bic user");
