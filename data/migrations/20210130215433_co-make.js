exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments();
      table.string("username", 255).notNullable().unique().index();
      table.string("email", 255).notNullable().unique().index();
      table.string("password", 255).notNullable();
    })
    .createTable("issues", (table) => {
      table.increments();
      table.string("title", 255).notNullable();
      table.string("description").notNullable();
      table.timestamp("date_created").defaultTo(knex.fn.now());
      table.string("resolved_status").defaultTo("unresolved");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("votes", (tbl) => {
      tbl.increments("id");
      tbl
        .integer("issue_id")
        .unsigned()
        .references("id")
        .inTable("issues")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
      tbl.integer("upvote")
      tbl.integer('downvote')
    })
    .createTable("comments", (tbl) => {
      tbl.increments("id");
      tbl.string('comment').notNullable()
      tbl.timestamp('comment_date').defaultTo(knex.fn.now())
      tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("issue_id")
        .unsigned()
        .references("id")
        .inTable("issues")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.integer("vote");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("issues").dropTableIfExists("users")
      .dropTableIfExists('comments').dropTableIfExists('votes')
};
