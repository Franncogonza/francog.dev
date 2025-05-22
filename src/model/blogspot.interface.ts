export interface BlogPost {
  id: string;
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
  emoji?: string;
  content: string;
}
