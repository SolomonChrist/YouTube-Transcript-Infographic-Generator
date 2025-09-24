# YouTube Transcript Infographic Generator 🎥📊

## Vision
To help creators, marketers, and educators transform any block of text—such as a video transcript, article, or notes—into an instantly shareable, visually appealing vertical infographic.

## Why Was This Made?
Manually designing infographics is a slow and tedious process. It requires design skills, time, and effort to distill key information and present it effectively. This tool automates the entire workflow, from content analysis to final visual design, allowing anyone to create professional-grade infographics in seconds.

## Features
- **Text Input**: Simply paste any transcript, article, or block of text to get started.
- **User-Provided API Key**: Securely use your own Google Gemini API key for all AI operations. Your key is used only in your browser and is never stored.
- **AI-Powered Content Analysis**: Uses the Gemini API to automatically analyze your text, generating a suitable title and extracting 5-7 key insights.
- **Advanced AI Infographic Generation**: Leverages the powerful `gemini-2.5-flash-image-preview` model to design a unique infographic from scratch, including layout, typography, and icons based on your content.
- **Style Presets**: Choose from multiple professionally designed starting points:
  - **Corporate**: A clean, blue/gray palette with professional typography.
  - **Colorful Social**: A vibrant gradient background with bold, playful fonts.
  - **Minimalist**: A sleek black & white layout with a focus on elegant typography.
- **Preview & Download**: Instantly preview the AI-generated infographic and download it as a high-quality PNG or PDF.

## Tech Stack
- **AI**: Google Gemini API (`gemini-2.5-flash` for analysis, `gemini-2.5-flash-image-preview` for image generation).
- **Frontend**: React, TypeScript, Tailwind CSS
- **Exporting**: `jspdf` for PDF.

## Quick Start
1.  **Clone the repo**: `git clone https://github.com/your-repo/youtube-infographic-generator.git`
2.  **Navigate to the project directory** and open `index.html` in your browser.
3.  **Paste your transcript or text** into the input field.
4.  **Add your Gemini API Key**.
5.  **Select a style preset** from the dropdown menu.
6.  Click **"Generate Infographic"**. The app will first analyze the text, then generate the image.
7.  **Preview** the result and **Download** as a PNG or PDF.

## Contributing
Contributions are welcome! If you have ideas for new features, style presets, or improvements, please open an issue or submit a pull request.

## Upsell & Promotions
- **Community**: Join the AI + Automation Community on [Skool](https://www.skool.com/learn-automation/about).
- **Learn More**: Check out my [AI Masterclass Level 1](https://youtu.be/vihx2ZPvw0M?si=YpUdk4e71wlEiFh-) and [Level 2 (n8n)](https://youtu.be/rkIU6R6hPwE?si=BN4YpuWFlVeTzSOZ) on YouTube.
- **GitHub**: Star this project on [GitHub](https://github.com/your-repo)!

## Created By
This project was created by **Solomon Christ**.
- **Website**: [solomonchrist.com](https://www.solomonchrist.com)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.