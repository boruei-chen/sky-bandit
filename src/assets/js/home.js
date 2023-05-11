let gamePlaySlider;
let nftsSlider;
let heroCrystalTrailerYTPlayer;
let heroCrystalTrailerYTPlayerReplacement;

const gamePlaySkeletalAnimationsData = [
  {
    instance: null,
    id: 'five-person-skeletal-animation',
    jsonUrl: 'src/assets/skeletal-animations/5person/5person.json',
    atlasUrl: 'src/assets/skeletal-animations/5person/5person.atlas'
  },
  {
    instance: null,
    id: 'bat-fight-skeletal-animation',
    jsonUrl: 'src/assets/skeletal-animations/BatFight/BatFight.json',
    atlasUrl: 'src/assets/skeletal-animations/BatFight/BatFight.atlas'
  },
  {
    instance: null,
    id: 'bia-wish-skeletal-animation',
    jsonUrl: 'src/assets/skeletal-animations/BiaWish/BiaWish.json',
    atlasUrl: 'src/assets/skeletal-animations/BiaWish/BiaWish.atlas'
  }
];

function onYouTubeIframeAPIReady () {
  heroCrystalTrailerYTPlayer = new YT.Player('hero-crystal-trailer-YT', {
    events: {
      'onStateChange': function (event) {
        if (event.data === 1) gamePlaySlider.autoplay.stop();
        if (event.data === 0) gamePlaySlider.autoplay.start();
      }
    }
  });
  heroCrystalTrailerYTPlayerReplacement = new YT.Player('hero-crystal-trailer-YT--replacement', {
    events: {
      'onStateChange': function (event) {
        if (event.data === 1) gamePlaySlider.autoplay.stop();
        if (event.data === 0) gamePlaySlider.autoplay.start();
      }
    }
  });
}

function setHeaderNavigationItemActive () {
  const headerElemHeight = document.querySelector('header').clientHeight;
  const currentScrollPos = window.pageYOffset + headerElemHeight;
  const pcNavItemElems = document.querySelectorAll('.header__pc-nav-item');
  const mobileNavItemElems = document.querySelectorAll('.header__mobile-nav-item');
  const sectionOffsetTopList = Array.from(pcNavItemElems).map((elem) => document.querySelector(`.${elem.dataset.targetSection}`).offsetTop);
  const navActiveItemIndex = sectionOffsetTopList.indexOf(sectionOffsetTopList.filter((offsetTop) => currentScrollPos >= offsetTop).pop());
  Array.from(pcNavItemElems).forEach((elem) => elem.classList.remove('header__pc-nav-item--active'));
  Array.from(mobileNavItemElems).forEach((elem) => elem.classList.remove('header__mobile-nav-item--active'));
  pcNavItemElems[navActiveItemIndex].classList.add('header__pc-nav-item--active');
  mobileNavItemElems[navActiveItemIndex].classList.add('header__mobile-nav-item--active');
}

function scrollToTargetSection (event) {
  const currentWindowWidth = window.innerWidth;
  const headerElem = document.querySelector('header');
  const sectionElem = document.querySelector(`.${event.target.dataset.targetSection}`);
  if (sectionElem) {
    const sectionElemOffsetTop = currentWindowWidth > 768 ? sectionElem.offsetTop : sectionElem.offsetTop - headerElem.clientHeight;
    window.scrollTo({ top: sectionElemOffsetTop, behavior: 'smooth' });
  }
}

function closeMobileMenu () {
  const statusCheckboxElem = document.querySelector('#mobile-menu-active-status');
  if (statusCheckboxElem) statusCheckboxElem.checked = false;
}

function executeSectionAnimationConds (mode, sectionNameList, currentSectionName, windowBottomPos, sectionHalfPos) {
  switch (mode) {
    case 'init': return true;
    case 'scroll': {
      const isLast = sectionNameList.findIndex((name) => name.includes(currentSectionName)) === sectionNameList.length - 1;
      return isLast ? windowBottomPos > sectionHalfPos : true;
    }
    default: return undefined;
  }
}

