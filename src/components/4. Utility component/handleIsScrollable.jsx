export const handleIsScrollable = (setIsScrollable) => {
  const container = document.querySelector(".progress-bars-container");
  if (container) {
    setIsScrollable(container.scrollHeight > container.clientHeight);
  }
};
