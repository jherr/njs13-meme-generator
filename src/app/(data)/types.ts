interface BackgroundImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface TextArea {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  text: string;
  size: number;
  color?: string;
  outlineColor?: string;
}

export interface MemeTemplate {
  id: string;
  background: BackgroundImage;
  textareas: TextArea[];
}

export interface Meme {
  id: string;
  template: string;
  values: Record<string, string>;
}
