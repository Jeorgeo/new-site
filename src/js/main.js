// mobile menu

var menuNav = document.querySelector('.header__menu');
var toggleBtn = document.querySelector('.mobile-header__hamburger');
var menuParentBtn = document.querySelectorAll('.menu-item-has-children');
var plusBtn = '<span class="plus-btn"></span>';
zzz = menuParentBtn.length;

toggleBtn.addEventListener('click', moveMenu);

function moveMenu(){
  if(toggleBtn.classList.contains('is-active')) {
      toggleBtn.classList.remove('is-active');
      menuNav.classList.remove('active');
     } else {
       toggleBtn.classList.add('is-active');
       menuNav.classList.add('active');
      }
};

//Добавление плюса в аккордеон

for (var i = 0; i < zzz; i++) {
menuParentBtn[i].insertAdjacentHTML('afterbegin', plusBtn);
}

var plusBtnAr = document.querySelectorAll('.plus-btn');

//Отоработка меню типа аккордеон

for (var i = 0; i < zzz; i++) {
  plusBtnAr[i].addEventListener('click', function(evt) {
    //debugger
     evt.preventDefault();
     var current = evt.currentTarget;
     if (current.classList.contains("plus-btn")) {
     var n = zzz;
     while(n--) {
        if(plusBtnAr[n] == current) {
           var x = n;
           break;
        }
     }
     for (var i = 0; i < zzz; i++) {
       menuParentBtn[i].querySelector('.sub-menu').classList.remove('active');
       plusBtnAr[i].classList.remove('active');
     }
     menuParentBtn[x].querySelector('.sub-menu').classList.add('active');
     plusBtnAr[x].classList.add('active');
   } else {
      evt.preventDefault();
     }
  });
};