function triggerTargetSectionAnimation (mode) {
  const windowBottomPos = window.pageYOffset + window.innerHeight;
  const navItemElems = document.querySelectorAll('.header__pc-nav-item');
  const sectionList = Array.from(navItemElems).map((elem) => ({ name: elem.dataset.targetSection, offsetTop: document.querySelector(`.${elem.dataset.targetSection}`).offsetTop, height: document.querySelector(`.${elem.dataset.targetSection}`).clientHeight }));
  const currentSectionIndex = sectionList.indexOf(sectionList.filter((section) => windowBottomPos > section.offsetTop).pop());
  const sectionHalfPos = sectionList[currentSectionIndex].offsetTop + (sectionList[currentSectionIndex].height / 2);
  const previewedSectionNameList = sectionList.map((section) => section.name).filter((_, index) => index <= currentSectionIndex);
  if (
    previewedSectionNameList.includes('game-play') &&
    executeSectionAnimationConds(mode, previewedSectionNameList, 'game-play', windowBottomPos, sectionHalfPos)
  ) {
    setTimeout(() => {
      const gamePlaySkeletalAnimationContainerElems = document.querySelectorAll('.game-play__skeletal-animation-container');
      const gamePlayIntroduceElems = document.querySelectorAll('.game-play__introduce');
      if (!gamePlaySkeletalAnimationContainerElems[1].classList.contains('game-play__skeletal-animation-container--active')) gamePlaySkeletalAnimationContainerElems[1].classList.add('game-play__skeletal-animation-container--active');
      if (!gamePlayIntroduceElems[1].classList.contains('game-play__introduce--active')) gamePlayIntroduceElems[1].classList.add('game-play__introduce--active');
    }, 0);
  }
  if (
    previewedSectionNameList.includes('nfts') &&
    executeSectionAnimationConds(mode, previewedSectionNameList, 'nfts', windowBottomPos, sectionHalfPos)
  ) {
    const nfts1stItemElems = document.querySelectorAll('.nfts-1st__item');
    Array.from(nfts1stItemElems).forEach((elem, i) => {
      setTimeout(() => {
        if (!elem.classList.contains('nfts-1st__item--active')) {
          elem.classList.add('nfts-1st__item--active');
        }
      }, i * 350);
    });
  }
  if (
    previewedSectionNameList.includes('sky-bandit-crystal') &&
    executeSectionAnimationConds(mode, previewedSectionNameList, 'sky-bandit-crystal', windowBottomPos, sectionHalfPos)
  ) {
    const skyBanditCrystalItemElems = document.querySelectorAll('.sky-bandit-crystal__item');
    Array.from(skyBanditCrystalItemElems).forEach((elem, i) => {
      setTimeout(() => {
        if (!elem.classList.contains('sky-bandit-crystal__item--active')) {
          elem.classList.add('sky-bandit-crystal__item--active');
        }
      }, i * 350);
    });
  }
  if (
    previewedSectionNameList.includes('team') &&
    executeSectionAnimationConds(mode, previewedSectionNameList, 'team', windowBottomPos, sectionHalfPos)
  ) {
    const teamMemberElems = document.querySelectorAll('.team__member');
    Array.from(teamMemberElems).forEach((elem, i) => {
      setTimeout(() => {
        if (!elem.classList.contains('team__member--active')) {
          elem.classList.add('team__member--active');
        }
      }, i * 350);
    });
  }
  if (
    previewedSectionNameList.includes('partners') &&
    executeSectionAnimationConds(mode, previewedSectionNameList, 'partners', windowBottomPos, sectionHalfPos)
  ) {
    const partnersLogoElems = document.querySelectorAll('.partners__logo');
    Array.from(partnersLogoElems).forEach((elem, i) => {
      setTimeout(() => {
        if (!elem.classList.contains('partners__logo--active')) {
          elem.classList.add('partners__logo--active');
        }
      }, i * 350);
    });
  }
}

function createHeroCrystalTrailerVideoIframe (id) {
  const iframeElem = document.createElement('iframe');
  iframeElem.src = 'https://www.youtube.com/embed/hcGbJSCrKqI?enablejsapi=1';
  iframeElem.id = id;
  iframeElem.title = 'YouTube video player';
  iframeElem.frameborder = '0';
  iframeElem.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframeElem.allowfullscreen = true;
  return iframeElem;
}

function initializeAppScrollEventListener () {
  document.addEventListener('scroll', function () {
    setHeaderNavigationItemActive();
    triggerTargetSectionAnimation('scroll');
  });
}

