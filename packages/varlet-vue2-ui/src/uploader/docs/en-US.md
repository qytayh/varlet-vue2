# Uploader

### Intro
It provides the ability to read files and preview pictures and videos.
Get the file upload server by listening for `after-read` events.

### Install

```js
import Vue from 'vue'
import { Uploader } from '@varlet-vue2/ui'

Vue.use(Uploader)
```

### Basic Usage

```html
<var-uploader v-model="files" @after-read="handleAfterRead"/>
```

```js
export default {
  data: () => ({
    files: []
  }),
  methods: {
    handleAfterRead(file) {
      console.log(file)
    }
  }
}
```

### File Preview

By analyzing the file URL suffix name to determine the file type, support image and video preview.

```html
<var-uploader v-model="files"/>
```

```js
export default {
  data: () => ({
    files: [
      {
        url: 'https://varlet.gitee.io/varlet-ui/cat.jpg',
        cover: 'https://varlet.gitee.io/varlet-ui/cat.jpg'
      },
      {
        url: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
        cover: 'https://varlet.gitee.io/varlet-ui/cover.jpg'
      }
    ]
  })
}
```

### Upload State

Three uploading states, `loading`, `success` and `error`, are provided, and tool functions are provided to quickly obtain files with corresponding states.

```html
<var-uploader v-model="files" @after-read="handleAfterRead"/>
```

```js
export default {
  data: () => ({
    files: [
      {
        url: 'https://varlet.gitee.io/varlet-ui/cat.jpg',
        cover: 'https://varlet.gitee.io/varlet-ui/cat.jpg',
        state: 'loading'
      },
      {
        url: 'https://varlet.gitee.io/varlet-ui/cat.jpg',
        cover: 'https://varlet.gitee.io/varlet-ui/cat.jpg',
        state: 'success'
      },
      {
        url: 'https://varlet.gitee.io/varlet-ui/cat.jpg',
        cover: 'https://varlet.gitee.io/varlet-ui/cat.jpg',
        state: 'error'
      }
    ]
  }),
  methods: {
    handleAfterRead(file) {
      file.state = 'loading'

      setTimeout(() => {
        file.state = 'success'
      }, 1000)
    }
  }
}
```

### File Maxlength

```html
<var-uploader v-model="files" :maxlength="1"/>
```

### File Size Limit

If the limit is exceeded, the file will be blocked. You can get the file by listening for the `oversize` event.

```html
<var-uploader v-model="files" :maxsize="1024" @oversize="handleOversize" />
```

```js
import { Snackbar } from '@varlet-vue2/ui'

export default {
  data: () =>({
    files: []
  }),
  methods: {
    handleOversize() {
      Snackbar.warning('file size exceeds limit')
    }
  }
}
```

### Upload Preprocessing

Operate on a file by registering a `before-read` event that returns a false value to prevent the file from being read.

```html
<var-uploader v-model="files" @before-read="handleBeforeRead"/>
```

```js
import { Snackbar } from '@varlet-vue2/ui'

export default {
  data: () => ({
    files: []
  }),
  methods: {
    handleBeforeRead() {
      if (file.file.size <= 1 * 1024 * 1024) {
        Snackbar.success('the file is less than 1M, the upload is successful')
        return true
      } else {
        Snackbar.warning('the file is larger than 1M and cannot be uploaded')
        return false
      }
    }
  }
}
```

### Disabled

```html
<var-uploader disabled v-model="files"/>
```

### Readonly

```html
<var-uploader readonly v-model="files"/>
```

### Remove Preprocessing

Before deleting the file, the `before-remove` event is triggered, and a falsy value is returned to prevent the delete operation.

```html
<var-uploader v-model="files" @remove="handleBeforeRemove" />
```

```js
import { Dialog } from '@varlet-vue2/ui'

export default {
  data: () => ({
    files: [
      {
        url: 'https://varlet.gitee.io/varlet-ui/cat.jpg',
        cover: 'https://varlet.gitee.io/varlet-ui/cat.jpg',
      }
    ]
  }),
  methods: {
    async handleBeforeRemove() {
      const action = await Dialog({
        title: 'Delete or not?',
        message: 'Cannot be withdrawn after deletion'
      })

      return action === 'confirm'
    }
  }
}
```


### Customize upload styles

```html
<var-uploader v-model="files">
  <var-button type="primary">Upload</var-button>
</var-uploader>
```

### Validate

The values are validated by passing in an array of validator, If the validator returns `true`, the validation passes.
Other values are converted to text as a user prompt.
The second argument is a collection of utility functions that can quickly get a collection of files that match the state.

