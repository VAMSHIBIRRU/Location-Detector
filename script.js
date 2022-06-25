const btnE1 = document.querySelector(".btn");
btnE1.addEventListener("mouseover", (event) => {
  const x = event.pageX - btnE1.offsetLeft;
  const y = event.pageY - btnE1.offsetTop;
  btnE1.style.setProperty("--xPos", x + "px");
  btnE1.style.setProperty("--yPos", y + "px");
});
const button = document.querySelector(".btn");

button.addEventListener("click", () => {
  if (navigator.geolocation) {
    button.innerHTML = `<span>Allow to detect you location</span>`;
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else
    button.innerHTML = `<span>Your browser doesn't suppot Geolocation</span>`;
});
function onSuccess(position) {
  button.innerHTML = `<span>Detectiong your Location...</span>`;
  let { latitude, longitude } = position.coords;

  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=68227cf0c1914f75ae65258ca62370e8`
  )
    .then((response) => response.json())
    .then((result) => {
      let allDetails = result.results[0].components;
      let { county, postcode, country } = allDetails;
      button.innerHTML = `<span>${county} ${postcode}, ${country}</span>`;
      console.table(allDetails);
    })
    .catch(() => {
      button.innerHTML = `<span>Something went wrong</span>`;
    });
}
function onError(error) {
  if (error.code == 1)
    button.innerHTML = `<span>Your denied the request</span>`;
  else if (error.code == 2)
    button.innerHTML = `<span>Location not available</span>`;
  else button.innerHTML = `<span>Something went wrong</span>`;
  button.setAttribute("disabled", "true");
}
