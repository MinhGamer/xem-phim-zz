export const API_KEY = '838c50953b29e1152a488ae92467e67c';

export const API_USER = 'http://localhost:5000/xem-phim-zz/us-central1/api';

export const OAUTH_CLIENT_KEY =
  '353229742786-0jll5g1hb1jevj5egujquud7lsudelsf.apps.googleusercontent.com';

export const API_MOVIE = 'https://api.themoviedb.org/3';

export const API_MOVIE_IMAGE = 'https://image.tmdb.org/t/p/original';

export const MOVIES_PER_PAGE = 5;

export const MOVIES_PAGINATION_RANGE = 4;

export const GENRES_LIST = [
  { optionValue: '', optionLabel: 'Tất cả' },
  { optionValue: 'Action', optionLabel: 'Hành động' },
  { optionValue: 'Comedy', optionLabel: 'Hài' },
  { optionValue: 'Horror', optionLabel: 'Kinh dị' },
  { optionValue: 'Romance', optionLabel: 'Lãng mạn' },
  { optionValue: 'Drama', optionLabel: 'Chính kịch' },
  { optionValue: 'Science fiction', optionLabel: 'Khoa học viễn tưởng' },
  { optionValue: 'Documentary', optionLabel: 'Tài liệu' },
  { optionValue: 'Anime', optionLabel: 'Hoạt Hình' },
  { optionValue: 'Thriller', optionLabel: 'Giật gân' },
];

export const NATION_LIST = [
  { optionValue: '', optionLabel: 'Tất cả' },
  { optionValue: 'US', optionLabel: 'Mỹ' },
  { optionValue: 'Korea', optionLabel: 'Hàn Quốc' },
  { optionValue: 'England', optionLabel: 'Anh' },
  { optionValue: 'France', optionLabel: 'Pháp' },
  { optionValue: 'Canada', optionLabel: 'Canada' },
  { optionValue: 'China', optionLabel: 'Trung Quốc' },
  { optionValue: 'Japan', optionLabel: 'Nhật Bản' },
  { optionValue: 'Vietnam', optionLabel: 'Việt Nam' },
];

export const LOCAL_STORAGE_KEY = 'xem-phim-zz';

//name: to show on the select in the filter movies
//id: to send to movies db
export const GENRES_LIST_VN = [
  {
    id: 28,
    name: 'Hành Động',
  },
  {
    id: 12,
    name: 'Phiêu Lưu',
  },
  {
    id: 16,
    name: 'Hoạt Hình',
  },
  {
    id: 35,
    name: 'Hài',
  },
  {
    id: 80,
    name: 'Hình Sự',
  },
  {
    id: 99,
    name: 'Tài Liệu',
  },
  {
    id: 18,
    name: 'Chính Kịch',
  },
  {
    id: 10751,
    name: 'Gia Đình',
  },
  {
    id: 14,
    name: 'Giả Tượng',
  },
  {
    id: 36,
    name: 'Lịch Sử',
  },
  {
    id: 27,
    name: 'Kinh Dị',
  },
  {
    id: 10402,
    name: 'Nhạc',
  },
  {
    id: 9648,
    name: 'Bí Ẩn',
  },
  {
    id: 10749,
    name: 'Lãng Mạn',
  },
  {
    id: 878,
    name: 'Khoa Học Viễn Tưởng',
  },
  {
    id: 10770,
    name: 'Chương Trình Truyền Hình',
  },
  {
    id: 53,
    name: 'Gây Cấn',
  },
  {
    id: 10752,
    name: 'Chiến Tranh',
  },
  {
    id: 37,
    name: 'Miền Tây',
  },
];

export const LANGUAGE_LIST_VN = [
  {
    id: 'ja',
    name: 'Nhật',
  },
  {
    id: 'vi',
    name: 'Việt Nam',
  },
  {
    id: 'fr',
    name: 'Pháp',
  },
  {
    id: 'ko',
    name: 'Hàn Quốc',
  },
  {
    id: 'ru',
    name: 'Nga',
  },
  {
    id: 'en',
    name: 'Mỹ',
  },
  {
    id: 'CN',
    name: 'Trung Quốc',
  },
  {
    id: 'nl',
    name: 'Hà Lan',
  },
  {
    id: 'pt',
    name: 'Bồ Đào Nha',
  },
  {
    id: 'es',
    name: 'Tây Ban Nha',
  },
  {
    id: 'in',
    name: 'Ấn Độ',
  },
  {
    id: 'ml',
    name: 'Malaysia',
  },
  {
    id: 'th',
    name: 'Thái Lan',
  },
  {
    id: 'de',
    name: 'Đức',
  },
  {
    id: 'it',
    name: 'Ý',
  },
  {
    id: 'sv',
    name: 'Thụy Điển',
  },
  {
    id: 'cs',
    name: 'Cộng Hòa Czech',
  },
];

const genrateYear = () => {
  let years = [];
  for (let y = 2021; y >= 2011; y--) {
    years.push({ id: y.toString(), name: y.toString() });
  }
  return years;
};

export const RELEASE_YEAR = genrateYear();

export const LENGTH = [
  {
    id: {
      max: 60,
    },
    name: 'Dưới 1 tiếng',
  },
  {
    id: {
      min: 60,
      max: 90,
    },
    name: '1 - 1.5 tiếng',
  },
  {
    id: {
      min: 90,
      max: 120,
    },
    name: '1.5 - 2 tiếng',
  },
  {
    id: {
      min: 120,
      max: 150,
    },
    name: '2 - 2.5 tiếng',
  },
  {
    id: {
      min: '150',
    },
    name: 'Trên 2.5 tiếng',
  },
];

export const SORT = [
  {
    id: 'popularity',
    name: 'Phổ biến',
  },
  {
    id: 'vote_count',
    name: 'Đánh giá',
  },
  {
    id: 'revenue',
    name: 'Doanh thu',
  },
];
