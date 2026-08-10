# KDL Framework — Error Handling Taxonomy

The KDL Framework categorizes errors into explicit typed classes extending `BasePipelineError`:

- `ConfigurationError` (Fatal)
- `ValidationError` (Fatal)
- `StageError` (Retryable)
- `ProviderError` (Retryable)
- `AIError` (Retryable)
- `BuildError` (Fatal)
- `ReviewError` (Fatal)
- `TimeoutError` (Retryable)
- `FilesystemError` (Fatal)
- `NetworkError` (Retryable)
- `FatalPipelineError` (Fatal)
- `RetryablePipelineError` (Retryable)
