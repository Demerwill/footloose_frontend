import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import Select, { SingleValue } from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Camera, Upload, CheckCircle, XCircle, X } from "lucide-react";
import { Button } from "@/components/Button";
import { getStoresByLocation } from "@/api";
import { IStoresByLocationsData, IRegisterParticipationData } from "@/types";
// import { handleError } from "@/utils";
// import { registerParticipation } from "@/api";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import { CameraModal } from "./CameraModal";

interface ISelectOption {
  value: string;
  label: string;
}
interface IProtoFormProps {
  setIsRegistereduser: Dispatch<SetStateAction<boolean>>;
  doi: string;
}

const PhotoForm = (props: IProtoFormProps) => {
  const { setIsRegistereduser, doi } = props;
  // const MySwal = withReactContent(Swal);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [takePhotoOption, setTakePhotoOption] = useState(false);
  const [confirmedImage, setConfirmedImage] = useState(false);

  const [, setLocations] = useState<IStoresByLocationsData[]>([]);
  // const [locationOptions, setLocationOptions] = useState<ISelectOption[]>([]);
  const [storeOptions, setStoreOptions] = useState<ISelectOption[]>([]);

  const [photo, setPhoto] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState("");

  const initialValues: IRegisterParticipationData = {
    doi: doi,
    location: "",
    store: "",
    amount: 0,
    photo: null,
  };

  // const showErrorAlert = (message: string) => {
  //   MySwal.fire({
  //     icon: "error",
  //     title: "Error en el registro",
  //     text: message,
  //     confirmButtonText: "Aceptar",
  //   });
  // };

  const validationSchema = Yup.object().shape({
    // location: Yup.string().required("La sede es obligatoria"),
    store: Yup.string().required("La tienda es obligatoria"),
    amount: Yup.number()
      .typeError("Debe ser un número")
      .min(1, "El monto debe ser mayor a 0")
      .required("El monto es obligatorio"),
    photo: Yup.mixed().required("La foto de la compra es obligatoria"),
  });

  const mockRegisterParticipation = async (
   
  ) => {
    // Simula retardo de red
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Puedes usar lógica condicional si deseas simular fallos aleatorios
    return {
      status: "success",
      message: "Participación registrada exitosamente.",
    };
  };

  const form3 = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        // const response = await registerParticipation(values);
        const response = await mockRegisterParticipation();

        console.log(values);

        if (response.status === "success") {
          setIsRegistereduser(true);
        }
      } catch (error) {
        console.error("Error en el registro:", error);
        // const errorMessage = handleError(error);
        // showErrorAlert(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const mockGetStores = async (): Promise<ISelectOption[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      { value: "store1", label: "Tienda A" },
      { value: "store2", label: "Tienda B" },
      { value: "store3", label: "Tienda C" },
      { value: "store4", label: "Tienda D" },
    ];
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getStoresByLocation();
        setLocations(response.data);
      } catch (error) {
        console.error("Error al obtener las ubicaciones:", error);
        // const errorMessage = handleError(error);
        // showErrorAlert(errorMessage);
      }
    };

    fetchLocations();
  }, []);


  // Efecto para actualizar las opciones de locations
  // useEffect(() => {
  //   if (locations) {
  //     setLocationOptions(
  //       locations.map((location) => ({
  //         value: location.id,
  //         label: location.name,
  //       }))
  //     );
  //   } else {
  //     setLocationOptions([]);
  //   }
  // }, [locations]);

  // Efecto para actualizar las opciones de stores según la location seleccionada
  // useEffect(() => {
  //   if (form3.values.location) {
  //     const stores =
  //       locations.find((location) => location.id === form3.values.location)
  //         ?.stores ?? [];
  //     setStoreOptions(
  //       stores.map((store) => ({ value: store.id, label: store.name }))
  //     );
  //   } else {
  //     setStoreOptions([]);
  //   }
  // }, [form3.values.location, locations]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await mockGetStores();
        setStoreOptions(response);
      } catch (error) {
        // const errorMessage = handleError(error);
        // showErrorAlert(errorMessage);
      }
    };

    fetchStores();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTakePhotoOption(false);
    setCapturedImage(null);
    const file = event.target.files?.[0]; // Verifica si hay archivo

    if (file) {
      const validExtensions = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/heic",
        "image/heif",
        "image/webp",
      ];

      if (validExtensions.includes(file.type)) {
        const objectUrl = URL.createObjectURL(file);
        setPhoto(objectUrl); // Ahora acepta `string | null`
        setPhotoName(file.name);
        form3.setFieldValue("photo", file);
      } else {
        alert("Formato de archivo no válido. Suba una imagen válida.");
      }
    }
  };

  const formatFileName = (fileName: string, maxLength = 40) => {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) return fileName;

    const name = fileName.substring(0, lastDotIndex);
    const extension = fileName.substring(lastDotIndex);

    if (name.length > maxLength) {
      return `${name.substring(0, 20)}...${name.substring(
        name.length - 5
      )}${extension}`;
    }

    return fileName;
  };

  // const handleLocationChange = (selectedOption: SingleValue<ISelectOption>) => {
  //   form3.setFieldValue("location", selectedOption?.value || "");
  //   form3.setFieldValue("store", "");
  // };

  const handleStoreChange = (selectedOption: SingleValue<ISelectOption>) => {
    form3.setFieldValue("store", selectedOption?.value || "");
  };

  const dataURLtoFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1]; // Extrae el tipo de archivo (ej: image/png)
    const bstr = atob(arr[1]); // Decodifica la imagen base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const generateFileName = (doi: string) => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.TZ]/g, "");
    return `${doi}_${timestamp}_taken.jpeg`;
  };

  const handleConfirmPhoto = () => {
    if (!capturedImage) return;

    const fileName = generateFileName(doi);

    // Convertir la imagen Base64 a File
    const file = dataURLtoFile(capturedImage, fileName);

    // Asignar la imagen al campo "photo" del formulario
    form3.setFieldValue("photo", file);

    setConfirmedImage(true);
  };

  const handleDeleteTakenPhoto = () => {
    setCapturedImage(null);
    setConfirmedImage(false);
    form3.setFieldValue("photo", null);
  };

  const handleClickTakePhoto = () => {
    form3.setFieldValue("photo", null);
    setTakePhotoOption(true);
    setIsCameraOpen(true);
  };

  return (
    <>
      <form className="flex flex-col my-8" onSubmit={form3.handleSubmit}>
        <label className="text-[#070707] font-semibold text-lg mb-2">
          1.- ¿Dónde realizaste tus compras?
        </label>
        {/* location */}
        {/* <div className="flex flex-col gap-1">
          <label className="text-[#070707] font-semibold text-lg ">Sede</label>
          <Select
            options={locationOptions}
            onChange={handleLocationChange}
            placeholder="Seleccione una sede"
            noOptionsMessage={() => "No hay opciones disponibles"}
          />
          {form3.touched.location && form3.errors.location && (
            <span className="text-red-500 text-xs">
              {form3.errors.location}
            </span>
          )}
        </div> */}

        {/* stores */}
        <div className="flex flex-col gap-1 mt-4">
          <label className="text-[#070707] font-semibold text-lg ">
            Tienda
          </label>
          <Select
            options={storeOptions}
            onChange={handleStoreChange}
            placeholder="Seleccione una tienda"
            noOptionsMessage={() => "No hay opciones disponibles"}
          />
          {form3.touched.store && form3.errors.store && (
            <span className="text-red-500 text-xs">{form3.errors.store}</span>
          )}
        </div>

        {/* amount */}
        <div className="flex flex-col gap-1 mt-4">
          <label className="text-[#070707] font-semibold text-lg ">
            Monto (S/)
          </label>
          <input
            type="number"
            placeholder="Ingrese el monto"
            className="form-control bg-transparent px-3 py-2 border border-gray-300 rounded-md w-full outline-none"
            {...form3.getFieldProps("amount")}
          />
          {form3.touched.amount && form3.errors.amount && (
            <span className="text-red-500 text-xs">{form3.errors.amount}</span>
          )}
        </div>

        {/* Subir o tomar foto */}
        <div className="flex flex-col gap-6 mt-8">
          <label className="text-[#070707] font-semibold text-lg mb-2 text-start">
            2.- Ahora sube una foto de tu compra
          </label>

          <div className="flex flex-col gap-6">
            <button
              type="button"
              className="p-3 border rounded-full bg-[#222222] text-white flex items-center justify-center gap-2 w-full"
              onClick={handleClickTakePhoto}
            >
              <Camera className="w-6 h-6" />
              <span className="font-bold">Tomar una Foto</span>
            </button>

            <div className="flex justify-center items-center">
              {takePhotoOption && capturedImage && (
                <div className=" flex flex-col mt-4">
                  <img
                    src={capturedImage}
                    alt="Capturada"
                    className="w-full object-cover border border-gray-300 rounded"
                  />
                  <div className="flex flex-wrap justify-around gap-2 ">
                    <button
                      type="button"
                      className="flex justify-center items-center mt-2 px-4 py-2 border rounded flex-1 gap-1"
                      onClick={handleConfirmPhoto}
                    >
                      <CheckCircle size={20} />
                      Confirmar
                    </button>
                    <button
                      type="button"
                      className="flex justify-center items-center mt-2 px-4 py-2 border rounded flex-1 gap-1"
                      onClick={handleDeleteTakenPhoto}
                    >
                      <XCircle size={20} />
                      Eliminar
                    </button>
                  </div>
                  {takePhotoOption && (
                    <div className=" flex mt-2 ">
                      {confirmedImage ? (
                        <span className=""> Foto confirmada</span>
                      ) : (
                        <span className="text-red-500">
                          {" "}
                          Foto por confirmar
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Opción de subir una foto  */}
            <label className="p-3 border rounded-full flex items-center justify-center gap-2 cursor-pointer w-full">
              <Upload className="w-6 h-6" />
              <span className="font-bold">Subir Foto</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
          {!takePhotoOption && photoName && (
            <div className="flex flex-col gap-2">
              <label className="text-[#070707] font-semibold text-lg text-start">
                Estas subiendo esta foto
              </label>
              <div className="flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md w-full">
                <span className="text-sm truncate">
                  {formatFileName(photoName)}
                </span>
                <button
                  type="button"
                  className="text-gray-500 hover:text-red-500 min-w-[20px] flex justify-center items-center"
                  onClick={() => {
                    setPhoto(null);
                    setPhotoName("");
                    form3.setFieldValue("photo", null);
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {photo && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={photo}
                    alt="Vista previa"
                    className="max-w-xs rounded-lg"
                  />
                </div>
              )}
            </div>
          )}

          {form3.touched.photo && form3.errors.photo && (
            <span className="text-red-500 text-xs">{form3.errors.photo}</span>
          )}
        </div>

        {/* Botón de continuar */}
        <div className="flex flex-col gap-2 mt-8 w-full mb-4">
          <Button
            form={form3}
            buttonText={form3.isSubmitting ? "Enviando..." : "Enviar"}
          />
        </div>
      </form>
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(img) => setCapturedImage(img)}
      />
    </>
  );
};

export { PhotoForm };
