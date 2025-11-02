import React from "react";

const Feature = ({ icon, title, text }) => (
  <div className="feature">
    <div className="feature-icon" aria-hidden dangerouslySetInnerHTML={{ __html: icon }} />
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

export default function Features() {
  const features = [
    {
      title: "Rich Editor",
      text: "Write with our intuitive editor that supports formatting, images, and more.",
      icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#EEF2FF"/><path d="M7 17l6-5 4 3" stroke="#6C63FF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
      title: "Engage Readers",
      text: "Build community with comments and discussions on your posts.",
      icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#ECFDF5"/><path d="M12 8v5" stroke="#10B981" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11h6" stroke="#10B981" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
      title: "Grow Audience",
      text: "Connect with readers and build your following with our social features.",
      icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#FFF0F6"/><path d="M8 12c0-1.5 1.5-3 4-3s4 1.5 4 3" stroke="#A78BFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 14v4" stroke="#A78BFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    }
  ];

  return (
    <section id="features" className="features">
      <div className="features-inner">
        <h2 className="section-title">Everything You Need to Blog</h2>
        <p className="section-sub">Powerful features designed to help you create, share, and grow your audience.</p>

        <div className="features-grid">
          {features.map((f, i) => (
            <Feature key={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
