export const visualizeData = ({
  canvasRef,
  audioContextRef,
  analyzerRef,
  barWidth = 3,
  gradientColors = ["#2392f5", "#fe0095", "purple"],
  visualizationType = "bars",
} = {}) => {
  if (!canvasRef.current || !analyzerRef.current) return;

  const ctx = canvasRef.current.getContext("2d");
  const width = canvasRef.current.width;
  const height = canvasRef.current.height;

  const updateVisualization = () => {
    if (!audioContextRef.current || !analyzerRef.current) return;

    const analyzer = analyzerRef.current;
    const dataArray = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, width, height);

    if (visualizationType === "bars") {
      dataArray.forEach((value, index) => {
        const x = index * barWidth;
        const barHeight = height * (value / 256);
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0.2, gradientColors[0]);
        gradient.addColorStop(0.5, gradientColors[1]);
        gradient.addColorStop(1.0, gradientColors[2]);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      });
    } else if (visualizationType === "lines") {
      ctx.beginPath();
      dataArray.forEach((value, index) => {
        const x = (index / dataArray.length) * width;
        const y = height - (value / 256) * height;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.strokeStyle = gradientColors[0];
      ctx.stroke();
    }

    requestAnimationFrame(updateVisualization);
  };

  updateVisualization();
};
