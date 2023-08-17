import canvasSketch from "canvas-sketch";
import { lerp } from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 20; ///Change this number for different design.

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          radius: Math.abs(random.gaussian() * 0.01),
          position: [u, v],
        });
      }
    }
    return points;
  };

  random.setSeed(615);
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 120;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const { position, radius } = data;
      // const x = u * width;
      // const y = v * height;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);

      //// To fill circles with color
      context.fillStyle = "orangered";
      context.fill();

      //// To create circles without fill
      // context.strokeStyle = "black";
      // context.lineWidth = 30; //Change this number to increase or decrease width size of your design.
      // context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
