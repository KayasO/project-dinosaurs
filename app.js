const data = {
  Dinos: [
    {
      species: 'Triceratops',
      weight: 13000,
      height: 114,
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Cretaceous',
      facts: [
        'First discovered in 1889 by Othniel Charles Marsh',
        "Triceratops is Greek for 'three-horned face', but this dinosaur actually had only two genuine horns",
        'Skull was one-third of its body',
      ],
    },
    {
      species: 'Tyrannosaurus Rex',
      weight: 11905,
      height: 144,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      facts: [
        'The largest known skull measures in at 5 feet long.',
        "The word 'Tyrannosaurus' literally means 'Tyrant Lizard' in Greek",
        'The landmass that today forms the Western Northern America was the home for T. Rex back in time',
      ],
    },
    {
      species: 'Anklyosaurus',
      weight: 10500,
      height: 55,
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Cretaceous',
      facts: [
        'Anklyosaurus survived for approximately 135 million years.',
        'The armor plates of the Ankylosaurus would have acted as a shield',
      ],
    },
    {
      species: 'Brachiosaurus',
      weight: 70000,
      height: '372',
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Jurasic',
      facts: [
        'An asteroid was named 9954 Brachiosaurus in 1991.',
        'Longer front limbs than hind limbs',
        'Adults could live to be 100 years old',
      ],
    },
    {
      species: 'Stegosaurus',
      weight: 11600,
      height: 79,
      diet: 'herbavor',
      where: 'North America, Europe, Asia',
      when: 'Late Jurasic to Early Cretaceous',
      facts: [
        'The Stegosaurus had between 17 and 22 seperate places and flat spines.',
        'Stegosaurus had a brain the size of a walnut',
      ],
    },
    {
      species: 'Elasmosaurus',
      weight: 16000,
      height: 59,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      facts: [
        'Elasmosaurus was a marine reptile first discovered in Kansas.',
        'The first fossil of elasmosaurus was discovered in kansas',
        'Elasmosaurus was incapable of raising its neck above the water',
      ],
    },
    {
      species: 'Pteranodon',
      weight: 44,
      height: 20,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      facts: [
        'Actually a flying reptile, the Pteranodon is not a dinosaur.',
        "The name Pteranodon means: 'Toothless Wing'",
        'The Pteranodon lived between 88 and 84.5 million years ago.',
      ],
    },
    {
      species: 'Pigeon',
      weight: 0.5,
      height: 9,
      diet: 'herbavor',
      where: 'World Wide',
      when: 'Holocene',
      facts: ['All birds are living dinosaurs.'],
    },
  ],
}

// Create Dino Constructor
function Dinosaur(species, weight, height, diet, where, when, facts) {
  this.species = species
  this.weight = weight
  this.height = height
  this.diet = diet
  this.where = where
  this.when = when
  this.facts = facts
}
// Create Dino Objects
const dinos = data['Dinos'].map(
  (dino) =>
    new Dinosaur(
      dino.species,
      dino.weight,
      dino.height,
      dino.diet,
      dino.where,
      dino.when,
      dino.facts
    )
)

const shuffleDinosaurs = () => {
  // every sort will move an element either one element to the front, back or stay in place
  for (let i = 0; i < Math.random() * 100; i++) {
    dinos.sort(() => Math.random() - 0.5)
  }
}

// Create Human Object
let human = {
  name: '',
  weight: 0,
  height: 0,
  diet: '',
}

// Use IIFE to get human data from form
const getHumanData = (() => {
  const nameEl = document.getElementById('name')
  const feetEl = document.getElementById('feet')
  const inchesEl = document.getElementById('inches')
  const weightEl = document.getElementById('weight')
  const dietEl = document.getElementById('diet')

  return () => {
    human = {
      name: nameEl.value,
      height: parseFloat(feetEl.value) * 12 + parseFloat(inchesEl.value),
      weight: weightEl.value,
      diet: dietEl.value.toLowerCase(),
    }
  }
})()

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
const printHeightDiff = (dinoHeight) => {
  const diff = dinoHeight - human.height
  if (diff > 0) {
    return `${diff} inches taller`
  } else if (diff < 0) {
    return `${-diff} inches smaller`
  } else {
    return 'the same height'
  }
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
const printWeightDiff = (dinoWeight) => {
  const diff = dinoWeight - human.weight
  if (diff > 0) {
    return `${diff} lbs heavier`
  } else if (diff < 0) {
    return `${-diff} lbs lighter`
  } else {
    return 'the same weight'
  }
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
const hasSameDiet = (dinoDiet) => {
  if (human.diet === dinoDiet) {
    return 'had the same diet'
  } else {
    return `a ${dinoDiet}`
  }
}

const buildComparison = (dino) => {
  return `
    Compared to you the ${dino.species} was<br/>
    ${printHeightDiff(dino.height)}<br/>
    ${printWeightDiff(dino.weight)}<br/>
    ${hasSameDiet(dino.diet)}
  `
}

const addListener = () => {
  const gridItems = document.getElementsByClassName('info-container')

  for (const item of gridItems) {
    item.addEventListener('mouseover', (event) => {
      const factEl = event.target.parentElement.firstChild
      const compareEl = event.target.parentElement.lastChild
      factEl.style.display = 'none'
      compareEl.style.display = 'block'
    })

    item.addEventListener('mouseleave', (event) => {
      const factEl = event.target.firstChild
      const compareEl = event.target.lastChild
      factEl.style.display = 'block'
      compareEl.style.display = 'none'
    })
  }
}

// Generate Tiles for each Dino in Array
const generateDinoElement = (dino) => {
  const newChild = document.createElement('div')
  newChild.setAttribute('class', 'grid-item')

  const species = document.createElement('h3')
  species.innerHTML = dino.species
  newChild.appendChild(species)

  const img = document.createElement('img')
  img.setAttribute('src', `./images/${dino.species}.png`)
  img.setAttribute('alt', `./images/${dino.species}.png`)
  newChild.appendChild(img)

  const fact = document.createElement('p')
  fact.setAttribute('class', 'fact')
  fact.innerHTML = dino.facts[Math.floor(Math.random() * dino.facts.length)]

  const compare = document.createElement('p')
  compare.setAttribute('class', 'compare')
  compare.style.display = 'none'
  compare.innerHTML = buildComparison(dino)

  const info = document.createElement('div')
  info.setAttribute('class', 'info-container')
  info.appendChild(fact)
  info.appendChild(compare)
  newChild.appendChild(info)

  return newChild
}

const generateHumanElement = () => {
  const newChild = document.createElement('div')
  newChild.setAttribute('class', 'grid-item')

  const name = document.createElement('h3')
  name.innerHTML = human.name
  newChild.appendChild(name)

  const img = document.createElement('img')
  img.setAttribute('src', `./images/human.png`)
  newChild.appendChild(img)

  return newChild
}

// Add tiles to DOM
const addInfographicToDOM = () => {
  const container = document.getElementById('dino-compare')
  const grid = document.createElement('div')
  grid.setAttribute('id', 'grid')
  container.appendChild(grid)

  for (const dino of dinos) {
    const dinoEl = generateDinoElement(dino)
    grid.appendChild(dinoEl)
  }

  grid.insertBefore(generateHumanElement(), grid.children[4])

  addListener()
}

// Remove form from screen
const removeForm = () =>
  document.getElementsByClassName('form-container')[0].remove()

// On button click, prepare and display infographic
const button = document.getElementById('btn')
btn.addEventListener('click', () => {
  getHumanData()
  removeForm()
  shuffleDinosaurs()
  addInfographicToDOM()
})
