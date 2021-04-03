import React from 'react';

import { NavLink, useHistory } from 'react-router-dom';

import footerBg from '../../../assets/image/footer-bg.jpg';

import './Footer.css';

export default function Footer() {
  const history = useHistory();

  const scrollToTopHomePage = () => {
    history.push('/');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='footer-container '>
      <div
        className='footer-background'
        style={{ backgroundImage: `url(${footerBg})` }}>
        <h1 className='footer-title'>
          Phim chất lượng cao online của{' '}
          <span onClick={scrollToTopHomePage}>XemPhim</span> khác gì so với các
          trang phim khác?
        </h1>
        <ul className='footer-content'>
          <li>
            Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD
            (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân
            giải HD (720p) là cao nhất
          </li>
          <li>
            Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần
            phim online thông thường - đây là yếu tố quyết định độ nét của phim
            (thậm chí còn quan trọng hơn độ phân giải)
          </li>
          <li>
            Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang
            phim khác (kể cả Youtube)
          </li>
          <li>
            Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải
            cao
          </li>
          <li>
            Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề
            của riêng mình để xem online
          </li>
          <li>
            Có lựa chọn hiện phụ đề song ngữ (tức hiện đồng thời cả tiếng Anh &
            tiếng Việt), phù hợp với những người muốn học tiếng Anh qua phụ đề
            phim
          </li>
        </ul>
      </div>
    </div>
  );
}
