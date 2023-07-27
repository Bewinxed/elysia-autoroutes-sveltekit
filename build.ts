async function build() {
  const entrypoint = 'src/index.ts'

  const result = await Bun.build({
    entrypoints: [entrypoint],
    outdir: './dist',
    minify: false,
    target: 'node',
  })

  if (result.success)
    Bun.spawn(['dts-bundle-generator', entrypoint, '-o', 'dist/index.d.ts'])
}

build()
