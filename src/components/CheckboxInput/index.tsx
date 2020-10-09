import React, { useEffect, useRef, InputHTMLAttributes } from 'react';

import { useField } from '@unform/core';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;

  options: {
    id: string;

    value: string;

    label: string;
  }[];
}

const CheckboxInput: React.FC<Props> = ({ name, options, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const { fieldName, registerField, defaultValue = [] } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,

      ref: inputRefs.current,

      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },

      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(refff => {
          refff?.checked = false;
        });
      },

      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(refff => {
          if (values.includes(refff.id)) {
            refff.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <div>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          <input
            defaultChecked={defaultValue.find((dv: string) => dv === option.id)}
            ref={ref => {
              inputRefs.current[index] = ref as HTMLInputElement;
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            {...rest}
          />

          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxInput;
