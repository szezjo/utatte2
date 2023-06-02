import React, { useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { useTranslation } from "react-i18next";

type ImageDropzoneProps = {
    setURL: (url: string) => void,
    setFile: (file: File) => void,
    currentURL: string,
    label?: string | null,
}

const ImageDropzone = ({setURL, setFile, currentURL, label} : ImageDropzoneProps) => {
    const { t } = useTranslation();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (!acceptedFiles.length) return;
        const imgURL = URL.createObjectURL(acceptedFiles[0]);
        const img = new Image();
        img.src = imgURL;
        img.onload = () => {
          if (img.width != img.height || img.width > 400) return;
          setURL(imgURL);
          setFile(acceptedFiles[0]);
        };
        console.log(acceptedFiles);
      }, []);
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
        onDrop,
      });

      return (
        <div className="flex flex-col mt-6">
          {label && <label htmlFor="dropzone-file" className="block mb-2 text-sm font-medium text-white">
            {label}
          </label>}
        <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
              {...getRootProps()}
            >
              {currentURL ? (
                <img src={currentURL} className="w-48 h-48 rounded-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">{t('rooms.clickToUpload')}</span> {t('rooms.orDragAndDrop')}
                  </p>
                  <p className="text-xs text-gray-400">{t('rooms.pictureFileTypes')}</p>
                </div>
              )}
              <input id="dropzone-file" type="file" className="hidden" {...getInputProps()} />
            </label>
          </div></div>
      )
}

export default ImageDropzone;