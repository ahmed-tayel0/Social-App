import { useState, useRef, useEffect, useCallback } from "react";
import { Modal } from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";

const CROP_DIMENSIONS = {
  square: { w: 320, h: 320 },
  cover: { w: 640, h: 220 },
};

const EXPORT_DIMENSIONS = {
  square: { w: 720, h: 720 },
  cover: { w: 1280, h: 440 },
};

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  fileName: string;
  mimeType: string;
  imageWidth: number;
  imageHeight: number;
  onClose: () => void;
  onConfirm: (croptedFile: File) => void;
  aspectRatio?: "square" | "cover";
}

export function ImageCropModal({
  isOpen,
  imageSrc,
  fileName,
  mimeType,
  imageWidth,
  imageHeight,
  onClose,
  onConfirm,
  aspectRatio = "square",
}: ImageCropModalProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const cropAreaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Ref to hold the latest position for drag handlers
  const positionRef = useRef(position);
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  // Ref to hold the latest zoom for drag handlers
  const zoomRef = useRef(zoom);
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  // Get crop dimensions based on aspectRatio
  const cropW = CROP_DIMENSIONS[aspectRatio].w;
  const cropH = CROP_DIMENSIONS[aspectRatio].h;
  const exportW = EXPORT_DIMENSIONS[aspectRatio].w;
  const exportH = EXPORT_DIMENSIONS[aspectRatio].h;

  // Clamp helper using the latest zoom from ref
  const getBounds = useCallback(() => {
    const baseScale = Math.max(cropW / imageWidth, cropH / imageHeight);
    const totalScale = baseScale * zoomRef.current;
    const maxX = Math.max(0, ((imageWidth * totalScale) - cropW) / 2);
    const maxY = Math.max(0, ((imageHeight * totalScale) - cropH) / 2);
    return { maxX, maxY };
  }, [imageWidth, imageHeight, cropW, cropH]);

  // Clamp position on mount
  useEffect(() => {
    if (imageWidth && imageHeight) {
      const { maxX, maxY } = getBounds();
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setPosition(prev => ({
        x: Math.max(-maxX, Math.min(maxX, prev.x)),
        y: Math.max(-maxY, Math.min(maxY, prev.y)),
      }));
    }
  }, [imageWidth, imageHeight, getBounds]);

  // Attach pointer listeners ONCE (depends only on getBounds, which is stable unless image dimensions change)
  useEffect(() => {
    const el = cropAreaRef.current;
    if (!el) return;

    let isDragging = false;
    let startClientX = 0;
    let startClientY = 0;
    let startPosX = 0;
    let startPosY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startClientX = e.clientX;
      startClientY = e.clientY;
      startPosX = positionRef.current.x;
      startPosY = positionRef.current.y;
      el.setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const { maxX, maxY } = getBounds();
      const dx = e.clientX - startClientX;
      const dy = e.clientY - startClientY;
      const newX = Math.max(-maxX, Math.min(maxX, startPosX + dx));
      const newY = Math.max(-maxY, Math.min(maxY, startPosY + dy));
      setPosition({ x: newX, y: newY });
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [getBounds]);

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZoom = parseFloat(e.target.value);
    setZoom(newZoom);
    zoomRef.current = newZoom;
    // Clamp position to the new zoom
    const { maxX, maxY } = getBounds();
    setPosition(prev => ({
      x: Math.max(-maxX, Math.min(maxX, prev.x)),
      y: Math.max(-maxY, Math.min(maxY, prev.y)),
    }));
  };

  const handleConfirm = () => {
    if (!imgRef.current) return;

    const baseScale = Math.max(cropW / imageWidth, cropH / imageHeight);
    const totalScale = baseScale * zoom;

    // In the crop box (cropW x cropH), the image's top-left is at:
    const imgLeft = (cropW / 2) - (imageWidth * totalScale) / 2 + position.x;
    const imgTop = (cropH / 2) - (imageHeight * totalScale) / 2 + position.y;

    // We want to draw the cropW x cropH region starting at (0,0) of the crop box.
    // In original-image pixels, that region starts at:
    const sourceX = -imgLeft / totalScale;
    const sourceY = -imgTop / totalScale;
    const sourceW = cropW / totalScale;
    const sourceH = cropH / totalScale;

    const canvas = document.createElement("canvas");
    canvas.width = exportW;
    canvas.height = exportH;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      sourceX,
      sourceY,
      sourceW,
      sourceH,
      0,
      0,
      exportW,
      exportH
    );

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], fileName || "photo.jpg", {
            type: mimeType || "image/jpeg",
          });
          onConfirm(file);
        }
      },
      mimeType,
      0.95
    );
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adjust profile photo">
      <div className="space-y-4">
        <div
          ref={cropAreaRef}
          className="relative w-full overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200 touch-none cursor-grab dark:bg-[#242526] dark:ring-[#2d2e2f]"
          style={{
            aspectRatio: `${cropW} / ${cropH}`,
            maxWidth: aspectRatio === "square" ? 340 : "100%",
          }}
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Crop preview"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${imageWidth * Math.max(cropW / imageWidth, cropH / imageHeight) * zoom}px`,
              height: `${imageHeight * Math.max(cropW / imageWidth, cropH / imageHeight) * zoom}px`,
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
              transformOrigin: "center",
              userSelect: "none",
              pointerEvents: "none",
              maxWidth: "none",
              maxHeight: "none",
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-[#e4e6eb]">Zoom</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={handleZoomChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>1x</span>
            <span>3x</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-[#e4e6eb]">Privacy</label>
          <select className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-[#2d2e2f] dark:bg-[#242526] dark:text-[#e4e6eb]">
            <option value="public">Public</option>
            <option value="following">Followers</option>
            <option value="only_me">Only me</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Save</Button>
        </div>
      </div>
    </Modal>
  );
}