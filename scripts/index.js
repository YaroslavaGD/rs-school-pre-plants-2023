(function () {
  console.log('Yaroslava Hryzadubova. Plants. Part3\n------------------------------------------\nScore 125/125\n');
  console.log('Оценка по пунктам:\n------------------------------------------\n');
  console.log('1. При нажатии на кнопки:Gardens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50\n');
  console.log('2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50\n');
  console.log('3. В разделе contacts реализован select с выбором городов +25\n');
}());

const hamburger = document.querySelector('#buttonMenu');
const nav = document.querySelector('#nav');
const page = document.querySelector('#page');
const navItem = [...document.querySelectorAll('.nav__item')];
const details = [...document.querySelectorAll('.accordion__item')];
const serviceControls = [...document.querySelectorAll('.service-controls__item')];
const serviceContent = [...document.querySelectorAll('.service-content__item')];
const dropdown = document.querySelector('.dropdown');
const dropdownInput = dropdown.querySelector('.dropdown__input');
const dropdownList = [...dropdown.querySelectorAll('.dropdown__list-item')];
const dropdownValue = document.querySelector('.dropdown__value--hidden');
const contactAddress = document.querySelector('.contacts-address');
const contactArr = [
  {city: "Canandaigua, NY",
  phone: "+1	585	393 0001",
  address: "151 Charlotte Street"},
  {city: "New York City",
  phone: "+38	000	000 0000",
  address: "123 Second Street"},
  {city: "Yonkers, NY",
  phone: "+38	000	000 0001",
  address: "321 Third Street"},
  {city: "Sherrill, NY",
  phone: "+38	000	000 0002",
  address: "111 Last Street"}
];

  
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

  if (target !== dropdownInput) {
    dropdown.classList.remove('active');
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Tab' || e.key === 'Escape') {
    dropdown.classList.remove('active');
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

dropdownInput.addEventListener('click', e => {
  dropdown.classList.toggle('active');
});

dropdownList.forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownInput.innerText = this.innerText;
    dropdownInput.classList.add('dropdown__input--filled');
    dropdown.classList.remove('active');
    dropdownValue.value = this.dataset.value;
    fillAddress();

    if (document.documentElement.clientWidth < 500) {
      document.querySelector('.contacts__container').classList.add('contacts__container--img-disabled');
    }
  });
});

const city = contactAddress.querySelector('.dropdown__city');
const phone = contactAddress.querySelector('.dropdown__phone');
const address = contactAddress.querySelector('.dropdown__address');
const buttonCall = contactAddress.querySelector('.dropdown__call');

function fillAddress() {
  const currentIndex = dropdownValue.value;
  const currCity = contactArr[currentIndex].city;
  const currPhone = contactArr[currentIndex].phone;
  const currAddress = contactArr[currentIndex].address;

  city.innerText = currCity;
  phone.innerText = currPhone;
  phone.setAttribute('href', 'tel:' + currPhone.split(' ').join(''))
  
  address.innerText = currAddress;
  buttonCall.setAttribute('href', 'tel:' + currPhone.split(' ').join(''));

  contactAddress.classList.add('active');
}