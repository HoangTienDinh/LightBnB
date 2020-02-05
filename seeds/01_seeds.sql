INSERT INTO users  (name, email, password) 
VALUES ('Hoho Didi', 'hohodidi@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Jarjar Binks', 'thejar@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Frank Planet', 'frankplanet@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Flops Donut', 'flopsdonut@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'The Columbian', 'description', 'thumbnail_photo', 'cover_photo', 350, 2, 3, 4, 'Canada', 'Home Street', 'Vancouver', 'British Columbia', 'V1V 2T2', TRUE),
(1, 'Bombay', 'description', 'thumbnail_photo', 'cover_photo', 1050, 1, 1, 4, 'Canada', 'Dunkin Avenue', 'Kelowna', 'British Columbia', 'V1V 3T3', FALSE),
(3, 'White Spot', 'description', 'thumbnail_photo', 'cover_photo', 20000, 30, 2, 2, 'Taiwan', 'Big Street', 'Taipei City', 'Taipei', 'AAA333', TRUE),
(4, 'Loft', 'description', 'thumbnail_photo', 'cover_photo', 890, 1, 1, 1, 'USA', 'Back Street', 'Seattle', 'Washington', '123456', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2020-09-11'::date, '2020-09-20'::date, 1, 3),
('2021-02-05'::date, '2021-04-05'::date, 3, 2),
('2025-01-01'::date, '2025-06-01'::date, 2, 2),
('2020-11-11'::date, '2022-11-11'::date, 4, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 5, 'Hello'),
(2, 2, 2, 5, 'Is it me'),
(3, 3, 3, 5, 'You are looking'),
(4, 4, 4, 1, 'FOR!');