INSERT INTO users(firstName, lastName, email, password, address, nationality, role, iban)
VALUES ("Super", "Admin", "admin@admin.com", "$2b$10$e5Kv7sv9QlCdFGQBYTPBguSx3.Ogqbgq8DSy4JcAo5Y3ubYhdSQo6",
        "admin address", "admin nationaly", "ROLE_ADMIN", "admin iban");

INSERT INTO `demand`(`id`, `startDate`, `endDate`, `motivation`, `createdAt`, `status`, `type`, `id_user_create_demand`,
                     `id_user_validate_demand`)
VALUES ('1', CURRENT_DATE, CURRENT_DATE, 'je suis motive', CURRENT_DATE, 'accepter', 'CA', '1',
        '1')