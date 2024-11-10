import { createSignal, onCleanup, onMount } from "solid-js";

type Point2D = { x: number; y: number };

export default function Home() {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let parent: HTMLElement | null;
  let drawing = false;

  const [paths, setPaths] = createSignal<Point2D[][]>([]);
  const [currentPath, setCurrentPath] = createSignal<Point2D[]>([]);

  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext("2d");
      if (!ctx || !parent) return;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const dpi = window.devicePixelRatio;
      canvas.width = parent.clientWidth * dpi;
      canvas.height = parent.clientHeight * dpi;
      ctx.scale(dpi, dpi);

      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
    }
  });

  onCleanup(() => {
    ctx = null;
  });

  const handleMouseDown = () => {
    drawing = true;
    setCurrentPath([]);
  };

  const handleMouseUp = () => {
    drawing = false;
    setPaths([...paths(), currentPath()]);
    if (ctx) {
      ctx.beginPath();
    }
  };

  const handleMouseMove = (e: PointerEvent) => {
    if (!drawing || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentPath([...currentPath(), { x, y }]);

    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  return (
    <main
      ref={(el) => (parent = el)}
      class="flex-1 h-full w-full text-center mx-auto text-gray-700"
    >
      <canvas
        ref={(el) => (canvas = el)}
        class="bg-white"
        onpointerdown={handleMouseDown}
        onpointerup={handleMouseUp}
        onpointermove={handleMouseMove}
      />
    </main>
  );
}
