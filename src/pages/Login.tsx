import { useState } from "react";
import clsx from "clsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ILoginData } from "@/types";
import { PersonalInfoForm, PhotoForm } from "@/components";
import { ConfirmatioMessaje } from "@/components";
import { Button } from "@/components/Button";
import { verifyParticipant } from "@/api";
import { handleError } from "@/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Login = () => {
  const [isIdentificationVisible, setIsIdentificationVisible] = useState(true);
  const [isPersonalInfoVisible, setIsPersonalInfoVisible] = useState(false);
  const [isPhotoformVisible, setIsPhotoformVisible] = useState(false);
  const [isRegisteredUser, setIsRegistereduser] = useState(false);
  const MySwal = withReactContent(Swal);

  const initialData: ILoginData = {
    doi: "",
  };

  const signupSchema = Yup.object().shape({
    doi: Yup.string()
      .test(
        "valid-doi",
        "Debe tener 8 dígitos (DNI) o entre 6 y 12 caracteres alfanuméricos (Carné de Extranjería/Pasaporte).",
        (value) => {
          if (!value) return false;

          if (value.length === 8) {
            return /^\d{8}$/.test(value);
          }

          if (value.length >= 6 && value.length <= 12) {
            return /^[A-Za-z0-9]+$/.test(value);
          }

          return false;
        }
      )
      .required("Debe ingresar un número de documento válido"),
  });

  // Muestra la alerta de error basada en el tipo de error
  const showErrorAlert = (message: string) => {
    MySwal.fire({
      icon: "error",
      title: "Error en el registro",
      text: message,
      confirmButtonText: "Aceptar",
    });
  };

  const form = useFormik({
    initialValues: initialData,
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        // Llamada a la API para verificar al participante
        const response = await verifyParticipant(values.doi);

        if (response.status === "success") {
          if (response.data.isRegistered === true) {
            setIsIdentificationVisible(false);
            setIsPersonalInfoVisible(false);
            // si ya esta registrado entonces debe registrar una participación con photo
            setIsPhotoformVisible(true);
          } else {
            // Si aun no esta registrado entonces debe registrarse
            setIsPersonalInfoVisible(true);
          }
        }

        if (response.status === "error") {
          showErrorAlert(response.message);
        }
      } catch (error) {
        console.error("Error en la verificación del participante:", error);
        // Manejo de errores
        const errorMessage = handleError(error);
        showErrorAlert(errorMessage);
      }
    },
  });

  if (isRegisteredUser) {
    return <ConfirmatioMessaje />;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#F4F8FE]">
      {/* Imagen */}
      <section
        className="relative w-full max-w-[428px] h-auto bg-cover bg-center bg-no-repeat mx-auto"
        style={{
          backgroundImage: "url('/header.png')",
          aspectRatio: "428 / 280",
        }} // Mantiene la proporción
      >
        <div className="flex justify-center items-center mt-4">
          <img src="/logo.png" alt="La Rambla" className="w-[178px] h-[68px]" />
        </div>

        <div className="absolute bottom-0 left-4 w-[145px] h-[9px] bg-[#F73F96]"></div>
      </section>

      {/* 1.Identificación */}
      <section className="border border-gray-200  w-full sm:w-[428px] p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          {/* Nabvar */}
          <div className="flex items-center justify-center gap-5 my-4">
            {/* Paso 2: Formulario */}
            <div className="flex justify-center items-center gap-2">
              <div
                className={`font-bold flex items-center justify-center w-9 h-9 rounded-full 
                ${
                  isPhotoformVisible
                    ? "bg-white border border-[#CACACA]"
                    : "bg-[#222222] border border-black"
                } `}
              >
                <span
                  className={`text-lg ${
                    isPhotoformVisible ? "text-[#CACACA]" : "text-white"
                  }`}
                >
                  2
                </span>
              </div>
              <span
                className={`font-bold ${
                  isPhotoformVisible ? "text-[#CACACA]" : "text-black"
                }`}
              >
                Formulario
              </span>
            </div>

            {/* Paso 3: Foto */}
            <div className="flex justify-center items-center gap-2">
              <div
                className={`font-bold flex items-center justify-center w-9 h-9 rounded-full 
                          ${
                            isPhotoformVisible
                              ? "bg-[#222222] border border-black"
                              : "bg-white border border-[#CACACA]"
                          } `}
              >
                <span
                  className={`text-lg ${
                    isPhotoformVisible ? "text-white" : "text-[#CACACA]"
                  }`}
                >
                  3
                </span>
              </div>
              <span
                className={`font-bold ${
                  isPhotoformVisible ? "text-black" : "text-[#CACACA]"
                }`}
              >
                Foto
              </span>
            </div>
          </div>

          {isIdentificationVisible && (
            <>
              {/* TITLE */}
              <div className="flex justify-center items-center mb-4 mt-8">
                <div className="flex justify-center items-center w-[320px]">
                  <span className="text-center text-[32px] font-Zilla text-[#6B8946] font-bold leading-[38.4px]">
                    ¡La Rambla te devuelve hasta S/500 de tu lista escolar!
                  </span>
                </div>
              </div>

              {/* DESCRIPTION  */}
              <div className="flex justify-center items-center">
                <div className="flex w-[330px]">
                  <span className="text-center text-lg text-[#070707] font-medium leading-[17.4px]">
                    Llena tus datos, sube la foto de tu voucher y ¡listo!
                    Recuerda que el monto mínimo para participar es de S/200.
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center mt-4">
                <span className="text-center  text-[#070707] font-normal leading-[17.4px]">
                  *Solo participan marcas autorizadas
                </span>
              </div>

              {/* FORM DE REGISTRO */}

              <form
                className=" flex flex-col my-8"
                noValidate
                onSubmit={form.handleSubmit}
              >
                {/* doi input  */}
                <div className="flex flex-col gap-1">
                  <label className="text-[#070707] font-semibold text-lg mb-2">
                    1.- Identificación
                  </label>
                  <label className="input pr-0 flex">
                    <input
                      placeholder="Número de documento"
                      type="text"
                      autoComplete="off"
                      {...form.getFieldProps("doi")}
                      className={clsx(
                        "form-control bg-transparent px-3 py-2 border rounded-md w-full outline-none",
                        {
                          "border-gray-300": !form.touched.doi,
                          "border-red-500 focus:ring-red-500":
                            form.touched.doi && form.errors.doi,
                          "border-gray-300 ":
                            form.touched.doi && !form.errors.doi,
                        }
                      )}
                    />
                  </label>
                  {form.touched.doi && form.errors.doi && (
                    <span role="alert" className="text-red-500 text-xs mt-1">
                      {form.errors.doi}
                    </span>
                  )}
                </div>
                {/* En of doi input */}

                {/* Botón de Enviar */}
                <div className="flex flex-col gap-2 mt-8 w-full mb-4">
                  <Button form={form} buttonText="Continuar" />
                </div>
              </form>
            </>
          )}

          {/* 2.Datos personales */}
          {isPersonalInfoVisible && (
            <PersonalInfoForm
              doi={form.values.doi}
              setIsIdentificationVisible={setIsIdentificationVisible}
              setIsPersonalInfoVisible={setIsPersonalInfoVisible}
              setIsPhotoformVisible={setIsPhotoformVisible}
            />
          )}

          {/* 3.Formulario de foto */}
          {isPhotoformVisible && (
            <>
              {/* TITLE */}
              <div className="flex justify-center items-center mb-4 mt-8 w-full">
                <span className="text-center text-[32px] font-Zilla text-[#6B8946] font-bold leading-[38.4px] max-w-[302px]">
                  ¡Sube aquí la foto de tu compra!
                </span>
              </div>

              {/* DESCRIPTION  */}
              <div className="flex justify-center items-center">
                <span className="text-center text-[#070707] font-medium leading-[17.4px] max-w-[302px]">
                  Toma una foto o sube la captura de tu voucher.
                </span>
              </div>

              <PhotoForm
                setIsRegistereduser={setIsRegistereduser}
                doi={form.values.doi}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export { Login };
