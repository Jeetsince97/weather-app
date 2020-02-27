window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temperature-description");
  let tempDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let degSection = document.querySelector(".degree-section");
  const degSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/9239eb3e051eba0df3b892536c6f4589/${lat},${long}`;

      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(final_data => {
          console.log(final_data);
          const { temperature, summary, icon } = final_data.currently;

          //set DOM elements here from the API

          tempDegree.textContent = temperature;
          tempDescription.textContent = summary;
          locationTimezone.textContent = final_data.timezone;

          //Changing the number to Celcius
          let celcius = (temperature - 32) * (5 / 9);

          // Set the Icon
          setIcons(icon, document.querySelector(".icon"));

          //Change the F to C
          degSection.addEventListener("click", () => {
            if (degSpan.textContent === "F") {
              degSpan.textContent = "C";
              tempDegree.textContent = Math.floor(celcius);
            } else {
              degSpan.textContent = "F";
              tempDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
