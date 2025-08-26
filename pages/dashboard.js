import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Dashboard(){



    const router = useRouter();

useEffect(() => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    if(!user){
     router.push('/');
    }
},[])

const handleClick = () => {
    sessionStorage.removeItem('user');
    router.push('/')
}
    return (
        <>
   <header class="header">
        <nav class="nav-container">
            <a href="#" class="logo">GooGooReads</a>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="#" class="nav-link active">
                        <span class="nav-icon">🏠</span>
                        <span>Home</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showNotification('📚 Opening your library...', 'books')">
                        <span class="nav-icon">📚</span>
                        <span>Books</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showNotification('🎮 Loading fun games...', 'games')">
                        <span class="nav-icon">🎮</span>
                        <span>Games</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showNotification('📊 Checking your progress...', 'progress')">
                        <span class="nav-icon">📊</span>
                        <span>Progress</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showNotification('👨‍👩‍👧 Opening Parent Zone...', 'parent')">
                        <span class="nav-icon">👨‍👩‍👧</span>
                        <span>Parent Zone</span>
                    </a>
                </li>
            </ul>
            <div class="user-profile">
                <span class="subscription-badge">Starter</span>
                <div class="profile-avatar">👧</div>
            </div>
        </nav>
    </header>

    <main class="main-content">
        <div class="learning-section">
            
            <div class="welcome-section fade-in">
                <div class="welcome-content">
                    <div class="welcome-text">
                        <h2>Hello, Emma! 👋</h2>
                        <p>Ready for another amazing reading adventure today?</p>
                        <div class="streak-info">
                            <span>🔥</span>
                            <span>7-day reading streak!</span>
                        </div>
                    </div>
                </div>
            </div>

            
            <div class="recommendation-card fade-in">
                <div class="recommendation-header">
                    <h3 class="recommendation-title">📅 Today&apos;s Recommendation</h3>
                    <span class="recommendation-time">⏰ 15 min</span>
                </div>
                <div class="recommendation-content">
                    <div class="recommendation-icon">✏️</div>
                    <div class="recommendation-details">
                        <h3>Read & Trace Letter A</h3>
                        <p>Practice writing the letter A while reading fun words that start with A! Perfect for building letter recognition and handwriting skills.</p>
                        <button class="start-button" onclick="startActivity('trace-a')">
                            <span>Start Learning</span>
                            <span>▶️</span>
                        </button>
                    </div>
                </div>
            </div>

            
            <div class="path-card english-path fade-in">
                <div class="path-header">
                    <div class="path-icon">📖</div>
                    <div class="path-info">
                        <h3>English Reading Path</h3>
                        <p class="path-progress">6 of 12 activities completed</p>
                    </div>
                </div>
                <div class="activities-grid">
                    <div class="activity-item completed" onclick="startActivity('trace-letters')">
                        <span class="activity-icon">✏️</span>
                        <div class="activity-name">Trace Letters</div>
                    </div>
                    <div class="activity-item completed" onclick="startActivity('sight-words')">
                        <span class="activity-icon">👀</span>
                        <div class="activity-name">Sight Words</div>
                    </div>
                    <div class="activity-item" onclick="startActivity('phonics')">
                        <span class="activity-icon">🔤</span>
                        <div class="activity-name">Phonics Stories</div>
                    </div>
                    <div class="activity-item" onclick="startActivity('reading-comp')">
                        <span class="activity-icon">📚</span>
                        <div class="activity-name">Reading Comprehension</div>
                    </div>
                </div>
            </div>

            
            <div class="path-card creativity-path fade-in">
                <div class="path-header">
                    <div class="path-icon">🎨</div>
                    <div class="path-info">
                        <h3>Creativity & Fun</h3>
                        <p class="path-progress">3 of 8 activities completed</p>
                    </div>
                </div>
                <div class="activities-grid">
                    <div class="activity-item completed" onclick="startActivity('rhymes')">
                        <span class="activity-icon">🎵</span>
                        <div class="activity-name">Rhymes</div>
                    </div>
                    <div class="activity-item" onclick="startActivity('songs')">
                        <span class="activity-icon">🎤</span>
                        <div class="activity-name">Songs</div>
                    </div>
                    <div class="activity-item" onclick="startActivity('storytelling')">
                        <span class="activity-icon">📖</span>
                        <div class="activity-name">Storytelling</div>
                    </div>
                    <div class="activity-item" onclick="startActivity('drawing')">
                        <span class="activity-icon">🖍️</span>
                        <div class="activity-name">Drawing with Words</div>
                    </div>
                </div>
            </div>
        </div>

        
        <aside class="sidebar">
            
            <div class="character-assistant fade-in">
                <div class="character-avatar" id="characterAvatar">🐻</div>
                <div class="character-speech" id="characterSpeech">
                    <p class="speech-text" id="speechText">Let&apos;s start learning! Click on any activity to begin your adventure!</p>
                </div>
                <div class="character-actions">
                    <button class="character-btn" onclick="changeCharacterMood('excited')">🎉</button>
                    <button class="character-btn" onclick="changeCharacterMood('sleepy')">😴</button>
                    <button class="character-btn" onclick="changeCharacterMood('thinking')">🤔</button>
                </div>
            </div>

            
            <div class="progress-card fade-in">
                <div class="progress-header">
                    <span>📊</span>
                    <h3 class="progress-title">Your Progress</h3>
                </div>
                <div class="stats-grid">
                    <div class="stat-item books-progress">
                        <span class="stat-label">Books Read</span>
                        <span class="stat-value">15/20</span>
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                    </div>
                    <div class="stat-item games-progress">
                        <span class="stat-label">Games Played</span>
                        <span class="stat-value">12/20</span>
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                    </div>
                    <div class="stat-item streak-progress">
                        <span class="stat-label">Reading Streak</span>
                        <span class="stat-value">7 days</span>
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                    </div>
                </div>
            </div>
            </aside>
            </main>

        
    
    <footer class="footer" id="contact">
        <div class="footer-content">
            <div class="footer-section">
                <h3>For Parents</h3>
                <p>GooGooReads is designed with your child&apos;s safety and learning in mind. All content is age-appropriate and educational.</p>
                <ul>
                    <li><a href="#">Safety & Privacy</a></li>
                    <li><a href="#">Learning Benefits</a></li>
                    <li><a href="#">Parent Dashboard</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Contact Us</h3>
                <p>Have questions? We&apos;d love to hear from you!</p>
                <ul>
                    <li><a href="mailto:hello@googooreads.com">hello@googooreads.com</a></li>
                    <li><a href="tel:+1234567890">📞 (123) 456-7890</a></li>
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
    )
}