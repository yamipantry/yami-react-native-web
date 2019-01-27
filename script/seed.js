'use strict'

const db = require('../server/db')
const {User, Recipes, Ingredients, Items} = require('../server/db/models')

//ingredient creator that returns an array of dummy ingredient names of varying lengths
const ingredientCreator = require('./ingredientCreator')

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

  let ingredients = await Promise.all([
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

  //Here we create a big array of dummy ingredient names.  We create additional ingredient table rows using them.
  const dummyIngredientNames = ingredientCreator() //array of names

  dummyIngredientNames.forEach(async element => {
    try {
      const newIngredient = await Ingredients.create({
        name: element
      })

      ingredients.push(newIngredient) //ingredients array above is updated
    } catch (err) {
      console.log(
        `For some reason (validation?), the ingredient called ${element} could not be added to the table.`
      )
    }
  })

  const recipe = await Promise.all([
    Recipes.create({
      name: 'Salad Soup',
      instructions: [
        'Turn on fire',
        'dont burn yourself',
        'did i mention dont burn yourself'
      ],
      description: 'People always burn themselves with this meal',
      imageUrl: '/salad_soup.jpeg'
    }),
    Recipes.create({
      name: 'Mystery Dish',
      instructions: [
        'add ingredient 4',
        'then add ingredient 3',
        'what are these? add ingredient 109',
        'ingredient 225 is the best'
      ],
      description:
        'when all these ingredients are added together, you get 434109225',
      imageUrl: '/mystery.jpeg'
    }),
    Recipes.create({
      name: 'Rabbit Cacciatore',
      instructions: [
        'start with sugar',
        'add carrots',
        'beans beans beans',
        'what am i doing this recipe for'
      ],
      description: 'This is the best delicious recipe of all time',
      imageUrl: '/rabbit.jpeg'
    }),
    Recipes.create({
      name: 'Blowfish Delight',
      instructions: ['dont even try to make this', 'this is not for amateurs'],
      description: 'This recipe will only be good with some blowfish',
      imageUrl: '/blowfish.jpeg'
    }),
    Recipes.create({
      name: 'Stewd Rabbit',
      instructions: ['find rabbit', 'hunt rabbit', 'eat rabbit'],
      description: 'rabbit cacciatore',
      imageUrl: '/rabbit.jpeg'
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
