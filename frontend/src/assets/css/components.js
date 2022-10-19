import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Scroll from "react-scroll";
import { TextareaAutosize, TextField } from "@mui/material";

export const NavScrollLink = styled(Scroll.Link).attrs({
  className: `
  menu-scroll text-base text-dark dark:text-white group-hover:opacity-70 py-2 lg:py-6 lg:inline-flex lg:px-0 flex 
  mx-8 lg:mr-2 cursor-pointer outline-none`,
})``;

export const FooterScrollLink = styled(Scroll.Link).attrs({
  className: `
  text-base font-medium inline-block text-body-color mb-4 hover:text-blue-400 cursor-pointer outline-none`,
})``;

export const CircleButton = styled.section.attrs({
  className: `
  block rounded-full hover:bg-gray-700 bg-gray-700/60 w-10 h-10 group-hover:block cursor-pointer transition`,
})``;

export const Button = styled(Link).attrs(props => ({
  className: `text-base font-medium text-dark dark:text-white hover:opacity-70 py-3 px-7 rounded-full transition 
   ease-in-up duration-300 cursor-pointer inline-block ${props.disabled && "opacity-60 pointer-events-none"}`,
}))``;

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
  w-full bg-[#242B51] rounded-md shadow-md text-gray-100 text-base outline-none resize-none py-2 px-4 
  border-2 border-transparent transition focus:border-[#1976d2] focus:bg-[#171c3a]`,
})``;

export const PrimaryTextarea = styled(TextareaAutosize).attrs({
  className: `
  w-full bg-[#242B51] rounded-md shadow-md text-gray-100 text-base outline-none resize-none py-3 px-4
  border-2 border-transparent transition focus:border-[#1976d2] focus:bg-[#171c3a]`,
})``;

export const PrimaryTextField = styled(TextField).attrs({
  className: `
  w-full bg-[#242B51] rounded-md shadow-md text-gray-100 text-base outline-none resize-none py-3 px-4`,
})``;

export const RadioLabel = styled.label.attrs({
  className: `
  block bg-[#242B51]/50 px-3 py-1 mb-1 transition hover:bg-[#242B51]/70 cursor-pointer`,
})``;
export const RadioLabelText = styled.p.attrs({
  className: `text-sm text-gray-400/80 ml-8 mb-2 -mt-2`,
})``;
