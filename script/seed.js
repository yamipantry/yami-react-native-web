'use strict'

const db = require('../server/db')
const {User, Recipes, Ingredients, Items} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      userName: 'CodyBadA$$',
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Email',
      streetName: '12 Cody St',
      city: 'san luis obispo',
      state: 'ca',
      zip: '93401',
      pantryItems: ['butternut squash', 'chicken', 'beef', 'celery'],
      profileImage: '/pic.jpeg'
    }),
    User.create({
      userName: 'MuRphySL4W',
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Email',
      streetName: '12 murphy St',
      city: 'san luis obispo',
      state: 'ca',
      zip: '93401',
      pantryItems: ['lettuce', 'butternut squash', 'love', 'flour'],
      profileImage: '/pic.jpeg'
    }),
    User.create({
      userName: 'Punny',
      email: 'pun@email.com',
      password: '123',
      firstName: 'Pun',
      lastName: 'Email',
      streetName: '12 pun St',
      city: 'san luis obispo',
      state: 'ca',
      zip: '93401',
      pantryItems: ['beans', 'butternut squash', 'lettuce', 'celery'],
      profileImage: '/pic.jpeg'
    }),
    User.create({
      userName: 'MagicalFruit',
      email: 'bean@email.com',
      password: '123',
      firstName: 'bean',
      lastName: 'clean',
      streetName: '12 bean st',
      city: 'san luis obispo',
      state: 'ca',
      zip: '93401',
      pantryItems: [
        'sugar',
        'rabbit',
        'carrots',
        'beans',
        'butternut squash',
        'tomato'
      ],
      profileImage: '/pic.jpeg'
    })
  ])

  const ingredients = await Promise.all([
    Ingredients.create({
      name: 'carrots'
    }),
    Ingredients.create({
      name: 'beans'
    }),
    Ingredients.create({
      name: 'butternut squash'
    }),
    Ingredients.create({
      name: 'lettuce'
    }),
    Ingredients.create({
      name: 'beef'
    }),
    Ingredients.create({
      name: 'chicken'
    }),
    Ingredients.create({
      name: 'sugar'
    }),
    Ingredients.create({
      name: 'rabbit'
    }),
    Ingredients.create({
      name: 'tomato'
    }),
    Ingredients.create({
      name: 'celery'
    }),
    Ingredients.create({
      name: 'love'
    }),
    Ingredients.create({
      name: 'pepperoni'
    }),
    Ingredients.create({
      name: 'flour'
    })
  ])

  const recipe = await Promise.all([
    Recipes.create({
      name: 'Salad Soup',
      ingredientsIds: ['beans', 'butternut squash', 'lettuce', 'celery'],
      instructions: [
        'Turn on fire',
        'dont burn yourself',
        'did i mention dont burn yourself'
      ],
      description: 'People always burn themselves with this meal',
      imageUrl: '/salad_soup.jpeg'
      // ingredientAmounts: [
      //   '2 cups beans',
      //   '1 cup butternut squash',
      //   '1 head chopped lettuce',
      //   '1 cup chopped celery'
      // ]
    }),
    Recipes.create({
      name: 'Mystery Dish',
      ingredientsIds: ['lettuce', 'butternut squash', 'love', 'flour'],
      instructions: [
        'add ingredient 4',
        'then add ingredient 3',
        'what are these? add ingredient 109',
        'ingredient 225 is the best'
      ],
      description:
        'when all these ingredients are added together, you get 434109225',
      imageUrl: '/mystery.jpeg'
      // ingredientAmounts: [
      //   '1 head chopped lettuce',
      //   '2 cups butternut squash',
      //   '2 gallons love',
      //   '1 cup flour'
      // ]
    }),
    Recipes.create({
      name: 'Rabbit Cacciatore',
      ingredientsIds: [
        'sugar',
        'rabbit',
        'carrot',
        'beans',
        'butternut squash',
        'tomato'
      ],
      instructions: [
        'start with sugar',
        'add carrots',
        'beans beans beans',
        'what am i doing this recipe for'
      ],
      description: 'This is the best delicious recipe of all time',
      imageUrl: '/rabbit.jpeg'
      // ingredientAmounts: [
      //   '0.5 cups sugar',
      //   '1 rabbit',
      //   '1 carrot',
      //   '2 cups beans',
      //   '0.5 butternut squash',
      //   '1 tomato'
      // ]
    }),
    Recipes.create({
      name: 'Blowfish Delight',
      ingredientsIds: ['butternut squash', 'chicken', 'beef', 'celery'],
      instructions: ['dont even try to make this', 'this is not for amateurs'],
      description: 'This recipe will only be good with some blowfish',
      imageUrl: '/blowfish.jpeg'
      // ingredientAmounts: [
      //   '1 butternut squash',
      //   '2 chicken breasts',
      //   '1 beef',
      //   '2 cups chopped celery'
      // ]
    }),
    Recipes.create({
      name: 'Stewd Rabbit',
      ingredientsIds: [
        'sugar',
        'rabbit',
        'carrots',
        'beans',
        'butternut squash',
        'tomato'
      ],
      instructions: ['find rabbit', 'hunt rabbit', 'eat rabbit'],
      description: 'rabbit cacciatore',
      imageUrl: '/rabbit.jpeg'
      // ingredientAmounts: [
      //   '1 cup sugar',
      //   '1 rabbit',
      //   '1 carrot to woo rabbit',
      //   '1 can of beans',
      //   '1 butternut squash',
      //   '1 tomato'
      // ]
    })
  ])

  const ingredientList = await Promise.all([
    Items.create({
      amount: '2 cups',
      recipeId: 1,
      ingredientName: 'beans'
    }),
    Items.create({
      amount: '1 cups',
      recipeId: 1,
      ingredientName: 'butternut squash'
    }),
    Items.create({
      amount: '5 cups',
      recipeId: 1,
      ingredientName: 'lettuce'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 1,
      ingredientName: 'celery'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 2,
      ingredientName: 'lettuce'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 2,
      ingredientName: 'butternut squash'
    }),
    Items.create({
      amount: '1 cups',
      recipeId: 2,
      ingredientName: 'love'
    }),
    Items.create({
      amount: '5 cups',
      recipeId: 2,
      ingredientName: 'flour'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 3,
      ingredientName: 'sugar'
    }),
    Items.create({
      amount: '1',
      recipeId: 3,
      ingredientName: 'rabbit'
    }),
    Items.create({
      amount: '1 cups',
      recipeId: 3,
      ingredientName: 'carrots'
    }),
    Items.create({
      amount: '1',
      recipeId: 3,
      ingredientName: 'beans'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 3,
      ingredientName: 'butternut squash'
    }),
    Items.create({
      amount: '1',
      recipeId: 3,
      ingredientName: 'tomato'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 5,
      ingredientName: 'sugar'
    }),
    Items.create({
      amount: '1',
      recipeId: 5,
      ingredientName: 'rabbit'
    }),
    Items.create({
      amount: '1 cups',
      recipeId: 5,
      ingredientName: 'carrots'
    }),
    Items.create({
      amount: '1',
      recipeId: 5,
      ingredientName: 'beans'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 5,
      ingredientName: 'butternut squash'
    }),
    Items.create({
      amount: '1',
      recipeId: 5,
      ingredientName: 'tomato'
    }),
    Items.create({
      amount: '1 cups',
      recipeId: 4,
      ingredientName: 'butternut squash'
    }),
    Items.create({
      amount: '1',
      recipeId: 4,
      ingredientName: 'chicken'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 4,
      ingredientName: 'celery'
    }),
    Items.create({
      amount: '1',
      recipeId: 4,
      ingredientName: 'beef'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${ingredients.length} ingredients`)
  console.log(`seeded ${recipe.length} recipes`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
