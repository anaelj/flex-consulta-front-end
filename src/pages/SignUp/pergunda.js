Boa noite,
Tenho um objeto chamado usuário, este objeto tem o campo transportadora_id e quero deixar posicionado no select a transportadora referente ao transportadora_id.

quando faço assim NÃO funciona:
```js
interface ISelectOptions {
  label: string;
  value: string;
}

const [valorDefault, setValorDefault] = useState<ISelectOptions>();

useEffect(() => {
  setValorDefault({label: "testeeee", value: "5712c7e5-961d-40f2-9ca9-4a8d49e7127a"});
}, []);


 <Select
            name="selecTransportadora"
            placeholder="Transportadora"
            options={transportadoras}
            isMulti={false}
            defaultValue={valorDefault}
          />

```
Mas quando faço assim funciona:

    const valorDefault = {label: "testeeee", value: "5712c7e5-961d-40f2-9ca9-4a8d49e7127a"};

 <Select
            name="selecTransportadora"
            placeholder="Transportadora"
            options={transportadoras}
            isMulti={false}
            defaultValue={valorDefault}
          />


Alguém poderia me ajudar ?
