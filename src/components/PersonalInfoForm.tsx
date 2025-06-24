import { Dispatch, SetStateAction } from "react";
// import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/Button";
// import { registerParticipant } from "@/api";
import * as Yup from "yup";
import clsx from "clsx";
import { IRegisterParticipantData } from "@/types";
// import { handleError } from "@/utils";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { getDocuments } from "@/api";

interface IPersonalInfoFormProps {
  doi: string;
  setIsIdentificationVisible: Dispatch<SetStateAction<boolean>>;
  setIsPersonalInfoVisible: Dispatch<SetStateAction<boolean>>;
  setIsPhotoformVisible: Dispatch<SetStateAction<boolean>>;
}

const PersonalInfoForm = (props: IPersonalInfoFormProps) => {
  // const [documents, setDocuments] = useState<{
  //   policy_file: string;
  //   terms_file: string;
  //   marketing_file: string;
  // } | null>(null);

  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     try {
  //       const response = await getDocuments();
  //       setDocuments(response.data);
  //     } catch (err) {
  //       console.error("No se pudieron obtener los documentos.");
  //     }
  //   };

  //   fetchDocuments();
  // }, []);

  // const MySwal = withReactContent(Swal);
  const {
    doi,
    setIsIdentificationVisible,
    setIsPersonalInfoVisible,
    setIsPhotoformVisible,
  } = props;

  const handleClick = () => {
    const offset = 25;
    window.scrollTo({
      top: window.innerHeight - offset,
      behavior: "smooth",
    });
  };

  const initialData: IRegisterParticipantData = {
    doi: doi,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    acceptPolicy: false,
    acceptTerms: false,
    acceptMarketing: false,
  };

  const signupSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Debe tener al menos 2 caracteres")
      .max(50, "No debe superar los 50 caracteres")
      .required("El nombre es obligatorio"),

    lastName: Yup.string()
      .min(2, "Debe tener al menos 2 caracteres")
      .max(50, "No debe superar los 50 caracteres")
      .required("El apellido es obligatorio"),

    email: Yup.string()
      .email("Debe ser un correo válido")
      .required("El correo es obligatorio"),

    phone: Yup.string()
      .matches(/^\d{9}$/, "Debe ser un número de 9 dígitos")
      .required("El número de celular es obligatorio"),

    acceptPolicy: Yup.boolean().oneOf(
      [true],
      "Debe aceptar la política de uso de datos"
    ),

    acceptTerms: Yup.boolean().oneOf(
      [true],
      "Debe aceptar los términos y condiciones"
    ),
  });

  // const showErrorAlert = (message: string) => {
  //   MySwal.fire({
  //     icon: "error",
  //     title: "Error en el registro",
  //     text: message,
  //     confirmButtonText: "Aceptar",
  //   });
  // };

  const mockRegisterParticipant = async () => {
    // Simulamos una espera como si fuera una llamada a la API real
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Puedes cambiar esta lógica para forzar errores o éxitos
    const shouldSucceed = true;

    if (shouldSucceed) {
      return {
        status: "success",
        message: "Registro exitoso",
      };
    } else {
      return {
        status: "error",
        message: "Algo salió mal en el registro.",
      };
    }
  };

  const form2 = useFormik({
    initialValues: initialData,
    validationSchema: signupSchema,
    onSubmit: async () => {
      try {
        // const response = await registerParticipant(values);
        const response = await mockRegisterParticipant();

        if (response?.status === "success") {
          setIsIdentificationVisible(false);
          setIsPersonalInfoVisible(false);
          setIsPhotoformVisible(true);
        } else {
          // showErrorAlert(response.message);
        }
      } catch (error) {
        console.error("Error en la verificación del participante:", error);
        // const errorMessage = handleError(error);
        // showErrorAlert(errorMessage);
      }
    },
  });

  return (
    <>
      <div
        onClick={handleClick}
        className="flex justify-center items-center mb-8"
      >
        <div className="bg-white border-2 border-[#CACACA] font-bold flex items-center justify-center w-[52px] h-[52px] rounded-full">
          <ChevronDown className="w-10 h-10 text-[#CACACA]" />
        </div>
      </div>

      {/* Título */}
      <h2 className="text-4xl font-bold text-center text-[#DF3442] leading-[38.4px] mb-8">
        ¡No te olvides de completar estos datos!
      </h2>

      <label className="text-[#070707] font-semibold text-lg mb-2">
        2.- Datos personales
      </label>

      {/* Formulario */}
      <form className="flex flex-col gap-4" onSubmit={form2.handleSubmit}>
        {/* Documento de Identidad (Solo lectura) */}
        <div>
          <label className="text-sm font-semibold">
            Documento de Identidad
          </label>
          <input
            type="text"
            value={doi}
            readOnly
            className="form-control bg-gray-100 px-3 py-2 border border-gray-300 rounded-md w-full outline-none"
          />
        </div>

        {/* Nombre */}
        <div>
          <label className="text-sm font-semibold">Nombres</label>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            {...form2.getFieldProps("firstName")}
            className={clsx(
              "form-control px-3 py-2 border rounded-md w-full outline-none",
              form2.touched.firstName && form2.errors.firstName
                ? "border-red-500"
                : "border-gray-300"
            )}
          />
          {form2.touched.firstName && form2.errors.firstName && (
            <span className="text-red-500 text-xs">
              {form2.errors.firstName}
            </span>
          )}
        </div>

        {/* Apellidos */}
        <div>
          <label className="text-sm font-semibold">Apellidos</label>
          <input
            type="text"
            placeholder="Ingresa tus apellidos"
            {...form2.getFieldProps("lastName")}
            className={clsx(
              "form-control px-3 py-2 border rounded-md w-full outline-none",
              form2.touched.lastName && form2.errors.lastName
                ? "border-red-500"
                : "border-gray-300"
            )}
          />
          {form2.touched.lastName && form2.errors.lastName && (
            <span className="text-red-500 text-xs">
              {form2.errors.lastName}
            </span>
          )}
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="text-sm font-semibold">Correo Electrónico</label>
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            {...form2.getFieldProps("email")}
            className={clsx(
              "form-control px-3 py-2 border rounded-md w-full outline-none bg-white",
              form2.touched.email && form2.errors.email
                ? "border-red-500"
                : "border-gray-300"
            )}
          />
          {form2.touched.email && form2.errors.email && (
            <span className="text-red-500 text-xs">{form2.errors.email}</span>
          )}
        </div>

        {/* Celular */}
        <div>
          <label className="text-sm font-semibold">Número de Celular</label>
          <input
            type="text"
            placeholder="Ingresa tu número de celular"
            {...form2.getFieldProps("phone")}
            className={clsx(
              "form-control px-3 py-2 border rounded-md w-full outline-none",
              form2.touched.phone && form2.errors.phone
                ? "border-red-500"
                : "border-gray-300"
            )}
          />
          {form2.touched.phone && form2.errors.phone && (
            <span className="text-red-500 text-xs">{form2.errors.phone}</span>
          )}
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-8 my-5">
          <label className="flex items-center gap-4 ">
            <input
              type="checkbox"
              {...form2.getFieldProps("acceptPolicy")}
              className="w-5 h-5"
            />
            <span className="text-sm">
              Acepto las{" "}
              <a
                // href={documents?.policy_file || "#"}
                href="#"
                className="font-bold underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                políticas de uso de datos personales.
              </a>
            </span>
          </label>
          {form2.touched.acceptPolicy && form2.errors.acceptPolicy && (
            <span className="text-red-500 text-xs">
              {form2.errors.acceptPolicy}
            </span>
          )}

          <label className="flex items-center gap-4">
            <input
              type="checkbox"
              {...form2.getFieldProps("acceptTerms")}
              className="w-5 h-5"
            />
            <span className="text-sm">
              Acepto los{" "}
              <a
                // href={documents?.terms_file || "#"}
                href=""
                className="font-bold underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                términos y condiciones.
              </a>
            </span>
          </label>
          {form2.touched.acceptTerms && form2.errors.acceptTerms && (
            <span className="text-red-500 text-xs">
              {form2.errors.acceptTerms}
            </span>
          )}

          <label className="flex items-center gap-4">
            <input
              type="checkbox"
              {...form2.getFieldProps("acceptMarketing")}
              className="w-5 h-5"
            />
            <span className="text-sm">
              Acepto el{" "}
              <a
                // href={documents?.marketing_file || "#"}
                href="#"
                className="font-bold underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                uso de mis datos para fines comerciales.
              </a>
            </span>
          </label>
        </div>

        {/* Botón de confirmar */}

        <Button form={form2} buttonText="Confirmar" />
      </form>
    </>
  );
};

export { PersonalInfoForm };
