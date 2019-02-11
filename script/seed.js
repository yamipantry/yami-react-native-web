'use strict'

const whatever = require('./test')

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
      name: 'Minestrone Soup',
      instructions: [
        'Turn on fire, high heat',
        'Saute onions and garlic until browned',
        'Add other vegetables',
        'Add  5 cups water and vegetable stock',
        'Boil for 30 minutes'
      ],
      description: 'Gluten Free, Vegan',
      imageUrl: '/salad_soup.jpeg'
    }),
    Recipes.create({
      name: 'Nachos',
      instructions: [
        'Put chips on plate',
        'Turn oven on to 400',
        'Cover in shredded cheese',
        'Cook in oven for 10 minutes',
        'Add beans',
        'add various toppings to your liking'
      ],
      description: "Mama's nachos",
      imageUrl: '/nachos.jpg'
    }),
    Recipes.create({
      name: 'Rabbit Cacciatore',
      instructions: [
        'Saute onions, carrots, celery in olive oil',
        'Saute rabbit in another pan to brown skin',
        'Add beans and tomatoes to vegetables',
        'Put rabbit into veggie mix, add  2 cups water',
        'Simmer for 30 minutes'
      ],
      description: 'This is the best delicious recipe of all time',
      imageUrl: '/rabbit.jpeg'
    }),
    Recipes.create({
      name: 'CatFish Delight',
      instructions: [
        'Saute catfish in oil',
        'Add garlic and onions to pan',
        'Once browned, add celery, corn, and tomatoes',
        'Finish with butter'
      ],
      description: 'This recipe will only be good with some blowfish',
      imageUrl: '/catfish.jpg'
    }),
    Recipes.create({
      name: 'Beef Stew',
      instructions: [
        'Carmelize beef',
        'Add onions, garlic, celery, and carrots',
        'Add 5 cups water',
        'make roux with melted butter and flour',
        'Simmer for 2 hours, then add roux to stew'
      ],
      description: 'rabbit cacciatore',
      imageUrl: '/rabbit.jpeg'
    })
  ])

  //updating the recipe array (to report its length later on and see how many recipe objects have been added to the 'Recipes' table)
  recipe = recipe.concat(unirestRecipeDetailsFinal)

  try {
    // console.log('fin', unirestRecipeDetailsFinal[0].ingredientsIncluded)
    //   const bulk = await Recipes.bulkCreate(unirestRecipeDetailsFinal, {
    //   include: [{model: Items, as: 'ingredientsIncluded'}],

    // })
    unirestRecipeDetailsFinal.forEach(async elem => {
      const rec = await Recipes.create(elem, {
        include: [{model: Items, as: 'ingredientsIncluded'}]
      })
    })
    console.log(`bulkCreate succeeded for the 'Recipes' table.`)
  } catch (err) {
    console.log(`For some reason, bulkCreate failed for the 'Recipes' table.`)
    console.error(err)
  }

  const ingredientList = await Promise.all([
    Items.create({
      amount: '1 cup',
      recipeId: 1,
      ingredientName: 'Onions'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 1,
      ingredientName: 'Butternut squash'
    }),
    Items.create({
      amount: '1/4 cup',
      recipeId: 1,
      ingredientName: 'Garlic'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 1,
      ingredientName: 'Celery'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 1,
      ingredientName: 'Carrots'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 2,
      ingredientName: 'Beans'
    }),
    Items.create({
      amount: '2 cups',
      recipeId: 2,
      ingredientName: 'Cheddar cheese'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 2,
      ingredientName: 'Jalapenos'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 2,
      ingredientName: 'Salsa'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 3,
      ingredientName: 'Onion'
    }),
    Items.create({
      amount: '2',
      recipeId: 3,
      ingredientName: 'Rabbit'
    }),
    Items.create({
      amount: '1/4 cup',
      recipeId: 3,
      ingredientName: 'Garlic'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 3,
      ingredientName: 'Celery'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 3,
      ingredientName: 'Tomato'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 5,
      ingredientName: 'Corn'
    }),
    Items.create({
      amount: '1 filet',
      recipeId: 5,
      ingredientName: 'Catfish'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 5,
      ingredientName: 'Tomato'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 5,
      ingredientName: 'Onion'
    }),
    Items.create({
      amount: '1 tbsp',
      recipeId: 5,
      ingredientName: 'Garlic'
    }),
    Items.create({
      amount: '1',
      recipeId: 5,
      ingredientName: 'Paprika'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 4,
      ingredientName: 'Onions'
    }),
    Items.create({
      amount: '2 Lbs',
      recipeId: 4,
      ingredientName: 'Beef'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 4,
      ingredientName: 'Celery'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 4,
      ingredientName: 'Carrots'
    }),
    Items.create({
      amount: '1 cup',
      recipeId: 4,
      ingredientName: 'Flour'
    }),
    Items.create({
      amount: '1 stick',
      recipeId: 4,
      ingredientName: 'Butter'
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
