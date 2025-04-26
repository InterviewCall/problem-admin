import { FC } from 'react';

interface Props {
    label: string
    placeholder: string
}

const Field: FC<Props> = ({ label, placeholder }) => {
    return (
        <>
            <label className='fieldset-label text-[#3d434b] text-xl'>{label}</label>
            <input type='text' className='input bg-white w-full focus:border-blue-500' placeholder={placeholder} />
        </>
    );
};

export default Field;