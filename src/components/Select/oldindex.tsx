import React, { useRef, useEffect, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { OptionTypeBase, Props as SelectProps } from 'react-select';

import { useField } from '@unform/core';
import { Container, Error, CustomSelect } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<Props> = ({ name, icon: Icon, ...rest }) => {
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  //  const [isFilled, setIsFilled] = useState(false);
  const isFilled = false;

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    //    setIsFilled(!!selectRef.current?.cu);
  }, []);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => ref.state.value,
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      },
      clearValue: (ref: any) => {
        ref.select.clearValue();
      },
    });
  }, [fieldName, registerField]);

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
      setValue: (ref, value) => { // deve adicionar essa função
        ref.select.selectOption(value);
      },
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

export default Select;