```html
<var-uploader
  :rules="[
    (v, u) => u.getError(v).length === 0 || 'There is a file that failed to upload'
  ]"
  v-model="files"
/>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | File list | _VarFile[]_ | `[]` |
| `accept` | Accepted file type, consistent with the native attribute | _string_ | `image/*` |
| `capture` | Get the file, the same as the native property | _string_ | `-` |
| `multiple` | Whether to select multiple files | _boolean_ | `false` |
| `readonly` | Whether the readonly | _boolean_ | `false` |
| `disabled` | Whether the disabled | _boolean_ | `false` |
| `removable` | Whether the removable | _boolean_ | `true` |
| `maxlength` | Maximum number of files | _string \| number_ | `-` |
| `maxsize` | Maximum file size | _string \| number_ | `-` |
| `previewed` | Whether to allow preview | _boolean_ | `true` |
| `ripple` | Whether to open ripple | _boolean_ | `true` |
| `validate-trigger` | Timing to trigger validation， The optional value is `onChange` `onRemove` | _ValidateTriggers[]_ | `['onChange', 'onRemove']` |
| `rules` | The validation rules，Returns `true` to indicate that the validation passed，The remaining values are converted to text as user prompts | _Array<(v: VarFile, u: VarFileUtils) => any>_ | `-` |

### VarFile

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `file` | Native file | _File_ | `-` |
| `name` | File name | _string_ | `-` |
| `url` | File url | _string_ | `-` |
| `cover` | File cover image | _string_ | `-` |
| `fit` | Cover image fill mode, Optional value is `fill` `contain` `cover` `none` `scale-down` | _string_ | `-` |
| `state` | File upload state, Optional value is `loading` `success` `error` | _string_ | `-` |

### VarFileUtils

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `getLoading` | Gets a collection of files for `state` is `loading` | `VarFile[]` | `VarFile[]` |
| `getSuccess` | Gets a collection of files for `state` is `success` | `VarFile[]` | `VarFile[]` |
| `getError` | Gets a collection of files for `state` is `error` | `VarFile[]` | `VarFile[]` |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `getLoading` | Gets a collection of files for `state` is `loading` | `VarFile[]` | `VarFile[]` |
| `getSuccess` | Gets a collection of files for `state` is `success` | `VarFile[]` | `VarFile[]` |
| `getError` |  Gets a collection of files for `state` is `error` | `VarFile[]` | `VarFile[]` |
| `validate` | Trigger validate | `-` | `valid: Promise<boolean>` |
| `resetValidation` | Clearing validate messages | `-` | `-` |
| `reset` | Clear the value of the binding(set to `[]`)and validate messages | `-` | `-` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `before-read` | Trigger returns a false value before a file is read to prevent the file from being read(support promise) | `file: VarFile` |
| `after-read` | Triggered after the file is read | `file: VarFile` |
| `oversize` | Triggered when the file size limit is exceeded | `file: VarFile` |
| `before-remove` | Triggered before file deletion, return false value to prevent file deletion (support promise) | `file: VarFile` |
| `remove` | Triggered when deleting a file. There is a true value to prevent deleting a file (support promise) | `file: VarFile` |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Upload action content | `-` |

### Style Variables

Here are the CSS variables used by the component, Styles can be customized using [StyleProvider](#/en-US/style-provider)

| Variable | Default |
| --- | --- |
| `--uploader-action-background`            | `#f7f8fa`                                                                                    |
| `--uploader-action-icon-color`            | `#888`                                                                                       |
| `--uploader-action-icon-size`             | `24px`                                                                                       |
| `--uploader-action-margin`                | `0 10px 10px 0`                                                                              |
| `--uploader-file-size`                    | `80px`                                                                                       |
| `--uploader-file-margin`                  | `0 10px 10px 0`                                                                              |
| `--uploader-file-name-background`         | `#f7f8fa`                                                                                    |
| `--uploader-file-name-color`              | `#888`                                                                                       |
| `--uploader-file-name-font-size`          | `12px`                                                                                       |
| `--uploader-file-name-padding`            | `10px`                                                                                       |
| `--uploader-file-text-align`              | `center`                                                                                     |
| `--uploader-file-close-background`        | `rgba(0, 0, 0, 0.3)`                                                                         |
| `--uploader-file-close-size`              | `24px`                                                                                       |
| `--uploader-file-close-icon-font-size`    | `14px`                                                                                       |
| `--uploader-file-close-icon-color`        | `#fff`                                                                                       |
| `--uploader-file-cover-fit`               | `cover`                                                                                      |
| `--uploader-file-cover-background`        | `#f7f8fa`                                                                                    |
| `--uploader-preview-video-width`          | `100vw`                                                                                      |
| `--uploader-preview-video-height`         | `100vw`                                                                                      |
| `--uploader-file-indicator-height`        | `4px`                                                                                        |
| `--uploader-file-indicator-normal-color`  | `var(--color-disabled)`                                                                      |
| `--uploader-file-indicator-success-color` | `var(--color-success)`                                                                       |
| `--uploader-file-indicator-error-color`   | `var(--color-danger)`                                                                        |
| `--uploader-disabled-color`               | `#ddd`              
| `--uploader-disabled-text-color`          | `var(--color-text-disabled)`      |
| `--uploader-loading-background`           | `linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.3), hsla(0, 0%, 100%, 0))` |