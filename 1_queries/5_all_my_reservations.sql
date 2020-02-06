SELECT properties.*, reservations.*, AVG(rating) as average_rating
FROM properties
JOIN reservations ON properties.id = property_id
JOIN properties_reviews ON properties.id = property_id
WHERE end_date < now()::date AND user_id = 1
ORDER BY start_date DESC
LIMIT 10;