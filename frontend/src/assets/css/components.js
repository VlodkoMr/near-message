import styled from "styled-components";
import { Link } from "react-router-dom";

export const CircleButton = styled.section.attrs({
  className: `
  block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 hidden md:block group-hover:block cursor-pointer transition`,
})``;

export const Button = styled(Link).attrs({
  className: `text-base font-medium text-dark dark:text-white hover:opacity-70 py-3 px-7 rounded-full transition 
   ease-in-up duration-300 cursor-pointer inline-block`,
})``;

export const PrimaryButton = styled(Button).attrs({
  className: `
  text-white bg-primary hover:shadow-signUp hover:bg-opacity-90`,
})``;

export const SecondaryButton = styled(Button).attrs({
  className: `
  text-black bg-black bg-opacity-10 dark:text-white dark:bg-white dark:bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20`,
})``;

