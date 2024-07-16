INSERT INTO address(street, streetNumber, locality, zipcode, lat, lng)
VALUES ("Rue des Loges", "65", "Montigny-lès-Metz", "57950", 49.099960, 6.158020),
       ("Rue des Roses", "65", "Montigny-lès-Metz", "57950", 49.114390, 6.229430);

INSERT INTO users(firstname, lastname, email, password, id_address, nationality, role, iban, country, phone, bic, ca,
                  tt, rtt)
VALUES ("Super", "Admin", "admin@admin.com", "$2b$10$e5Kv7sv9QlCdFGQBYTPBguSx3.Ogqbgq8DSy4JcAo5Y3ubYhdSQo6",
        1, "admin nationaly", "ADMIN", "admin iban", "France", "45678908097", "bic admin", 10, 11, 12),
       ("Simple", "User", "simple@user.com", "$2b$10$e5Kv7sv9QlCdFGQBYTPBguSx3.Ogqbgq8DSy4JcAo5Y3ubYhdSQo6",
        2, "user nationaly", "USER", "user iban", "France", "45678908097", "bic user", 10, 11, 12);

INSERT INTO `demand`(`id`, `startDate`, `endDate`, `motivation`, `created_at`, `status`, `type`, `id_user_create_demand`,
                     `id_user_validate_demand`)
VALUES ('1', CURRENT_DATE, CURRENT_DATE, 'je suis motive', CURRENT_DATE, 'accepter', 'CA', '1',
        '1');

INSERT INTO expense(type,amount,motivation,status,id_owner,id_validator, facturation_date)
VALUES ("TRAVEL", 300, "Voyage d'affaire", "WAITING", 2, null, '2024-03-11' ),
       ("COMPENSATION", 50, "Indemnisation", "REFUNDED", 2, 1, '2023-05-19'),
       ("FOOD", 100, "Repas pro", "WAITING", 1, null, '2024-04-15'),
       ("HOUSING", 149, "Hotel", "WAITING", 1, null, '2024-04-01'),("TRAVEL", 300, "Voyage d'affaire", "WAITING", 2, null, '2024-03-11' ),
       ("COMPENSATION", 50, "Compensation accident", "REFUNDED", 2, 1, '2023-12-13'),
       ("FOOD", 102, "Repas pro", "WAITING", 1, null, '2024-04-15'),
       ("HOUSING", 149, "Hotel", "WAITING", 1, null, '2024-04-01'),("TRAVEL", 300, "Voyage d'affaire", "WAITING", 2, null, '2024-03-11' ),
       ("COMPENSATION", 89, "Prime", "REFUNDED", 2, 1, '2023-12-13'),
       ("FOOD", 20.99, "Restauration en déplacement", "NOT_REFUNDED", 1, null, '2024-04-15'),
       ("HOUSING", 149, "Hotel", "WAITING", 1, null, '2024-05-01'),("TRAVEL", 300, "Voyage d'affaire", "WAITING", 2, null, '2024-03-11' ),
       ("COMPENSATION", 50, "Indemnisation", "REFUNDED", 2, 1, '2023-05-13'),
       ("FOOD", 34.99, "Repas d'affaire", "WAITING", 1, null, '2024-04-15'),
       ("FOOD", 34.99, "Repas de test", "REFUNDED", 1, null, '2024-04-15'),
       ("HOUSING", 99, "AirBNB", "NOT_REFUNDED", 1, null, '2024-05-01');
