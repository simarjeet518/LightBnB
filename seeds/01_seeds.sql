INSERT INTO users(name,email,password) 
VALUES ('Eva Stanley','sebastianguerra@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer','jacksonrose@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks','victoriablackwell@outlook.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sue Luna','jasonvincent@gmx.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rosalie Garza','jacksonrose@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Etta West','charlielevy@yahoo.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Leroy Hart ','jacksonrose@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties(owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1,'Speed lamp','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 350,6,4,8,'Canada','536 Namsub Highway', 'Sotboske','Quebec','28142'),
(3,'Blank Corner','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',900 ,5,8,8,'Canada','quebec road', 'vancouver','BC','285-123'),
(6,'Port Out','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',500,6,4,8,'Canada','34 bridge Highway', 'edmenton','AB','28442');

INSERT INTO reservations(start_date, end_date, property_id,guest_id)
VALUES ('2018-09-11','2018-09-26',2,3),
('2018-09-11','2018-09-26',1,2),
('2018-09-11','2018-09-26',3,5),
('2014-10-21 ','2014-10-21 ',1,3),
('2017-10-21 ','2017-10-21 ',2,4);

INSERT INTO property_reviews(guest_id,property_id,reservation_id,rating,message)
VALUES (3,2,1,3,'message'),
(1,3,4,8,'message'),
(5,3,3,10,'message'),
(2,1,2,6,'message'),
(4,2,5,8,'message');