import Swiper, { Pagination, Autoplay } from 'swiper';

// configure Swiper to use modules
Swiper.use([Pagination, Autoplay]);

var swiper = new Swiper('.swiper-container', {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }
});
