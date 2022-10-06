import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import {Header} from "../components/Header";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/Header">
        <Header/>
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;