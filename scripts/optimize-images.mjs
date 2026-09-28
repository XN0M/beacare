import sharp from 'sharp'
import { resolve } from 'node:path'

const assets = [
  ['hero.png', 'hero.webp', 1800],
  ['hair.png', 'hair.webp', 1200],
  ['skin.png', 'skin.webp', 1200],
  ['nails.png', 'nails.webp', 1200],
  ['tools.png', 'tools.webp', 1200],
]

await Promise.all(assets.map(async ([source, output, width]) => {
  const sourceDirectory = resolve('assets/source-images')
  const outputDirectory = resolve('public/images')
  await sharp(resolve(sourceDirectory, source))
    .resize({ width: Number(width), withoutEnlargement: true })
    .webp({ quality: 82, smartSubsample: true })
    .toFile(resolve(outputDirectory, output))
}))

console.log(`Optimized ${assets.length} editorial images.`)
