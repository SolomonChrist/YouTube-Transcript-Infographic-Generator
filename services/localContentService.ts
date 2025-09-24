import { InfographicData, KeyInsight } from '../types';

/**
 * Parses a raw block of text into a structured format for the infographic,
 * serving as a non-AI-powered fallback.
 * @param text The raw input text from the user.
 * @returns An InfographicData object.
 */
export const processTextLocally = (text: string): InfographicData => {
  const lines = text.trim().split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) {
    // Return a default structure if the input is empty
    return {
      sourceData: { title: 'Your Title Here' },
      insights: [
        { title: 'Your First Insight', description: 'Describe your key point here.', icon_keyword: '' },
        { title: 'Your Second Insight', description: 'Describe your key point here.', icon_keyword: '' },
        { title: 'Your Third Insight', description: 'Describe your key point here.', icon_keyword: '' },
      ],
    };
  }

  // Use the first line as the main title and the rest for content
  const title = lines.shift() || 'Key Insights';
  
  const insights: KeyInsight[] = [];
  const content = lines.join('\n');
  
  // Split content by double newlines to identify paragraphs, which we treat as insights
  const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim() !== '').slice(0, 4); // Take up to 4 insights

  for (const para of paragraphs) {
    const trimmedPara = para.trim();
    const words = trimmedPara.split(/\s+/);
    // Create a short title from the beginning of the paragraph
    const insightTitle = words.slice(0, 6).join(' ') + (words.length > 6 ? '...' : '');
    
    insights.push({
      title: insightTitle,
      description: trimmedPara,
      icon_keyword: '', // Not used for local generation, but required by the type
    });
  }

  // If no paragraphs were found (e.g., just a list of single lines), treat each line as an insight
  if (insights.length === 0 && lines.length > 0) {
      lines.slice(0, 4).forEach(line => {
          insights.push({
              title: line.trim(),
              description: '', // No separate description for single-line insights
              icon_keyword: '',
          });
      });
  }

  return {
    sourceData: { title },
    insights,
  };
};


// --- Fallback Icons ---

// A set of simple, generic SVG icons stored as strings.
// Using 'currentColor' allows the fill color to be set by CSS, but since we are using <img> tags,
// we'll default to a neutral color. A dark gray is a safe choice for most backgrounds.
const iconColor = '#374151'; // A neutral dark gray

const icon1_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${iconColor}"><path d="M12 2.25a.75.75 0 0 1 .75.75v2.392a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 6a.75.75 0 0 0-.53 1.28L8.25 8.561a.75.75 0 1 0 1.06-1.06L8.03 6.22a.75.75 0 0 0-.53-.22ZM16.5 6a.75.75 0 0 0-.53.22l-1.22 1.22a.75.75 0 1 0 1.06 1.061l1.22-1.22a.75.75 0 0 0-.53-1.281ZM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM3.75 12a.75.75 0 0 0 0 1.5h2.392a.75.75 0 0 0 0-1.5H3.75ZM17.858 12a.75.75 0 0 0 0 1.5h2.392a.75.75 0 0 0 0-1.5h-2.392ZM7.5 18a.75.75 0 0 0-.53.22l-1.22 1.22a.75.75 0 1 0 1.06 1.06l1.22-1.22a.75.75 0 0 0-.53-1.28ZM16.5 18a.75.75 0 0 0-.53 1.28l1.22 1.22a.75.75 0 1 0 1.06-1.06l-1.22-1.22a.75.75 0 0 0-.53-.22ZM12 18.75a.75.75 0 0 1 .75.75v2.392a.75.75 0 0 1-1.5 0V19.5a.75.75 0 0 1 .75-.75Z"/></svg>`; // Lightbulb / Idea
const icon2_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${iconColor}"><path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"/></svg>`; // Arrow / Process
const icon3_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${iconColor}"><path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071 1.052A11.202 11.202 0 0 1 11.25 10.5a1.5 1.5 0 0 1-3 0 1.5 1.5 0 0 0-3 0c0 .981.32 1.894.872 2.614.54.708 1.274 1.264 2.128 1.634a.75.75 0 1 0 .83-1.802c-.56-.26-1.06-.656-1.46-1.126a9.703 9.703 0 0 0-.572-2.344 1.5 1.5 0 0 1 3 0c0 .225.026.446.076.662a.75.75 0 0 0 1.43-.33A12.702 12.702 0 0 0 12.963 2.286Z" clip-rule="evenodd"/></svg>`; // Checkmark / Result
const icon4_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${iconColor}"><path d="M12 1.5a.75.75 0 0 1 .75.75V3a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM18.682 6.098a.75.75 0 0 1 1.06 1.06l-.707.707a.75.75 0 0 1-1.06-1.06l.707-.707ZM21.75 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM18.682 17.902a.75.75 0 0 1 .707.707l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 .353-.707ZM12 21.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM5.318 17.902a.75.75 0 0 1 1.06.707l-.707 1.06a.75.75 0 0 1-1.06-1.06l.707-.707ZM2.25 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM5.318 6.098a.75.75 0 0 1 .707-.707l1.06 1.06a.75.75 0 1 1-1.06 1.06L5.318 6.098ZM12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z"/></svg>`; // Gear / Data

const FALLBACK_ICON_SVGS = [icon1_svg, icon2_svg, icon3_svg, icon4_svg];

/**
 * Converts an SVG string to a base64 data URL.
 * @param svg The raw SVG string.
 * @returns A string formatted as a data URL.
 */
const svgToBase64 = (svg: string): string => {
    // The 'btoa' function encodes a string in base-64.
    // It is available in all modern browsers.
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Provides a list of generic fallback icon data URLs.
 * @param count The number of icons required.
 * @returns An array of base64 encoded data URLs.
 */
export const getFallbackIcons = (count: number): string[] => {
    const icons: string[] = [];
    if (count <= 0) return icons;

    for (let i = 0; i < count; i++) {
        // Cycle through the available icons using the modulo operator
        const svgIcon = FALLBACK_ICON_SVGS[i % FALLBACK_ICON_SVGS.length];
        icons.push(svgToBase64(svgIcon));
    }
    return icons;
};
