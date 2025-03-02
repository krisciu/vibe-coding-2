import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// List of example image URLs for the advice
const ADVICE_IMAGES = [
  "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45d7?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1579389083395-f9c1b67f3b83?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1610614819513-58e34989848b?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1543269664-7eef42226a21?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=500&auto=format"
];

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { problem } = await request.json();

    if (!problem || problem.trim() === '') {
      return NextResponse.json(
        { error: 'Please provide a problem' },
        { status: 400 }
      );
    }

    // Generate a prompt for terrible advice that sounds like professional wisdom
    const prompt = `
You are a designer of absurd and satirical life advice that's presented as if it's legitimate wisdom.

Generate a HILARIOUS and TERRIBLE life advice tip for the following problem: "${problem}".

The advice should have these qualities:
- Sound professional and authoritative at first glance
- Be completely impractical, ineffective, or even harmful when actually considered
- Include made-up statistics or pseudo-scientific language to sound convincing
- Be genuinely funny and entertaining in its absurdity
- Have the tone of sincere self-help advice from a "qualified expert"

Return your response as a JSON object with the following format:
{
  "advice": "The absurd advice text (1-3 sentences)",
  "expert": "A made-up expert name and ridiculous title/credential that sounds impressive but is clearly satirical"
}

Examples of the tone I'm looking for:
- "Save 90% on dental costs by using sandpaper instead of toothbrushes! Dentists don't want you to know this secret technique."
- "Set 17 alarm clocks scattered throughout your home. The morning treasure hunt to find and disable each one will boost alertness by 347%."
- "Speak exclusively in rhyming couplets during presentations. Research shows audiences are 74% more likely to agree with statements that rhyme."

Be creative and make it genuinely funny!
`;

    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates humorous but terrible advice disguised as professional wisdom. Return your responses as plain JSON without any markdown formatting or code blocks.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 600,
      response_format: { type: "json_object" }
    });

    // Extract and parse the generated content
    const content = response.choices[0].message.content;
    let parsedContent;
    
    try {
      // Strip any markdown code block formatting before parsing
      let cleanContent = content?.trim() || '';
      
      // Log the raw content for debugging
      console.log('Raw OpenAI response:', cleanContent);
      
      // Try various methods to extract JSON
      
      // Method 1: Check if content is already valid JSON
      try {
        parsedContent = JSON.parse(cleanContent);
      } catch {
        // Method 2: Remove markdown code block if present (```json ... ```)
        if (cleanContent.includes('```')) {
          // Extract content between code block markers
          const match = cleanContent.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
          if (match && match[1]) {
            cleanContent = match[1].trim();
            console.log('Extracted content from code block:', cleanContent);
            try {
              parsedContent = JSON.parse(cleanContent);
            } catch {
              throw new Error('Failed to parse content extracted from code block');
            }
          } else {
            throw new Error('Failed to extract content from markdown code block');
          }
        } else {
          throw new Error('Content is not valid JSON and not in a markdown code block');
        }
      }
      
      // Validate that we have the expected fields
      if (!parsedContent || !parsedContent.advice || !parsedContent.expert) {
        throw new Error('Response is missing required fields');
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      console.error('Original content:', content);
      
      // Fallback: try to extract JSON using regex as a last resort
      try {
        const jsonMatch = content?.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonStr = jsonMatch[0];
          parsedContent = JSON.parse(jsonStr);
          console.log('Extracted JSON using regex:', parsedContent);
        } else {
          throw new Error('No JSON-like content found');
        }
      } catch {
        return NextResponse.json(
          { error: 'Failed to generate advice - could not parse response' },
          { status: 500 }
        );
      }
    }

    // Get a random image from our collection
    const randomImage = ADVICE_IMAGES[Math.floor(Math.random() * ADVICE_IMAGES.length)];

    // Return the response
    return NextResponse.json({
      problem,
      advice: parsedContent.advice,
      expert: parsedContent.expert,
      image: randomImage
    });
  } catch (error) {
    console.error('Error generating advice:', error);
    return NextResponse.json(
      { error: 'Failed to generate advice' },
      { status: 500 }
    );
  }
} 