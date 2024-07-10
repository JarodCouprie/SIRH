INSERT INTO users(firstName, lastName, email, password, address, nationality, role, iban)
VALUES ("Super", "Admin", "admin@admin.com", "$2b$10$e5Kv7sv9QlCdFGQBYTPBguSx3.Ogqbgq8DSy4JcAo5Y3ubYhdSQo6",
        "admin address", "admin nationaly", "ROLE_ADMIN", "admin iban"),
       ("Simple", "User", "simple@user.com", "$2b$10$e5Kv7sv9QlCdFGQBYTPBguSx3.Ogqbgq8DSy4JcAo5Y3ubYhdSQo6",
        "user address", "user nationaly", "ROLE_USER", "user iban");

INSERT INTO `demand`(`id`, `startDate`, `endDate`, `motivation`, `createdAt`, `status`, `type`, `id_user_create_demand`,
                     `id_user_validate_demand`)
VALUES ('1', CURRENT_DATE, CURRENT_DATE, 'je suis motive', CURRENT_DATE, 'accepter', 'CA', '1',
        '1');

INSERT INTO expense(type,amount,motivation,status,id_owner,id_validator, facturationDate)
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
