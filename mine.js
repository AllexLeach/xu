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
         'aa': 0,
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
      'aa',
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
      'aa': 150,
      'bb': 200,
   },
};

const counter = {
   'aa': 1,
   'bb': 1
};

const output = document.getElementById('output');
const farm = document.getElementById('farm');
const balans = document.getElementById('balans');
const shop = document.getElementById('shop');
const inventory = document.getElementById('inventory');
let timerFarm = 1000;

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
   let outputItems = ''
   for (let i = 0; i < mine.farmEntity.length; ++i) {
      outputInventory += ` ${mine.farmEntity[i]}: ${user.inventory.ore[mine.farmEntity[i]]}`;
   };
   for (item of mine.shopToByeEntity) {
      outputItems += `${item}: ${user.inventory.items[item]} `
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
         console.log(item)
         // console.log(element, counter, document.querySelector(`#${item}`), document.querySelector(`#${item}`).className);
   
         item.onclick = () => {
            // console.log(element, counter, document.querySelector(`#${element}_pm`), document.querySelector(`#${element}_pm`).className);
            if (item.className == 'plus') {
               counter[element] += 1
            } else {
               if (counter[element] <= 1) {
                  counter[element] = 1
               } else {
                  counter[element] -= 1
               }
            }
            document.querySelector(`.${element}`).innerHTML = `${counter[element]} шт.`
            document.querySelector(`.price_${element}`).innerHTML = `${mine.shopToBye[element] * counter[element]}`
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
         <h2 class="price_${item}">${mine.shopToBye[item]}</h2>
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
   let timeFarm = setInterval(() => {
      output.innerHTML = `<h1>Вы добыли: ${getFarm()}</h1>`
   }, timerFarm/10);
   
   setTimeout(() => {
      clearInterval(timeFarm);
      // getInventoryChek();
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