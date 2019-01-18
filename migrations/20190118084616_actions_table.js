exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", function(tbl) {
    tbl.increments();
    tbl.string("description", 180).notNullable();
    tbl.text("notes", 255).notNullable();
    tbl.boolean("completed").notNullable();
    tbl
      .integer("project_id")
      .unsigned()
      .notNullable();

    tbl.foreign("project_id").references("projects.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};
