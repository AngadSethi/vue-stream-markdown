<script setup>
const htmlExample = `
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Preview Example</title>
  <style>
    html,
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    .container {
      height: 100%;
      box-sizing: border-box;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
    }
    .button {
      padding: 10px 20px;
      background: white;
      color: #667eea;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
  <\/style>
<\/head>
<body>
  <div class="container">
    <h2>Hello, World!</h2>
    <p>This is an HTML preview example.</p>
    <button class="button" onclick="alert('Clicked!')">
      Click Me
    </button>
  </div>
<\/body>
<\/html>
\`\`\`
`

const mermaidExample = `
\`\`\`mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
\`\`\`
`

// Previewers examples
const disableAllPreviewers = false

const disableHtmlPreviewer = {
  html: false,
  mermaid: true,
}

const disableMermaidPreviewer = {
  html: true,
  mermaid: false,
}
</script>

# Previewers

The previewers configuration allows you to enable, disable, or customize preview components for any programming language in code blocks. By default, HTML and Mermaid diagrams have built-in previewers, but you can add custom previewers for any language.

## previewers

- **Type:** `boolean | PreviewerConfig`
- **Default:** `true` (built-in previewers enabled by default)

Configuration for code block previewers. Set to `false` to disable all previewers, or configure specific previewer types. When `previewers` is set to `true`, only HTML and Mermaid have default previewers enabled. For other languages, you need to explicitly configure a custom previewer component.

### PreviewerConfig Interface

```typescript
type PreviewerConfig
  = | boolean
    | ({
      placement?: PreviewSegmentedPlacement
      mermaid?: boolean | Component
      html?: boolean | Component
    } & {
      [key: string]: Component
    })
```

