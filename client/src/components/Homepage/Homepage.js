import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Homepage = () => {
  const homeLayout = () => (
    <div
      className="homeimg"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1550565118-3a14e8d0386f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=800)',
      }}
    >
      <div class="HomeContainer">
        <div class="heading-content" style={{ flex: 0.5 }}>
          <h2>Personal Budget</h2>
          <p>
            Wondering where your money was spent ? Login here and get track of
            your budget and expenses !!!!!
          </p>
          <Link to="/login" class="btn-2">
            LET'S GO <i class="fa fa-chevron-right"></i>
          </Link>
        </div>
        <main style={{ flex: 1 }}>
          <section className="articleSection">
            <article className="article">
              <h1>Stay on track</h1>
              <p>
                Do you know where you are spending your money? If you really
                stop to track it down, you would get surprised! Proper budget
                management depends on real data... and this app will help you
                with that!
              </p>
            </article>

            <article className="article">
              <h1>Alerts</h1>
              <p>
                What if your clothing budget ended? You will get an alert. The
                goal is to never go over the budget.
              </p>
            </article>

            <article className="article">
              <h1>Results</h1>
              <p>
                People who stick to a financial plan, budgeting every expense,
                get out of debt faster! Also, they to live happier lives...
                since they expend without guilt or fear... because they know it
                is all good and accounted for.
              </p>
            </article>

            <article className="article">
              <h1>Free</h1>
              <p>
                This app is free!!! And you are the only one holding your data!
              </p>
            </article>

            <article className="article">
              <h1>Stay on track</h1>
              <p>
                Do you know where you are spending your money? If you really
                stop to track it down, you would get surprised! Proper budget
                management depends on real data... and this app will help you
                with that!
              </p>
            </article>

            <article className="article">
              <h1>Alerts</h1>
              <p>
                What if your clothing budget ended? You will get an alert. The
                goal is to never go over the budget.
              </p>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
  return <>{homeLayout()}</>;
};

export default Homepage;
