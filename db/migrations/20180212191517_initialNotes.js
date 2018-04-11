
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('notes', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.text('content');
      table.string('email');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('notes')
  ])
};
