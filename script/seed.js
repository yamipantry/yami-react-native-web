'use strict'

const db = require('../server/db')
const {
  User,
  Recipes,
  Ingredients,
  Items,
  Bookmarks,
  Userfriends
} = require('../server/db/models')

const {
  unirestIngredients,
  unirestRecipeDetailsFinal
} = require('./foodstuffsObtainer')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const users = await Promise.all([
    User.create({
      userName: 'Cody',
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Wilson',
      streetName: '12 Cody St',
      city: 'san luis obispo',
      state: 'ca',
      zip: '93401',
      pantryItems: ['Butternut squash', 'Chicken', 'Beef', 'Celery'],
      profileImage: '/profilepics/Image5.png'
    }),
    User.create({
      userName: 'Murphy',
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Bedford',
      streetName: '12 murphy St',
      city: 'san luis obispo',
      state: 'ca',
      zip: '93401',
      pantryItems: ['Lettuce', 'Butternut squash', 'Love', 'Flour'],
      profileImage: '/profilepics/Image7.png'
    }),
    User.create({
      userName: 'Punny',
      email: 'pun@email.com',
      password: '123',
      firstName: 'Pun',
      lastName: 'Patenaude',
      streetName: '12 pun St',
      city: 'san luis obispo',
      state: 'ca',
      zip: '93401',
      pantryItems: ['Beans', 'Butternut squash', 'Lettuce', 'Celery'],
      profileImage: '/profilepics/Image8.png'
    }),
    User.create({
      userName: 'Maggie',
      email: 'bean@email.com',
      password: '123',
      firstName: 'Maggie',
      lastName: 'Dean',
      streetName: '12 bean st',
      city: 'san luis obispo',
      state: 'ca',
      zip: '93401',
      pantryItems: [
        'Sugar',
        'Rabbit',
        'Carrots',
        'Beans',
        'Butternut squash',
        'Tomato'
      ],
      profileImage: '/profilepics/Image1.png'
    }),
    User.create({
      userName: 'Abbie',
      email: 'abbie@email.com',
      password: '123',
      profileImage: '/profilepics/Image2.png',
      firstName: 'Abbie',
      lastName: 'Bell'
    }),
    User.create({
      userName: 'Archie',
      email: 'archie@email.com',
      password: '123',
      profileImage: '/profilepics/Image11.png',
      firstName: 'Archie',
      lastName: 'Collins'
    }),
    User.create({
      userName: 'Frank',
      email: 'Frank@email.com',
      password: '123',
      profileImage: '/pic.jpeg'
    }),
    User.create({
      userName: 'Earnest',
      email: 'earnest@email.com',
      password: '123',
      profileImage: '/pic.jpeg'
    }),
    User.create({
      userName: 'Bea',
      email: 'Bea@email.com',
      password: '123',
      profileImage: '/profilepics/Image3.png',
      firstName: 'Bea',
      lastName: 'Cortez'
    }),
    User.create({
      userName: 'Elle',
      email: 'elle@email.com',
      password: '123',
      profileImage: '/profilepics/Image4.png',
      firstName: 'Elle',
      lastName: 'Marta'
    }),
    User.create({
      userName: 'Hank',
      email: 'Hank@email.com',
      password: '123',
      profileImage: '/pic.jpeg',
      firstName: 'Hank',
      lastName: 'Smith'
    }),
    User.create({
      userName: 'Norma',
      email: 'norma@email.com',
      password: '123',
      profileImage: '/profilepics/Image6.png',
      firstName: 'Norma',
      lastName: 'Wade'
    }),
    User.create({
      userName: 'Pattie',
      email: 'pattie@email.com',
      password: '123',
      profileImage: '/profilepics/Image9.png',
      firstName: 'Pattie',
      lastName: 'Reed'
    }),
    User.create({
      userName: 'Darla',
      email: 'darla@email.com',
      password: '123',
      profileImage: '/profilepics/Image10.png',
      firstName: 'Darla',
      lastName: 'Newsom'
    }),
    User.create({
      userName: 'Joan',
      email: 'joan@email.com',
      password: '123',
      profileImage: '/profilepics/Image12.png',
      firstName: 'Joan',
      lastName: 'Lodge'
    }),
    User.create({
      userName: 'John',
      email: 'john@email.com',
      password: '123',
      profileImage: '/pic.jpeg',
      firstName: 'John',
      lastName: 'Carducci'
    }),
    User.create({
      userName: 'Nina',
      email: 'nina@email.com',
      password: '123',
      profileImage: '/pic.jpeg',
      firstName: 'Nina',
      lastName: 'Wallace'
    }),
    User.create({
      userName: 'Delores',
      email: 'delores@email.com',
      password: '123',
      profileImage: '/pic.jpeg',
      firstName: 'Delores',
      lastName: 'Pineiro'
    }),
    User.create({
      userName: 'Lenny',
      email: 'lenny@email.com',
      password: '123',
      firstName: 'Lenny',
      lastName: 'Tung'
    }),
    User.create({
      userName: 'Lulu',
      email: 'lulu@email.com',
      password: '123',
      profileImage: '/pic.jpeg',
      firstName: 'Lulu',
      lastName: 'Gosai'
    })
  ])

  //updating the ingredients array (to report its length later on and see how many ingredient objects have been added to the 'Ingredients' table)
  const ingredients = [...unirestIngredients]

  try {
    await Ingredients.bulkCreate(unirestIngredients)

    console.log(`bulkCreate succeeded for the 'Ingredients' table.`)
  } catch (err) {
    console.log(
      `For some reason, bulkCreate failed for the 'Ingredients' table.`
    )
    console.err(err)
  }

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

  //updating the recipe array (to report its length later on and see how many recipe objects have been added to the 'Recipes' table)
  recipe = recipe.concat(unirestRecipeDetailsFinal)

  try {
    await Recipes.bulkCreate(unirestRecipeDetailsFinal)

    console.log(`bulkCreate succeeded for the 'Recipes' table.`)
  } catch (err) {
    console.log(`For some reason, bulkCreate failed for the 'Recipes' table.`)
    console.err(err)
  }

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
      userId: 3
    })
  ])

  const FriendsList = await Promise.all([
    Userfriends.create({
      friendId: 1,
      userId: 3
    }),
    Userfriends.create({
      friendId: 2,
      userId: 3
    }),
    Userfriends.create({
      friendId: 4,
      userId: 3
    }),
    Userfriends.create({
      friendId: 5,
      userId: 3
    }),
    Userfriends.create({
      friendId: 6,
      userId: 3
    }),
    Userfriends.create({
      friendId: 7,
      userId: 3
    }),
    Userfriends.create({
      friendId: 8,
      userId: 3
    }),
    Userfriends.create({
      friendId: 9,
      userId: 3
    }),
    Userfriends.create({
      friendId: 10,
      userId: 3
    }),
    Userfriends.create({
      friendId: 11,
      userId: 3
    }),
    Userfriends.create({
      friendId: 12,
      userId: 3
    }),
    Userfriends.create({
      friendId: 13,
      userId: 3
    }),
    Userfriends.create({
      friendId: 14,
      userId: 3
    }),
    Userfriends.create({
      friendId: 15,
      userId: 3
    }),
    Userfriends.create({
      friendId: 16,
      userId: 3
    }),
    Userfriends.create({
      friendId: 17,
      userId: 3
    }),
    Userfriends.create({
      friendId: 18,
      userId: 3
    }),
    Userfriends.create({
      friendId: 19,
      userId: 3
    }),
    Userfriends.create({
      friendId: 20,
      userId: 3
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
