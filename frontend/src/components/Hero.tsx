import React from "react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">
          Share Your Stories with the <span className="accent">World</span>
        </h1>

        <p className="hero-sub">
          Create, publish, and engage with readers on our modern blogging platform. Built for writers who want to focus on what matters most — their content.
        </p>

        <div className="hero-ctas">
          <a className="btn-primary large" href="#get-started">Start Writing Today →</a>
          <a className="btn-ghost" href="#learn-more">Learn More</a>
        </div>
      </div>
    </section>
  );
}
