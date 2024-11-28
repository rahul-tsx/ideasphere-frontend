
const scrollableElement = document.querySelector('.custom-scrollbar') as HTMLElement;

if (scrollableElement) {
  let isScrolling: ReturnType<typeof setTimeout>; 


  scrollableElement.addEventListener('scroll', () => {
    scrollableElement.classList.add('scrolling');

 
    clearTimeout(isScrolling);

   
    isScrolling = setTimeout(() => {
      scrollableElement.classList.remove('scrolling');
    }, 300); 
  });
} else {
  console.error('Scrollable element not found.');
}
