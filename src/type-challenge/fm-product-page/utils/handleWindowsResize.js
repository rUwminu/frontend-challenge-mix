const checkCurrentSize = () => {
  if (window.innerWidth < 768) {
    return true;
  } else {
    return false;
  }
};

export default checkCurrentSize;
