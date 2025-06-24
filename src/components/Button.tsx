import clsx from "clsx";
import styled from "styled-components";
import { ChevronRight } from "lucide-react";

// Estilizando el botón
const StyledButton = styled.button`
  position: relative;
  padding: 12px 24px;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  transition-all: 0.3s;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 317px;
    height: 4px;

    background-image: linear-gradient(to left, #df3442, #191919);
    border-radius: 9999px;
  }
`;

type ButtonProps = {
  form: any;
  buttonText: string;
};

const Button = ({ form, buttonText }: ButtonProps) => (
  <StyledButton
    type="submit"
    disabled={form.isSubmitting}
    className={clsx({
      "bg-[#CACACA] text-white": !form.isValid || !form.dirty, // Deshabilitado
      "bg-[#222222] text-white": form.isValid && form.dirty, // Habilitado
    })}
  >
    <span className="font-bold">{buttonText}</span>{" "}
    {/* Usando el texto dinámico */}
    <ChevronRight className="w-7 h-7" />
  </StyledButton>
);

export { Button };
