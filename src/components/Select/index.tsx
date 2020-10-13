import React, { useRef, useEffect, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import ReactSelect from 'react-select';
import { OptionTypeBase, Props as SelectProps } from 'react-select';

import { useField } from '@unform/core';
import { Container, Error, CustomSelect } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

interface Option extends OptionTypeBase {
  value: string;
  label: string;
}

const MySelect: React.FC<Props> = ({ name, icon: Icon, ...rest }) => {
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = false;

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }

        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref: ReactSelect, value: Option) => {
//        console.log(value);
        ref.select.selectOption(value);
      },
      clearValue: (ref: ReactSelect) => {
        ref.select.clearValue();
      }
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <CustomSelect
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default MySelect;
