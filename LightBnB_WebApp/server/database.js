const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users
const { Pool } = require('pg');
const Config ={
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
}

const pool = new Pool(Config);
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString =`SELECT * FROM users where email= $1`;
  const values =[email];
  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString =`SELECT * FROM users where id = $1`;
  const values =[id];
  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString =`INSERT INTO users(name , email, password) VALUES ($1,$2,$3) RETURNING *`;
  const values =[user.name, user.email, user.password];
  return pool
    .query(queryString, values)
    .then((result) => {
    console.log(result.rows);
    return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
  
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString =`SELECT * FROM  reservations
  WHERE guest_id =$1 AND start_date < now()::date 
  order by start_date  desc limit $2`;
  const values =[guest_id,limit];
  return pool
    .query(queryString, values)
    .then((result) => {
    console.log(result.rows);
    return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = (options, limit = 10) => {
   const queryParams = [];
   let queryString = `
   SELECT properties.*, avg(property_reviews.rating) as average_rating
   FROM properties
   JOIN property_reviews ON properties.id = property_id
   `;
 
    
   if (options.city) {
     queryParams.push('%'+options.city+'%');
     queryString += `WHERE city LIKE $${queryParams.length} `;
   }

   if (options.owner_id) {
    const ownerId = Number(options.owner_id);
    queryParams.push(ownerId);
    queryString += `AND properties.owner_id = $${queryParams.length} `;
  }

   if (options.minimum_price_per_night) {
    const price = Number(options.minimum_price_per_night );
    queryParams.push(price*100);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }
 
  if (options.maximum_price_per_night) {
    const price = Number(options.maximum_price_per_night );
    queryParams.push(price*100);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }

   queryString += `
   GROUP BY properties.id
   `;

  if (options.minimum_rating) {
    const rating = Number(options.minimum_rating);
    queryParams.push(rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

   queryParams.push(limit);
   queryString += `
   ORDER BY cost_per_night 
   LIMIT $${queryParams.length};
   `;
  
   //console.log(queryString, queryParams);
 
   return pool.query(queryString, queryParams)
   .then((res) => res.rows)
   .catch((err) => {
    console.log(err.message);
  });
 };

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
