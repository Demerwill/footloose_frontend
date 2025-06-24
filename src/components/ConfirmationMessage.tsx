// import { Icon } from "@iconify/react";

const ConfirmatioMessaje = () => {
  return (
    <div className="flex justify-center">
      <div
        className="flex flex-col min-h-screen w-full sm:max-w-[428px] bg-[#A50AF1]"
        // className="flex flex-col min-h-screen w-full sm:max-w-[428px] bg-cover bg-center bg-no-repeat"
        // style={{ backgroundImage: "url('/portada.jpeg')" }}
      >
        {/* Logo fijo en la parte superior */}
        <div className="flex justify-center items-center mt-4">
          <img src="/logo1.png" alt="La Rambla" className="w-[178px] h-[68px]" />
        </div>

        {/* Contenido centrado verticalmente (excepto el logo) */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex justify-center items-center w-[274px]">
            <h1 className="text-white text-[34px] text-center font-bold leading-tight">
              ¡Listo! Ya estás participando.
            </h1>
          </div>
        </div>

        {/* Mensaje */}
        {/* <div className="flex justify-center items-center p-4">
          <div className="flex flex-col justify-center items-center w-[290px] bg-white/15 p-2 rounded-3xl">
            <div className="w-[240px] text-center text-white text-lg">
              Entérate si ganaste ingresando a nuestras redes
            </div>
            <div className="flex justify-center items-center gap-4 my-2">
              <a
                href="https://www.facebook.com/laramblaperu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="qlementine-icons:facebook-16"
                  className="w-10 h-10 text-white cursor-pointer hover:text-blue-500"
                />
              </a>
              <a
                href="https://www.instagram.com/laramblaperu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="mdi:instagram"
                  className="w-10 h-10 text-white cursor-pointer hover:text-pink-500"
                />
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export { ConfirmatioMessaje };