function initializeHeaderNavigation () {
  setHeaderNavigationItemActive();

  let lastScrollPos = 0;
  window.addEventListener('scroll', function () {
    const currentWindowWidth = window.innerWidth;
    if (currentWindowWidth > 768) {
      const headerElem = document.querySelector('header');
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos <= 0) {
        headerElem.classList.remove('header--hidden');
        return;
      }
      if (currentScrollPos < headerElem.clientHeight) {
        return;
      }
      if (currentScrollPos > lastScrollPos && !headerElem.classList.contains('header--hidden')) {
        headerElem.classList.add('header--hidden');
      } else if (currentScrollPos < lastScrollPos && headerElem.classList.contains('header--hidden')) {
        headerElem.classList.remove('header--hidden');
      }
      lastScrollPos = currentScrollPos;
    }
  });

  window.addEventListener('resize', function () {
    const currentWindowWidth = window.innerWidth;
    const headerElem = document.querySelector('header');
    if (currentWindowWidth <= 768 && headerElem.classList.contains('header--hidden')) {
      headerElem.classList.remove('header--hidden');
    }
  });

  const pcNavItemElems = document.querySelectorAll('.header__pc-nav-item');
  const mobileNavItemElems = document.querySelectorAll('.header__mobile-nav-item');
  Array.from(pcNavItemElems).forEach((elem) => { elem.addEventListener('click', scrollToTargetSection); });
  Array.from(mobileNavItemElems).forEach((elem) => { elem.addEventListener('click', function (event) { scrollToTargetSection(event); closeMobileMenu(); }) });
}

function initializeCoverSkeletalAnimation () {
  const skeletalAnimationElem = document.querySelector('#cover-skeletal-animation');
  if (skeletalAnimationElem) {
    new spine.SpinePlayer('cover-skeletal-animation', {
      jsonUrl: 'src/assets/skeletal-animations/Cover/Cover.json',
      atlasUrl: 'src/assets/skeletal-animations/Cover/Cover.atlas',
      alpha: true,
      backgroundColor: '#00000000',
      showControls: false,
      success: function (player) {
        player.animationState.setAnimation(0, 'animation', true, 0);
      }
    });
  }
}

function initializeThreePersonSkeletalAnimation () {
  const skeletalAnimationElem = document.querySelector('#three-person-skeletal-animation');
  if (skeletalAnimationElem) {
    new spine.SpinePlayer('three-person-skeletal-animation', {
      jsonUrl: 'src/assets/skeletal-animations/ThreePerson/ThreePerson.json',
      atlasUrl: 'src/assets/skeletal-animations/ThreePerson/ThreePerson.atlas',
      alpha: true,
      backgroundColor: '#00000000',
      showControls: false,
      success: function (player) {
        player.animationState.setAnimation(0, 'animation', true, 0);
      }
    });
  }
}

