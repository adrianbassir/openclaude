import { defineVendor } from '../define.js'
import type { ReasoningControlMetadata } from '../descriptors.js'

const flashReasoning: ReasoningControlMetadata = {
  mode: 'levels',
  levels: ['low', 'high', 'max'],
  defaultLevel: 'high',
  wireFormat: 'reasoning_effort',
}

export default defineVendor({
  id: 'venice',
  label: 'Venice',
  classification: 'openai-compatible',
  defaultBaseUrl: 'https://api.venice.ai/api/v1',
  defaultModel: 'venice-uncensored',
  requiredEnvVars: ['VENICE_API_KEY'],
  setup: {
    requiresAuth: true,
    authMode: 'api-key',
    credentialEnvVars: ['VENICE_API_KEY'],
  },
  transportConfig: {
    kind: 'openai-compatible',
    openaiShim: {
      supportsApiFormatSelection: false,
      supportsAuthHeaders: false,
    },
  },
  preset: {
    id: 'venice',
    description: 'Venice OpenAI-compatible endpoint',
    apiKeyEnvVars: ['VENICE_API_KEY'],
    modelEnvVars: ['OPENAI_MODEL'],
  },
  validation: {
    kind: 'credential-env',
    routing: {
      matchDefaultBaseUrl: true,
      matchBaseUrlHosts: ['api.venice.ai'],
    },
    credentialEnvVars: ['VENICE_API_KEY', 'OPENAI_API_KEYS', 'OPENAI_API_KEY'],
    missingCredentialMessage:
      'Venice auth is required. Set VENICE_API_KEY or OPENAI_API_KEYS / OPENAI_API_KEY.',
  },
  catalog: {
    source: 'static',
    models: [
      {
        id: 'venice-uncensored',
        apiName: 'venice-uncensored',
        label: 'Venice Uncensored',
      },
      {
        id: 'deepseek-v4-1-flash-1017-uncensored',
        apiName: 'deepseek-v4-1-flash-1017-uncensored',
        label: 'DeepSeek V4.1 Flash 1017 Uncensored',
        reasoning: flashReasoning,
      },
      {
        id: 'deepseek-v4-1-flash-1017',
        apiName: 'deepseek-v4-1-flash-1017',
        label: 'DeepSeek V4.1 Flash 1017',
        reasoning: flashReasoning,
      },
      {
        id: 'deepseek-v4-flash-0731',
        apiName: 'deepseek-v4-flash-0731',
        label: 'DeepSeek V4 Flash 0731',
        reasoning: flashReasoning,
      },
    ],
  },
  usage: { supported: true },
})
