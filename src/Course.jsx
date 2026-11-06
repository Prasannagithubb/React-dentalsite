const title = "Hello";

function Course() {
  return (
    <section style={{ padding: '32px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Courses available at our institute</h2>
      <div className="card-container">
        <div className="card">
          <h3>React JS</h3>
          <p>Build interactive user interfaces with React, the most popular JavaScript library.</p>
          <button>{title}</button>
        </div>
        <div className="card">
          <h3>Node.js</h3>
          <p>Develop fast and scalable server-side applications with Node.js and Express.</p>
          <button>Enroll Now</button>
        </div>
        <div className="card">
          <h3>Python</h3>
          <p>Master Python for data science, machine learning, and backend development.</p>
          <button>Enroll Now</button>
        </div>
      </div>
    </section>
  );
}

export default Course;