function initializeGamePlaySlider () {
  gamePlaySlider = new Swiper('#game-play-slider', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    navigation: {
      prevEl: '.slider__prev-btn',
      nextEl: '.slider__next-btn',
      disabledClass: 'slider__btn--disabled'
    },
    pagination: {
      el: '.slider__pagination',
      bulletClass: 'slider__pagination-bullet',
      bulletActiveClass: 'slider__pagination-bullet--active'
    },
    on: {
      realIndexChange: (swiper) => {
        const sliderElem = document.querySelector('#game-play-slider');
        const slideElems = sliderElem.querySelectorAll('.swiper-slide');
        const skeletalAnimationContainerElems = sliderElem.querySelectorAll('.game-play__skeletal-animation-container');
        const skeletalAnimationWrapElems = sliderElem.querySelectorAll('.game-play__skeletal-animation-wrap');
        const introduceElems = sliderElem.querySelectorAll('.game-play__introduce');
        Array.from(skeletalAnimationContainerElems).forEach((elem) => { elem.classList.remove('game-play__skeletal-animation-container--active'); });
        Array.from(introduceElems).forEach((elem) => { elem.classList.remove('game-play__introduce--active'); });
        skeletalAnimationContainerElems[swiper.activeIndex].classList.add('game-play__skeletal-animation-container--active');
        introduceElems[swiper.activeIndex].classList.add('game-play__introduce--active');

        if (swiper.activeIndex >= 1 && swiper.activeIndex <= 3) {
          if (!gamePlaySkeletalAnimationsData[swiper.realIndex].instance) {
            gamePlaySkeletalAnimationsData[swiper.realIndex].instance = new spine.SpinePlayer(gamePlaySkeletalAnimationsData[swiper.realIndex].id, {
              jsonUrl: gamePlaySkeletalAnimationsData[swiper.realIndex].jsonUrl,
              atlasUrl: gamePlaySkeletalAnimationsData[swiper.realIndex].atlasUrl,
              alpha: true,
              backgroundColor: '#00000000',
              showControls: false,
              success: function (player) {
                player.animationState.setAnimation(0, 'animation', true, 0);
              }
            });
          }
        }
        if (swiper.activeIndex === 0) {
          const fragment = document.createDocumentFragment();
          fragment.appendChild(document.querySelector(`#${gamePlaySkeletalAnimationsData[2].id}`));
          skeletalAnimationWrapElems[0].appendChild(fragment);
        }
        if (swiper.activeIndex === 3) {
          const fragment = document.createDocumentFragment();
          fragment.appendChild(document.querySelector(`#${gamePlaySkeletalAnimationsData[2].id}`));
          skeletalAnimationWrapElems[3].appendChild(fragment);
        }
        if (swiper.activeIndex === 1) {
          const fragment = document.createDocumentFragment();
          fragment.appendChild(document.querySelector(`#${gamePlaySkeletalAnimationsData[0].id}`));
          skeletalAnimationWrapElems[1].appendChild(fragment);
        }
        if (swiper.activeIndex === 4) {
          const fragment = document.createDocumentFragment();
          fragment.appendChild(document.querySelector(`#${gamePlaySkeletalAnimationsData[0].id}`));
          skeletalAnimationWrapElems[4].appendChild(fragment);
        }

        if (swiper.activeIndex === 1 || swiper.activeIndex === 4) {
          onYouTubeIframeAPIReady();
        }
        if (swiper.activeIndex !== 1) {
          const originalSlideElem = slideElems[1];
          const originalIntroduceVideoElem = originalSlideElem.querySelector('.game-play__introduce-video');
          const iframeElem = createHeroCrystalTrailerVideoIframe('hero-crystal-trailer-YT');
          heroCrystalTrailerYTPlayer = null;
          originalIntroduceVideoElem.innerHTML = '';
          originalIntroduceVideoElem.append(iframeElem);
          gamePlaySlider.autoplay.start();
        }
        if (swiper.activeIndex !== 4) {
          const replacementSlideElem = slideElems[slideElems.length - 1];
          const replacementIntroduceVideoElem = replacementSlideElem.querySelector('.game-play__introduce-video');
          const iframeElem = createHeroCrystalTrailerVideoIframe('hero-crystal-trailer-YT--replacement');
          heroCrystalTrailerYTPlayerReplacement = null;
          replacementIntroduceVideoElem.innerHTML = '';
          replacementIntroduceVideoElem.append(iframeElem);
          gamePlaySlider.autoplay.start();
        }
      }
    }
  });
}

