INSERT INTO address(street, streetNumber, locality, zipcode, lat, lng)
VALUES ("Rue des Loges", "65", "Montigny-lès-Metz", "57950", 49.099960, 6.158020),
       ("Rue des Roses", "65", "Montigny-lès-Metz", "57950", 49.114390, 6.229430);

INSERT INTO role(label)
VALUES ("USER"),
       ("ADMIN"),
       ("HR_DIRECTOR"),
       ("PAID_LEAVE_SPECIALIST");

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

INSERT INTO `demand`(`id`, `startDate`, `endDate`, `motivation`, `createdAt`, `status`, `type`, `number_day`,
                     `id_user_create_demand`,
                     `id_user_validate_demand`)
VALUES ('1', CURRENT_DATE, CURRENT_DATE, 'je suis motive', CURRENT_DATE, 'ACCEPTED', 'CA', 1, '1',
        '1');

# SQL QUERY TO RETRIEVE ROLES IN ONE LINE
SELECT
    u.id,
    GROUP_CONCAT(r.label) AS roles
FROM
    users u
        JOIN
    own_role owr
    ON
        u.id = owr.id_user
        JOIN
    role r
    ON
        r.id = owr.id_role
GROUP BY u.id