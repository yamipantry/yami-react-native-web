'use strict'

const db = require('../server/db')
const {
  User,
  Recipes,
  Ingredients,
  Items,
  Bookmarks
} = require('../server/db/models')

const {
  unirestIngredients,
  unirestRecipeDetailsFinal
} = require('./ingredientsObtainer')

//ingredient creator that returns an array of dummy ingredient names of varying lengths
//const ingredientCreator = require('./ingredientCreator')

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
      pantryItems: ['Butternut squash', 'Chicken', 'Beef', 'Celery'],
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
      pantryItems: ['Lettuce', 'Butternut squash', 'Love', 'Flour'],
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
      pantryItems: ['Beans', 'Butternut squash', 'Lettuce', 'Celery'],
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
        'Sugar',
        'Rabbit',
        'Carrots',
        'Ceans',
        'Butternut squash',
        'Tomato'
      ],
      profileImage: '/pic.jpeg'
    })
  ])

  let ingredients = await Promise.all([
    Ingredients.create({
      name: 'Carrots'
    }),
    Ingredients.create({
      name: 'Beans'
    }),
    Ingredients.create({
      name: 'Butternut squash'
    }),
    Ingredients.create({
      name: 'Lettuce'
    }),
    Ingredients.create({
      name: 'Beef'
    }),
    Ingredients.create({
      name: 'Chicken'
    }),
    Ingredients.create({
      name: 'Sugar'
    }),
    Ingredients.create({
      name: 'Rabbit'
    }),
    Ingredients.create({
      name: 'Tomato'
    }),
    Ingredients.create({
      name: 'Celery'
    }),
    Ingredients.create({
      name: 'Love'
    }),
    Ingredients.create({
      name: 'Pepperoni'
    }),
    Ingredients.create({
      name: 'Flour'
    })
  ])

  // Here we create a big array of dummy ingredient names.  We create additional ingredient table rows using them.
  // const dummyIngredientNames = ingredientCreator() //array of names

  // dummyIngredientNames.forEach(async element => {
  //   try {
  //     const newIngredient = await Ingredients.create({
  //       name: element
  //     })

  //     ingredients.push(newIngredient) //ingredients array above is updated
  //   } catch (err) {
  //     console.log(
  //       `For some reason (validation?), the ingredient called ${element} could not be added to the table.`
  //     )
  //   }
  // })

  unirestIngredients.forEach(async element => {
    try {
      const newIngredient = await Ingredients.create({
        name: element
      })

      ingredients.push(newIngredient) //ingredients array above is updated
      console.log(
        `The ingredient called ${element} was added to the 'Ingredients' table.`
      )
    } catch (err) {
      console.log(
        `For some reason, the ingredient called ${element} could not be added to the 'Ingredients' table.`
      )
    }
  })

  let recipe = await Promise.all([
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

  unirestRecipeDetailsFinal.forEach(async recipeDetails => {
    try {
      const newRecipe = await Recipes.create({
        name: recipeDetails.name,
        instructions: recipeDetails.instructions,
        description: recipeDetails.description,
        imageUrl: recipeDetails.imageUrl
      })

      recipe.push(newRecipe) //recipe array above is updated
      console.log(
        `The recipe called ${
          recipeDetails.name
        } was added to the 'Recipes' table.`
      )
    } catch (err) {
      console.log(
        `For some reason, the recipe called ${
          recipeDetails.name
        } could not be added to the 'Recipes' table.`
      )
    }
  })

  const ingredientList = await Promise.all([
    Items.create({
      amount: '2 cups',
      recipeId: 1,
      ingredientName: 'Beans'
    }),
    Items.create({
      amount: '1 cups',
      recipeId: 1,
      ingredientName: 'Butternut squash'
    }),
    Items.create({
      amount: '5 cups',
      recipeId: 1,
      ingredientName: 'Lettuce'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 1,
      ingredientName: 'Celery'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 2,
      ingredientName: 'Lettuce'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 2,
      ingredientName: 'Butternut squash'
    }),
    Items.create({
      amount: '1 cups',
      recipeId: 2,
      ingredientName: 'Love'
    }),
    Items.create({
      amount: '5 cups',
      recipeId: 2,
      ingredientName: 'Flour'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 3,
      ingredientName: 'Sugar'
    }),
    Items.create({
      amount: '1',
      recipeId: 3,
      ingredientName: 'Rabbit'
    }),
    Items.create({
      amount: '1 cups',
      recipeId: 3,
      ingredientName: 'Carrots'
    }),
    Items.create({
      amount: '1',
      recipeId: 3,
      ingredientName: 'Beans'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 3,
      ingredientName: 'Butternut squash'
    }),
    Items.create({
      amount: '1',
      recipeId: 3,
      ingredientName: 'Tomato'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 5,
      ingredientName: 'Sugar'
    }),
    Items.create({
      amount: '1',
      recipeId: 5,
      ingredientName: 'Rabbit'
    }),
    Items.create({
      amount: '1 cups',
      recipeId: 5,
      ingredientName: 'Carrots'
    }),
    Items.create({
      amount: '1',
      recipeId: 5,
      ingredientName: 'Beans'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 5,
      ingredientName: 'Butternut squash'
    }),
    Items.create({
      amount: '1',
      recipeId: 5,
      ingredientName: 'Tomato'
    }),
    Items.create({
      amount: '1 cups',
      recipeId: 4,
      ingredientName: 'Butternut squash'
    }),
    Items.create({
      amount: '1',
      recipeId: 4,
      ingredientName: 'Chicken'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 4,
      ingredientName: 'Celery'
    }),
    Items.create({
      amount: '1',
      recipeId: 4,
      ingredientName: 'Beef'
    })
  ])

  const BookmarksList = await Promise.all([
    Bookmarks.create({
      rank: '4',
      recipeId: 5,
      userId: 1
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
