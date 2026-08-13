import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="nav-container">

          <a href="/" className="logo">
            <div className="logo-icon">
              AI
            </div>
            <span>Growth<span>Coach</span></span>
          </a>

          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#growth">Growth tracking</a>
          </div>

          <div className="nav-actions">
            <a href="/login" className="login-btn">
              Log in
            </a>

            <a href="/register" className="signup-btn">
              Get Started
            </a>
          </div>

        </div>
      </nav>


      {/* ================= HERO ================= */}
      <section className="hero">

        <div className="hero-container">

          <div className="hero-content">

            <div className="hero-badge">
              <span className="pulse"></span>
              AI-powered code coaching
            </div>

            <h1>
              Don't just write code.
              <span> Grow from it.</span>
            </h1>

            <p>
              AI Growth Coach combines peer code reviews with AI-powered
              feedback to help developers understand their mistakes,
              improve their skills, and track real progress over time.
            </p>

            <div className="hero-buttons">
              <a href="/register" className="primary-btn">
                Start Growing
                <span>→</span>
              </a>

              <a href="#how-it-works" className="secondary-btn">
                See how it works
              </a>
            </div>

            <div className="hero-note">
              <span>✓</span>
              Built for developers who want continuous improvement
            </div>

          </div>


          {/* CODE REVIEW PREVIEW */}
          <div className="hero-preview">

            <div className="window">

              <div className="window-header">

                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="window-title">
                  code-review.py
                </div>

                <div></div>

              </div>


              <div className="code-area">

                <div className="code-line">
                  <span className="line-number">01</span>
                  <span>
                    <span className="purple">def</span>{" "}
                    <span className="blue">calculate_average</span>(numbers):
                  </span>
                </div>

                <div className="code-line">
                  <span className="line-number">02</span>
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="purple">return</span>{" "}
                    <span className="orange">sum</span>(numbers) /{" "}
                    <span className="orange">len</span>(numbers)
                  </span>
                </div>

                <div className="code-line">
                  <span className="line-number">03</span>
                  <span></span>
                </div>

                <div className="code-line">
                  <span className="line-number">04</span>
                  <span>
                    result = calculate_average(data)
                  </span>
                </div>

                <div className="code-line">
                  <span className="line-number">05</span>
                  <span></span>
                </div>

              </div>


              <div className="ai-review">

                <div className="ai-header">
                  <div className="ai-icon">✦</div>

                  <div>
                    <strong>AI Growth Coach</strong>
                    <small>Code analysis completed</small>
                  </div>

                  <div className="score">
                    87%
                  </div>
                </div>


                <div className="feedback">

                  <div className="feedback-item positive">
                    <span>✓</span>
                    <div>
                      <strong>Good implementation</strong>
                      <p>Function is concise and readable.</p>
                    </div>
                  </div>

                  <div className="feedback-item warning">
                    <span>!</span>
                    <div>
                      <strong>Potential issue</strong>
                      <p>Consider handling an empty list.</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= STATS ================= */}
      <section className="stats-section">

        <div className="stats-container">

          <div className="stat">
            <h3>AI</h3>
            <p>Powered feedback</p>
          </div>

          <div className="stat">
            <h3>24/7</h3>
            <p>Continuous coaching</p>
          </div>

          <div className="stat">
            <h3>100%</h3>
            <p>Progress tracking</p>
          </div>

          <div className="stat">
            <h3>1 → ∞</h3>
            <p>Learning history</p>
          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="features-section" id="features">

        <div className="section-heading">

          <div className="section-badge">
            WHY AI GROWTH COACH
          </div>

          <h2>
            Your code tells a story.
            <br />
            <span>We help you improve it.</span>
          </h2>

          <p>
            Instead of treating every code submission as an isolated task,
            AI Growth Coach remembers your journey and identifies patterns
            in the way you code.
          </p>

        </div>


        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon purple-icon">
              ✦
            </div>

            <h3>AI Code Review</h3>

            <p>
              Get intelligent feedback on your code using AI. Understand
              not only what is wrong, but why it is wrong and how to improve.
            </p>

            <div className="feature-link">
              Intelligent feedback →
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-icon blue-icon">
              ↗
            </div>

            <h3>Peer Reviews</h3>

            <p>
              Share your code with teammates and receive human feedback.
              Learn from different perspectives and coding approaches.
            </p>

            <div className="feature-link">
              Learn together →
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-icon green-icon">
              ◉
            </div>

            <h3>Learning Memory</h3>

            <p>
              Your previous submissions are remembered so recurring mistakes
              can be detected across weeks and months.
            </p>

            <div className="feature-link">
              Track patterns →
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-icon orange-icon">
              ↗
            </div>

            <h3>Growth Reports</h3>

            <p>
              See your progress through monthly reports, statistics and
              visual charts that show how your coding skills are evolving.
            </p>

            <div className="feature-link">
              Measure growth →
            </div>

          </div>

        </div>

      </section>


      {/* ================= GROWTH ================= */}
      <section className="growth-section" id="growth">

        <div className="growth-container">

          <div className="growth-content">

            <div className="section-badge">
              BUILT AROUND YOUR JOURNEY
            </div>

            <h2>
              From individual
              <span> mistakes </span>
              to measurable growth.
            </h2>

            <p>
              Most code review tools tell you what is wrong today.
              AI Growth Coach goes one step further — it remembers what
              you struggled with yesterday.
            </p>

            <div className="growth-points">

              <div>
                <span>01</span>
                <div>
                  <strong>Identify recurring mistakes</strong>
                  <p>
                    Discover patterns across your code submissions.
                  </p>
                </div>
              </div>

              <div>
                <span>02</span>
                <div>
                  <strong>Measure improvement</strong>
                  <p>
                    Track whether your common mistakes are decreasing.
                  </p>
                </div>
              </div>

              <div>
                <span>03</span>
                <div>
                  <strong>Build better habits</strong>
                  <p>
                    Turn feedback into long-term coding improvement.
                  </p>
                </div>
              </div>

            </div>

          </div>


          {/* GRAPH CARD */}
          <div className="growth-card">

            <div className="growth-card-header">
              <div>
                <span>Monthly Growth</span>
                <h3>+32.8%</h3>
              </div>

              <div className="growth-select">
                Last 6 months ▾
              </div>
            </div>


            <div className="chart">

              <div className="chart-labels">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>

              <div className="chart-area">

                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>

                <svg
                  viewBox="0 0 500 200"
                  preserveAspectRatio="none"
                  className="growth-svg"
                >
                  <defs>
                    <linearGradient
                      id="growthGradient"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#7c3aed"
                        stopOpacity="0.3"
                      />

                      <stop
                        offset="100%"
                        stopColor="#7c3aed"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d="M0,160 C60,150 75,135 110,140 C150,145 160,105 200,115 C245,125 260,80 300,95 C340,110 355,55 390,65 C430,75 450,25 500,35 L500,200 L0,200 Z"
                    fill="url(#growthGradient)"
                  />

                  <path
                    d="M0,160 C60,150 75,135 110,140 C150,145 160,105 200,115 C245,125 260,80 300,95 C340,110 355,55 390,65 C430,75 450,25 500,35"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>

              </div>

            </div>


            <div className="months">
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="workflow-section" id="how-it-works">

        <div className="section-heading">

          <div className="section-badge">
            SIMPLE WORKFLOW
          </div>

          <h2>
            Review. Learn. <span>Grow.</span>
          </h2>

          <p>
            Everything you need to turn everyday coding practice into
            measurable improvement.
          </p>

        </div>


        <div className="workflow">

          <div className="workflow-item">

            <div className="workflow-number">
              01
            </div>

            <h3>Submit Code</h3>

            <p>
              Submit your coding solution through the platform.
            </p>

          </div>


          <div className="workflow-line"></div>


          <div className="workflow-item">

            <div className="workflow-number">
              02
            </div>

            <h3>Get Feedback</h3>

            <p>
              Receive feedback from both AI and your teammates.
            </p>

          </div>


          <div className="workflow-line"></div>


          <div className="workflow-item">

            <div className="workflow-number">
              03
            </div>

            <h3>Find Patterns</h3>

            <p>
              The system remembers recurring mistakes and weaknesses.
            </p>

          </div>


          <div className="workflow-line"></div>


          <div className="workflow-item">

            <div className="workflow-number">
              04
            </div>

            <h3>Track Growth</h3>

            <p>
              View reports and charts showing your improvement over time.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="cta-section">

        <div className="cta">

          <div className="cta-glow"></div>

          <div className="cta-content">

            <div className="section-badge">
              START YOUR JOURNEY
            </div>

            <h2>
              Your next level starts
              <span> with your next review.</span>
            </h2>

            <p>
              Stop collecting code reviews.
              Start turning them into real growth.
            </p>

            <a href="/register" className="cta-button">
              Create your free account
              <span>→</span>
            </a>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="footer-container">

          <div className="footer-brand">

            <div className="logo">
              <div className="logo-icon">
                AI
              </div>

              <span>
                Growth<span>Coach</span>
              </span>
            </div>

            <p>
              AI-powered peer code review and developer growth tracking.
            </p>

          </div>


          <div className="footer-links">

            <div>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <a href="#growth">Growth tracking</a>
            </div>

            <div>
              <h4>Account</h4>
              <a href="/login">Log in</a>
              <a href="/register">Create account</a>
            </div>

          </div>

        </div>


        <div className="footer-bottom">
          <span>© 2026 AI Growth Coach. All rights reserved.</span>

          <span>
            Built with AI • React • FastAPI
          </span>
        </div>

      </footer>

    </div>
  );
};

export default LandingPage;