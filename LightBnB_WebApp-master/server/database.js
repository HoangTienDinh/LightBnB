const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

/// Users

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const query = 
  `SELECT id, name, email, password
  FROM users
  WHERE email = $1;`;

  return pool.query(query, [email])
  .then(res => res.rows[0])
  .catch(err => err)

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query =
  `SELECT id, name, email, password
  FROM users
  WHERE id = $1;`;

  return pool.query(query, [id])
  .then(res => res.rows[0])
  .catch(err => err)

}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const query = 
  `INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3);`;
console.log(user)
  return pool.query(query, [user.name, user.email, user.password])
  .then(res => res.rows[0])
  .catch(err => err)

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  const query = 
  `SELECT properties.*, reservations.*, AVG(rating) as average_rating
  FROM properties
  JOIN reservations ON properties.id = reservations.property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY start_date DESC
  LIMIT $2;`;

  return pool.query(query, [guest_id, limit])
  .then(res => res.rows)
  .catch(err => err)

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  const andArray = [];
  const havingArray = [];
  // 3

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    andArray.push(`city LIKE $${queryParams.length}`);
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    andArray.push(`cost_per_night > $${queryParams.length}`);
  }

  if (options.maximum_price_per_night){
    queryParams.push(`${options.maximum_price_per_night}`);
    andArray.push(`cost_per_night < $${queryParams.length}`);
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    havingArray.push(`avg(property_reviews.rating) >= $${queryParams.length}`);
  }

  let finalPush = andArray.join(" AND ");

  if (andArray.length) {
  queryString += `WHERE ${finalPush}`;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  `
  if (havingArray.length) {
    queryString += `HAVING ${havingArray}`
  }
  
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  // console.log(options, queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyArray = [property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code];

  const query =
  `INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  RETURNING *;`;

  console.log(property, 'this is just the property stuff')

  return pool.query(query, propertyArray)
  .then(res => res.rows)
  .catch(err => err)

  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
}
exports.addProperty = addProperty;
