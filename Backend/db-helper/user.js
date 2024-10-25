import con from "../utils/db-connection.js";

export async function getUserDetails({ email, password }) {
  try {
    const query = `SELECT * FROM user_info WHERE CustEmail = "${email}";`;
    const [results] = await con.query(query);
    if (results.length) {
      if (password === results[0].Password) {
        return { message: "Login successful!", result: results[0] };
      } else {
        return { message: "Incorrect Password" };
      }
    } else {
      return { message: "User not found" };
    }
  } catch (error) {
    console.log("Error in importing data from table.", error);
  }
}

export async function existInUserInfo(email) {
  try {
    const query = `SELECT * FROM user_info WHERE CustEmail = "${email}";`;
    const [results] = await con.query(query);
    if (results.length !== 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in importing data from table.", error);
  }
}

export async function getValuesFromCustomers(details, id) {
  const query = `SELECT ${details.join(
    ", "
  )} FROM customers WHERE CustomerId = "${id}";`;
  const [results] = await con.query(query);
  if (results[0]) {
    return JSON.parse(
      JSON.stringify(results.length > 1 ? results : results[0])
    );
  } else {
    return results;
  }
}
