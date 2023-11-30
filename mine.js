const user = {
   'inventory': {
      'ore': {
         'камень': 0,
         'уголь': 0,
         'медь': 0,
         'железо': 0,
         'золото': 0,
         'алмаз': 0
      },
      'balans': 0
   },
};

const mine = {
   'farmEntity': [
      'камень',
      'уголь',
      'медь',
      'железо',
      'золото',
      'алмаз',
   ],
   'shop': {
      'камень': 5,
      'уголь': 10,
      'медь': 15,
      'железо': 25,
      'золото': 50,
      'алмаз': 100
   },
};

const output = document.getElementById('output');
const farm = document.getElementById('farm');
const balans = document.getElementById('balans');
const shop = document.getElementById('shop');
const inventory = document.getElementById('inventory');
let timerFarm = 10000;

function getRandom() {
   let rand = Math.trunc(Math.random()*6)+0;
   return rand;
};

function getFarm() {
   let newOre = mine.farmEntity[getRandom()];
   user.inventory.ore[newOre] += 1;
   return newOre;
};

function getInventoryChek() {
   let outputInventory = ''
   for (let i = 0; i < mine.farmEntity.length; ++i) {
      outputInventory += ` ${mine.farmEntity[i]}: ${user.inventory.ore[mine.farmEntity[i]]}`;
   };
   output.innerHTML += `<h1>Ваш инвентарь:</h1>`
   output.innerHTML += `<h2>${outputInventory}</h2>`
};

function getViewBalans() {
   output.innerHTML = `<h2>${user.inventory.balans}</h2>`
};

function getByeOre() {
   if (document.getElementById('камень').id == 'камень') {
      document.getElementById('камень').onclick = () => {
         let plusBalans = mine.shop['камень']*user.inventory.ore['камень'];

         user.inventory.balans += mine.shop['камень']*user.inventory.ore['камень'];
         user.inventory.ore['камень'] = 0;
         
         output.innerHTML = `<h2>+ ${plusBalans}</h2>`
      };
   };

   if (document.getElementById('уголь').id == 'уголь') {
      document.getElementById('уголь').onclick = () => {
         let plusBalans = mine.shop['уголь']*user.inventory.ore['уголь'];

         user.inventory.balans += mine.shop['уголь']*user.inventory.ore['уголь'];
         user.inventory.ore['уголь'] = 0;
         
         output.innerHTML = `<h2>+ ${plusBalans}</h2>`
      };
   };

   if (document.getElementById('медь').id == 'медь') {
      document.getElementById('медь').onclick = () => {
         let plusBalans = mine.shop['медь']*user.inventory.ore['медь'];

         user.inventory.balans += mine.shop['медь']*user.inventory.ore['медь'];
         user.inventory.ore['медь'] = 0;
         
         output.innerHTML = `<h2>+ ${plusBalans}</h2>`
      };
   };

   if (document.getElementById('железо').id == 'железо') {
      document.getElementById('железо').onclick = () => {
         let plusBalans = mine.shop['железо']*user.inventory.ore['железо'];

         user.inventory.balans += mine.shop['железо']*user.inventory.ore['железо'];
         user.inventory.ore['железо'] = 0;
         
         output.innerHTML = `<h2>+ ${plusBalans}</h2>`
      };
   };

   if (document.getElementById('золото').id == 'золото') {
      document.getElementById('золото').onclick = () => {
         let plusBalans = mine.shop['золото']*user.inventory.ore['золото'];

         user.inventory.balans += mine.shop['золото']*user.inventory.ore['золото'];
         user.inventory.ore['золото'] = 0;
         
         output.innerHTML = `<h2>+ ${plusBalans}</h2>`
      };
   };

   if (document.getElementById('алмаз').id == 'алмаз') {
      document.getElementById('алмаз').onclick = () => {
         let plusBalans = mine.shop['алмаз']*user.inventory.ore['алмаз'];

         user.inventory.balans += mine.shop['алмаз']*user.inventory.ore['алмаз'];
         user.inventory.ore['алмаз'] = 0;
         
         output.innerHTML = `<h2>+ ${plusBalans}</h2>`
      };
   };
};

function getViewShop() {
   output.innerHTML = '<div id="btn_shop"></div>'
   for (let a = 0; a < mine.farmEntity.length; ++a) {
      document.getElementById('btn_shop').innerHTML += `<button type="btn" id="${mine.farmEntity[a]}">Продать ${mine.farmEntity[a]}</button>`
   };
   getByeOre();
};

farm.onclick = function getOutput() {
   let timeFarm = setInterval(() => {
      output.innerHTML = `<h1>Вы добыли: ${getFarm()}</h1>`
   }, timerFarm/10);
   
   setTimeout(() => {
      clearInterval(timeFarm);
      getInventoryChek();
   }, timerFarm);
};

balans.onclick = function () {
   getViewBalans();
};

shop.onclick = function () {
   getViewShop();
};

inventory.onclick = function () {
   output.innerHTML = ''
   getInventoryChek();
};