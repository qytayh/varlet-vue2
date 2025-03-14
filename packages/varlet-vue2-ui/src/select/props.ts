import type { PropType } from 'vue'

export function textAlignValidator(textAlign: string) {
  return ['left', 'right', 'center'].includes(textAlign)
}

export type ValidateTriggers = 'onFocus' | 'onBlur' | 'onChange' | 'onClick' | 'onClear' | 'onClose'

export const props = {
  value: {
    default: undefined,
  },
  placeholder: {
    type: String,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  chip: {
    type: Boolean,
    default: false,
  },
  line: {
    type: Boolean,
    default: true,
  },
  hint: {
    type: Boolean,
    default: true,
  },
  textColor: {
    type: String,
  },
  focusColor: {
    type: String,
  },
  blurColor: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  separator: {
    type: String,
    default: ',',
  },
  textAlign: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'left',
    validator: textAlignValidator,
  },
  validateTrigger: {
    type: Array as PropType<Array<ValidateTriggers>>,
    default: () => ['onChange', 'onClear', 'onClose'],
  },
  rules: {
    type: Array as PropType<Array<(v: any) => any>>,
  },
}
