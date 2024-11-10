import { onCleanup, onMount } from "solid-js";

export default function Home() {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let parent: HTMLElement | null;
  let drawing = false;

  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext("2d");
      if (!ctx || !parent) return;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
  });

  onCleanup(() => {
    ctx = null;
  });

  const handleMouseDown = () => {
    drawing = true;
  };

  const handleMouseUp = () => {
    drawing = false;
    if (ctx) {
      ctx.beginPath();
    }
  };

  const handleMouseMove = (e: PointerEvent) => {
    if (!drawing || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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
