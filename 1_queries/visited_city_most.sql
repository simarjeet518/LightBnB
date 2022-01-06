SELECT city ,count(reservations.id) as total_reservations
FROM properties
LEFT JOIN reservations on property_id = properties.id
GROUP BY city
ORDER by total_reservations desc;