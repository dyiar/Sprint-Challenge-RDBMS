
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Finish Sprint', description: 'Need to finish this weeks sprint challenge to show mastery of the concepts', completed: 0},
        {id: 2, name: 'Check out of hotel', description: 'Have to leave by 12', completed: 0},
        {id: 3, name: 'Drive to Sac', description: 'Need to get back by 4 at the latest', completed: 0}
      ]);
    });
};
