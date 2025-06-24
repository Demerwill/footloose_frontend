import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Dialog } from "@headlessui/react";

interface ICameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (image: string | null) => void;
}

const CameraModal = (props: ICameraModalProps) => {
  const { isOpen, onClose, onCapture } = props;
  const webcamRef = useRef<Webcam>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

  // Detectar cambios de orientación
    useEffect(() => {
      const handleResize = () => {
        setIsPortrait(window.innerHeight > window.innerWidth);
      };
  
      handleResize();
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  // Obtener la cámara trasera
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices.length > 0) {
        const backCamera = videoDevices.find((device) =>
          device.label.toLowerCase().includes("back")
        );

        setDeviceId(
          backCamera ? backCamera.deviceId : videoDevices[0].deviceId
        );
      }
    });
  }, []);

  // Configuraciones para cámara
  const videoConstraints = {
    deviceId: deviceId || undefined,
    facingMode: deviceId ? undefined : "environment",
    width: { ideal: isPortrait ? 1080 : 1920 },
    height: { ideal: isPortrait ? 1920 : 1080 },
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="relative w-full h-full flex flex-col">
        {/* Cámara */}
        <Webcam
          ref={webcamRef}
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          className="flex-1 w-full h-full object-cover"
          style={{
            width: "100vw",
            height: "100vh", 
            objectFit: "cover",
          }}
        />

        {/* Botón de captura */}
        <div className="absolute bottom-5 w-full flex justify-center">
          <button
            onClick={capturePhoto}
            className="bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-300 transition"
          >
            📸 Capturar
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export { CameraModal };
