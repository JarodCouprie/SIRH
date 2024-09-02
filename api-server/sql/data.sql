INSERT INTO address(street, streetNumber, locality, zipcode, lat, lng)
VALUES ("Rue des Loges", "65", "Montigny-lès-Metz", "57950", 49.099960, 6.158020),
       ("Rue des Roses", "65", "Montigny-lès-Metz", "57950", 49.114390, 6.229430);

INSERT INTO role(label)
VALUES ("USER"),
       ("ADMIN"),
       ("HR"),
       ("LEAVE_MANAGER");

INSERT INTO users(firstname, lastname, email, password, id_address, nationality, iban, country, phone, bic, ca,
                  tt, rtt)
VALUES ("Super", "Admin", "admin@admin.com", "$2b$10$e5Kv7sv9QlCdFGQBYTPBguSx3.Ogqbgq8DSy4JcAo5Y3ubYhdSQo6",
        1, "admin nationaly", "admin iban", "France", "45678908097", "bic admin", 10, 11, 12),
       ("Simple", "User", "simple@user.com", "$2b$10$e5Kv7sv9QlCdFGQBYTPBguSx3.Ogqbgq8DSy4JcAo5Y3ubYhdSQo6",
        2, "user nationaly", "user iban", "France", "45678908097", "bic user", 10, 11, 12);

INSERT INTO own_role(id_user, id_role)
VALUES (1, 2),
       (1, 3),
       (1, 4),
       (2, 1),
       (2, 4);


INSERT INTO expense(type, amount, motivation, status, id_owner, id_validator, facturation_date)
VALUES ("TRAVEL", 300, "Voyage d'affaire", "WAITING", 2, null, '2024-03-11'),
       ("COMPENSATION", 50, "Indemnisation", "REFUNDED", 2, 1, '2023-05-19'),
       ("FOOD", 100, "Repas pro", "WAITING", 1, null, '2024-04-15'),
       ("HOUSING", 149, "Hotel", "WAITING", 1, null, '2024-04-01'),
       ("TRAVEL", 300, "Voyage d'affaire", "WAITING", 2, null, '2024-03-11'),
       ("COMPENSATION", 50, "Compensation accident", "REFUNDED", 2, 1, '2023-12-13'),
       ("FOOD", 102, "Repas pro", "WAITING", 1, null, '2024-04-15'),
       ("HOUSING", 149, "Hotel", "WAITING", 1, null, '2024-04-01'),
       ("TRAVEL", 300, "Voyage d'affaire", "WAITING", 2, null, '2024-03-11'),
       ("COMPENSATION", 89, "Prime", "REFUNDED", 2, 1, '2023-12-13'),
       ("FOOD", 20.99, "Restauration en déplacement", "NOT_REFUNDED", 1, null, '2024-04-15'),
       ("HOUSING", 149, "Hotel", "WAITING", 1, null, '2024-05-01'),
       ("TRAVEL", 300, "Voyage d'affaire", "WAITING", 2, null, '2024-03-11'),
       ("COMPENSATION", 50, "Indemnisation", "REFUNDED", 2, 1, '2023-05-13'),
       ("FOOD", 34.99, "Repas d'affaire", "WAITING", 1, null, '2024-04-15'),
       ("FOOD", 34.99, "Repas de test", "REFUNDED", 1, null, '2024-04-15'),
       ("HOUSING", 99, "AirBNB", "NOT_REFUNDED", 1, null, '2024-05-01');

INSERT INTO `demand`(`id`, `start_date`, `end_date`, `motivation`, `created_at`, `status`, `type`, `number_day`,
                     `id_owner`)
VALUES ('1', CURRENT_DATE, CURRENT_DATE, 'je suis motive', CURRENT_DATE, 'WAITING', 'CA', 1, '1');
INSERT INTO address (id, street, streetNumber, locality, zipcode, lat, lng) VALUES
                                                                                (101, 'Rue aux arènes', '86', 'Metz', '57000', 49.1068, 6.1764),
                                                                                (102, 'Rue de la République', '45', 'Lyon', '69002', 45.7640, 4.8357),
                                                                                (103, 'Boulevard Michelet', '90', 'Marseille', '13008', 43.2965, 5.3698),
                                                                                (104, 'Rue Nationale', '12', 'Lille', '59800', 50.6292, 3.0573),
                                                                                (105, 'Avenue Jean Jaurès', '34', 'Toulouse', '31000', 43.6047, 1.4442);

INSERT INTO agency (id, label, id_address) VALUES
                                               (1, 'Metz Numérique School', 101),
                                               (2, 'Agence Lyon Nord', 102),
                                               (3, 'Agence Marseille Est', 103),
                                               (4, 'Agence Lille Ouest', 104),
                                               (5, 'Agence Toulouse Sud', 105);

INSERT INTO service (id, label, minimum_users, id_user_lead_service, id_agency) VALUES
                                                                                    (1, 'Service Educatif', 5, 1, 1),
                                                                                    (2, 'Service IT', 10, 1, 2),
                                                                                    (3, 'Service Commercial', 8, 1, 3),
                                                                                    (4, 'Service Marketing', 6, 2, 4),
                                                                                    (5, 'Service Logistique', 7, 2, 5);

INSERT INTO team (id, label, minimum_users, id_user_lead_team, id_service) VALUES
                                                                               (1, 'Équipe Intervenant', 3, 1, 1),
                                                                               (2, 'Équipe Support IT', 5, 1, 2),
                                                                               (3, 'Équipe Vente', 4, 2, 3),
                                                                               (4, 'Équipe SEO', 4, 2, 4),
                                                                               (5, 'Équipe Transport', 6, 2, 5);

INSERT INTO belong_team (id_team, id_user) VALUES
                                               (1, 1),
                                               (1, 2),
                                               (2, 1),
                                               (2, 2),
                                               (3, 1),
                                               (3, 2),
                                               (4, 1),
                                               (4, 2),
                                               (5, 1),
                                               (5, 2);


