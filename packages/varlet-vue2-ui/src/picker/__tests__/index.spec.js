import Picker from '..'
import VarPicker from '../Picker'
import Vue from 'vue'
import { delay, trigger } from '../../utils/jest'

test('test picker plugin', () => {
  Vue.use(Picker)
  expect(Vue.component(VarPicker.name)).toBeTruthy()
})

const columns = [['A', 'B', 'C']]

test('test picker functional show & close', async () => {
  const onOpen = jest.fn()
  const onOpened = jest.fn()
  const onClose = jest.fn()
  const onClosed = jest.fn()

  Picker({
    columns,
    onOpen,
    onOpened,
    onClose,
    onClosed,
  })

  await delay(16)
  expect(onOpen).toHaveBeenCalledTimes(1)
  expect(document.querySelector('.var-popup').style.display).toBe('')

  await delay(300)
  expect(onOpened).toHaveBeenCalledTimes(1)

  Picker.close()
  await delay(16)
  expect(onClose).toHaveBeenCalledTimes(1)

  await delay(300)
  expect(document.querySelector('.var-popup')).toBeFalsy()
  expect(onClosed).toHaveBeenCalledTimes(1)
})

test('test picker functional confirm', async () => {
  const onConfirm = jest.fn()

  Picker({
    columns,
    onConfirm,
  })
  await delay(16)
  await delay(300)

  await trigger(document.querySelector('.var-picker__confirm-button'), 'click')
  expect(onConfirm).toHaveBeenCalledTimes(1)

  await delay(16)
  await delay(300)
})

test('test picker functional cancel', async () => {
  const onCancel = jest.fn()

  Picker({
    columns,
    onCancel,
  })
  await delay(16)
  await delay(300)

  await trigger(document.querySelector('.var-picker__cancel-button'), 'click')
  expect(onCancel).toHaveBeenCalledTimes(1)

  await delay(16)
  await delay(300)
})
