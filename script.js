const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

// Object that stores values of minimum and maximum angle for each section
const rotationValues = [
  { minDegree: 0, maxDegree: 36, value: 1 },
  { minDegree: 37, maxDegree: 72, value: 2 },
  { minDegree: 73, maxDegree: 108, value: 3 },
  { minDegree: 109, maxDegree: 144, value: 4 },
  { minDegree: 145, maxDegree: 180, value: 5 },
  { minDegree: 181, maxDegree: 216, value: 6 },
  { minDegree: 217, maxDegree: 252, value: 7 },
  { minDegree: 253, maxDegree: 288, value: 8 },
  { minDegree: 289, maxDegree: 324, value: 9 },
  { minDegree: 325, maxDegree: 360, value: 10 },
];

// Size of each section
const data = Array(10).fill(10); // Ten equal sections

// Background color for each section
const pieColors = [
  "#8b35bc", "#b163da", "#8b35bc", "#b163da", "#8b35bc",
  "#b163da", "#8b35bc", "#b163da","#8b35bc", "#b163da"
];

// Create chart
let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Labels for 10 sections
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 18 },
      },
    },
  },
});

// Function to handle the final result (currently does not display the result)
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      // Uncomment the line below if you want to display the result in the future
      // finalValue.innerHTML = `<p>Result: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

// Spin function
const spinWheel = () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = "<p>Spinning...</p>";

  // Generate random spin duration and spin angle
  const randomSpinDuration = Math.random() * 3000 + 2000; // Between 2 and 5 seconds
  const spinAngle = Math.random() * 360 + 3600; // At least 10 full spins

  let currentAngle = 0;
  const spinInterval = setInterval(() => {
    // Increase angle gradually for smooth spinning effect
    currentAngle += 10;
    wheel.style.transform = `rotate(${currentAngle}deg)`;

    // Stop spinning when duration is reached
    if (currentAngle >= spinAngle) {
      clearInterval(spinInterval);

      // Calculate the final angle (result display is disabled)
      const endingAngle = currentAngle % 360;
      valueGenerator(endingAngle);
    }
  }, 16); // Update every 16ms (~60 frames per second)
};

// Add event listener to the spin button
spinBtn.addEventListener("click", spinWheel);
