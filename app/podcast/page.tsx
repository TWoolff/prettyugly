import css from "./podcast.module.css"

const PodcastPage: React.FC = () => {
  return (
    <section className={`grid ${css.podcast}`}>
      <article>
        <h1>Podcast</h1>
      </article>
    </section>
  );
};

export default PodcastPage