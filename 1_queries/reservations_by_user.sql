SELECT properties.*, reservations.* ,avg(property_reviews.rating) as average_rating
FROM reservations
JOIN properties ON properties.id = reservations.property_id
JOIN property_reviews ON reservations.property_id= property_reviews.property_id
WHERE reservations.guest_id = 28 AND reservations.end_date < now()::date
GROUP BY properties.id ,reservations.id
ORDER BY start_date desc
LIMIT 10;