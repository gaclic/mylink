export interface Link {
  id: string;
  title: string;
  url: string;
}

export const dummyLinks: Link[] = [
  {
    id: '1',
    title: 'Instagram',
    url: 'https://instagram.com/',
  },
  {
    id: '2',
    title: 'YouTube',
    url: 'https://youtube.com/',
  },
  {
    id: '3',
    title: '블로그',
    url: 'https://blog.naver.com/',
  },
  {
    id: '4',
    title: 'GitHub',
    url: 'https://github.com/',
  },
  {
    id: '5',
    title: '포트폴리오',
    url: 'https://portfolio.com/',
  },
];
