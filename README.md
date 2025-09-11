# Clear Truth: AI-Powered Content Verification

**Clear Truth** ek AI-powered web application hai jo users ko text, URLs, ya documents ki credibility (vishvasniyata) ko verify karne mein madad karta hai. Aaj ke digital world mein jahan misinformation tezi se failti hai, Clear Truth ek zaroori tool hai jo content ki sachai aur bharosa ko parakhne mein sahayata karta hai.

---

## 🚀 Inspiration (Prerna)

Digital content ke badhte hue samudra mein, sach aur jhooth ke beech antar karna mushkil ho gaya hai. Fake news, propaganda, aur galat jaankari (misinformation) tezi se failti hai, jisse समाज (society) aur individuals par galat prabhav padta hai. Is problem ko solve karne ke liye, humne "Clear Truth" banaya—ek A.I. tool jo content ki credibility ko analyze karke user ko aasaan aur samajhne laayak score aur explanation deta hai.

## ✨ What it does (Yeh Kya Karta Hai)

Clear Truth users ko content verify karne ke liye teen aasaan tarike deta hai:

1.  **Paste Text**: User kisi bhi text ko સીધા (directly) paste karke analyze kar sakte hain.
2.  **Enter URL**: Kisi bhi website ya article ki credibility check karne ke liye uska URL enter karein.
3.  **Upload File**: Document, image, ya kisi bhi file ko upload karke uski jaanch karein.

Analysis ke baad, Clear Truth ek credibility score (0-100) deta hai, jise aasaan visual icons ke saath represent kiya jaata hai:
*   ✔️ **High Credibility (Green Tick)**: Content vishvasniya hai.
*   ⚠️ **Medium Credibility (Yellow Warning)**: Content mein kuch issues ho sakte hain.
*   ❌ **Low Credibility (Red Cross)**: Content par bharosa nahi kiya jaa sakta.

Har analysis ke saath ek detailed explanation bhi milta hai, jismein AI batata hai ki score kyun diya gaya, aur sahi sources ke hyperlinks bhi provide karta hai.

## 🛠️ How we built it (Humne Ise Kaise Banaya)

Is project ko modern web technologies aur cutting-edge AI ka istemal karke banaya gaya hai.

*   **Frontend**:
    *   **Next.js**: Ek React framework jo server-side rendering aur behtareen performance provide karta hai.
    *   **React**: User interface banane ke liye.
    *   **TypeScript**: Code quality aur maintainability ke liye.
    *   **Tailwind CSS & ShadCN UI**: Ek modern aur responsive design ke liye.

*   **Backend & AI**:
    *   **Genkit (by Firebase)**: Hamare AI logic ke liye yeh core framework hai. Isse hum AI models ko aasani se integrate aur manage kar paate hain.
    *   **Google's Gemini Model**: Content ko analyze karne, credibility score assign karne, aur detailed explanation generate karne ke liye istemal kiya gaya hai.
    *   **Next.js Server Actions**: Frontend aur backend (AI flows) ke beech communication ke liye.

*   **Deployment**:
    *   **Firebase App Hosting**: Application ko host karne ke liye.

## 🤯 Challenges we ran into (Chunautiyan)

*   **AI Prompt Engineering**: AI se consistent aur accurate credibility score aur explanation nikalwana ek challenge tha. Humein prompt ko kai baar refine karna pada taaki AI hamare use case ko aache se samajh sake.
*   **Handling Various Inputs**: Text, URL, aur file (jismein images, PDFs, etc. ho sakte hain) ko handle karna aur unhe AI model ke liye process karna complex tha. Data URI ka sahi istemal karke humne isse solve kiya.
*   **Real-time Feedback**: User ko analysis ke dauran loading state aur errors ko aache se dikhana zaroori tha. Humne iske liye aacha state management implement kiya.

## 🏆 Accomplishments that we're proud of (Uplabdhiyan)

*   **Intuitive UI**: Humne ek saaf, aasaan, aur responsive user interface banaya hai jise koi bhi aasani se istemal kar sakta hai.
*   **Powerful AI Integration**: Gemini model ko Genkit ke through integrate karke humne ek powerful credibility engine banaya hai.
*   **Comprehensive Feedback**: Sirf score nahi, balki ek detailed explanation aur hyperlinked sources provide karke hum user ko content ke baare mein poori jaankari dete hain.

## 📚 What we learned (Seekh)

Is project se humne AI-powered applications banane ke baare mein bahut kuch seekha. Khaaskar, Genkit ka istemal karke AI flows ko structure karna aur Zod schemas ke through input/output ko validate karna ek behtareen experience tha. Humne yeh bhi seekha ki prompt engineering kitni zaroori hai ek reliable AI system banane ke liye.

## ⏭️ What's next for Clear Truth (Aage Kya?)

*   **Browser Extension**: Ek browser extension banana jo users ko kisi bhi web page par content ko on-the-spot verify karne de.
*   **Deeper Analysis**: Social media posts aur videos ko analyze karne ki kshamata add karna.
*   **Historical Analysis**: User ko unke past analyses ki history dekhne ki suvidha dena.

## 🚀 How to Run Locally (Local Machine Par Kaise Chalayein)

1.  **Clone the repository**:
    ```bash
    git clone [your-repo-url]
    cd [your-repo-name]
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    `.env` file banayein aur usmein apna Gemini API key add karein:
    ```
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:9002](http://localhost:9002) in your browser to see the result.
