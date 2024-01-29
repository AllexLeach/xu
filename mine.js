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
      'balans': 0,
      'items' : {
         'пиво': 0,
         'bb': 0
      },
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
   'shopToByeEntity': [
      'пиво',
      'bb',
   ],
   'shop': {
      'камень': 5,
      'уголь': 10,
      'медь': 15,
      'железо': 25,
      'золото': 50,
      'алмаз': 100
   },
   'shopToBye': {
      'пиво': 500,
      'bb': 200,
   },
};

const counter = {
   'пиво': 1,
   'bb': 1
};

const output = document.getElementById('output');
const farm = document.getElementById('farm');
const balans = document.getElementById('balans');
const shop = document.getElementById('shop');
const inventory = document.getElementById('inventory');
let timerFarm = 1000;
let delayAnimation;
let delayAnimationOre;

function getRandom() {
   let rand = Math.trunc(Math.random()*6)+0;
   return rand;
};

function getFarm() {
   let newOre = mine.farmEntity[getRandom()];
   user.inventory.ore[newOre] += 1;

   document.querySelector('.plus_ore').innerHTML += `+1 ${newOre}`

   return newOre;
};

function getInventoryChek() {
   let outputInventory = ''
   let outputItems = ''
   for (let i = 0; i < mine.farmEntity.length; ++i) {
      outputInventory += ` ${mine.farmEntity[i]}: ${user.inventory.ore[mine.farmEntity[i]]}`;
   };
   for (item of mine.shopToByeEntity) {
      outputItems += `${item}: ${user.inventory.items[item]} шт. `
   }
   output.innerHTML += `<h1>Ваш инвентарь:</h1>`
   output.innerHTML += `<h2>${outputInventory}</h2>`
   output.innerHTML += `<h2>${outputItems}</h2>`
};

function getViewBalans() {
   output.innerHTML = `<h2>${user.inventory.balans}</h2>`
};

function getByeOre() {
   mine.farmEntity.forEach(item => {
      document.getElementById(item).onclick = () => {
         let plusBalans = mine.shop[item]*user.inventory.ore[item];
         // console.log(item)

         user.inventory.balans += mine.shop[item]*user.inventory.ore[item];
         user.inventory.ore[item] = 0;
            
         output.innerHTML = `<h2>+ ${plusBalans}</h2>`
      };
   });
};

function byeAll() {
   // console.log(user.inventory.balans)
   let plusBalans = 0;
   for (element of mine.farmEntity) {
      plusBalans += mine.shop[element]*user.inventory.ore[element];
      // console.log(element)

      user.inventory.ore[element] = 0;
   }
   user.inventory.balans += plusBalans;
   // console.log(user.inventory.balans)
   output.innerHTML = `<h2>+ ${plusBalans}</h2>`
}

function byeItems() {
   document.querySelector('#btn_shop').innerHTML += `<h2 class="balans_in_shop">Ваш баланс: ${user.inventory.balans}</h2>`

   mine.shopToByeEntity.forEach(element => {   
      document.querySelectorAll(`#${element}_pm`).forEach(item => {
   
         item.onclick = () => {
            if (item.className == 'plus') {
               if (mine.shopToBye[element] * (counter[element]+1) <= user.inventory.balans) {
                  counter[element] += 1
               } else {
                  counter[element] = counter[element]
               }
            } else {
               if (counter[element] <= 1) {
                  counter[element] = 1
               } else {
                  counter[element] -= 1
               }
            }
            document.querySelector(`.${element}`).innerHTML = `${counter[element]} шт.`
            document.querySelector(`.price_${element}`).innerHTML = `${mine.shopToBye[element] * counter[element]} <img src="https://cdn-icons-png.flaticon.com/512/7124/7124616.png">`
         };
      });

      document.querySelector(`#${element}`).onclick = function() {
         let price = mine.shopToBye[element] * counter[element];
         if (user.inventory.balans-price < 0) {
            counter[element] = 1
            document.querySelector('#btn_shop').innerHTML = '<h2>Недостаточно средств</h2>'
         } else {
            user.inventory.balans -= price
            user.inventory.items[element] += counter[element]
            counter[element] = 1
            document.querySelector(`.${element}`).innerHTML = `${counter[element]} шт.`
            document.querySelector(`.price_${element}`).innerHTML = `${mine.shopToBye[element] * counter[element]}`
            document.querySelector('.balans_in_shop').innerHTML = `Ваш баланс: ${user.inventory.balans}`
         }
         // console.log(user.inventory, price)
      }
   });
}

function getViewSell() {
   for (let a = 0; a < mine.farmEntity.length; ++a) {
      document.getElementById('btn_shop').innerHTML += `<button type="btn" id="${mine.farmEntity[a]}">Продать ${mine.farmEntity[a]}</button>`
   };
   document.getElementById('btn_shop').innerHTML += `<button type="btn" id="bye_all">Продать всё</button>`
   document.querySelector('#bye_all').onclick = function() {
      byeAll();
   };
   getByeOre();
}

function getViewBye() {
   // console.log(mine.shopToBye);  за ${mine.shopToBye[item]}
   for (item of mine.shopToByeEntity) {
      document.querySelector('#btn_shop').innerHTML += `<div class='bye_items'>
         <button type="btn" id="${item}">Купить '${item}'</button>
         <div class="count">
            <button type="btn" class="minus" id="${item}_pm">-</button>
            <h2 class="${item}">${counter[item]} шт.</h2>
            <button type="btn" class="plus" id="${item}_pm">+</button>
         </div>
         <h2 class="price_${item}">${mine.shopToBye[item]} <img src="https://cdn-icons-png.flaticon.com/512/7124/7124616.png"></h2>
      </div>`
   };
   byeItems();
};

function getViewShop() {
   output.innerHTML = `<div id="btn_shop">
      <button type='btn' class='sell'>Продать</button>
      <button type='btn' class='bye'>Купить</button>
   </div>`
   document.querySelector('.sell').onclick = function() {
      document.querySelector('#btn_shop').innerHTML = ''
      getViewSell();
   };
   document.querySelector('.bye').onclick = function() {
      document.querySelector('#btn_shop').innerHTML = ''
      getViewBye();
   };
};

farm.onclick = function getOutput() {
   clearTimeout(delayAnimation);
   clearTimeout(delayAnimationOre);
   
   output.innerHTML = `<div class="farm">
      <span class="pickaxe">
         <img src="https://cdn-icons-png.flaticon.com/512/7266/7266601.png">
      </span>
      <h2 class="plus_ore"></h2>
      <button type="btn" class="rock">
         <img src="https://cdn-icons-png.flaticon.com/512/9139/9139978.png">
      </button>
   </div>`

   document.querySelector('.rock').onclick = () => {
      getFarm();

      document.querySelector('.pickaxe').classList.toggle('active');
      document.querySelector('.plus_ore').classList.toggle('active');

      delayAnimation = setTimeout(() => {
         
         document.querySelector('.pickaxe').classList.toggle('active');
      }, 250);
      
      delayAnimationOre = setTimeout(() => {
         document.querySelector('.plus_ore').innerHTML = ''
         
         document.querySelector('.plus_ore').classList.toggle('active');
      }, 500);
   };
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