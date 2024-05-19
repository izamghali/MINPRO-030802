import { uploadSVG } from '@/helpers/svg';
import React, { ChangeEvent, useState } from 'react';

export default function FileUpload({ files, setFiles } : { files: any, setFiles: any} ) {

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const guard  = document.getElementById('file-guard');
        if (!event.target.files) {
            guard?.classList.remove('hidden')
            return false;
        } 
        guard?.classList.add('hidden')
        const selectedFiles = Array.from(event.target.files);

        // Filter out files that are not images or videos
        const filteredFiles = selectedFiles.filter(file =>
            file.type.startsWith('image/') || file.type.startsWith('video/') ||
            file.type === 'video/webm' || file.type === 'image/avif'
        );

        setFiles(filteredFiles);
        return true;
    };

    return (
        <div className=' flex flex-col gap-4 max-h-96'>
            <label htmlFor="file-upload" className="w-full min-h-12 file-input-label file-input flex gap-2 bg-base-200 items-center justify-center rounded p-3 cursor-pointer">
                { uploadSVG }
                Upload Media
            </label>
            <input 
                id='file-upload'
                type="file" 
                className="hidden" 
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
            />
            <span className='text-black/60'>*
                <span className='text-black font-semibold'>Preferred format</span>: <br/> 
                webm for video - avif for image <br/>
                <span>landscape orientation is recommended</span>
            </span>
            <div className='border-2 border-black/60 border-dashed rounded-md p-4 flex flex-col gap-4 overflow-y-scroll'>
                { files ? 'Preview:' : '' }
                {files.map((file: File, idx:number) => (
                <div key={idx}>
                    {file.type.startsWith('image/') ? (
                    <img className='max-w-[200px]' src={URL.createObjectURL(file)} alt={`Preview ${idx}`} />
                    ) : file.type.startsWith('video/') ? (
                    <video controls width="200">
                        <source src={URL.createObjectURL(file)} type={file.type} />
                        Your browser does not support the video tag.
                    </video>
                    ) : null}
                </div>
                ))}
            </div>
        </div>
    );
};
