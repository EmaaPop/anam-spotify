'use client'

import React, { useState, useEffect } from 'react';

const SpotifyCoursesUI = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTopicSelection, setShowTopicSelection] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showExploreCourses, setShowExploreCourses] = useState(false);
  const [anamClient, setAnamClient] = useState<any>(null);
  const [anamStatus, setAnamStatus] = useState('');

  // Initialize Anam AI
  const initializeAnam = async () => {
    try {
      setAnamStatus('Connecting to AI assistant...');
      
      // Using the provided API key
      const API_KEY = 'YTljNTdlOWQtYzQ0OS00YTI4LWJhNDEtY2MwNGU2NDk4YzBiOno3UlI3Z1l2d0pwWHo2cnkzYUUzek41VWh1dnQyTXJRZTlnTzRkOCsrUXM9';
      
      const response = await fetch("https://api.anam.ai/v1/auth/session-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          personaConfig: {
            name: "Alex",
            avatarId: "30fa96d0-26c4-4e55-94a0-517025942e18", // Cara avatar
            voiceId: "6bfbe25a-979d-40f3-a92b-5394170af54b", // Cara voice
            brainType: "ANAM_GPT_4O_MINI_V1",
            systemPrompt: `You are Alex, a friendly AI course advisor for Spotify Courses. 
            The user has just selected topics: ${selectedTopics.join(', ')}. 
            Welcome them warmly and help them discover courses that match their interests. 
            Keep responses brief and enthusiastic.`,
          },
        }),
      });
      
      const { sessionToken } = await response.json();
      
      // Load Anam SDK from CDN
      const script = document.createElement('script');
      script.src = 'https://esm.sh/@anam-ai/js-sdk@latest';
      script.type = 'module';
      document.head.appendChild(script);
      
      // Wait for script to load
      await new Promise((resolve) => {
        script.onload = resolve;
      });
      
      // Access the global Anam object
      const createClient = (window as any).Anam?.createClient;
      
      if (!createClient) {
        throw new Error('Failed to load Anam SDK');
      }
      
      const client = createClient(sessionToken);
      
      // Start streaming to video element
      await client.streamToVideoElement("anam-video");
      
      setAnamClient(client);
      setAnamStatus('');
      
      // Send initial greeting
      setTimeout(() => {
        if (client) {
          client.talk(`Hello! I see you're interested in ${selectedTopics.join(' and ')}. I'm Alex, and I'm here to help you find the perfect courses. Let me show you some recommendations!`);
        }
      }, 2000);
      
    } catch (error) {
      console.error('Failed to initialize Anam:', error);
      setAnamStatus('AI assistant unavailable');
    }
  };

  // Clean up Anam when component unmounts or view changes
  const cleanupAnam = () => {
    if (anamClient) {
      anamClient.stopStreaming();
      setAnamClient(null);
    }
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      cleanupAnam();
    };
  }, []);

  return (
    <div className="bg-black text-white h-screen w-full max-w-[390px] mx-auto relative overflow-hidden">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-2">
        <div className="bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold">
          9:45
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
            <path d="M1 9l2-2v8a2 2 0 002 2h14a2 2 0 002-2V7l2 2V2L1 2v7z"/>
          </svg>
          <div className="bg-white text-black px-2 py-0.5 rounded text-xs font-bold">
            61
          </div>
          <div className="w-6 h-3 bg-white rounded-sm"></div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex gap-3 px-4 mt-4">
        <div className="bg-gray-800 rounded-full px-4 py-2 text-sm flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
            <img src="/api/placeholder/32/32" alt="Music" className="w-full h-full object-cover" />
          </div>
          <span>Music</span>
        </div>
        <div className="bg-gray-800 rounded-full px-4 py-2 text-sm">
          Podcasts
        </div>
        <div className="bg-gray-800 rounded-full px-4 py-2 text-sm">
          Audiobooks
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-green-500 rounded-full px-4 py-2 text-sm text-black font-semibold"
        >
          Courses
        </button>
      </div>

      {/* Main Content */}
      {!showExploreCourses ? (
        <div className="mt-8 px-4">
          <h2 className="text-2xl font-bold mb-4">Popular & Trending Courses</h2>
          
          <div className="flex gap-4 overflow-x-auto pb-4">
            <div className="flex-shrink-0">
              <div className="w-40 h-40 bg-gray-800 rounded-lg overflow-hidden mb-2">
                <img src="/api/placeholder/160/160" alt="Ancient History" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm font-semibold">History of the Anci...</div>
              <div className="text-xs text-gray-400">The Great Courses</div>
            </div>
            
            <div className="flex-shrink-0">
              <div className="w-40 h-40 bg-gray-800 rounded-lg overflow-hidden mb-2">
                <img src="/api/placeholder/160/160" alt="Meditation" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm font-semibold">Modern Meditatio...</div>
              <div className="text-xs text-gray-400">Justin Michael Williams</div>
            </div>
            
            <div className="flex-shrink-0">
              <div className="w-40 h-40 bg-gray-800 rounded-lg overflow-hidden mb-2">
                <img src="/api/placeholder/160/160" alt="Ramit" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm font-semibold">Ramit</div>
              <div className="text-xs text-gray-400">Ramit Se</div>
              <div className="text-xs text-gray-400">Teach Yo</div>
            </div>
          </div>
        </div>
      ) : (
        /* Explore Courses Screen */
        <div className="flex-1 overflow-y-auto pb-40">
          <div className="px-4 mt-8">
            {/* Anam AI Persona Section */}
            <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-4 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-black rounded-full overflow-hidden flex-shrink-0">
                    <video 
                      id="anam-video" 
                      autoPlay 
                      playsInline 
                      muted
                      className="w-full h-full object-cover"
                      style={{ transform: 'scale(1.5)' }}
                    ></video>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">Alex - Your AI Course Guide</h3>
                    <p className="text-sm text-gray-300">
                      {anamStatus || "I'll help you find the perfect courses based on your interests"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">AI Assistant Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-6">Explore Courses</h1>
            
            {/* Course Category Cards - Scrollable Grid */}
            <div className="space-y-4 mb-8">
              {/* First Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="h-32 bg-gray-700 relative overflow-hidden">
                    <img src="/api/placeholder/200/128" alt="Popular" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Popular &</h3>
                    <h3 className="font-semibold">Trending</h3>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="h-32 bg-gray-700 relative overflow-hidden">
                    <img src="/api/placeholder/200/128" alt="Technology" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs">Cheat Code For</p>
                      <p className="text-sm font-semibold">LinkedIn Replies</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Technology</h3>
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="h-32 bg-gray-700 relative overflow-hidden">
                    <img src="/api/placeholder/200/128" alt="Personal Development" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Personal</h3>
                    <h3 className="font-semibold">Development</h3>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Looking for something else */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 mb-4">
                <h2 className="text-xl font-bold">Looking for something else?</h2>
              </div>
            </div>

            {/* Continue scrolling content below */}
            <div className="space-y-8">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="bg-blue-800 px-4 py-2 rounded-full text-sm">
                  Business & Finance
                </div>
                <div className="bg-orange-800 px-4 py-2 rounded-full text-sm">
                  Photo & Video
                </div>
                <div className="bg-purple-800 px-4 py-2 rounded-full text-sm">
                  Technology
                </div>
              </div>
              
              <h2 className="text-2xl font-bold">Explore categories</h2>
              
              {/* New & Trending in Art & Design */}
              <div>
                <h2 className="text-2xl font-bold mb-4">New & Trending in Art & Design</h2>
                
                <div className="flex gap-4 overflow-x-auto">
                  <div className="flex-shrink-0 w-40">
                    <div className="h-40 bg-gray-800 rounded-lg overflow-hidden mb-2">
                      <img src="/api/placeholder/160/160" alt="Art Course 1" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-40">
                    <div className="h-40 bg-gray-800 rounded-lg overflow-hidden mb-2">
                      <img src="/api/placeholder/160/160" alt="Art Course 2" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-40">
                    <div className="h-40 bg-gray-800 rounded-lg overflow-hidden mb-2">
                      <img src="/api/placeholder/160/160" alt="Art Course 3" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI & Technology Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                    <div className="text-white text-xs font-bold text-center">
                      <div>AI</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Explore</p>
                    <h2 className="text-2xl font-bold">AI & Technology</h2>
                  </div>
                </div>
                
                <div className="flex gap-4 overflow-x-auto pb-4">
                  <div className="flex-shrink-0 w-64">
                    <div className="h-40 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg overflow-hidden mb-2 relative">
                      <img src="/api/placeholder/256/160" alt="10X Productivity" className="w-full h-full object-cover" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-sm">unlock the</p>
                        <p className="text-2xl font-bold">POWER OF AI</p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">10X Your Producti...</div>
                    <div className="text-xs text-gray-400">The Expert Academy</div>
                  </div>
                  
                  <div className="flex-shrink-0 w-64">
                    <div className="h-40 bg-black rounded-lg overflow-hidden mb-2 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-20 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 blur-xl"></div>
                      </div>
                      <div className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded font-semibold">
                        LEARN AI
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-lg font-bold">AI Music and Sound</p>
                        <p className="text-lg font-bold">Creation</p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">AI Music and Soun...</div>
                    <div className="text-xs text-gray-400">Superintelligent</div>
                  </div>
                  
                  <div className="flex-shrink-0 w-64">
                    <div className="h-40 bg-gray-800 rounded-lg overflow-hidden mb-2 relative">
                      <img src="/api/placeholder/256/160" alt="Ultimate Guide" className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded font-semibold">
                        LEARN AI
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-lg font-bold">The Ultimate Guide</p>
                        <p className="text-lg font-bold">to AI for...</p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">The Ul...</div>
                    <div className="text-xs text-gray-400">Superintelligent</div>
                  </div>
                </div>
              </div>

              {/* Ready to learn section */}
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4">Ready to learn a new skill today?</h2>
                <button className="flex items-center gap-2 mx-auto text-green-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                  <span className="font-semibold">Edit your course topics</span>
                </button>
              </div>

              {/* Popular & Trending Courses */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Popular & Trending Courses</h2>
                
                <div className="flex gap-4 overflow-x-auto pb-4">
                  <div className="flex-shrink-0 w-64">
                    <div className="h-40 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg overflow-hidden mb-2 relative">
                      <img src="/api/placeholder/256/160" alt="AI Prompts" className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded font-semibold">
                        LEARN AI
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-lg font-bold">Useful AI Prompts</p>
                        <p className="text-lg font-bold">for Professionals</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 w-64">
                    <div className="h-40 bg-gray-200 rounded-lg overflow-hidden mb-2 relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <div className="text-center p-4">
                          <p className="text-xs text-gray-600 mb-2">Monday Monday</p>
                          <div className="flex gap-2 text-[8px] text-gray-500 mb-2">
                            <span>Home</span>
                            <span>Common Project Podcast</span>
                            <span>The Artist's Way Book Daily</span>
                            <span>About</span>
                          </div>
                          <div className="w-full h-24 bg-gray-100 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                        FREE COURSE
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 w-64">
                    <div className="h-40 bg-gray-800 rounded-lg overflow-hidden mb-2 relative">
                      <img src="/api/placeholder/256/160" alt="Get Ahead" className="w-full h-full object-cover" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-xs">Get a</p>
                        <p className="text-lg font-bold">in 1 h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Overlay - First Screen */}
      {showModal && !showTopicSelection && (
        <div className="absolute inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center px-6">
          <button 
            onClick={() => setShowModal(false)}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ×
          </button>

          {/* Course Icons */}
          <div className="flex gap-3 mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-pink-400 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/api/placeholder/80/80" alt="Course 1" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-2 -right-2 bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs">
                ★
              </div>
              <div className="mt-1 text-xs text-center">
                <div className="text-[10px] uppercase">Learn</div>
                <div className="font-semibold">Useful AI for Profes</div>
              </div>
            </div>
            
            <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs font-bold">EXACTLY</div>
                <div className="text-xs">WHAT TO SAY</div>
              </div>
            </div>
            
            <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden">
              <img src="/api/placeholder/80/80" alt="Course 3" className="w-full h-full object-cover" />
            </div>
            
            <div className="w-20 h-20 bg-green-600 rounded-lg flex items-center justify-center">
              <div className="text-center text-xs">
                <div className="text-[10px]">TO READ</div>
                <div className="font-bold">CIA DOCUMENTS</div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Help us understand what you like</h2>
          <p className="text-gray-400 text-center mb-8">
            Tell us what you'd like to learn and we'll suggest courses to get you started.
          </p>
          
          <button 
            onClick={() => setShowTopicSelection(true)}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold">
            Select topics
          </button>
        </div>
      )}

      {/* Topic Selection Screen */}
      {showTopicSelection && (
        <div className="absolute inset-0 bg-black z-50 flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-3 pb-2">
            <div className="bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold">
              9:46
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
              <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                <path d="M1 9l2-2v8a2 2 0 002 2h14a2 2 0 002-2V7l2 2V2L1 2v7z"/>
              </svg>
              <div className="bg-white text-black px-2 py-0.5 rounded text-xs font-bold">
                60
              </div>
              <div className="w-6 h-3 bg-white rounded-sm"></div>
            </div>
          </div>

          {/* Navigation Pills */}
          <div className="flex gap-3 px-4 mt-4">
            <div className="bg-gray-800 rounded-full px-4 py-2 text-sm flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
                <img src="/api/placeholder/32/32" alt="Music" className="w-full h-full object-cover" />
              </div>
              <span>Music</span>
            </div>
            <div className="bg-gray-800 rounded-full px-4 py-2 text-sm">
              Podcasts
            </div>
            <div className="bg-gray-800 rounded-full px-4 py-2 text-sm">
              Audiobooks
            </div>
            <div className="bg-green-500 rounded-full px-4 py-2 text-sm text-black font-semibold">
              Courses
            </div>
          </div>

          {/* Topic Selection Content */}
          <div className="flex-1 flex flex-col px-6 mt-8">
            <button 
              onClick={() => {
                setShowTopicSelection(false);
                setShowModal(false);
              }}
              className="absolute top-20 right-6 text-white text-3xl"
            >
              ×
            </button>

            {/* Course Icons */}
            <div className="flex gap-3 mb-8 justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-pink-400 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/api/placeholder/80/80" alt="Course 1" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-2 -right-2 bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  ★
                </div>
                <div className="mt-1 text-xs text-center">
                  <div className="text-[10px] uppercase">Learn</div>
                  <div className="font-semibold">Useful AI<br/>for Profes</div>
                </div>
              </div>
              
              <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs font-bold">EXACTLY</div>
                  <div className="text-xs">WHAT TO SAY</div>
                </div>
              </div>
              
              <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden">
                <img src="/api/placeholder/80/80" alt="Course 3" className="w-full h-full object-cover" />
              </div>
              
              <div className="w-20 h-20 bg-green-600 rounded-lg flex items-center justify-center">
                <div className="text-center text-xs">
                  <div className="text-[10px]">TO READ</div>
                  <div className="font-bold">CIA<br/>DOCUMENTS</div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2 text-center">Help us understand what you like</h2>
            <p className="text-gray-400 text-center mb-8 text-sm">
              Tell us what you'd like to learn and we'll suggest<br/>courses to get you started.
            </p>
            
            <button className="bg-gray-700 text-white px-6 py-3 rounded-full font-semibold mx-auto block mb-8">
              Select topics
            </button>

            {/* Progress bar */}
            <div className="w-32 h-1 bg-gray-700 rounded-full mx-auto mb-8">
              <div className="w-1/3 h-full bg-gray-400 rounded-full"></div>
            </div>

            <h2 className="text-2xl font-bold mb-6">What would you like to learn?</h2>

            {/* Topic Grid */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              {[
                'Music & Audio',
                'Film & Photo',
                'Food & Drinks',
                'Lifestyle',
                'Art & Design',
                'AI & Technology',
                'Business & Finance',
                'Personal Development',
                'Health & Wellness',
                'History'
              ].map((topic, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (selectedTopics.includes(topic)) {
                      setSelectedTopics(selectedTopics.filter(t => t !== topic));
                    } else {
                      setSelectedTopics([...selectedTopics, topic]);
                    }
                  }}
                  className={`px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                    selectedTopics.includes(topic)
                      ? 'bg-white text-black'
                      : 'bg-gray-800 text-white'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Done Button - Fixed at bottom */}
          <div className="px-6 pb-8">
            <button 
              onClick={() => {
                if (selectedTopics.length >= 2) {
                  setShowTopicSelection(false);
                  setShowModal(false);
                  setShowExploreCourses(true);
                  // Initialize Anam AI after transition
                  setTimeout(() => initializeAnam(), 500);
                }
              }}
              disabled={selectedTopics.length < 2}
              className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
                selectedTopics.length >= 2
                  ? 'bg-green-500 text-black'
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }`}
            >
              Done
            </button>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-32 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      )}

      {/* Now Playing Bar */}
      <div className="absolute bottom-20 left-4 right-4 bg-gray-800 rounded-lg p-3 flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-600 rounded overflow-hidden">
          <img src="/api/placeholder/48/48" alt="Now Playing" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">row - A COLORS ENCORE • FACESOUL</div>
          <div className="text-xs text-green-400 flex items-center gap-1">
            <span className="text-green-400">⦿</span> AirPlay
          </div>
        </div>
        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="4" width="4" height="16" />
          <rect x="12" y="4" width="4" height="16" />
        </svg>
        <div className="text-2xl">‖</div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-gray-800">
        <div className="flex justify-around items-center py-2">
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs mt-1">Home</span>
          </div>
          <div className="flex flex-col items-center text-gray-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <span className="text-xs mt-1">Search</span>
          </div>
          <div className="flex flex-col items-center text-gray-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
            </svg>
            <span className="text-xs mt-1">Your Library</span>
          </div>
          <div className="flex flex-col items-center text-gray-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span className="text-xs mt-1">Create</span>
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyCoursesUI; 