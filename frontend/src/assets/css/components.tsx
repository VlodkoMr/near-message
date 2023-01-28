import styled, { StyledComponent } from "styled-components";
import { Link } from "react-router-dom";
import * as Scroll from "react-scroll";
import { TextareaAutosize, TextField } from "@mui/material";

export const NavScrollLink: StyledComponent<any, any> = styled(Scroll.Link).attrs({
  className: `
  menu-scroll text-base text-dark dark:text-white group-hover:opacity-70 py-2 lg:py-6 lg:inline-flex lg:px-0 flex 
  mx-5 cursor-pointer outline-none`,
})``;

export const FooterScrollLink: StyledComponent<any, any> = styled(Scroll.Link).attrs({
  className: `
  text-base font-medium inline-block text-body-color mb-4 hover:text-blue-400 cursor-pointer outline-none`,
})``;

export const CircleButton: StyledComponent<any, any> = styled.section.attrs<{
  className?: string,
}>({
  className: `
  block rounded-full hover:bg-gray-700 bg-gray-700/60 w-10 h-10 group-hover:block cursor-pointer transition 
  text-gray-400 hover:text-gray-300`,
})``;

export const Button: StyledComponent<any, any> = styled(Link).attrs((props: {
  disabled: boolean,
  small: string
}) => ({
  className: `text-base font-medium text-dark dark:text-white hover:opacity-70 rounded-full transition 
   ease-in-up duration-300 cursor-pointer inline-block whitespace-nowrap
   ${props.disabled && "opacity-60 pointer-events-none"}
   ${props.small ? "py-1.5 px-4 md:py-2 md:px-5" : "py-2 px-5 md:py-3 md:px-7"}
   `,
}))``;

export const PrimaryButton: StyledComponent<any, any> = styled(Button).attrs<{
  small?: string,
  disabled?: boolean,
}>({
  className: `
  text-white bg-primary hover:shadow-signUp hover:bg-opacity-90 `,
})``;

export const SecondaryButton: StyledComponent<any, any> = styled(Button).attrs<{
  small?: string,
  className?: string,
  disabled?: boolean,
}>({
  className: `
  text-black bg-black bg-opacity-10 dark:text-white dark:bg-white dark:bg-opacity-10 hover:bg-opacity-20 
  dark:hover:bg-opacity-20`,
})``;

export const PrimaryInput: StyledComponent<any, any> = styled.input.attrs({
  className: `
  w-full bg-[#242B51] rounded-md shadow-md text-gray-100 text-base outline-none resize-none py-2 px-4 
  border-2 border-transparent transition focus:border-[#1976d2] focus:bg-[#171c3a]`,
})``;

export const PrimaryTextarea: StyledComponent<any, any> = styled(TextareaAutosize).attrs({
  className: `
  w-full bg-[#242B51] rounded-md shadow-md text-gray-100 text-base outline-none resize-none py-3 px-4
  border-2 border-transparent transition focus:border-[#1976d2] focus:bg-[#171c3a]`,
})``;

export const PrimaryTextField: StyledComponent<any, any> = styled(TextField).attrs({
  className: `
  w-full bg-[#242B51] rounded-md shadow-md text-gray-100 text-base outline-none resize-none py-3 px-4`,
})``;

export const RadioLabel: StyledComponent<any, any> = styled.label.attrs({
  className: `
  block bg-[#242B51]/50 px-4 py-1 mb-1 transition hover:bg-[#242B51]/70 cursor-pointer`,
})``;

export const RadioLabelText: StyledComponent<any, any> = styled.p.attrs({
  className: `text-sm text-gray-400/80 mb-2`,
})``;

export const MessageAction: StyledComponent<any, any> = styled.button.attrs({
  className: `hidden group-hover:block flex flex-shrink-0 focus:outline-none mr-2 block rounded-full text-gray-500 
  hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2`,
})``;
