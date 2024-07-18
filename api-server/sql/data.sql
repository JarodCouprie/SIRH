INSERT INTO address(street, streetNumber, locality, zipcode, lat, lng)
VALUES ("Rue des Loges", "65", "Montigny-lès-Metz", "57950", 49.099960, 6.158020),
       ("Rue des Roses", "65", "Montigny-lès-Metz", "57950", 49.114390, 6.229430);

INSERT INTO users(firstname, lastname, email, password, id_address, nationality, role, iban, country, phone, bic, ca,
                  tt, rtt)
VALUES ("Super", "Admin", "admin@admin.com", "$2b$10$e5Kv7sv9QlCdFGQBYTPBguSx3.Ogqbgq8DSy4JcAo5Y3ubYhdSQo6",
        1, "admin nationaly", "ADMIN", "admin iban", "France", "45678908097", "bic admin", 10, 11, 12),
       ("Simple", "User", "simple@user.com", "$2b$10$e5Kv7sv9QlCdFGQBYTPBguSx3.Ogqbgq8DSy4JcAo5Y3ubYhdSQo6",
        2, "user nationaly", "USER", "user iban", "France", "45678908097", "bic user", 10, 11, 12);

INSERT INTO `demand`(`id`, `startDate`, `endDate`, `motivation`, `createdAt`, `status`, `type`,`number_day`,`id_user_create_demand`,
                     `id_user_validate_demand`)
VALUES ('1', CURRENT_DATE, CURRENT_DATE, 'je suis motive', CURRENT_DATE, 'ACCEPTED', 'CA',1, '1',
        '1')