The `PreviewerConfig` is an object that can contain:
- **placement**: Optional placement configuration for preview components (see [placement](#placement) section below)
- **Language-specific keys**: The language identifier (e.g., `'html'`, `'mermaid'`, `'javascript'`, `'python'`, `'vue'`, etc.)
  - For `html` and `mermaid`: `boolean` (to enable/disable default previewer) or `Component` (custom previewer)
  - For all other languages: `Component` only (no built-in previewers available)

### Default Behavior

When `previewers` is set to `true`:
- HTML code blocks use the default HTML previewer (sandboxed iframe)
- Mermaid code blocks use the default Mermaid previewer (SVG rendering)
- All other languages have no previewer by default

To add previewers for other languages, you must explicitly configure them with custom components.

## placement

- **Type:** `'left' | 'center' | 'right' | 'auto'`
- **Default:** `'auto'`

Controls the position of the preview component relative to the code block in the segmented view. The preview component can be displayed on the left, center, or right side of the code block.

### Placement Options

- **`'left'`**: Preview component appears on the left side of the code block
- **`'center'`**: Preview component appears in the center (between code and other content)
- **`'right'`**: Preview component appears on the right side of the code block
- **`'auto'`**: Automatically determines placement based on whether the code block has a language title:
  - If language title is shown: uses `'center'`
  - If no language title: uses `'left'`

### Examples

**Set placement to right:**

```vue
<script setup lang="ts">
import type { PreviewerConfig } from 'vue-stream-markdown'
import { Markdown } from 'vue-stream-markdown'

const previewers: PreviewerConfig = {
  placement: 'right',
  html: true,
  mermaid: true,
}
</script>

<template>
  <Markdown :content="content" :previewers="previewers" />
</template>
```

**Set placement to center:**

```vue
<script setup lang="ts">
import type { PreviewerConfig } from 'vue-stream-markdown'
import { Markdown } from 'vue-stream-markdown'

const previewers: PreviewerConfig = {
  placement: 'center',
  html: true,
}
</script>

<template>
  <Markdown :content="content" :previewers="previewers" />
</template>
```

**Use auto placement (default):**

```vue
<script setup lang="ts">
import type { PreviewerConfig } from 'vue-stream-markdown'
import { Markdown } from 'vue-stream-markdown'

const previewers: PreviewerConfig = {
  placement: 'auto', // or omit this property
  html: true,
}
</script>

<template>
  <Markdown :content="content" :previewers="previewers" />
</template>
```

## html

- **Type:** `boolean | Component | undefined`
- **Default:** `true` (HTML previewer enabled)

Controls the HTML previewer for HTML code blocks. When set to `true`, the default HTML previewer is used, which renders HTML content in a sandboxed iframe. When set to `false`, the previewer is disabled and only the code is shown. When set to a Vue component, that component is used as the custom previewer.

The default HTML previewer renders HTML content in a sandboxed iframe with `allow-scripts` and `allow-same-origin` permissions, allowing the HTML to execute JavaScript while maintaining security isolation. The iframe automatically adjusts its height based on the content.

**HTML code block with preview:**

<StreamMarkdown :content="htmlExample" />

**Disable HTML previewer:**

```vue
<script setup lang="ts">
import type { PreviewerConfig } from 'vue-stream-markdown'
import { Markdown } from 'vue-stream-markdown'

const previewers: PreviewerConfig = {
  html: false,
  mermaid: true,
}
</script>

<template>
  <Markdown :content="content" :previewers="previewers" />
</template>
```

**Custom HTML previewer:**

```vue
<script setup lang="ts">
import type { PreviewerConfig } from 'vue-stream-markdown'
import { Markdown } from 'vue-stream-markdown'
import CustomHtmlPreviewer from './CustomHtmlPreviewer.vue'

const previewers: PreviewerConfig = {
  html: CustomHtmlPreviewer, // Custom component
}
</script>

<template>
  <Markdown :content="content" :previewers="previewers" />
</template>
```

When using a custom component, it will receive the same props as the default HTML previewer component, which includes the code block node data.

## mermaid

- **Type:** `boolean | Component | undefined`
- **Default:** `true` (Mermaid previewer enabled)

Controls the Mermaid previewer for Mermaid code blocks. When set to `true`, the default Mermaid previewer is used, which renders Mermaid diagrams as SVG. When set to `false`, the previewer is disabled and only the code is shown. When set to a Vue component, that component is used as the custom previewer.

The default Mermaid previewer automatically renders Mermaid diagrams with support for:
- Dark mode theming (automatically switches based on `isDark` prop)
- Zoom controls (configurable via `controls.mermaid`)
- Responsive sizing (automatically adjusts height based on diagram dimensions)
- Error handling (displays error component on render failure)

**Mermaid diagram with preview:**

<StreamMarkdown :content="mermaidExample" />

**Disable Mermaid previewer:**

<StreamMarkdown :content="mermaidExample" :previewers="disableMermaidPreviewer" />

```vue
<script setup lang="ts">
import type { PreviewerConfig } from 'vue-stream-markdown'
import { Markdown } from 'vue-stream-markdown'

const previewers: PreviewerConfig = {
  html: true,
  mermaid: false,
}
</script>

<template>
  <Markdown :content="content" :previewers="previewers" />
</template>
```

**Custom Mermaid previewer:**

```vue
<script setup lang="ts">
import type { PreviewerConfig } from 'vue-stream-markdown'
import { Markdown } from 'vue-stream-markdown'
import CustomMermaidPreviewer from './CustomMermaidPreviewer.vue'

const previewers: PreviewerConfig = {
  mermaid: CustomMermaidPreviewer, // Custom component
}
</script>

<template>
  <Markdown :content="content" :previewers="previewers" />
</template>
```

When using a custom component, it will receive the same props as the default Mermaid previewer component, which includes the code block node data, Mermaid options, and dark mode state.

## Custom Previewers for Other Languages

For languages other than `html` and `mermaid`, you must provide a custom `Component` (boolean values are not accepted since there are no built-in previewers for these languages).

The previewer component will receive `CodeNodeRendererProps`

```vue
<!-- JavaScriptPreviewer.vue -->
<script setup lang="ts">
import type { CodeNodeRendererProps } from 'vue-stream-markdown'

const props = defineProps<CodeNodeRendererProps>()
</script>

<template>
  <div class="js-previewer">
    <!-- Your custom preview rendering -->
  </div>
</template>
```

```vue
<script setup lang="ts">
import type { PreviewerConfig } from 'vue-stream-markdown'
import { Markdown } from 'vue-stream-markdown'
import JavaScriptPreviewer from './JavaScriptPreviewer.vue'

const previewers: PreviewerConfig = {
  javascript: JavaScriptPreviewer,
}
</script>

<template>
  <Markdown :content="content" :previewers="previewers" />
</template>
```

## Disabling All Previewers

To disable all previewers, set `previewers` to `false`:

```vue
<template>
  <Markdown :content="content" :previewers="false" />
</template>
```

When previewers are disabled, code blocks will only display the code content without any preview functionality.
