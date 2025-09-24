import { StylePreset } from '../types';

export const templates: Record<StylePreset, { prompt: string; }> = {
  [StylePreset.Corporate]: {
    prompt: `A professional, clean, single-color line icon representing '{keyword}'. The icon should be simple, modern, and suitable for a corporate presentation, using a blue and gray color palette. White background.`
  },
  [StylePreset.ColorfulSocial]: {
    prompt: `A vibrant, colorful, and friendly illustration-style icon for '{keyword}'. It should be bold, eye-catching, and suitable for social media. Use a bright, energetic color palette. White background.`
  },
  [StylePreset.Minimalist]: {
    prompt: `An elegant, ultra-thin, minimalist line icon for '{keyword}'. The design should be pure, simple, and use only black or dark gray lines. Emphasize whitespace and geometric purity. White background.`
  },
  [StylePreset.ModernDark]: {
    prompt: `A modern, professional icon for '{keyword}' for a dark-themed infographic. Use a bright, single accent color (like teal or cyan) on a transparent background. The style should be clean, thin lines.`
  },
  [StylePreset.FreshClean]: {
    prompt: `A friendly, simple, filled-shape icon representing '{keyword}'. Use a soft and fresh color palette (like light green, sky blue). The style should be clean and approachable. White background.`
  },
  [StylePreset.Geometric]: {
    prompt: `A bold, geometric icon for '{keyword}'. The design should be constructed from simple shapes (circles, squares, triangles) and use a vibrant, high-contrast color palette. White background.`
  }
};