function initializeNFTSSlider () {
  nftsSlider = new Swiper('#nfts-slider', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    navigation: {
      prevEl: '.slider__prev-btn',
      nextEl: '.slider__next-btn',
      disabledClass: 'slider__btn--disabled'
    },
    pagination: {
      el: '.slider__pagination',
      bulletClass: 'slider__pagination-bullet',
      bulletActiveClass: 'slider__pagination-bullet--active'
    },
    on: {
      realIndexChange: (swiper) => {
        const nftsElem = document.querySelector('.nfts');
        const nfts1stItemElems = document.querySelectorAll('.nfts-1st__item');
        const nfts2ndChartItemBarValueElems = document.querySelectorAll('.nfts-2nd__chart-item-bar-value');
        const nfts3rdContainerElems = document.querySelectorAll('.nfts-3rd__container');
        const nfts4ndProcessItemIconElems = document.querySelectorAll('.nfts-4nd__process-item-icon');
        if (nftsElem) nftsElem.classList.remove('nfts-4nd--bg-elem');
        Array.from(nfts1stItemElems).forEach((elem) => { elem.classList.remove('nfts-1st__item--active'); });
        Array.from(nfts2ndChartItemBarValueElems).forEach((elem) => { elem.classList.remove('nfts-2nd__chart-item-bar-value--active'); });
        Array.from(nfts3rdContainerElems).forEach((elem) => { elem.classList.remove('nfts-3rd__container--active') });
        Array.from(nfts4ndProcessItemIconElems).forEach((elem) => { elem.classList.remove('nfts-4nd__process-item-icon--active'); });
        switch (swiper.realIndex) {
          case 0: {
            const originElems = Array.from(nfts1stItemElems).slice(0, 6);
            const replacementElems = Array.from(nfts1stItemElems).slice(6);
            originElems.forEach((elem, i) => {
              setTimeout(() => {
                elem.classList.add('nfts-1st__item--active');
              }, i * 350);
            });
            replacementElems.forEach((elem, i) => {
              setTimeout(() => {
                elem.classList.add('nfts-1st__item--active');
              }, i * 350);
            });
            break;
          }
          case 1: {
            Array.from(nfts2ndChartItemBarValueElems).forEach((elem) => {
              elem.classList.add('nfts-2nd__chart-item-bar-value--active');
            });
            break;
          }
          case 2: {
            Array.from(nfts3rdContainerElems).forEach((elem, i) => {
              setTimeout(() => {
                elem.classList.add('nfts-3rd__container--active');
              }, i * 350);
            });
            break;
          }
          case 3: {
            if (nftsElem) nftsElem.classList.add('nfts-4nd--bg-elem');
            const originElems = Array.from(nfts4ndProcessItemIconElems).slice(0, 5);
            const replacementElems = Array.from(nfts4ndProcessItemIconElems).slice(5);
            originElems.forEach((elem, i) => {
              setTimeout(() => {
                elem.classList.add('nfts-4nd__process-item-icon--active');
              }, i * 350);
            });
            replacementElems.forEach((elem, i) => {
              setTimeout(() => {
                elem.classList.add('nfts-4nd__process-item-icon--active');
              }, i * 350);
            });
            break;
          }
        }
      }
    }
  });
}

function initializeMainSection () {
  const nextSectionOffsetTop = document.querySelector('.game-play').offsetTop;
  document.querySelector('.main__scroll-down-btn').addEventListener('click', function () {
    window.scrollTo({ top: nextSectionOffsetTop, behavior: 'smooth' });
  });
}

function initializeGamePlaySection () {
  const sliderElem = document.querySelector('#game-play-slider');
  const slideElems = sliderElem.querySelectorAll('.swiper-slide');

  Array.from(slideElems).slice(1, 4).forEach((elem, index) => {
    const domContainerElem = elem.querySelector('.game-play__skeletal-animation-dom');
    if (domContainerElem) domContainerElem.id = gamePlaySkeletalAnimationsData[index].id;
  });
  gamePlaySkeletalAnimationsData[0].instance = new spine.SpinePlayer(gamePlaySkeletalAnimationsData[0].id, {
    jsonUrl: gamePlaySkeletalAnimationsData[0].jsonUrl,
    atlasUrl: gamePlaySkeletalAnimationsData[0].atlasUrl,
    alpha: true,
    backgroundColor: '#00000000',
    showControls: false,
    success: function (player) {
      player.animationState.setAnimation(0, 'animation', true, 0);
    }
  });

  const replacementSlide = slideElems[slideElems.length - 1];
  const replacementIntroduceVideoElem = replacementSlide.querySelector('.game-play__introduce-video');
  const iframeElem = createHeroCrystalTrailerVideoIframe('hero-crystal-trailer-YT--replacement');
  replacementIntroduceVideoElem.innerHTML = '';
  replacementIntroduceVideoElem.append(iframeElem);
}

document.addEventListener('DOMContentLoaded', function () {
  includeHTML(function () {
    triggerTargetSectionAnimation('init');
    initializeAppScrollEventListener();
    initializeHeaderNavigation();
    initializeGamePlaySlider();
    initializeNFTSSlider();
    initializeCoverSkeletalAnimation();
    initializeThreePersonSkeletalAnimation();
    initializeMainSection();
    initializeGamePlaySection();
  });
});
