import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <main>
        <nav>
          <div className="title">Quizz Boxes <small>by Zenika</small></div>
        </nav>
        <h1>
          Quizz Boxes
          <br/>
          <small>All the implementation of an Quizz Web App we could think of</small>
        </h1>
        <section>
          <h2>The app</h2>
          <ul>
            <li>A welcome view</li>
            <li>A sequence of MCQ questions</li>
            <li>A result view</li>
          </ul>
          <h2>The implementation list</h2>
          <ul>
            {this.props.implems.map((implem, i) => (
              <li key={i}><a href={implem.title}>{implem.title}</a></li>
            ))}
          </ul>
        </section>
      </main>
    );
  }
}
