import { supabase } from './supabase';
import { Movie } from '@/types/movie';

export async function getMovie(id: string): Promise<Movie | null> {
  const { data: movie } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();
  return movie;
}

export async function getSimilarMovies(movie: Movie): Promise<Movie[]> {
  const { data: movies } = await supabase
    .from("movies")
    .select("*")
    .contains("genres", [movie.genres[0]])
    .neq("id", movie.id)
    .order("vote_average", { ascending: false })
    .limit(4);
  return movies as Movie[] || [];
}