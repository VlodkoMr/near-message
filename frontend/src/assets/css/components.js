import styled from "styled-components";
import { Link } from "react-router-dom";
import { TextareaAutosize } from "@mui/material";

export const CircleButton = styled.section.attrs({
  className: `
  block rounded-full hover:bg-gray-700 bg-gray-700/60 w-10 h-10 group-hover:block cursor-pointer transition`,
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

export const PrimaryInput = styled.input.attrs({
  className: `
  w-full bg-[#242B51] rounded-lg shadow-md text-gray-100 text-base outline-none resize-none py-3 px-4 
  border border-transparent transition focus:border-gray-700 focus:bg-[#19203c]`,
})``;

export const PrimaryTextarea = styled(TextareaAutosize).attrs({
  className: `
  w-full bg-[#242B51] rounded-lg shadow-md text-gray-100 text-base outline-none resize-none py-3 px-4
  border border-transparent transition focus:border-gray-700 focus:bg-[#19203c]`,
})``;