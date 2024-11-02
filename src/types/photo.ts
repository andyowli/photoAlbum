export interface PhotoFile extends File {
    preview?: string;
    id: string;
    title: string;
    description: string;
  }
  
  export interface PhotoData {
    id: string;
    url: string;
    title: string;
    description: string;
    width: number;
    height: number;
  }