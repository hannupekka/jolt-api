exports.up = async knex => {
  await knex.schema.createTable('jolt', table => {
    table
      .bigIncrements('jolt_id')
      .primary()
      .index();
    table
      .string('given_by', 4)
      .notNullable()
      .index();
    table.string('title', 255).notNullable();
    table.text('description');
    table.timestamps(false, true);
    table.index('created_at');
    table.index('updated_at');
  });

  await knex.schema.createTable('jolt_user', table => {
    table
      .bigIncrements('jolt_user_id')
      .primary()
      .index();
    table.integer('jolt_id').notNullable();
    table
      .foreign('jolt_id')
      .references('jolt_id')
      .inTable('jolt')
      .onDelete('CASCADE');
    table
      .string('user', 4)
      .notNullable()
      .index();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('jolt_user');
  await knex.schema.dropTable('jolt');
};
