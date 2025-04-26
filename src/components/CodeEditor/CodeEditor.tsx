import { Editor } from '@monaco-editor/react';
import { FC } from 'react';

interface Props {
    languageLabel: string
    languageValue: string
    onCodeChange: (value: string) => void
}

const CodeEditor: FC<Props> = ({ languageLabel, languageValue, onCodeChange }) => {
    return (
        <div className='pl-5 mt-4'>
            <label className='fieldset-label text-[#3d434b] text-xl'>{languageLabel}:</label>
            <Editor
                height='35vh'
                // defaultLanguage='java'
                language={languageValue}
                theme='vs-light' 
                options={{
                    fontSize: 18
                }}
                onChange={(value) => onCodeChange(value || '')}
            />
        </div>
    );
};

export default CodeEditor;