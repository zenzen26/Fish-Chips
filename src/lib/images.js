const files = import.meta.glob('../media/images/*.webp', { eager: true, import: 'default' });

// Look an image up by filename without extension: image('cilantro').
export function image(name) {
  return files[`../media/images/${name}.webp`];
}
