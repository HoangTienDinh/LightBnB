SELECT properties.*, reservations.*, AVG(rating) as average_rating
FROM properties
JOIN reservations ON properties.id = reservations.property_id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE end_date < now()::date AND reservations.guest_id = 1
GROUP BY properties.id, reservations.id
ORDER BY start_date DESC
LIMIT 10;