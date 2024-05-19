import { uploadSVG } from '@/helpers/svg';
import React, { ChangeEvent } from 'react';

interface FileUploadSingleProps {
    file: File | null;
    setFile: (file: File | null) => void;
}

export default function FileUploadSingle({ file, setFile }: FileUploadSingleProps) {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const guard = document.getElementById('promo-file-guard');
        const selectedFile = event.target.files?.[0];

        if (!selectedFile || !selectedFile.type.startsWith('image/')) {
            guard?.classList.remove('hidden');
            setFile(null);
            return false;
        }

        guard?.classList.add('hidden');
        setFile(selectedFile);
        return true;
    };

    return (
        <div className='flex flex-col gap-4 max-h-96'>
            <label htmlFor="single-file-upload" className="w-full min-h-12 file-input-label file-input flex gap-2 bg-base-200 items-center justify-center rounded p-3 cursor-pointer">
                {uploadSVG}
                Upload Media
            </label>
            <input
                id='single-file-upload'
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <span className='text-black/60'>*
                <span className='text-black font-semibold'>Preferred format</span>: <br />
                avif for image <br />
                <span>landscape orientation is recommended</span>
            </span>
            <div className='border-2 border-black/60 border-dashed rounded-md p-4 flex flex-col gap-4 overflow-y-scroll'>
                {file ? 'Preview:' : ''}
                {file && (
                    <div>
                        <img className='max-w-[200px]' src={URL.createObjectURL(file)} alt="Preview" />
                    </div>
                )}
            </div>
            <div id="file-guard" className="hidden text-red-500">Please upload a valid image file.</div>
        </div>
    );
}
