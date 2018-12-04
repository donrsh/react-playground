# `formConfig`

`formConfig` is based on `FormProps` in `react-final-form`. See [here](https://github.com/final-form/react-final-form#formprops) for more detail. In occasion case, you use it like so: 

```js
  import { Form } from 'react-final-form'
  
  <Form {...formConfig} />
```

Additionally, you should give a name to a form.

| name | type | description |
| :----- | :-- | :-- |
| `name` | `String!` | The name of the form. |

# `fieldConfig`

`fieldConfig` descibes a field. Conceptially, it is equivalent to `fieldProps` in `react-final-form`. But there are some differences:

  1. Since this package is designed to bind Material-UI, there is no `render`, `component`, `children` props. Instead, you can declare what to render by the **`type`** field of `fieldConfig`. See below for detail.

  2. There should be some way to control the Material-UI component still. For this reason, we provide the **`MUIProps`** field for you to inject props to the MUI components.

  3. Some other miscellaneous properties we find useful to hoist to the `fieldConfig`, or we think is declarative for the field.

This package provides a set of functions look like `renderFFMUIXXX`, where `XXX` might be `Component`, `HelperText`, `FormLabel`. `fieldConfig` is the first argument for these function.

## Type of field

The type of field is defined in the `type` field of `fieldConfig`.

### Composability of `type` and other fields in `fieldConfig`
| config name \ type | `text` | `password` | `select` | `checkbox` | `radio` | `checkboxGroup` | `radioGroup` | `array` |
| :- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | 
| `placeholder` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `value` | ❌ | ❌ | ❌ | ✅ ❌ * | ✅ | ❌ | ❌ | ❌ |
| `options` and `getOptionProps` | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `isOption` | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `labelStandalone` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Composability of `type` and render methods
| render method \ type | `text` | `password` | `select` | `checkbox` | `radio` | `checkboxGroup` | `radioGroup` | `array` |
| :- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| primitive ** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| for `renderFFMUIComponent` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | 
| for `renderFFMUIFormLabel` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 
| for `renderFFMUIHelperText` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

\* A checkbox can used for ture/false selection or multiple selection of a field. If you doesn't provide any value for a checkbox, then its value is true/false; otherwise, it is an option for that field. 

\*\* The term **primitive** means that the field with the type has its own MUI component. On the other hand, **non-primitive** field can be regarded as a compound field of primitive fields. Take a `radioGroup` field for example, it is compounded of its options (the `radio` fields).

## Detail of `fieldConfig`

| name | type | description |
| :----- | :-- | :-- |
| `form` | `String!` | The name of the form. |
| `name` | `String!` | The name of the field. |
| `type` | `enum!` = <br/> **`text`**,<br/> **`password`**,<br/> **`select`**,<br/> **`checkbox`**,<br/> **`radio`**,<br/>  `checkboxGroup`,<br/> `radioGroup`, `array` | The type of the field. Those in boldface are *primitive* field type.
| `debug` | `Boolean` | If `true`, then the console would print out `fieldRenderProps` when rendering MUI Component. |
| `label` | `String` | The label for the field. |
| `placeholder` | `String` | The placeholder for the field. This works only for field where `type` is `text` or `password`. |
| `disabled` | `Boolean` | Whether the field is disabled. Only works for *primitive* fields.
| `options` | `Array<any>` | The options for the field. This works only for field where `type` is `select`. |
| `getOptionProps` | `option => optionProps` | A function to map an option (members in `fieldConfig.options`) to the props of option element. Note that some fields of `optionProps` is almost required anytime, anywhere: `key`, `value`, `children`. |
| `value` | `String` | The value for the component. Note that this only has meanings when `type` is `checkbox` or `radio`. | 
| `isOption` | `Boolean` | Only means when `type` is `checkbox`. Since there are times checkbox used for multiple select. | 
| `labelStandalone` | `Boolean` | Only means when `type` is `text` or `password`. If this field is `true`, the label part of Material-UI component is hidden.
| `key` | `String` \| `Number` | Provide the key if you call `renderFFMUIXXX` functions in an array. 

There are still some fields that you can provide in `fieldConfig`. They are basically from `FieldProps` of `react-final-form`, and the meanings are kept the same. See [here](https://github.com/final-form/react-final-form#fieldprops) for details. Below is the list of them:
  - `validate`
  - `validateFields`
  - `allowNull`
  - `format`
  - `formatOnBlur`
  - `isEqual`
  - `parse`
  - `subscription`

# Exports

```js
import { 
  renderFFMUIComponent,
  renderFFMUIFormLabel,
  renderFFMUIHelperText,
} from 'the-package'

const formConfig = {/*  */}
const fieldConfig = {/*  */}

<Form {...formConfig}>
  {renderFFMUIComponent(fieldConfig)}
  {renderFFMUIFormLabel(fieldConfig)}
  {renderFFMUIHelperText(fieldConfig)}
</Form>
```

- `renderFFMUIComponent(fieldConfig): ReactElement`

  Render MUI component by type (`TextInput`, `Select`, `Checkbox`, `Radio`)

- `renderFFMUIFormLabel(fieldConfig, FormLabelProps = {}): ReactElement`
  
  Render MUI `FormLabel` component

- `renderFFMUIHelperText(fieldConfig, FormHelperTextProps = {}): ReactElement`
  
  Render MUI `HelperText` component 

- `createFFFormSubComponents(formConfig): FormSubComponents`

  where 
  ```
  type FormSubComponents = {
    ValidateIndicator: FormSubComponent,
    SubmitErrorHelperText: FormSubComponent
  }

  type FormSubComponent = ({
    component: formRenderProps => React.Element
  }) => React.Element
  ```
  
  Return a set of `ReactComponent`s that with render props `formRenderProps`. For example, the following codes shows how to use `ValidateIndicator`.

  ```js
  import { createFFFormSubComponents } from 'the-package'
  const formConfig = {/* ... */}
  
  const { ValidateIndicator } = createFFFormSubComponents(formConfig)

  const renderMyValidateIndicator = ({ validating }) => (
    validating && <div>validating</div>
  )

  <Form {...formConfig}>
    {/* some fields */}
    
    // render `ValidateIndicator` in with the component provided by the package 
    <ValidateIndicator /> 

    // or in your own way
    <ValidateIndicator component={renderMyValidateIndicator}/> 
  </Form {...formConfig}>
  ```

## Additionally appended attributes
This package injects some attributes to the rendered MUI component.

- `data-form`: The name of form.

- `data-field`: The field of field. It looks like `${formName}(${fieldName})`. If the rendered component (checkbox or radio) has a value, it looks like: `${formName}(${fieldName}:${value})`.

- `for` and `id`: Some `label`s are rendened with the `for` attribute and some `input`s are rendered with the `id` attribute. This is for making use of the binding behavior of `for-id` pairs supported by native browsers. The value is the same as `data-field`. You can see this when `type` of the field is `text`, `password`, `checkbox` and `radio`.


