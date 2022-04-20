import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Title,
  SwiperImage,
  SwiperMovieTitleContainer,
  SwiperMovieTitle,
  SwiperSlideContainer,
} from "./Carousel.styled";
import { DefaultTheme, useTheme } from "styled-components";
import { MovieState } from "../../../Pages/Home";
import { ThemeType } from "../../../App";

// Import Swiper styles
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SwiperProps } from "swiper/react";

import SwiperCore, { Lazy, Pagination, Navigation, Autoplay } from "swiper";

import api_details from "../../../API_Details";

import { Container } from "../../../Styles/CommonStyles/Container";
import { Link } from "react-router-dom";

type CarouselState = {
  movieList: MovieState[];
  carouselTitle: string;
  autoplay: boolean;
};

const Carousel: React.FC<CarouselState> = ({
  movieList,
  carouselTitle,
  autoplay,
}) => {
  const [stopCarousel, setStopCarousel] = useState<boolean>(false);
  const swiperRef = useRef<SwiperCore>(null);

  // Use theme from App.js
  const theme: DefaultTheme = useTheme();

  // Stop and start carousel when mouse hover
  useEffect(() => {
    // if (autoplay) {
    //   if (stopCarousel) {
    //     swiperRef.current.swiper.autoplay.stop();
    //   } else {
    //     swiperRef.current.swiper.autoplay.start();
    //   }
    // }
  }, [stopCarousel]);

  // Framer motion variants
  const imageVariants = {
    rest: {
      opacity: 0.6,
    },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    rest: {
      opacity: 1,
      y: "-50%",
      x: "-50%",
    },
    hover: {
      opacity: 0,
      y: "-30%",
      x: "-50%",
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut",
      },
    },
  };

  // timeout to reload the page after 10 miliseconds
  const handleMovieLink = () => {
    setTimeout(function () {
      window.location.reload();
    }, 10);
  };

  //   const SwiperStyles = {
  //     "--swiper-navigation-color": theme.colors.content1
  //   }

  return (
    <>
      <Title>{carouselTitle}</Title>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        lazy={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={
          autoplay
            ? [Lazy, Pagination, Navigation, Autoplay]
            : [Lazy, Pagination, Navigation]
        }
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
          },
        }}
        className="mySwiper"

        // ref={swiperRef}
      >
        {movieList.map((movie) => {
          return (
            <SwiperSlide
              style={{ width: "33%" }}
              key={movie.id}
              onMouseOver={() => setStopCarousel(true)}
              onMouseOut={() => setStopCarousel(false)}
            >
              <Link to={`/movies/movie-details/${movie.id}`}>
                <SwiperSlideContainer
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  onClick={handleMovieLink}
                >
                  <SwiperImage
                    data-src={`${api_details.IMAGE_BASE_URL}${api_details.BACKDROP_SIZE}${movie.backdrop_path}`}
                    className="swiper-lazy"
                    style={{ width: "100%", overflow: "visible" }}
                    variants={imageVariants}
                  />
                  <SwiperMovieTitleContainer variants={textVariants}>
                    <SwiperMovieTitle>
                      {movie.title !== undefined ? movie.title : movie.name}
                    </SwiperMovieTitle>
                  </SwiperMovieTitleContainer>
                  <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </SwiperSlideContainer>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Carousel;
