const db = require("../../data/dbConfig");

module.exports = {
  get,
  getBy,
  getById,
  add,
  update,
  remove,
  getUserIssues
};

function get() {
  return db("users");
}

function getBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function getById(id) {
  return db("users").select("id", "username", "email").where({ id }).first();
}

function update(id, changes) {
  return db("users").where({ id }).update(changes);
}

async function add(newUser) {
  const [id] = await db("users").insert(newUser, "id");
  return getById(id);
}

function remove(id) {
  return db("users").where("id", id).del();
}

function getUserIssues(id) {
  return db("issues as i").join("users as u").on("i.user_id", "u.id").where('u.id', id);
}
