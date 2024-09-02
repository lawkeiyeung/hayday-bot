export const adjustScrollPosition = () => {
    const headerHeight = document.querySelector('.fixed-header').offsetHeight;

    const handleAnchorClick = (e) => {
      e.preventDefault();

      const targetId = e.currentTarget.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Cleanup event listeners on page unload
    window.addEventListener('beforeunload', () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    });
  };