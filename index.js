import { DateTime } from './modules/luxton.js';
import Library from './modules/Library.js';

const lib = document.getElementById('library');
const navList = document.querySelectorAll('.nav-link');
const homePage = document.getElementById('home');
const sections = document.querySelectorAll('section');
const date = document.querySelector('.date');



const library = new Library(lib);
let getDate = DateTime.now();
date.innerHTML = `${getDate.monthLong} ${getDate.day} ${getDate.year}, ${getDate.hour}:${getDate.minute}:${getDate.second}`;
// Update the date every second
const updateDate = () => {
  getDate = DateTime.now();
  date.innerHTML = `${getDate.monthLong} ${getDate.day} ${getDate.year}, ${getDate.hour}:${getDate.minute}:${getDate.second}`;
};
setInterval(updateDate, 1000);

navList.forEach((item) => {
  item.addEventListener('click', (e) => {
    navList.forEach((hhh) => {
      hhh.classList.remove('active');
      const index = Number(e.target.getAttribute('data'));
      Array.from(sections, (section, ind) => ind === index ? section.classList.remove('hide') : section.classList.add('hide'));
    });
    item.classList.add('active');
  });
});

document.querySelector('.add-book').addEventListener('submit', (e) => {
  e.preventDefault();
  const object = {
    title: '',
    author: '',
  };
  object.title = document.querySelector('.title').value;
  object.author = document.querySelector('.author').value;

  if (object.title === '' || object.author === '') {
    return;
  }
  library.addBook(object, lib);
  document.querySelector('.title').value = '';
  document.querySelector('.author').value = '';
});
