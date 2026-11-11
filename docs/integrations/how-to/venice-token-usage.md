# Venice token usage

OpenClaude preserves the conversation prefix between Venice Chat Completions
requests and sends a stable `prompt_cache_key` for the session. The tool
definitions and system instructions remain available on each request. Venice
uses the key as a routing hint. Its usage reports include cached input tokens.
[Venice prompt caching](https://docs.venice.ai/guides/features/prompt-caching)

The default message count threshold is off for Venice. Automatic compaction
still runs near the token limit, and the hard message safety cap and explicit
message count settings still apply. A compaction creates a new prompt prefix.

For routine reads, simple edits, and mechanical checks, start the CLI with
thinking disabled. Venice receives an explicit request to skip thinking.

```powershell
node bin/openclaude --thinking disabled
```

For work that needs reasoning, DeepSeek V4 Flash 0731 and the two V4.1 Flash
1017 variants expose `low`, `high`, and `max` in `/effort`. They use the
provider's high default unless you select another setting.

Compare model costs using the workload's uncached input, cached input, and
output token counts separately. A model with cheaper output can still cost
more on a long session if it charges more for every cached input token. Use
the provider's reported charges to evaluate the total.
[Venice model catalog](https://api.venice.ai/api/v1/models?type=text)
