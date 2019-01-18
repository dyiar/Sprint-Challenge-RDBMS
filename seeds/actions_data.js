
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {id: 1, description: 'Finish MVP', notes: 'Only after MVP is done can I do stretch', completed: 1, project_id: 1},
        {id: 2, description: 'Pack up', notes: 'Need to make sure to not leave anything behind', completed: 0, project_id: 2},
        {id: 3, description: 'Get snacks', notes: 'Need food and drink for the drive back so we will not be hungry', completed: 0, project_id: 3}
      ]);
    });
};
