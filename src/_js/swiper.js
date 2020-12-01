import Swiper, { Pagination, Autoplay } from 'swiper';

// configure Swiper to use modules
Swiper.use([Pagination, Autoplay]);

var swiperAuto = new Swiper('.swiper-autoplay', {
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

var swiper = new new Swiper('.swiper-default', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
