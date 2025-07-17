# Spotify Courses with Anam AI

A Next.js application that simulates Spotify's course discovery interface with integrated Anam AI assistant for personalized course recommendations.

## Features

- 🎨 **Spotify-inspired UI**: Mobile-first design that mimics Spotify's interface
- 🤖 **Anam AI Integration**: AI-powered course advisor with real-time video streaming
- 📱 **Responsive Design**: Optimized for mobile devices with touch-friendly interactions
- 🎯 **Topic Selection**: Interactive topic selection with AI-powered recommendations
- 🎥 **Real-time AI Avatar**: Live video streaming of AI assistant using Anam's technology

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **AI Integration**: Anam AI SDK
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Anam AI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd anam-spotify
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically - Vercel will detect the Next.js framework

### Environment Variables

The Anam AI API key is already configured in the application. For production, consider moving it to environment variables:

```bash
ANAM_API_KEY=your_api_key_here
```

## How It Works

1. **Home Screen**: Displays popular and trending courses
2. **Course Selection**: Click "Courses" to open the topic selection modal
3. **Topic Selection**: Choose 2+ topics of interest
4. **AI Assistant**: Alex (Anam AI) appears to provide personalized recommendations
5. **Course Discovery**: Browse AI-recommended courses based on selected topics

## Anam AI Integration

The app uses Anam AI's technology to provide:
- Real-time video streaming of AI assistant
- Personalized course recommendations
- Natural language interaction
- Context-aware responses based on user selections

## Project Structure

```
anam-spotify/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   └── SpotifyCoursesUI.tsx # Main component
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
├── vercel.json              # Vercel deployment config
└── README.md                # This file
```

## Customization

### Changing the AI Assistant

To modify the AI assistant's personality or appearance:

1. Update the `personaConfig` in `components/SpotifyCoursesUI.tsx`
2. Modify the `systemPrompt` for different behavior
3. Change `avatarId` and `voiceId` for different appearances

### Adding New Topics

Add new topics to the selection grid by modifying the topics array in the component.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for educational purposes. Please respect Spotify's and Anam AI's terms of service.

## Support

For issues related to:
- **Anam AI**: Check the [Anam AI documentation](https://docs.anam.ai/)
- **Next.js**: Refer to the [Next.js documentation](https://nextjs.org/docs)
- **Vercel**: Visit [Vercel's help center](https://vercel.com/help) 