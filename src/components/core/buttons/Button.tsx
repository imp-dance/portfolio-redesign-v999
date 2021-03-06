import React, { useRef } from "react";
import styled from "styled-components";
import constants from "../../../styles/constants";
import useMouseMove from "../../../hooks/useMouseMove";

interface Props {
  children: React.ReactNode;
  secondary?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  tabIndex?: number;
  role?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ secondary, children, style, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [mouseMove, styles] = useMouseMove(ref);
  const mergedStyles = { ...styles, ...style };
  return (
    <StyledButton
      {...props}
      ref={ref}
      onMouseMove={mouseMove}
      style={mergedStyles}
      secondary={secondary}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<Props>`
  transition: all 0.2s ease-in-out;
  background: ${(props) =>
    props.secondary
      ? "linear-gradient(150deg, #171727, #2e2e65)"
      : "linear-gradient(150deg, #b15c5c, #746ec3)"};
  position: relative;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  padding: 1em 2em;
  border-radius: 4px;
  border: 2px solid
    ${(props) =>
      props.secondary ? constants.colors.secondary : constants.colors.primary};
  cursor: pointer;
  overflow: hidden;
  opacity: 0.9;

  &:after {
    content: "";
    transition: opacity 0.2s ease-in-out;
    position: absolute;
    top: calc(var(--y) * 1px);
    left: calc(var(--x) * 1px);
    transform: translate(-50%, -50%);
    width: 8em;
    height: 8em;
    background: radial-gradient(#ffffff, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    user-select: none;
    outline: none;
  }

  &:active {
    transform: translate(0px, 1px);
  }

  &:hover {
    opacity: 1;
    border-color: #fff;

    &:after {
      opacity: 0.3;
    }
  }

  &:focus {
    outline: 5px auto rgba(0, 150, 255, 1);
  }
`;

export default Button;
