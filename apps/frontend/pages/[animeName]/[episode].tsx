import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './[episode].module.css';

interface Anime {
  title: string;
  productionYear: number;
  countOfEpisodes: number;
  description: string;
}

interface Video {
  url: string;
  episodeNumber: number;
  anime: string;
}

export default function AnimePage({
  title,
  description,
  episodes,
  currentEpisode,
}: Anime & { episodes: Video[]; currentEpisode: number }): JSX.Element {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.animeInfo}>
          <h2 className={styles.heading}>{title}</h2>
          <p>{description}</p>
        </div>
        <div className={styles.video}>
          <video controls>
            <source src={episodes[currentEpisode - 1].url} type="video/mp4" />
          </video>
        </div>
        <div className={styles.episodes}>
          {episodes.map(({ episodeNumber }) => (
            <a
              key={episodeNumber}
              className={styles.episodeButton}
              href={router.asPath.slice(0, -1) + episodeNumber}
            >
              {episodeNumber} episode
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(
  ctx: GetStaticPropsContext
): Promise<
  GetStaticPropsResult<Anime & { episodes: Video[]; currentEpisode: number }>
> {
  const animeInfo: Anime = await (
    await fetch(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/anime/getAnime/${ctx.params?.animeName}`
    )
  ).json();

  const episodes: Video[] = await (
    await fetch(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/video/getEpisodesList/${ctx.params?.animeName}`
    )
  ).json();

  return {
    props: {
      title: animeInfo.title,
      productionYear: animeInfo.productionYear,
      description: animeInfo.description,
      countOfEpisodes: animeInfo.countOfEpisodes,
      episodes,
      currentEpisode: +ctx.params.episode,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const animeList = await (
    await fetch(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/api/anime/getAnimeList`
    )
  ).json();

  const countOfEpisodesAsync: Array<
    Promise<{ animeName: string; countOfEpisodes: number }>
  > = animeList.map(async (animeName: string) => {
    const episodes: Video[] = await (
      await fetch(
        `http://${process.env.API_HOST}:${process.env.API_PORT}/api/video/getEpisodesList/${animeName}`
      )
    ).json();

    return { animeName, countOfEpisodes: episodes.length };
  });

  const countOfEpisodes = await Promise.all(countOfEpisodesAsync);

  const result = countOfEpisodes.map((info) => {
    const arr = Array(info.countOfEpisodes);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = 0;
    }
    return arr.map((val, index) => ({
      params: { animeName: info.animeName, episode: String(index + 1) },
    }));
  });

  return {
    paths: result.flat(),
    fallback: false,
  };
}
