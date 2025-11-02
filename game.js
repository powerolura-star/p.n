// 📱 Tilt Control for Phones
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (event) => {
    if (gameOver) return;

    // gamma is left/right tilt (range ~ -90 to 90)
    let tilt = event.gamma;

    if (tilt < -10 && car.x > 0) {
      car.x -= 5; // tilt left
    } else if (tilt > 10 && car.x + car.width < canvas.width) {
      car.x += 5; // tilt right
    }
  });
}
