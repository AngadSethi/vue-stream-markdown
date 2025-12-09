import type { PropType } from 'vue'
import type { CodeNodeRendererProps } from '../../../types'
import { computed, defineComponent, h, renderList, toRefs } from 'vue'
import { useCodeOptions } from '../../../composables'

export default defineComponent({
  name: 'VanillaRenderer',
  props: {
    node: {
      type: Object as PropType<CodeNodeRendererProps['node']>,
      required: true,
    },
    codeOptions: {
      type: Object as PropType<CodeNodeRendererProps['codeOptions']>,
      default: undefined,
    },
  },
  setup(props) {
    const { codeOptions } = toRefs(props)

    const code = computed(() => props.node.value.trim())
    const lang = computed(() => props.node.lang || '')

    const { showLineNumbers } = useCodeOptions({
      codeOptions,
      language: lang,
    })
    const lines = computed(() => code.value.split('\n'))

    return () => h(
      'pre',
      {
        'data-stream-markdown': 'code',
        'data-show-line-numbers': showLineNumbers.value,
        'data-lang': lang.value,
        'style': {
          counterReset: 'line',
        },
      },
      h(
        'code',
        {
          translate: 'no',
        },
        renderList(
          lines.value,
          (line, index) => h(
            'div',
            {
              'data-stream-markdown': 'code-line',
              'key': index,
            },
            line,
          ),
        ),
      ),
    )
  },
})
