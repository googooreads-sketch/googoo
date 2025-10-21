import "@/styles/Home.module.css";
import { Button } from 'antd';
import { useRouter } from "next/router";


export default function Home() {
    const router = useRouter();

    const handleSignUp = () => {
     router.push('/signup');
    }
  return (
    <>
   
    <div class="floating-stars" id="stars"></div>

    <header class="header">
        <nav class="nav-container">
             <a href="#" class="logo" onClick={() => router.push('/')}>GooGooReads</a>
            <ul class="nav-menu">
                <li class="nav-item"><a href="#home">Home</a></li>
                <li class="nav-item"><a href="#story">Stories</a></li>
                <li class="nav-item"><a href="#bedtime">Bedtime</a></li>
                <li class="nav-item"><a href="#games">Blog</a></li>
                <li class="nav-item"><a href="#profile">Profile</a></li>
                <li class="nav-item"><a href="#contact">Contact</a></li>
                <li class="nav-item"><Button type="primary" onClick={()=> handleSignUp()}>Get Started</Button></li>
            </ul>
        </nav>
    </header>

    
    <section class="hero" id="home">
        <div class="hero-content">
            <div class="hero-text">
                <h1>Welcome to <span class="highlight">Reading Adventures</span></h1>
                <p>Where little minds discover big stories! Interactive tales, fun games, and magical bedtime stories await your curious explorer.</p>
                <a href="#story" class="cta-button">Start Reading Adventure</a>
            </div>
            <div class="hero-mascot">
                <div class="mascot"></div>
            </div>
        </div>
    </section>

   
    <section class="start-reading-banner">
        <div class="banner-content">
            <div class="duck-mascot">🐥📖</div>
            <div class="banner-text">
                <h2>Ready for an Adventure?</h2>
                <p>Pick your favorite story and let&#39;s start reading together!</p>
            </div>
            <button class="start-reading-btn">START READING</button>
        </div>
    </section>

    
    <section class="choose-book-section" id="story">
        <div class="choose-book-container">
            <h2 class="choose-title">Choose a Book</h2>
            <div class="book-selection-grid">
                <div class="book-card" onclick="openStory('waters')">
                    <div class="book-cover waters-cover">
                        <div class="book-illustration">🏄‍♀️</div>
                        <div class="book-title">The Girl Tested Waters</div>
                    </div>
                    <button class="book-read-btn">READ NOW</button>
                </div>
                <div class="book-card" onclick="openStory('bunny')">
                    <div class="book-cover bunny-cover">
                        <div class="book-illustration">🐰</div>
                        <div class="book-title">The Brave Little Bunny</div>
                    </div>
                    <button class="book-read-btn">READ NOW</button>
                </div>
                <div class="book-card" onclick="openStory('superhero')">
                    <div class="book-cover superhero-cover">
                        <div class="book-illustration">🦸‍♂️</div>
                        <div class="book-title">The Superhero&#39;s Day</div>
                    </div>
                    <button class="book-read-btn">READ NOW</button>
                </div>
            </div>
        </div>
    </section>


    <section class="interactive-section">
        <div class="interactive-container">
            <div class="story-puzzle-grid">
                <div class="story-section">
                    <h3>Story</h3>
                    <div class="story-display">
                        <div class="story-character">🏄‍♀️</div>
                        <div class="story-text">
                            <p>Maya loved the ocean but was scared to try surfing. Today, she decided to be brave and test the waters for the first time!</p>
                        </div>
                    </div>
                    <div class="story-progress">
                        <div class="progress-line"></div>
                    </div>
                </div>
                <div class="puzzle-section">
                    <h3>Puzzle</h3>
                    <div class="puzzle-game">
                        <div class="puzzle-pieces">
                            <div class="puzzle-piece piece-1">🐠</div>
                            <div class="puzzle-piece piece-2">🌊</div>
                            <div class="puzzle-piece piece-3">🏄‍♀️</div>
                            <div class="puzzle-piece piece-4">☀️</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

  
    <section class="share-report-section">
        <div class="share-report-container">
            <div class="share-thoughts">
                <h3>Share Thoughts</h3>
                <div class="thoughts-card">
                    <div class="thoughts-icon">💭</div>
                    <p>Tell us what you learned from this story!</p>
                    <textarea placeholder="I learned that being brave means..." class="thoughts-input"></textarea>
                    <button class="share-btn">Share My Thoughts ✨</button>
                </div>
            </div>
            <div class="report-section">
                <h3>Report</h3>
                <div class="report-card">
                    <div class="report-icon">📊</div>
                    <div class="report-stats">
                        <div class="stat">
                            <span class="stat-number">5</span>
                            <span class="stat-label">Stories Read</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">12</span>
                            <span class="stat-label">Puzzles Solved</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">8</span>
                            <span class="stat-label">Thoughts Shared</span>
                        </div>
                    </div>
                    <button class="download-report-btn">Download Report 📄</button>
                </div>
            </div>
        </div>
    </section>

   
    <section class="games-teaser" id="games">
        <div class="games-content">
            <div class="games-text">
                <h2>🧩 Play & Learn Games</h2>
                <p>Solve puzzles, play matching games, and win awesome badges! Every game helps you learn while having tons of fun.</p>
                <a href="#games" class="games-button">Play Games & Win Stars ⭐</a>
            </div>
            <div class="puzzle-illustration">🧩</div>
        </div>
    </section>

   
    <section class="bedtime-section" id="bedtime">
        <div class="bedtime-content">
            <div class="bedtime-illustration">🌙👨‍👩‍👧‍👦📖</div>
            <div class="bedtime-text">
                <h2>🌟 Bedtime Stories</h2>
                <p>Cozy up with gentle tales perfect for bedtime. Parents can read along or let our calm narrator guide your little one to dreamland.</p>
                <a href="#bedtime" class="bedtime-button">Explore Bedtime Stories 😴</a>
            </div>
        </div>
    </section>


    <section class="progress-section" id="progress">
        <div class="progress-content">
            <h2 class="progress-title">🏆 Your Reading Journey</h2>
            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
            <p class="progress-text">Great job! You&#39;ve completed 13 out of 20 stories. Keep going to unlock more badges!</p>
            <div class="badges-container">
                <div class="badge" title="First Story Badge">🏅</div>
                <div class="badge" title="Reading Streak Badge">📚</div>
                <div class="badge" title="Game Master Badge">🎮</div>
                <div class="badge" title="Bedtime Hero Badge">🌙</div>
            </div>
        </div>
    </section>


    <footer class="footer" id="contact">
        <div class="footer-content">
            <div class="footer-section">
                <h3>For Parents</h3>
                <p>GooGooReads is designed with your child&#39;s safety and learning in mind. All content is age-appropriate and educational.</p>
                <ul>
                    <li><a href="#">Safety & Privacy</a></li>
                    <li><a href="#">Learning Benefits</a></li>
                    <li><a href="#">Parent Dashboard</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Contact Us</h3>
                <p>Have questions? We&#39;s love to hear from you!</p>
                <ul>
                    <li><a href="mailto:googooreads@gmail.com">googooreads@gmail.com</a></li>
                    <li><a href="#">💬 Live Chat Support</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Features</h3>
                <ul>
                    <li><a href="#story">Interactive Stories</a></li>
                    <li><a href="#games">Educational Games</a></li>
                    <li><a href="#bedtime">Bedtime Stories</a></li>
                    <li><a href="#profile">Progress Tracking</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 GooGooReads. Making reading magical for little ones! ✨</p>
        </div>
    </footer>

    </>
  );
}

