// (function () {
//   console.log('Yaroslava Hryzadubova. Plants. Part3\n------------------------------------------\nScore 75/75\n');
//   console.log('Оценка по пунктам:\n------------------------------------------\n');
//   console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +24\n');
//   console.log('2. Вёрстка соответствует макету. Ширина экрана 380px +24\n');
//   console.log('3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n');
//   console.log('4. На ширине экрана 380рх и меньше реализовано адаптивное меню +22 (Допускается появление адаптивного меня на ширине более 380, но не допускается на ширине более 770px)\n');
//   console.log('- при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка +2\n');
//   console.log('- при нажатии на бургер-иконку плавно появляется адаптивное меню +4\n');
//   console.log('- адаптивное меню соответствует цветовой схеме макета +4\n');
//   console.log('- при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4\n');
//   console.log('- ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4\n');
//   console.log('- при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4\n');
// }());

const hamburger = document.querySelector('#buttonMenu');
const nav = document.querySelector('#nav');
const page = document.querySelector('#page');
const navItem = [...document.querySelectorAll('.nav__item')];
const details = [...document.querySelectorAll('.accordion__item')];
const serviceControls = [...document.querySelectorAll('.service-controls__item')];
const serviceContent = [...document.querySelectorAll('.service-content__item')];

  
const toggleMenu = () => {
  hamburger.ariaExpanded = hamburger.ariaExpanded == 'false' ? 'true' : 'false';
  
  nav.classList.toggle('nav--open');
  page.classList.toggle('page--clip');
}
  
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();

  toggleMenu();
});

document.addEventListener('click', e => {
  let target = e.target;
  let isNav = target == nav || nav.contains(target);
  let isHamburger = target == hamburger;
  let navIsOpen = nav.classList.contains('nav--open');

  if (!isNav && !isHamburger && navIsOpen) {
    toggleMenu();
  }
});

navItem.forEach(element => {
  element.addEventListener('click', e => {
    toggleMenu();
  });
});

window.addEventListener("resize", function() {
  if (document.documentElement.clientWidth > 710) {
    hamburger.ariaExpanded = 'false';
    page.classList.remove('page--clip');
    nav.classList.remove('nav--open');
  }
}, false);

details.forEach(targetDetail => {
  targetDetail.addEventListener('click', e => {
    details.forEach(element => {
      if (element !== targetDetail) element.removeAttribute("open");
    });
  });
});

serviceControls.forEach(element => {
  element.addEventListener('click', e => {
    const numberActive = serviceControls.reduce((sum, val) => sum += val.classList.contains('active')? 1 : 0, 0);

    if (element.classList.contains('active')) {

      element.classList.remove('active');
      serviceControls.forEach(el => el.removeAttribute("disabled", ""));

    } else {

      element.classList.add('active');

      if (numberActive == 1) {
        serviceControls.forEach(el => {
          if (!el.classList.contains('active')) el.setAttribute("disabled", "");
        });
      }
      
    }
    const blurSection = serviceControls.filter(button => !button.classList.contains('active'))
                                        .map(button => button.getAttribute('data-info'));
    serviceContent.forEach(card => {
      if (blurSection.length == 3) card.classList.remove('blur');

      if (blurSection.length < 3) {
        const cardInfo = card.getAttribute('data-info');
        if (blurSection.includes(cardInfo)) {
          card.classList.add('blur');
        } else {
          card.classList.remove('blur');
        }
      }

    });
  });
});